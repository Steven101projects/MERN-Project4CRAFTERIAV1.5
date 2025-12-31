import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

import CraftSideBar from "../components/CraftSideBar";
import SearchBarComponent from "../components/craftbook-components/SearchBar";
import ProjectsContainer from "../components/craftbook-components/Projects";
import MaterialsContainer from "../components/craftbook-components/Materials";

export default function CraftBook() {
  const { loggedIn } = useContext(AuthContext);
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("projects");
  const [sortValue, setSortValue] = useState("name");
  const [searchValue, setSearchValue] = useState("");

  // ⭐ crafted materials coming from CraftTable navigation
  const [craftedMaterials, setCraftedMaterials] = useState([]);

  // read navigation state when arriving from CraftTable
  useEffect(() => {
    if (location.state?.craftedMaterials) {
      setCraftedMaterials(location.state.craftedMaterials);
      setActiveTab("projects"); // force projects view
    }
  }, [location.state]);

  return (
    <div className="flex">

      {loggedIn && <CraftSideBar />}

      <div className="flex-grow m-5 text-white">

        {/* Tabs */}
        <div className="flex ml-4 text-xl">
          <button
            onClick={() => setActiveTab("materials")}
            className={`relative px-12 py-2 text-white rounded-t-full bg-[linear-gradient(to_right,#d2541c,#8c2a0e)] ${
              activeTab === "materials" ? "z-10" : "z-0"
            }`}
          >
            Materials
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`relative right-5 px-12 py-2 text-white rounded-t-full bg-[linear-gradient(to_right,#d2541c,#8c2a0e)] ${
              activeTab === "projects" ? "z-10" : "z-0"
            }`}
          >
            Projects
          </button>
        </div>

        {/* Content */}
        <div className="p-2 rounded w-full h-[90vh] text-white bg-[linear-gradient(90deg,#ff880c,#ef290e)]">

          {/* Search bar (still independent) */}
          <div className="m-5 flex flex-row items-center gap-4">
<SearchBarComponent
  searchValue={searchValue}
  onSearchChange={setSearchValue}
  sortValue={sortValue}
  onSortChange={setSortValue}
  craftedMaterials={craftedMaterials}
/>

          </div>

          {/* Results */}
          <div className="mt-4">
            {activeTab === "projects" && (
              <ProjectsContainer
                sortBy={sortValue}
                searchValue={searchValue}
                craftedMaterials={craftedMaterials}
              />
            )}

            {activeTab === "materials" && (
              <MaterialsContainer
                sortBy={sortValue}
                searchValue={searchValue}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
