import React from "react";
import img1 from "../../assets/kupol/1.jpg";
import img2 from "../../assets/kupol/2.jpg";
import img3 from "../../assets/kupol/3.jpg";
import img4 from "../../assets/kupol/4.jpg";
import img5 from "../../assets/kupol/5.jpg";
import img6 from "../../assets/kupol/6.jpg";

const MasjidKalon = () => {
  return (
    <div className="flex w-full flex-col border">
      <div className="flex flex-col md:flex-row gap-2 img-box">
        <div className="md:border border-none w-96 min-h-56 p-3 mb-3">
          <img src={img1} alt="" />
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
        <div className="w-1/3 h-20 border p-2">
          <img
            src={img2}
            alt=""
            className="h-full hover:opacity-100 cursor-pointer"
          />
        </div>
        <div className="w-1/3 h-20 border p-2">
          <img
            src={img3}
            alt=""
            className="h-full hover:opacity-100 cursor-pointer"
          />
        </div>
        <div className="w-1/3 h-20 border p-2">
          <img
            src={img4}
            alt=""
            className="h-full hover:opacity-100 cursor-pointer"
          />
        </div>
        <div className="w-1/3 h-20 border p-2">
          <a href={img1}>
            <img
              src={img1}
              alt=""
              className="h-full hover:opacity-100 cursor-pointer"
            />
          </a>
        </div>
        <div className="w-1/3 h-20 border p-2">
          <img
            src={img6}
            alt=""
            className="h-full hover:opacity-100 cursor-pointer"
          />
        </div>
        <div className="w-1/3 h-20 border p-2">
          <img
            src={img2}
            alt=""
            className="h-full hover:opacity-100 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default MasjidKalon;
