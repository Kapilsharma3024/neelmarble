"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { marbleSections } from "@/data/products";
import { useImagePreload } from "@/hooks/useImagePreload";
import { ShowroomProvider, useShowroom } from "./ShowroomContext";
import InteriorBackground from "./InteriorBackground";
import MarbleDisplay from "./MarbleDisplay";
import ProductDetailsStack from "./ProductDetailsStack";
import BeforeAfterToggle, { CollectionNav } from "./BeforeAfterToggle";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function HeroOverlay() {
  const { activeIndex } = useShowroom();
  if (activeIndex !== 0) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-28 z-20 px-6 lg:px-12">
      <p className="mb-3 text-[10px] uppercase tracking-[0.6em] text-luxury-gold">Onyx Collection</p>
      <h1 className="font-display text-4xl font-light text-luxury-cream md:text-6xl lg:text-7xl">
        Select Stones
        <br />
        <span className="gold-text">of Distinction</span>
      </h1>
    </div>
  );
}

function ScrollHint() {
  const { activeIndex } = useShowroom();
  if (activeIndex !== 0) return null;

  return (
    <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2">
      <span className="text-[10px] uppercase tracking-[0.5em] text-luxury-cream/30">Scroll</span>
      <div className="h-10 w-px bg-white/10">
        <div
          className="h-2/5 w-full bg-luxury-gold"
          style={{ animation: "scrollPulse 2s ease-in-out infinite" }}
        />
      </div>
    </div>
  );
}

function ShowroomSections() {
  return (
    <>
      <HeroOverlay />
      <BeforeAfterToggle />
      <ScrollHint />

      <div className="relative z-10 flex h-full flex-col lg:flex-row">
        <div className="flex h-[50vh] w-full items-center lg:h-full lg:w-1/2">
          <MarbleDisplay />
        </div>
        <div className="relative flex h-[50vh] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
          <ProductDetailsStack />
        </div>
      </div>

      <CollectionNav />
    </>
  );
}

function ScrollController() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lastIndexRef = useRef(0);
  const {
    setActiveIndex,
    setScrollProgress,
    setSectionProgress,
    registerScrollTo,
    setShowInstalled,
  } = useShowroom();

  useImagePreload();

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    const total = marbleSections.length;
    const scrollDistance = total * window.innerHeight;

    const getIndex = (progress: number) =>
      Math.min(Math.floor(progress * total + 0.001), total - 1);

    registerScrollTo((index) => {
      gsap.to(window, {
        scrollTo: { y: containerRef.current!.offsetTop + (index / total) * scrollDistance },
        duration: 0.4,
        ease: "power2.out",
      });
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: pinRef.current,
        scrub: false,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / total,
          duration: { min: 0.05, max: 0.15 },
          delay: 0,
          ease: "power1.out",
        },
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          const index = getIndex(progress);
          const sectionProgress = progress * total - index;

          if (index !== lastIndexRef.current) {
            lastIndexRef.current = index;
            setShowInstalled(false);
          }

          setActiveIndex(index);
          setSectionProgress(sectionProgress);
        },
        onLeave: () => setShowInstalled(false),
      });
    }, containerRef);

    return () => ctx.revert();
  }, [setActiveIndex, setScrollProgress, setSectionProgress, registerScrollTo, setShowInstalled]);

  return (
    <div ref={containerRef} style={{ height: `${marbleSections.length * 100}vh` }}>
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        <InteriorBackground />
        <ShowroomSections />
      </div>
    </div>
  );
}

export default function ImageScrollShowroom() {
  return (
    <ShowroomProvider>
      <ScrollController />
    </ShowroomProvider>
  );
}
