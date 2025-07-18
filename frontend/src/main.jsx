import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router"; // Ensure this import is correct
import App from "./App.jsx";
import "./index.css";

// This is the standard entry point for a Vite + React application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 
      This is the single, top-level router for the entire application.
      It provides the routing context to all child components, including App.jsx.
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
