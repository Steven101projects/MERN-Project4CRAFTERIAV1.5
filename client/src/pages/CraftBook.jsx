import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

import CraftSideBar from "../components/CraftSideBar";
import SearchBarComponent from "../components/craftbook-components/SearchBar";
import ProjectsContainer from "../components/craftbook-components/Projects";
import MaterialsContainer from "../components/craftbook-components/Materials";

export default function CraftBook() {
  const { loggedIn } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("projects");
  const [sortValue, setSortValue] = useState("name");

  return (
    <div className="flex">

      {/* Sidebar only when logged in */}
      {loggedIn && <CraftSideBar />}

      {/* Main CraftBook content */}
      <div className="flex-grow m-5 text-white">

        <div className="flex ml-4 text-xl">

          <button
            onClick={() => setActiveTab("materials")}
            className={
              `relative px-12 py-2 text-white rounded-t-full bg-[linear-gradient(to_right,#d2541c,#8c2a0e)] ` +
              (activeTab === "materials" ? "z-10" : "z-0")
            }
          >
            Materials
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={
              `relative right-5 px-12 py-2 text-white rounded-t-full bg-[linear-gradient(to_right,#d2541c,#8c2a0e)] ` +
              (activeTab === "projects" ? "z-10" : "z-0")
            }
          >
            Projects
          </button>

        </div>

        <div className="p-2 rounded w-full h-[90vh] text-white bg-[linear-gradient(90deg,#ff880c,#ef290e)]">

          <div className="m-5 flex flex-row items-center gap-4">
            <SearchBarComponent
              sortValue={sortValue}
              onSortChange={setSortValue}
            />
          </div>

          <div className="mt-4">
            {activeTab === "projects" && (
              <ProjectsContainer sortBy={sortValue} />
            )}
            {activeTab === "materials" && (
              <MaterialsContainer sortBy={sortValue} />
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
