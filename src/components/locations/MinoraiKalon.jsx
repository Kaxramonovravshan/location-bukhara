import React from "react";
import minora from "../../assets/minora.jpg";

const MinoraiKalon = () => {
  return (
    <div className="flex w-full flex-col border-red-950">
      <div className="flex flex-col md:flex-row gap-2 img-box">
        <div className="md:border border-none w-96 min-h-56 p-3 mb-3">
          <img src={minora} alt="" />
        </div>
        <div className=" md:border border-none w-96 min-h-56 p-3 mb-3">
          <a
            target={"_blank"}
            href="https://en.wikipedia.org/wiki/Kalyan_Minaret"
            className="underline"
          >
            <h3>
              Listed in: <span className="font-bold">Minorai Kalon</span>
            </h3>
          </a>
          <p>
            The Kalyan Minaret (Uzbek: Minorai Kalon, Persian/Tajik: Minâra-i
            Kalân, Kalon Minor, Kalon Minaret[2]) is a minaret of the
            Po-i-Kalyan mosque complex in Bukhara, Uzbekistan and one of the
            most prominent landmarks in the city. The minaret, designed by Bako,
            was built on an earlier existing structure called Kalyan by the
            Qarakhanid ruler Mohammad Arslan Khan in 1127 to summon Muslims to
            prayer five times a day.
          </p>
        </div>
      </div>
      <div className="md:border border-none  w-96 min-h-56 p-3 flex flex-wrap">
        <div className="w-1/3 border p-2">
          <img src={minora} alt="" className=" cursor-pointer" />
        </div>
        <div className="w-1/3 border p-2">
          <img src={minora} alt="" className=" cursor-pointer" />
        </div>
        <div className="w-1/3 border p-2">
          <img src={minora} alt="" className=" cursor-pointer" />
        </div>
        <div className="w-1/3 border p-2">
          <img src={minora} alt="" className=" cursor-pointer" />
        </div>
        <div className="w-1/3 border p-2">
          <img src={minora} alt="" className=" cursor-pointer" />
        </div>
        <div className="w-1/3 border p-2">
          <img src={minora} alt="" className=" cursor-pointer" />
        </div>
        <div className="w-1/3 border p-2">
          <img src={minora} alt="" className=" cursor-pointer" />
        </div>
        <div className="w-1/3 border p-2">
          <img src={minora} alt="" className=" cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default MinoraiKalon;
