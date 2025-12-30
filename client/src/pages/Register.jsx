import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post("/api/auth/register", {
        name,
        email,
        password
      });

      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  }

  return (
    <div className="m-5 flex justify-center">
      <div className="p-5 rounded w-[50vw] h-[80vh] bg-orange-500 text-white flex flex-col items-center">

        <p className="text-4xl mb-6 mt-4">Create Account</p>

        <form
          onSubmit={handleSubmit}
          className="w-[80%] max-w-xl flex flex-col gap-4"
        >
          <div className="flex flex-col text-left">
            <label className="mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="p-2 rounded bg-orange-200 text-orange-900 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="p-2 rounded bg-orange-200 text-orange-900 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="p-2 rounded bg-orange-200 text-orange-900 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="p-2 rounded bg-orange-200 text-orange-900 focus:outline-none"
              placeholder="Confirm your password"
              required
            />
          </div>

          {error && (
            <p className="text-red-200 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="mt-4 p-2 bg-orange-700 rounded text-white hover:bg-orange-800"
          >
            Register
          </button>

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
  );
}
