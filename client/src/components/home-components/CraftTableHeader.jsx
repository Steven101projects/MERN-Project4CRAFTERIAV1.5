import React from "react";
import { NavLink } from "react-router-dom";

export default function CraftTableHeader({ craft }) {

  const titleMin = `relative text-[8vw] mt-[1rem] font-bold tracking-tight leading-none font-spartan`;

  const subtitleMin = `relative text-[1.5vw] bottom-6 font-semibold`;

  const containerMin = `relative flex flex-col h-[30vh] items-center justify-center text-white 
  bg-[linear-gradient(90deg,#ff880c,#ef290e)] w-full overflow-hidden 
  shadow-orange-700 shadow-lg`;

  const navLink = `font-bold hover:scale-110`;
  const navLeftMin = `absolute top-2 left-4 text-2xl ${navLink}`;
  const navRightMin = `absolute top-2 right-5 text-2xl ${navLink}`;

  const topLineMin = `absolute top-[1rem] left-[11rem] right-[8rem] border-t-2 border-orange-300 opacity-90`;

  const bottomLineMin = `absolute bottom-8 w-5/6 left-1/2 -translate-x-1/2 border-t-2 border-orange-300 opacity-90`;

  const moleBase = `absolute bottom-5 bg-white rounded-full`;
  const moleLeftMin = `${moleBase} left-8 w-10 h-5`;
  const moleRightMin = `${moleBase} right-8 w-10 h-5`;

  // Minimized header
  if (craft) {
    return (
      <div className={containerMin}>

        {/* Top navigation */}
        <NavLink to="/craftbook" className={navLeftMin}>
          Materials
        </NavLink>

        <NavLink to="/about" className={navRightMin}>
          Projects
        </NavLink>

        {/* Decorative top line */}
        <hr className={topLineMin} />

        {/* Main title */}
        <h1 className={titleMin}>CRAFTERIA</h1>

        {/* Decorative bottom line */}
        <hr className={bottomLineMin} />

        {/* Subtitle */}
        <p className={subtitleMin}>What would you like to craft today?</p>

        {/* Side moles */}
        <div className={moleLeftMin}></div>
        <div className={moleRightMin}></div>

      </div>
    );
  }

  // Full header
  return (
    <div>
      <div
        className="block pt-12 items-center bg-[linear-gradient(90deg,#ff880c,#ef290e)] w-full"
        style={{
          height: "calc(15vw + 110px)",
          minHeight: "220px",
          maxHeight: "650px",
        }}
      >

        <div
          className="
            text-white 
            relative right-8 
            font-bold tracking-tighter leading-none font-spartan
            [text-shadow:8px_0px_12px_#ba3d0f]
          "
          style={{ fontSize: "18vw", lineHeight: "0.8" }}
        >
          CRAFTERIA
        </div>

        <div className="flex text-white text-4xl justify-center pb-6">
          <p>What would you like to craft today?</p>
        </div>

        <div className="w-full h-9 bg-[linear-gradient(90deg,#ff7a00,#ffbc63,#ff7a00)]"></div>

      </div>
    </div>
  );
}
