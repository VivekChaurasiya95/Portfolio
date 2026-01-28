import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Load Earth textures from reliable Three.js examples CDN
  const earthTexture = useLoader(TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg');
  const bumpMap = useLoader(TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg');
  const specularMap = useLoader(TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg');
  const cloudsTexture = useLoader(TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png');

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = elapsed * 0.08;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = elapsed * 0.1;
    }
  });

  return (
    <group position={[4, 2, -3]} rotation={[0.1, 0, 0.15]}>
      {/* Main Earth */}
      <Sphere ref={earthRef} args={[2.2, 128, 128]}>
        <meshPhongMaterial
          map={earthTexture}
          bumpMap={bumpMap}
          bumpScale={0.03}
          specularMap={specularMap}
          specular={new THREE.Color('#333333')}
          shininess={5}
        />
      </Sphere>
      
      {/* Clouds layer */}
      <Sphere ref={cloudsRef} args={[2.24, 64, 64]}>
        <meshPhongMaterial
          map={cloudsTexture}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </Sphere>
      
      {/* Inner atmosphere glow */}
      <Sphere args={[2.28, 64, 64]}>
        <meshBasicMaterial
          color="#88ccff"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Outer atmosphere glow */}
      <Sphere args={[2.5, 64, 64]}>
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.03}
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
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[8, 5, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#6699cc" />
        <pointLight position={[15, 5, 5]} intensity={0.6} color="#ffffff" />
        
        <Stars 
          radius={150} 
          depth={80} 
          count={5000} 
          factor={5} 
          saturation={0.1} 
          fade 
          speed={0.3}
        />
        
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RotatingEarth;
