import { useRef } from "react";
import { Play, ChevronRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";
import { useHeroVideo } from "../../hooks/useHeroVideo";
import GhostButton from "../GhostButton";

const HomeHero = () => {
  const { language } = useLanguage();
  const t = translations[language].home;
  const videoRef = useRef(null);
  const videoSrc = useHeroVideo();

  const handlePlayReel = () => {
    const video = videoRef.current;
    if (!video) return;
    video.scrollIntoView({ behavior: "smooth", block: "center" });
    video.play().catch(() => {});
  };

  return (
    <>
      <section className="relative w-full min-h-[min(85vh,720px)] sm:min-h-[85vh] overflow-hidden">
        <video
          ref={videoRef}
          key={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-site/90 via-site/55 to-site/25" />

        <div className="relative site-container min-h-[min(85vh,720px)] sm:min-h-[85vh] flex flex-col justify-center py-20 sm:py-24">
          <h1 className="max-w-4xl text-[clamp(1.75rem,7vw,4.5rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-content-primary">
            {t.heroTitle}
            <br />
            {t.heroTitle2}
          </h1>

          <button
            type="button"
            onClick={handlePlayReel}
            className="mt-6 sm:mt-8 inline-flex items-center gap-3 text-accent font-semibold uppercase tracking-wider text-sm transition-colors duration-300 hover:text-accent-hover group min-h-[44px]"
          >
            <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-accent flex items-center justify-center transition-all duration-300 group-hover:bg-accent group-hover:text-site shrink-0">
              <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
            </span>
            {t.playReel}
          </button>
        </div>
      </section>

      <section className="border-t border-site-border">
        <div className="site-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start">
            <p className="body-text max-w-xl">{t.description}</p>
            <div className="flex lg:justify-end">
              <GhostButton to="/locations" className="w-full sm:w-auto justify-center">
                {t.discoverLink}
                <ChevronRight className="w-4 h-4" />
              </GhostButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeHero;
