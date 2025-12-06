import React from "react";

export default function CrafteriaHeader() {
  const loggedIn = false;

  return (
    <header className="w-full bg-white text-orange-400">

      {/* Navigation row */}
<div className="flex items-center justify-between py-2 w-full">
 <div className="ml-5 w-1/2">

<a
  href="/"
  className="
    text-4xl 
    font-bold 
    px-2
    py-1
    hover:bg-[#FF953A] rounded
    hover:text-white 
    transition 
    duration-300
    inline-block
    select-none
  "
>
  CRAFTSPACE
</a>
</div>
<div className="flex w-1/2 justify-end pr-28">

        {/* Original links */}
        <nav className="flex  items-center gap-5 font-semibold text-xl">
          
          <a className="px-2 py-1   hover:bg-orange-500 
    hover:text-white 
    transition 
    duration-300" href="/craftbook">
            CraftBook
          </a>

          <a className="px-2 py-1   hover:bg-orange-500 
    hover:text-white 
    transition 
    duration-300" href="/about">
            About
          </a>

          {!loggedIn && (
            <a className="px-2 py-1    hover:bg-orange-500 
    hover:text-white 
    transition 
    duration-300" href="/login">
              Sign in
            </a>
          )}

          {loggedIn && (
            <>
              <a className="px-2 py-1 hover:bg-orange-500 
    hover:text-white 
    transition 
    duration-300" href="/craftspace">
                Craftspace
              </a>

              <a className="px-2 py-1 hover:bg-orange-500 
    hover:text-white 
    transition 
    duration-300" href="/settings">
                Settings
              </a>
            </>
          )}

        </nav>
      </div>
</div>

      <div className="w-full h-2 bg-orange-500"></div>

    </header>
  );
}
