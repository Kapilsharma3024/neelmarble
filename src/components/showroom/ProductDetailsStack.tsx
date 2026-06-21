"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { marbleSections } from "@/data/products";
import { useShowroom } from "./ShowroomContext";

export default function ProductDetailsStack() {
  const { activeIndex } = useShowroom();

  return (
    <div className="relative h-full w-full">
      {marbleSections.map((section, i) => {
        const isActive = activeIndex === i;
        return (
          <div
            key={section.id}
            className="absolute inset-0 flex flex-col justify-center px-6 py-12 lg:px-12"
            style={{
              opacity: isActive ? 1 : 0,
              visibility: isActive ? "visible" : "hidden",
              transition: "none",
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            <div className="max-w-md">
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.5em]"
                style={{ color: `${section.textColor}70` }}
              >
                {section.subtitle}
              </p>

              <h2
                className="font-display text-4xl font-light leading-[0.95] md:text-5xl lg:text-6xl"
                style={{ color: section.textColor }}
              >
                {section.title}
              </h2>

              <div className="mt-4 space-y-0.5">
                {section.tagline.map((line, idx) => (
                  <p
                    key={idx}
                    className="font-display text-lg italic md:text-2xl"
                    style={{ color: section.textColor, opacity: 0.85 - idx * 0.1 }}
                  >
                    {line}
                  </p>
                ))}
              </div>

              <p
                className="mt-6 text-sm leading-relaxed"
                style={{ color: `${section.textColor}90` }}
              >
                {section.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
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
                className="mt-4 flex gap-6 text-xs"
                style={{ color: `${section.textColor}60` }}
              >
                <span>Finish: {section.finish}</span>
                <span>Origin: {section.origin}</span>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
          </div>
        );
      })}
    </div>
  );
}
