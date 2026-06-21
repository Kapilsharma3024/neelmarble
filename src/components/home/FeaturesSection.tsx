"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const features = [
  {
    title: "Quarry Direct",
    description: "Sourced directly from India's premier marble quarries in Rajasthan.",
  },
  {
    title: "Master Craftsmanship",
    description: "Precision cutting and finishing by artisans with decades of experience.",
  },
  {
    title: "Global Delivery",
    description: "Worldwide shipping with secure packaging and installation support.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative z-20 bg-luxury-black section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.5em] text-luxury-gold">
            Why NeelMarble
          </p>
          <h2 className="heading-section gold-text">Uncompromising Quality</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-panel group p-8 transition-all duration-500 hover:border-luxury-gold/30"
            >
              <div className="mb-6 h-px w-12 bg-luxury-gold transition-all duration-500 group-hover:w-24" />
              <h3 className="mb-4 font-display text-2xl text-luxury-cream">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-luxury-cream/60">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link href="/collections" className="btn-primary inline-flex">
            Explore Collections
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
