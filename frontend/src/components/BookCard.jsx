import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function BookCard({ book }) {
  const navigate = useNavigate();
  const { user } = useAuth();

 const handleAction = () => {
  if (!user) {
    navigate("/login");
    return;
  }

  if (!book.isPaid && book.pdf) {
    window.open(book.pdf, "_blank");
  } else {
    navigate(`/book/${book.id}`);
  }
};


  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-4 hover:border-teal-500/40 transition">
      {/* Cover */}
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-800">
  <img
    src={book.cover}
    alt={book.title}
    className="w-full h-full object-cover"
  />

  {book.isPaid && (
    <div className="absolute top-2 right-2 bg-slate-900/80 px-2 py-1 rounded-full text-xs">
      Paid
    </div>
  )}
</div>


      {/* Info */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold line-clamp-1">
          {book.title}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          {book.author}
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={handleAction}
        className="
          mt-4 w-full rounded-xl py-2 text-sm
          bg-slate-800 text-slate-200
          group-hover:bg-teal-500 group-hover:text-slate-900
          transition
        "
      >
        {book.isPaid ? "Buy Book" : "Read Now"}
      </button>
    </div>
  );
}
