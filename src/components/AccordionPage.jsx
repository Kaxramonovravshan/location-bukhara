import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Link } from "react-router-dom";

const AccordionPage = () => {
  return (
    <div className="w-80 flex flex-col gap-3">
      <Accordion variant="splitted">
        <AccordionItem
          key="1"
          aria-label="Bukhara region"
          title="Bukhara region"
        >
          <ul className="">
            <Link to={"/locations/masjid-kalon"}>
              <li className="border w-full p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
                Masjid Kalon
              </li>
            </Link>
            <Link to={"/locations/minorai-kalon"}>
              <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
                Minorai Kalon
              </li>
            </Link>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              Ark
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              Eski Shahar
            </li>
          </ul>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Bukhara region"
          title="Samarkand region"
        >
          <ul className="">
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              Masjid Kalon
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              Minorai Kalon
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              Ark
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              Eski Shahar
            </li>
          </ul>
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Bukhara region"
          title="Tashkent region"
        >
          <ul className="">
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              Masjid Kalon
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              Minorai Kalon
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              Ark
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              Eski Shahar
            </li>
          </ul>
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Bukhara region"
          title="Khorezm region"
        >
          <ul className="">
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              Masjid Kalon
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              Minorai Kalon
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              Ark
            </li>
            <li className="border p-2 rounded-xl shadow-md mb-2 hover:bg-zinc-500 hover:text-cyan-50 cursor-pointer">
              Eski Shahar
            </li>
          </ul>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AccordionPage;
