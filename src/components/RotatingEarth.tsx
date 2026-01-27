import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.18;
    }
  });

  return (
    <group position={[3, -1, -2]}>
      {/* Earth sphere */}
      <Sphere ref={earthRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#1a4a6e"
          roughness={0.8}
          metalness={0.2}
        />
      </Sphere>
      
      {/* Continents layer */}
      <Sphere ref={cloudsRef} args={[2.02, 64, 64]}>
        <meshStandardMaterial
          color="#2d7a5e"
          transparent
          opacity={0.6}
          roughness={0.9}
        />
      </Sphere>
      
      {/* Atmosphere glow */}
      <Sphere args={[2.15, 32, 32]}>
        <meshBasicMaterial
          color="#4ecdc4"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Outer glow */}
      <Sphere args={[2.3, 32, 32]}>
        <meshBasicMaterial
          color="#5fb8b0"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
};

const RotatingEarth = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-3, -2, -5]} intensity={0.4} color="#5fb8b0" />
        <pointLight position={[10, 0, 0]} intensity={0.5} color="#ff7b7b" />
        
        <Stars 
          radius={100} 
          depth={50} 
          count={3000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.5}
        />
        
        <Earth />
      </Canvas>
    </div>
  );
};

export default RotatingEarth;
