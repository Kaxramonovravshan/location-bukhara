import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { LanguageProvider } from "./context/LanguageContext";
import Location from "./pages/Location";
import Service from "./pages/Service";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <LanguageProvider>
      <div className="relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/locations" element={<Location />} />
          <Route path="/service" element={<Service />} />
        </Routes>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
