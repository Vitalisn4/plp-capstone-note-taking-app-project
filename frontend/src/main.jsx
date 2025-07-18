import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router"; // Import BrowserRouter here
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* The single BrowserRouter now wraps the entire App */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
