"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { marbleSections } from "@/data/products";
import MarbleHoverCard from "@/components/marble/MarbleHoverCard";

export default function IndianMarbleShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll("[data-snap-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.55 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (index: number) => {
    const section = containerRef.current?.querySelector(`[data-index="${index}"]`);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative">
      {/* Snap scroll container — native, no GSAP */}
      <div
        ref={containerRef}
        className="showroom-snap h-screen overflow-y-auto overflow-x-hidden"
        data-lenis-prevent
      >
        {marbleSections.map((section, index) => (
          <section
            key={section.id}
            data-snap-section
            data-index={index}
            className="showroom-snap-section relative flex min-h-screen flex-col pb-20 lg:flex-row"
          >
            {/* Background interior */}
            <div className="absolute inset-0">
              <Image
                src={section.interiorImage}
                alt=""
                fill
                className="object-cover"
                priority={index < 2}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/75" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />
            </div>

            {/* Left — hover marble card */}
            <div className="relative z-10 flex w-full items-center justify-center px-6 py-28 lg:w-[42%] lg:py-0">
              <div className="w-full max-w-sm">
                <MarbleHoverCard section={section} size="lg" showLabel={false} />
                <p className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-luxury-cream/40">
                  Hover to see installed
                </p>
              </div>
            </div>

            {/* Right — details */}
            <div className="relative z-10 flex w-full flex-col justify-center px-6 pb-28 lg:w-[58%] lg:px-16 lg:pb-0">
              <p className="mb-2 text-[10px] uppercase tracking-[0.5em] text-luxury-gold/80">
                {section.subtitle}
              </p>
              <h2
                className="font-display text-4xl font-light leading-tight md:text-5xl lg:text-6xl"
                style={{ color: section.textColor }}
              >
                {section.title}
              </h2>
              <div className="mt-3 space-y-0.5">
                {section.tagline.map((line, i) => (
                  <p
                    key={i}
                    className="font-display text-lg italic text-luxury-cream/70 md:text-xl"
                  >
                    {line}
                  </p>
                ))}
              </div>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-luxury-cream/60">
                {section.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {section.applications.map((app) => (
                  <span
                    key={app}
                    className="border border-white/15 px-3 py-1 text-[10px] uppercase tracking-wider text-luxury-cream/70"
                  >
                    {app}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-luxury-cream/40">
                {section.finish} · {section.origin} · Rajasthan, India
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/collections" className="btn-primary text-[10px] py-3 px-6">
                  View Collection <ArrowRight size={12} />
                </Link>
                <Link href="/quote" className="btn-secondary text-[10px] py-3 px-6">
                  Request Quote
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-luxury-cream/50 hover:text-luxury-gold"
                >
                  <Phone size={12} /> Contact
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Fixed bottom nav */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/80 backdrop-blur-lg">
        <div className="pointer-events-auto mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-3 scrollbar-hide">
          {marbleSections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollTo(i)}
              className={`shrink-0 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] transition-colors ${
                activeIndex === i ? "text-luxury-gold" : "text-white/35 hover:text-white/70"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
