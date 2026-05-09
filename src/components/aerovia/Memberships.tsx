"use client";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Essential",
    price: "$4,800",
    period: "/mo",
    description: "Perfect for occasional flyers who want private access without a full commitment.",
    benefits: [
      "Up to 20 flight hours/month",
      "Light & Midsize aircraft",
      "24-hour booking window",
      "Dedicated flight support",
    ],
    featured: false,
  },
  {
    name: "Executive",
    price: "$9,500",
    period: "/mo",
    description: "Our most popular plan. Built for frequent flyers who value consistency and premium service.",
    benefits: [
      "Up to 50 flight hours/month",
      "All aircraft categories",
      "Same-day booking",
      "Concierge & catering",
    ],
    featured: true,
    ribbon: "Most chosen",
  },
  {
    name: "Elite",
    price: "$18,000",
    period: "/mo",
    description: "Unlimited access for those who treat private aviation as a way of life.",
    benefits: [
      "Unlimited flight hours",
      "Ultra Long Range included",
      "Instant booking, zero wait",
      "Global concierge team 24/7",
    ],
    featured: false,
  },
];

export default function Memberships() {
  return (
    <section
      id="memberships"
      className="py-32 px-4 lg:px-8 grain"
      style={{ background: "var(--charcoal)" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <p className="eyebrow mb-4">Membership Plans</p>
          <h2
            className="font-display font-light mx-auto"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              maxWidth: "600px",
            }}
          >
            On your{" "}
            <em style={{ color: "var(--champagne)", fontStyle: "italic" }}>
              schedule,
            </em>{" "}
            your terms.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative rounded-2xl p-8 transition-all duration-500"
              style={
                plan.featured
                  ? {
                      background: "var(--ivory)",
                      color: "var(--onyx)",
                      transform: "scale(1.05)",
                      boxShadow: "var(--shadow-glow), var(--shadow-card)",
                    }
                  : {
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      boxShadow: "var(--shadow-card)",
                    }
              }
            >
              {/* Ribbon */}
              {plan.ribbon && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-medium tracking-widest uppercase"
                  style={{ background: "var(--champagne)", color: "var(--onyx)" }}
                >
                  {plan.ribbon}
                </div>
              )}

              {/* Plan name */}
              <p
                className="eyebrow mb-2"
                style={{ color: plan.featured ? "var(--bronze)" : undefined }}
              >
                {plan.name}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-4">
                <span
                  className="font-display font-light"
                  style={{
                    fontSize: "3rem",
                    lineHeight: 1,
                    color: plan.featured ? "var(--onyx)" : "var(--ivory)",
                  }}
                >
                  {plan.price}
                </span>
                <span
                  className="text-sm"
                  style={{ color: plan.featured ? "var(--bronze)" : "oklch(0.45 0.012 60)" }}
                >
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-6"
                style={{
                  color: plan.featured ? "oklch(0.35 0.012 60)" : "oklch(0.5 0.012 60)",
                }}
              >
                {plan.description}
              </p>

              <div
                className="hairline mb-6"
                style={{
                  background: plan.featured
                    ? "linear-gradient(90deg, transparent, oklch(0 0 0 / 15%) 30%, oklch(0 0 0 / 15%) 70%, transparent)"
                    : undefined,
                }}
              />

              {/* Benefits */}
              <ul className="space-y-3 mb-8">
                {plan.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm">
                    <span style={{ color: plan.featured ? "var(--bronze)" : "var(--champagne)" }}>
                      ✦
                    </span>
                    <span style={{ color: plan.featured ? "var(--onyx)" : "oklch(0.6 0.012 60)" }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.featured ? (
                <button
                  className="w-full py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300"
                  style={{ background: "var(--onyx)", color: "var(--ivory)" }}
                >
                  Get started
                </button>
              ) : (
                <button
                  className="w-full py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--ivory)",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "var(--champagne)";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--champagne)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "var(--border)";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--ivory)";
                  }}
                >
                  Learn more
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
