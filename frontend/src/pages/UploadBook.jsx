import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadBook() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("free");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fake upload (store in localStorage)
    const newBook = {
      id: Date.now(),
      title,
      author,
      isPaid: type === "paid",
      cover: "/covers/the-silent-reading-hour.png", // demo cover
      pdf: "/pdfs/thesilentreadinghour.pdf",        // demo pdf
    };

    const existing = JSON.parse(localStorage.getItem("uploadedBooks")) || [];
    localStorage.setItem(
      "uploadedBooks",
      JSON.stringify([newBook, ...existing])
    );

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Upload Book
        </h2>

        <input
          required
          placeholder="Book Title"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          required
          placeholder="Author Name"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700"
          onChange={(e) => setAuthor(e.target.value)}
        />

        <select
          className="w-full mb-6 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="free">Free Book</option>
          <option value="paid">Paid Book</option>
        </select>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-teal-500 text-slate-900 font-semibold"
        >
          Upload Book
        </button>
      </form>
    </div>
  );
}
