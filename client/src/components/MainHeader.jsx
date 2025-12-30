import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function CrafteriaHeader() {
  const navigate = useNavigate();
  const { loggedIn, logout } = useContext(AuthContext);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="w-full bg-white text-orange-400">

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
          <nav className="flex items-center gap-5 font-semibold text-xl">

            <a
              href="/craftbook"
              className="px-2 py-1 hover:bg-orange-500 hover:text-white transition duration-300"
            >
              CraftBook
            </a>

            <a
              href="/about"
              className="px-2 py-1 hover:bg-orange-500 hover:text-white transition duration-300"
            >
              About
            </a>

            {!loggedIn && (
              <a
                href="/login"
                className="px-2 py-1 hover:bg-orange-500 hover:text-white transition duration-300"
              >
                Sign in
              </a>
            )}

            {loggedIn && (
              <>
                <a
                  href="/profile"
                  className="px-2 py-1 hover:bg-orange-500 hover:text-white transition duration-300"
                >
                  Profile
                </a>

                <a
                  href="/settings"
                  className="px-2 py-1 hover:bg-orange-500 hover:text-white transition duration-300"
                >
                  Settings
                </a>

                <button
                  onClick={handleLogout}
                  className="px-2 py-1 hover:bg-orange-500 hover:text-white transition duration-300"
                >
                  Log out
                </button>
              </>
            )}

          </nav>
        </div>
      </div>

      <div className="w-full h-2 bg-orange-500"></div>

    </header>
  );
}
