import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router"; // Import BrowserRouter here
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* This is the single, top-level router for the entire application. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
