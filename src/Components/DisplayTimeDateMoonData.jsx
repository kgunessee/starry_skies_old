import { useState, useEffect } from "react";

import {
  FirstQuarter,
  FullMoon,
  NewMoon,
  ThirdQuarter,
  WaningCrescent,
  WaningGibbous,
  WaxingCrescent,
  WaxingGibbous,
} from "./Moon_icons/index.js";

const gridItemStyling =
  "h-[26px] w-[26px] list-none rounded grid place-items-center font-inter text-xs font-semibold";

export default function DisplayTimeDateMoonData({
  hourlyWeatherData,
  dailyWeatherData,
  dailyMoonData,
  dayStart,
  dayEnd,
  day,
  timeMarginLeft,
  timeMarginRight,
}) {
  const [timeData, setTimeData] = useState({});
  const [moonData, setMoonData] = useState({});
  const [isMoonVisible, setIsMoonVisible] = useState([]);

  function formatTime(time) {
    const newDate = new Date(time);
    const hour = newDate.getHours();
    const date = newDate.toLocaleDateString();
    const dayName = newDate.toLocaleDateString("en-US", { weekday: "long" });

    return { hour, date, dayName };
  }

  function formatSunriseSunset(time) {
    const newDate = new Date(time);

    // Checks to see if the minutes are greater than 30 per hour. If so, round up to the next hour.
    if (newDate.getMinutes() >= 30) {
      newDate.setHours(newDate.getHours() + 1);
    }
    newDate.setMinutes(0, 0, 0);
    return newDate.getHours();
  }

  function timeStyleBasedOnDayOrNight(time) {
    const sunrise = formatSunriseSunset(dailyWeatherData.sunrise[day]);
    const sunset = formatSunriseSunset(dailyWeatherData.sunset[day]);

    if (formatTime(time).hour >= sunrise && formatTime(time).hour <= sunset) {
      return { backgroundColor: "#CFDB3D", color: "#00011A" };
    } else {
      return {
        backgroundColor: "#001B29",
        color: "#F8F8F8",
      };
    }
  }

  function moonVisibilityStyling(item) {
    if (item === 1) {
      return { backgroundColor: "#00011A", color: "#00011A" };
    } else {
      return {
        backgroundColor: "#001B29",
      };
    }
  }

  function dawnDuskIcons(time) {
    if (time === formatSunriseSunset(dailyWeatherData.sunrise[day])) {
      return (
        <svg
          className="h-full w-full rounded bg-[#e6872e] p-1"
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#00011A"
        >
          <path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z" />
        </svg>
      );
    } else if (time === formatSunriseSunset(dailyWeatherData.sunset[day])) {
      return (
        <svg
          className="h-full w-full rounded bg-[#e6872e] p-1"
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#00011A"
        >
          <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
        </svg>
      );
    } else {
      return time;
    }
  }

  function selectMoonPhaseIcon(value) {
    if (value >= 0.05 && value <= 0.19) {
      return <WaxingCrescent />;
    } else if (value >= 0.2 && value <= 0.29) {
      return <FirstQuarter />;
    } else if (value >= 0.3 && value <= 0.44) {
      return <WaxingGibbous />;
    } else if (value >= 0.45 && value <= 0.54) {
      return <FullMoon />;
    } else if (value >= 0.55 && value <= 0.64) {
      return <WaningGibbous />;
    } else if (value >= 0.65 && value <= 0.74) {
      return <ThirdQuarter />;
    } else if (value >= 0.75 && value <= 0.84) {
      return <WaningCrescent />;
    } else {
      return <NewMoon />;
    }
  }

  function convertMoonTimesFromUnix(time) {
    const unixToMilliseconds = time * 1000;
    const date = new Date(unixToMilliseconds);
    return date.getHours() === 0 ? 24 : date.getHours();
  }

  useEffect(() => {
    // Check if the data is available - only display if true
    if (
      hourlyWeatherData.time !== undefined &&
      dailyWeatherData !== undefined
    ) {
      const dayName = formatTime(
        hourlyWeatherData.time.slice(dayStart, dayEnd)[0],
      ).dayName;
      const dateAsString = formatTime(
        hourlyWeatherData.time.slice(dayStart, dayEnd)[0],
      ).date;

      const timeFromAPI = hourlyWeatherData.time
        .slice(dayStart, dayEnd)
        .map((item, index) => {
          return (
            <div
              className={`${gridItemStyling} md:w-[4.16%]`}
              style={timeStyleBasedOnDayOrNight(item)}
              key={`${item}-${index}`}
            >
              {dawnDuskIcons(formatTime(item).hour)}
            </div>
          );
        });

      setTimeData({
        dayName: dayName,
        dateAsString: dateAsString,
        timeGrid: timeFromAPI,
      });
    }
  }, [hourlyWeatherData, dailyWeatherData]);

  useEffect(() => {
    const moonVisibility = [];
    if (
      dailyMoonData &&
      dailyMoonData.length > 0 &&
      dailyMoonData[0].moon_phase !== undefined &&
      hourlyWeatherData.time !== undefined
    ) {
      const moonPhase = dailyMoonData[day].moon_phase;
      const moonrise = dailyMoonData[day].moonrise;
      const moonset = dailyMoonData[day].moonset;

      setMoonData({
        moonPhase: moonPhase,
        moonrise: moonrise,
        moonset: moonset,
      });

      for (let i = 0; i < 24; i++) {
        const hourToCompare = formatTime(
          hourlyWeatherData.time.slice(dayStart, dayEnd)[i],
        ).hour;

        if (
          convertMoonTimesFromUnix(moonrise) <=
          convertMoonTimesFromUnix(moonset)
        ) {
          if (
            hourToCompare >= convertMoonTimesFromUnix(moonrise) &&
            hourToCompare <= convertMoonTimesFromUnix(moonset)
          ) {
            moonVisibility.push(1);
          } else {
            moonVisibility.push(0);
          }
        } else {
          if (
            hourToCompare >= convertMoonTimesFromUnix(moonrise) ||
            hourToCompare <= convertMoonTimesFromUnix(moonset)
          ) {
            moonVisibility.push(1);
          } else {
            moonVisibility.push(0);
          }
        }
      }
      console.log(
        convertMoonTimesFromUnix(moonrise),
        convertMoonTimesFromUnix(moonset),
      );
    }

    setIsMoonVisible(
      moonVisibility.map((item, index) => {
        return (
          <li
            style={moonVisibilityStyling(item)}
            className={`${gridItemStyling}`}
            key={`${item}-${index}`}
          >
            {item === 1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#e8eaed"
                viewBox="0 -960 960 960"
              >
                <path d="M531.11-48q-80.49 0-150.92-30.66-70.42-30.66-122.65-82.88-52.22-52.23-82.88-122.65Q144-354.62 144-435.11 144-575 232-682.5T460-816q-17 99 11.5 188T569-470q67 67 158 95t185 11q-24 138-132.5 227T531.11-48zm-.11-72q88 0 164-45t115-122q-83-5-158.5-39.5T517-420q-60-60-94-135t-40-159q-77 41-122 116.18-45 75.19-45 162.82 0 131.25 91.88 223.12Q399.75-120 531-120zm-14-300z"></path>
              </svg>
            ) : (
              ""
            )}
          </li>
        );
      }),
    );
  }, [dailyMoonData]);

  // Function to convert Unix Time to Local Time

  return (
    <>
      {/*----------------------------- Section for Clouds Display -----------------------------*/}

      {/*"mb-2 rounded -m-[5px] border border-[5px] border-012A41 bg-012A41 py-1";*/}

      <section
        className={`${timeMarginLeft} ${timeMarginRight} flex rounded bg-000E14 px-1.5`}
      >
        <div className="relative flex flex-col gap-2 py-2">
          <div className="left-[0.5rem] top-0 flex w-max items-center gap-8 font-catamaran text-xl font-semibold text-LIGHT-COLOR">
            {timeData.dayName} {timeData.dateAsString}
            <div className="h-8 w-8 text-LIGHT-COLOR">
              {selectMoonPhaseIcon(moonData.moonPhase)}
            </div>
          </div>
          <ul className="flex gap-[7.48px]">{timeData.timeGrid}</ul>

          <ul className="flex gap-[7.48px]">{isMoonVisible}</ul>
        </div>
      </section>

      {/*----------------------------- Section for Cloud % Display -----------------------------*/}
    </>
  );
}
