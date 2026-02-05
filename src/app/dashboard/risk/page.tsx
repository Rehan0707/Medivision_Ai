"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Target, Zap, Activity, AlertTriangle, TrendingDown, Info, ChevronRight, Brain, Heart, Bone } from "lucide-react";
import { useState, useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";

export default function RiskSentinelPage() {
    const { isRuralMode, isPrivacyMode } = useSettings();
    const [scannedRegions, setScannedRegions] = useState<any[]>([]);
    const [isSimulating, setIsSimulating] = useState(false);

    const risks = [
        {
            id: 'R-992',
            region: "Left Forearm",
            type: "Structural Degradation",
            probability: 14,
            timeframe: "3-6 months",
            severity: "low",
            icon: Bone,
            insight: "Pattern indicates slight bone density variance near the previous fracture site."
        },
        {
            id: 'R-441',
            region: "Cardiovascular",
            type: "Artery Elasticity",
            probability: 22,
            timeframe: "12 months",
            severity: "medium",
            icon: Heart,
            insight: "Slight decrease in myocardial efficiency detected during high-intensity signal streams."
        },
        {
            id: 'R-001',
            region: "Neural Pathways",
            type: "Synaptic Latency",
            probability: 8,
            timeframe: "Indefinite",
            severity: "low",
            icon: Brain,
            insight: "Neural vigor indices remain stable, with minimal risk of motor skill regression."
        }
    ];

    const simulateRisks = () => {
        setIsSimulating(true);
        setTimeout(() => {
            setScannedRegions(risks);
            setIsSimulating(false);
        }, 2500);
    };

    useEffect(() => {
        simulateRisks();
    }, []);

    return (
        <div className="space-y-10 pb-12">
            <div className="flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-3 text-red-500 mb-2">
                        <ShieldAlert size={20} className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Risk Protocol Active</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight italic uppercase">Risk <span className="text-[#00D1FF]">Sentinel</span></h1>
                    <p className="text-slate-400 font-medium">Predictive health trajectory simulation powered by Synapse-X Neural Engine.</p>
                </div>

                <button
                    onClick={simulateRisks}
                    disabled={isSimulating}
                    className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3"
                >
                    <Zap size={16} className={isSimulating ? "animate-pulse text-[#00D1FF]" : "text-yellow-500"} />
                    {isSimulating ? "Re-Simulating Evolution..." : "Run New Projection"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 3D Risk Map Placeholder (High Fidelity UI) */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="p-10 rounded-[3.5rem] glass-morphism border-white/5 bg-black/40 relative overflow-hidden min-h-[500px] flex items-center justify-center">
                        <div className="absolute inset-0 medical-grid opacity-20" />

                        {/* 3D Simulation Overlay */}
                        <div className="relative z-10 text-center space-y-8">
                            {isSimulating ? (
                                <div className="space-y-6">
                                    <div className="w-32 h-32 rounded-full border-t-2 border-[#00D1FF] animate-spin mx-auto" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Mapping Trajectory Vectors...</p>
                                </div>
                            ) : (
                                <div className="relative">
                                    {/* Central Human Silhouette Visual */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="relative w-64 h-96 mx-auto opacity-40 grayscale"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-b from-[#00D1FF]/20 to-transparent blur-3xl rounded-full" />
                                        <div className="w-full h-full border-2 border-white/10 rounded-full flex items-center justify-center italic text-white/10 text-8xl font-black select-none uppercase">HUMAN</div>
                                    </motion.div>

                                    {/* Risk Markers */}
                                    <RiskMarker top="20%" left="45%" label="Neural" active={true} delay={0.2} />
                                    <RiskMarker top="45%" left="52%" label="Cardiac" active={true} delay={0.4} />
                                    <RiskMarker top="60%" left="38%" label="L-Forearm" active={true} delay={0.6} />
                                </div>
                            )}
                        </div>

                        {/* HUD Elements */}
                        <div className="absolute top-10 left-10 p-4 border-l border-white/10">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Analysis Points</p>
                            <p className="text-2xl font-black italic">14,882</p>
                        </div>
                        <div className="absolute top-10 right-10 p-4 border-r border-white/10 text-right">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Simulation Accuracy</p>
                            <p className="text-2xl font-black italic">98.4%</p>
                        </div>

                        {isRuralMode && (
                            <div className="absolute bottom-10 left-10 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 max-w-xs">
                                <div className="flex items-center gap-3 text-emerald-400 mb-2">
                                    <Target size={18} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Rural Risk Layer</span>
                                </div>
                                <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                                    Analyzing environmental data: Local water quality and specialist proximity integrated into projection.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-[2.5rem] glass-card border-white/5 bg-white/[0.01]">
                            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
                                <TrendingDown size={14} className="text-red-400" />
                                Prevention Strategy
                            </h4>
                            <p className="text-sm text-slate-300 font-medium leading-relaxed mb-6 italic">
                                "Increasing daily hydration and specific localized stretching can reduce structural risk in the left forearm by up to 34%."
                            </p>
                            <button className="text-[10px] font-black text-[#00D1FF] uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
                                VIEW INTERVENTION PLAN <ChevronRight size={14} />
                            </button>
                        </div>
                        <div className="p-8 rounded-[2.5rem] glass-card border-[#7000FF]/20 bg-[#7000FF]/5">
                            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-[#7000FF] mb-6 flex items-center gap-2">
                                <AlertTriangle size={14} />
                                Critical Window
                            </h4>
                            <p className="text-sm text-slate-300 font-medium leading-relaxed mb-6">
                                The next **45 days** are vital for cardiovascular stabilization. Consistent signal tracking is advised.
                            </p>
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500">
                                <Info size={12} /> STATUS: MONITORING
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Risk Inventory */}
                <div className="space-y-8">
                    <h3 className="font-black text-xs uppercase tracking-[0.3em] text-slate-500 px-4">Projections Inventory</h3>
                    <div className="space-y-4">
                        {scannedRegions.map((risk, idx) => (
                            <motion.div
                                key={risk.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-[#00D1FF] transition-colors">
                                        <risk.icon size={24} />
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${risk.severity === 'medium' ? 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5' : 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5'
                                        }`}>
                                        {risk.severity === 'medium' ? 'Mod-Risk' : 'Low-Risk'}
                                    </div>
                                </div>
                                <h4 className="font-black text-lg mb-1">{risk.region}</h4>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{risk.type}</p>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium mb-6">
                                    {risk.insight}
                                </p>
                                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest pt-4 border-t border-white/5">
                                    <span className="text-slate-600">Timeframe: {risk.timeframe}</span>
                                    <span className="text-white">{risk.probability}% Prob</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function RiskMarker({ top, left, label, active, delay }: any) {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay, type: "spring" }}
            className="absolute flex items-center gap-4 group cursor-pointer"
            style={{ top, left }}
        >
            <div className="relative">
                <div className="w-4 h-4 rounded-full bg-red-500 animate-ping absolute inset-0 opacity-40" />
                <div className="w-4 h-4 rounded-full bg-red-500 relative shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
            </div>
            <div className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap">{label} RISK detected</span>
            </div>
        </motion.div>
    );
}
