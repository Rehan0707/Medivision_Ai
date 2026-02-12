"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Environment, PerspectiveCamera, OrbitControls, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function BoneSection({ length, radiusTop, radiusBottom, position, rotation }: { length: number, radiusTop: number, radiusBottom: number, position: [number, number, number], rotation: [number, number, number] }) {
    return (
        <group position={position} rotation={rotation}>
            <mesh castShadow>
                <cylinderGeometry args={[radiusTop, radiusBottom, length, 16]} />
                <meshStandardMaterial color="#fffcf5" roughness={0.4} />
            </mesh>
            {/* End Caps */}
            <Sphere position={[0, length / 2, 0]} args={[radiusTop * 1.1, 16, 16]} scale={[1, 0.6, 1.2]}>
                <meshStandardMaterial color="#fffcf5" roughness={0.4} />
            </Sphere>
            <Sphere position={[0, -length / 2, 0]} args={[radiusBottom * 1.1, 16, 16]} scale={[1, 0.6, 1.2]}>
                <meshStandardMaterial color="#fffcf5" roughness={0.4} />
            </Sphere>
        </group>
    );
}

function KneeModel({ hasIssue }: { hasIssue?: boolean }) {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
        }
    });

    return (
        <group ref={meshRef} position={[0, 0, 0]}>
            {/* Femur (Bottom part) */}
            <BoneSection length={3} radiusTop={0.5} radiusBottom={0.7} position={[0, 1.8, 0]} rotation={[0, 0, 0]} />

            {/* Tibia (Top part) */}
            <BoneSection length={3} radiusTop={0.65} radiusBottom={0.45} position={[0, -1.8, 0]} rotation={[0, 0, 0]} />

            {/* Fibula */}
            <mesh position={[0.7, -1.8, -0.2]} castShadow>
                <cylinderGeometry args={[0.15, 0.1, 3, 12]} />
                <meshStandardMaterial color="#fffcf5" roughness={0.5} />
            </mesh>

            {/* Patella (Kneecap) */}
            <Sphere position={[0, 0, 0.8]} args={[0.5, 32, 32]} scale={[1, 1.2, 0.6]}>
                <meshStandardMaterial color="#fffcf5" roughness={0.3} />
            </Sphere>

            {/* Abnormality Indicator (e.g. Tibial plateau fracture or ligament issue) */}
            {hasIssue && (
                <group position={[0.3, -0.4, 0.5]}>
                    <Sphere args={[0.3, 32, 32]}>
                        <MeshDistortMaterial
                            color="#ff0000"
                            emissive="#ff0000"
                            emissiveIntensity={3}
                            distort={0.4}
                            speed={2}
                        />
                    </Sphere>
                    <pointLight color="#ff0000" intensity={8} distance={4} />
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[0.4, 0.45, 64]} />
                        <meshBasicMaterial color="#ff0000" transparent opacity={0.6} />
                    </mesh>
                </group>
            )}

            {/* Joint Space Visualization */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[1, 1, 0.4, 32]} />
                <meshStandardMaterial color="#00D1FF" transparent opacity={0.05} />
            </mesh>
        </group>
    );
}

export default function KneeScene({ hasIssue = false }: { hasIssue?: boolean }) {
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
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
                <OrbitControls enableDamping dampingFactor={0.05} autoRotate autoRotateSpeed={0.5} />

                <ambientLight intensity={0.4} />
                <spotLight position={[10, 10, 15]} angle={0.2} penumbra={1} intensity={1.5} castShadow />
                <pointLight position={[-10, -5, -10]} color="#7000FF" intensity={1} />
                <pointLight position={[5, 10, 5]} color="#00D1FF" intensity={1.5} />

                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <KneeModel hasIssue={hasIssue} />
                </Float>

                <ContactShadows
                    position={[0, -4.5, 0]}
                    opacity={0.3}
                    scale={15}
                    blur={3}
                    far={5}
                    color="#000000"
                />
                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
