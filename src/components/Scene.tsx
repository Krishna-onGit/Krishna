'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function IcosahedronWireframe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Icosahedron args={[2, 0]} ref={meshRef}>
      <meshBasicMaterial color="#C9A96E" wireframe transparent opacity={0.15} />
    </Icosahedron>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <IcosahedronWireframe />
    </Canvas>
  );
}
