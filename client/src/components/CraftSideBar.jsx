import { useState } from "react";
import { FaList, FaTools, FaPhotoVideo } from "react-icons/fa";

export default function CraftSideBar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      onClick={() => setCollapsed(v => !v)}
      title={collapsed ? "Expand sidebar" : "Minimize this"}
      className={`
        ${collapsed ? "w-16" : "w-64"}
        min-h-screen
        self-stretch
        border-r-4 border-orange-500
        ${collapsed ? "px-2 py-6" : "px-6 py-10"}
        overflow-y-auto
        cursor-pointer
        transition-all duration-300 ease-in-out
      `}
    >
      <nav
        className={`
          flex flex-col
          ${collapsed ? "items-center gap-8 text-orange-700" : "gap-6 text-lg font-semibold text-orange-700"}
        `}
        onClick={e => e.stopPropagation()}
      >

        {/* Craftlist */}
        <div className={!collapsed ? "pb-3 border-b-2 border-orange-500 w-full" : ""}>
          <a
            href="/craftlist"
            className={`
              flex items-center
              ${collapsed ? "justify-center" : "gap-4 px-2 py-1"}
              hover:text-orange-900 transition
            `}
          >
            <FaList className="text-2xl shrink-0" />
            {!collapsed && <span>Craftlist</span>}
          </a>
        </div>

        {/* Craftor */}
        <div className={!collapsed ? "pb-3 border-b-2 border-orange-500 w-full" : ""}>
          <a
            href="/craftor"
            className={`
              flex items-center
              ${collapsed ? "justify-center" : "gap-4 px-2 py-1"}
              hover:text-orange-900 transition
            `}
          >
            <FaTools className="text-2xl shrink-0" />
            {!collapsed && <span>Craftor</span>}
          </a>
        </div>

        {/* CraftMedia */}
        <div className={!collapsed ? "pb-3 border-b-2 border-orange-500 w-full" : ""}>
          <a
            href="/craftmedia"
            className={`
              flex items-center
              ${collapsed ? "justify-center" : "gap-4 px-2 py-1"}
              hover:text-orange-900 transition
            `}
          >
            <FaPhotoVideo className="text-2xl shrink-0" />
            {!collapsed && <span>CraftMedia</span>}
          </a>
        </div>

        {/* Bottom divider only when expanded */}
        {!collapsed && (
          <div className="pt-6 border-t-2 border-orange-500" />
        )}

      </nav>
    </aside>
  );
}
