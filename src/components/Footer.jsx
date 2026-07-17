import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import LogoImg from "../assets/logo.webp";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import { getStaticImageAlt } from "../utils/imageAlt";

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-site-card border-t border-site-border">
      <div className="site-container section-padding pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-6">
            <img
              className="h-16 sm:h-20 lg:h-24 w-auto"
              src={LogoImg}
              alt={getStaticImageAlt("logo", language)}
              loading="lazy"
              decoding="async"
            />
            <p className="body-text text-sm">{t.footer.about}</p>
          </div>

          <div>
            <h3 className="text-content-primary font-semibold mb-6">
              {t.footer.contactTitle}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-content-secondary text-sm">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                {t.footer.address}
              </li>
              <li className="flex items-center gap-3 text-content-secondary text-sm">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                {t.footer.phone}
              </li>
              <li className="flex items-center gap-3 text-content-secondary text-sm">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a
                  href={`mailto:${t.footer.email}`}
                  className="transition-colors duration-300 hover:text-accent"
                >
                  {t.footer.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-content-primary font-semibold mb-6">
              {t.footer.discover.title}
            </h3>
            <ul className="space-y-3">
              {t.footer.discover.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-content-secondary text-sm transition-colors duration-300 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-content-primary font-semibold mb-6">
              {t.footer.social.title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {t.footer.social.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-accent flex items-center justify-center text-accent text-xs font-semibold uppercase transition-all duration-300 hover:bg-accent hover:text-site"
                  aria-label={link.label}
                  title={link.label}
                >
                  {link.label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-site-border">
        <div className="site-container py-6">
          <p className="text-center text-content-secondary text-sm">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
