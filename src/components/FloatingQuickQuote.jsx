import { useState } from "react";
import { api } from "../lib/api";

const initial = {
  name: "",
  phone: "",
  city: "",
  service: "Pump-Out",
};

export default function FloatingQuickQuote() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      await api.post("/tickets", {
        subject: `Quick quote: ${form.service}`,
        ...form,
        source: "floating-quick-quote",
      });
      setForm(initial);
      setStatus("Sent. We will follow up shortly.");
    } catch {
      setStatus("Could not send. Please call 281-252-0777.");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-md bg-emerald-500 px-4 py-3 text-sm font-bold text-black shadow-lg hover:bg-emerald-400"
      >
        Quick Quote
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70" onClick={() => setOpen(false)}>
          <div
            className="absolute bottom-0 right-0 m-4 w-[calc(100%-2rem)] max-w-md rounded-lg border border-white/10 bg-zinc-950 p-5 text-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Quick Quote</h3>
                <p className="text-xs text-gray-400">Fast routing for common septic requests.</p>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-md px-2 py-1 text-sm text-gray-300 hover:bg-white/10">
                Close
              </button>
            </div>

            <form onSubmit={submit} className="grid gap-3">
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="rounded-md border border-white/10 bg-zinc-900 px-3 py-2" placeholder="Name" required />
              <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="rounded-md border border-white/10 bg-zinc-900 px-3 py-2" placeholder="Phone" required />
              <input value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className="rounded-md border border-white/10 bg-zinc-900 px-3 py-2" placeholder="City / ZIP" />
              <select value={form.service} onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))} className="rounded-md border border-white/10 bg-zinc-900 px-3 py-2">
                <option>Pump-Out</option>
                <option>Aerobic Install</option>
                <option>Emergency Repair</option>
                <option>Inspection/Maintenance</option>
              </select>
              <button className="rounded-md bg-emerald-500 px-4 py-2 font-bold text-black hover:bg-emerald-400">Send</button>
              {status && <p className="text-sm text-emerald-300">{status}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
