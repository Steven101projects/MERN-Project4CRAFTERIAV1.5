import { FaList, FaTools, FaPhotoVideo } from "react-icons/fa";

export default function CraftSideBar() {
  return (
    <aside
      className="
        w-64
        min-h-screen
        self-stretch
        border-r-4 border-orange-500
        px-6 py-10
        overflow-y-auto
      "
    >
      <nav className="flex flex-col gap-6 text-lg font-semibold text-orange-700">

        {/* Craftlist */}
        <div className="pb-3 border-b-2 border-orange-500">
          <a
            href="/craftlist"
            className="flex items-center gap-4 px-2 py-1 hover:text-orange-900 transition"
          >
            <FaList className="text-2xl" />
            <span>Craftlist</span>
          </a>
        </div>

        {/* Craftor */}
        <div className="pb-3 border-b-2 border-orange-500">
          <a
            href="/craftor"
            className="flex items-center gap-4 px-2 py-1 hover:text-orange-900 transition"
          >
            <FaTools className="text-2xl" />
            <span>Craftor</span>
          </a>
        </div>

        {/* CraftMedia */}
        <div className="pb-3 border-b-2 border-orange-500">
          <a
            href="/craftmedia"
            className="flex items-center gap-4 px-2 py-1 hover:text-orange-900 transition"
          >
            <FaPhotoVideo className="text-2xl" />
            <span>CraftMedia</span>
          </a>
        </div>

        <div className="pt-6 border-t-2 border-orange-500" />

      </nav>
    </aside>
  );
}
