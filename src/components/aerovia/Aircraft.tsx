"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const aircraft = [
  {
    category: "Light",
    model: "Citation CJ4 / Phenom 300",
    tagline: "Agility without compromise.",
    description:
      "Purpose-built for short regional hops and spontaneous city-pairs. The Light category gives you the speed of a jet with the flexibility of a prop-free experience.",
    specs: [
      { label: "Max Range", value: "2,200 nm" },
      { label: "Cruise Speed", value: "451 kts" },
      { label: "Passengers", value: "Up to 7" },
      { label: "Endurance", value: "5.2 hrs" },
      { label: "Baggage", value: "60 cu ft" },
      { label: "Altitude", value: "45,000 ft" },
    ],
  },
  {
    category: "Midsize",
    model: "Hawker 800XP / Citation XLS",
    tagline: "The balance of performance and comfort.",
    description:
      "With a stand-up cabin and transatlantic range, the Midsize class is the workhorse of private aviation — trusted for business missions and leisure escapes alike.",
    specs: [
      { label: "Max Range", value: "3,000 nm" },
      { label: "Cruise Speed", value: "462 kts" },
      { label: "Passengers", value: "Up to 9" },
      { label: "Endurance", value: "6.5 hrs" },
      { label: "Baggage", value: "95 cu ft" },
      { label: "Altitude", value: "45,000 ft" },
    ],
  },
  {
    category: "Super Midsize",
    model: "Challenger 350 / Citation Longitude",
    tagline: "Transcontinental. Uncompromised.",
    description:
      "Stretching the definition of midsize, the Super Midsize class features a wider cabin, longer range, and full amenities — connecting continents without a fuel stop.",
    specs: [
      { label: "Max Range", value: "3,900 nm" },
      { label: "Cruise Speed", value: "476 kts" },
      { label: "Passengers", value: "Up to 10" },
      { label: "Endurance", value: "8.2 hrs" },
      { label: "Baggage", value: "106 cu ft" },
      { label: "Altitude", value: "45,000 ft" },
    ],
  },
  {
    category: "Heavy",
    model: "Gulfstream G450 / Falcon 7X",
    tagline: "Full cabin. Full world.",
    description:
      "Built for long-haul routes in boardroom-level comfort. The Heavy class features stand-up cabins, dedicated crew quarters, and the ability to connect the Gulf to Europe nonstop.",
    specs: [
      { label: "Max Range", value: "5,200 nm" },
      { label: "Cruise Speed", value: "488 kts" },
      { label: "Passengers", value: "Up to 14" },
      { label: "Endurance", value: "11.0 hrs" },
      { label: "Baggage", value: "169 cu ft" },
      { label: "Altitude", value: "51,000 ft" },
    ],
  },
  {
    category: "Ultra Long Range",
    model: "Gulfstream G700 / Global 7500",
    tagline: "Anywhere. Nonstop.",
    description:
      "The pinnacle of private aviation. Ultra Long Range jets cross oceans and hemispheres without compromise — featuring full suites, sleeping berths, and global nonstop capability.",
    specs: [
      { label: "Max Range", value: "7,700 nm" },
      { label: "Cruise Speed", value: "516 kts" },
      { label: "Passengers", value: "Up to 19" },
      { label: "Endurance", value: "16.5 hrs" },
      { label: "Baggage", value: "195 cu ft" },
      { label: "Altitude", value: "51,000 ft" },
    ],
  },
];

// SVG airplane silhouettes for each category (side-view line art)
function AircraftSilhouette({ index, active }: { index: number; active: boolean }) {
  const silhouettes = [
    // Light - small jet
    <svg key="light" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g opacity={active ? 1 : 0.3} style={{ transition: "opacity 0.8s ease" }}>
        {/* Fuselage */}
        <ellipse cx="380" cy="158" rx="260" ry="28" fill="oklch(0.22 0.015 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        {/* Nose */}
        <path d="M640 145 Q720 158 640 171" fill="oklch(0.26 0.018 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        {/* Tail */}
        <path d="M120 145 L80 158 L120 171" fill="oklch(0.26 0.018 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        {/* Main wing */}
        <path d="M350 158 L280 240 L200 242 L280 158" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 50%)" strokeWidth="1"/>
        <path d="M350 158 L280 76 L200 74 L280 158" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 50%)" strokeWidth="1"/>
        {/* Horizontal stab */}
        <path d="M155 158 L120 192 L90 193 L120 158" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        <path d="M155 158 L120 124 L90 123 L120 158" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        {/* Vertical tail */}
        <path d="M140 146 L140 95 Q155 85 170 95 L170 146" fill="oklch(0.24 0.016 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        {/* Windows */}
        {[480, 510, 540, 570, 600].map((x) => (
          <ellipse key={x} cx={x} cy="148" rx="10" ry="7" fill="oklch(0.45 0.03 200 / 25%)" stroke="oklch(0.78 0.06 75 / 20%)" strokeWidth="0.5"/>
        ))}
        {/* Engine */}
        <ellipse cx="300" cy="195" rx="28" ry="10" fill="oklch(0.18 0.012 55)" stroke="oklch(0.78 0.06 75 / 30%)" strokeWidth="1"/>
      </g>
    </svg>,
    // Midsize
    <svg key="midsize" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g opacity={active ? 1 : 0.3} style={{ transition: "opacity 0.8s ease" }}>
        <ellipse cx="380" cy="158" rx="280" ry="32" fill="oklch(0.22 0.015 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        <path d="M660 140 Q750 158 660 176" fill="oklch(0.26 0.018 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        <path d="M100 140 L60 158 L100 176" fill="oklch(0.26 0.018 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        <path d="M370 158 L290 252 L195 255 L290 158" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 50%)" strokeWidth="1"/>
        <path d="M370 158 L290 64 L195 61 L290 158" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 50%)" strokeWidth="1"/>
        <path d="M145 158 L100 198 L65 200 L100 158" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        <path d="M145 158 L100 118 L65 116 L100 158" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        <path d="M125 138 L125 80 Q145 68 165 80 L165 138" fill="oklch(0.24 0.016 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        {[460, 495, 530, 565, 600, 630].map((x) => (
          <ellipse key={x} cx={x} cy="148" rx="11" ry="8" fill="oklch(0.45 0.03 200 / 25%)" stroke="oklch(0.78 0.06 75 / 20%)" strokeWidth="0.5"/>
        ))}
        <ellipse cx="295" cy="205" rx="32" ry="12" fill="oklch(0.18 0.012 55)" stroke="oklch(0.78 0.06 75 / 30%)" strokeWidth="1"/>
      </g>
    </svg>,
    // Super Midsize
    <svg key="super" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g opacity={active ? 1 : 0.3} style={{ transition: "opacity 0.8s ease" }}>
        <ellipse cx="390" cy="158" rx="290" ry="35" fill="oklch(0.22 0.015 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        <path d="M680 136 Q775 158 680 180" fill="oklch(0.26 0.018 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        <path d="M100 136 L55 158 L100 180" fill="oklch(0.26 0.018 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        <path d="M385 158 L300 260 L195 264 L295 158" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 50%)" strokeWidth="1"/>
        <path d="M385 158 L300 56 L195 52 L295 158" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 50%)" strokeWidth="1"/>
        <path d="M140 158 L95 205 L58 208 L95 158" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        <path d="M140 158 L95 111 L58 108 L95 158" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        <path d="M118 134 L118 70 Q142 56 166 70 L166 134" fill="oklch(0.24 0.016 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        {[450, 490, 530, 570, 610, 645, 672].map((x) => (
          <ellipse key={x} cx={x} cy="146" rx="11" ry="9" fill="oklch(0.45 0.03 200 / 25%)" stroke="oklch(0.78 0.06 75 / 20%)" strokeWidth="0.5"/>
        ))}
        <ellipse cx="305" cy="212" rx="34" ry="13" fill="oklch(0.18 0.012 55)" stroke="oklch(0.78 0.06 75 / 30%)" strokeWidth="1"/>
        <ellipse cx="340" cy="210" rx="30" ry="11" fill="oklch(0.18 0.012 55)" stroke="oklch(0.78 0.06 75 / 25%)" strokeWidth="1"/>
      </g>
    </svg>,
    // Heavy
    <svg key="heavy" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g opacity={active ? 1 : 0.3} style={{ transition: "opacity 0.8s ease" }}>
        <ellipse cx="390" cy="160" rx="300" ry="38" fill="oklch(0.22 0.015 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        <path d="M690 132 Q790 160 690 188" fill="oklch(0.26 0.018 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        <path d="M90 132 L44 160 L90 188" fill="oklch(0.26 0.018 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        <path d="M390 160 L300 270 L180 274 L290 160" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 50%)" strokeWidth="1"/>
        <path d="M390 160 L300 50 L180 46 L290 160" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 50%)" strokeWidth="1"/>
        <path d="M130 160 L82 212 L44 215 L82 160" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        <path d="M130 160 L82 108 L44 105 L82 160" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        <path d="M105 128 L105 60 Q132 44 160 60 L160 128" fill="oklch(0.24 0.016 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1"/>
        {[430, 470, 512, 554, 596, 633, 665, 688].map((x) => (
          <ellipse key={x} cx={x} cy="148" rx="12" ry="10" fill="oklch(0.45 0.03 200 / 25%)" stroke="oklch(0.78 0.06 75 / 20%)" strokeWidth="0.5"/>
        ))}
        <ellipse cx="300" cy="220" rx="36" ry="14" fill="oklch(0.18 0.012 55)" stroke="oklch(0.78 0.06 75 / 30%)" strokeWidth="1"/>
        <ellipse cx="340" cy="218" rx="32" ry="13" fill="oklch(0.18 0.012 55)" stroke="oklch(0.78 0.06 75 / 25%)" strokeWidth="1"/>
      </g>
    </svg>,
    // Ultra Long Range
    <svg key="ulr" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g opacity={active ? 1 : 0.3} style={{ transition: "opacity 0.8s ease" }}>
        <ellipse cx="390" cy="160" rx="310" ry="40" fill="oklch(0.22 0.015 55)" stroke="oklch(0.78 0.06 75 / 45%)" strokeWidth="1.5"/>
        <path d="M700 128 Q800 160 700 192" fill="oklch(0.26 0.018 55)" stroke="oklch(0.78 0.06 75 / 45%)" strokeWidth="1.5"/>
        <path d="M80 128 L30 160 L80 192" fill="oklch(0.26 0.018 55)" stroke="oklch(0.78 0.06 75 / 45%)" strokeWidth="1.5"/>
        <path d="M400 160 L305 278 L168 282 L288 160" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 55%)" strokeWidth="1.5"/>
        <path d="M400 160 L305 42 L168 38 L288 160" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 55%)" strokeWidth="1.5"/>
        <path d="M120 160 L68 218 L28 222 L68 160" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1.5"/>
        <path d="M120 160 L68 102 L28 98 L68 160" fill="oklch(0.20 0.014 55)" stroke="oklch(0.78 0.06 75 / 40%)" strokeWidth="1.5"/>
        <path d="M95 120 L95 44 Q128 26 160 44 L160 120" fill="oklch(0.24 0.016 55)" stroke="oklch(0.78 0.06 75 / 45%)" strokeWidth="1.5"/>
        {[400, 440, 482, 524, 566, 604, 638, 668, 692, 710].map((x) => (
          <ellipse key={x} cx={x} cy="146" rx="12" ry="10" fill="oklch(0.45 0.03 200 / 30%)" stroke="oklch(0.78 0.06 75 / 25%)" strokeWidth="0.5"/>
        ))}
        <ellipse cx="292" cy="224" rx="38" ry="15" fill="oklch(0.18 0.012 55)" stroke="oklch(0.78 0.06 75 / 35%)" strokeWidth="1"/>
        <ellipse cx="332" cy="222" rx="34" ry="13" fill="oklch(0.18 0.012 55)" stroke="oklch(0.78 0.06 75 / 30%)" strokeWidth="1"/>
        {/* Champagne glow on ULR active */}
        {active && (
          <ellipse cx="390" cy="160" rx="310" ry="40" fill="none" stroke="oklch(0.78 0.06 75 / 20%)" strokeWidth="2">
            <animate attributeName="stroke-opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite"/>
          </ellipse>
        )}
      </g>
    </svg>,
  ];
  return silhouettes[index] || silhouettes[0];
}

export default function Aircraft() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Each aircraft occupies 20% of scroll
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        aircraft.length - 1,
        Math.floor(v * aircraft.length)
      );
      setActiveIndex(idx);
    });
    return unsub;
  }, [scrollYProgress]);

  // Visual parallax transforms
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const visualScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 0.98]);


  return (
    <section
      id="fleet"
      ref={sectionRef}
      className="relative grain"
      style={{
        height: `${aircraft.length * 100}vh`,
        background: "var(--onyx)",
      }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background ambient glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 60%, oklch(0.32 0.025 55 / 20%) 0%, transparent 60%)",
            }}
          />
        </motion.div>

        <div className="relative w-full max-w-[1400px] mx-auto px-6 lg:px-12 h-full flex items-center">
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-16 w-full items-center">

            {/* Left: Text content */}
            <div className="relative flex flex-col justify-center">
              {/* Eyebrow */}
              <motion.p
                className="eyebrow mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                The Fleet
              </motion.p>

              {/* Category title */}
              <div className="relative overflow-hidden mb-3" style={{ height: "clamp(3rem, 6vw, 6rem)" }}>
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={activeIndex}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display font-light absolute"
                    style={{
                      fontSize: "clamp(3rem, 6vw, 6rem)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      color: "var(--ivory)",
                    }}
                  >
                    {aircraft[activeIndex].category}
                  </motion.h2>
                </AnimatePresence>
              </div>

              {/* Model label */}
              <div className="relative overflow-hidden mb-6" style={{ height: "1.5rem" }}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`model-${activeIndex}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                    className="font-display italic absolute"
                    style={{ fontSize: "0.95rem", color: "var(--champagne)" }}
                  >
                    {aircraft[activeIndex].model}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Tagline */}
              <div className="relative overflow-hidden mb-5" style={{ height: "2rem" }}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`tag-${activeIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="absolute text-sm font-medium tracking-wide"
                    style={{ color: "oklch(0.65 0.025 60)" }}
                  >
                    {aircraft[activeIndex].tagline}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Hairline */}
              <div className="hairline mb-5" />

              {/* Description */}
              <div className="relative overflow-hidden mb-8" style={{ minHeight: "5rem" }}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`desc-${activeIndex}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                    className="absolute text-sm leading-relaxed"
                    style={{ color: "oklch(0.5 0.012 60)" }}
                  >
                    {aircraft[activeIndex].description}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Specs grid */}
              <div className="mt-12 grid grid-cols-3 gap-x-6 gap-y-4">
                {aircraft[activeIndex].specs.map((spec, i) => (
                  <AnimatePresence key={`${activeIndex}-${spec.label}`} mode="wait">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.15 + i * 0.05,
                      }}
                    >
                      <p className="eyebrow mb-1">{spec.label}</p>
                      <p
                        className="font-display font-light text-base"
                        style={{ color: "var(--ivory)" }}
                      >
                        {spec.value}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8">
                <a href="#booking" className="ghost-cta" style={{ display: "inline-flex" }}>
                  Book this class
                </a>
              </div>
            </div>

            {/* Center vertical progress indicator */}
            <div className="hidden lg:flex flex-col items-center gap-3 py-8">
              <div className="hairline-v flex-1" style={{ minHeight: "40px" }} />
              {aircraft.map((a, i) => (
                <div key={a.category} className="flex flex-col items-center gap-2">
                  <button
                    className="group flex items-center gap-3 transition-all duration-500"
                    onClick={() => {
                      if (sectionRef.current) {
                        const sectionTop = sectionRef.current.offsetTop;
                        const sectionHeight = sectionRef.current.offsetHeight;
                        const targetY =
                          sectionTop + (i / aircraft.length) * sectionHeight + 10;
                        window.scrollTo({ top: targetY, behavior: "smooth" });
                      }
                    }}
                  >
                    <div
                      className="transition-all duration-500"
                      style={{
                        width: i === activeIndex ? "24px" : "8px",
                        height: "1px",
                        background: i === activeIndex ? "var(--champagne)" : "oklch(0.35 0.012 60)",
                      }}
                    />
                    <span
                      className="text-xs font-medium tracking-widest uppercase transition-all duration-500"
                      style={{
                        color: i === activeIndex ? "var(--champagne)" : "oklch(0.35 0.012 60)",
                        fontSize: "0.6rem",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>
                  {i < aircraft.length - 1 && (
                    <div
                      className="w-px transition-all duration-700"
                      style={{
                        height: "20px",
                        background:
                          i < activeIndex
                            ? "var(--champagne)"
                            : "oklch(0.25 0.012 60)",
                      }}
                    />
                  )}
                </div>
              ))}
              <div className="hairline-v flex-1" style={{ minHeight: "40px" }} />
            </div>

            {/* Right: Aircraft visual */}
            <motion.div
              className="relative flex items-center justify-center"
              style={{ y: visualY, scale: visualScale }}
            >
              {/* Blueprint grid background */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, oklch(1 0 0 / 2%) 0px, oklch(1 0 0 / 2%) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, oklch(1 0 0 / 2%) 0px, oklch(1 0 0 / 2%) 1px, transparent 1px, transparent 40px)",
                }}
              />

              {/* Champagne radial glow */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, oklch(0.78 0.06 75 / 6%) 0%, transparent 70%)",
                }}
              />

              {/* Aircraft silhouette display */}
              <div
                className="relative w-full"
                style={{
                  aspectRatio: "8/3",
                  maxWidth: "500px",
                  minWidth: "280px",
                }}
              >
                {aircraft.map((a, i) => (
                  <div
                    key={a.category}
                    className="absolute inset-0 transition-all duration-700"
                    style={{
                      opacity: i === activeIndex ? 1 : 0,
                      transform: i === activeIndex ? "scale(1) translateY(0)" : "scale(0.95) translateY(8px)",
                    }}
                  >
                    <AircraftSilhouette index={i} active={i === activeIndex} />
                  </div>
                ))}
              </div>

              {/* Index counter */}
              <div
                className="absolute bottom-4 right-4 font-display font-light"
                style={{
                  fontSize: "4rem",
                  lineHeight: 1,
                  color: "oklch(1 0 0 / 4%)",
                  userSelect: "none",
                }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </div>

              {/* Technical label */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`label-${activeIndex}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-4 left-4"
                >
                  <p className="eyebrow" style={{ color: "var(--champagne)" }}>
                    {aircraft[activeIndex].category} Class
                  </p>
                  <p className="text-xs mt-1" style={{ color: "oklch(0.35 0.012 60)" }}>
                    {aircraft[activeIndex].model}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Bottom hairline */}
        <div className="absolute bottom-0 inset-x-0 hairline" />
      </div>
    </section>
  );
}
