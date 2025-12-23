import { Mail, Lock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // save user + token
      login(res.data.user, res.data.token);

      // redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/library");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-8 shadow-xl">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-white text-center">
          Welcome back to Kitabghar
        </h1>
        <p className="mt-2 text-sm text-slate-400 text-center">
          Sign in to continue reading
        </p>

        {error && (
          <p className="mt-4 text-sm text-red-400 text-center">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm text-slate-400">Email</label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="
                  w-full pl-10 pr-4 py-3 rounded-xl
                  bg-slate-800 border border-slate-700
                  text-slate-200
                  placeholder:text-slate-500
                  focus:outline-none focus:ring-2 focus:ring-teal-500/40
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
                placeholder="••••••••"
                required
                className="
                  w-full pl-10 pr-4 py-3 rounded-xl
                  bg-slate-800 border border-slate-700
                  text-slate-200
                  placeholder:text-slate-500
                  focus:outline-none focus:ring-2 focus:ring-teal-500/40
                "
              />
            </div>
          </div>

          {/* Button */}
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
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-400">
          New to Kitabghar?{" "}
          <Link to="/register" className="text-teal-400 hover:underline">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
}
