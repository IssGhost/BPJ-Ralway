import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DashboardLayout() {
  const { user } = useAuth();

  const item =
    "block px-4 py-2 rounded-lg font-medium transition-colors border border-transparent";
  const active = "bg-green-600/20 border-green-600 text-white";
  const hover = "hover:bg-white/10 text-white/90";

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6 bg-noise">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[260px_1fr_280px] gap-8">
        {/* Sidebar */}
        <aside className="card-pro--grid rounded-2xl p-5 h-fit sticky top-24">
          <div className="mb-4">
            <div className="text-xs text-gray-400">Signed in as</div>
            <div className="font-semibold truncate">{user?.fullName || user?.email}</div>
            <div className="text-xs text-gray-500 capitalize">{user?.role || "user"}</div>
          </div>
          <nav className="space-y-2">
            <NavLink end to="/dashboard" className={({isActive}) => `${item} ${isActive ? active : hover}`}>My Account</NavLink>
            <NavLink to="/dashboard/orders" className={({isActive}) => `${item} ${isActive ? active : hover}`}>My Orders</NavLink>
            <NavLink to="/dashboard/quotes" className={({isActive}) => `${item} ${isActive ? active : hover}`}>My Quotes</NavLink>
          </nav>
        </aside>

        {/* Main */}
        <section className="space-y-6">
          <Outlet />
        </section>

        {/* Right rail (fills space with helpful content) */}
        <aside className="space-y-4 h-fit sticky top-24">
          <div className="card-pro--grid rounded-2xl p-5">
            <h3 className="font-semibold mb-2">Quick Actions</h3>
            <div className="grid gap-2">
              <a href="/marketplace" className="px-3 py-2 bg-white/5 rounded-lg hover:bg-white/10">Shop parts & supplies</a>
              <a href="/quote" className="px-3 py-2 bg-white/5 rounded-lg hover:bg-white/10">Start a new quote</a>
              <a href="/contact" className="px-3 py-2 bg-white/5 rounded-lg hover:bg-white/10">Contact support</a>
            </div>
          </div>

          <div className="card-pro--grid rounded-2xl p-5">
            <h3 className="font-semibold mb-2">Service Tips</h3>
            <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">
              <li>Schedule aerobic system checks every 6–12 months.</li>
              <li>Keep lids accessible; avoid heavy loads over tanks.</li>
              <li>Use septic-safe detergents and avoid flushable wipes.</li>
            </ul>
          </div>

          <div className="rounded-2xl p-5 border border-white/10 bg-gradient-to-br from-emerald-600/25 to-cyan-500/10">
            <h3 className="font-semibold">Need help fast?</h3>
            <p className="text-sm text-gray-200 mt-1">Emergency line available 24/7.</p>
            <a href="/contact" className="inline-block mt-3 px-3 py-2 bg-black/70 border border-white/10 rounded-lg hover:bg-black">
              Request service
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
