




export default function SearchBarComponent() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full h-11 rounded-full bg-[linear-gradient(to_right,#ffbf00,#f15000)] flex items-center px-4">
        <input
          type="text"
          placeholder="WOODS, NAILS"
          className="w-full bg-transparent text-orange-700 placeholder-orange-600 focus:outline-none text-center"/>
      </div>
    </div>
  )
}
