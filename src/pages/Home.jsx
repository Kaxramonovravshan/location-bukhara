import React from "react";
import Carusel from "../components/Carusel";
import WhoIsLocation from "../components/WhoIsLocation";
import ProjectCarusel from "../components/ProjectCarusel";
import kartaUzb from "../assets/uzb.jpg"
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Carusel />
      <WhoIsLocation />
      <ProjectCarusel />
    </div>
  );
};

export default Home;
