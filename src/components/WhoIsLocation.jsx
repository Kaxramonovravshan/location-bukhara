import React from "react";
import masjid1 from "../assets/masjid1.jpg";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const WhoIsLocation = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="w-full my-16">
      <div className="max-w-7xl mx-auto flex lg:flex-row flex-col items-center justify-between gap-20 p-3">
        <img className="lg:w-1/3 w-full" src={masjid1} alt="" />
        <div className="lg:w-1/2 text-box">
          <h1 className="text-2xl md:text-4xl mb-2">{t.whoIsLocation.title}</h1>
          <p>{t.whoIsLocation.description}</p>
        </div>
      </div>
    </div>
  );
};

export default WhoIsLocation;
