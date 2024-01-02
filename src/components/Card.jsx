import React from "react";
import { Image } from "@nextui-org/react";

const Card = (props) => {
  return (
    <div className="card ">
      <Image
        isZoomed
        className="product--image"
        alt="NextUI Fruit Image with Zoom"
        src={props.url}
      />
      <h2>{props.name}</h2>
      <p className="price">{props.price}</p>
      <p>{props.description}</p>
    </div>
  );
};

export default Card;
