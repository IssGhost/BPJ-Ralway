import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../components/Toast";

export default function AdminBlog() {
  const { token } = useAuth();
  const { push } = useToast();
  const nav = useNavigate();
  const [rows, setRows] = useState(null);
  const [q, setQ] = useState("");

  const load = async () => {
    try { setRows(await api.get("/posts?all=1", token)); }
    catch (e) { setRows([]); push(e.message || "Failed to load posts", "error"); }
  };
  useEffect(() => { load(); }, [token]);

  const filtered = (rows || []).filter(p =>
    [p.title, p.summary, p.slug].join(" ").toLowerCase().includes(q.toLowerCase())
  );

  const del = async (id) => {
    if (!confirm("Delete this post?")) return;
    try { await api.del(`/posts/${id}`, token); push("Deleted", "success"); load(); }
    catch (e) { push(e.message || "Delete failed", "error"); }
  };

  if (!rows) return <div className="min-h-screen bg-black text-white pt-32 px-6">Loading…</div>;

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Blog Manager</h1>
          <button onClick={() => nav("/admin/blog/new")}
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500">New Post</button>
        </div>

        <div className="mb-3">
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search posts…"
                 className="w-full sm:w-96 bg-gray-900 border border-white/10 rounded-lg px-3 py-2"/>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3">Slug</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Updated</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p._id} className="border-t border-white/10">
                  <td className="px-4 py-3">
                    <Link to={`/admin/blog/${p._id}`} className="text-green-400 hover:underline">{p.title}</Link>
                  </td>
                  <td className="px-4 py-3">{p.slug}</td>
                  <td className="px-4 py-3 capitalize">{p.status}</td>
                  <td className="px-4 py-3">{new Date(p.updatedAt).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link to={`/admin/blog/${p._id}`} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">Edit</Link>
                      <button onClick={() => del(p._id)} className="px-3 py-1 rounded bg-red-600 hover:bg-red-500">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400">No posts found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
