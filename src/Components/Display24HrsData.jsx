import { useState, useEffect, useRef } from "react";
import { Bar, ComposedChart, Area, ResponsiveContainer } from "recharts";
import {
  temperatureBackground,
  windSpeedBackground,
  windGustBackground,
  visibilityBackground,
  precipitationBackground,
  cloudPercentage,
  weatherConditionBackground,
} from "../gridColourFunctions.js";
import {
  Clear,
  Cloudy,
  Fog,
  Snow,
  PartlyCloudy,
  Drizzle,
  LightRain,
  HeavyRain,
  Lightning,
  ModerateRain,
} from "./Weather_icons/index";

const gridItemStyling =
  "h-[26px] w-[26px] list-none rounded place-items-center font-inter text-xs font-semibold grid mb-1";
const gridRowStyling =
  "mb-2 rounded -m-[5px] border border-[5px] border-012A41 bg-012A41 py-1";
const ulGlobalStyling = "flex gap-[7.5px]";

const weatherIcons = {
  0: <Clear />,
  1: <PartlyCloudy />,
  2: <PartlyCloudy />,
  3: <Cloudy />,
  45: <Fog />,
  48: <Fog />,
  51: <Drizzle />,
  53: <Drizzle />,
  55: <Drizzle />,
  56: <Drizzle />,
  57: <Drizzle />,
  61: <LightRain />,
  66: <LightRain />,
  80: <LightRain />,
  63: <ModerateRain />,
  81: <ModerateRain />,
  65: <HeavyRain />,
  67: <HeavyRain />,
  82: <HeavyRain />,
  71: <Snow />,
  73: <Snow />,
  75: <Snow />,
  77: <Snow />,
  85: <Snow />,
  86: <Snow />,
  95: <Lightning />,
  96: <Lightning />,
  99: <Lightning />,
};

function getWeatherIcon(weatherCode) {
  return weatherIcons[weatherCode] || null;
}

function generateListItems(
  dataArray,
  styleFunction,
  unitSymbol = "",
  roundToDecimal = 0,
) {
  return dataArray.map((item, index) => (
    <li
      key={`${item}-${index}`}
      style={styleFunction(item)}
      className={`${gridItemStyling} md:w-[4.16%]`}
    >
      {item.toFixed(roundToDecimal) + unitSymbol}
    </li>
  ));
}

export default function Display24HrsData({
  hourlyWeatherData,
  dayStart,
  dayEnd,
  clouds,
  showGraph,
  scrollPosition,
  headingThreeStyling,
  divWidth,
  leftMargin,
}) {
  const [daySection, setDaySection] = useState(null);

  const h3ScrollStyling = {
    transform: `translateX(${scrollPosition}px)`,
    transition: "all 0.5s",
  };

  useEffect(() => {
    if (hourlyWeatherData.cloud_cover) {
      const totalClouds = hourlyWeatherData.cloud_cover.map((_, i) => ({
        totalClouds: hourlyWeatherData.cloud_cover[i],
        lowClouds:
          hourlyWeatherData.cloud_cover_low[i] < 100
            ? hourlyWeatherData.cloud_cover_low[i]
            : 99,
        midClouds:
          hourlyWeatherData.cloud_cover_mid[i] < 100
            ? hourlyWeatherData.cloud_cover_mid[i]
            : 99,
        highClouds:
          hourlyWeatherData.cloud_cover_high[i] < 100
            ? hourlyWeatherData.cloud_cover_high[i]
            : 99,
      }));

      const showAreaChartStyle = {
        opacity: 1,
        transition: "opacity 200ms ease-in-out",
      };
      const hideAreaChartStyle = {
        opacity: 0,
        transition: "opacity 200ms ease-in-out",
      };
      const showCloudsStyle = { minHeight: "25vh", maxHeight: "100vh" };
      const hideCloudsStyle = { minHeight: "0", maxHeight: "0" };
      const showOL = {
        maxHeight: "100%",
        opacity: 1,
        transition: "max-height 250ms ease-in-out, opacity 0.5s ease-in-out",
      };
      const hideOL = { opacity: 0, transition: " opacity 0.5s ease-in-out" };

      setDaySection(
        <div
          className={`relative ${leftMargin} flex h-full w-[800px] flex-col gap-1`}
        >
          <div className={`-mx-1.5 mt-2 rounded bg-000E14 p-1.5`}>
            <h3
              style={h3ScrollStyling}
              className={`${headingThreeStyling} mt-1 text-xl`}
            >
              Cloud Cover (%)
            </h3>
            <div
              className="relative h-[25vh] w-full"
              style={showGraph ? showCloudsStyle : hideCloudsStyle}
            >
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={totalClouds.slice(dayStart, dayEnd)}
                  margin={{ top: 0, right: 0, left: -3, bottom: 0 }}
                  barCategoryGap={"10%"}
                >
                  <defs>
                    <linearGradient
                      id="colorGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8198d5" stopOpacity={1} />
                      <stop offset="95%" stopColor="#1E6B96" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <Bar
                    dataKey="totalClouds"
                    fill="url(#colorGradient)"
                    radius={5}
                  />
                  <Area
                    type="monotone"
                    dataKey="highClouds"
                    fill={"#5a75c0"}
                    stroke={"#ffffff"}
                    strokeWidth={2}
                    style={
                      clouds.high ? showAreaChartStyle : hideAreaChartStyle
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="midClouds"
                    fill={"#c42939"}
                    stroke={"#ffffff"}
                    strokeWidth={2}
                    style={clouds.mid ? showAreaChartStyle : hideAreaChartStyle}
                  />
                  <Area
                    type="monotone"
                    dataKey="lowClouds"
                    fill={"#c5db58"}
                    stroke={"#ffffff"}
                    strokeWidth={2}
                    style={clouds.low ? showAreaChartStyle : hideAreaChartStyle}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className={`${divWidth}`}>
              <ul className={`${ulGlobalStyling}`}>
                {hourlyWeatherData.cloud_cover
                  .slice(dayStart, dayEnd)
                  .map((item, index) => (
                    <li
                      className={`mb-1 grid w-[26px] list-none place-items-center rounded font-inter text-xs font-semibold`}
                      style={cloudPercentage(item)}
                      key={`${item}-${index}`}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className={`${gridRowStyling} ${divWidth} mt-1`}>
            <h3 style={h3ScrollStyling} className={`${headingThreeStyling} `}>
              Precipitation (%)
            </h3>
            <ul className={ulGlobalStyling}>
              {generateListItems(
                hourlyWeatherData.precipitation_probability.slice(
                  dayStart,
                  dayEnd,
                ),
                precipitationBackground,
              )}
            </ul>
            <ul className={ulGlobalStyling}>
              {hourlyWeatherData.weather_code
                .slice(dayStart, dayEnd)
                .map((item, index) => (
                  <li
                    style={weatherConditionBackground(item)}
                    className={`${gridItemStyling} mt-1 bg-amber-200 md:w-[4.16%]`}
                    key={`${item}-${index}`}
                  >
                    {getWeatherIcon(item)}
                  </li>
                ))}
            </ul>
          </div>

          <div className={`${gridRowStyling} ${divWidth}`}>
            <h3 style={h3ScrollStyling} className={headingThreeStyling}>
              Temperature (Celsius)
            </h3>
            <ul className={ulGlobalStyling}>
              {generateListItems(
                hourlyWeatherData.temperature_2m.slice(dayStart, dayEnd),
                temperatureBackground,
                "°",
              )}
            </ul>
          </div>

          <div className={`${gridRowStyling} ${divWidth}`}>
            <h3 style={h3ScrollStyling} className={headingThreeStyling}>
              Wind Speed (mph)
            </h3>
            <ul className={ulGlobalStyling}>
              {generateListItems(
                hourlyWeatherData.wind_speed_10m.slice(dayStart, dayEnd),
                windSpeedBackground,
                "",
                1,
              )}
            </ul>
            <ul className={`${ulGlobalStyling}`}>
              {hourlyWeatherData.wind_direction_10m
                .slice(dayStart, dayEnd)
                .map((item, index) => (
                  <li
                    className={`${gridItemStyling} mt-1 bg-1E6B96 md:w-[4.16%]`}
                    key={`${item}-${index}`}
                  >
                    <svg
                      style={{ rotate: `${item}deg` }}
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#e8eaed"
                    >
                      <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
                    </svg>
                  </li>
                ))}
            </ul>
          </div>

          <div className={`${gridRowStyling} ${divWidth}`}>
            <h3 style={h3ScrollStyling} className={headingThreeStyling}>
              Wind Gusts (mph)
            </h3>
            <ul className={ulGlobalStyling}>
              {generateListItems(
                hourlyWeatherData.wind_gusts_10m.slice(dayStart, dayEnd),
                windGustBackground,
                "",
                1,
              )}
            </ul>
          </div>

          <div className={`${gridRowStyling} ${divWidth}`}>
            <h3 style={h3ScrollStyling} className={headingThreeStyling}>
              Dew Point (Celsius)
            </h3>
            <ul className={ulGlobalStyling}>
              {generateListItems(
                hourlyWeatherData.dew_point_2m.slice(dayStart, dayEnd),
                windGustBackground,
                "°",
                0,
              )}
            </ul>
          </div>

          <div className={`${gridRowStyling} ${divWidth}`}>
            <h3 style={h3ScrollStyling} className={headingThreeStyling}>
              Humidity (%)
            </h3>
            <ul className={ulGlobalStyling}>
              {generateListItems(
                hourlyWeatherData.relative_humidity_2m.slice(dayStart, dayEnd),
                windGustBackground,
                "°",
                1,
              )}
            </ul>
          </div>

          <div className={`${gridRowStyling} ${divWidth}`}>
            <h3 style={h3ScrollStyling} className={headingThreeStyling}>
              Visibility (Miles)
            </h3>
            <ul className={ulGlobalStyling}>
              {hourlyWeatherData.visibility
                .slice(dayStart, dayEnd)
                .map((item, index) => (
                  <li
                    className={gridItemStyling}
                    style={visibilityBackground(Math.round(item / 1000))}
                    key={`${item}-${index}`}
                  >
                    {Math.round(item / 1000)}
                  </li>
                ))}
            </ul>
          </div>
        </div>,
      );
    }
  }, [hourlyWeatherData, clouds, showGraph, scrollPosition]);

  return (
    <section className="flex flex-col gap-10 px-2">
      <div>{daySection}</div>
    </section>
  );
}
