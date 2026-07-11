import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import { getPortfolioImageAlt } from "../utils/imageAlt";

const ProjectCard = ({
  name,
  category,
  url,
  director,
  countries,
  year,
  onClick,
  compact = false
}) => {
  const { language } = useLanguage();
  const t = translations[language].portfolio;

  return (
    <button
      type="button"
      onClick={onClick}
      className="card h-full flex flex-col text-left w-full cursor-pointer group touch-manipulation"
    >
      <div className="relative flex-shrink-0 w-full aspect-[3/4] sm:aspect-[3/4] overflow-hidden bg-site-card">
        <img
          className="product--image w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-100"
          alt={getPortfolioImageAlt(name, language)}
          src={url}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-site/40 via-transparent to-transparent pointer-events-none" />
      </div>

      <div
        className={`flex-1 flex flex-col gap-2 bg-site-card ${
          compact ? "p-3 sm:p-4" : "p-4 sm:p-5"
        }`}
      >
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-content-primary leading-snug line-clamp-2">
          {name}
        </h2>

        {category && (
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-accent">
            {category}
          </p>
        )}

        <div className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-xs text-content-secondary leading-relaxed">
          {director && (
            <p className="truncate sm:whitespace-normal">
              <span className="text-content-secondary">{t.director}: </span>
              <span className="text-content-primary">{director}</span>
            </p>
          )}
          {countries && (
            <p className="line-clamp-2 sm:line-clamp-none">
              <span className="text-content-secondary">{t.countries}: </span>
              <span className="text-content-primary">{countries}</span>
            </p>
          )}
          {year && (
            <p>
              <span className="text-content-secondary">{t.year}: </span>
              <span className="text-content-primary">{year}</span>
            </p>
          )}
        </div>
      </div>
    </button>
  );
};

export default ProjectCard;
