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
    <div className="location">
      <div className="location-con md:flex-row flex-col gap-10 items-center flex justify-between ">
        <AccordionPage />
        <div className="md:w-1/2">
          {state ? <Outlet /> : <img className="w-full" src={kartaUzb} alt="" />}
        </div>
      </div>
    </div>
  );
};

export default Locations;
