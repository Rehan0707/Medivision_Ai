"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Environment, PerspectiveCamera, OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useSettings } from "@/context/SettingsContext";

function Bone({ length, width, position, rotation, isRural = false, children }: any) {
    return (
        <group position={position} rotation={rotation}>
            <mesh castShadow={!isRural}>
                <cylinderGeometry args={[width, width * 0.9, length, isRural ? 6 : 12]} />
                <meshStandardMaterial color="#fffcf5" roughness={0.4} />
            </mesh>
            <Sphere args={[width * 1.3, isRural ? 8 : 16, isRural ? 8 : 16]} position={[0, length / 2, 0]}>
                <meshStandardMaterial color="#fffcf5" />
            </Sphere>
            <Sphere args={[width * 1.3, isRural ? 8 : 16, isRural ? 8 : 16]} position={[0, -length / 2, 0]}>
                <meshStandardMaterial color="#fffcf5" />
            </Sphere>
            {children}
        </group>
    );
}

function AnimatedArm({ isRural = false }: { isRural?: boolean }) {
    const forearmRef = useRef<THREE.Group>(null);
    const handRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        if (forearmRef.current) {
            // Simulate a curling stretch
            forearmRef.current.rotation.z = Math.sin(time) * 0.5 - 0.5;
        }
        if (handRef.current) {
            // Subtle digital flexion
            handRef.current.rotation.x = Math.sin(time * 2) * 0.2;
        }
    });

    return (
        <group rotation={[0, -Math.PI / 2, 0]} position={[0, -1, 0]}>
            {/* Humerus (Upper Arm) */}
            <Bone length={2.5} width={0.3} position={[0, 1.25, 0]} rotation={[0, 0, 0]} isRural={isRural}>
                {/* Forearm */}
                <group ref={forearmRef} position={[0, -1.25, 0]}>
                    <Bone length={2.2} width={0.22} position={[0, -1.1, 0]} rotation={[0, 0, 0]} isRural={isRural}>
                        {/* Hand placeholder */}
                        <group ref={handRef} position={[0, -1.1, 0]}>
                            <mesh castShadow>
                                <boxGeometry args={[0.6, 0.4, 0.15]} />
                                <meshStandardMaterial color="#fffcf5" />
                            </mesh>
                            {/* Visual feedback glow */}
                            <Sphere args={[0.3, 16, 16]} position={[0, -0.2, 0]}>
                                <meshStandardMaterial color="#00D1FF" emissive="#00D1FF" emissiveIntensity={2} transparent opacity={0.3} />
                            </Sphere>
                        </group>
                    </Bone>
                </group>
            </Bone>
        </group>
    );
}

export default function RehabExerciseScene() {
    const { isRuralMode } = useSettings();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return (
        <div className="w-full h-full min-h-[400px] bg-[#020617]/50 rounded-[2.5rem] flex items-center justify-center border border-white/5">
            <div className="text-[#00D1FF] text-[8px] font-black uppercase tracking-[0.4em] animate-pulse">Loading 3D...</div>
        </div>
    );

    return (
        <div className="w-full h-full min-h-[400px] bg-[#020617]/50 rounded-[2.5rem] overflow-hidden border border-white/5">
            <Canvas shadows={!isRuralMode}>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={35} />
                <OrbitControls enableDamping dampingFactor={0.05} />

                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00D1FF" />
                {!isRuralMode && <pointLight position={[-10, -10, -10]} intensity={1} color="#7000FF" />}

                <Float speed={isRuralMode ? 1 : 2} rotationIntensity={isRuralMode ? 0.1 : 0.2} floatIntensity={0.5}>
                    <AnimatedArm isRural={isRuralMode} />
                </Float>

                {!isRuralMode && <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2} far={4} />}
                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
