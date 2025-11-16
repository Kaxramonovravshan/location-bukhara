import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import personImage from "../assets/person.jpg";

const BlackSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Title */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-2 leading-tight">
              {t.blackSection.title}
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight">
              {t.blackSection.subtitle}
            </h3>
          </div>

          {/* Right Side - Person Image */}
          <div className="flex flex-col items-center lg:items-end">
            <img
              src={personImage}
              alt="Ali Choriyev"
              className="w-full max-w-md h-auto object-cover"
            />
            <p className="text-white text-lg md:text-xl mt-4">Ali Choriyev</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackSection;
