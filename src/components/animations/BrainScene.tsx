"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, ContactShadows, Environment, PerspectiveCamera, OrbitControls, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function NeuralSignals() {
    const pointsRef = useRef<any>(null);

    // Create random points for neural activity
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
            pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <PointMaterial
                transparent
                color="#00D1FF"
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function BrainLobe({ position, scale, rotation = [0, 0, 0] }: { position: [number, number, number], scale: [number, number, number], rotation?: [number, number, number] }) {
    return (
        <Sphere args={[1, 32, 32]} position={position} scale={scale} rotation={rotation}>
            <meshStandardMaterial color="#fffcf5" roughness={0.4} />
        </Sphere>
    );
}

function BrainCore({ hasIssue }: { hasIssue?: boolean }) {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <group ref={meshRef}>
            {/* Cerebral Hemispheres - Frontal Lobes */}
            <BrainLobe position={[-0.4, 0.5, 0.6]} scale={[0.5, 0.6, 0.7]} />
            <BrainLobe position={[0.4, 0.5, 0.6]} scale={[0.5, 0.6, 0.7]} />

            {/* Parietal Lobes */}
            <BrainLobe position={[-0.45, 0.6, -0.2]} scale={[0.55, 0.6, 0.8]} />
            <BrainLobe position={[0.45, 0.6, -0.2]} scale={[0.55, 0.6, 0.8]} />

            {/* Temporal Lobes */}
            <BrainLobe position={[-0.8, -0.1, 0.1]} scale={[0.4, 0.5, 0.6]} rotation={[0, 0, 0.3]} />
            <BrainLobe position={[0.8, -0.1, 0.1]} scale={[0.4, 0.5, 0.6]} rotation={[0, 0, -0.3]} />

            {/* Occipital Lobes */}
            <BrainLobe position={[-0.35, 0.2, -0.8]} scale={[0.45, 0.5, 0.6]} />
            <BrainLobe position={[0.35, 0.2, -0.8]} scale={[0.45, 0.5, 0.6]} />

            {/* Cerebellum */}
            <BrainLobe position={[0, -0.6, -0.6]} scale={[0.7, 0.4, 0.5]} />

            {/* Brainstem */}
            <mesh position={[0, -1, -0.2]} rotation={[0.2, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.15, 1, 16]} />
                <meshStandardMaterial color="#fffcf5" roughness={0.4} />
            </mesh>

            {/* Neural Activity Layers */}
            <group scale={1.2}>
                <NeuralSignals />
            </group>

            {/* Inner Glowing Core */}
            <Sphere args={[0.5, 32, 32]} scale={[1, 1.2, 1.5]}>
                <meshStandardMaterial
                    color="#00D1FF"
                    transparent
                    opacity={0.15}
                    emissive="#00D1FF"
                    emissiveIntensity={2}
                />
            </Sphere>

            {/* Abnormality Indicator */}
            {hasIssue && (
                <group position={[0.5, 0.6, -0.3]}>
                    <Sphere args={[0.3, 32, 32]}>
                        <MeshDistortMaterial
                            color="#ff0000"
                            emissive="#ff0000"
                            emissiveIntensity={3}
                            distort={0.4}
                            speed={2}
                        />
                    </Sphere>
                    <pointLight color="#ff0000" intensity={10} distance={4} />
                    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                        <ringGeometry args={[0.4, 0.45, 64]} />
                        <meshBasicMaterial color="#ff0000" transparent opacity={0.5} />
                    </mesh>
                </group>
            )}

            <pointLight position={[0, 0, 0]} color="#00D1FF" intensity={5} distance={10} />
        </group>
    );
}

export default function BrainScene({ hasIssue = false }: { hasIssue?: boolean }) {
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
                    <BrainCore hasIssue={hasIssue} />
                </Float>

                <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#000000" />
                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
