import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  FirstQuarter,
  FullMoon,
  NewMoon,
  ThirdQuarter,
  WaningCrescent1,
  WaningCrescent2,
  WaningCrescent3,
  WaningGibbous1,
  WaningGibbous2,
  WaningGibbous3,
  WaxingGibbous1,
  WaxingGibbous2,
  WaxingGibbous3,
  WaxingCrescent1,
  WaxingCrescent2,
  WaxingCrescent3,
} from "./Moon_icons/moonIcons.jsx";

// Styling for grid items.
const gridItemStyling =
  "h-[26px] w-[26px] list-none rounded grid place-items-center font-inter text-xs font-semibold";

// Main component.
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

  // Function to format time & date from Unix to human-readable format.
  const formatTime = (time) => {
    const newDate = new Date(time);
    const hour = newDate.getHours();
    const date = newDate.toLocaleDateString();
    const dayName = newDate.toLocaleDateString("en-US", { weekday: "long" });
    return { hour, date, dayName };
  };

  // Function to format sunrise and sunset times from unix to human-readable format.
  const formatSunriseSunset = (time) => {
    const newDate = new Date(time);

    // Checks to see if the minutes are greater than 30 per hour. If so, round up to the next hour.
    if (newDate.getMinutes() >= 30) {
      newDate.setHours(newDate.getHours() + 1);
    }
    newDate.setMinutes(0, 0, 0);
    return newDate.getHours();
  };

  // Function to style hourly time items based on day or night (yellow for day, dark blue for night).
  const timeStyleBasedOnDayOrNight = (time) => {
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
  };

  // Function to display dawn and dusk icons at sunrise and sunset times.
  const dawnDuskIcons = (time) => {
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
  };

  // Function to select moon phase icon based on the moon phase value.
  const selectMoonPhaseIcon = (value) => {
    const moonIconHeight = 40;
    const moonIconWidth = 40;
    if (value >= 0.05 && value <= 0.09) {
      return <WaxingCrescent1 height={moonIconHeight} width={moonIconWidth} />;
    } else if (value >= 0.1 && value <= 0.14) {
      return <WaxingCrescent2 height={moonIconHeight} width={moonIconWidth} />;
    } else if (value >= 0.15 && value <= 0.19) {
      return <WaxingCrescent3 height={moonIconHeight} width={moonIconWidth} />;
    } else if (value >= 0.2 && value <= 0.29) {
      return <FirstQuarter height={moonIconHeight} width={moonIconWidth} />;
    } else if (value >= 0.3 && value <= 0.35) {
      return <WaxingGibbous1 height={moonIconHeight} width={moonIconWidth} />;
    } else if (value >= 0.36 && value <= 0.39) {
      return <WaxingGibbous2 height={moonIconHeight} width={moonIconWidth} />;
    } else if (value >= 0.4 && value <= 0.44) {
      return <WaxingGibbous3 height={moonIconHeight} width={moonIconWidth} />;
    } else if (value >= 0.45 && value <= 0.54) {
      return <FullMoon height={moonIconHeight} width={moonIconWidth} />;
    } else if (value >= 0.55 && value <= 0.57) {
      return <WaningGibbous1 height={moonIconHeight} width={moonIconWidth} />;
    } else if (value >= 0.58 && value <= 0.6) {
      return <WaningGibbous2 height={moonIconHeight} width={moonIconWidth} />;
    } else if (value >= 0.61 && value <= 0.64) {
      return <WaningGibbous3 height={moonIconHeight} width={moonIconWidth} />;
    } else if (value >= 0.65 && value <= 0.74) {
      return <ThirdQuarter height={moonIconHeight} width={moonIconWidth} />;
    } else if (value >= 0.75 && value <= 0.77) {
      return <WaningCrescent1 height={moonIconHeight} width={moonIconWidth} />;
    } else if (value >= 0.78 && value <= 0.8) {
      return <WaningCrescent2 height={moonIconHeight} width={moonIconWidth} />;
    } else if (value >= 0.81 && value <= 0.84) {
      return <WaningCrescent3 height={moonIconHeight} width={moonIconWidth} />;
    } else {
      return <NewMoon height={moonIconHeight} width={moonIconWidth} />;
    }
  };

  // Function to convert moonrise and moonset times from Unix time to hours.
  const convertMoonTimesFromUnix = (time) => {
    const unixToMilliseconds = time * 1000;
    const date = new Date(unixToMilliseconds);
    return date.getHours() === 0 ? 24 : date.getHours();
  };

  // Function to style moon icon visibility based on moonrise and moonset times.
  const moonVisibilityStyling = (item) => {
    if (item === 1) {
      return { backgroundColor: "#00011A", color: "#00011A" };
    }
  };

  // useEffect hook to handle time data
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

      //Map through the hourly data and display the time.
      const timeFromAPI = hourlyWeatherData.time
        .slice(dayStart, dayEnd)
        .map((item, index) => {
          return (
            <li
              className={`${gridItemStyling} font-catamaran md:w-[4.16%]`}
              style={timeStyleBasedOnDayOrNight(item)}
              key={`${item}-${index}`}
            >
              {dawnDuskIcons(formatTime(item).hour)}
            </li>
          );
        });

      setTimeData({
        dayName: dayName,
        dateAsString: dateAsString,
        timeGrid: timeFromAPI,
      });
    }
  }, [hourlyWeatherData, dailyWeatherData]);

  // useEffect hook to handle moon data
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

      // Determine the moon phase name based on the moon phase value.
      let moonPhaseName = "";
      if (moonPhase >= 0.05 && moonPhase <= 0.09) {
        moonPhaseName = "Waxing Crescent";
      } else if (moonPhase >= 0.1 && moonPhase <= 0.14) {
        moonPhaseName = "Waxing Crescent";
      } else if (moonPhase >= 0.15 && moonPhase <= 0.19) {
        moonPhaseName = "Waxing Crescent";
      } else if (moonPhase >= 0.2 && moonPhase <= 0.29) {
        moonPhaseName = "First Quarter";
      } else if (moonPhase >= 0.3 && moonPhase <= 0.35) {
        moonPhaseName = "Waxing Gibbous";
      } else if (moonPhase >= 0.36 && moonPhase <= 0.39) {
        moonPhaseName = "Waxing Gibbous";
      } else if (moonPhase >= 0.4 && moonPhase <= 0.44) {
        moonPhaseName = "Waxing Gibbous";
      } else if (moonPhase >= 0.45 && moonPhase <= 0.54) {
        moonPhaseName = "Full Moon";
      } else if (moonPhase >= 0.55 && moonPhase <= 0.57) {
        moonPhaseName = "Waning Gibbous";
      } else if (moonPhase >= 0.58 && moonPhase <= 0.6) {
        moonPhaseName = "Waning Gibbous";
      } else if (moonPhase >= 0.61 && moonPhase <= 0.64) {
        moonPhaseName = "Waning Gibbous";
      } else if (moonPhase >= 0.65 && moonPhase <= 0.74) {
        moonPhaseName = "Third Quarter";
      } else if (moonPhase >= 0.75 && moonPhase <= 0.77) {
        moonPhaseName = "Waning Crescent";
      } else if (moonPhase >= 0.78 && moonPhase <= 0.8) {
        moonPhaseName = "Waning Crescent";
      } else if (moonPhase >= 0.81 && moonPhase <= 0.84) {
        moonPhaseName = "Waning Crescent";
      } else {
        moonPhaseName = "New Moon";
      }

      setMoonData({
        moonPhase: moonPhase,
        moonrise: moonrise,
        moonset: moonset,
        moonPhaseName: moonPhaseName,
      });

      // Map through the hourly data and display the moon icon, based on moonrise and moonset times.
      for (let i = 0; i < 24; i++) {
        const hourToCompare = formatTime(
          hourlyWeatherData.time.slice(dayStart, dayEnd)[i],
        ).hour;

        if (
          convertMoonTimesFromUnix(moonrise) <=
          convertMoonTimesFromUnix(moonset)
        ) {
          // If moonrise is before moonset, display moon icon between moonrise and moonset times.
          if (
            hourToCompare >= convertMoonTimesFromUnix(moonrise) &&
            hourToCompare <= convertMoonTimesFromUnix(moonset)
          ) {
            moonVisibility.push(1);
          } else {
            moonVisibility.push(0);
          }
        } else {
          // If moonrise is after moonset, display moon icon between moonrise and moonset times.
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
    }
    // Map through the moonVisibility array and display the moon icon based on the moonVisibility value.
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

  return (
    <>
      <section
        className={`${timeMarginLeft} ${timeMarginRight} flex rounded bg-gradient-to-r from-000E14 via-[#011924] via-50% to-000E14 to-100% px-1.5`}
      >
        <div className="relative flex flex-col justify-center gap-2 py-2">
          <div className="sticky left-[0.5rem] top-0 flex w-screen items-center gap-4 pr-[5%] text-xl font-semibold text-LIGHT-COLOR">
            <div className="">{selectMoonPhaseIcon(moonData.moonPhase)}</div>
            <div>
              <h2 className={`font-inter`}>
                {timeData.dayName} {timeData.dateAsString}
              </h2>
              <p className={`font-inter text-sm`}>{moonData.moonPhaseName}</p>
            </div>
          </div>
          <ul className="flex gap-[7.48px]">{timeData.timeGrid}</ul>

          <ul className="flex gap-[7.48px]">{isMoonVisible}</ul>
        </div>
      </section>
    </>
  );
}

DisplayTimeDateMoonData.propTypes = {
  hourlyWeatherData: PropTypes.array,
  dailyWeatherData: PropTypes.object,
  dailyMoonData: PropTypes.array,
  dayStart: PropTypes.number,
  dayEnd: PropTypes.number,
  day: PropTypes.number,
  timeMarginLeft: PropTypes.string,
  timeMarginRight: PropTypes.string,
};
