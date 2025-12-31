import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import EditProfile from "../components/settings-components/EditProfile";
import ChangePassword from "../components/settings-components/ChangePassword";
import ManageUsers from "../components/settings-components/ManageUsers";

export default function Settings() {
  const { loggedIn, user } = useContext(AuthContext);
  const [activeView, setActiveView] = useState("menu");

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex justify-center items-start pt-20 text-white">
      <div className="w-full max-w-lg bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-8 shadow-xl">

        {activeView === "menu" && (
          <>
            <h2 className="text-4xl font-semibold mb-6 text-center">
              Settings
            </h2>

            <div
              className="rounded-lg bg-white bg-opacity-10 p-4 cursor-pointer hover:bg-opacity-20 mb-3 text-center"
              onClick={() => setActiveView("editProfile")}
            >
              Edit Profile
            </div>

            <div className="rounded-lg bg-white bg-opacity-10 p-4 cursor-pointer hover:bg-opacity-20 mb-3 text-center">
              Font Size
            </div>

            <div
              className="rounded-lg bg-white bg-opacity-10 p-4 cursor-pointer hover:bg-opacity-20 mb-3 text-center"
              onClick={() => setActiveView("changePassword")}
            >
              Change Password
            </div>

            {user?.role === "admin" && (
              <div className="pt-4">
                <p className="text-sm opacity-80 mb-2 text-center">
                  Admin Settings
                </p>

                <div
                  className="rounded-lg bg-white bg-opacity-10 p-4 cursor-pointer hover:bg-opacity-20 mb-2 text-center"
                  onClick={() => setActiveView("manageUsers")}
                >
                  User Manager
                </div>
              </div>
            )}
          </>
        )}

        {activeView !== "menu" && (
          <>
            <button
              onClick={() => setActiveView("menu")}
              className="mb-4 text-sm opacity-80 hover:opacity-100"
            >
              ← Back to Settings
            </button>

            {activeView === "editProfile" && <EditProfile />}
            {activeView === "changePassword" && <ChangePassword />}
            {activeView === "manageUsers" && user?.role === "admin" && (
              <ManageUsers />
            )}
          </>
        )}

      </div>
    </div>
  );
}
