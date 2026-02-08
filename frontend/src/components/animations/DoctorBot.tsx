"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function DoctorBot() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isScanning, setIsScanning] = useState(false);

    const springConfig = { damping: 30, stiffness: 100, mass: 1 };
    const dx = useSpring(mouseX, springConfig);
    const dy = useSpring(mouseY, springConfig);

    const rotateX = useTransform(dy, [-500, 500], [10, -10]);
    const rotateY = useTransform(dx, [-500, 500], [-10, 10]);

    // Parallax layers for depth
    const headY = useTransform(dy, [-500, 500], [5, -5]);
    const bodyY = useTransform(dy, [-500, 500], [2, -2]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.1;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.1;
            mouseX.set(moveX);
            mouseY.set(moveY);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="relative w-full h-[650px] flex items-center justify-center perspective-[2000px] select-none scale-90 md:scale-100">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute inset-[10%] bg-gradient-to-tr from-[#00D1FF] to-[#7000FF] blur-[150px] rounded-full"
                />
            </div>

            {/* The Bot Structure */}
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                onClick={() => {
                    setIsScanning(true);
                    setTimeout(() => setIsScanning(false), 2000);
                }}
                className="relative z-10 w-[450px] h-[550px] flex flex-col items-center justify-center cursor-pointer transform-gpu"
            >
                {/* 1. Head Unit */}
                <motion.div
                    style={{ y: headY, transformStyle: "preserve-3d" }}
                    className="relative w-[280px] h-[230px] mb-[-40px] z-30"
                >
                    {/* Head Shell */}
                    <div className="absolute inset-0 bg-white rounded-[5.5rem] shadow-[inset_-20px_-20px_60px_rgba(0,0,0,0.1),0_40px_80px_rgba(0,0,0,0.2)] border-b-[12px] border-slate-200">
                        {/* Shimmer catch */}
                        <div className="absolute top-[10%] left-[20%] w-[35%] h-[20%] bg-white rounded-full blur-xl opacity-80" />
                        <div className="absolute bottom-[15%] right-[10%] w-[20%] h-[10%] bg-slate-200 rounded-full blur-md opacity-30" />
                    </div>

                    {/* Ear Antennas */}
                    {[true, false].map((isLeft, i) => (
                        <div key={i} className={`absolute -top-12 ${isLeft ? '-left-8' : '-right-8'} w-16 h-44 flex flex-col items-center`}>
                            <div className="w-12 h-12 bg-slate-200 rounded-2xl shadow-md border-b-4 border-slate-300" />
                            <div className="w-2.5 h-24 bg-slate-300 mx-auto" />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                className="w-10 h-10 rounded-full bg-white shadow-lg border-2 border-slate-100"
                            />
                        </div>
                    ))}

                    {/* Visor Area */}
                    <div className="absolute inset-x-6 top-12 bottom-8 bg-[#0a0f1a] rounded-[3.8rem] border-[8px] border-slate-800 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center overflow-hidden">
                        {/* HUD Elements */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/5 rounded-full" />

                        {/* Eyes Container */}
                        <div className="flex items-center justify-center gap-10 mt-2">
                            {[0, 1].map((idx) => (
                                <motion.div
                                    key={idx}
                                    animate={{
                                        scaleY: isScanning ? [1, 1] : [1, 1, 0.1, 1, 1],
                                        scale: isScanning ? 1.2 : 1
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, delay: idx * 0.2 + 2 }}
                                    className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#00D1FF] to-[#7000FF] p-[3px] shadow-[0_0_40px_rgba(0,209,255,0.5)] flex items-center justify-center"
                                >
                                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center relative">
                                        {/* Pupil Reflection */}
                                        <div className="w-10 h-10 rounded-full bg-[#00D1FF] flex items-center justify-center blur-[1px]">
                                            <div className="w-3 h-3 bg-white rounded-full blur-[1px] -translate-x-1 -translate-y-1" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mouth Line */}
                        <div className="mt-6 w-24 h-1.5 bg-slate-900 rounded-full opacity-50" />
                    </div>
                </motion.div>

                {/* 2. Body Unit */}
                <motion.div
                    style={{ y: bodyY, transformStyle: "preserve-3d" }}
                    className="relative w-[240px] h-[280px] z-20"
                >
                    {/* Lab Coat Chassis */}
                    <div className="absolute inset-0 bg-white rounded-t-[4.5rem] rounded-b-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-b-[10px] border-slate-200 overflow-hidden">
                        {/* Coat Labeled Section */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-slate-100 opacity-50" />

                        {/* Buttons */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-24 flex flex-col gap-8">
                            {[0, 1, 2].map(i => (
                                <div key={i} className="w-5 h-5 rounded-full bg-slate-100 border-2 border-slate-300 shadow-inner flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 opacity-20" />
                                </div>
                            ))}
                        </div>

                        {/* Stethoscope Chest Piece (Center) */}
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-slate-50 border border-slate-100 shadow-inner opacity-40" />

                        {/* Pockets */}
                        <div className="absolute bottom-12 left-8 w-14 h-16 border-t-[3px] border-slate-100 bg-slate-50/50 rounded-b-lg" />
                        <div className="absolute bottom-12 right-8 w-14 h-16 border-t-[3px] border-slate-100 bg-slate-50/50 rounded-b-lg" />
                    </div>

                    {/* Stethoscope Necklace */}
                    <div className="absolute top-[-20px] inset-x-6 h-56 pointer-events-none z-40">
                        {/* Tube */}
                        <div className="absolute inset-x-0 top-0 h-40 border-[10px] border-slate-800 rounded-full opacity-90" style={{ clipPath: 'inset(0 0 50% 0)' }} />
                        <div className="absolute bottom-12 left-2 w-10 h-32 border-l-[10px] border-slate-800 rounded-bl-[20px]" />

                        {/* Chest Piece */}
                        <motion.div
                            animate={{ rotate: [-2, 2, -2] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -bottom-16 left-[-15px] w-16 h-16 rounded-full bg-slate-200 border-4 border-slate-300 shadow-lg flex items-center justify-center p-2"
                        >
                            <div className="w-full h-full rounded-full bg-slate-300 shadow-inner border border-slate-400" />
                        </motion.div>
                    </div>

                    {/* Arms */}
                    {[true, false].map((isLeft, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                rotate: isLeft ? [15, 10, 15] : [-15, -10, -15],
                                y: [0, 5, 0]
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                            className={`absolute top-12 ${isLeft ? '-left-24' : '-right-24'} w-28 h-48`}
                        >
                            {/* Arm Base */}
                            <div className={`w-20 h-44 bg-white rounded-[2.5rem] shadow-xl border-b-[10px] border-slate-200 flex flex-col items-center justify-end pb-6`}>
                                {/* Shoulder Joint */}
                                <div className="absolute top-4 w-12 h-12 bg-slate-100 rounded-full shadow-inner opacity-50" />

                                {/* Hand Orbs */}
                                <div className="w-16 h-20 bg-slate-50 rounded-[2rem] border-t-8 border-slate-100 shadow-md transform-gpu" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 3. Legs & Feet */}
                <div className="flex gap-20 mt-[-30px] z-10">
                    {[0, 1].map(i => (
                        <div key={i} className="flex flex-col items-center">
                            {/* Leg segment */}
                            <div className="w-14 h-10 bg-slate-900 mb-[-5px]" />
                            {/* Foot */}
                            <div className="w-24 h-16 bg-white rounded-t-3xl rounded-b-2xl shadow-xl border-b-[12px] border-slate-200" />
                        </div>
                    ))}
                </div>

                {/* Floor Shadow */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -bottom-12 w-80 h-12 bg-black/20 blur-[30px] rounded-full -z-10"
                />
            </motion.div>

            {/* Hint Indicator */}
            <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-8 flex flex-col items-center gap-2"
            >
                <div className="w-1 h-8 bg-gradient-to-b from-[#00D1FF] to-transparent rounded-full" />
                <span className="text-[10px] font-black tracking-[0.6em] text-slate-500 uppercase">Interactive AI Core</span>
            </motion.div>
        </div>
    );
}
