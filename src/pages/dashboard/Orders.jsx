import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";
import { Link } from "react-router-dom";

const FILTERS = ["all", "pending", "paid", "shipped", "completed", "canceled"];

export default function DashboardOrders() {
  const { token } = useAuth();
  const [rows, setRows] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api.get("/orders/my", token).then(setRows).catch(() => setRows([]));
  }, [token]);

  const list = useMemo(() => {
    if (!rows) return [];
    return rows.filter(o => (filter === "all" ? true : o.status === filter));
  }, [rows, filter]);

  const totals = useMemo(() => {
    const count = list.length;
    const sum = list.reduce((a, b) => a + (Number(b.total) || 0), 0);
    return { count, sum };
  }, [list]);

  if (!rows) return <div className="text-gray-400">Loading…</div>;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Filter</label>
          <select value={filter} onChange={(e)=>setFilter(e.target.value)}
                  className="bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-sm">
            {FILTERS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>

      {/* Summary band */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          <div><div className="text-xs text-gray-400 uppercase">Orders</div><div className="text-xl font-bold">{totals.count}</div></div>
          <div><div className="text-xs text-gray-400 uppercase">Total</div><div className="text-xl font-bold">${totals.sum.toFixed(2)}</div></div>
          <div><div className="text-xs text-gray-400 uppercase">Action</div>
            <Link to="/marketplace" className="inline-block mt-1 px-3 py-2 bg-green-600 rounded-lg hover:bg-green-500">Shop More</Link>
          </div>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="bg-gray-900/80 border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-gray-300">No orders in this filter.</p>
          <Link to="/marketplace" className="inline-block mt-3 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg">Go to Marketplace</Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left px-4 py-3">Order #</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {list.map((o) => (
                <tr key={o._id} className="border-t border-white/10">
                  <td className="px-4 py-3">{o.number || o._id.slice(-6).toUpperCase()}</td>
                  <td className="px-4 py-3">{new Date(o.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3 capitalize">{o.status || "pending"}</td>
                  <td className="px-4 py-3">${(o.total ?? 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
