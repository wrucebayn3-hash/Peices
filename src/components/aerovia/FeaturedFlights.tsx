"use client";
import { motion } from "framer-motion";

const flights = [
  { from: "DXB", to: "RUH", fromCity: "Dubai", toCity: "Riyadh", duration: "1h 45m", class: "Midsize", price: "$4,200" },
  { from: "DXB", to: "LHR", fromCity: "Dubai", toCity: "London", duration: "7h 20m", class: "Heavy", price: "$38,000" },
  { from: "AUH", to: "MLE", fromCity: "Abu Dhabi", toCity: "Malé", duration: "4h 10m", class: "Light", price: "$12,500" },
  { from: "DOH", to: "GVA", fromCity: "Doha", toCity: "Geneva", duration: "6h 30m", class: "Super Midsize", price: "$28,000" },
  { from: "RUH", to: "CDG", fromCity: "Riyadh", toCity: "Paris", duration: "6h 15m", class: "Heavy", price: "$32,500" },
  { from: "DXB", to: "JMK", fromCity: "Dubai", toCity: "Mykonos", duration: "5h 00m", class: "Midsize", price: "$21,000" },
];

export default function FeaturedFlights() {
  return (
    <section id="about" className="py-32 px-4 lg:px-8" style={{ background: "var(--charcoal)" }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="eyebrow mb-4">Popular Routes</p>
          <div className="flex items-end justify-between">
            <h2
              className="font-display font-light"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Featured{" "}
              <em style={{ color: "var(--champagne)", fontStyle: "italic" }}>
                flights
              </em>
            </h2>
            <a
              href="#booking"
              className="hidden lg:flex ghost-cta"
              style={{ alignSelf: "flex-end" }}
            >
              View all routes
            </a>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flights.map((flight, i) => (
            <motion.div
              key={`${flight.from}-${flight.to}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl p-6 cursor-pointer transition-all duration-500"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-card)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "oklch(0.78 0.06 75 / 40%)";
                el.style.boxShadow =
                  "0 0 60px oklch(0.78 0.06 75 / 12%), 0 0 0 1px oklch(0.78 0.06 75 / 40%), var(--shadow-card)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "var(--border)";
                el.style.boxShadow = "var(--shadow-card)";
              }}
            >
              {/* Gold halo from top-right on hover */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.78 0.06 75 / 12%) 0%, transparent 70%)",
                  transform: "translate(25%, -25%)",
                }}
              />

              {/* Route */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span
                    className="font-display font-light"
                    style={{ fontSize: "2rem", color: "var(--ivory)" }}
                  >
                    {flight.from}
                  </span>
                  <span className="text-xs mx-2" style={{ color: "oklch(0.45 0.012 60)" }}>
                    →
                  </span>
                  <span
                    className="font-display font-light"
                    style={{ fontSize: "2rem", color: "var(--champagne)" }}
                  >
                    {flight.to}
                  </span>
                </div>
                <motion.div
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                  style={{
                    border: "1px solid var(--border)",
                    color: "oklch(0.55 0.012 60)",
                  }}
                  whileHover={{ rotate: 12 }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>

              {/* Cities */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs" style={{ color: "oklch(0.45 0.012 60)" }}>
                  {flight.fromCity}
                </span>
                <span className="text-xs" style={{ color: "oklch(0.32 0.012 60)" }}>
                  ·
                </span>
                <span className="text-xs" style={{ color: "oklch(0.45 0.012 60)" }}>
                  {flight.toCity}
                </span>
              </div>

              <div className="hairline mb-4" />

              {/* Details */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="eyebrow">Duration</p>
                  <p className="text-sm font-medium" style={{ color: "var(--ivory)" }}>
                    {flight.duration}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="eyebrow">Class</p>
                  <p className="text-sm font-medium" style={{ color: "var(--ivory)" }}>
                    {flight.class}
                  </p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="eyebrow">From</p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--champagne)" }}
                  >
                    {flight.price}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
