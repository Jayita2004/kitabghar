import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import CategoryCard from "../components/CategoryCard";

export default function Home() {
  const navigate = useNavigate();

  // 🔹 BACKEND BOOKS (NEW)
  const [backendBooks, setBackendBooks] = useState([]);

  // ===== UPLOADED BOOKS (FAKE BACKEND - KEEPING) =====
  const uploadedBooks =
    JSON.parse(localStorage.getItem("uploadedBooks")) || [];

  // ===== FREE BOOKS (STATIC DEMO) =====
  const freeBooks = [
    {
      id: 1,
      title: "The Silent Reading Hour",
      author: "A. Sharma",
      isPaid: false,
      cover: "/covers/the_silent_reading_hour.png",
      pdf: "/pdfs/the_silent_reading_hour.pdf",
    },
    {
      id: 2,
      title: "The Art of Resilience",
      author: "R. Sen",
      isPaid: false,
      cover: "/covers/the_art_of_resilience.png",
      pdf: "/pdfs/the_silent_reading_hour.pdf",
    },
    {
      id: 3,
      title: "Legend of the Lost Realm",
      author: "N. Das",
      isPaid: false,
      cover: "/covers/legend_of_the_lost_realm.png",
      pdf: "/pdfs/the_silent_reading_hour.pdf",
    },
    {
      id: 4,
      title: "Wallflower Blooming",
      author: "M. Roy",
      isPaid: false,
      cover: "/covers/wallflower_blooming.jpeg",
      pdf: "/pdfs/the_silent_reading_hour.pdf",
    },
  ];

  // ===== PAID BOOKS =====
  const paidBooks = [
    {
      id: 5,
      title: "Timeless Tales of Valor",
      author: "Edmund Harlow",
      isPaid: true,
      cover: "/covers/timeless_tales_of_valor.png",
    },
    {
      id: 6,
      title: "Echoes of Tommorrow",
      author: "S. Roy",
      isPaid: true,
      cover: "/covers/echoes_of_tommorrow.png",
    },
    {
      id: 7,
      title: "A Daily Dose of Love",
      author: "Nicole Mier",
      isPaid: true,
      cover: "/covers/a_daily_dose_of_love.png",
    },
    {
      id: 8,
      title: "A Change Encounter",
      author: "James Clear",
      isPaid: true,
      cover: "/covers/a_change_encounter.png",
    },
  ];

  // ===== CATEGORIES =====
  const categories = [
    "Fiction",
    "Non-Fiction",
    "Self-Help",
    "Biography",
    "Business",
    "Technology",
    "Philosophy",
    "Education",
  ];

  // 🔹 FETCH BACKEND BOOKS (SAFE)
  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => setBackendBooks(data))
      .catch(() => setBackendBooks([]));
  }, []);

  return (
    <main className="
  bg-white text-slate-900
  dark:bg-slate-950 dark:text-slate-100
">

      {/* ================= HERO ================= */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-28 grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Read smarter <br />
              <span className="text-teal-400">Anywhere.</span>
            </h1>

            <p className="mt-6 text-lg text-slate-400 max-w-xl">
              Unlimited e-books with intelligent reading tools.
              Discover, read, and manage your library effortlessly.
            </p>

            <div className="mt-10 max-w-xl relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                placeholder="Search books, authors, or categories"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-900 border border-slate-800 focus:ring-2 focus:ring-teal-500/40"
              />
            </div>

            <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 rounded-xl bg-teal-500 text-slate-900 font-medium">
                Start Free Trial
              </button>
              <button
                onClick={() => navigate("/library")}
                className="px-6 py-3 rounded-xl border border-slate-700"
              >
                Browse Free Books
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:flex justify-end">
            <img
              src="/HERO_IMAGE_KITABGHAR.jpg"
              alt="Hero"
              className="w-[420px] h-[300px] rounded-2xl object-cover border border-slate-800"
            />
          </div>
        </div>
      </section>

      {/* ================= FREE BOOKS ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex justify-between mb-8">
          <h2 className="text-2xl font-semibold">Free Books</h2>
          <button
            onClick={() => navigate("/library")}
            className="text-teal-400"
          >
            View all
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[...backendBooks, ...uploadedBooks, ...freeBooks]
            .filter((b) => !b.isPaid)
            .slice(0, 4)
            .map((book, idx) => (
              <BookCard key={book._id || book.id || idx} book={book} />
            ))}
        </div>
      </section>

      {/* ================= PAID BOOKS ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex justify-between mb-8">
          <h2 className="text-2xl font-semibold">Paid Books</h2>
          <button className="text-teal-400">View all</button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[...backendBooks, ...paidBooks]
            .filter((b) => b.isPaid)
            .slice(0, 4)
            .map((book, idx) => (
              <BookCard key={book._id || book.id || idx} book={book} />
            ))}
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="flex justify-between mb-8">
          <h2 className="text-2xl font-semibold">Explore Categories</h2>
          <button className="text-teal-400">View all →</button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <CategoryCard key={cat} name={cat} />
          ))}
        </div>
      </section>

    </main>
  );
}
