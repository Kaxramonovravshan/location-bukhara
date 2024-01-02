import React from "react";
import AccordionPage from "../components/AccordionPage";
import kartaUzb from "../assets/uzb.jpg"

const Locations = () => {
  return (
    <div className=" flex items-center justify-center gap-40">
      <AccordionPage/>
      <div className="w-1/2">
        <img className="border-none" src={kartaUzb} alt="" />
      </div>
    </div>
  );
};

export default Locations;
