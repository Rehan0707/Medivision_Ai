"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bone, Activity, ShieldCheck, WifiOff, ArrowRight } from "lucide-react";
import BoneScene from "@/components/animations/BoneScene";
import { useSettings } from "@/context/SettingsContext";

export default function VisualizerPage() {
    const { isRuralMode, setIsRuralMode } = useSettings();
    const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

    const hotspots = [
        { id: 'proximal', position: [0, 0.8, 0.4] as [number, number, number], label: "FRACTURE: PROXIMAL" },
        { id: 'density', position: [0, -0.5, -0.4] as [number, number, number], label: "DENSITY ANOMALY" },
        { id: 'distal', position: [0, -1.2, 0.2] as [number, number, number], label: "HAIRLINE: DISTAL" }
    ];

    return (
        <div className="space-y-8 h-full flex flex-col">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight">3D Visualizer <span className="text-[#00D1FF] text-sm font-black uppercase tracking-[0.3em] ml-4 bg-[#00D1FF]/10 px-3 py-1 rounded-full border border-[#00D1FF]/20">Active Engine: V-3.1</span></h1>
                    <p className="text-slate-400">Volumetric rendering of high-fidelity DICOM datasets.</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Render Quality</p>
                        <p className={`text-sm font-bold ${isRuralMode ? 'text-orange-400' : 'text-emerald-400'}`}>
                            {isRuralMode ? 'SD (RURAL)' : 'ULTRA HD'}
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-[#00D1FF]">
                        <Activity size={20} className="animate-pulse" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1">
                <div className="lg:col-span-3 min-h-[600px] glass-morphism rounded-[2.5rem] relative overflow-hidden group shadow-2xl border-white/5">
                    <div className="absolute inset-0 medical-grid opacity-10" />

                    {/* Real 3D Canvas or Optimized Placeholder */}
                    <div className="absolute inset-0">
                        {!isRuralMode ? (
                            <BoneScene hotspots={hotspots} activeHotspotId={activeHotspotId} />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/50">
                                <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4 border border-orange-500/20">
                                    <WifiOff size={40} />
                                </div>
                                <h3 className="text-xl font-bold">3D Rendering Suspended</h3>
                                <p className="text-slate-500 text-sm">Rural mode is active. High-bandwidth 3D assets are disabled.</p>
                                <button
                                    onClick={() => setIsRuralMode(false)}
                                    className="mt-6 px-6 py-2 rounded-xl bg-orange-500 text-black text-xs font-black hover:scale-105 transition-all shadow-lg shadow-orange-500/20"
                                >
                                    SWITCH TO HIGH-BANDWIDTH
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Technical HUD Overlay */}
                    <div className="absolute top-10 left-10 flex flex-col gap-2 pointer-events-none z-10">
                        <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-[10px] font-black tracking-widest text-[#00D1FF] uppercase">
                            X-RAY VOXEL: 0.124mm
                        </div>
                        <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                            THICKNESS: 2.1cm
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end pointer-events-none z-10">
                        <div className="flex gap-3 pointer-events-auto">
                            <button
                                onClick={() => setActiveHotspotId(null)}
                                className="px-6 py-3 rounded-xl bg-[#00D1FF] text-black text-xs font-black shadow-lg hover:scale-105 transition-transform"
                            >
                                {activeHotspotId ? "RESET VIEW" : "ROTATION: AUTO"}
                            </button>
                            <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-black hover:bg-white/10 transition-all">SLICE COMPOSITE</button>
                        </div>
                        <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 max-w-sm pointer-events-auto">
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`w-2 h-2 rounded-full ${activeHotspotId ? 'bg-[#00D1FF] shadow-[0_0_10px_#00D1FF]' : 'bg-[#ff3e3e] animate-ping'}`} />
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${activeHotspotId ? 'text-[#00D1FF]' : 'text-[#ff3e3e]'}`}>
                                    {activeHotspotId ? "Hotspot Locked" : "Injury Detected"}
                                </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                {activeHotspotId
                                    ? `Direct visualization of the ${activeHotspotId} zone. Structural integrity analysis in progress.`
                                    : "Hairline fracture located in the proximal segment. 0.2mm displacement recorded."
                                }
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-8 glass-card rounded-[2rem] border-[#00D1FF]/10">
                        <h3 className="font-black text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                            <Activity size={18} className="text-[#00D1FF]" />
                            Neural Findings
                        </h3>
                        <div className="space-y-4">
                            {hotspots.map((hs) => (
                                <button
                                    key={hs.id}
                                    onClick={() => setActiveHotspotId(hs.id)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all ${activeHotspotId === hs.id ? 'bg-[#00D1FF]/10 border-[#00D1FF]/30 ring-1 ring-[#00D1FF]/20' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                                >
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1 tracking-widest">{hs.label}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-black">STRESS DETECTED</span>
                                        <ArrowRight size={12} className={activeHotspotId === hs.id ? 'text-[#00D1FF]' : 'text-slate-600'} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 glass-morphism rounded-[2rem] border-emerald-500/20 bg-emerald-500/5">
                        <h3 className="font-black text-sm uppercase tracking-[0.2em] mb-4 flex items-center gap-3 text-emerald-400">
                            <ShieldCheck size={18} />
                            AI Verified
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed italic">
                            "Structural analysis consistent with clean-edge fracture. No micro-fragmentation detected in sub-voxel parsing."
                        </p>
                    </div>

                    <button className="w-full py-5 rounded-2xl bg-white text-black font-black text-xs tracking-[0.1em] uppercase hover:scale-[1.02] transition-transform shadow-2xl">
                        EXPORT 3D STL
                    </button>
                </div>
            </div>
        </div>
    );
}

function MetricItem({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <div>
            <div className="flex justify-between text-[11px] font-bold mb-2">
                <span className="text-slate-500 uppercase tracking-widest">{label}</span>
                <span style={{ color }}>{value}</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: value }}
                    transition={{ duration: 1.5 }}
                    className="h-full"
                    style={{ backgroundColor: color }}
                />
            </div>
        </div>
    );
}
