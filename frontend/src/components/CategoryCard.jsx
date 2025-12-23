export default function CategoryCard({ name }) {
  return (
    <div
      className="
        cursor-pointer
        rounded-2xl border border-slate-800
        bg-slate-900
        px-6 py-5
        text-sm font-medium
        text-slate-200
        hover:border-teal-500/50
        hover:bg-slate-900/70
        transition
      "
    >
      {name}
    </div>
  );
}
