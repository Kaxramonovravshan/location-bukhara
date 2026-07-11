import historyImage from "../../assets/masjid1.jpg";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";

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
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-card border border-site-border aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
            <img
              src={historyImage}
              alt={t.historyTitle}
              className="w-full h-full object-cover grayscale opacity-80"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-site-card/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
