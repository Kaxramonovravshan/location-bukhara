import React, { useState } from "react";
// import Img from "../assets/locationImg.png";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguage = () => {
    changeLanguage(language === "en" ? "ru" : "en");
  };

  return (
    <nav className="bg-gray-100/50 backdrop-blur-md py-3 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-3 p-3">
              {/* <img className="w-24" src={Img} alt="" /> */}
              <span className="text-gray-900 font-semibold">
                {t.navbar.brand}
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to={"/locations"}
                className="text-gray-700 text-lg  hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-md font-medium transition-colors"
              >
                {t.navbar.locations}
              </Link>
              <Link
                to={"/service"}
                className="text-gray-700 text-lg hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-md font-medium transition-colors"
              >
                {t.navbar.service}
              </Link>
              <Link
                to={"/service"}
                className="text-gray-700 text-lg hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-md font-medium transition-colors"
              >
                {t.navbar.contactUs}
              </Link>
              <button
                onClick={toggleLanguage}
                className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-md font-medium border border-gray-300 transition-colors"
                title={
                  language === "en"
                    ? "Переключить на русский"
                    : "Switch to English"
                }
              >
                {language === "en" ? "RU" : "EN"}
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors"
            >
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            to={"/locations"}
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-md font-medium transition-colors block"
          >
            {t.navbar.locations}
          </Link>
          <Link
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            to={"/service"}
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-md font-medium transition-colors block"
          >
            {t.navbar.service}
          </Link>
          <Link
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            to={"/service"}
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-md font-medium transition-colors block"
          >
            {t.navbar.contactUs}
          </Link>
          <button
            onClick={() => {
              toggleLanguage();
              setIsOpen(!isOpen);
            }}
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-md font-medium border border-gray-300 w-full text-left transition-colors"
          >
            {language === "en" ? "RU" : "EN"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
