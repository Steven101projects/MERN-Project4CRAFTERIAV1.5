import React from "react"
import { Link } from "react-router-dom"

export default function Register() {
  return (
    <div className="m-5 flex justify-center">
      <div className="p-5 rounded w-[50vw] h-[80vh] bg-orange-500 text-white flex flex-col items-center">

        <p className="text-4xl mb-6 mt-4">Create Account</p>

        <form className="w-[80%] max-w-xl flex flex-col gap-4">

          {/* Name */}
          <div className="flex flex-col text-left">
            <label className="mb-1">Name</label>
            <input
              type="text"
              className="p-2 rounded bg-orange-200 text-orange-900 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col text-left">
            <label className="mb-1">Email</label>
            <input
              type="email"
              className="p-2 rounded bg-orange-200 text-orange-900 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col text-left">
            <label className="mb-1">Password</label>
            <input
              type="password"
              className="p-2 rounded bg-orange-200 text-orange-900 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col text-left">
            <label className="mb-1">Confirm Password</label>
            <input
              type="password"
              className="p-2 rounded bg-orange-200 text-orange-900 focus:outline-none"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="mt-4 p-2 bg-orange-700 rounded text-white hover:bg-orange-800"
          >
            Register
          </button>

          {/* Link back to login */}
          <p className="mt-3 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-200 underline hover:text-orange-300"
            >
              Log in here
            </Link>
          </p>

        </form>

      </div>
    </div>
  )
}
