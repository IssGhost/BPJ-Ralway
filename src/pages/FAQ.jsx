import FAQAccordion from "../components/FAQAccordion";
import { FaPhone, FaEnvelope, FaBolt } from "react-icons/fa";

export default function FAQ() {
  const quick = [
    { label: "Pumping", desc: "Frequency, warning signs, and scheduling" },
    { label: "Aerobic Systems", desc: "Alarms, chlorination, spray heads, and upkeep" },
    { label: "Repairs", desc: "Emergency timing, parts, and service expectations" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="px-6 pt-36 pb-8 text-center">
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="mx-auto mt-3 max-w-2xl text-gray-400">
          Answers to common septic and aerobic system questions. If you need urgent help, call the office.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-6 md:grid-cols-3">
        {quick.map((q) => (
          <div key={q.label} className="rounded-lg border border-white/10 bg-zinc-950 p-5">
            <div className="font-semibold text-emerald-400">{q.label}</div>
            <div className="mt-1 text-sm text-gray-400">{q.desc}</div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-8">
        <FAQAccordion />
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-16 md:grid-cols-3">
        {[
          { icon: <FaPhone />, title: "Call", text: "281-252-0777" },
          { icon: <FaEnvelope />, title: "Service Request", text: "Use the contact form for scheduling" },
          { icon: <FaBolt />, title: "Emergency", text: "Rapid response for backups and alarms" },
        ].map((c) => (
          <div key={c.title} className="rounded-lg border border-white/10 bg-zinc-950 p-6 text-center">
            <div className="mx-auto mb-2 text-2xl text-emerald-400">{c.icon}</div>
            <div className="font-semibold">{c.title}</div>
            <div className="mt-1 text-sm text-gray-400">{c.text}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
