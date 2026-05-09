"use client";
import { motion } from "framer-motion";

const fields = [
  { label: "From", placeholder: "DXB — Dubai" },
  { label: "To", placeholder: "LHR — London" },
  { label: "Departure", placeholder: "Date" },
  { label: "Return", placeholder: "Date" },
  { label: "Aircraft", placeholder: "Any class" },
  { label: "Duration", placeholder: "Hours" },
  { label: "Passengers", placeholder: "1–14" },
];

export default function Booking() {
  return (
    <section id="booking" className="relative z-20 px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1400px] mx-auto glass rounded-2xl p-6 lg:p-8 -mt-16"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="eyebrow mb-1">Quick Booking</p>
            <h2
              className="font-display font-light"
              style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", color: "var(--ivory)" }}
            >
              Find your flight
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full animate-pulse-dot"
              style={{ background: "var(--champagne)" }}
            />
            <span className="eyebrow" style={{ color: "var(--champagne)" }}>
              14 aircraft available
            </span>
          </div>
        </div>

        {/* Fields grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-5">
          {fields.map((field) => (
            <div
              key={field.label}
              className="group relative rounded-xl p-3 transition-colors duration-300 cursor-text"
              style={{
                background: "oklch(0.13 0.008 60 / 60%)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "var(--secondary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "oklch(0.13 0.008 60 / 60%)";
              }}
            >
              <p
                className="text-xs mb-1 font-medium tracking-wide"
                style={{ color: "oklch(0.45 0.012 60)" }}
              >
                {field.label}
              </p>
              <p className="text-sm" style={{ color: "var(--ivory)" }}>
                {field.placeholder}
              </p>
              <div
                className="absolute bottom-0 left-3 right-3 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ background: "var(--champagne)", transformOrigin: "left" }}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-end">
          <button className="pill-cta">
            <span className="pill-cta-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            Search Flights
          </button>
        </div>
      </motion.div>
    </section>
  );
}
