import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext.jsx";
import { ToastContext } from "../context/ToastContext.jsx";

export default function LogIn() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/api/auth/login", {
        email,
        password
      });

      login(res.data.token, res.data.role, res.data.name);

      showToast("Logged in successfully", "success");

      navigate("/craftbook");
    } catch (err) {
      setError("Invalid email or password");
      showToast("Login failed", "error");
    }
  }

  return (
    <div className="m-5 flex justify-center h-[90vh]">
      <div className="p-10 rounded w-[50vw] h-[80vh] bg-white text-orange-600 flex flex-col items-center shadow-lg">

        <p className="text-4xl mb-10 mt-4">Log In</p>

        <form
          onSubmit={handleSubmit}
          className="w-[70percent] max-w-lg flex flex-col gap-6 flex-grow"
        >
          <div className="flex flex-col text-left text-lg">
            <label className="mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="p-3 rounded bg-orange-200 text-orange-900 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col text-left text-lg">
            <label className="mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="p-3 rounded bg-orange-200 text-orange-900 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="mt-6 p-3 bg-orange-600 rounded text-white hover:bg-orange-700 text-lg"
          >
            Log In
          </button>

          <div className="flex-grow"></div>

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
  );
}
