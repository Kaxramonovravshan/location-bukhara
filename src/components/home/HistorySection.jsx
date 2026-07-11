import { ChevronRight } from "lucide-react";
import historyImage from "../../assets/masjid1.jpg";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";
import GhostButton from "../GhostButton";

const HistorySection = () => {
  const { language } = useLanguage();
  const t = translations[language].home;

  return (
    <section className="border-t border-site-border section-padding bg-site-card/30">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-start mb-12 sm:mb-16 md:mb-24">
          <div className="space-y-5 sm:space-y-6">
            <p className="section-label">{t.historyLabel}</p>
            <h2 className="section-heading">{t.historyTitle}</h2>
            <p className="body-text">{t.historyText}</p>
            <GhostButton to="/portfolio" className="w-full sm:w-auto justify-center">
              {t.learnMore}
              <ChevronRight className="w-4 h-4" />
            </GhostButton>
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

        <div className="relative pt-2 sm:pt-4">
          <div className="absolute top-[5px] left-0 right-0 h-px bg-accent/30 hidden md:block" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-6">
            {t.timeline.map((item) => (
              <div
                key={item.year}
                className="relative space-y-2 sm:space-y-3 md:space-y-4 border-l-2 border-accent/30 pl-4 md:border-l-0 md:pl-0"
              >
                <div className="hidden md:block w-2.5 h-2.5 rounded-full bg-accent absolute -top-[3px] left-0" />
                <p className="text-accent font-semibold text-sm uppercase tracking-wider md:pt-8">
                  {item.year}
                </p>
                <p className="body-text text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
