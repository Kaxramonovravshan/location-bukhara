import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GA_MEASUREMENT_ID } from "../config/site";

const RouteAnalytics = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.includes("XXXX") || !window.gtag) {
      return;
    }

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: `${pathname}${search}`
    });
  }, [pathname, search]);

  return null;
};

export default RouteAnalytics;
