import logo from "../Assets/Star.svg";
import { useState } from "react";

export default function Header({ openSearch, openMenu }) {
  const [searchArrow, setSearchArrow] = useState("⬆️");

  function changeName() {
    setSearchArrow("⬇️");
  }
  return (
    <>
      <header
        className={`relative mb-2 flex items-center justify-between gap-2 rounded bg-WHITE-TRANS p-3`}
      >
        <div className="flex gap-2">
          <h1 className="font-catamaran text-2xl font-semibold text-LIGHT-COLOR">
            Starry Skies
          </h1>
          <img src={logo} className="w-6" />
        </div>
        <button
          onClick={() => {
            openSearch();
            changeName();
          }}
        >
          Enter Location {searchArrow}
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
