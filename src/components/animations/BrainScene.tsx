"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, ContactShadows, Environment, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function BrainCore() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
            const s = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
            meshRef.current.scale.set(s, s, s);
        }
    });

    return (
        <group>
            {/* Left Hemisphere */}
            <Sphere args={[1, 64, 64]} scale={[0.8, 1.1, 1.3]} position={[-0.45, 0, 0]}>
                <MeshDistortMaterial
                    color="#00D1FF"
                    transparent
                    opacity={0.3}
                    distort={0.3}
                    speed={2}
                    roughness={0}
                    metalness={1}
                />
            </Sphere>
            {/* Right Hemisphere */}
            <Sphere args={[1, 64, 64]} scale={[0.8, 1.1, 1.3]} position={[0.45, 0, 0]}>
                <MeshDistortMaterial
                    color="#00D1FF"
                    transparent
                    opacity={0.3}
                    distort={0.3}
                    speed={2}
                    roughness={0}
                    metalness={1}
                />
            </Sphere>

            {/* Inner Neural Glow */}
            <pointLight position={[0, 0, 0]} color="#00D1FF" intensity={10} distance={5} />

            {/* Neural Pathways (Particles or Lines) - Simplified */}
            <mesh rotation={[0, 0, 0]}>
                <torusGeometry args={[0.5, 0.02, 16, 100]} />
                <meshStandardMaterial color="#7000FF" emissive="#7000FF" emissiveIntensity={5} />
            </mesh>
        </group>
    );
}

export default function BrainScene() {
    return (
        <div className="w-full h-full bg-[#020617]/50 rounded-[2rem] overflow-hidden">
            <Canvas shadows gl={{ preserveDrawingBuffer: true, antialias: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
                <OrbitControls enableDamping dampingFactor={0.05} autoRotate autoRotateSpeed={0.5} />

                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, -10, -10]} color="#7000FF" intensity={2} />
                <pointLight position={[0, 5, 5]} color="#00D1FF" intensity={1} />

                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    <BrainCore />
                </Float>

                <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#000000" />
                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
