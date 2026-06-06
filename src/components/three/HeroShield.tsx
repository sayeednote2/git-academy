"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Edges, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

function AnimatedLights() {
  const light1 = useRef<THREE.PointLight>(null);
  const light2 = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (light1.current) {
      light1.current.position.x = Math.sin(time * 0.7) * 4;
      light1.current.position.y = Math.cos(time * 0.7) * 4;
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(time * 0.5) * 3;
      light2.current.position.z = Math.sin(time * 0.5) * 3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} color="#ffffff" />
      <pointLight ref={light1} position={[3, 3, 5]} intensity={8} color="#ff2a2a" distance={20} />
      <pointLight ref={light2} position={[-3, -1.5, 3]} intensity={6} color="#ff6666" distance={20} />
      <pointLight position={[0, -3, -3]} intensity={4} color="#cc0000" distance={20} />
    </>
  );
}

function AnimatedKey() {
  const keyRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (keyRef.current) {
      // Twist around the key's own shaft (X axis) to mimic unlocking
      keyRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 4) * (Math.PI / 4);
    }
  });

  return (
    <group position={[0, 0, 0.3]} rotation={[0, Math.PI / 4, 0]} scale={0.4}>
      <group ref={keyRef}>
        {/* Key handle */}
        <mesh position={[-0.8, 0, 0]}>
          <torusGeometry args={[0.3, 0.1, 16, 32]} />
          <meshPhongMaterial color="#ffcc00" emissive="#ffaa00" emissiveIntensity={0.5} />
        </mesh>
        {/* Key shaft */}
        <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 1.6, 16]} />
          <meshPhongMaterial color="#ffcc00" emissive="#ffaa00" emissiveIntensity={0.5} />
        </mesh>
        {/* Key teeth */}
        <mesh position={[0.6, -0.2, 0]}>
          <boxGeometry args={[0.2, 0.4, 0.1]} />
          <meshPhongMaterial color="#ffcc00" emissive="#ffaa00" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.9, -0.2, 0]}>
          <boxGeometry args={[0.2, 0.4, 0.1]} />
          <meshPhongMaterial color="#ffcc00" emissive="#ffaa00" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function Shield() {
  const groupRef = useRef<THREE.Group>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  const shieldGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.4);
    shape.lineTo(1.1, 0.9);
    shape.lineTo(1.1, -0.2);
    shape.quadraticCurveTo(1.1, -1.1, 0, -1.5);
    shape.quadraticCurveTo(-1.1, -1.1, -1.1, -0.2);
    shape.lineTo(-1.1, 0.9);
    shape.lineTo(0, 1.4);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.24,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.04,
      bevelSegments: 5,
      curveSegments: 32,
    });
    geo.center();
    return geo;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (wireframeRef.current) {
      const mat = wireframeRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.1 + Math.sin(time * 1.5) * 0.05;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
      <group ref={groupRef} scale={0.75}>
        
        {/* Main Solid Shield */}
        <mesh geometry={shieldGeo}>
          <meshPhongMaterial
            color="#1a0000"
            emissive="#330000"
            specular="#ff2a2a"
            shininess={80}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
          <Edges color="#ff3333" threshold={15} transparent opacity={0.7} />
        </mesh>

        {/* Wireframe Overlay */}
        <mesh ref={wireframeRef} geometry={shieldGeo} scale={[1.02, 1.02, 1.02]}>
          <meshBasicMaterial
            color="#ff2a2a"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>

        <AnimatedKey />
      </group>
    </Float>
  );
}

function OrbitingParticles() {
  const groupRef = useRef<THREE.Group>(null);
  
  const particleCount = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 1.6 + Math.random() * 0.8; 
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.cos(phi);
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#ff3333"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function DataNodes() {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodeCount = 12;
  const { nodes, linePositions } = useMemo(() => {
    const nodePositions = [];
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 1.8 + Math.random() * 0.6;
      const y = (Math.random() - 0.5) * 2.2;
      nodePositions.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
    }
    
    const lines = [];
    for (let i = 0; i < nodeCount; i++) {
      const p1 = nodePositions[i];
      const p2 = nodePositions[(i + 1) % nodeCount];
      const p3 = nodePositions[(i + Math.floor(nodeCount/2)) % nodeCount];
      
      lines.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
      lines.push(p1.x, p1.y, p1.z, p3.x, p3.y, p3.z);
    }
    
    return { nodes: nodePositions, linePositions: new Float32Array(lines) };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -(state.clock.elapsedTime * 0.08); 
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#ff1a1a" transparent opacity={0.9} />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ff1a1a" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

export function HeroShield() {
  return (
    <div className="relative w-full h-[400px] lg:h-[520px] flex items-center justify-center">
      
      {/* Background Pulsing Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <motion.div 
          className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,26,26,0.1) 0%, rgba(204,0,0,0.05) 30%, transparent 60%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* 3D Canvas */}
      <div className="relative z-20 w-full h-full">
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
          <OrbitControls enableZoom={false} enablePan={false} />
          <AnimatedLights />
          <OrbitingParticles />
          <DataNodes />
          <Shield />
        </Canvas>
      </div>
    </div>
  );
}
