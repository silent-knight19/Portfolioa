import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function ParticleNetwork(props) {
  const ref = useRef();
  const groupRef = useRef();
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }), []);
  
  // Manual mouse tracking with default values to prevent NaN
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize to -1 to 1 with safety checks
      const x = event.clientX ?? 0;
      const y = event.clientY ?? 0;
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      
      mouse.current.x = (x / width) * 2 - 1;
      mouse.current.y = -(y / height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // Auto-rotation (Spinning)
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }

    // Mouse Interaction (Parallax/Tilt) using manual mouse ref
    if (groupRef.current && !isNaN(mouse.current.x) && !isNaN(mouse.current.y)) {
      // Smoothly interpolate rotation based on mouse position
      const targetX = mouse.current.y * 0.2;
      const targetY = mouse.current.x * 0.2;
      
      groupRef.current.rotation.x = groupRef.current.rotation.x + (targetX - groupRef.current.rotation.x) * delta * 2;
      groupRef.current.rotation.y = groupRef.current.rotation.y + (targetY - groupRef.current.rotation.y) * delta * 2;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00f3ff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Background() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-dark-bg pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}
