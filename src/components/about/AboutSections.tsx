"use client";

import { motion } from "framer-motion";
import { timelineEvents, statistics } from "@/data/products";

export default function AboutTimeline() {
  return (
    <section className="section-padding bg-luxury-charcoal">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.5em] text-luxury-gold">Our Journey</p>
          <h2 className="heading-section text-luxury-cream">A Legacy of Excellence</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-luxury-gold/20 md:block" />

          <div className="space-y-16">
            {timelineEvents.map((event, i) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <span className="font-display text-4xl text-luxury-gold">{event.year}</span>
                  <h3 className="mt-2 font-display text-2xl text-luxury-cream">{event.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-luxury-cream/60">{event.description}</p>
                </div>

                <div className="relative z-10 hidden h-4 w-4 rounded-full border-2 border-luxury-gold bg-luxury-black md:block" />

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatisticsSection() {
  return (
    <section className="section-padding bg-luxury-black">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {statistics.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <span className="font-display text-5xl text-luxury-gold md:text-6xl">{stat.value}</span>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-luxury-cream/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const steps = [
    { step: "01", title: "Quarry Selection", desc: "Hand-picked blocks from premium quarries across Rajasthan." },
    { step: "02", title: "Precision Cutting", desc: "State-of-the-art machinery for exact dimensions and finishes." },
    { step: "03", title: "Quality Inspection", desc: "Every slab undergoes rigorous quality checks before dispatch." },
    { step: "04", title: "Global Delivery", desc: "Secure packaging and worldwide shipping with installation support." },
  ];

  return (
    <section className="section-padding bg-luxury-black">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.5em] text-luxury-gold">Manufacturing</p>
          <h2 className="heading-section text-luxury-cream">Our Process</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6"
            >
              <span className="font-display text-3xl text-luxury-gold/40">{item.step}</span>
              <h3 className="mt-4 font-display text-xl text-luxury-cream">{item.title}</h3>
              <p className="mt-2 text-sm text-luxury-cream/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  const reasons = [
    "Direct quarry sourcing — no middlemen",
    "25+ years of industry expertise",
    "Custom sizing and finishing available",
    "Sustainable and ethical mining practices",
    "Dedicated project management team",
    "Competitive pricing with premium quality",
  ];

  return (
    <section className="section-padding bg-luxury-charcoal">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 text-xs uppercase tracking-[0.5em] text-luxury-gold">Why Choose Us</p>
            <h2 className="heading-section mb-8 text-luxury-cream">
              The NeelMarble
              <br />
              <span className="gold-text">Difference</span>
            </h2>
            <ul className="space-y-4">
              {reasons.map((reason, i) => (
                <motion.li
                  key={reason}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 text-sm text-luxury-cream/70"
                >
                  <span className="h-px w-8 bg-luxury-gold" />
                  {reason}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-12 text-center"
          >
            <p className="font-display text-6xl text-luxury-gold">25+</p>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-luxury-cream/60">Years of Trust</p>
            <p className="mt-8 text-sm leading-relaxed text-luxury-cream/50">
              Trusted by architects, interior designers, and homeowners across 25+ countries
              for premium Indian marble solutions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
