"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_VIDEO =
  "https://res.cloudinary.com/dzysg1qtx/video/upload/v1778314486/Clods_moving_in_window_view_202605091212_lgynmq.mp4";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rightX = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const windowScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const windowOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grain"
      style={{ background: "var(--onyx)" }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-radial-warm)" }}
      />

      {/* Central airplane window */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ scale: windowScale, opacity: windowOpacity }}
        className="relative z-10 flex-shrink-0"
      >
        {/* Window frame */}
        <div
          className="relative overflow-hidden"
          style={{
            width: "clamp(260px, 28vw, 420px)",
            height: "clamp(340px, 38vw, 560px)",
            borderRadius: "50% 50% 48% 48% / 40% 40% 60% 60%",
            boxShadow:
              "0 0 0 8px oklch(0.22 0.015 55), 0 0 0 12px oklch(0.16 0.01 55), var(--shadow-card)",
          }}
        >
          {/* Video */}
          <video
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover animate-sky-pan"
          />

          {/* Vignette overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "var(--gradient-vignette)" }}
          />

          {/* Warm radial inside window */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, oklch(0.32 0.025 55 / 30%) 0%, transparent 60%)",
            }}
          />

          {/* AEROVIA inside window */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.4,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute bottom-8 left-0 right-0 flex justify-center"
          >
            <span
              className="font-display font-light tracking-[0.4em] text-xs uppercase"
              style={{ color: "var(--champagne)" }}
            >
              AEROVIA
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Headline — split layout around window */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-full max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          {/* Left half */}
          <motion.div style={{ x: leftX }} className="flex-1 text-left">
            <h1
              className="font-display font-light leading-none tracking-tight"
              style={{
                fontSize: "clamp(3.5rem, 9vw, 9rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.92,
              }}
            >
              Private
              <br />
              <em
                className="not-italic"
                style={{ color: "var(--champagne)", fontStyle: "italic" }}
              >
                aviation
              </em>
            </h1>
          </motion.div>

          {/* Spacer for window */}
          <div style={{ width: "clamp(300px, 32vw, 480px)" }} />

          {/* Right half */}
          <motion.div style={{ x: rightX }} className="flex-1 text-right">
            <h1
              className="font-display font-light leading-none tracking-tight"
              style={{
                fontSize: "clamp(3.5rem, 9vw, 9rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.92,
              }}
            >
              on your
              <br />
              terms.
            </h1>
          </motion.div>
        </div>
      </motion.div>

      {/* Side copy — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-24 left-8 lg:left-16 max-w-xs"
      >
        <p
          className="font-display italic mb-3"
          style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", color: "var(--champagne)" }}
        >
          Your freedom to move better
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "oklch(0.55 0.012 60)" }}>
          Book private aviation around your schedule, your route, and your
          rhythm. AEROVIA gives you on-demand access and short-term memberships
          without the friction of traditional chartering.
        </p>
      </motion.div>

      {/* CTAs — bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-24 right-8 lg:right-16 flex flex-col gap-3 items-end"
      >
        <a href="#booking" className="pill-cta pointer-events-auto">
          <span className="pill-cta-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
          Book a Flight
        </a>
        <a href="#memberships" className="ghost-cta pointer-events-auto">
          Explore Memberships
        </a>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="eyebrow">Scroll</span>
        <div className="animate-scroll-arrow" style={{ color: "var(--champagne)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
