import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 bg-zinc-950 text-gray-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <img src="/New_logo.png" alt="Big Papa Joe Septic" className="mb-4 w-32" />
          <p className="max-w-xs text-sm leading-relaxed">
            Local septic and aerobic system service with clean work, clear communication, and dependable emergency response.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-white">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-emerald-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-emerald-400">About</Link></li>
            <li><Link to="/services" className="hover:text-emerald-400">Services</Link></li>
            <li><Link to="/faq" className="hover:text-emerald-400">FAQ</Link></li>
            <li><Link to="/marketplace" className="hover:text-emerald-400">Marketplace</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-white">Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-emerald-400">Request a Quote</Link></li>
            <li><Link to="/payments" className="hover:text-emerald-400">Make a Payment</Link></li>
            <li><a href="tel:2812520777" className="hover:text-emerald-400">Emergency Service</a></li>
            <li><Link to="/signup" className="hover:text-emerald-400">Customer Portal</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-white">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><FaMapMarkerAlt className="mt-0.5 text-emerald-400" /> P.O. Box 111, Pinehurst, TX 77362</li>
            <li className="flex gap-2"><FaPhoneAlt className="mt-0.5 text-emerald-400" /> <a href="tel:2812520777">281-252-0777</a></li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 hover:text-emerald-400"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 hover:text-emerald-400"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-sm text-gray-500">
        Copyright {new Date().getFullYear()} Big Papa Joe Septic. All rights reserved.
      </div>
    </footer>
  );
}
