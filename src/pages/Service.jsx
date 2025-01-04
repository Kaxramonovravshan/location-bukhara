import React from "react";
import deko from "../assets/deko.jpg";

const Service = () => {
  return (
    <div className="service">
      <div className="ser-box flex md:flex-row flex-col justify-between items-center p-2">
        <div className="md:w-1/4 border p-3 rounded-xl shadow-lg">
          <div className="mb-2">
            <img className="w-100 rounded-md" src={deko} alt="" />
          </div>

          <h4 className="mb-2">Dekoratsiya</h4>
          <p className="mb-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat
            atque perspiciatis ipsam, libero necessitatibus fugiat.
          </p>
          <button className="loc-btn mx-auto block">show more info</button>
        </div>
        <div className="md:w-1/4 border p-3 rounded-xl shadow-lg">
          <div className="mb-2">
            <img className="w-100 rounded-md" src={deko} alt="" />
          </div>

          <h4 className="mb-2">Dekoratsiya</h4>
          <p className="mb-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat
            atque perspiciatis ipsam, libero necessitatibus fugiat.
          </p>
          <button className="loc-btn mx-auto block">show more info</button>
        </div>
        <div className="md:w-1/4 border p-3 rounded-xl shadow-lg">
          <div className="mb-2">
            <img className="w-100 rounded-md" src={deko} alt="" />
          </div>

          <h4 className="mb-2">Dekoratsiya</h4>
          <p className="mb-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat
            atque perspiciatis ipsam, libero necessitatibus fugiat.
          </p>
          <button className="loc-btn mx-auto block">show more info</button>
        </div>
        <div className="md:w-1/4 border p-3 rounded-xl shadow-lg">
          <div className="mb-2">
            <img className="w-100 rounded-md" src={deko} alt="" />
          </div>

          <h4 className="mb-2">Dekoratsiya</h4>
          <p className="mb-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat
            atque perspiciatis ipsam, libero necessitatibus fugiat.
          </p>
          <button className="loc-btn mx-auto block">show more info</button>
        </div>
      </div>
    </div>
  );
};

export default Service;
