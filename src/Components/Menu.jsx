import { AnimatePresence, motion } from "framer-motion";

export default function Menu({ openMenu }) {
  const openMenuStyle = {
    opacity: 1,
    pointerEvents: "all",
  };

  const closedMenuStyle = {
    opacity: 0,
    pointerEvents: "none",
  };

  const menuStyle = {
    initial: {
      opacity: 0,
      pointerEvents: "none",
      x: "100vw",
      transition: {
        duration: 0.5,
      },
    },

    animate: {
      opacity: 1,
      pointerEvents: "all",
      x: 0,
      transition: {
        duration: 0.5,
      },
    },

    exit: {
      opacity: 1,
      pointerEvents: "none",
      x: "100vw",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <AnimatePresence>
        {openMenu && (
          <motion.section
            variants={menuStyle}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`absolute left-0 top-0 z-[100] h-screen w-full bg-002233/90 backdrop-blur-sm backdrop-filter`}
          >
            <div>
              <button>Enable Red Light Mode</button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      {/*<section*/}
      {/*  className={`absolute left-0 top-0 z-[100] h-screen w-full bg-red-700/90 mix-blend-color`}*/}
      {/*></section>*/}
    </>
  );
}
