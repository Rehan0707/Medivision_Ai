"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 1000 }) {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 10;
            p[i * 3 + 1] = (Math.random() - 0.5) * 10;
            p[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return p;
    }, [count]);

    const pointsRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.001;
            pointsRef.current.rotation.x += 0.0005;
        }
    });

    return (
        <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#00D1FF"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
}

function AnimatedSphere() {
    const sphereRef = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (sphereRef.current) {
            sphereRef.current.rotation.x = Math.sin(time / 4);
            sphereRef.current.rotation.y = Math.sin(time / 2);
        }
        if (coreRef.current) {
            coreRef.current.rotation.y -= 0.01;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                {/* Holographic Outer Shell */}
                <Sphere ref={sphereRef} args={[1, 100, 200]} scale={1.8}>
                    <MeshDistortMaterial
                        color="#00D1FF"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0}
                        metalness={0.8}
                        transparent
                        opacity={0.2}
                    />
                </Sphere>

                {/* Inner Core */}
                <Sphere ref={coreRef} args={[0.5, 64, 64]} scale={1}>
                    <meshStandardMaterial
                        color="#7000FF"
                        emissive="#7000FF"
                        emissiveIntensity={2}
                        roughness={0}
                        metalness={1}
                    />
                </Sphere>
            </Float>

            <Particles count={2000} />
        </group>
    );
}

export default function HeroScene() {
    return (
        <div className="w-full h-[600px] cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, -10, -10]} color="#7000FF" intensity={3} />
                <pointLight position={[0, 5, 0]} color="#00D1FF" intensity={2} />
                <AnimatedSphere />
            </Canvas>
        </div>
    );
}
