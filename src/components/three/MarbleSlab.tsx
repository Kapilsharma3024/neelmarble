"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useMarble } from "./MarbleContext";
import { marbleSections } from "@/data/products";

export default function MarbleSlab() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scrollProgress, mouse, activeIndex } = useMarble();

  const textures = useLoader(
    THREE.TextureLoader,
    marbleSections.map((s) => s.slabImage)
  );

  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const currentIndex = useRef(0);

  useMemo(() => {
    textures.forEach((tex) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(1.5, 1.5);
      tex.colorSpace = THREE.SRGBColorSpace;
    });
  }, [textures]);

  useEffect(() => {
    if (materialRef.current && textures[activeIndex]) {
      materialRef.current.map = textures[activeIndex];
      materialRef.current.needsUpdate = true;
      currentIndex.current = activeIndex;
    }
  }, [activeIndex, textures]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const sectionProgress = scrollProgress * (marbleSections.length - 1);
    const baseRotation = state.clock.elapsedTime * 0.15;
    const scrollRotation = sectionProgress * Math.PI * 0.5;

    meshRef.current.rotation.y = baseRotation + scrollRotation + mouse.x * 0.3;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05 + mouse.y * 0.1;

    const floatY = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    meshRef.current.position.y = floatY - scrollProgress * 0.5;
    meshRef.current.position.z = -scrollProgress * 2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[3.5, 0.15, 2.2]} />
        <meshPhysicalMaterial
          ref={materialRef}
          map={textures[0]}
          roughness={0.15}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
          envMapIntensity={1.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

export function MarbleSlabPreview({ texturePath }: { texturePath: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, texturePath);

  useMemo(() => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 0.1, 1.5]} />
      <meshPhysicalMaterial
        map={texture}
        roughness={0.2}
        metalness={0.1}
        clearcoat={0.8}
        envMapIntensity={1}
      />
    </mesh>
  );
}
