import { Search, Moon, Sun, User, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useTheme from "../hooks/useTheme";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <nav className="
  w-full backdrop-blur border-b
  bg-white/80 border-slate-200
  dark:bg-slate-900/80 dark:border-slate-800
">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Left — Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-teal-500/10">
            <BookOpen className="w-5 h-5 text-teal-400" />
          </div>
          <span className="text-lg font-semibold tracking-wide">
            Kitabghar
          </span>
        </div>

        {/* Center — Search */}
        <div className="hidden md:flex items-center relative w-[420px]">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search books, authors, genres..."
            className="
              w-full pl-10 pr-4 py-2 rounded-full
              bg-slate-800 text-sm
              placeholder:text-slate-400
              border border-slate-700
              focus:outline-none focus:ring-2 focus:ring-teal-500/40
            "
          />
        </div>

        {/* Right — Actions */}
        <div className="flex items-center gap-4">

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-slate-800 transition"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-slate-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* My Library */}
          <button
            onClick={() => navigate(user ? "/library" : "/login")}
            className="hidden sm:block text-sm text-slate-300 hover:text-white transition"
          >
            My Library
          </button>

          {/* Profile / Logout */}
          {user ? (
            <div className="flex items-center gap-3">

              {/* Profile */}
              <button
                onClick={() => navigate("/profile")}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition"
                title="Profile"
              >
                <User className="w-4 h-4 text-slate-200" />
              </button>

              {/* Upload */}
              <button
                onClick={() => navigate("/upload")}
                className="text-sm text-teal-400 hover:underline"
              >
                Upload
              </button>

              {/* ✅ ADMIN PANEL (ONLY FOR ADMIN) */}
              {user?.role === "admin" && (
                <button
                  onClick={() => navigate("/admin")}
                  className="text-sm text-teal-400 hover:underline"
                >
                  Admin Panel
                </button>
              )}

              {/* Logout */}
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-sm text-red-400 hover:text-red-300 transition"
              >
                Logout
              </button>

            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition"
              title="Login"
            >
              <User className="w-4 h-4 text-slate-200" />
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}
