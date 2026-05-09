import { motion } from "framer-motion";

const platformLinks = ["Booking", "Fleet", "Memberships", "Destinations", "About"];
const conciergeLinks = ["concierge@aerovia.jet", "+971 54 432 5050"];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="py-20 px-4 lg:px-8"
      style={{ background: "var(--charcoal)", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p
              className="font-display font-light tracking-[0.35em] uppercase text-lg mb-3"
              style={{ color: "var(--ivory)" }}
            >
              AEROVIA
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "oklch(0.45 0.012 60)" }}>
              Private aviation, booked on your terms.
            </p>
          </div>

          {/* Platform */}
          <div>
            <p className="eyebrow mb-5">Platform</p>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm transition-colors duration-300"
                    style={{ color: "oklch(0.45 0.012 60)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--champagne)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "oklch(0.45 0.012 60)")
                    }
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Concierge */}
          <div>
            <p className="eyebrow mb-5">Concierge</p>
            <ul className="space-y-3">
              {conciergeLinks.map((link) => (
                <li key={link}>
                  <a
                    href={link.includes("@") ? `mailto:${link}` : `tel:${link.replace(/\s/g, "")}`}
                    className="text-sm transition-colors duration-300"
                    style={{ color: "oklch(0.45 0.012 60)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--champagne)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "oklch(0.45 0.012 60)")
                    }
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="eyebrow mb-5">Follow</p>
            <div className="flex gap-3">
              {["Instagram", "LinkedIn", "X"].map((s) => (
                <div
                  key={s}
                  className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
                  style={{ border: "1px solid var(--border)", color: "oklch(0.45 0.012 60)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--champagne)";
                    (e.currentTarget as HTMLDivElement).style.color = "var(--champagne)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLDivElement).style.color = "oklch(0.45 0.012 60)";
                  }}
                >
                  <span className="text-xs font-medium">{s[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hairline mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "oklch(0.35 0.012 60)" }}>
            © 2025 AEROVIA. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "oklch(0.35 0.012 60)" }}>
            Private Aviation Platform
          </p>
        </div>
      </div>
    </footer>
  );
}
