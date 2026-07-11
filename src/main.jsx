import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <NextUIProvider className="font-sans">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NextUIProvider>
    </HelmetProvider>
  </StrictMode>
);