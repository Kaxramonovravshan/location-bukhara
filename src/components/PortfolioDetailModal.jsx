import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import { getProjectServices } from "../utils/portfolio";

const PortfolioDetailModal = ({ project, onClose }) => {
  const { language } = useLanguage();
  const t = translations[language].portfolio;
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const gallery = project.gallery?.length ? project.gallery : [project.cover];
  const activeImage = gallery[activeImageIndex] || project.cover;
  const servicesText = getProjectServices(project, language);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project.id]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-[min(1440px,96vw)] max-h-[96vh] overflow-y-auto card-surface shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-site-card border border-site-border hover:border-accent transition-all duration-300"
          aria-label={t.close}
        >
          <svg
            className="w-5 h-5 text-content-primary"
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

        <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_1fr] gap-6 sm:gap-8 lg:gap-12 p-4 sm:p-6 md:p-10 lg:p-14">
          <div className="space-y-4 sm:space-y-5">
            <div className="aspect-[4/3] sm:aspect-[16/10] min-h-[220px] sm:min-h-[320px] md:min-h-[420px] lg:min-h-[480px] overflow-hidden rounded-card bg-site border border-site-border">
              <img
                src={activeImage}
                alt={project.title[language] || project.title.en}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {gallery.slice(0, 4).map((src, index) => (
                <button
                  key={`${project.id}-thumb-${index}`}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-card border transition-all duration-300 ${
                    activeImageIndex === index
                      ? "border-accent ring-2 ring-accent/20"
                      : "border-site-border hover:border-accent/50"
                  }`}
                >
                  <img
                    src={src}
                    alt={`${project.title[language] || project.title.en} ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-6 lg:pr-2">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-bold uppercase tracking-tight text-content-primary leading-tight">
                {project.title[language] || project.title.en}
              </h2>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                {project.category[language] || project.category.en}
              </p>
            </div>

            <div className="space-y-3 text-sm md:text-base border-t border-site-border pt-6">
              <p>
                <span className="text-content-secondary">{t.director}: </span>
                <span className="text-content-primary">{project.director}</span>
              </p>
              <p>
                <span className="text-content-secondary">{t.countries}: </span>
                <span className="text-content-primary">
                  {project.countries[language] || project.countries.en}
                </span>
              </p>
              <p>
                <span className="text-content-secondary">{t.year}: </span>
                <span className="text-content-primary">{project.year}</span>
              </p>
            </div>

            <div className="space-y-3 border-t border-site-border pt-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                {t.services}:
              </p>
              <p className="body-text text-sm md:text-base leading-relaxed">
                {servicesText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailModal;
