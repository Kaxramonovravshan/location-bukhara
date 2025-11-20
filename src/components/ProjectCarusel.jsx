import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ProjectResponsive, ProjectProductData } from "../utils/data.js";
import ProjectCard from "./ProjectCart.jsx";
import { useLanguage } from "../context/LanguageContext";

const ProjectCarusel = () => {
  const { language } = useLanguage();
  const product = ProjectProductData.map((item) => (
    <ProjectCard
      key={item.id}
      name={item.name?.[language] || item.name}
      url={item.imageurl}
      price={item.price}
      description={item.description?.[language] || item.description}
    />
  ));
  return (
    <>
      <div className="px-5 md:py-16 w-full">
        <Carousel
          autoPlay={true}
          autoPlaySpeed={2000}
          responsive={ProjectResponsive}
        >
          {product}
        </Carousel>
      </div>
    </>
  );
};

export default ProjectCarusel;
