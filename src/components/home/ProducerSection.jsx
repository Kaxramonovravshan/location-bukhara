import personImage from "../../assets/person.jpg";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";

const ProducerSection = () => {
  const { language } = useLanguage();
  const t = translations[language].home;

  return (
    <section className="border-t border-site-border section-padding overflow-hidden">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          <div className="relative lg:-ml-8 xl:-ml-16">
            <div className="overflow-hidden aspect-[4/5] max-h-[640px] lg:max-h-none lg:aspect-[3/4]">
              <img
                src={personImage}
                alt={t.producerName}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-site to-transparent hidden lg:block" />
          </div>

          <div className="space-y-6 lg:pl-16 xl:pl-24">
            <p className="section-label">{t.producerLabel}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-content-primary">
              {t.producerName}
            </h2>
            <p className="text-accent font-semibold text-lg">{t.producerRole}</p>
            <p className="body-text">{t.producerBio}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProducerSection;
