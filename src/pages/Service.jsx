import { useEffect, useMemo, useState } from "react";
import PageHero from "../components/PageHero";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import { serviceMedia } from "../utils/media.js";

const Service = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const locationT = translations[language].location;
  const services = useMemo(
    () =>
      t.service.services.map((service, index) => ({
        ...service,
        ...serviceMedia[index]
      })),
    [t.service.services]
  );
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const selectedService =
    selectedServiceIndex !== null ? services[selectedServiceIndex] : null;

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
          setSelectedImageIndex(null);
        } else {
          setSelectedServiceIndex(null);
        }
      } else if (event.key === "ArrowRight" && selectedImageIndex !== null) {
        setSelectedImageIndex((prev) =>
          prev !== null && prev < galleryImages.length - 1 ? prev + 1 : prev
        );
      } else if (event.key === "ArrowLeft" && selectedImageIndex !== null) {
        setSelectedImageIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : prev
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedServiceIndex, selectedImageIndex, galleryImages.length]);

  return (
    <div className="bg-site">
      <PageHero badge={locationT.services.badge} title={locationT.services.title} />

      <section className="site-container section-padding">
        <div className="space-y-8 sm:space-y-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-center border-b border-site-border pb-8 sm:pb-10 last:border-b-0"
            >
              <div className="w-full md:w-64 h-44 sm:h-48 md:h-40 overflow-hidden rounded-card border border-site-border flex-shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 flex flex-col gap-2 sm:gap-3">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-content-primary">
                  {service.title}
                </h3>
                <p className="body-text text-sm sm:text-base">{service.description}</p>
              </div>

              <div className="md:flex-shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenGallery(index)}
                  className="w-full sm:w-auto min-h-[44px] rounded-xl border border-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-accent transition hover:bg-accent hover:text-site touch-manipulation"
                >
                  {t.service.viewButton}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedServiceIndex !== null && selectedService && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/80" onClick={handleCloseGallery} />
          <div className="relative z-10 w-full h-full bg-site/95 overflow-y-auto p-4 sm:p-6 md:p-8 pt-16">
            <button
              type="button"
              onClick={handleCloseGallery}
              className="fixed top-4 right-4 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-site-card border border-site-border hover:border-accent transition"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-content-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="site-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
              {galleryImages.map((src, imgIndex) => (
                <button
                  type="button"
                  key={`${selectedServiceIndex}-${imgIndex}`}
                  onClick={() => handleImageClick(imgIndex)}
                  className="aspect-square overflow-hidden rounded-card bg-site-card border border-site-border group touch-manipulation"
                >
                  <img
                    src={src}
                    alt={`${selectedService.title} ${imgIndex + 1}`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedImageIndex !== null && galleryImages[selectedImageIndex] && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-2">
          <div className="absolute inset-0 bg-black/90" onClick={handleCloseFullImage} />
          <button
            type="button"
            onClick={handleCloseFullImage}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition backdrop-blur-sm"
            aria-label="Close"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {selectedImageIndex > 0 && (
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition backdrop-blur-sm touch-manipulation"
              aria-label="Previous"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {selectedImageIndex < galleryImages.length - 1 && (
            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition backdrop-blur-sm touch-manipulation"
              aria-label="Next"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
          <div className="relative z-20 max-w-[95vw] max-h-[90vh] flex items-center justify-center">
            <img
              src={galleryImages[selectedImageIndex]}
              alt={`${selectedService.title} ${selectedImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
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
