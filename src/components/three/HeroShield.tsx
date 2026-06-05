"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function AnimatedKey() {
  const outerGroupRef = useRef<THREE.Group>(null);
  const keyRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (keyRef.current && outerGroupRef.current) {
      const t = state.clock.elapsedTime;
      
      // 4-second animation cycle
      const cycle = t % 4;
      let angle = 0;
      
      if (cycle < 1) {
        angle = 0;
      } else if (cycle < 1.5) {
        const p = (cycle - 1) / 0.5;
        const ease = p * p * (3 - 2 * p);
        angle = ease * (Math.PI / 4);
      } else if (cycle < 2.5) {
        angle = Math.PI / 4;
      } else if (cycle < 3.0) {
        const p = (cycle - 2.5) / 0.5;
        const ease = p * p * (3 - 2 * p);
        angle = (1 - ease) * (Math.PI / 4);
      } else {
        angle = 0;
      }
      
      // Twist exactly along the shaft (inner group local X axis)
      keyRef.current.rotation.x = angle;
      
      // Sway left/right (outer group position)
      outerGroupRef.current.position.x = Math.sin(t * 2) * 0.05;
    }
  });

  return (
    <group ref={outerGroupRef} position={[0, 0, 0.2]} scale={0.6} rotation={[0, Math.PI / 3, 0]}>
      <group ref={keyRef}>
        {/* Key Head (Bow) */}
        <mesh position={[-0.3, 0, 0]}>
          <torusGeometry args={[0.12, 0.04, 16, 32]} />
          <meshStandardMaterial 
            color="#93C5FD" 
            emissive="#93C5FD" 
            emissiveIntensity={2.5} 
            depthWrite={false} 
            blending={THREE.AdditiveBlending} 
            transparent 
          />
        </mesh>
        
        {/* Key Shaft */}
        <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.6, 16]} />
          <meshStandardMaterial 
            color="#60A5FA" 
            emissive="#60A5FA" 
            emissiveIntensity={2} 
            depthWrite={false} 
            blending={THREE.AdditiveBlending} 
            transparent 
          />
        </mesh>

        {/* Key Bits (Teeth) */}
        <mesh position={[0.3, -0.07, 0]}>
          <boxGeometry args={[0.05, 0.1, 0.03]} />
          <meshStandardMaterial 
            color="#3B82F6" 
            emissive="#3B82F6" 
            emissiveIntensity={2.5} 
            depthWrite={false} 
            blending={THREE.AdditiveBlending} 
            transparent 
          />
        </mesh>
        <mesh position={[0.4, -0.05, 0]}>
          <boxGeometry args={[0.05, 0.06, 0.03]} />
          <meshStandardMaterial 
            color="#3B82F6" 
            emissive="#3B82F6" 
            emissiveIntensity={2.5} 
            depthWrite={false} 
            blending={THREE.AdditiveBlending} 
            transparent 
          />
        </mesh>
      </group>
    </group>
  );
}

function Shield() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const coreRef = useRef<THREE.Mesh>(null);

  // Helper to build shield shape at a given scale
  const makeShieldGeo = (scale: number, depth: number, bevel: number) => {
    const s = scale;
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.8 * s);
    shape.lineTo(1.4 * s, 1.2 * s);
    shape.lineTo(1.4 * s, 0.0);
    shape.quadraticCurveTo(1.4 * s, -1.0 * s, 0, -1.8 * s);
    shape.quadraticCurveTo(-1.4 * s, -1.0 * s, -1.4 * s, 0.0);
    shape.lineTo(-1.4 * s, 1.2 * s);
    shape.lineTo(0, 1.8 * s);
    return new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
  };

  const outerGeo = useMemo(() => makeShieldGeo(1, 0.25, 0.06), []);
  const midGeo = useMemo(() => makeShieldGeo(0.82, 0.15, 0.04), []);
  const innerGeo = useMemo(() => makeShieldGeo(0.6, 0.1, 0.03), []);

  // Mouse listener
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pulse = Math.sin(t * 2) * 0.5 + 0.5;

    // Gentle mouse parallax
    if (groupRef.current) {
      groupRef.current.rotation.x += (mouseRef.current.y * 0.1 - groupRef.current.rotation.x) * 0.03;
      groupRef.current.rotation.y += (mouseRef.current.x * 0.1 - groupRef.current.rotation.y) * 0.03;
    }

    // Subtle pulsing core (doesn't disappear)
    if (coreRef.current) {
      const m = coreRef.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 3 + pulse * 1.5;
      coreRef.current.scale.setScalar(1 + pulse * 0.1);
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
      <group ref={groupRef}>

        {/* Outer wireframe (bright and persistent) */}
        <mesh geometry={outerGeo} position={[0, 0, -0.125]}>
          <meshStandardMaterial
            color="#60A5FA"
            emissive="#60A5FA"
            emissiveIntensity={1.5}
            wireframe
            transparent
            opacity={0.8}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Outer solid fill */}
        <mesh geometry={outerGeo} position={[0, 0, -0.125]}>
          <meshStandardMaterial
            color="#1D4ED8"
            emissive="#1D4ED8"
            emissiveIntensity={0.5}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Mid wireframe */}
        <mesh geometry={midGeo} position={[0, 0, -0.075]}>
          <meshStandardMaterial
            color="#93C5FD"
            emissive="#93C5FD"
            emissiveIntensity={1.2}
            wireframe
            transparent
            opacity={0.6}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Inner solid (persistent) */}
        <mesh geometry={innerGeo} position={[0, 0, -0.05]}>
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={1.0}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Inner wireframe */}
        <mesh geometry={innerGeo} position={[0, 0, -0.05]}>
          <meshStandardMaterial
            color="#93C5FD"
            emissive="#93C5FD"
            emissiveIntensity={1.5}
            wireframe
            transparent
            opacity={0.5}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Animated Holographic Key in the center */}
        <AnimatedKey />

        {/* Inner ring */}
        <mesh position={[0, 0, 0.13]}>
          <ringGeometry args={[0.2, 0.225, 64]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={2}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Outer ring */}
        <mesh position={[0, 0, 0.12]}>
          <ringGeometry args={[0.35, 0.37, 64]} />
          <meshStandardMaterial
            color="#60A5FA"
            emissive="#60A5FA"
            emissiveIntensity={1.5}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

      </group>
    </Float>
  );
}

export function HeroShield() {
  return (
    <div className="w-full h-[400px] lg:h-[520px]">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
        frameloop="always"
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#3B82F6" />
        <pointLight position={[-5, -3, 5]} intensity={0.8} color="#60A5FA" />
        <pointLight position={[0, 0, 4]} intensity={0.6} color="#93C5FD" />

        <Shield />
      </Canvas>
    </div>
  );
}
