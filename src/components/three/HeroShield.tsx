"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function Shield() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Build the shield geometry from vertices
  const shieldGeometry = useMemo(() => {
    const shape = new THREE.Shape();

    // Shield shape — pointed bottom, curved top
    shape.moveTo(0, 1.8);        // top center
    shape.lineTo(1.4, 1.2);      // top right
    shape.lineTo(1.4, 0.0);      // mid right
    shape.quadraticCurveTo(1.4, -1.0, 0, -1.8);  // bottom right curve to point
    shape.quadraticCurveTo(-1.4, -1.0, -1.4, 0.0); // bottom left curve
    shape.lineTo(-1.4, 1.2);     // mid left
    shape.lineTo(0, 1.8);        // back to top

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // Inner shield (smaller)
  const innerShieldGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const s = 0.75; // scale down

    shape.moveTo(0 * s, 1.8 * s);
    shape.lineTo(1.4 * s, 1.2 * s);
    shape.lineTo(1.4 * s, 0.0 * s);
    shape.quadraticCurveTo(1.4 * s, -1.0 * s, 0, -1.8 * s);
    shape.quadraticCurveTo(-1.4 * s, -1.0 * s, -1.4 * s, 0.0 * s);
    shape.lineTo(-1.4 * s, 1.2 * s);
    shape.lineTo(0 * s, 1.8 * s);

    const extrudeSettings = {
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 2,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // Lock body
  const lockBody = useMemo(() => {
    return new THREE.BoxGeometry(0.5, 0.45, 0.2, 2, 2, 2);
  }, []);

  // Lock shackle
  const lockShackle = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.15, 0, 0),
      new THREE.Vector3(-0.15, 0.25, 0),
      new THREE.Vector3(0, 0.4, 0),
      new THREE.Vector3(0.15, 0.25, 0),
      new THREE.Vector3(0.15, 0, 0),
    ]);
    return new THREE.TubeGeometry(curve, 20, 0.03, 8, false);
  }, []);

  // Track mouse for parallax
  useFrame(() => {
    if (groupRef.current) {
      const targetX = mouseRef.current.y * 0.15;
      const targetY = mouseRef.current.x * 0.15;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetY + Math.PI * 0.02 - groupRef.current.rotation.y) * 0.05;
    }
  });

  // Mouse listener
  if (typeof window !== "undefined") {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouse, { passive: true });
    }
  }

  const wireframeMaterial = (
    <meshStandardMaterial
      color="#3B82F6"
      emissive="#3B82F6"
      emissiveIntensity={0.6}
      wireframe
      transparent
      opacity={0.7}
    />
  );

  const solidMaterial = (
    <meshStandardMaterial
      color="#3B82F6"
      emissive="#3B82F6"
      emissiveIntensity={0.3}
      transparent
      opacity={0.15}
      side={THREE.DoubleSide}
    />
  );

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Outer shield wireframe */}
        <mesh geometry={shieldGeometry} position={[0, 0, -0.15]}>
          {wireframeMaterial}
        </mesh>

        {/* Outer shield solid (subtle fill) */}
        <mesh geometry={shieldGeometry} position={[0, 0, -0.15]}>
          {solidMaterial}
        </mesh>

        {/* Inner shield */}
        <mesh geometry={innerShieldGeometry} position={[0, 0, -0.075]}>
          <meshStandardMaterial
            color="#60A5FA"
            emissive="#60A5FA"
            emissiveIntensity={0.4}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Lock body */}
        <mesh geometry={lockBody} position={[0, -0.15, 0.1]}>
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Lock shackle */}
        <mesh geometry={lockShackle} position={[0, 0.08, 0.1]}>
          <meshStandardMaterial
            color="#60A5FA"
            emissive="#60A5FA"
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Keyhole dot */}
        <mesh position={[0, -0.08, 0.22]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial
            color="#93C5FD"
            emissive="#93C5FD"
            emissiveIntensity={2}
          />
        </mesh>

        {/* Keyhole line */}
        <mesh position={[0, -0.2, 0.22]}>
          <boxGeometry args={[0.02, 0.15, 0.02]} />
          <meshStandardMaterial
            color="#93C5FD"
            emissive="#93C5FD"
            emissiveIntensity={1.5}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroShield() {
  return (
    <div className="w-full h-[350px] lg:h-[450px]">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#3B82F6" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#60A5FA" />
        <directionalLight position={[0, 5, 5]} intensity={0.5} />

        <Shield />

        <EffectComposer>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
