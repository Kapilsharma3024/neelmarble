"use client";

import { useEffect, useRef, ComponentType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { marbleSections } from "@/data/products";
import { useScrollShowroom } from "./ScrollContext";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface Props {
  MarbleCanvas: ComponentType;
}

function HeroIntro() {
  const { scrollProgress } = useScrollShowroom();
  const opacity = Math.max(0, 1 - scrollProgress / 0.07);

  if (opacity <= 0) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-28 z-10 transition-opacity duration-700"
      style={{ opacity }}
    >
      <div className="section-padding mx-auto max-w-7xl">
        <p className="mb-4 text-[10px] uppercase tracking-[0.6em] text-luxury-gold">NeelMarble</p>
        <h1 className="font-display text-5xl font-light leading-[0.88] text-luxury-cream md:text-7xl xl:text-8xl">
          Crafted by
          <br />
          <span className="gold-text">Nature</span>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-luxury-cream/50">
          Scroll to explore our premium marble collections
        </p>
      </div>
    </div>
  );
}

function ScrollHint() {
  const { scrollProgress } = useScrollShowroom();
  const opacity = Math.max(0, 1 - scrollProgress / 0.1);

  if (opacity <= 0) return null;

  return (
    <div
      className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
      style={{ opacity }}
    >
      <span className="text-[10px] uppercase tracking-[0.6em] text-luxury-cream/40">Scroll</span>
      <div className="relative h-14 w-px bg-white/10">
        <div
          className="absolute left-0 top-0 w-full bg-luxury-gold"
          style={{ animation: "scrollPulse 2s ease-in-out infinite", height: "40%" }}
        />
      </div>
    </div>
  );
}

function ProductStrip() {
  const { activeIndex, scrollToSection } = useScrollShowroom();

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/5 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center overflow-x-auto px-2 py-3">
        {marbleSections.map((section, i) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(i)}
            className={`relative shrink-0 px-5 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${
              activeIndex === i ? "text-luxury-gold" : "text-white/30 hover:text-white/60"
            }`}
          >
            {section.title}
            {activeIndex === i && (
              <span className="absolute bottom-0 left-1/2 h-px w-8 -translate-x-1/2 bg-luxury-gold" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionContent({ index }: { index: number }) {
  const section = marbleSections[index];
  const { activeIndex, sectionProgress, scrollProgress } = useScrollShowroom();
  const isActive = activeIndex === index;
  const contentRef = useRef<HTMLDivElement>(null);

  const showSection =
    isActive && (index > 0 || scrollProgress >= 0.06);

  useEffect(() => {
    if (!contentRef.current || !showSection) return;
    gsap.fromTo(
      contentRef.current.querySelectorAll("[data-animate]"),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" }
    );
  }, [showSection, index]);

  return (
    <div
      className="absolute inset-0 flex items-center transition-opacity duration-700"
      style={{ opacity: showSection ? 1 : 0, pointerEvents: showSection ? "auto" : "none" }}
    >
      <div ref={contentRef} className="section-padding mx-auto w-full max-w-7xl">
        <div className="max-w-xl lg:max-w-lg">
          <p
            data-animate
            className="mb-4 text-[10px] uppercase tracking-[0.5em]"
            style={{ color: `${section.textColor}80` }}
          >
            Collection {String(index + 1).padStart(2, "0")}
          </p>
          <h2
            data-animate
            className="font-display text-4xl font-light leading-[0.95] md:text-6xl lg:text-7xl"
            style={{ color: section.textColor }}
          >
            {section.title}
          </h2>
          <div className="mt-6 space-y-0">
            {section.tagline.map((line, i) => (
              <p
                key={i}
                data-animate
                className="font-display text-xl font-light italic md:text-3xl lg:text-4xl"
                style={{
                  color: section.textColor,
                  opacity: 0.9 - i * 0.12,
                  transform: `translateY(${sectionProgress * -8 * (i + 1)}px)`,
                }}
              >
                {line}
              </p>
            ))}
          </div>
          <p
            data-animate
            className="mt-8 max-w-sm text-sm leading-relaxed"
            style={{ color: `${section.textColor}90` }}
          >
            {section.description}
          </p>
          <Link
            data-animate
            href="/collections"
            className="group mt-8 inline-flex items-center gap-3 border-b border-luxury-gold/40 pb-1 text-[10px] uppercase tracking-[0.35em] text-luxury-gold transition-all hover:gap-5 hover:border-luxury-gold"
          >
            More Info
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ScrollShowroomContent({ MarbleCanvas }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const {
    setActiveIndex,
    setScrollProgress,
    setSectionProgress,
    setIsReady,
    registerScrollTo,
  } = useScrollShowroom();

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    const totalSections = marbleSections.length;
    const scrollDistance = totalSections * window.innerHeight;

    const scrollToSection = (index: number) => {
      const ratio = index / totalSections;
      const targetY = containerRef.current!.offsetTop + ratio * scrollDistance;
      gsap.to(window, {
        scrollTo: { y: targetY },
        duration: 1.4,
        ease: "power3.inOut",
      });
    };

    registerScrollTo(scrollToSection);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: pinRef.current,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          const rawIndex = progress * totalSections;
          const index = Math.min(Math.floor(rawIndex), totalSections - 1);
          const localProgress = rawIndex - index;

          setActiveIndex(index);
          setSectionProgress(localProgress);

          if (bgRef.current) {
            bgRef.current.style.backgroundColor = marbleSections[index].bgColor;
          }
        },
      });
    }, containerRef);

    setIsReady(true);

    return () => {
      ctx.revert();
      setIsReady(false);
    };
  }, [setActiveIndex, setScrollProgress, setSectionProgress, setIsReady, registerScrollTo]);

  return (
    <div ref={containerRef} style={{ height: `${marbleSections.length * 100}vh` }}>
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 transition-colors duration-700"
          style={{ backgroundColor: marbleSections[0].bgColor }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(201,169,98,0.06),transparent_60%)]" />

        <div className="absolute inset-0 lg:inset-y-0 lg:left-[35%] lg:right-0">
          <MarbleCanvas />
        </div>

        <HeroIntro />
        <ScrollHint />

        {marbleSections.map((section, i) => (
          <SectionContent key={section.id} index={i} />
        ))}

        <ProductStrip />
      </div>
    </div>
  );
}
