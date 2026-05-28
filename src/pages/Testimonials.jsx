import TestimonialsCarousel from "../components/TestimonialsCarousel";

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-black pt-32 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="mb-4 text-center text-4xl font-bold">What Customers Say</h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-400">
          Feedback from homeowners and property managers who trust Big Papa Joe Septic for repairs, maintenance, and system support.
        </p>
        <TestimonialsCarousel />

        <div className="mt-16 grid gap-6 rounded-lg border border-white/10 bg-zinc-950 p-6 md:grid-cols-3">
          {["Clear scheduling", "Respectful job sites", "Practical maintenance advice"].map((item) => (
            <div key={item} className="text-center">
              <div className="text-lg font-bold text-emerald-400">{item}</div>
              <p className="mt-2 text-sm text-gray-400">Service that makes a stressful septic issue easier to manage.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
