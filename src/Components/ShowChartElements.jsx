import { motion } from "framer-motion";
import { useState } from "react";

export default function ShowChartElements({
  highClouds,
  midClouds,
  lowClouds,
  showGraph,
}) {
  const [toggleButton, setToggleButton] = useState({
    highClouds: false,
    midClouds: false,
    lowClouds: false,
    showGraph: false,
  });

  function toggleButtonState(name) {
    setToggleButton((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }
  return (
    <>
      <div className="mb-2 grid w-full grid-cols-4 content-center gap-1">
        <motion.button
          onClick={() => {
            highClouds(true);
            toggleButtonState("highClouds");
          }}
          whileTap={{ scale: 0.9 }}
          animate={{
            backgroundColor: toggleButton.highClouds
              ? "#1E6B96"
              : "rgba(255,255,255,0)",
            borderTopColor: toggleButton.highClouds
              ? "#1E6B96"
              : "rgba(255,255,255,0.3)",
            borderRightColor: toggleButton.highClouds
              ? "#1E6B96"
              : "rgba(255,255,255,0.3)",
            borderBottomColor: toggleButton.highClouds ? "#1E6B96" : "#1E6B96",
            borderLeftColor: toggleButton.highClouds
              ? "#1E6B96"
              : "rgba(255,255,255,0.3)",
          }}
          className=" rounded border border-b-2 py-2 text-xs font-semibold text-LIGHT-COLOR"
        >
          High Clouds
        </motion.button>
        <motion.button
          onClick={() => {
            midClouds(true);
            toggleButtonState("midClouds");
          }}
          whileTap={{ scale: 0.9 }}
          animate={{
            backgroundColor: toggleButton.midClouds
              ? "#c42939"
              : "rgba(255,255,255,0)",
            borderTopColor: toggleButton.midClouds
              ? "#c42939"
              : "rgba(255,255,255,0.3)",
            borderRightColor: toggleButton.midClouds
              ? "#c42939"
              : "rgba(255,255,255,0.3)",
            borderBottomColor: toggleButton.midClouds ? "#c42939" : "#c42939",
            borderLeftColor: toggleButton.midClouds
              ? "#c42939"
              : "rgba(255,255,255,0.3)",
          }}
          className=" rounded border border-b-2 py-2 text-xs font-semibold text-LIGHT-COLOR"
        >
          Mid Clouds
        </motion.button>
        <motion.button
          onClick={() => {
            lowClouds(true);
            toggleButtonState("lowClouds");
          }}
          whileTap={{ scale: 0.9 }}
          animate={{
            backgroundColor: toggleButton.lowClouds
              ? "#c5db58"
              : "rgba(255,255,255,0)",
            borderTopColor: toggleButton.lowClouds
              ? "#c5db58"
              : "rgba(255,255,255,0.3)",
            borderRightColor: toggleButton.lowClouds
              ? "#c5db58"
              : "rgba(255,255,255,0.3)",
            borderBottomColor: toggleButton.lowClouds ? "#c5db58" : "#c5db58",
            borderLeftColor: toggleButton.lowClouds
              ? "#c5db58"
              : "rgba(255,255,255,0.3)",
            color: toggleButton.lowClouds ? "#000" : "#fff",
          }}
          className=" rounded  border border-b-2 py-2 text-xs font-semibold text-LIGHT-COLOR"
        >
          Low Clouds
        </motion.button>
        <motion.button
          onClick={() => {
            showGraph(false);
            toggleButtonState("showGraph");
          }}
          whileTap={{ scale: 0.9 }}
          animate={{
            backgroundColor: toggleButton.showGraph
              ? "rgba(255,255,255,0)"
              : "#4FC863",
            borderTopColor: toggleButton.showGraph
              ? "rgba(255,255,255,0.3)"
              : "#4FC863",
            borderRightColor: toggleButton.showGraph
              ? "rgba(255,255,255,0.3)"
              : "#4FC863",
            borderBottomColor: toggleButton.showGraph ? "#4FC863" : "#4FC863",
            borderLeftColor: toggleButton.showGraph
              ? "rgba(255,255,255,0.3)"
              : "#4FC863",
            color: toggleButton.showGraph ? "#fff" : "#000",
          }}
          className=" rounded  border border-b-2 py-2 text-xs font-semibold text-LIGHT-COLOR"
        >
          Show Graph
        </motion.button>
      </div>
    </>
  );
}
