"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  ContactShadows,
  Preload,
} from "@react-three/drei";
import * as THREE from "three";
import MarbleSlab from "./MarbleSlab";
import FloatingParticles from "./FloatingParticles";
import { MarbleProvider, useMarble } from "./MarbleContext";
import { marbleSections } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

function CameraController() {
  const { scrollProgress, setMouse } = useMarble();
  const { camera } = useThree();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [setMouse]);

  useFrame(() => {
    const targetZ = 5 + scrollProgress * 3;
    const targetY = 0.5 + scrollProgress * 0.5;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SceneContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.5, 5]} fov={45} />
      <CameraController />

      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#c9a962" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        color="#ffffff"
      />

      <Environment preset="city" />

      <Suspense fallback={null}>
        <MarbleSlab />
      </Suspense>

      <FloatingParticles count={150} />

      <ContactShadows
        position={[0, -1, 0]}
        opacity={0.5}
        scale={10}
        blur={2}
        far={4}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.8} metalness={0.2} />
      </mesh>

      <Preload all />
    </>
  );
}

function ScrollSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveIndex, setScrollProgress } = useMarble();
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(Math.min(progress * 5, 1));

      const sectionIndex = Math.min(
        Math.floor(progress * marbleSections.length),
        marbleSections.length - 1
      );
      setActiveIndex(sectionIndex);
      setCurrentSection(sectionIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActiveIndex, setScrollProgress]);

  return (
    <div ref={containerRef} className="pointer-events-none relative z-10">
      {/* Hero overlay text */}
      <div className="flex h-screen items-center">
        <div className="section-padding mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <p className="mb-4 text-xs uppercase tracking-[0.5em] text-luxury-gold">
              Premium Natural Stone
            </p>
            <h1 className="heading-display mb-6 text-luxury-cream">
              Where Earth
              <br />
              <span className="gold-text">Meets Artistry</span>
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-luxury-cream/60">
              Discover the finest Indian marble collections. Crafted by nature,
              perfected by NeelMarble.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll sections */}
      {marbleSections.map((section, index) => (
        <div key={section.id} className="flex h-screen items-center">
          <div className="section-padding mx-auto w-full max-w-7xl">
            <AnimatePresence mode="wait">
              {currentSection === index && (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-lg"
                >
                  <p className="mb-2 text-xs uppercase tracking-[0.4em] text-luxury-gold">
                    Collection {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="heading-section mb-2 text-luxury-cream">
                    {section.title}
                  </h2>
                  <p className="mb-4 font-display text-xl italic text-luxury-gold/80">
                    {section.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed text-luxury-cream/60">
                    {section.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MarbleScene() {
  return (
    <MarbleProvider>
      <div className="relative">
        <div className="fixed inset-0 z-0">
          <Canvas
            shadows
            dpr={[1, 2]}
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.2,
            }}
          >
            <SceneContent />
          </Canvas>
        </div>
        <ScrollSections />
      </div>
    </MarbleProvider>
  );
}
