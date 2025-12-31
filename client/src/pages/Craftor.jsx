import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

import CraftSideBar from "../components/CraftSideBar";
import UploadProjectPanel from "../components/craftor-components/UploadProjectPanel";
import ManageProjectsPanel from "../components/craftor-components/ManageProjectsPanel";

export default function Craftor() {
  const { loggedIn } = useContext(AuthContext);
  const [activePanel, setActivePanel] = useState(null);

  return (
    <div className="flex min-h-screen">

      {loggedIn && <CraftSideBar />}

      <div className="flex-grow m-6 text-white bg-[linear-gradient(to_right,#d2541c,#8c2a0e)] p-8 rounded-xl">

        <h1 className="text-4xl font-semibold mb-6 ">
          Craftor Dashboard:
        </h1>
       

        {/* Inline panels */}
        {activePanel === "upload" && (
          <UploadProjectPanel onClose={() => setActivePanel(null)} />
        )}

        {activePanel === "manage" && (
          <ManageProjectsPanel onClose={() => setActivePanel(null)} />
        )}
 
        
        {/* Action cards */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 mt-10">

  {/* Upload Project */}
  <section
    className="
      relative p-6 rounded-xl
      bg-gradient-to-br from-orange-400 to-orange-600
      shadow-lg
      transform transition duration-300 ease-out
      hover:-translate-y-2 hover:shadow-2xl
    "
  >
    <h2 className="text-2xl font-semibold mb-2">
      Upload a Project
    </h2>

    <p className="mb-6 text-sm opacity-90 leading-relaxed">
      Share your handmade idea with tools, materials, and clear steps so others can recreate it.
    </p>

    <button
      onClick={() => setActivePanel("upload")}
      className="px-6 py-2 rounded-lg bg-orange-700 text-white font-medium hover:bg-red-800 transition"
    >
      Create a Blueprint
    </button>
  </section>

  {/* Manage Projects */}
  <section
    className="
      relative p-6 rounded-xl
      bg-gradient-to-br from-orange-400 to-orange-600
      shadow-lg
      transform transition duration-300 ease-out
      hover:-translate-y-2 hover:shadow-2xl
    "
  >
    <h2 className="text-2xl font-semibold mb-2">
      Manage Projects
    </h2>

    <p className="mb-6 text-sm opacity-90 leading-relaxed">
      Review, refine, or remove projects you have already shared with the community.
    </p>

    <button
      onClick={() => setActivePanel("manage")}
      className="px-6 py-2 rounded-lg bg-orange-700 text-white font-medium hover:bg-red-800 transition"
    >
      Open Workshop
    </button>
  </section>

</div>


      </div>
    </div>
  );
}
