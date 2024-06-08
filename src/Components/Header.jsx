import logo from "../Assets/Star.svg";
import { useState } from "react";

export default function Header({ openSearch, openMenu }) {
  const [searchArrow, setSearchArrow] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleChangeArrow = () => {
    setSearchArrow(!searchArrow);
  };

  const menuButtonClosedStyle = "bg-transparent";

  const menuButtonOpenStyle = "bg-1E6B96";
  return (
    <>
      <header
        className={`relative mb-2 flex items-center justify-between gap-2 rounded bg-WHITE-TRANS p-3`}
      >
        <div className="flex items-center gap-2">
          <img src={logo} className="w-6" />
          <h1 className="font-catamaran text-2xl font-semibold text-LIGHT-COLOR">
            Starry Skies
          </h1>
        </div>
        <button
          className={`${
            isSearchOpen ? menuButtonOpenStyle : menuButtonClosedStyle
          } rounded border-2 border-1E6B96 px-2 py-1 font-inter text-sm font-semibold text-LIGHT-COLOR`}
          onClick={() => {
            setIsSearchOpen(!isSearchOpen);
            openSearch();
            handleChangeArrow();
          }}
        >
          Enter Location{" "}
          <svg
            style={{
              transform: searchArrow ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
              display: "inline-block",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#e8eaed"
            viewBox="0 -960 960 960"
          >
            <path d="M480-344L240-584l56-56 184 184 184-184 56 56-240 240z"></path>
          </svg>
        </button>
        <button className={`relative z-[200]`} onClick={openMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </button>
      </header>
    </>
  );
}
