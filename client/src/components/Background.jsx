/**
 * Background.jsx
 * ================
 * Role: The animated particle background that sits behind all content.
 *
 * How it works:
 * - Uses Three.js (via @react-three/fiber and @react-three/drei) to render particles
 * - Two particle layers: blue (primary) and purple (secondary) for depth effect
 * - Particles auto-rotate slowly on their own
 * - Particles tilt slightly based on mouse position (parallax effect)
 * - A gradient overlay on top blends the particles into the dark background
 * - Fixed position with -z-10 so it stays behind everything
 */

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

/**
 * ParticleLayer component
 * ========================
 * A single layer of particles. We use two of these with different colors
 * and sizes to create a dual-layer depth effect.
 *
 * @param {string} color - the color of the particles (hex)
 * @param {number} size - the size of each particle
 * @param {number} count - how many particles to render
 * @param {number} rotationSpeed - how fast they rotate
 */
function ParticleLayer({ color = '#00f3ff', size = 0.002, count = 5000, rotationSpeed = 10, ...props }) {
  const ref = useRef();
  const groupRef = useRef();

  // Generate random positions in a sphere shape
  // useMemo ensures we only generate these once, not on every re-render
  const sphere = useMemo(() => random.inSphere(new Float32Array(count), { radius: 1.5 }), [count]);

  // Track mouse position manually (not using Three.js's built-in mouse tracking
  // because it gave NaN errors sometimes)
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse coordinates to -1 to 1 range
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

  // Animation loop — runs on every frame (~60fps)
  useFrame((state, delta) => {
    // Auto-rotation: spin the particles slowly
    if (ref.current) {
      ref.current.rotation.x -= delta / rotationSpeed;
      ref.current.rotation.y -= delta / (rotationSpeed * 1.5);
    }

    // Mouse parallax: tilt the particle group based on mouse position
    if (groupRef.current && !isNaN(mouse.current.x) && !isNaN(mouse.current.y)) {
      const targetX = mouse.current.y * 0.2;
      const targetY = mouse.current.x * 0.2;

      // Smoothly interpolate (lerp) toward the target rotation
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * delta * 2;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * delta * 2;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color={color}
          size={size}
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
      {/* Three.js Canvas with two particle layers */}
      <Canvas camera={{ position: [0, 0, 1] }}>
        {/* Primary particles: cyan/blue, slightly larger */}
        <ParticleLayer color="#00f3ff" size={0.0025} count={4000} rotationSpeed={10} />

        {/* Secondary particles: purple, smaller and slower for depth */}
        <ParticleLayer color="#bc13fe" size={0.0015} count={2000} rotationSpeed={15} />
      </Canvas>

      {/* Gradient overlay: fades the edges of the particle field into darkness
          This prevents particles from having a harsh edge at the screen borders */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/50 via-transparent to-dark-bg/80 pointer-events-none" />
    </div>
  );
}
