"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useRef } from "react";

interface ScrollState {
  activeIndex: number;
  scrollProgress: number;
  sectionProgress: number;
  mouse: { x: number; y: number };
  isReady: boolean;
}

interface ScrollContextType extends ScrollState {
  texturePaths: string[];
  setActiveIndex: (index: number) => void;
  setScrollProgress: (progress: number) => void;
  setSectionProgress: (progress: number) => void;
  setMouse: (mouse: { x: number; y: number }) => void;
  setIsReady: (ready: boolean) => void;
  scrollToSection: (index: number) => void;
  registerScrollTo: (fn: (index: number) => void) => void;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export function ScrollShowroomProvider({
  children,
  texturePaths,
}: {
  children: ReactNode;
  texturePaths?: string[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [mouse, setMouseState] = useState({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);
  const scrollToRef = useRef<((index: number) => void) | null>(null);

  const setMouse = useCallback((m: { x: number; y: number }) => {
    setMouseState(m);
  }, []);

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
        mouse,
        isReady,
        texturePaths: texturePaths ?? [],
        setActiveIndex,
        setScrollProgress,
        setSectionProgress,
        setMouse,
        setIsReady,
        scrollToSection,
        registerScrollTo,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollShowroom() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScrollShowroom must be used within ScrollShowroomProvider");
  return ctx;
}
