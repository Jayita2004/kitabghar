import { Mail, Lock, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      setSuccess("Registration successful. Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-8 shadow-xl">

        <h1 className="text-2xl font-semibold text-white text-center">
          Create your Kitabghar account
        </h1>

        <p className="mt-2 text-sm text-slate-400 text-center">
          Join and start reading today
        </p>

        {error && (
          <p className="mt-4 text-sm text-red-400 text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="mt-4 text-sm text-teal-400 text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm text-slate-400">Name</label>
            <div className="relative mt-2">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="
                  w-full pl-10 pr-4 py-3 rounded-xl
                  bg-slate-800 border border-slate-700
                  text-slate-200
                "
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-slate-400">Email</label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="
                  w-full pl-10 pr-4 py-3 rounded-xl
                  bg-slate-800 border border-slate-700
                  text-slate-200
                "
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-slate-400">Password</label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="
                  w-full pl-10 pr-4 py-3 rounded-xl
                  bg-slate-800 border border-slate-700
                  text-slate-200
                "
              />
            </div>
          </div>

          <button
            type="submit"
            className="
              w-full py-3 rounded-xl
              bg-teal-500 text-slate-900
              font-medium
              hover:bg-teal-400
              transition
            "
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
