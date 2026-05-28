import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const { signup, authBusy } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await signup(email, pw, name);
      nav("/dashboard/account");
    } catch (e) {
      setErr(e.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-black bg-noise text-white flex items-center justify-center px-6">
      <form onSubmit={submit} className="card-pro--grid p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Create your account</h1>
        <p className="text-sm text-gray-400 mb-6">Request quotes and track septic service in one place.</p>

        <label className="block text-sm mb-1">Full Name</label>
        <input
          className="w-full mb-4 p-3 rounded bg-gray-800 border border-white/10"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          required
        />

        <label className="block text-sm mb-1">Email</label>
        <input
          className="w-full mb-4 p-3 rounded bg-gray-800 border border-white/10"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          type="email"
          required
        />

        <label className="block text-sm mb-1">Password</label>
        <input
          className="w-full mb-4 p-3 rounded bg-gray-800 border border-white/10"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Minimum 8 characters"
          type="password"
          required
        />

        {err && <p className="text-red-400 mb-3">{err}</p>}

        <button disabled={authBusy} className="w-full py-3 bg-green-600 rounded hover:bg-green-500 disabled:opacity-60">
          {authBusy ? "Creating..." : "Create Account"}
        </button>

        <p className="text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-green-400 hover:underline">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
