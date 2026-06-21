"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useScrollShowroom } from "./ScrollContext";
import { marbleSections } from "@/data/products";

const BASE_TILT_X = 0.55;
const BASE_ROTATION_Y = 0.35;

export default function MarbleSlab3D() {
  const groupRef = useRef<THREE.Group>(null);
  const { scrollProgress, sectionProgress, activeIndex, mouse, texturePaths } = useScrollShowroom();

  const paths =
    texturePaths.length > 0 ? texturePaths : marbleSections.map((s) => s.slabImage);

  const textures = useLoader(THREE.TextureLoader, paths);

  const sideMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#141414",
        roughness: 0.5,
        metalness: 0.15,
      }),
    []
  );

  const topMaterial = useMemo(() => {
    textures.forEach((tex) => {
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.colorSpace = THREE.SRGBColorSpace;
    });

    return new THREE.MeshPhysicalMaterial({
      map: textures[0],
      roughness: 0.18,
      metalness: 0.04,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1,
    });
  }, [textures]);

  const materials = useMemo(
    () => [sideMaterial, sideMaterial, topMaterial, topMaterial, sideMaterial, sideMaterial],
    [sideMaterial, topMaterial]
  );

  useEffect(() => {
    if (topMaterial && textures[activeIndex]) {
      topMaterial.map = textures[activeIndex];
      topMaterial.needsUpdate = true;
    }
  }, [activeIndex, textures, topMaterial]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;
    const totalSections = paths.length;

    const scrollRotY =
      scrollProgress * Math.PI * 0.5 + activeIndex * (Math.PI / totalSections / 2);
    const targetRotY = BASE_ROTATION_Y + scrollRotY + mouse.x * 0.15 + t * 0.035;
    const targetRotX = BASE_TILT_X + mouse.y * 0.05 + Math.sin(t * 0.35) * 0.015;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      delta * 2.5
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      THREE.MathUtils.clamp(targetRotX, 0.4, 0.68),
      delta * 3
    );

    const scale = 1 + sectionProgress * 0.04;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, scale, delta * 4)
    );

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      Math.sin(t * 0.4) * 0.05,
      delta * 2
    );

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      mouse.x * 0.12,
      delta * 2
    );
  });

  return (
    <group ref={groupRef} rotation={[BASE_TILT_X, BASE_ROTATION_Y, 0]}>
      <mesh castShadow receiveShadow material={materials}>
        <boxGeometry args={[3.6, 0.12, 2.2]} />
      </mesh>
    </group>
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
    if (meshRef.current) {
      meshRef.current.rotation.x = 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0.5, 0, 0]}>
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

export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[4, 10, 6]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-3, 4, -2]} intensity={0.35} color="#c9a962" />
      <pointLight position={[1, 4, 4]} intensity={0.4} color="#ffffff" />
      <Environment preset="studio" />
      <ContactShadows position={[0, -0.7, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.7, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#080808" roughness={0.9} metalness={0.1} />
      </mesh>
    </>
  );
}
