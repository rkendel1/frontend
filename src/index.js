import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Ensure this points to your main component
import "./index.css"; // Optional: Ensure your CSS file is correctly imported

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}