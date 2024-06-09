import { useLayoutEffect, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Display24HrsData from "./Display24HrsData.jsx";
import DisplayTimeDateMoonData from "./DisplayTimeDateMoonData.jsx";
import ShowChartElements from "./ShowChartElements.jsx";
import GetWeatherData from "./GetWeatherData.jsx";

export default function MainAppDisplay({
  openLocationSearch,
  celOrFar,
  mphOrKph,
}) {
  // Weather data state.
  const [hourlyWeatherData, setHourlyWeatherData] = useState([]);
  const [dailyMoonData, setDailyMoonData] = useState([]);
  const [dailyWeatherData, setDailyWeatherData] = useState([]);

  // State that shows the loading spinner when data is loading.
  const [isLoading, setIsLoading] = useState(true);

  // Coordinates state from Google Places API
  const [lat, setLat] = useState(52.50603);
  const [lng, setLng] = useState(-1.451);

  // State to toggle the chart and chart elements from shown to hidden
  const [showHighClouds, setShowHighClouds] = useState(false);
  const [showMidClouds, setShowMidClouds] = useState(false);
  const [showLowClouds, setShowLowClouds] = useState(false);
  const [showGraph, setShowGraph] = useState(true);

  // Element references
  const sectionRef = useRef(null);
  const timeDateRef = useRef(null);
  const weatherSectionRef = useRef(null);

  // State for the H3 position based on scroll.
  const [scrollPosition, setScrollPosition] = useState(0);

  const leftMargin = "-ml-3";
  const headingThreeStylingFirstDay =
    "text-LIGHT-COLOR relative z-30 mb-2 top-0 font-inter w-screen";
  const headingThreeStylingAfterDay =
    "text-transparent relative z-30 mb-2 top-0 font-inter w-screen";

  // Set Lat and Long from the Google Places API.
  const handleCoordsFromAPI = (latLng) => {
    setLat(latLng.lat.toFixed(5));
    setLng(latLng.lng.toFixed(5));
  };

  // Set Lat and Long from the user input.
  const handleUserLatInput = (userLat) => {
    setLat(userLat);
  };
  const handleUserLngInput = (userLng) => {
    setLng(userLng);
  };

  // Fetch the weather data from the API.
  const handleFetchWeatherData = (data) => {
    setHourlyWeatherData(data.hourly);
    setDailyWeatherData(data.daily);
    setIsLoading(false);
  };

  // Fetch the moon data from the API.
  const handleFetchMoonData = (data) => {
    setDailyMoonData(data.daily);
  };

  // Toggle the area charts and whole chart visible or hidden.
  const toggleShowHighClouds = () => {
    setShowHighClouds((prev) => !prev);
  };
  const toggleShowMidClouds = () => {
    setShowMidClouds((prev) => !prev);
  };
  const toggleShowLowClouds = () => {
    setShowLowClouds((prev) => !prev);
  };
  const toggleShowGraph = () => {
    setShowGraph((prev) => !prev);
  };

  // useEffect to handle the scroll event for the H3 elements.
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(sectionRef.current.scrollLeft);
    };

    const section = sectionRef.current;
    section.addEventListener("scroll", handleScroll);

    return () => {
      section.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log(dailyWeatherData);
  }, [dailyWeatherData]);

  // useEffect to handle the height of the main weather section.
  useLayoutEffect(() => {
    const updateHeights = () => {
      if (
        timeDateRef.current &&
        weatherSectionRef.current &&
        hourlyWeatherData
      ) {
        const windowHeight = window.innerHeight;
        const divTop = weatherSectionRef.current.getBoundingClientRect().top;
        const divHeight = windowHeight - divTop;
        weatherSectionRef.current.style.height = `${divHeight}px`;
      }
    };

    // Initial call to update the heights.
    updateHeights();

    // Event listener to update the heights on resize. Only resize if the screen is over 768px to avoid mobile issues.
    if (window.innerWidth > 768) {
      window.addEventListener("resize", updateHeights);
    }

    return () => {
      window.removeEventListener("resize", updateHeights);
    };
  }, [dailyWeatherData, hourlyWeatherData, dailyWeatherData]);

  return (
    <section className={`relative`}>
      <div
        // Styling for the location search input boxes - visible or hidden.
        style={
          openLocationSearch
            ? {
                maxHeight: "1000px",
                opacity: 1,
                transition:
                  "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out",
                pointerEvents: "all",
              }
            : {
                maxHeight: 0,
                opacity: 0,
                transition:
                  "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out",
                pointerEvents: "none",
              }
        }
      >
        <GetWeatherData
          lat={lat}
          long={lng}
          userLat={handleUserLatInput}
          userLng={handleUserLngInput}
          fetchWeatherData={handleFetchWeatherData}
          fetchMoonData={handleFetchMoonData}
          coordinatesFromAPI={handleCoordsFromAPI}
        />
      </div>
      <ShowChartElements
        highClouds={toggleShowHighClouds}
        midClouds={toggleShowMidClouds}
        lowClouds={toggleShowLowClouds}
        showGraph={toggleShowGraph}
      />
      <section
        ref={sectionRef}
        style={isLoading ? { overflowX: "hidden" } : { overflowX: "auto" }}
        className={`relative flex`}
      >
        {isLoading && (
          <div className="absolute left-0 top-0 z-[999] grid h-full w-screen place-items-center bg-000E14">
            <svg
              className="animate-spin"
              fill="white"
              width="50"
              height="50"
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
          </div>
        )}

        <div className="relative">
          <div className={`relative`}>
            <div
              ref={timeDateRef}
              className="absolute top-0 z-[100] ml-[2px] flex h-[8rem] gap-2"
            >
              <DisplayTimeDateMoonData
                hourlyWeatherData={hourlyWeatherData}
                dailyWeatherData={dailyWeatherData}
                dayStart={0}
                dayEnd={24}
                day={0}
                dailyMoonData={dailyMoonData}
                // timeMarginLeft={"ml-[2px] -px-[2px]"}
              />
              <DisplayTimeDateMoonData
                hourlyWeatherData={hourlyWeatherData}
                dailyWeatherData={dailyWeatherData}
                dayStart={24}
                dayEnd={48}
                day={1}
                dailyMoonData={dailyMoonData}
                timeMarginLeft={leftMargin}
              />
              <DisplayTimeDateMoonData
                hourlyWeatherData={hourlyWeatherData}
                dailyWeatherData={dailyWeatherData}
                dayStart={48}
                dayEnd={72}
                day={2}
                dailyMoonData={dailyMoonData}
                timeMarginLeft={leftMargin}
              />
              <DisplayTimeDateMoonData
                hourlyWeatherData={hourlyWeatherData}
                dailyWeatherData={dailyWeatherData}
                dayStart={72}
                dayEnd={96}
                day={3}
                dailyMoonData={dailyMoonData}
                timeMarginLeft={leftMargin}
              />
              <DisplayTimeDateMoonData
                hourlyWeatherData={hourlyWeatherData}
                dailyWeatherData={dailyWeatherData}
                dayStart={96}
                dayEnd={120}
                day={4}
                dailyMoonData={dailyMoonData}
                timeMarginLeft={leftMargin}
                timeMarginRight={"pr-2.5"}
              />
            </div>
          </div>
          <div
            ref={weatherSectionRef}
            // style={{ marginTop: `${timeDateHeight}px` }}
            className="sticky top-0 z-[50] mt-[8rem] flex overflow-x-hidden overflow-y-scroll rounded"
          >
            <Display24HrsData
              hourlyWeatherData={hourlyWeatherData}
              dayStart={0}
              dayEnd={24}
              clouds={{
                high: showHighClouds,
                mid: showMidClouds,
                low: showLowClouds,
              }}
              showGraph={showGraph}
              scrollPosition={scrollPosition}
              headingThreeStyling={headingThreeStylingFirstDay}
              openLocationSearch={openLocationSearch}
              celOrFar={celOrFar}
              mphOrKph={mphOrKph}
            />

            <Display24HrsData
              hourlyWeatherData={hourlyWeatherData}
              dayStart={24}
              dayEnd={48}
              clouds={{
                high: showHighClouds,
                mid: showMidClouds,
                low: showLowClouds,
              }}
              showGraph={showGraph}
              headingThreeStyling={headingThreeStylingAfterDay}
              leftMargin={leftMargin}
              celOrFar={celOrFar}
              mphOrKph={mphOrKph}
            />

            <Display24HrsData
              hourlyWeatherData={hourlyWeatherData}
              dayStart={48}
              dayEnd={72}
              clouds={{
                high: showHighClouds,
                mid: showMidClouds,
                low: showLowClouds,
              }}
              showGraph={showGraph}
              headingThreeStyling={headingThreeStylingAfterDay}
              leftMargin={leftMargin}
              celOrFar={celOrFar}
              mphOrKph={mphOrKph}
            />

            <Display24HrsData
              hourlyWeatherData={hourlyWeatherData}
              dayStart={72}
              dayEnd={96}
              clouds={{
                high: showHighClouds,
                mid: showMidClouds,
                low: showLowClouds,
              }}
              showGraph={showGraph}
              headingThreeStyling={headingThreeStylingAfterDay}
              leftMargin={leftMargin}
              celOrFar={celOrFar}
              mphOrKph={mphOrKph}
            />

            <Display24HrsData
              hourlyWeatherData={hourlyWeatherData}
              dayStart={96}
              dayEnd={120}
              clouds={{
                high: showHighClouds,
                mid: showMidClouds,
                low: showLowClouds,
              }}
              showGraph={showGraph}
              headingThreeStyling={headingThreeStylingAfterDay}
              leftMargin={leftMargin}
              celOrFar={celOrFar}
              mphOrKph={mphOrKph}
            />
          </div>
        </div>
        {/*<div className="relative">*/}
        {/*  <div className={`relative`}>*/}
        {/*    <div*/}
        {/*      ref={timeDateRef}*/}
        {/*      className="absolute top-0 z-[100] ml-[2px] flex h-[8rem] gap-2"*/}
        {/*    >*/}
        {/*      <DisplayTimeDateMoonData*/}
        {/*        hourlyWeatherData={hourlyWeatherData}*/}
        {/*        dailyWeatherData={dailyWeatherData}*/}
        {/*        dayStart={0}*/}
        {/*        dayEnd={24}*/}
        {/*        day={0}*/}
        {/*        dailyMoonData={dailyMoonData}*/}
        {/*        // timeMarginLeft={"ml-[2px] -px-[2px]"}*/}
        {/*      />*/}
        {/*      <DisplayTimeDateMoonData*/}
        {/*        hourlyWeatherData={hourlyWeatherData}*/}
        {/*        dailyWeatherData={dailyWeatherData}*/}
        {/*        dayStart={24}*/}
        {/*        dayEnd={48}*/}
        {/*        day={1}*/}
        {/*        dailyMoonData={dailyMoonData}*/}
        {/*        timeMarginLeft={leftMargin}*/}
        {/*      />*/}
        {/*      <DisplayTimeDateMoonData*/}
        {/*        hourlyWeatherData={hourlyWeatherData}*/}
        {/*        dailyWeatherData={dailyWeatherData}*/}
        {/*        dayStart={48}*/}
        {/*        dayEnd={72}*/}
        {/*        day={2}*/}
        {/*        dailyMoonData={dailyMoonData}*/}
        {/*        timeMarginLeft={leftMargin}*/}
        {/*      />*/}
        {/*      <DisplayTimeDateMoonData*/}
        {/*        hourlyWeatherData={hourlyWeatherData}*/}
        {/*        dailyWeatherData={dailyWeatherData}*/}
        {/*        dayStart={72}*/}
        {/*        dayEnd={96}*/}
        {/*        day={3}*/}
        {/*        dailyMoonData={dailyMoonData}*/}
        {/*        timeMarginLeft={leftMargin}*/}
        {/*      />*/}
        {/*      <DisplayTimeDateMoonData*/}
        {/*        hourlyWeatherData={hourlyWeatherData}*/}
        {/*        dailyWeatherData={dailyWeatherData}*/}
        {/*        dayStart={96}*/}
        {/*        dayEnd={120}*/}
        {/*        day={4}*/}
        {/*        dailyMoonData={dailyMoonData}*/}
        {/*        timeMarginLeft={leftMargin}*/}
        {/*        timeMarginRight={"pr-2.5"}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div*/}
        {/*    ref={weatherSectionRef}*/}
        {/*    // style={{ marginTop: `${timeDateHeight}px` }}*/}
        {/*    className="sticky top-0 z-[50] mt-[8rem] flex overflow-x-hidden overflow-y-scroll rounded"*/}
        {/*  >*/}
        {/*    <Display24HrsData*/}
        {/*      hourlyWeatherData={hourlyWeatherData}*/}
        {/*      dayStart={0}*/}
        {/*      dayEnd={24}*/}
        {/*      clouds={{*/}
        {/*        high: showHighClouds,*/}
        {/*        mid: showMidClouds,*/}
        {/*        low: showLowClouds,*/}
        {/*      }}*/}
        {/*      showGraph={showGraph}*/}
        {/*      scrollPosition={scrollPosition}*/}
        {/*      headingThreeStyling={headingThreeStylingFirstDay}*/}
        {/*      openLocationSearch={openLocationSearch}*/}
        {/*      celOrFar={celOrFar}*/}
        {/*      mphOrKph={mphOrKph}*/}
        {/*    />*/}

        {/*    <Display24HrsData*/}
        {/*      hourlyWeatherData={hourlyWeatherData}*/}
        {/*      dayStart={24}*/}
        {/*      dayEnd={48}*/}
        {/*      clouds={{*/}
        {/*        high: showHighClouds,*/}
        {/*        mid: showMidClouds,*/}
        {/*        low: showLowClouds,*/}
        {/*      }}*/}
        {/*      showGraph={showGraph}*/}
        {/*      headingThreeStyling={headingThreeStylingAfterDay}*/}
        {/*      leftMargin={leftMargin}*/}
        {/*      celOrFar={celOrFar}*/}
        {/*      mphOrKph={mphOrKph}*/}
        {/*    />*/}

        {/*    <Display24HrsData*/}
        {/*      hourlyWeatherData={hourlyWeatherData}*/}
        {/*      dayStart={48}*/}
        {/*      dayEnd={72}*/}
        {/*      clouds={{*/}
        {/*        high: showHighClouds,*/}
        {/*        mid: showMidClouds,*/}
        {/*        low: showLowClouds,*/}
        {/*      }}*/}
        {/*      showGraph={showGraph}*/}
        {/*      headingThreeStyling={headingThreeStylingAfterDay}*/}
        {/*      leftMargin={leftMargin}*/}
        {/*      celOrFar={celOrFar}*/}
        {/*      mphOrKph={mphOrKph}*/}
        {/*    />*/}

        {/*    <Display24HrsData*/}
        {/*      hourlyWeatherData={hourlyWeatherData}*/}
        {/*      dayStart={72}*/}
        {/*      dayEnd={96}*/}
        {/*      clouds={{*/}
        {/*        high: showHighClouds,*/}
        {/*        mid: showMidClouds,*/}
        {/*        low: showLowClouds,*/}
        {/*      }}*/}
        {/*      showGraph={showGraph}*/}
        {/*      headingThreeStyling={headingThreeStylingAfterDay}*/}
        {/*      leftMargin={leftMargin}*/}
        {/*      celOrFar={celOrFar}*/}
        {/*      mphOrKph={mphOrKph}*/}
        {/*    />*/}

        {/*    <Display24HrsData*/}
        {/*      hourlyWeatherData={hourlyWeatherData}*/}
        {/*      dayStart={96}*/}
        {/*      dayEnd={120}*/}
        {/*      clouds={{*/}
        {/*        high: showHighClouds,*/}
        {/*        mid: showMidClouds,*/}
        {/*        low: showLowClouds,*/}
        {/*      }}*/}
        {/*      showGraph={showGraph}*/}
        {/*      headingThreeStyling={headingThreeStylingAfterDay}*/}
        {/*      leftMargin={leftMargin}*/}
        {/*      celOrFar={celOrFar}*/}
        {/*      mphOrKph={mphOrKph}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
      </section>
    </section>
  );
}
