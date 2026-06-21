"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative z-20 overflow-hidden bg-luxury-black section-padding">
      <div className="absolute inset-0 luxury-gradient" />
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.5em] text-luxury-gold">
            Start Your Project
          </p>
          <h2 className="heading-section mb-6 text-luxury-cream">
            Transform Your Space with
            <br />
            <span className="gold-text">Premium Marble</span>
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-sm leading-relaxed text-luxury-cream/60">
            Get a personalized quote for your project. Our experts will help you
            select the perfect marble for your vision.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/quote" className="btn-primary">
              Request Quote
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
