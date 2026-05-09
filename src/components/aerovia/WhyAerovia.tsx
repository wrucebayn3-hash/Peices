"use client";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: "✦",
    title: "Book as You Go",
    body: "No long-term commitments. Reserve a flight whenever you need it, with pricing locked at the time of booking.",
  },
  {
    icon: "◈",
    title: "Flexible Memberships",
    body: "Short-term plans from one month onward. Pause, upgrade, or cancel with no penalty.",
  },
  {
    icon: "◉",
    title: "Global Access",
    body: "Access to 10,000+ airports worldwide. From private island strips to major international hubs.",
  },
  {
    icon: "◎",
    title: "Concierge-Level Service",
    body: "Your dedicated flight specialist handles every detail — from catering to ground transport.",
  },
];

export default function WhyAerovia() {
  return (
    <section className="py-32 px-4 lg:px-8 grain" style={{ background: "var(--onyx)" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12"
            >
              <p className="eyebrow mb-4">Why AEROVIA</p>
              <h2
                className="font-display font-light"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                Aviation that adapts{" "}
                <em style={{ color: "var(--champagne)", fontStyle: "italic" }}>
                  to you
                </em>
              </h2>
            </motion.div>

            <div className="space-y-1">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex gap-5 p-5 rounded-xl transition-all duration-400"
                  style={{ border: "1px solid transparent" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.background = "var(--card)";
                    el.style.borderColor = "var(--border)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.background = "transparent";
                    el.style.borderColor = "transparent";
                  }}
                >
                  <span
                    className="text-xl flex-shrink-0 mt-0.5"
                    style={{ color: "var(--champagne)" }}
                  >
                    {b.icon}
                  </span>
                  <div>
                    <h3
                      className="font-display font-light mb-2"
                      style={{ fontSize: "1.25rem", color: "var(--ivory)" }}
                    >
                      {b.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "oklch(0.5 0.012 60)" }}>
                      {b.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: cabin visual panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              height: "clamp(400px, 50vw, 600px)",
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Cabin interior simulation */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.20 0.015 55) 0%, oklch(0.14 0.01 55) 50%, oklch(0.22 0.018 60) 100%)",
              }}
            />

            {/* Window row simulation */}
            <div className="absolute inset-x-0 top-12 flex justify-center gap-8 px-8">
              {[0, 1, 2].map((w) => (
                <div
                  key={w}
                  className="relative overflow-hidden flex-1 max-w-[80px]"
                  style={{
                    height: "110px",
                    borderRadius: "40% 40% 50% 50% / 30% 30% 70% 70%",
                    background: "oklch(0.45 0.03 200 / 30%)",
                    border: "1px solid oklch(0.78 0.06 75 / 15%)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, oklch(0.7 0.03 210 / 20%) 0%, transparent 100%)",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Seat/interior line art */}
            <div
              className="absolute bottom-0 inset-x-0 h-40"
              style={{
                background:
                  "linear-gradient(to top, oklch(0.18 0.012 55) 0%, transparent 100%)",
              }}
            />

            {/* Text overlay */}
            <div className="absolute bottom-8 left-8 right-8">
              <p
                className="font-display italic text-3xl mb-2"
                style={{ color: "var(--champagne)" }}
              >
                The cabin, reimagined.
              </p>
              <p className="text-xs" style={{ color: "oklch(0.45 0.012 60)" }}>
                Every seat is a private suite at 45,000 feet.
              </p>
            </div>

            {/* Grain */}
            <div className="absolute inset-0 grain" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
