import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";
import { useToast } from "../../components/Toast";

const TEMPLATES = [
  { label: "Aerobic Install", subject: "Aerobic system install", details: "New install, estimated usage, site access, photos?" },
  { label: "Tank Pumping", subject: "Septic tank pumping", details: "Tank size, last service date, access notes, gate code?" },
  { label: "Emergency Repair", subject: "Emergency repair", details: "Symptoms, alarms, odors, backup, time window." },
];

export default function DashboardQuotes() {
  const { token } = useAuth();
  const { push } = useToast();

  const [rows, setRows] = useState(null);
  const [form, setForm] = useState({ subject: "", details: "" });
  const [sending, setSending] = useState(false);
  const [filter, setFilter] = useState("all");

  const load = async () => {
    try { setRows(await api.get("/quotes/my", token)); } catch { setRows([]); }
  };
  useEffect(() => { load(); }, [token]);

  const list = useMemo(() => rows ? rows.filter(q => filter==="all" ? true : q.status===filter) : [], [rows, filter]);

  const applyTemplate = (t) => setForm({ subject: t.subject, details: t.details });

  const submit = async () => {
    if (!form.subject.trim() || !form.details.trim()) return;
    setSending(true);
    try { await api.post("/quotes", form, token); setForm({ subject:"", details:"" }); push("Quote request submitted", "success"); load(); }
    catch (e) { push(e.message || "Failed to submit quote", "error"); }
    finally { setSending(false); }
  };

  if (!rows) return <div className="text-gray-400">Loading…</div>;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Quotes</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Filter</label>
          <select value={filter} onChange={(e)=>setFilter(e.target.value)}
                  className="bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-sm">
            {["all","pending","approved","rejected"].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Templates */}
      <div className="grid sm:grid-cols-3 gap-3">
        {TEMPLATES.map(t => (
          <button key={t.label} onClick={() => applyTemplate(t)}
                  className="card-pro--grid rounded-xl p-3 text-left hover:bg-white/10">
            <div className="text-sm text-gray-400">Template</div>
            <div className="font-semibold">{t.label}</div>
          </button>
        ))}
      </div>

      {/* Request form */}
      <div className="bg-gray-900/80 border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-3">Request a Quote</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400">Subject</span>
            <input className="mt-1 w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2"
                   value={form.subject} onChange={(e)=>setForm(f=>({...f, subject:e.target.value}))}/>
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm text-gray-400">Details</span>
            <textarea rows={4} className="mt-1 w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2"
                      value={form.details} onChange={(e)=>setForm(f=>({...f, details:e.target.value}))}/>
          </label>
        </div>
        <button onClick={submit} disabled={sending}
                className="mt-4 bg-green-600 hover:bg-green-500 px-5 py-2 rounded-lg disabled:opacity-60">
          {sending ? "Submitting..." : "Submit Quote Request"}
        </button>
      </div>

      {/* List */}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left px-4 py-3">Subject</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Estimate</th>
              <th className="text-left px-4 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {list.map(q => (
              <tr key={q._id} className="border-t border-white/10">
                <td className="px-4 py-3">{q.subject}</td>
                <td className="px-4 py-3 capitalize">{q.status || "pending"}</td>
                <td className="px-4 py-3">{q.estimate ? `$${Number(q.estimate).toFixed(2)}` : "—"}</td>
                <td className="px-4 py-3">{new Date(q.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td className="px-4 py-6 text-center text-gray-400" colSpan={4}>No quotes in this filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FAQ strip */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm text-gray-300">
          <strong>Tip:</strong> Attach photos and site notes in the contact form for fastest scheduling.
        </div>
      </div>
    </>
  );
}
