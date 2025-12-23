import { useState, useEffect } from "react";
import { BookOpen, Users, DollarSign, Check, X } from "lucide-react";
import { apiRequest } from "../api/api";

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 fetch pending books
  const fetchPendingBooks = async () => {
    try {
      const data = await apiRequest("/books/pending");
      setBooks(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingBooks();
  }, []);

  // 🔹 approve
  const approveBook = async (id) => {
    await apiRequest(`/books/approve/${id}`, "PUT");
    fetchPendingBooks();
  };

  // 🔹 reject
  const rejectBook = async (id) => {
    await apiRequest(`/books/reject/${id}`, "PUT");
    fetchPendingBooks();
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">

      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <StatCard icon={<BookOpen />} title="Pending Books" value={books.length} />
        <StatCard icon={<Users />} title="Users" value="120+" />
        <StatCard icon={<DollarSign />} title="Revenue" value="₹18,500" />
        <StatCard icon={<BookOpen />} title="Reviewed Today" value={books.length} />
      </div>

      {/* BOOK LIST */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6">Pending Book Approvals</h2>

        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : books.length === 0 ? (
          <p className="text-slate-400">No pending books.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-slate-950 border border-slate-800 rounded-xl p-4"
              >
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-slate-400">{book.author}</p>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => approveBook(book._id)}
                    className="flex items-center gap-1 text-green-400 text-sm hover:underline"
                  >
                    <Check size={16} /> Approve
                  </button>

                  <button
                    onClick={() => rejectBook(book._id)}
                    className="flex items-center gap-1 text-red-400 text-sm hover:underline"
                  >
                    <X size={16} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-4">
      <div className="p-3 bg-teal-500/10 rounded-xl text-teal-400">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
