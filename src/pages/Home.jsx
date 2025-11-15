import React from "react";
import ProjectCarusel from "../components/ProjectCarusel";
import mainVideo from "../assets/mainVideo.mp4";
const Home = () => {
  return (
    <div>
      {/* Video Hero Section */}
      <div className="w-full h-[600px] lg:h-[700px] relative top-[-70px] overflow-hidden">
        {/* Video Section */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={mainVideo} type="video/mp4" />
        </video>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-start md:justify-end md:pr-40 p-5">
          <div className="">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-normal text-white leading-tight">
              Your Next
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-normal text-white leading-tight">
              Film Starts Here
            </h1>
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div className="w-full">
        <div className="inset-0 flex items-center p-5">
          <div className="">
            <h1 className="text-3xl md:leading-[80px] md:text-5xl lg:text-7xl font-normal  text-gray-900 ">
              Year-round light architecture from different areas, diverse
              cultures and centuries-old authenticity - all of this makes
              Bukhara a unique location for Filmmakers.
            </h1>
            <p className="text-gray-900 text-2xl font-normal mt-3">See it. Believe it. Film it.</p>
          </div>
        </div>
      </div>

      <ProjectCarusel />
    </div>
  );
};

export default Home;
