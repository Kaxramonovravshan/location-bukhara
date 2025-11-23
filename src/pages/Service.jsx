import React, { useEffect, useState } from "react";
import mainVideo from "../assets/mainVideo.mp4";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import ProjectCarusel from "../components/ProjectCarusel";

const Service = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const locationT = translations[language].location;
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const selectedService =
    selectedServiceIndex !== null
      ? t.service.services[selectedServiceIndex]
      : null;

  const galleryImages = selectedService?.gallery || [];

  const handleOpenGallery = (index) => {
    setSelectedServiceIndex(index);
  };

  const handleCloseGallery = () => {
    setSelectedServiceIndex(null);
    setSelectedImageIndex(null);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCloseFullImage = () => {
    setSelectedImageIndex(null);
  };

  const handleNextImage = () => {
    if (
      selectedImageIndex !== null &&
      selectedImageIndex < galleryImages.length - 1
    ) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  useEffect(() => {
    if (selectedServiceIndex === null && selectedImageIndex === null) {
      document.body.style.overflow = "";
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (selectedImageIndex !== null) {
          handleCloseFullImage();
        } else {
          handleCloseGallery();
        }
      } else if (event.key === "ArrowRight" && selectedImageIndex !== null) {
        handleNextImage();
      } else if (event.key === "ArrowLeft" && selectedImageIndex !== null) {
        handlePrevImage();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedServiceIndex, selectedImageIndex]);

  return (
    <div>
      {/* Hero Section */}
      <div className="w-full h-[600px] lg:h-[700px] relative md:top-[-75px] overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={mainVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 flex items-center bg-black/30">
          <div className="max-w-7xl mx-auto px-5 md:px-10 text-white w-full">
            <p className="uppercase tracking-[0.3em] text-sm md:text-base">
              {locationT.services.badge}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-normal leading-tight mt-4">
              {locationT.services.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Project Carousel Section */}
      <ProjectCarusel />

      {/* Services Cards Section */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-12">
        <div className="space-y-8">
          {t.service.services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-6 md:items-center border-b border-gray-200 pb-8 last:border-b-0"
            >
              {/* Image - Left */}
              <div className="w-full md:w-64 h-48 md:h-40 overflow-hidden rounded-3xl flex-shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content - Center */}
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-base md:text-lg">
                  {service.description}
                </p>
              </div>

              {/* Button - Right */}
              <div className="flex flex-col gap-3 md:flex-shrink-0">
                <button
                  onClick={() => handleOpenGallery(index)}
                  className="border border-gray-900 text-gray-900 px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-900 hover:text-white transition whitespace-nowrap"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Modal */}
      {selectedServiceIndex !== null && selectedService && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={handleCloseGallery}
          ></div>
          <div className="relative z-10 w-full h-full bg-white/90 overflow-y-auto p-4 md:p-6 lg:p-8">
            <button
              type="button"
              onClick={handleCloseGallery}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white border border-gray-200 transition shadow-sm"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-2 md:gap-3">
              {galleryImages.map((src, imgIndex) => (
                <div
                  key={`${selectedServiceIndex}-${imgIndex}`}
                  onClick={() => handleImageClick(imgIndex)}
                  className="aspect-square overflow-hidden rounded-xl bg-gray-100 group cursor-pointer"
                >
                  <img
                    src={src}
                    alt={`${selectedService.title} ${imgIndex + 1}`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full Image Viewer */}
      {selectedImageIndex !== null && galleryImages[selectedImageIndex] && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/90"
            onClick={handleCloseFullImage}
          ></div>
          <button
            type="button"
            onClick={handleCloseFullImage}
            className="absolute top-4 right-4 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition backdrop-blur-sm"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {selectedImageIndex > 0 && (
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition backdrop-blur-sm"
              aria-label="Previous"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          {selectedImageIndex < galleryImages.length - 1 && (
            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition backdrop-blur-sm"
              aria-label="Next"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
          <div className="relative z-20 max-w-[95vw] max-h-[95vh] flex items-center justify-center">
            <img
              src={galleryImages[selectedImageIndex]}
              alt={`${selectedService.title} ${selectedImageIndex + 1}`}
              className="max-w-full max-h-[95vh] object-contain rounded-lg"
            />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 text-white text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
            {selectedImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
