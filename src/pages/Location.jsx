import React, { useEffect, useMemo, useState } from "react";
import mainVideo from "../assets/mainVideo.mp4";
import { ProjectProductData } from "../utils/data";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const Location = () => {
  const { language } = useLanguage();
  const t = translations[language].location;
  const [selectedLocationId, setSelectedLocationId] = useState(
    ProjectProductData[0]?.id
  );
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const selectedLocation = useMemo(
    () => ProjectProductData.find((item) => item.id === selectedLocationId),
    [selectedLocationId]
  );

  const galleryImages =
    selectedLocation?.gallery?.length > 0
      ? selectedLocation.gallery
      : selectedLocation?.imageurl
      ? [selectedLocation.imageurl]
      : [];

  const photoCountLabel =
    galleryImages.length === 1
      ? t.catalog.photoCount.singular
      : t.catalog.photoCount.plural;

  const handleSelectLocation = (id, shouldOpenModal = false) => {
    setSelectedLocationId(id);
    if (shouldOpenModal) {
      setIsGalleryOpen(true);
    }
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
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
    if (!isGalleryOpen && selectedImageIndex === null) {
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
  }, [isGalleryOpen, selectedImageIndex]);

  return (
    <div>
      {/* Hero */}
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
          <div className="max-w-5xl mx-auto px-5 md:px-10 text-white">
            <p className="uppercase tracking-[0.3em] text-sm md:text-base">
              {t.hero.badge}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-normal leading-tight mt-4">
              {t.hero.titleLine1}
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-normal leading-tight">
              {t.hero.titleLine2}
            </h2>
            <p className="mt-6 text-lg md:text-2xl max-w-3xl">
              {t.hero.description}
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 py-12 space-y-10">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            {t.intro.badge}
          </p>
          <h3 className="text-3xl md:text-5xl text-gray-900">
            {t.intro.title}
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.intro.highlights.map((item) => (
            <div
              key={item.title}
              className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm"
            >
              <h4 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h4>
              <p className="text-gray-600 mt-3">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Location gallery */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                {t.catalog.badge}
              </p>
              <h3 className="text-3xl md:text-4xl text-gray-900 mt-3">
                {t.catalog.title}
              </h3>
            </div>
            <button className="self-start md:self-auto border border-gray-900 text-gray-900 px-5 py-3 rounded-full text-sm font-medium hover:bg-gray-900 hover:text-white transition">
              {t.catalog.cta}
            </button>
          </div>

          <div className="divide-y divide-gray-200 border-t border-gray-200">
            {ProjectProductData.map((location) => {
              const gallery =
                location.gallery && location.gallery.length > 0
                  ? location.gallery
                  : [location.imageurl];
              const previewImages = gallery.slice(0, 4);

              return (
                <article
                  key={location.id}
                  className="flex flex-col gap-6 py-4 md:flex-row md:items-center md:gap-10"
                >
                  <div className="w-full md:w-[55%] lg:w-[50%]">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
                      {previewImages.map((src, index) => (
                        <button
                          type="button"
                          key={`${location.id}-thumb-${index}`}
                          onClick={() =>
                            handleSelectLocation(location.id, true)
                          }
                          className="group h-28 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:border-gray-400 md:h-32"
                        >
                          <img
                            src={src}
                            alt={`${
                              location.name?.[language] || location.name
                            } ${index + 1}`}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col items-end gap-4 text-gray-900">
                    <h4 className="text-xl">
                      {location.name?.[language] || location.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleSelectLocation(location.id, true)}
                      className="rounded-full border border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white whitespace-nowrap"
                    >
                      {t.catalog.viewGallery}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {isGalleryOpen && selectedLocation && (
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
              {galleryImages.map((src, index) => (
                <div
                  key={`${selectedLocation.id}-${index}`}
                  onClick={() => handleImageClick(index)}
                  className="aspect-square overflow-hidden rounded-xl bg-gray-100 group cursor-pointer"
                >
                  <img
                    src={src}
                    alt={`${
                      selectedLocation.name?.[language] || selectedLocation.name
                    } ${index + 1}`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
              alt={`${
                selectedLocation.name?.[language] || selectedLocation.name
              } ${selectedImageIndex + 1}`}
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

export default Location;
