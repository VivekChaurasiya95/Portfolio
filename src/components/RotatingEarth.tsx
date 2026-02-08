import { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Sphere, Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const Moon = ({ earthPosition }: { earthPosition: [number, number, number] }) => {
  const moonRef = useRef<THREE.Group>(null);
  const moonMeshRef = useRef<THREE.Mesh>(null);
  
  // Load moon texture
  const moonTexture = useLoader(TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg');

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (moonRef.current) {
      // Orbit around earth
      const orbitRadius = 4.5;
      const orbitSpeed = 0.15;
      moonRef.current.position.x = earthPosition[0] + Math.cos(elapsed * orbitSpeed) * orbitRadius;
      moonRef.current.position.z = earthPosition[2] + Math.sin(elapsed * orbitSpeed) * orbitRadius;
      moonRef.current.position.y = earthPosition[1] + Math.sin(elapsed * orbitSpeed * 0.5) * 1;
    }
    if (moonMeshRef.current) {
      // Slow rotation
      moonMeshRef.current.rotation.y = elapsed * 0.05;
    }
  });

  return (
    <group ref={moonRef}>
      <Sphere ref={moonMeshRef} args={[0.5, 64, 64]}>
        <meshStandardMaterial
          map={moonTexture}
          roughness={0.9}
          metalness={0.1}
        />
      </Sphere>
      {/* Moon glow */}
      <Sphere args={[0.55, 32, 32]}>
        <meshBasicMaterial
          color="#aabbcc"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
};

const Earth = ({ onPointerOver, onPointerOut }: { onPointerOver: () => void; onPointerOut: () => void }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Load Earth textures from reliable Three.js examples CDN
  const earthTexture = useLoader(TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg');
  const bumpMap = useLoader(TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg');
  const specularMap = useLoader(TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg');
  const cloudsTexture = useLoader(TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png');

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = elapsed * 0.06;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = elapsed * 0.08;
    }
    if (atmosphereRef.current) {
      // Subtle pulsing atmosphere
      const pulse = 1 + Math.sin(elapsed * 0.5) * 0.02;
      atmosphereRef.current.scale.setScalar(pulse);
    }
  });

  const earthPosition: [number, number, number] = [2.25, 0, -3];

  return (
    <>
      <group position={earthPosition} rotation={[0.15, 0, 0.1]}>
        {/* Main Earth with enhanced materials */}
        <Sphere 
          ref={earthRef} 
          args={[2.5, 128, 128]}
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}
        >
          <meshPhongMaterial
            map={earthTexture}
            bumpMap={bumpMap}
            bumpScale={0.04}
            specularMap={specularMap}
            specular={new THREE.Color('#666666')}
            shininess={15}
            emissive={new THREE.Color('#112244')}
            emissiveIntensity={0.15}
          />
        </Sphere>
        
        {/* Cloud layer */}
        <Sphere ref={cloudsRef} args={[2.54, 64, 64]}>
          <meshPhongMaterial
            map={cloudsTexture}
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </Sphere>
        
        {/* Inner atmosphere - bright blue rim */}
        <Sphere args={[2.58, 64, 64]}>
          <meshBasicMaterial
            color="#4488ff"
            transparent
            opacity={0.12}
            side={THREE.BackSide}
          />
        </Sphere>
        
        {/* Mid atmosphere glow */}
        <Sphere ref={atmosphereRef} args={[2.7, 64, 64]}>
          <meshBasicMaterial
            color="#66aaff"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </Sphere>
        
        {/* Outer atmosphere glow - soft halo */}
        <Sphere args={[2.9, 64, 64]}>
          <meshBasicMaterial
            color="#88ccff"
            transparent
            opacity={0.04}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Large atmospheric halo */}
        <Sphere args={[3.2, 32, 32]}>
          <meshBasicMaterial
            color="#4488ff"
            transparent
            opacity={0.02}
            side={THREE.BackSide}
          />
        </Sphere>
      </group>
      
      {/* Orbiting Moon */}
      <Moon earthPosition={earthPosition} />
    </>
  );
};

const Scene = () => {
  const [isHovering, setIsHovering] = useState(false);
  const { gl } = useThree();

  const handlePointerOver = () => {
    setIsHovering(true);
    gl.domElement.style.cursor = 'grab';
  };

  const handlePointerOut = () => {
    setIsHovering(false);
    gl.domElement.style.cursor = 'default';
  };

  return (
    <>
      {/* Enhanced lighting for brighter Earth */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 5, 8]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-8, -5, -8]} intensity={0.5} color="#4488cc" />
      <pointLight position={[15, 8, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, 5, 10]} intensity={0.4} color="#88aaff" />
      
      {/* Rim light for dramatic effect */}
      <directionalLight position={[-5, 0, -5]} intensity={0.8} color="#66aaff" />
      
      <Stars 
        radius={200} 
        depth={100} 
        count={6000} 
        factor={5} 
        saturation={0.2} 
        fade 
        speed={0.4}
      />
      
      <Suspense fallback={null}>
        <Earth onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} />
      </Suspense>

      {/* Orbit controls for interactivity */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        zoomSpeed={0.5}
        rotateSpeed={0.4}
        minDistance={5}
        maxDistance={20}
        target={[2.25, 0, -3]}
      />
    </>
  );
};

const RotatingEarth = () => {
  return (
    <div className="fixed inset-y-0 right-0 h-screen w-full md:w-[60vw] lg:w-[50vw] xl:w-[45vw] max-w-[900px] pointer-events-auto z-[1]">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default RotatingEarth;
