import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchAPI_InputBox from "./SearchAPI_InputBox.jsx";
const api = import.meta.env.VITE_OPEN_W_API_KEY;

export default function GetWeatherData({
  fetchWeatherData,
  fetchMoonData,
  lat,
  long,
  userLat,
  userLng,
  coordinatesFromAPI,
}) {
  const [isGetWeatherLoading, setIsGetWeatherLoading] = useState(false); // Checks if the weather data is loading
  const [isGetUserGPSLoading, setIsGetUserGPSLoading] = useState(false); // Checks if the user GPS data is loading
  const [latValue, setLatValue] = useState(52.50603); // Value updates Lat & Long input fields
  const [lngValue, setLngValue] = useState(-1.451);
  const [callAPI, setCallAPI] = useState(true); // Calls the API to fetch weather data when true
  const [toggleCoords, setToggleCoords] = useState(false);

  // Fetch weather from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (callAPI) {
          const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,precipitation,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,temperature_80m,precipitation_probability,relative_humidity_2m,dew_point_2m,weather_code,&daily=sunrise,sunset&forecast_days=5&timezone=auto`,
          );
          if (!weatherResponse.ok) {
            throw new Error("Location not found for weather data");
          }
          const weatherData = await weatherResponse.json();
          fetchWeatherData(weatherData);
          setCallAPI(false);
          setIsGetWeatherLoading(false);

          const moonResponse = await fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${api}
`,
          );
          if (!moonResponse.ok) {
            throw new Error("Location not found for weather data");
          }
          const result = await moonResponse.json();
          fetchMoonData(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [callAPI]);

  // Update the input fields with the new lat and long values
  useEffect(() => {
    setLatValue(lat);
    setLngValue(long);
  }, [coordinatesFromAPI]);

  // Function to handle the user input for location - send to Geolocation API
  function handleUserLocation() {
    setIsGetUserGPSLoading(true);
    const location = navigator.geolocation;
    location.getCurrentPosition(
      (position) => {
        coordinatesFromAPI({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsGetUserGPSLoading(false);
      },
      () => {
        setIsGetWeatherLoading(false);
        setIsGetUserGPSLoading(false);
      },
    );
  }

  // Function to handle the user input for latitude and longitude - send to API Endpoints
  function handleLatChange(event) {
    const value = event.target.value;
    userLat(value);
  }

  function handleLngChange(event) {
    const value = event.target.value;
    userLng(value);
  }

  // Function to handle the API call - invoked when the main get weather button is clicked
  function handleCallAPI(e) {
    e.preventDefault();
    setIsGetWeatherLoading(true);
    setCallAPI(true);
  }

  const magnifyingGlassSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e8eaed"
    >
      <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
    </svg>
  );

  const GPSIconSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e8eaed"
    >
      <path d="M440-42v-80q-125-14-214.5-103.5T122-440H42v-80h80q14-125 103.5-214.5T440-838v-80h80v80q125 14 214.5 103.5T838-520h80v80h-80q-14 125-103.5 214.5T520-122v80h-80Zm40-158q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-120q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400Zm0-80Z" />
    </svg>
  );

  const loadingSpinner = (
    <svg
      className="animate-spin"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      />
      <path
        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
        className="spinner_ajPY"
      />
    </svg>
  );

  return (
    <>
      <form className={``} onSubmit={(e) => handleCallAPI(e)}>
        <search className="mb-2 flex w-full items-center justify-between gap-2">
          <SearchAPI_InputBox coordinatesFromAPI={coordinatesFromAPI} />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex grid h-10 w-10 place-items-center items-center gap-1 rounded bg-blue-500 p-1 font-inter text-LIGHT-COLOR"
            >
              {isGetWeatherLoading ? loadingSpinner : magnifyingGlassSVG}
            </button>

            <button
              type="button"
              onClick={() => {
                handleUserLocation();
              }}
              className="grid h-10 w-10 place-items-center gap-1 rounded bg-blue-500 px-2 py-1 font-inter text-LIGHT-COLOR"
            >
              {isGetUserGPSLoading ? loadingSpinner : GPSIconSVG}
            </button>
          </div>
        </search>
        <div className="mb-2 flex gap-2">
          <div className="flex items-center gap-1">
            <p className="text-LIGHT-COLOR">Lat:</p>
            <input
              className="w-full rounded bg-000E14 px-2 py-2 text-LIGHT-COLOR"
              type="text"
              placeholder="51.5072"
              value={latValue}
              onChange={handleLatChange}
            />
          </div>
          <div className="flex items-center gap-1">
            <p className="text-LIGHT-COLOR">Long:</p>
            <input
              className="w-full rounded bg-000E14 px-2 py-2 text-LIGHT-COLOR"
              placeholder="0.1276"
              value={lngValue}
              onChange={handleLngChange}
            />
          </div>
        </div>
      </form>
    </>
  );
}
