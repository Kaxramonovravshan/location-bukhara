import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import Analytics from "./components/Analytics";
import RouteAnalytics from "./components/RouteAnalytics";
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
      <JsonLd />
      <Analytics />
      <RouteAnalytics />
      <div className="relative bg-site min-h-screen overflow-x-hidden max-w-[100vw]">
        <Navbar />
        <main className="pt-16 sm:pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/locations" element={<Location />} />
            <Route path="/service" element={<Service />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
