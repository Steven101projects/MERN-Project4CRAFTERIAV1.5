export default function SearchBarComponent({ sortValue, onSortChange }) {
  return (
    <div className="w-full">
      
      {/* Search bar */}
      <div className="w-full flex justify-center">
        <div className="w-full h-11 rounded-lg bg-orange-200 flex items-center px-4">
          <input
            type="text"
            placeholder="WOODS, NAILS"
            className="w-full bg-transparent text-orange-700 placeholder-orange-600 focus:outline-none text-center"
          />
        </div>
      </div>

      {/* Sort section */}
      <div className="mt-3 flex items-center gap-2 text-orange-200">
        <span className="text-sm">Sort by</span>

        <select
          className="bg-orange-300 text-orange-900 rounded px-2 py-1 focus:outline-none"
          value={sortValue}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
          <option value="type">Material Type</option>
        </select>
      </div>

    </div>
  )
}
