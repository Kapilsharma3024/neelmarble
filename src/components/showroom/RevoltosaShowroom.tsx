"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { marbleSections } from "@/data/collections";
import { useImagePreload } from "@/hooks/useImagePreload";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function RevoltosaShowroom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const lastIndex = useRef(0);

  useImagePreload();

  const scrollTo = useCallback((index: number) => {
    if (!containerRef.current) return;
    const total = marbleSections.length;
    const scrollDistance = total * window.innerHeight;
    gsap.to(window, {
      scrollTo: { y: containerRef.current.offsetTop + (index / total) * scrollDistance },
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    const total = marbleSections.length;
    const scrollDistance = total * window.innerHeight;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: pinRef.current,
        scrub: false,
        anticipatePin: 1,
        snap: { snapTo: 1 / total, duration: { min: 0.05, max: 0.2 }, delay: 0 },
        onUpdate: (self) => {
          const index = Math.min(Math.floor(self.progress * total + 0.001), total - 1);
          if (index !== lastIndex.current) {
            lastIndex.current = index;
            setHovered(false);
          }
          setActiveIndex(index);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const section = marbleSections[activeIndex];
  const displayImage = hovered ? section.interiorImage : section.slabImage;

  return (
    <div ref={containerRef} style={{ height: `${marbleSections.length * 100}vh` }}>
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* Instant solid background — La Revoltosa style */}
        {marbleSections.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0"
            style={{
              backgroundColor: s.accentColor,
              opacity: activeIndex === i ? 1 : 0,
              visibility: activeIndex === i ? "visible" : "hidden",
            }}
          />
        ))}

        {activeIndex === 0 && (
          <div className="absolute left-1/2 top-8 z-30 -translate-x-1/2">
            <p className="text-[10px] uppercase tracking-[0.8em] text-black/40">Scroll</p>
          </div>
        )}

        <div className="relative z-10 flex h-full flex-col lg:flex-row">
          {/* Left copy */}
          <div className="relative flex w-full flex-col justify-center px-6 pt-28 lg:w-[42%] lg:px-12 lg:pt-0">
            {activeIndex === 0 && (
              <div className="mb-6 lg:mb-0">
                <p className="text-[10px] uppercase tracking-[0.5em] text-black/45">NeelMarble</p>
                <h1 className="mt-2 font-display text-3xl font-light text-black/75 md:text-5xl">
                  Stone of the Extraordinary
                </h1>
              </div>
            )}

            <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: `${section.textColor}99` }}>
              Collection {String(activeIndex + 1).padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.3em]" style={{ color: `${section.textColor}80` }}>
              {section.subtitle}
            </p>
            <h2
              className="mt-2 font-display text-3xl font-light leading-tight md:text-5xl lg:text-6xl"
              style={{ color: section.textColor }}
            >
              {section.title}
            </h2>
            <div className="mt-3 space-y-0">
              {section.tagline.map((line, idx) => (
                <p
                  key={idx}
                  className="font-display text-lg italic leading-tight md:text-2xl lg:text-3xl"
                  style={{ color: section.textColor, opacity: 0.92 - idx * 0.08 }}
                >
                  {line}
                </p>
              ))}
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed" style={{ color: `${section.textColor}bb` }}>
              {section.description}
            </p>
            <Link
              href={`/collections?marble=${section.id}`}
              className="mt-6 inline-block border-b pb-1 text-[10px] uppercase tracking-[0.35em]"
              style={{ color: section.textColor, borderColor: `${section.textColor}40` }}
            >
              More Info
            </Link>
          </div>

          {/* Center marble — like La Revoltosa bottle */}
          <div className="flex flex-1 items-center justify-center px-6 pb-20 lg:pb-14">
            <div
              className="animate-marble-float w-full max-w-sm cursor-pointer"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div className="relative aspect-[3/4] w-full shadow-2xl">
                <Image
                  key={`${section.id}-${hovered}`}
                  src={displayImage}
                  alt={section.title}
                  fill
                  className="object-cover"
                  sizes="400px"
                  priority
                />
              </div>
              <p className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-black/45">
                {hovered ? section.interiorLabel : "Hover · Installed Preview"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom strip — all 20 collections */}
        <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-black/10 bg-white/10 backdrop-blur-md">
          <div className="mx-auto flex max-w-[100vw] items-center overflow-x-auto px-2 py-2.5 scrollbar-hide">
            {marbleSections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => scrollTo(i)}
                className="shrink-0 whitespace-nowrap px-2.5 py-1.5 text-[8px] uppercase tracking-[0.1em] md:px-3 md:text-[9px] md:tracking-[0.12em]"
                style={{
                  color: activeIndex === i ? marbleSections[activeIndex].textColor : "rgba(0,0,0,0.35)",
                  fontWeight: activeIndex === i ? 700 : 400,
                }}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
