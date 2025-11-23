import React from "react";
import { Image } from "@nextui-org/react";

const ProjectCard = (props) => {
  return (
    <div className="card h-full flex flex-col">
      <div className="flex-shrink-0 w-full aspect-[4/3] overflow-hidden rounded-t-lg bg-gray-100">
        <Image
          className="product--image w-full h-full rounded-none rounded-t-lg object-cover"
          alt="NextUI Fruit Image with Zoom"
          src={props.url}
        />
      </div>
      <div className="flex-1 flex flex-col justify-between p-4 bg-white rounded-b-lg">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {props.name}
          </h2>
          {props.price && (
            <p className="price text-gray-600 mb-2">{props.price}</p>
          )}
          {props.description && (
            <p className="text-sm text-gray-500 line-clamp-3">
              {props.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
