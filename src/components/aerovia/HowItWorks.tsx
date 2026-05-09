"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { n: "01", label: "Choose Route", desc: "Select your origin and destination from thousands of available airports." },
  { n: "02", label: "Select Aircraft", desc: "Browse available aircraft categories that match your group size and distance." },
  { n: "03", label: "Set Duration", desc: "Define your travel window — one-way, return, or multi-leg." },
  { n: "04", label: "Confirm Details", desc: "Review your itinerary, passenger manifest, and catering preferences." },
  { n: "05", label: "Pay Securely", desc: "Complete payment via your membership balance or secure card on file." },
  { n: "06", label: "Fly Private", desc: "Arrive at the private terminal. Your aircraft is ready. Time is yours." },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  return (
    <section ref={ref} className="py-32 px-4 lg:px-8" style={{ background: "var(--onyx)" }}>
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="eyebrow mb-4">The Process</p>
          <h2
            className="font-display font-light"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            How it{" "}
            <em style={{ color: "var(--champagne)", fontStyle: "italic" }}>
              works
            </em>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Progress line */}
          <div
            className="absolute top-6 left-0 right-0 h-px hidden lg:block"
            style={{ background: "var(--border)" }}
          />
          <motion.div
            className="absolute top-6 left-0 h-px hidden lg:block origin-left"
            style={{
              background: "var(--champagne)",
              scaleX: scrollYProgress,
              right: 0,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                {/* Marker dot */}
                <div className="relative z-10 mb-6 hidden lg:flex">
                  <div
                    className="w-3 h-3 rounded-full border-2 transition-colors duration-700"
                    style={{
                      background: "var(--onyx)",
                      borderColor: "var(--champagne)",
                      boxShadow: "0 0 8px oklch(0.78 0.06 75 / 40%)",
                    }}
                  />
                </div>

                <p
                  className="font-display font-light mb-2"
                  style={{ fontSize: "2.5rem", color: "oklch(1 0 0 / 6%)" }}
                >
                  {step.n}
                </p>
                <h3
                  className="font-display font-light mb-3"
                  style={{ fontSize: "1.1rem", color: "var(--ivory)" }}
                >
                  {step.label}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "oklch(0.45 0.012 60)" }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
