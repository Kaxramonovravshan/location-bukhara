import React, { useState } from "react";
import AccordionPage from "../components/AccordionPage";
import kartaUzb from "../assets/uzb.jpg";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Locations = () => {
  const [state, setState] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/locations") {
      setState(true);
    } else {
      setState(false);
    }
  }, [location.pathname]);

  return (
    <div className=" box_ flex items-center justify-center gap-40">
      <AccordionPage />
      <div className="w-1/2">
        {state ? (
          <Outlet />
        ) : (
          <img className="border-none" src={kartaUzb} alt="" />
        )}
      </div>
    </div>
  );
};

export default Locations;
