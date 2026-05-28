// FILE: src/components/AccountMenu.jsx
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AccountMenu() {
  const { user, signout } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const initials = useMemo(() => {
    const name = user?.fullName || user?.email || "U";
    const parts = name.split(" ").filter(Boolean);
    return (parts[0]?.[0] || "U").toUpperCase() + (parts[1]?.[0]?.toUpperCase() || "");
  }, [user]);

  const roleColor =
    user?.role === "admin" ? "bg-green-500" :
    user?.role === "employee" ? "bg-amber-400" :
    "bg-transparent";

  const go = (path) => { setOpen(false); nav(path); };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        className="relative h-10 w-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center
                   hover:bg-white/20 transition"
        title="Account"
      >
        <span className="text-sm font-bold">{initials}</span>
        {(user?.role === "admin" || user?.role === "employee") && (
          <span className={`absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-black/70 ${roleColor}`} />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-black/90 backdrop-blur shadow-lg overflow-hidden z-[60]">
          <div className="px-4 py-3 border-b border-white/10">
            <div className="text-sm text-gray-400">Signed in as</div>
            <div className="text-sm font-semibold truncate">{user?.fullName || user?.email}</div>
            <div className="text-xs text-gray-500 capitalize">{user?.role || "user"}</div>
          </div>

          <div className="py-1">
            <button onClick={() => go("/dashboard")} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10">
              My Account
            </button>
            <button onClick={() => go("/dashboard/orders")} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10">
              My Orders
            </button>
            <button onClick={() => go("/dashboard/quotes")} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10">
              My Quotes
            </button>

            {(user?.role === "employee" || user?.role === "admin") && (
              <button onClick={() => go("/employee")} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10">
                Employee Console
              </button>
            )}

            {user?.role === "admin" && (
              <>
                <button onClick={() => go("/admin")} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10">
                  Admin Dashboard
                </button>
                <button onClick={() => go("/admin/users")} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10">
                  Manage Users
                </button>
              </>
            )}
          </div>

          <div className="border-t border-white/10">
            <button
              onClick={() => { signout(); setOpen(false); nav("/"); }}
              className="w-full text-left px-4 py-2 text-sm text-red-300 hover:bg-red-500/10"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {open && <div className="fixed inset-0 z-[50]" onClick={() => setOpen(false)} aria-hidden />}
    </div>
  );
}
