"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { MarbleSlabPreview } from "@/components/showroom/MarbleSlab3D";

interface MarblePreview3DProps {
  texture: string;
  className?: string;
}

export default function MarblePreview3D({ texture, className = "" }: MarblePreview3DProps) {
  return (
    <div className={`bg-luxury-charcoal ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        camera={{ position: [0, 1, 3], fov: 45 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <MarbleSlabPreview texturePath={texture} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}
