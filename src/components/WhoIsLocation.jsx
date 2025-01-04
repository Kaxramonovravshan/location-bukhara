import React from "react";
import masjid1 from "../assets/masjid1.jpg";
const WhoIsLocation = () => {
  return (
    <div className="w-full my-16">
      <div className="max-w-7xl mx-auto flex lg:flex-row flex-col items-center justify-between gap-20 p-3">
        <img className="lg:w-1/3 w-full" src={masjid1} alt="" />
        <div className="lg:w-1/2 text-box">
          <h1 className="text-2xl md:text-4xl mb-2">WHO IS LOCATION .. ?</h1>
          <p>
            LOCATION for Design & construction is an Egyptian shareholding
            company. (El Mokhtar for construction previously) had lunched on
            2003. In 2016 our company has expanded outside Egypt and opened
            another branch in the Kingdom of Bahrain. Our company is specialized
            on decoration & design in all fields of architecture & decoration.
            Our company is characterized by design & implementation works for
            the projects which had multi branches & showrooms distributed to all
            parts of the republic. The company works according to the quality
            standards & commitment of drowning & schedules agreed which made our
            company one of the best companies in the design & implementation in
            projects which had multi branches & brands according to our
            knowledge of the value of time for our customers. Our fields are
            (construction – finishing – renovations -maintenance).
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhoIsLocation;
