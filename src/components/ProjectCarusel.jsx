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
      <h1 className="text-3xl text-center my-5">Project:</h1>

      <div className="App">
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
