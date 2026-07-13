import producerImage from "../../assets/aliChroiyev.PNG";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";
import { getStaticImageAlt } from "../../utils/imageAlt";

const ProducerSection = () => {
  const { language } = useLanguage();
  const t = translations[language].home;
  const bioParagraphs = Array.isArray(t.producerBio)
    ? t.producerBio
    : [t.producerBio];

  return (
    <section className="border-t border-site-border section-padding">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,500px)_1fr] gap-8 lg:gap-14 xl:gap-20 items-center">
          <div className="relative mx-auto w-full max-w-[420px] sm:max-w-[460px] lg:max-w-none">
            <div className="relative overflow-hidden aspect-square bg-site-card">
              <img
                src={producerImage}
                alt={getStaticImageAlt("producer", language)}
                className="w-full h-full object-cover object-[center_18%]"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6 lg:py-4">
            <div>
              <p className="text-accent text-xs md:text-sm font-semibold uppercase tracking-[0.25em]">
                {t.producerLabel}
              </p>
              <div className="mt-3 h-px w-16 bg-accent" />
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[4.75rem] font-bold uppercase tracking-tight text-content-primary leading-[1.12]">
              {t.producerName}
            </h2>

            <p className="text-accent font-semibold text-base sm:text-lg">
              {t.producerRole}
            </p>

            <div className="space-y-4 pt-1">
              {bioParagraphs.map((paragraph, index) => (
                <p key={index} className="body-text">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProducerSection;
