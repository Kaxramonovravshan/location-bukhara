import { useHeroVideo } from "../hooks/useHeroVideo";

const PageHero = ({ badge, title, titleLine2, description, children }) => {
  const videoSrc = useHeroVideo();

  return (
    <div className="relative w-full h-[min(70vh,520px)] sm:h-[min(75vh,600px)] lg:h-[700px] overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-site/85 via-site/50 to-site/20" />

      <div className="relative h-full flex items-center site-container py-16 sm:py-20">
        <div className="max-w-4xl space-y-4">
          {badge && <p className="section-label">{badge}</p>}
          {title && (
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold uppercase leading-[1.05] tracking-tight text-content-primary">
              {title}
            </h1>
          )}
          {titleLine2 && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold uppercase leading-[1.05] tracking-tight text-content-primary">
              {titleLine2}
            </h2>
          )}
          {description && (
            <p className="body-text text-base sm:text-lg md:text-xl max-w-2xl mt-4">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageHero;
