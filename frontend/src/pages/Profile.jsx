import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-2xl font-semibold">Profile</h1>

      <div className="mt-6 space-y-2 text-slate-300">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>

      <button
        onClick={logout}
        className="mt-6 px-5 py-2 bg-red-500 rounded-lg text-white"
      >
        Logout
      </button>
    </div>
  );
}
