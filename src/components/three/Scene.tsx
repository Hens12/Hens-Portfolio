import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneProps {
  mouseNormalized?: { x: number; y: number };
}

function FloatingParticles({ count = 600 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null!);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      sz[i] = Math.random() * 1.5 + 0.3;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.03;
    meshRef.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#880000"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function GroundGrid() {
  return (
    <gridHelper
      args={[40, 40, '#440000', '#180000']}
      position={[0, -5, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] opacity-30">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <FloatingParticles count={400} />
        <GroundGrid />
      </Canvas>
    </div>
  );
}
