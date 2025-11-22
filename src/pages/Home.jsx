import React from "react";
import { Link } from "react-router-dom";
import ProjectCarusel from "../components/ProjectCarusel";
import WhyFilmSection from "../components/WhyFilmSection";
import BlackSection from "../components/BlackSection";
import mainVideo from "../assets/mainVideo.mp4";
const Home = () => {
  return (
    <div>
      {/* Video Hero Section */}
      <div className="w-full h-[600px] lg:h-[700px] relative md:top-[-75px] overflow-hidden">
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
      <div className="w-full mb-6 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            <div className="max-w-2xl text-left">
              <p className="text-lg md:text-xl text-gray-900 leading-relaxed">
                Year-round light architecture from different areas, diverse
                cultures and centuries-old authenticity - all of this makes
                Bukhara a unique location for Filmmakers. See it, believe it.
                Then film it.
              </p>
              <Link
                to="/locations"
                className="inline-flex items-center gap-2 mt-6 text-gray-900 hover:text-gray-700 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full border-2 border-gray-900 flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                  <svg
                    className="w-4 h-4 text-gray-900 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <span className="text-sm md:text-base font-medium uppercase tracking-wide">
                  Discover Bukhara
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Project Section */}
      <div className="w-full py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900">
            Project
          </h2>
        </div>
      </div>

      <ProjectCarusel />

      <WhyFilmSection />

      <div className="w-full py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="md:text-5xl text-3xl lg:text-7xl text-black">
            40% Rebate
          </h1>
        </div>
      </div>

      <BlackSection />

      <div className="w-full py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="md:text-5xl text-3xl lg:text-6xl text-black">
            Your vision, ready for action
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
