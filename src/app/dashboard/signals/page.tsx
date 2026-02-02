"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Activity, Zap, Info, TrendingUp, Heart, Wind, Droplets, AlertTriangle, ShieldCheck, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import ECGChart from "@/components/dashboard/ECGChart";

export default function SignalIntelligence() {
    const [activeSignal, setActiveSignal] = useState("ECG");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isIrregular, setIsIrregular] = useState(false);

    const signals = [
        { id: "ECG", name: "Electrocardiogram", icon: <Heart size={20} />, unit: "BPM", value: "72", color: "#00D1FF" },
        { id: "BP", name: "Blood Pressure", icon: <Droplets size={20} />, unit: "mmHg", value: "118/78", color: "#7000FF" },
        { id: "SPO2", name: "Oxygen Saturation", icon: <Wind size={20} />, unit: "%", value: "98", color: "#10b981" },
    ];

    const runNeuralAnalysis = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            // Simulate an irregular finding for demo if it's the second time
            if (activeSignal === "ECG") setIsIrregular(prev => !prev);
        }, 2000);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black tracking-tight mb-2">Signal <span className="text-[#00D1FF]">Intelligence</span></h2>
                    <p className="text-slate-500">Real-time physiological pattern recognition and neural translation.</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-4 py-2 rounded-xl glass-card flex items-center gap-3 border-[#00D1FF]/20">
                        <ShieldCheck size={16} className="text-[#00D1FF]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#00D1FF]">SIGNAL-ENCRYPTED-AES</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Signal Selector & Primary Stream */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-morphism rounded-[2.5rem] p-10 relative overflow-hidden h-[500px] border-white/5">
                        <div className="flex justify-between items-center mb-10">
                            <div className="flex gap-4">
                                {signals.map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => setActiveSignal(s.id)}
                                        className={`px-6 py-3 rounded-2xl flex items-center gap-3 transition-all ${activeSignal === s.id
                                            ? "bg-white text-black font-black shadow-2xl scale-105"
                                            : "text-slate-400 hover:text-white"
                                            }`}
                                    >
                                        {s.icon}
                                        <span className="text-xs font-black uppercase tracking-wider">{s.id}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Current Sync</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xl font-black text-white">LIVE STREAM</span>
                                </div>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="space-y-6">
                            <ECGChart isActive={activeSignal === "ECG"} isIrregular={isIrregular} />

                            <div className="grid grid-cols-3 gap-6">
                                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Current Rate</p>
                                    <h3 className="text-3xl font-black text-white">72 <span className="text-sm font-medium text-slate-400">BPM</span></h3>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Variability (HRV)</p>
                                    <h3 className="text-3xl font-black text-white">64 <span className="text-sm font-medium text-slate-400">ms</span></h3>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Signal Quality</p>
                                    <h3 className="text-3xl font-black text-emerald-400">99.8 <span className="text-sm font-medium text-slate-400">%</span></h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Stats Grid */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="p-10 rounded-[2.5rem] glass-card">
                            <h4 className="font-black mb-6 flex items-center gap-3 text-lg">
                                <TrendingUp className="text-[#00D1FF]" size={22} />
                                Neural Explanation
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                                {activeSignal === "ECG" && !isIrregular && "Standard sinus rhythm detected. Cycle alignment within 0.02ms tolerance. Neural engine suggests high cardiovascular efficiency."}
                                {activeSignal === "ECG" && isIrregular && "Minor irregular rhythm pattern detected. This is not a formal diagnosis, but medical review of this specific cycle is recommended."}
                                {activeSignal !== "ECG" && "Steady-state signal detected. Pattern matches baseline health profile for adult cohort (30-45y)."}
                            </p>
                            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                                <Info size={16} className="text-emerald-400" />
                                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Baseline Sync Verified</span>
                            </div>
                        </div>
                        <div className="p-10 rounded-[2.5rem] glass-card">
                            <h4 className="font-black mb-6 flex items-center gap-3 text-lg">
                                <Zap className="text-yellow-400" size={22} />
                                Pattern Recognition
                            </h4>
                            <div className="space-y-4">
                                <SignalMetric label="P-Wave Stability" value="Normal" progress={92} />
                                <SignalMetric label="QRS Complex Width" value="0.08s" progress={85} />
                                <SignalMetric label="T-Wave Amplitude" value="0.5mV" progress={78} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Insights Sidebar */}
                <div className="space-y-8">
                    <div className="p-10 rounded-[3rem] glass-morphism border-[#00D1FF]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D1FF]/5 blur-[60px] rounded-full" />

                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-14 h-14 rounded-2xl bg-[#00D1FF]/10 flex items-center justify-center text-[#00D1FF] border border-[#00D1FF]/20">
                                <Activity size={28} />
                            </div>
                            <div>
                                <h3 className="font-black text-2xl tracking-tight">Signal AI</h3>
                                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">RHYTHM-V4</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Live Analysis</h4>
                                    <button
                                        onClick={runNeuralAnalysis}
                                        disabled={isAnalyzing}
                                        className="flex items-center gap-2 text-[10px] font-black text-[#00D1FF] hover:scale-105 transition-transform"
                                    >
                                        <Sparkles size={12} className={isAnalyzing ? "animate-spin" : ""} />
                                        {isAnalyzing ? "Processing..." : "Run Analysis"}
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-sm text-slate-300">
                                        The AI is currently monitoring the {activeSignal} stream for micro-fluctuations.
                                    </p>
                                    {isIrregular && (
                                        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-4">
                                            <AlertTriangle size={18} className="shrink-0 mt-1" />
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-wider mb-1">Neural Warning</p>
                                                <p className="text-[11px] leading-relaxed">Arrhythmia pattern detected in Metrical Zone 4. Predictive engine recommends a full clinical consult.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <button className="w-full py-5 rounded-2xl bg-[#00D1FF] text-black font-black text-sm tracking-wide hover:shadow-[0_0_30px_rgba(0,209,255,0.4)] transition-all">
                                    EXPORT WAVE DATA
                                </button>
                                <button className="w-full py-5 rounded-2xl border border-white/10 font-bold text-sm bg-white/5 hover:bg-white/10 transition-colors">
                                    VIEW TREND HISTORY
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SignalMetric({ label, value, progress }: { label: string, value: string, progress: number }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.1em]">
                <span className="text-slate-500">{label}</span>
                <span className="text-white">{value}</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-[#00D1FF] to-[#7000FF]"
                />
            </div>
        </div>
    );
}
