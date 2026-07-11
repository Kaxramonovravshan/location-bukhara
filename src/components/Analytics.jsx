import { useEffect } from "react";
import { GA_MEASUREMENT_ID } from "../config/site";

const Analytics = () => {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.includes("XXXX")) {
      return;
    }

    const existingScript = document.getElementById("ga-script");
    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.id = "ga-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
  }, []);

  return null;
};

export default Analytics;
