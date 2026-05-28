import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import AccountMenu from "./AccountMenu";
import { useAuth } from "../context/AuthContext";

function CartIcon() {
  const [count, setCount] = useState(() => {
    try {
      return (JSON.parse(localStorage.getItem("bpj_cart") || "[]") || []).length;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    const update = () => {
      try {
        setCount((JSON.parse(localStorage.getItem("bpj_cart") || "[]") || []).length);
      } catch {
        setCount(0);
      }
    };
    const onStorage = (e) => e.key === "bpj_cart" && update();

    window.addEventListener("storage", onStorage);
    window.addEventListener("bpj_cart_update", update);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("bpj_cart_update", update);
    };
  }, []);

  return (
    <Link to="/cart" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 hover:bg-white/20" title="View cart">
      <FaShoppingCart />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-5 rounded-full bg-emerald-500 px-1.5 py-0.5 text-center text-xs font-bold text-black">
          {count}
        </span>
      )}
    </Link>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { name: "Services", to: "/services" },
    { name: "About", to: "/about" },
    { name: "FAQ", to: "/faq" },
    { name: "Marketplace", to: "/marketplace" },
    { name: "Payments", to: "/payments" },
    { name: "Contact", to: "/contact" },
  ];

  const navLink = (link) => {
    const active = pathname === link.to;
    return (
      <Link
        key={link.to}
        to={link.to}
        className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
          active ? "bg-emerald-500 text-black" : "text-white/85 hover:bg-white/10 hover:text-white"
        }`}
      >
        {link.name}
      </Link>
    );
  };

  return (
    <header className={`fixed left-0 top-0 z-50 w-full transition ${scrolled || open ? "bg-zinc-950/95 shadow-lg backdrop-blur" : "bg-gradient-to-b from-black/85 to-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src="/New_logo.png" alt="Big Papa Joe Septic" className="h-14 w-auto" />
          <div className="hidden sm:block">
            <div className="text-sm font-bold leading-tight text-white">Big Papa Joe Septic</div>
            <div className="text-xs text-emerald-300">Aerobic and septic specialists</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(navLink)}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:2812520777" className="rounded-md border border-amber-400/40 px-3 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-400/10">
            281-252-0777
          </a>
          <CartIcon />
          {!user ? (
            <Link to="/signin" className="text-sm font-semibold text-white/85 hover:text-white">Sign In</Link>
          ) : (
            <AccountMenu />
          )}
          <Link to="/contact" className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-bold text-black hover:bg-emerald-400">
            Get a Quote
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/10 lg:hidden"
          aria-label="Open navigation"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-zinc-950 px-4 py-4 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2">
            {links.map(navLink)}
            <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
              <a href="tel:2812520777" className="rounded-md border border-amber-400/40 px-3 py-2 text-sm font-semibold text-amber-200">
                281-252-0777
              </a>
              <CartIcon />
              {!user ? (
                <>
                  <Link to="/signin" className="rounded-md px-3 py-2 text-sm font-semibold text-white/85">Sign In</Link>
                  <Link to="/signup" className="rounded-md px-3 py-2 text-sm font-semibold text-white/85">Sign Up</Link>
                </>
              ) : (
                <AccountMenu />
              )}
              <Link to="/contact" className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-bold text-black">
                Get a Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
