import React from "react";
import { Image } from "@nextui-org/react";

const ProjectCard = (props) => {
  return (
    <div className="card h-[360px]">
      <Image
        className="product--image w-100 h-[300px] rounded-none rounded-t-lg"
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
