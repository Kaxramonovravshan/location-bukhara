import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import Analytics from "./components/Analytics";
import RouteAnalytics from "./components/RouteAnalytics";
import { Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";

const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const Location = lazy(() => import("./pages/Location"));
const Service = lazy(() => import("./pages/Service"));

const PageFallback = () => (
  <div
    className="min-h-[60vh] bg-site"
    role="status"
    aria-label="Loading page"
  />
);

const App = () => {
  return (
    <LanguageProvider>
      <JsonLd />
      <Analytics />
      <RouteAnalytics />
      <div className="relative bg-site min-h-screen overflow-x-hidden max-w-[100vw]">
        <Navbar />
        <main className="pt-16 sm:pt-20">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/locations" element={<Location />} />
              <Route path="/service" element={<Service />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
