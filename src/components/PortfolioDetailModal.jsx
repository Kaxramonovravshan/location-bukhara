import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import { getProjectServices } from "../utils/portfolio";
import { getPosterUrl, getVideoUrl } from "../utils/portfolioMedia";
import { getPortfolioImageAlt } from "../utils/imageAlt";

const PortfolioDetailModal = ({ project, onClose }) => {
  const { language } = useLanguage();
  const t = translations[language].portfolio;
  const videoRef = useRef(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const projectTitle = project.title[language] || project.title.en;
  const gallery = (project.gallery?.length
    ? project.gallery
    : [project.poster]
  ).map(getPosterUrl);
  const activeImage = gallery[activeImageIndex] || getPosterUrl(project.poster);
  const videoSrc = getVideoUrl(project.video);
  const servicesText = getProjectServices(project, language);

  useEffect(() => {
    setActiveImageIndex(0);
    setIsPlaying(false);
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

  useEffect(() => {
    if (!isPlaying || !videoRef.current) return;
    const playPromise = videoRef.current.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  }, [isPlaying]);

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
    setIsPlaying(false);
  };

  const handlePlay = () => {
    if (!videoSrc) return;
    setIsPlaying(true);
  };

  const handleSelectImage = (index) => {
    stopVideo();
    setActiveImageIndex(index);
  };

  const handleVideoEnded = () => {
    stopVideo();
  };

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
            <div className="relative aspect-[4/3] sm:aspect-[16/10] min-h-[220px] sm:min-h-[320px] md:min-h-[420px] lg:min-h-[480px] overflow-hidden rounded-card bg-site border border-site-border">
              <img
                src={activeImage}
                alt={getPortfolioImageAlt(projectTitle, language, activeImageIndex + 1)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              />

              {!isPlaying && videoSrc && (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-site/15 transition-colors duration-300 hover:bg-site/25"
                  aria-label={`Play ${projectTitle}`}
                >
                  <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-accent bg-site/70 backdrop-blur-sm flex items-center justify-center text-accent transition-all duration-300 hover:bg-accent hover:text-site">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-0.5" fill="currentColor" />
                  </span>
                </button>
              )}

              {isPlaying && videoSrc && (
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover animate-[fadeIn_0.4s_ease]"
                  src={videoSrc}
                  controls
                  playsInline
                  preload="none"
                  onEnded={handleVideoEnded}
                />
              )}
            </div>

            {gallery.length > 0 && (
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {gallery.slice(0, 4).map((src, index) => (
                  <button
                    key={`${project.id}-thumb-${index}`}
                    type="button"
                    onClick={() => handleSelectImage(index)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 md:w-[4.5rem] md:h-[4.5rem] overflow-hidden rounded-card border transition-all duration-300 shrink-0 ${
                      !isPlaying && activeImageIndex === index
                        ? "border-accent ring-2 ring-accent/20"
                        : "border-site-border hover:border-accent/50"
                    }`}
                  >
                    <img
                      src={src}
                      alt={getPortfolioImageAlt(projectTitle, language, index + 1)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-6 lg:pr-2">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-bold uppercase tracking-tight text-content-primary leading-tight">
                {projectTitle}
              </h2>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                {project.category[language] || project.category.en}
              </p>
            </div>

            <div className="space-y-3 text-sm md:text-base border-t border-site-border pt-6">
              {project.director && (
                <p>
                  <span className="text-content-secondary">{t.director}: </span>
                  <span className="text-content-primary">{project.director}</span>
                </p>
              )}
              {(project.countries?.[language] || project.countries?.en) && (
                <p>
                  <span className="text-content-secondary">
                    {(project.countries[language] || project.countries.en)?.includes(",")
                      ? t.countries
                      : t.country}
                    :{" "}
                  </span>
                  <span className="text-content-primary">
                    {project.countries[language] || project.countries.en}
                  </span>
                </p>
              )}
              {(project.location?.[language] || project.location?.en) && (
                <p>
                  <span className="text-content-secondary">{t.location}: </span>
                  <span className="text-content-primary">
                    {project.location[language] || project.location.en}
                  </span>
                </p>
              )}
              {(project.broadcasters?.[language] || project.broadcasters?.en) && (
                <p>
                  <span className="text-content-secondary">{t.broadcasters}: </span>
                  <span className="text-content-primary">
                    {project.broadcasters[language] || project.broadcasters.en}
                  </span>
                </p>
              )}
              {project.year && (
                <p>
                  <span className="text-content-secondary">{t.year}: </span>
                  <span className="text-content-primary">{project.year}</span>
                </p>
              )}
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
