import { useState } from "react";
import { motion } from "framer-motion";

export default function Header({ openSearch, openMenu }) {
  const [searchArrow, setSearchArrow] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeArrow = () => {
    setSearchArrow(!searchArrow);
  };

  const menuButtonClosedStyle = "bg-transparent";

  const menuButtonOpenStyle = "bg-blue-500";
  return (
    <>
      <header
        className={`relative mb-2 flex items-center justify-between gap-2 rounded bg-WHITE-TRANS p-3`}
      >
        <div className="flex items-center gap-2">
          <h1 className="font-catamaran text-2xl font-semibold text-LIGHT-COLOR">
            Starry Skies
          </h1>
        </div>
        <div className={`flex h-10 gap-4`}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`${
              isSearchOpen ? menuButtonOpenStyle : menuButtonClosedStyle
            } rounded border-2 border-blue-500 px-2 py-1 font-inter text-sm font-semibold text-LIGHT-COLOR`}
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              openSearch();
              handleChangeArrow();
            }}
          >
            Enter Location
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              openMenu();
              toggleMenu();
            }}
            className="relative z-[9999] flex h-10 w-10 flex-col items-center justify-center p-2"
          >
            <span
              className={`block h-0.5 w-full bg-LIGHT-COLOR transition-transform ${
                isOpen
                  ? "origin-center translate-y-0.5 rotate-45"
                  : "-translate-y-2"
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-LIGHT-COLOR transition-opacity ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-LIGHT-COLOR transition-transform ${
                isOpen
                  ? "origin-center -translate-y-0.5 -rotate-45"
                  : "translate-y-2"
              }`}
            />
          </motion.button>
        </div>
      </header>
    </>
  );
}
