import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaClock, FaShieldAlt, FaTools, FaWater, FaClipboardCheck, FaPhoneAlt } from "react-icons/fa";
import LazyImg from "../components/LazyImg";

const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.65, ease: "easeOut" },
});

const services = [
  {
    icon: FaWater,
    title: "Septic Pump-Outs",
    desc: "Careful pumping, clean hose management, and clear guidance on what your tank is telling us.",
  },
  {
    icon: FaTools,
    title: "Aerobic System Repairs",
    desc: "Air pumps, alarms, sprinklers, timers, chlorinators, and field diagnostics handled by experienced techs.",
  },
  {
    icon: FaClipboardCheck,
    title: "Maintenance Plans",
    desc: "Scheduled inspections that help prevent emergencies and keep your system in compliance.",
  },
];

export default function Home() {
  return (
    <div className="bg-black text-white">
      <section className="relative min-h-[92vh] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/drone video.mp4"
          poster="/images/hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-6 pt-28">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300"
            >
              Magnolia, Texas septic specialists
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.75 }}
              className="mt-4 text-5xl font-extrabold leading-tight md:text-7xl"
            >
              Septic work that is clean, fast, and built to last.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.75 }}
              className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl"
            >
              Big Papa Joe Septic handles aerobic systems, pump-outs, emergency repairs, inspections, and maintenance with straight answers and dependable field crews.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.75 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/contact" className="rounded-md bg-emerald-500 px-6 py-3 font-bold text-black hover:bg-emerald-400">
                Request Service
              </Link>
              <a href="tel:2812520777" className="inline-flex items-center gap-2 rounded-md border border-amber-300/50 px-6 py-3 font-bold text-amber-100 hover:bg-amber-300/10">
                <FaPhoneAlt /> 281-252-0777
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-6 md:grid-cols-4">
          {[
            { icon: FaShieldAlt, label: "Licensed & Insured" },
            { icon: FaClock, label: "Emergency Response" },
            { icon: FaTools, label: "Aerobic Specialists" },
            { icon: FaClipboardCheck, label: "Clear Estimates" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 rounded-md bg-white/[0.03] p-4">
                <Icon className="text-emerald-400" />
                <span className="font-semibold">{item.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-3">
        {[
          { label: "Years Serving Texas", value: 25, suffix: "+" },
          { label: "Projects Completed", value: 5000, suffix: "+" },
          { label: "Emergency Availability", value: 24, suffix: "/7" },
        ].map((s) => (
          <motion.div key={s.label} {...fadeInUp()} className="rounded-lg border border-white/10 bg-zinc-950 p-8 text-center">
            <div className="text-5xl font-extrabold text-emerald-400">
              {s.value === 24 ? "24/7" : <><CountUp end={s.value} duration={2} />{s.suffix}</>}
            </div>
            <p className="mt-3 text-gray-300">{s.label}</p>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">What we do</p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Field-ready septic services</h2>
          </div>
          <Link to="/services" className="text-sm font-bold text-emerald-300 hover:text-emerald-200">View all services</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} {...fadeInUp(i * 0.1)} className="rounded-lg border border-white/10 bg-zinc-950 p-6">
                <Icon className="text-3xl text-emerald-400" />
                <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-gray-400">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">The Big Papa Joe difference</p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">No mystery, no mess left behind.</h2>
          <p className="mt-4 text-gray-300">
            Septic problems are stressful enough. Our process is designed around fast diagnosis, honest options, careful site protection, and clear follow-up after the work is complete.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-gray-300 sm:grid-cols-2">
            {["Photo-informed estimates", "Service history tracking", "Maintenance reminders", "Parts and repair support"].map((item) => (
              <div key={item} className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3">{item}</div>
            ))}
          </div>
        </div>
        <LazyImg src="/images/IMG_0793.JPG" alt="Septic field service truck and equipment" className="h-[420px] w-full rounded-lg object-cover" />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Recent field work</p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Real systems. Real sites.</h2>
          </div>
          <Link to="/contact" className="text-sm font-bold text-emerald-300 hover:text-emerald-200">Start a project</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[793, 794, 795, 796, 797].map((num) => (
            <LazyImg
              key={num}
              src={`/images/IMG_0${num}.JPG`}
              alt="Septic project site"
              className="h-60 w-full rounded-lg object-cover"
            />
          ))}
        </div>
      </section>

      <section className="bg-emerald-500 py-10 text-black">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-3xl font-extrabold">Need help with a tank, alarm, or aerobic system?</h2>
            <p className="mt-1 font-medium text-black/75">Send the request now or call for emergency service.</p>
          </div>
          <Link to="/contact" className="rounded-md bg-black px-6 py-3 font-bold text-white hover:bg-zinc-900">
            Get a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
