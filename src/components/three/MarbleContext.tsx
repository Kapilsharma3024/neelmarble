"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface MarbleContextType {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  mouse: { x: number; y: number };
  setMouse: (mouse: { x: number; y: number }) => void;
}

const MarbleContext = createContext<MarbleContextType>({
  activeIndex: 0,
  setActiveIndex: () => {},
  scrollProgress: 0,
  setScrollProgress: () => {},
  mouse: { x: 0, y: 0 },
  setMouse: () => {},
});

export function MarbleProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouseState] = useState({ x: 0, y: 0 });

  const setMouse = useCallback((m: { x: number; y: number }) => {
    setMouseState(m);
  }, []);

  return (
    <MarbleContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        scrollProgress,
        setScrollProgress,
        mouse,
        setMouse,
      }}
    >
      {children}
    </MarbleContext.Provider>
  );
}

export function useMarble() {
  return useContext(MarbleContext);
}
