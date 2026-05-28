import { useState } from 'react';

const faqs = [
  { q: 'How often should I pump my septic tank?', a: 'Every 3-5 years depending on usage.' },
  { q: 'Do you offer emergency services?', a: 'Yes, 24/7 emergency services are available.' },
  { q: 'What is an aerobic system?', a: 'An aerobic system treats wastewater using oxygen to break down waste.' }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-3xl mx-auto py-20">
      {faqs.map((item, i) => (
        <div key={i} className="mb-4 border border-gray-700 rounded-lg overflow-hidden">
          <button
            className="w-full text-left p-4 bg-neutral-900 text-gray-200 font-semibold hover:bg-neutral-800 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {item.q}
          </button>
          {openIndex === i && (
            <div className="p-4 bg-neutral-800 text-gray-300">{item.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}
