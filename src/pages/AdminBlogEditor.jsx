import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

export default function AdminBlogEditor() {
  const { id } = useParams(); // "new" or post id
  const creating = id === "new";
  const { token, user } = useAuth();
  const { push } = useToast();
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    coverUrl: "",
    status: "draft",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!creating) {
      api.get(`/posts/${id}`, token).then((p) => {
        setForm({
          title: p.title || "",
          slug: p.slug || "",
          summary: p.summary || "",
          content: p.content || "",
          coverUrl: p.coverUrl || "",
          status: p.status || "draft",
        });
      }).catch(() => {});
    }
  }, [id, creating, token]);

  const autoSlug = useMemo(() => form.title
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""), [form.title]);

  const save = async (publish = false) => {
    setSaving(true);
    try {
      const payload = { ...form, slug: form.slug || autoSlug, status: publish ? "published" : form.status };
      if (creating) await api.post("/posts", payload, token);
      else await api.put(`/posts/${id}`, payload, token);
      push(publish ? "Published" : "Saved", "success");
      nav("/admin/blog");
    } catch (e) {
      push(e.message || "Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{creating ? "New Post" : "Edit Post"}</h1>
          <div className="flex gap-2">
            <button disabled={saving} onClick={() => save(false)} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">
              {saving ? "Saving…" : "Save Draft"}
            </button>
            <button disabled={saving} onClick={() => save(true)} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500">
              {saving ? "Saving…" : "Publish"}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: fields */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gray-900/80 border border-white/10 rounded-2xl p-5">
              <label className="block mb-3">
                <div className="text-sm text-gray-400">Title</div>
                <input className="mt-1 w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2"
                  value={form.title} onChange={(e)=>setForm(f=>({...f, title:e.target.value}))}/>
              </label>
              <label className="block mb-3">
                <div className="text-sm text-gray-400">Slug</div>
                <input className="mt-1 w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2"
                  placeholder={autoSlug}
                  value={form.slug} onChange={(e)=>setForm(f=>({...f, slug:e.target.value}))}/>
              </label>
              <label className="block mb-3">
                <div className="text-sm text-gray-400">Summary</div>
                <textarea rows={3} className="mt-1 w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2"
                  value={form.summary} onChange={(e)=>setForm(f=>({...f, summary:e.target.value}))}/>
              </label>
              <label className="block">
                <div className="text-sm text-gray-400">Content (Markdown or plain text)</div>
                <textarea rows={12} className="mt-1 w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2"
                  value={form.content} onChange={(e)=>setForm(f=>({...f, content:e.target.value}))}/>
              </label>
            </div>
          </div>

          {/* Right: meta */}
          <div className="space-y-4">
            <div className="card-pro--grid rounded-2xl p-5">
              <label className="block">
                <div className="text-sm text-gray-400">Cover Image URL</div>
                <input className="mt-1 w-full bg-gray-900 border border-white/10 rounded-lg px-3 py-2"
                  value={form.coverUrl} onChange={(e)=>setForm(f=>({...f, coverUrl:e.target.value}))}/>
              </label>
              {form.coverUrl && (
                <div className="mt-3 rounded-lg overflow-hidden border border-white/10">
                  <img src={form.coverUrl} alt="cover" className="w-full h-40 object-cover"/>
                </div>
              )}
            </div>

            <div className="card-pro--grid rounded-2xl p-5">
              <label className="block">
                <div className="text-sm text-gray-400">Status</div>
                <select className="mt-1 w-full bg-gray-900 border border-white/10 rounded-lg px-3 py-2"
                        value={form.status} onChange={(e)=>setForm(f=>({...f, status:e.target.value}))}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </label>
              <div className="text-xs text-gray-400 mt-3">
                Author: {user?.fullName || user?.email}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
