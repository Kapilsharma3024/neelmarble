"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { gsap } from "gsap";
import { MarbleSection } from "@/types";
import { useShowroom } from "./ShowroomContext";

interface Props {
  section: MarbleSection;
  isActive: boolean;
}

export default function ProductDetailsPanel({ section, isActive }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { sectionProgress } = useShowroom();

  useEffect(() => {
    if (!panelRef.current || !isActive) return;
    gsap.fromTo(
      panelRef.current.querySelectorAll("[data-reveal]"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }
    );
  }, [isActive, section.id]);

  return (
    <motion.div
      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col justify-center px-6 py-12 lg:px-12"
      style={{ pointerEvents: isActive ? "auto" : "none" }}
    >
      <div ref={panelRef} className="max-w-md">
        <p
          data-reveal
          className="mb-3 text-[10px] uppercase tracking-[0.5em]"
          style={{ color: `${section.textColor}70` }}
        >
          {section.subtitle}
        </p>

        <h2
          data-reveal
          className="font-display text-4xl font-light leading-[0.95] md:text-5xl lg:text-6xl"
          style={{ color: section.textColor }}
        >
          {section.title}
        </h2>

        <div className="mt-4 space-y-0.5">
          {section.tagline.map((line, i) => (
            <p
              key={i}
              data-reveal
              className="font-display text-lg italic md:text-2xl"
              style={{
                color: section.textColor,
                opacity: 0.85 - i * 0.1,
                transform: `translateY(${sectionProgress * -6 * (i + 1)}px)`,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        <p
          data-reveal
          className="mt-6 text-sm leading-relaxed"
          style={{ color: `${section.textColor}90` }}
        >
          {section.description}
        </p>

        <div data-reveal className="mt-6 flex flex-wrap gap-2">
          {section.applications.map((app) => (
            <span
              key={app}
              className="border border-white/10 px-3 py-1 text-[10px] uppercase tracking-wider"
              style={{ color: `${section.textColor}80` }}
            >
              {app}
            </span>
          ))}
        </div>

        <div
          data-reveal
          className="mt-4 flex gap-6 text-xs"
          style={{ color: `${section.textColor}60` }}
        >
          <span>Finish: {section.finish}</span>
          <span>Origin: {section.origin}</span>
        </div>

        <div data-reveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/collections" className="btn-primary text-[10px]">
            View Collection
            <ArrowRight size={12} />
          </Link>
          <Link href="/quote" className="btn-secondary text-[10px]">
            Request Quote
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] transition-colors hover:text-luxury-gold"
            style={{ color: `${section.textColor}70` }}
          >
            <Phone size={12} />
            Contact Us
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
