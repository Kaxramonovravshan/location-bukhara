import React, { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const AccordionPage = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const { language } = useLanguage();
  const t = translations[language];

  // Check if mobile viewport (Tailwind's md breakpoint is 768px)
  const isMobile = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  };

  const handleLinkClick = () => {
    // Close accordion on mobile when clicking a location link
    if (isMobile()) {
      setSelectedKeys(new Set());
    }
  };

  return (
    <div className="w-80 flex flex-col gap-3">
      <Accordion
        variant="splitted"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(keys)}
      >
        <AccordionItem
          key="1"
          aria-label={t.accordion.bukharaRegion}
          title={t.accordion.bukharaRegion}
        >
          <ul className="">
            <Link to={"/locations/masjid-kalon"} onClick={handleLinkClick}>
              <li className="border w-full p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
                {t.accordion.architecturalMonuments}
              </li>
            </Link>
            <Link to={"/locations/minorai-kalon"} onClick={handleLinkClick}>
              <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
                {t.accordion.mosques}
              </li>
            </Link>
            <Link to={"/locations/kupol"} onClick={handleLinkClick}>
              <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
                {t.accordion.tradingRows}
              </li>
            </Link>
            <Link to={"/locations/kupol"} onClick={handleLinkClick}>
              <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
                {t.accordion.reservoirs}
              </li>
            </Link>
            <Link to={"/locations/kupol"} onClick={handleLinkClick}>
              <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
                {t.accordion.oldCityStreets}
              </li>
            </Link>
            <Link to={"/locations/kupol"} onClick={handleLinkClick}>
              <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
                {t.accordion.deserts}
              </li>
            </Link>
            <Link to={"/locations/kupol"} onClick={handleLinkClick}>
              <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
                {t.accordion.mountains}
              </li>
            </Link>
          </ul>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label={t.accordion.samarkandRegion}
          title={t.accordion.samarkandRegion}
        >
          <ul className="">
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              {t.common.masjidKalon}
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              {t.common.minoraiKalon}
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              {t.common.ark}
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              {t.common.eskiShahar}
            </li>
          </ul>
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label={t.accordion.tashkentRegion}
          title={t.accordion.tashkentRegion}
        >
          <ul className="">
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              {t.common.masjidKalon}
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              {t.common.minoraiKalon}
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              {t.common.ark}
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              {t.common.eskiShahar}
            </li>
          </ul>
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label={t.accordion.khorezmRegion}
          title={t.accordion.khorezmRegion}
        >
          <ul className="">
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              {t.common.masjidKalon}
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              {t.common.minoraiKalon}
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              {t.common.ark}
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              {t.common.eskiShahar}
            </li>
          </ul>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AccordionPage;
