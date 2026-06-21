"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useRef } from "react";

interface ShowroomState {
  activeIndex: number;
  scrollProgress: number;
  sectionProgress: number;
  showInstalled: boolean;
}

interface ShowroomContextType extends ShowroomState {
  setActiveIndex: (i: number) => void;
  setScrollProgress: (p: number) => void;
  setSectionProgress: (p: number) => void;
  setShowInstalled: (v: boolean) => void;
  scrollToSection: (index: number) => void;
  registerScrollTo: (fn: (index: number) => void) => void;
}

const ShowroomContext = createContext<ShowroomContextType | null>(null);

export function ShowroomProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [showInstalled, setShowInstalled] = useState(false);
  const scrollToRef = useRef<((index: number) => void) | null>(null);

  const scrollToSection = useCallback((index: number) => {
    scrollToRef.current?.(index);
  }, []);

  const registerScrollTo = useCallback((fn: (index: number) => void) => {
    scrollToRef.current = fn;
  }, []);

  return (
    <ShowroomContext.Provider
      value={{
        activeIndex,
        scrollProgress,
        sectionProgress,
        showInstalled,
        setActiveIndex,
        setScrollProgress,
        setSectionProgress,
        setShowInstalled,
        scrollToSection,
        registerScrollTo,
      }}
    >
      {children}
    </ShowroomContext.Provider>
  );
}

export function useShowroom() {
  const ctx = useContext(ShowroomContext);
  if (!ctx) throw new Error("useShowroom must be used within ShowroomProvider");
  return ctx;
}
