import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  DEFAULT_OG_IMAGE,
  SITE_ADDRESS,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE,
  SITE_SOCIAL,
  SITE_URL
} from "../config/site";
import { useLanguage } from "../context/LanguageContext";
import { getPageSeo } from "../seo/pageSeo";

const JsonLd = () => {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const seo = getPageSeo(pathname, language);
  const address = SITE_ADDRESS[language] || SITE_ADDRESS.en;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    image: DEFAULT_OG_IMAGE,
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bukhara",
      addressCountry: "UZ",
      streetAddress: address
    },
    sameAs: Object.values(SITE_SOCIAL)
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: ["en", "ru"]
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${seo.canonical}#webpage`,
    url: seo.canonical,
    name: seo.title,
    description: seo.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: language
  };

  const breadcrumbItems = [
    { name: language === "ru" ? "Главная" : "Home", path: "/" }
  ];

  if (pathname !== "/") {
    breadcrumbItems.push({
      name: seo.title.split("|")[0].trim(),
      path: pathname
    });
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "/" : item.path}`
    }))
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website, webPage, breadcrumb]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(graph)}</script>
    </Helmet>
  );
};

export default JsonLd;
