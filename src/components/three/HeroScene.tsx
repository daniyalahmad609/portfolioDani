"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";

function Orb() {
  const meshRef = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.35;
  });

  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial color="#7c3aed" roughness={0.1} metalness={0.8} distort={0.3} speed={2} />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <div className="h-[320px] w-full md:h-[480px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 2, 2]} intensity={1.2} />
        <pointLight position={[-2, -1, -2]} intensity={0.5} color="#a855f7" />
        <Orb />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}
