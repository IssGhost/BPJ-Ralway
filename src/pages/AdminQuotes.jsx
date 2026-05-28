// FILE: src/pages/AdminQuotes.jsx
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

export default function AdminQuotes() {
  const { token } = useAuth();
  const { push } = useToast();

  const [rows, setRows] = useState(null);
  const [busy, setBusy] = useState(null);
  const [edit, setEdit] = useState({}); // { [id]: estimate }

  const load = async () => {
    try {
      const data = await api.get("/quotes", token); // employee/admin list
      setRows(data);
    } catch (e) {
      setRows([]);
      push(e.message || "Failed to load quotes", "error");
    }
  };

  useEffect(() => { load(); }, [token]);

  const update = async (id, payload) => {
    setBusy(id);
    try {
      await api.put(`/quotes/${id}`, payload, token);
      push("Quote updated", "success");
      await load();
    } catch (e) {
      push(e.message || "Failed to update quote", "error");
    } finally {
      setBusy(null);
    }
  };

  if (!rows) return <div className="min-h-screen bg-black text-white pt-32 px-6">Loading…</div>;

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Manage Quotes</h1>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left px-4 py-3">Subject</th>
                <th className="text-left px-4 py-3">Customer</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Estimate</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((q) => (
                <tr key={q._id} className="border-top border-white/10">
                  <td className="px-4 py-3">{q.subject}</td>
                  <td className="px-4 py-3">{q.user?.email || q.userId}</td>
                  <td className="px-4 py-3 capitalize">{q.status}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder={q.estimate ? String(q.estimate) : "—"}
                      value={edit[q._id] ?? ""}
                      onChange={(e) => setEdit((m) => ({ ...m, [q._id]: e.target.value }))}
                      className="w-28 bg-gray-900 border border-white/10 rounded px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        disabled={busy === q._id}
                        onClick={() => update(q._id, { status: "approved", estimate: Number(edit[q._id] ?? q.estimate) || q.estimate })}
                        className="px-3 py-1 rounded bg-green-600 hover:bg-green-500"
                      >
                        Approve
                      </button>
                      <button
                        disabled={busy === q._id}
                        onClick={() => update(q._id, { status: "rejected" })}
                        className="px-3 py-1 rounded bg-red-600 hover:bg-red-500"
                      >
                        Reject
                      </button>
                      <button
                        disabled={busy === q._id}
                        onClick={() => update(q._id, { estimate: Number(edit[q._id]) })}
                        className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
                      >
                        Save Estimate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-400" colSpan={5}>
                    No quotes yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
