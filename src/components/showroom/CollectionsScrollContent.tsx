"use client";

import { useEffect, useRef, ComponentType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { useScrollShowroom } from "./ScrollContext";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const collectionItems = products.filter((p) => p.featured).slice(0, 6);

interface Props {
  MarbleCanvas: ComponentType;
  startIndex?: number;
}

function ProductStrip() {
  const { activeIndex, scrollToSection } = useScrollShowroom();

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/5 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center overflow-x-auto px-2 py-3">
        {collectionItems.map((item, i) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(i)}
            className={`shrink-0 px-4 py-2 text-[10px] uppercase tracking-[0.15em] transition-all ${
              activeIndex === i ? "text-luxury-gold" : "text-white/30 hover:text-white/60"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CollectionsScrollContent({ MarbleCanvas, startIndex = 0 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const {
    activeIndex,
    setActiveIndex,
    setScrollProgress,
    setSectionProgress,
    setIsReady,
    registerScrollTo,
    scrollToSection,
  } = useScrollShowroom();

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    const total = collectionItems.length;
    const scrollDistance = total * window.innerHeight;

    registerScrollTo((index: number) => {
      gsap.to(window, {
        scrollTo: { y: containerRef.current!.offsetTop + (index / total) * scrollDistance },
        duration: 1.4,
        ease: "power3.inOut",
      });
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: pinRef.current,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          const raw = progress * total;
          const idx = Math.min(Math.floor(raw), total - 1);
          setActiveIndex(idx);
          setSectionProgress(raw - idx);
        },
      });
    }, containerRef);

    setIsReady(true);
    if (startIndex > 0) {
      setTimeout(() => scrollToSection(startIndex), 800);
    }

    return () => { ctx.revert(); setIsReady(false); };
  }, [setActiveIndex, setScrollProgress, setSectionProgress, setIsReady, registerScrollTo, startIndex, scrollToSection]);

  const current = collectionItems[activeIndex];

  useEffect(() => {
    if (bgRef.current && current) {
      bgRef.current.style.backgroundColor = activeIndex % 2 === 0 ? "#0a0a0a" : "#111111";
    }
  }, [activeIndex, current]);

  return (
    <div ref={containerRef} style={{ height: `${collectionItems.length * 100}vh` }}>
      <div ref={pinRef} className="relative h-screen overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 bg-luxury-black transition-colors duration-700" />
        <div className="absolute inset-0 lg:left-[38%]">
          <MarbleCanvas />
        </div>

        {collectionItems.map((item, i) => (
          <div
            key={item.id}
            className="absolute inset-0 flex items-center transition-opacity duration-500"
            style={{ opacity: activeIndex === i ? 1 : 0, pointerEvents: activeIndex === i ? "auto" : "none" }}
          >
            <div className="section-padding mx-auto w-full max-w-7xl">
              <div className="max-w-lg">
                <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-luxury-gold/70">
                  {item.subcategory}
                </p>
                <h2 className="font-display text-5xl font-light text-luxury-cream md:text-7xl">{item.name}</h2>
                <p className="mt-6 font-display text-2xl italic text-luxury-gold/80 md:text-3xl">
                  {item.finish} · {item.dimensions}
                </p>
                <p className="mt-6 max-w-sm text-sm leading-relaxed text-luxury-cream/60">{item.description}</p>
                <Link
                  href="/quote"
                  className="group mt-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-luxury-gold"
                >
                  Request Quote <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        ))}

        <ProductStrip />
      </div>
    </div>
  );
}
