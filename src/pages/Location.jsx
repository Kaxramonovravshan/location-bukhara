import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import GhostButton from "../components/GhostButton";
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
          setSelectedImageIndex(null);
        } else {
          setIsGalleryOpen(false);
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
  }, [isGalleryOpen, selectedImageIndex, galleryImages.length]);

  return (
    <div className="bg-site">
      <PageHero
        badge={t.hero.badge}
        title={t.hero.titleLine1}
        titleLine2={t.hero.titleLine2}
        description={t.hero.description}
      />

      <section className="site-container section-padding">
        <div className="space-y-8 sm:space-y-10">
          <div className="space-y-4 max-w-3xl">
            <p className="section-label">{t.intro.badge}</p>
            <h2 className="section-heading">{t.intro.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {t.intro.highlights.map((item) => (
              <div key={item.title} className="card-surface p-5 sm:p-6 space-y-3">
                <h3 className="text-lg font-semibold text-content-primary">
                  {item.title}
                </h3>
                <p className="body-text text-sm sm:text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-site-border bg-site-card/30 section-padding">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-12">
            <div className="space-y-3">
              <p className="section-label">{t.catalog.badge}</p>
              <h2 className="section-heading">{t.catalog.title}</h2>
            </div>
            <GhostButton to="/contact" className="w-full sm:w-auto justify-center shrink-0">
              {t.catalog.cta}
            </GhostButton>
          </div>

          <div className="divide-y divide-site-border border-t border-site-border">
            {ProjectProductData.map((location) => {
              const gallery =
                location.gallery && location.gallery.length > 0
                  ? location.gallery
                  : [location.imageurl];
              const previewImages = gallery.slice(0, 4);

              return (
                <article
                  key={location.id}
                  className="flex flex-col gap-5 sm:gap-6 py-6 sm:py-8 md:flex-row md:items-center md:gap-10"
                >
                  <div className="w-full md:w-[55%] lg:w-[50%]">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
                      {previewImages.map((src, index) => (
                        <button
                          type="button"
                          key={`${location.id}-thumb-${index}`}
                          onClick={() => handleSelectLocation(location.id, true)}
                          className="group h-24 sm:h-28 overflow-hidden rounded-card border border-site-border bg-site-card transition hover:border-accent md:h-32 touch-manipulation"
                        >
                          <img
                            src={src}
                            alt={`${location.name?.[language] || location.name} ${index + 1}`}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col items-start md:items-end gap-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-content-primary">
                      {location.name?.[language] || location.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleSelectLocation(location.id, true)}
                      className="w-full sm:w-auto min-h-[44px] rounded-xl border border-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-accent transition hover:bg-accent hover:text-site touch-manipulation"
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
            className="absolute inset-0 bg-black/80"
            onClick={handleCloseGallery}
          />
          <div className="relative z-10 w-full h-full bg-site/95 overflow-y-auto p-4 sm:p-6 md:p-8 pt-16">
            <button
              type="button"
              onClick={handleCloseGallery}
              className="fixed top-4 right-4 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-site-card border border-site-border hover:border-accent transition"
              aria-label={t.catalog.closeGallery}
            >
              <svg className="w-5 h-5 text-content-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="site-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
              {galleryImages.map((src, index) => (
                <button
                  type="button"
                  key={`${selectedLocation.id}-${index}`}
                  onClick={() => handleImageClick(index)}
                  className="aspect-square overflow-hidden rounded-card bg-site-card border border-site-border group touch-manipulation"
                >
                  <img
                    src={src}
                    alt={`${selectedLocation.name?.[language] || selectedLocation.name} ${index + 1}`}
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
            aria-label={t.catalog.closeGallery}
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
              alt={`${selectedLocation.name?.[language] || selectedLocation.name} ${selectedImageIndex + 1}`}
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

export default Location;
