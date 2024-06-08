import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
const api = import.meta.env.VITE_GOOGLE_API_KEY;

// Function to load the Google Maps script
function loadGoogleMapsScript(apiKey) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.loading = "async";
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    document.head.appendChild(script);
  });
}

// Wait for the Google Maps script to load before rendering the React application
loadGoogleMapsScript(api)
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  })
  .catch((error) =>
    console.error("Failed to load the Google Maps script", error),
  );
