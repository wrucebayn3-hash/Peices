"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const destinations = [
  { code: "DXB", city: "Dubai", region: "UAE" },
  { code: "LHR", city: "London Heathrow", region: "UK" },
  { code: "RUH", city: "Riyadh", region: "Saudi Arabia" },
  { code: "GVA", city: "Geneva", region: "Switzerland" },
  { code: "LBG", city: "Le Bourget", region: "France" },
  { code: "JMK", city: "Mykonos", region: "Greece" },
  { code: "TEB", city: "Teterboro", region: "USA" },
  { code: "SIN", city: "Singapore", region: "Singapore" },
  { code: "DOH", city: "Doha", region: "Qatar" },
  { code: "MLE", city: "Malé", region: "Maldives" },
];

export default function Destinations() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const globeScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.1]);
  const globeRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section
      id="destinations"
      ref={ref}
      className="py-32 px-4 lg:px-8 grain overflow-hidden"
      style={{ background: "var(--charcoal)" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12"
            >
              <p className="eyebrow mb-4">Destinations</p>
              <h2
                className="font-display font-light"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                Fly{" "}
                <em style={{ color: "var(--champagne)", fontStyle: "italic" }}>
                  anywhere,
                </em>
                <br />
                land everywhere.
              </h2>
            </motion.div>

            {/* Destination list */}
            <div className="space-y-0">
              {destinations.map((dest, i) => (
                <motion.div
                  key={dest.code}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-center justify-between py-3 cursor-pointer"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="font-display font-light w-12 text-sm"
                      style={{ color: "var(--champagne)" }}
                    >
                      {dest.code}
                    </span>
                    <span className="text-sm" style={{ color: "oklch(0.6 0.012 60)" }}>
                      {dest.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: "oklch(0.4 0.012 60)" }}>
                      {dest.region}
                    </span>
                    <div
                      className="w-0 group-hover:w-8 h-px transition-all duration-400 origin-left"
                      style={{ background: "var(--champagne)" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: globe */}
          <div className="order-1 lg:order-2 relative flex items-center justify-center">
            {/* Background "Global" word */}
            <div
              className="absolute font-display font-light select-none pointer-events-none"
              style={{
                fontSize: "clamp(8rem, 22vw, 22rem)",
                color: "oklch(0.96 0.012 85 / 4%)",
                letterSpacing: "-0.05em",
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              Global
            </div>

            {/* Globe visual */}
            <motion.div
              style={{ scale: globeScale, rotate: globeRotate }}
              className="relative z-10"
            >
              <div
                className="rounded-full"
                style={{
                  width: "clamp(240px, 35vw, 440px)",
                  height: "clamp(240px, 35vw, 440px)",
                  background:
                    "radial-gradient(circle at 35% 35%, oklch(0.28 0.02 220), oklch(0.12 0.01 220) 60%, oklch(0.08 0.005 220) 100%)",
                  boxShadow:
                    "inset -20px -20px 60px oklch(0 0 0 / 50%), 0 0 80px oklch(0.28 0.02 220 / 20%), var(--shadow-card)",
                  border: "1px solid oklch(0.78 0.06 75 / 10%)",
                }}
              >
                {/* Arc lines */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 440 440"
                  fill="none"
                >
                  {/* Longitude lines */}
                  {[0, 30, 60, 90, 120, 150].map((angle) => (
                    <ellipse
                      key={angle}
                      cx="220"
                      cy="220"
                      rx={Math.abs(Math.cos((angle * Math.PI) / 180)) * 210}
                      ry="210"
                      stroke="oklch(0.78 0.06 75 / 8%)"
                      strokeWidth="0.5"
                      fill="none"
                    />
                  ))}
                  {/* Latitude lines */}
                  {[-120, -60, 0, 60, 120].map((y) => (
                    <ellipse
                      key={y}
                      cx="220"
                      cy={220 + y}
                      rx={Math.sqrt(Math.max(0, 210 * 210 - y * y))}
                      ry={Math.sqrt(Math.max(0, 210 * 210 - y * y)) * 0.25}
                      stroke="oklch(0.78 0.06 75 / 6%)"
                      strokeWidth="0.5"
                      fill="none"
                    />
                  ))}
                  {/* Route arcs */}
                  <path
                    d="M 160 180 Q 220 140 280 190"
                    stroke="oklch(0.78 0.06 75 / 40%)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="4 4"
                  />
                  <path
                    d="M 200 260 Q 260 200 320 240"
                    stroke="oklch(0.78 0.06 75 / 30%)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="4 4"
                  />
                  <path
                    d="M 140 220 Q 200 170 260 210"
                    stroke="oklch(0.78 0.06 75 / 25%)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="3 5"
                  />
                  {/* Destination dots */}
                  {[
                    [265, 195], [155, 165], [270, 220],
                    [190, 175], [180, 165], [200, 200],
                    [135, 185], [310, 235], [255, 210], [295, 255],
                  ].map(([x, y], i) => (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="3"
                      fill="var(--champagne)"
                      opacity="0.7"
                    />
                  ))}
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
