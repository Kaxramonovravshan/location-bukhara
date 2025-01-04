import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";
import { productData, responsive } from "../utils/data.js";
import masjid1 from "../assets/masjid1.jpg";

const Carusel = () => {
  const product = productData.map((item) => (
    <Card
      key={item.id}
      name={item.name}
      url={masjid1}
      price={item.price}
      description={item.description}
    />
  ));
  return (
    <div className="App">
      <Carousel
        draggable
        autoPlay={true}
        autoPlaySpeed={2000}
        responsive={responsive}
      >
        {product}
      </Carousel>
    </div>
  );
};

export default Carusel;
