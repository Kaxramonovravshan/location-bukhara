import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import Img from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];
  const location = useLocation();

  const navItems = [
    { path: "/", label: t.navbar.home },
    { path: "/locations", label: t.navbar.locations },
    { path: "/service", label: t.navbar.service },
    { path: "/contact", label: t.navbar.contactUs }
  ];

  const isActive = (path) =>
    path === "/"
      ? location.pathname === path
      : location.pathname.startsWith(path);

  const getLinkClasses = (path) =>
    isActive(path) ? "nav-link nav-link-active" : "nav-link";

  return (
    <nav className="sticky top-0 z-30 bg-site/95 backdrop-blur-md border-b border-site-border">
      <div className="site-container">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
            <img className="h-10 sm:h-12 lg:h-14 w-auto shrink-0" src={Img} alt="BuxoroFilm" />
            <div className="leading-tight min-w-0">
              <p className="text-accent font-semibold text-[10px] sm:text-sm tracking-wider truncate">
                {t.navbar.brand}
              </p>
              <p className="text-content-secondary text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] truncate">
                {t.navbar.brandSub}
              </p>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={getLinkClasses(item.path)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-4">
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="nav-link inline-flex items-center gap-1 min-h-[44px]"
              >
                {language.toUpperCase()}
                <ChevronDown className="w-4 h-4" />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 py-2 w-24 card-surface shadow-xl">
                  {["en", "ru"].map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        changeLanguage(lang);
                        setLangOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm font-semibold uppercase transition-colors duration-300 ${
                        language === lang
                          ? "text-accent"
                          : "text-content-secondary hover:text-accent"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-content-primary"
            aria-label="Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="xl:hidden border-t border-site-border bg-site max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="site-container py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3.5 min-h-[44px] ${getLinkClasses(item.path)}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-4 border-t border-site-border mt-4">
              {["en", "ru"].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    changeLanguage(lang);
                    setIsOpen(false);
                  }}
                  className={`flex-1 min-h-[44px] px-4 py-2 text-sm font-semibold uppercase border rounded-xl transition-all duration-300 ${
                    language === lang
                      ? "border-accent text-accent"
                      : "border-site-border text-content-secondary"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
