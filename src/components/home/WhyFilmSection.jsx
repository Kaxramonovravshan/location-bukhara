import {
  Users,
  MapPin,
  ClipboardList,
  Paintbrush,
  UsersRound,
  Handshake
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";

const icons = [Users, MapPin, ClipboardList, Paintbrush, UsersRound, Handshake];

const WhyFilmSection = () => {
  const { language } = useLanguage();
  const t = translations[language].home;

  return (
    <section className="border-t border-site-border section-padding">
      <div className="site-container">
        <div className="space-y-4 mb-16 md:mb-20">
          <p className="section-label">{t.whyLabel}</p>
          <h2 className="section-heading max-w-[42rem]">{t.whyTitle}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-10 lg:gap-8">
          {t.whyFeatures.map((feature, index) => {
            const Icon = icons[index];
            return (
              <div key={feature.title} className="space-y-5">
                <div className="w-14 h-14 flex items-center justify-center rounded-full border border-accent/40 text-accent">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-accent text-xs font-semibold uppercase tracking-[0.2em]">
                  {feature.title}
                </h3>
                <p className="body-text text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyFilmSection;
