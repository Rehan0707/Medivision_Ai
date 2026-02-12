"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Environment, PerspectiveCamera, OrbitControls, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Vertebra({ position, rotation }: { position: [number, number, number], rotation?: [number, number, number] }) {
    return (
        <group position={position} rotation={rotation}>
            {/* Main Body */}
            <mesh castShadow>
                <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
                <meshStandardMaterial color="#fffcf5" roughness={0.4} />
            </mesh>
            {/* Spinous Process (Back bit) */}
            <mesh position={[0, 0, -0.5]} rotation={[0.5, 0, 0]} castShadow>
                <boxGeometry args={[0.2, 0.3, 0.6]} />
                <meshStandardMaterial color="#fffcf5" roughness={0.4} />
            </mesh>
            {/* Transverse Processes (Side bits) */}
            <mesh position={[0.5, 0, -0.2]} rotation={[0, 0.5, 0]} castShadow>
                <boxGeometry args={[0.5, 0.15, 0.2]} />
                <meshStandardMaterial color="#fffcf5" roughness={0.4} />
            </mesh>
            <mesh position={[-0.5, 0, -0.2]} rotation={[0, -0.5, 0]} castShadow>
                <boxGeometry args={[0.5, 0.15, 0.2]} />
                <meshStandardMaterial color="#fffcf5" roughness={0.4} />
            </mesh>
        </group>
    );
}

function Disc({ position }: { position: [number, number, number] }) {
    return (
        <mesh position={position}>
            <cylinderGeometry args={[0.45, 0.45, 0.1, 32]} />
            <meshStandardMaterial color="#00D1FF" transparent opacity={0.2} emissive="#00D1FF" emissiveIntensity={0.5} />
        </mesh>
    );
}

function SpineModel({ hasIssue }: { hasIssue?: boolean }) {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    const stack = [
        { y: 1.5, rot: [0.1, 0, 0] },
        { y: 1.0, rot: [0.08, 0, 0] },
        { y: 0.5, rot: [0.05, 0, 0] },
        { y: 0.0, rot: [0, 0, 0] },
        { y: -0.5, rot: [-0.05, 0, 0] },
        { y: -1.0, rot: [-0.08, 0, 0] },
        { y: -1.5, rot: [-0.1, 0, 0] },
    ];

    return (
        <group ref={meshRef} position={[0, 0, 0]}>
            {stack.map((v, i) => (
                <group key={i}>
                    <Vertebra position={[0, v.y, 0]} rotation={v.rot as [number, number, number]} />
                    {i < stack.length - 1 && (
                        <Disc position={[0, v.y - 0.25, 0]} />
                    )}
                </group>
            ))}

            {hasIssue && (
                <group position={[0, -0.1, 0.4]}>
                    <Sphere args={[0.25, 32, 32]}>
                        <MeshDistortMaterial
                            color="#ff0000"
                            emissive="#ff0000"
                            emissiveIntensity={3}
                            distort={0.4}
                            speed={2}
                        />
                    </Sphere>
                    <pointLight color="#ff0000" intensity={8} distance={3} />
                </group>
            )}
        </group>
    );
}

export default function SpineScene({ hasIssue = false }: { hasIssue?: boolean }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return (
        <div className="w-full h-full min-h-[400px] bg-[#020617]/50 rounded-[2.5rem] flex items-center justify-center">
            <div className="text-[#00D1FF] text-[8px] font-black uppercase tracking-[0.4em] animate-pulse">Loading 3D...</div>
        </div>
    );

    return (
        <div className="w-full h-full min-h-[400px] rounded-[2.5rem] overflow-hidden bg-[#020617]/50">
            <Canvas shadows gl={{ antialias: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={35} />
                <OrbitControls enableDamping dampingFactor={0.05} autoRotate autoRotateSpeed={0.5} />

                <ambientLight intensity={0.4} />
                <spotLight position={[10, 10, 15]} angle={0.2} penumbra={1} intensity={1.5} castShadow />
                <pointLight position={[-10, -5, -10]} color="#7000FF" intensity={1} />
                <pointLight position={[5, 10, 5]} color="#00D1FF" intensity={1.5} />

                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
                    <SpineModel hasIssue={hasIssue} />
                </Float>

                <ContactShadows
                    position={[0, -3, 0]}
                    opacity={0.3}
                    scale={10}
                    blur={2.5}
                    far={4}
                    color="#000000"
                />
                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
