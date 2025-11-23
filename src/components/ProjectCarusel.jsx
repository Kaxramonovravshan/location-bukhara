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
      <div className="w-full md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 mb-8">
            Portfolio
          </h2>
          <Carousel
            autoPlay={true}
            autoPlaySpeed={2000}
            responsive={ProjectResponsive}
          >
            {product}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default ProjectCarusel;
