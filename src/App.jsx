import { useState } from "react";
import Header from "./Components/Header";
import MainAppDisplay from "./Components/MainAppDisplay.jsx";
import Menu from "./Components/Menu.jsx";
import PropTypes from "prop-types";

function App() {
  MainAppDisplay.propTypes = {
    name: PropTypes.string,
  };

  const [openLocationSearch, setOpenLocationSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [mphOrKph, setmphOrKph] = useState(false);
  const [celOrFar, setCelOrFar] = useState(false);

  const handleOpenSearch = () => {
    setOpenLocationSearch(!openLocationSearch);
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleMphOrKph = () => {
    setmphOrKph(!mphOrKph);
  };

  const handleKmOrMi = () => {
    setCelOrFar(!celOrFar);
  };

  return (
    <>
      <div className="overflow-x-hidden p-2 lg:mx-auto lg:w-3/4">
        <div className="pointer-events-none absolute h-full w-full overflow-x-hidden blur-[200px] filter">
          <div className="absolute -right-1/2 -top-[20%] z-[-1] aspect-square w-[50vh] rounded-[50%] bg-blue-500 opacity-20"></div>
          <div className="absolute -bottom-[40%] -left-[20%] z-[-1] aspect-square w-[50vh] rounded-[50%] bg-blue-950"></div>
        </div>

        <Header openSearch={handleOpenSearch} openMenu={handleOpenMenu} />
        <MainAppDisplay
          openLocationSearch={openLocationSearch}
          mphOrKph={mphOrKph}
          celOrFar={celOrFar}
        />
        <Menu
          openMenu={openMenu}
          mphOrKph={mphOrKph}
          celOrFar={celOrFar}
          handleMphOrKph={handleMphOrKph}
          handleCelsiusOrFar={handleKmOrMi}
        />
      </div>
    </>
  );
}

export default App;
