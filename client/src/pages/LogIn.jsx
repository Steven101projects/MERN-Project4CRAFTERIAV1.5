import React from "react"
import { Link } from "react-router-dom"

export default function LogIn() {
  return (
    <div className="m-5 flex justify-center h-[90vh]">

      <div className="p-10 rounded w-[50vw] h-[80vh] bg-white text-orange-600 flex flex-col items-center shadow-lg">

        {/* Title */}
        <p className="text-4xl mb-10 mt-4">Log In</p>

        {/* Larger form area */}
        <form className="w-[70percent] max-w-lg flex flex-col gap-6 flex-grow">

          {/* Email */}
          <div className="flex flex-col text-left text-lg">
            <label className="mb-1">Email</label>
            <input
              type="email"
              className="p-3 rounded bg-orange-200 text-orange-900 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col text-left text-lg">
            <label className="mb-1">Password</label>
            <input
              type="password"
              className="p-3 rounded bg-orange-200 text-orange-900 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-6 p-3 bg-orange-600 rounded text-white hover:bg-orange-700 text-lg"
          >
            Log In
          </button>

          {/* Bottom spacing pushes link downward nicely */}
          <div className="flex-grow"></div>

          {/* Register link */}
          <p className="mt-4 text-center text-sm text-orange-600">
            Do not have an account?{" "}
            <Link
              to="/register"
              className="text-orange-500 underline hover:text-orange-700"
            >
              Register here
            </Link>
          </p>

        </form>

      </div>
    </div>
  )
}
