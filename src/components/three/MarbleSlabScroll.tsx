"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useMarbleScroll } from "@/hooks/useMarbleScrollContext";
import { scrollMarbles } from "@/data/marbles";

export default function MarbleSlabScroll() {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const { activeIndex, sectionProgress, scrollProgress } = useMarbleScroll();
  const mouse = useRef({ x: 0, y: 0 });

  const paths = scrollMarbles.map((m) => m.marbleImage);
  const textures = useLoader(THREE.TextureLoader, paths);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useMemo(() => {
    textures.forEach((tex) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(1.1, 1.1);
      tex.colorSpace = THREE.SRGBColorSpace;
    });
  }, [textures]);

  useEffect(() => {
    if (materialRef.current && textures[activeIndex]) {
      materialRef.current.map = textures[activeIndex];
      materialRef.current.needsUpdate = true;
    }
  }, [activeIndex, textures]);

  // Preload next texture
  useEffect(() => {
    const next = (activeIndex + 1) % paths.length;
    const img = new window.Image();
    img.src = paths[next];
  }, [activeIndex, paths]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    const baseY = scrollProgress * Math.PI * 1.2 + activeIndex * 0.4;
    const targetY = baseY + t * 0.06 + mouse.current.x * 0.12;
    const targetX = 0.45 + Math.sin(t * 0.3) * 0.04 - mouse.current.y * 0.08;
    const targetZ = sectionProgress * 0.15 + mouse.current.x * 0.04;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, delta * 3);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, delta * 3);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetZ, delta * 2);

    const scale = 1 + sectionProgress * 0.06;
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, scale, delta * 4));
  });

  return (
    <group ref={groupRef} rotation={[0.45, 0, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.14, 1.9]} />
        <meshPhysicalMaterial
          ref={materialRef}
          map={textures[0]}
          roughness={0.12}
          metalness={0.06}
          clearcoat={1}
          clearcoatRoughness={0.08}
          reflectivity={1}
          envMapIntensity={1.8}
        />
      </mesh>
    </group>
  );
}

export function ScrollCameraRig() {
  const { scrollProgress, sectionProgress, activeIndex } = useMarbleScroll();
  const { camera } = useThree();

  useFrame((_, delta) => {
    const zoom = 5.2 - sectionProgress * 0.4 - (activeIndex / 8) * 0.3;
    const targetZ = zoom + scrollProgress * 0.2;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 2.5);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.35 + sectionProgress * 0.15, delta * 2);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function SceneEnvironment() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 10, 5]} intensity={1.6} castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight position={[-4, 4, -3]} intensity={0.5} color="#c9a962" />
      <spotLight position={[0, 8, 4]} angle={0.35} penumbra={1} intensity={0.9} />
      <Environment preset="studio" />
      <ContactShadows position={[0, -0.9, 0]} opacity={0.55} scale={8} blur={2.5} far={4} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.85} />
      </mesh>
    </>
  );
}
