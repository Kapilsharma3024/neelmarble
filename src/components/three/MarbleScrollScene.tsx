"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import MarbleSlabScroll, { ScrollCameraRig, SceneEnvironment } from "./MarbleSlabScroll";

export default function MarbleScrollScene() {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.35, 5.2], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
        style={{ background: "transparent" }}
      >
        <ScrollCameraRig />
        <SceneEnvironment />
        <Suspense fallback={null}>
          <MarbleSlabScroll />
        </Suspense>
      </Canvas>
    </div>
  );
}
