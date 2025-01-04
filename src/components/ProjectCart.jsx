import React from "react";
import { Image } from "@nextui-org/react";

const ProjectCard = (props) => {
  return (
    <div className="card">
      <Image
        isZoomed
        className="product--image w-100"
        alt="NextUI Fruit Image with Zoom"
        src={props.url}
      />
      <h2>{props.name}</h2>
      <p className="price">{props.price}</p>
      <p>{props.description}</p>
    </div>
  );
};

export default ProjectCard;
