import React from "react";
import mainVideo from "../assets/mainVideo.mp4";
import { ProjectProductData } from "../utils/data";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const Location = () => {
  const { language } = useLanguage();
  const t = translations[language].location;

  return (
    <div>
      {/* Hero */}
      <div className="w-full h-[600px] lg:h-[700px] relative md:top-[-75px] overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={mainVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 flex items-center bg-black/30">
          <div className="max-w-5xl mx-auto px-5 md:px-10 text-white">
            <p className="uppercase tracking-[0.3em] text-sm md:text-base">
              {t.hero.badge}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-normal leading-tight mt-4">
              {t.hero.titleLine1}
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-normal leading-tight">
              {t.hero.titleLine2}
            </h2>
            <p className="mt-6 text-lg md:text-2xl max-w-3xl">
              {t.hero.description}
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 py-12 space-y-10">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            {t.intro.badge}
          </p>
          <h3 className="text-3xl md:text-5xl text-gray-900">
            {t.intro.title}
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.intro.highlights.map((item) => (
            <div
              key={item.title}
              className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm"
            >
              <h4 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h4>
              <p className="text-gray-600 mt-3">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Location gallery */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                {t.catalog.badge}
              </p>
              <h3 className="text-3xl md:text-4xl text-gray-900 mt-3">
                {t.catalog.title}
              </h3>
            </div>
            <button className="self-start md:self-auto border border-gray-900 text-gray-900 px-5 py-3 rounded-full text-sm font-medium hover:bg-gray-900 hover:text-white transition">
              {t.catalog.cta}
            </button>
          </div>

          <div className="divide-y divide-gray-200">
            {ProjectProductData.map((location) => (
              <article
                key={location.id}
                className="py-8 flex flex-col gap-6 md:flex-row md:items-center md:gap-10"
              >
                <div className="w-full md:w-64 h-48 overflow-hidden rounded-3xl shadow-sm">
                  <img
                    src={location.imageurl}
                    alt={location.name?.[language] || location.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-3 text-gray-900">
                  <div className="text-xs uppercase tracking-[0.4em] text-gray-500">
                    {location.locationTag?.[language] || "Bukhara Region"}
                  </div>
                  <h4 className="text-2xl">
                    {location.name?.[language] || location.name}
                  </h4>
                  <p className="text-gray-600">
                    {location.description?.[language] || location.description}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="border border-gray-900 text-gray-900 px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-900 hover:text-white transition">
                    {t.catalog.buttons.virtualTour}
                  </button>
                  <button className="border border-gray-300 text-gray-900 px-6 py-3 rounded-full text-sm font-semibold hover:border-gray-900 transition">
                    {t.catalog.buttons.preview}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 py-12">
        <div className="bg-black text-white rounded-[40px] p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                {t.services.badge}
              </p>
              <h3 className="text-3xl md:text-5xl leading-tight">
                {t.services.title}
              </h3>
              <p className="text-white/80 text-lg">{t.services.description}</p>
            </div>
            <div className="space-y-6">
              {t.services.list.map((service) => (
                <div
                  key={service.title}
                  className="border border-white/10 rounded-3xl p-6 bg-white/5 backdrop-blur"
                >
                  <h4 className="text-2xl">{service.title}</h4>
                  <p className="text-white/70 mt-2">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row md:items-center gap-4">
            <button className="bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition">
              {t.services.button}
            </button>
            <p className="text-white/70 text-sm">{t.services.footnote}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Location;
