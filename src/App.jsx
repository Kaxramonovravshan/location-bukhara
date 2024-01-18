import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Service from "./pages/Service";
import Locations from "./pages/Locations";
import MasjidKalon from "./components/locations/MasjidKalon";
import MinoraiKalon from "./components/locations/MinoraiKalon";

const App = () => {
  return (
    <div className="relative">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/locations" element={<Locations />}>
          <Route path="/locations/masjid-kalon" element={<MasjidKalon />} />
          <Route path="/locations/minorai-kalon" element={<MinoraiKalon />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
