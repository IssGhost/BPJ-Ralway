import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaFan, FaFilter, FaSearch, FaTint, FaTools } from "react-icons/fa";

function addItemToCart(item) {
  const key = "bpj_cart";
  const arr = JSON.parse(localStorage.getItem(key) || "[]");
  const existing = arr.find((x) => x.id === item.id);
  const next = existing
    ? arr.map((x) => (x.id === item.id ? { ...x, qty: (x.qty || 1) + 1 } : x))
    : [...arr, { ...item, qty: 1 }];
  localStorage.setItem(key, JSON.stringify(next));
  window.dispatchEvent(new Event("bpj_cart_update"));
}

const ALL_PRODUCTS = [
  { id: 1, name: "Septic Effluent Pump", price: 250, tag: "pump", icon: FaTint, note: "Common replacement for residential systems." },
  { id: 2, name: "Aerobic Control Timer", price: 150, tag: "electronics", icon: FaFilter, note: "For timed spray and control panels." },
  { id: 3, name: "Tablet Chlorinator", price: 80, tag: "treatment", icon: FaTools, note: "For approved aerobic chlorine treatment." },
  { id: 4, name: "Linear Air Pump", price: 300, tag: "pump", icon: FaFan, note: "Supports aeration in common aerobic systems." },
];

const TAGS = ["all", "pump", "electronics", "treatment"];

export default function Marketplace() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");
  const [sort, setSort] = useState("popular");

  const products = useMemo(() => {
    let list = ALL_PRODUCTS.filter(
      (p) =>
        (tag === "all" || p.tag === tag) &&
        p.name.toLowerCase().includes(query.toLowerCase())
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [query, tag, sort]);

  return (
    <motion.div className="min-h-screen bg-black text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="px-6 pt-36 pb-8 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Field-tested parts</p>
        <h1 className="mt-3 text-4xl font-extrabold">Marketplace</h1>
        <p className="mx-auto mt-2 max-w-2xl text-gray-300">
          Common septic and aerobic system parts. For compatibility, request a quick review before ordering critical components.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full items-center gap-2 rounded-md border border-white/10 bg-zinc-950 px-3 py-2 md:w-96">
            <FaSearch className="text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {TAGS.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`rounded-md border px-3 py-2 text-sm ${
                  tag === t ? "border-emerald-500 bg-emerald-500 text-black" : "border-white/10 bg-zinc-900"
                }`}
              >
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full rounded-md border border-white/10 bg-zinc-950 px-3 py-2 text-sm md:w-auto">
            <option value="popular">Sort: Popular</option>
            <option value="price-asc">Sort: Price Low to High</option>
            <option value="price-desc">Sort: Price High to Low</option>
          </select>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-12 md:grid-cols-2">
        {products.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.id}
              className="rounded-lg border border-white/10 bg-zinc-950 p-6 transition hover:border-emerald-500/50"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="mb-4 grid h-32 place-items-center rounded-md bg-gradient-to-br from-zinc-900 to-emerald-950/60 text-4xl text-emerald-300">
                <Icon />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{p.name}</h2>
                  <p className="mt-1 text-sm capitalize text-gray-400">{p.tag}</p>
                </div>
                <div className="font-bold text-emerald-400">${p.price}</div>
              </div>
              <p className="mt-3 text-sm text-gray-400">{p.note}</p>
              <button onClick={() => addItemToCart(p)} className="mt-5 w-full rounded-md bg-emerald-500 py-2 font-bold text-black hover:bg-emerald-400">
                Add to Cart
              </button>
            </motion.div>
          );
        })}
      </section>

      <section className="bg-emerald-500 py-7 text-black">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-center md:flex-row md:text-left">
          <p className="font-semibold">Need bulk pricing or help matching a part to your system?</p>
          <a href="/contact" className="rounded-md bg-black px-5 py-2 font-bold text-white hover:bg-zinc-900">
            Ask Before Ordering
          </a>
        </div>
      </section>
    </motion.div>
  );
}
