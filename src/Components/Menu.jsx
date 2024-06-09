import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ToggleSwitch from "./ToggleSwitch.jsx";

export default function Menu({
  openMenu,
  handleCelsiusOrFar,
  handleMphOrKph,
  mphOrKph,
  celOrFar,
}) {
  const [ariaToggleState, setAriaToggleState] = useState({});

  const [redLightFilter, setRedLightFilter] = useState(false);

  const ariaToggle = (id) => {
    setAriaToggleState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const h4Styling =
    "mb-2 mt-8 font-inter text-xl font-semibold text-LIGHT-COLOR";

  const pStyling = "font-inter text-LIGHT-COLOR";

  const menuOpenStyle = {
    transform: "translateX(0)",
    transition: "all 0.3s ease-in-out",
    pointerEvents: "all",
    opacity: 1,
    maxWidth: "9999px",
  };

  const menuClosedStyle = {
    transform: "translateX(10%)",
    transition: "all 0.3s ease-in-out",
    pointerEvents: "none",
    opacity: 0,
    maxWidth: "0",
  };

  const handleRedLightFilter = () => {
    setRedLightFilter(!redLightFilter);
  };

  return (
    <>
      <section
        style={openMenu ? menuOpenStyle : menuClosedStyle}
        className={`pointer-events-none absolute left-0 top-0 z-[100] h-screen w-full bg-002233/90 px-4 pt-12 backdrop-blur-sm backdrop-filter`}
      >
        <h4 className={`${h4Styling}`}>Red Light Mode</h4>
        <div
          aria-checked={ariaToggleState["redLightFilter"]}
          aria-label="Toggle red light mode"
          onClick={() => {
            handleRedLightFilter();
            ariaToggle("redLightFilter");
          }}
        >
          <ToggleSwitch label="Red Light Mode" />
        </div>

        <h4 className={`${h4Styling}`}>Units</h4>
        <div
          aria-checked={ariaToggleState["mphOrKph"]}
          aria-label="mphOrKph"
          onClick={() => handleMphOrKph(!mphOrKph)}
        >
          <div className={`mb-4 flex items-center gap-2`}>
            <p className={`${pStyling}`}>MPH</p>
            <ToggleSwitch label="" />
            <p className={`${pStyling}`}>KPH</p>
          </div>
        </div>

        <div
          aria-checked={ariaToggleState["celsiusOrFahrenheit"]}
          aria-label="celsiusOrFarenheit"
          onClick={() => handleCelsiusOrFar(!celOrFar)}
        >
          <div className={`flex items-center gap-2`}>
            <p className={`${pStyling}`}>Celsius</p>
            <ToggleSwitch label="" />
            <p className={`${pStyling}`}>Fahrenheit</p>
          </div>
        </div>
      </section>

      {redLightFilter && (
        <section
          className={`pointer-events-none absolute left-0 top-0 z-[100] h-screen w-full bg-red-700 mix-blend-color`}
        ></section>
      )}
    </>
  );
}
