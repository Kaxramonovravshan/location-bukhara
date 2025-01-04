import React from "react";
import mk from "../../assets/mk.jpg";

const MasjidKalon = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col md:flex-row gap-2 img-box">
        <div className="md:border border-none w-96 min-h-56 p-3 mb-3">
          <img src={mk} alt="" />
        </div>
        <div className=" md:border border-none w-96 min-h-56 p-3 mb-3">
          <a
            target={"_blank"}
            href="https://uz.wikipedia.org/wiki/Masjidi_Kalon"
            className="underline"
          >
            <h3>
              Listed in: <span className="font-bold">Masjid Kalon</span>
            </h3>
          </a>
          <p>
            Kalan Mosque (Persian: Big mosque) is an architectural monument
            located in Bukhara, Uzbekistan. It was considered one of the largest
            mosques built on the place of Jame' Mosque.[1] Its current
            appearance was built in 1514 during the reign of Shaybani Ubaidullah
            Khan of Bukhara. Currently, the mosque is included in the national
            list of estate real objects of material and cultural heritage of
            Uzbekistan.
          </p>
        </div>
      </div>
      <div className="md:border border-none w-96 min-h-56 p-3 flex flex-wrap">
        <div className="w-1/3 border p-2">
          <img
            src={mk}
            alt=""
            className=" cursor-pointer"
          />
        </div>
        <div className="w-1/3 border p-2">
          <img
            src={mk}
            alt=""
            className=" cursor-pointer"
          />
        </div>
        <div className="w-1/3 border p-2">
          <img
            src={mk}
            alt=""
            className=" cursor-pointer"
          />
        </div>
        <div className="w-1/3 border p-2">
          <img
            src={mk}
            alt=""
            className=" cursor-pointer"
          />
        </div>
        <div className="w-1/3 border p-2">
          <img
            src={mk}
            alt=""
            className=" cursor-pointer"
          />
        </div>
        <div className="w-1/3 border p-2">
          <img
            src={mk}
            alt=""
            className=" cursor-pointer"
          />
        </div>
        <div className="w-1/3 border p-2">
          <img
            src={mk}
            alt=""
            className=" cursor-pointer"
          />
        </div>
        
      </div>
    </div>
  );
};

export default MasjidKalon;
