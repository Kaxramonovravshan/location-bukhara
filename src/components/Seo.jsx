import { Helmet } from "react-helmet-async";
import {
  DEFAULT_OG_IMAGE,
  GSC_VERIFICATION,
  SITE_NAME,
  SITE_NAME_SHORT,
  SITE_URL
} from "../config/site";

const Seo = ({
  title,
  description,
  keywords,
  canonical,
  path = "/",
  language = "en",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false
}) => {
  const locale = language === "ru" ? "ru_RU" : "en_US";
  const alternateLocale = language === "ru" ? "en_US" : "ru_RU";
  const alternatePath = `${SITE_URL}${path}`;

  return (
    <Helmet prioritizeSeoTags>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={SITE_NAME_SHORT} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={alternateLocale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="alternate" hrefLang={language} href={alternatePath} />
      <link rel="alternate" hrefLang={language === "ru" ? "en" : "ru"} href={alternatePath} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${path}`} />

      {GSC_VERIFICATION && (
        <meta name="google-site-verification" content={GSC_VERIFICATION} />
      )}
    </Helmet>
  );
};

export default Seo;
