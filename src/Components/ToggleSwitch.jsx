import PropTypes from "prop-types";
import { useState } from "react";

export default function ToggleSwitch({ label }) {
  const [enabled, setEnabled] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setEnabled(!enabled);
        }}
        className={`flex items-center gap-2 hover:cursor-pointer`}
      >
        <p className={`font-inter text-LIGHT-COLOR`}>{label}</p>
        <div
          className={`relative inline-flex h-8 w-[4rem] items-center rounded-full transition-colors duration-200 ${
            enabled ? "bg-1E6B96" : "bg-00141F"
          }`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
              enabled ? "translate-x-9" : "translate-x-1"
            }`}
          />
        </div>
      </div>
    </>
  );
}

ToggleSwitch.propTypes = {
  label: PropTypes.string,
};
