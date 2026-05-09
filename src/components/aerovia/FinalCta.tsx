"use client";
import { motion } from "framer-motion";

export default function FinalCta() {
  return (
    <section
      className="relative py-40 px-4 lg:px-8 flex items-center justify-center text-center grain overflow-hidden"
      style={{ background: "var(--onyx)" }}
    >
      {/* Champagne radial glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, oklch(0.78 0.06 75 / 15%) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow mb-8"
        >
          Ready to fly
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="font-display font-light mb-12"
          style={{
            fontSize: "clamp(3rem, 7vw, 7rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
          }}
        >
          Your next flight,
          <br />
          <em style={{ color: "var(--champagne)", fontStyle: "italic" }}>
            already within reach.
          </em>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#booking" className="pill-cta">
            <span className="pill-cta-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
            Book Your Flight
          </a>
          <a href="#memberships" className="ghost-cta">
            View Memberships
          </a>
        </motion.div>
      </div>
    </section>
  );
}
