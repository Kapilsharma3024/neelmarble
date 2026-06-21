"use client";

import { Suspense, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import * as THREE from "three";
import MarbleSlab3D, { SceneLights } from "./MarbleSlab3D";
import FloatingParticles from "@/components/three/FloatingParticles";
import { useScrollShowroom } from "./ScrollContext";
import { marbleSections } from "@/data/products";

function CameraRig() {
  const { scrollProgress, activeIndex, setMouse, texturePaths } = useScrollShowroom();
  const { camera } = useThree();
  const total = Math.max(texturePaths.length || marbleSections.length, 1);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [setMouse]);

  useFrame((_, delta) => {
    const sectionRatio = activeIndex / Math.max(total - 1, 1);
    const targetZ = 4.8 - sectionRatio * 0.8;
    const targetY = 0.9 + sectionRatio * 0.2;
    const targetX = 0.4 + scrollProgress * 0.3;

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 2);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 2);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 2);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene() {
  return (
    <>
      <CameraRig />
      <SceneLights />
      <Suspense fallback={null}>
        <MarbleSlab3D />
      </Suspense>
      <FloatingParticles count={120} />
      <Preload all />
    </>
  );
}

export default function MarbleCanvas() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0.4, 0.9, 4.8], fov: 38 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.3,
      }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
