import { motion } from "framer-motion";
import { FaWrench, FaWater, FaBolt, FaClipboardList, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    { icon: <FaWater />, title: "Septic Tank Pumping", desc: "Routine and urgent pump-outs with careful cleanup and disposal." },
    { icon: <FaWrench />, title: "Aerobic System Installation", desc: "New installs, replacements, and component setup for modern aerobic systems." },
    { icon: <FaBolt />, title: "Emergency Repairs", desc: "Alarm issues, backups, pump failures, electrical timers, and spray field problems." },
    { icon: <FaClipboardList />, title: "Maintenance Plans", desc: "Inspection schedules, chlorination checks, and service records for compliance." },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <section className="relative overflow-hidden px-6 pt-36 pb-14">
        <div className="absolute inset-0">
          <img src="/images/IMG_0794.JPG" alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black to-black" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Services</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold md:text-6xl">Everything your septic system needs, handled by one crew.</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            From first diagnosis to final walkthrough, Big Papa Joe keeps septic service straightforward, clean, and properly documented.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-12 md:grid-cols-2">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            className="rounded-lg border border-white/10 bg-zinc-950 p-6 md:p-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-center gap-3 text-emerald-400">
              <span className="text-2xl">{s.icon}</span>
              <h3 className="text-2xl font-bold text-white">{s.title}</h3>
            </div>
            <p className="mt-3 text-gray-400">{s.desc}</p>
            <Link to="/contact" className="mt-6 inline-block rounded-md bg-emerald-500 px-5 py-2 font-bold text-black hover:bg-emerald-400">
              Request Service
            </Link>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-6 rounded-lg border border-white/10 bg-zinc-950 p-6 md:grid-cols-4">
          {["Call or request", "On-site assessment", "Repair or install", "Test and document"].map((step, i) => (
            <div key={step}>
              <div className="text-sm font-bold text-emerald-400">Step {i + 1}</div>
              <div className="mt-1 font-semibold text-white">{step}</div>
              <p className="mt-2 text-sm text-gray-400">Clear communication before the next move.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-2 md:items-center">
        <div className="rounded-lg border border-white/10 bg-zinc-950 p-6">
          <div className="mb-3 flex items-center gap-2 text-white">
            <FaMapMarkerAlt className="text-emerald-400" />
            <h3 className="text-xl font-bold">Service Area</h3>
          </div>
          <p className="text-gray-300">Pinehurst, Magnolia, Tomball, Montgomery County, and surrounding Texas communities.</p>
          <div className="mt-5 grid gap-2 text-sm text-gray-300">
            {["Residential systems", "Small business and commercial sites", "Emergency and scheduled service"].map((item) => (
              <div key={item} className="flex items-center gap-2"><FaCheckCircle className="text-emerald-400" /> {item}</div>
            ))}
          </div>
        </div>
        <img src="/images/IMG_0796.JPG" alt="Septic service area job site" className="h-80 w-full rounded-lg object-cover" />
      </section>

      <section className="bg-emerald-500 py-9 text-center text-black">
        <h3 className="text-2xl font-extrabold">Ready to schedule?</h3>
        <Link to="/contact" className="mt-3 inline-block rounded-md bg-black px-6 py-3 font-bold text-white hover:bg-zinc-900">
          Get a Quote
        </Link>
      </section>
    </div>
  );
}
