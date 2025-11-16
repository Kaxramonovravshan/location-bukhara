import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-black text-white">
      {/* Top Section */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-4">
            {/* Logo - Left */}
            <div className="flex flex-col">
              
              <span className="text-white text-xl md:text-2xl font-semibold">
                {t.footer.logo.english}
              </span>
            </div>
            

            {/* Contact Button - Right */}
            <div className="flex justify-center lg:justify-end">
              <Link
                to="/service"
                className="inline-block px-6 py-3 border border-white rounded-lg text-white hover:bg-white hover:text-black transition-colors text-base md:text-lg"
              >
                {t.footer.contactButton}
              </Link>
            </div>
          </div>
        </div>
      </div>
    <div className="w-full h-[1px] bg-white"></div>
      {/* Bottom Section - Footer Links */}
      <div className="border-b border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
            {/* Discover Column */}
            <div>
              <h3 className="text-lg md:text-xl font-medium mb-6 text-white">
                {t.footer.discover.title}
              </h3>
              <ul className="space-y-4">
                {t.footer.discover.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-base md:text-lg text-white hover:text-gray-400 transition-colors block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-lg md:text-xl font-medium mb-6 text-white">
                {t.footer.quickLinks.title}
              </h3>
              <ul className="space-y-4">
                {t.footer.quickLinks.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-base md:text-lg text-white hover:text-gray-400 transition-colors block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Column */}
            <div>
              <h3 className="text-lg md:text-xl font-medium mb-6 text-white">
                {t.footer.social.title}
              </h3>
              <ul className="space-y-4">
                {t.footer.social.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base md:text-lg text-white hover:text-gray-400 transition-colors block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
