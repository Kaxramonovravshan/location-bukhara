import historyImage from "../../assets/history/IMG_9924.webp";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";
import { getStaticImageAlt } from "../../utils/imageAlt";

const HIGHLIGHT_TERMS = [
  "BuxoroFilm Studio",
  "Buxoro Film Studio",
  "Bukhara Film Studio",
  "Buxkino",
  "«Бухкино»",
  "Бухкино"
];

const highlightBrandNames = (text) => {
  const pattern = new RegExp(
    `(${HIGHLIGHT_TERMS.map((term) =>
      term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    ).join("|")})`,
    "g"
  );

  return text.split(pattern).map((part, index) =>
    HIGHLIGHT_TERMS.includes(part) ? (
      <span key={index} className="text-accent font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const HistorySection = () => {
  const { language } = useLanguage();
  const t = translations[language].home;

  return (
    <section className="border-t border-site-border section-padding bg-site-card/30">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-start">
          <div className="space-y-5 sm:space-y-6">
            <p className="section-label">{t.historyLabel}</p>
            <h2 className="section-heading">{t.historyTitle}</h2>
            <div className="space-y-4">
              {t.historyText.map((paragraph, index) => (
                <p key={index} className="body-text">
                  {highlightBrandNames(paragraph)}
                </p>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
            <img
              src={historyImage}
              alt={getStaticImageAlt("history", language)}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
