"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, ContactShadows, Environment, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Bone({ length, width, position, rotation }: { length: number, width: number, position: [number, number, number], rotation: [number, number, number] }) {
    return (
        <group position={position} rotation={rotation}>
            <mesh castShadow>
                <cylinderGeometry args={[width, width * 1.1, length, 16]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={0.2}
                    roughness={0.1}
                    metalness={0.8}
                />
            </mesh>
            {/* Joints - more subtle */}
            <mesh position={[0, length / 2, 0]}>
                <sphereGeometry args={[width * 1.3, 16, 16]} />
                <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.8} />
            </mesh>
            <mesh position={[0, -length / 2, 0]}>
                <sphereGeometry args={[width * 1.3, 16, 16]} />
                <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.8} />
            </mesh>
        </group>
    );
}

function Finger({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) {
    return (
        <group position={position} rotation={rotation} scale={scale}>
            <Bone length={0.7} width={0.07} position={[0, 0, 0]} rotation={[0, 0, 0]} />
            <Bone length={0.5} width={0.06} position={[0, 0.65, 0]} rotation={[0.1, 0, 0]} />
            <Bone length={0.35} width={0.05} position={[0, 1.1, 0]} rotation={[0.2, 0, 0]} />
        </group>
    );
}

function HandModel() {
    return (
        <group rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -0.5, 0]}>
            {/* Palm Structure */}
            <group position={[0, -0.8, 0]}>
                <Bone length={1.1} width={0.1} position={[-0.35, 0, 0]} rotation={[0, 0, 0.15]} />
                <Bone length={1.2} width={0.1} position={[-0.12, 0.1, 0]} rotation={[0, 0, 0.05]} />
                <Bone length={1.2} width={0.1} position={[0.12, 0.1, 0]} rotation={[0, 0, -0.05]} />
                <Bone length={1.1} width={0.1} position={[0.35, 0, 0]} rotation={[0, 0, -0.15]} />
            </group>

            {/* Fingers */}
            <Finger position={[-0.45, 0.3, 0]} rotation={[0, 0, 0.2]} scale={0.9} />
            <Finger position={[-0.15, 0.5, 0]} rotation={[0, 0, 0.05]} scale={1.1} />
            <Finger position={[0.15, 0.5, 0]} rotation={[0, 0, -0.05]} scale={1.05} />
            <Finger position={[0.45, 0.3, 0]} rotation={[0, 0, -0.2]} scale={0.85} />

            {/* Thumb - improved angle */}
            <group position={[0.6, -0.3, 0]} rotation={[0, 0, -0.9]}>
                <Bone length={0.6} width={0.09} position={[0, 0, 0]} rotation={[0, 0, 0.2]} />
                <Bone length={0.4} width={0.08} position={[-0.05, 0.5, 0]} rotation={[0, 0, 0.4]} />
            </group>

            {/* Wrist - carpals */}
            <mesh position={[0, -1.5, 0]} rotation={[0.2, 0, 0]}>
                <boxGeometry args={[1, 0.5, 0.3]} />
                <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.8} />
            </mesh>

            {/* HOLOGRAPHIC SKIN SHELL - Premium Visual */}
            <Sphere args={[1, 64, 64]} scale={[1.6, 2.4, 0.7]} position={[0, 0, 0]}>
                <MeshDistortMaterial
                    color="#00D1FF"
                    transparent
                    opacity={0.15}
                    distort={0.2}
                    speed={2}
                    roughness={0}
                    metalness={1}
                    emissive="#00D1FF"
                    emissiveIntensity={0.5}
                />
            </Sphere>

            {/* Internal Glow */}
            <pointLight position={[0, 0, 0]} color="#00D1FF" intensity={5} distance={3} />
        </group>
    );
}

export default function HandScene() {
    return (
        <div className="w-full h-full bg-[#020617]/50 rounded-[2rem] overflow-hidden">
            <Canvas shadows gl={{ preserveDrawingBuffer: true, antialias: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={35} />
                <OrbitControls enableDamping dampingFactor={0.05} autoRotate autoRotateSpeed={0.5} />

                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, -10, -10]} color="#7000FF" intensity={2} />
                <pointLight position={[0, 5, 5]} color="#00D1FF" intensity={1} />

                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    <HandModel />
                </Float>

                <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#000000" />
                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
