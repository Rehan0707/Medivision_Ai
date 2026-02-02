"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface ECGChartProps {
    isActive: boolean;
    isIrregular?: boolean;
}

export default function ECGChart({ isActive, isIrregular = false }: ECGChartProps) {
    const [points, setPoints] = useState<number[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isActive) return;

        let frame = 0;
        const interval = setInterval(() => {
            frame++;
            setPoints(prev => {
                let newVal = 50;

                // Base rhythm
                const cycle = frame % 40;

                if (cycle === 0) { // P Wave
                    newVal = 45;
                } else if (cycle === 5) { // Q
                    newVal = 55;
                } else if (cycle === 7) { // R (Spike)
                    newVal = 10;
                } else if (cycle === 9) { // S
                    newVal = 70;
                } else if (cycle === 15) { // T Wave
                    newVal = 40;
                } else if (isIrregular && frame % 120 === 0) { // Random skip for "irregular"
                    newVal = 50;
                } else {
                    // Slight noise
                    newVal = 50 + (Math.random() - 0.5) * 2;
                }

                const newPoints = [...prev, newVal];
                return newPoints.slice(-100); // Keep last 100 points
            });
        }, 50);

        return () => clearInterval(interval);
    }, [isActive, isIrregular]);

    return (
        <div ref={containerRef} className="w-full h-48 bg-black/40 rounded-2xl border border-white/5 relative overflow-hidden flex items-end">
            <div className="absolute inset-0 medical-grid opacity-10" />

            <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="ecg-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#00D1FF" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Connection Line */}
                <motion.path
                    d={`M ${points.map((p, i) => `${(i / 100) * 1000},${p}`).join(' L ')}`}
                    fill="none"
                    stroke="#00D1FF"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    initial={false}
                />

                {/* Glow Area */}
                <motion.path
                    d={`M 0,100 L ${points.map((p, i) => `${(i / 100) * 1000},${p}`).join(' L ')} L 1000,100 Z`}
                    fill="url(#ecg-gradient)"
                    initial={false}
                />

                {/* Current Pulse Point */}
                {points.length > 0 && (
                    <motion.circle
                        cx={(points.length - 1) * 10}
                        cy={points[points.length - 1]}
                        r="4"
                        fill="#00D1FF"
                        className="shadow-[0_0_10px_rgba(0,209,255,1)]"
                    />
                )}
            </svg>

            {/* Scanning Line overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00D1FF]/5 to-transparent w-20 animate-scan pointer-events-none" />
        </div>
    );
}
