"use client";

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from "react";

interface ScrollState {
  activeIndex: number;
  scrollProgress: number;
  sectionProgress: number;
  direction: number;
}

interface ScrollContextType extends ScrollState {
  totalSections: number;
  setActiveIndex: (i: number) => void;
  setScrollProgress: (p: number) => void;
  setSectionProgress: (p: number) => void;
  setDirection: (d: number) => void;
  scrollToSection: (index: number) => void;
  registerScrollTo: (fn: (index: number) => void) => void;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export function MarbleScrollProvider({
  children,
  totalSections,
}: {
  children: ReactNode;
  totalSections: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [direction, setDirection] = useState(1);
  const scrollToRef = useRef<((index: number) => void) | null>(null);

  const scrollToSection = useCallback((index: number) => {
    scrollToRef.current?.(index);
  }, []);

  const registerScrollTo = useCallback((fn: (index: number) => void) => {
    scrollToRef.current = fn;
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        activeIndex,
        scrollProgress,
        sectionProgress,
        direction,
        totalSections,
        setActiveIndex,
        setScrollProgress,
        setSectionProgress,
        setDirection,
        scrollToSection,
        registerScrollTo,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useMarbleScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useMarbleScroll must be used within MarbleScrollProvider");
  return ctx;
}
