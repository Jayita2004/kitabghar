import { useParams } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-2xl font-semibold">Book Details</h1>
      <p className="mt-4 text-slate-400">
        Book ID: {id}
      </p>
    </div>
  );
}
