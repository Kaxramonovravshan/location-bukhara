import React, { useState } from "react";
import Img from "../assets/logo.PNG";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];
  const location = useLocation();
  const activeLangClasses = "bg-[#C8A574] text-white border-[#C8A574]";
  const inactiveLangClasses =
    "text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-900";
  const baseNavLinkClasses =
    "px-4 py-2 rounded-md font-medium transition-colors text-xl";
  const mobileNavLinkClasses =
    "block px-3 py-2 rounded-md font-medium transition-colors text-lg";
  const getNavLinkClasses = (path, isMobile = false) => {
    const baseClasses = isMobile ? mobileNavLinkClasses : baseNavLinkClasses;
    const isActive =
      path === "/"
        ? location.pathname === path
        : location.pathname.startsWith(path);
    return `${baseClasses} ${
      isActive
        ? "bg-[#C8A574] text-white"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }`;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-100/50 backdrop-blur-md py-3 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 p-3">
              <img className="w-20" src={Img} alt="Film Bukhara" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to={"/locations"}
                className={getNavLinkClasses("/locations")}
              >
                {t.navbar.locations}
              </Link>
              <Link to={"/service"} className={getNavLinkClasses("/service")}>
                {t.navbar.service}
              </Link>
              <Link to={"/contact"} className={getNavLinkClasses("/contact")}>
                {t.navbar.contactUs}
              </Link>
              <button
                onClick={() => changeLanguage("en")}
                className={`px-3 py-2 rounded-md text-md font-medium border transition-colors ${
                  language === "en" ? activeLangClasses : inactiveLangClasses
                }`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("ru")}
                className={`px-3 py-2 rounded-md text-md font-medium border transition-colors ${
                  language === "ru" ? activeLangClasses : inactiveLangClasses
                }`}
              >
                RU
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
            className={getNavLinkClasses("/locations", true)}
          >
            {t.navbar.locations}
          </Link>
          <Link
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            to={"/service"}
            className={getNavLinkClasses("/service", true)}
          >
            {t.navbar.service}
          </Link>
          <Link
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            to={"/contact"}
            className={getNavLinkClasses("/contact", true)}
          >
            {t.navbar.contactUs}
          </Link>
          <button
            onClick={() => {
              changeLanguage("en");
              setIsOpen(!isOpen);
            }}
            className={`px-3 py-2 rounded-md text-md font-medium border w-full text-left transition-colors ${
              language === "en" ? activeLangClasses : inactiveLangClasses
            }`}
          >
            EN
          </button>
          <button
            onClick={() => {
              changeLanguage("ru");
              setIsOpen(!isOpen);
            }}
            className={`px-3 py-2 rounded-md text-md font-medium border w-full text-left transition-colors ${
              language === "ru" ? activeLangClasses : inactiveLangClasses
            }`}
          >
            RU
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
