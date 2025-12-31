import { useState } from "react";

export default function SearchBarComponent({
  sortValue,
  onSortChange,
  searchValue,
  onSearchChange,
  craftedMaterials = []
}) {
  const [inputValue, setInputValue] = useState(searchValue || "");

  const craftPlaceholder =
    craftedMaterials.length > 0
      ? craftedMaterials.join(", ")
      : "CRAFTERIA..";

  const handleSearch = () => {
    onSearchChange(inputValue);
  };

  const handleViewAll = () => {
    setInputValue("");
    onSearchChange("");
  };

  return (
    <div className="w-full flex flex-col gap-3">

      {/* Search input */}
      <div className="w-full flex justify-center">
        <div className="w-full h-12 rounded-xl bg-[#f3a25c] border-[3px] border-[#d5390e] flex items-center px-5 shadow-inner">
          <input
            type="text"
            placeholder={inputValue ? "" : craftPlaceholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="
              w-full bg-transparent text-[#5c1a07]
              placeholder-[#7a2a10]
              focus:outline-none
              text-center font-semibold tracking-wide
            "
          />
        </div>
      </div>

      {/* Actions row */}
      <div className="flex items-center justify-between gap-3">

        {/* Sort on the left */}
        <div className="flex items-center gap-2 text-white">
          <span className="text-sm opacity-90">Sort by</span>

          <select
            className="
              bg-[#8c2a0e] text-white
              rounded-md px-4 py-2
              focus:outline-none
              border-2 border-[#f3a25c]
            "
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="type">Material Type</option>
          </select>
        </div>

        {/* Buttons on the right */}
        <div className="flex gap-3">

          <button
            onClick={handleViewAll}
            className="
              px-5 py-2 rounded-full
              bg-[#8c2a0e] text-white
              font-semibold
              border-2 border-[#f3a25c]
              shadow-md
              hover:scale-105 active:scale-95
              transition-transform
            "
          >
            View All
          </button>

          <button
            onClick={handleSearch}
            className="
              px-6 py-2 rounded-full
              bg-[linear-gradient(to_bottom,#ffb347,#f08a24)]
              text-[#5c1a07] font-bold
              shadow-md active:scale-95
              hover:scale-105 transition-transform
              border-2 border-[#f8eae6]
            "
          >
            Search
          </button>

        </div>

      </div>

    </div>
  );
}
