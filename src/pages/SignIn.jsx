import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const { signin, authBusy } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await signin({ email, password });
      if (user) nav(from, { replace: true });
    } catch (err) {
      setError(err?.message || "Failed to sign in.");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-neutral-950 text-neutral-100 px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 p-6 rounded-lg border border-neutral-800 bg-neutral-900/80"
        noValidate
      >
        <div>
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="text-sm text-neutral-400 mt-1">Access quotes, orders, payments, and service history.</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-neutral-300">Email or username</label>
          <input
            name="email"
            type="text"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2"
            placeholder="you@domain.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-neutral-300">Password</label>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2"
            placeholder="Your password"
            required
          />
        </div>

        {error && <div className="text-sm text-red-400 whitespace-pre-wrap">{error}</div>}

        <div className="rounded-md border border-amber-400/20 bg-amber-400/10 p-3 text-xs text-amber-100">
          Temporary admin demo: username <span className="font-bold">admin</span>, password <span className="font-bold">admin</span>.
        </div>

        <button
          disabled={authBusy}
          className="w-full rounded-md bg-emerald-500 text-black font-semibold py-2 hover:bg-emerald-400 disabled:opacity-60"
        >
          {authBusy ? "Signing in..." : "Continue"}
        </button>

        <p className="text-xs text-neutral-400">
          Need an account? <Link to="/signup" className="text-emerald-400 hover:underline">Create one</Link>.
        </p>
      </form>
    </div>
  );
}
