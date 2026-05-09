"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Booking", href: "#booking" },
  { label: "Fleet", href: "#fleet" },
  { label: "About", href: "#about" },
  { label: "Memberships", href: "#memberships" },
  { label: "Destinations", href: "#destinations" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "oklch(0.13 0.008 60 / 85%)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(1 0 0 / 6%)" : "none",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
        {/* Left links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, 3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium tracking-widest uppercase transition-colors duration-300"
              style={{ color: "oklch(0.55 0.012 60)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--champagne)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "oklch(0.55 0.012 60)")
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Brand */}
        <div className="flex-1 lg:flex-none flex justify-center lg:justify-center">
          <a
            href="#"
            className="font-display text-lg font-light tracking-[0.35em] uppercase"
            style={{ color: "var(--ivory)" }}
          >
            AEROVIA
          </a>
        </div>

        {/* Right */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.slice(3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium tracking-widest uppercase transition-colors duration-300"
              style={{ color: "oklch(0.55 0.012 60)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--champagne)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "oklch(0.55 0.012 60)")
              }
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300"
            style={{
              color: "var(--champagne)",
              border: "1px solid oklch(0.78 0.06 75 / 30%)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "oklch(0.78 0.06 75 / 10%)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Contact
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="lg:hidden p-2" style={{ color: "var(--ivory)" }}>
          <div className="w-5 h-px mb-1.5" style={{ background: "currentColor" }} />
          <div className="w-3 h-px" style={{ background: "currentColor" }} />
        </button>
      </div>
    </motion.nav>
  );
}
