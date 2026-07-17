import { useHeroVideo } from "../hooks/useHeroVideo";

const PageHero = ({
  badge,
  title,
  titleLine2,
  description,
  backgroundImage,
  backgroundSrcSet,
  backgroundSizes = "100vw",
  backgroundWidth,
  backgroundHeight,
  imageAlt = "",
  children
}) => {
  const videoSrc = useHeroVideo();
  const hasImage = Boolean(backgroundImage);

  return (
    <div
      className={`relative w-full overflow-hidden -mt-16 sm:-mt-20 ${
        hasImage
          ? "min-h-[min(92vh,820px)] sm:min-h-[90vh]"
          : "h-[min(70vh,520px)] sm:h-[min(75vh,600px)] lg:h-[700px]"
      }`}
    >
      {hasImage ? (
        <img
          src={backgroundImage}
          srcSet={backgroundSrcSet}
          sizes={backgroundSrcSet ? backgroundSizes : undefined}
          width={backgroundWidth}
          height={backgroundHeight}
          alt={imageAlt}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      ) : (
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
      )}

      <div
        className={`absolute inset-0 ${
          hasImage
            ? "bg-gradient-to-r from-black/75 via-black/45 to-black/20"
            : "bg-gradient-to-r from-site/85 via-site/50 to-site/20"
        }`}
      />

      <div
        className={`relative site-container flex items-center py-20 sm:py-24 pt-28 sm:pt-32 ${
          hasImage ? "min-h-[min(92vh,820px)] sm:min-h-[90vh]" : "h-full"
        }`}
      >
        <div className="max-w-5xl space-y-5 sm:space-y-6">
          {badge && <p className="section-label">{badge}</p>}
          {title && (
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold uppercase leading-[1.08] tracking-tight text-content-primary">
              {title}
              {titleLine2 ? (
                <>
                  <br />
                  {titleLine2}
                </>
              ) : null}
            </h1>
          )}
          {description && (
            <p className="body-text text-base sm:text-lg md:text-xl text-content-primary/85 mt-2">
              {description}
            </p>
          )}
          {children ? <div className="pt-2 sm:pt-4">{children}</div> : null}
        </div>
      </div>
    </div>
  );
};

export default PageHero;
