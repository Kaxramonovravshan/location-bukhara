import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ProjectResponsive, ProjectProductData } from "../utils/data.js";
import masjid1 from "../assets/masjid1.jpg";
import ProjectCard from "./ProjectCart.jsx";

const ProjectCarusel = () => {
  const product = ProjectProductData.map((item) => (
    <ProjectCard
      key={item.id}
      name={item.name}
      url={masjid1}
      price={item.price}
      description={item.description}
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
