"use client";

import { motion } from "framer-motion";
import {
    TrendingUp,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Zap,
    Brain,
    ShieldCheck,
    Calendar,
    Target
} from "lucide-react";
import { useState } from "react";

export default function TrendsPage() {
    const [activeView, setActiveView] = useState("Mobility");

    const trendData = [
        { month: "Sep", mobility: 40, inflammation: 80, recovery: 20 },
        { month: "Oct", mobility: 45, inflammation: 70, recovery: 35 },
        { month: "Nov", mobility: 60, inflammation: 50, recovery: 55 },
        { month: "Dec", mobility: 75, inflammation: 30, recovery: 80 },
        { month: "Jan", mobility: 88, inflammation: 15, recovery: 92 },
    ];

    return (
        <div className="space-y-10 pb-12">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight">Health <span className="text-[#00D1FF]">Trends</span></h1>
                    <p className="text-slate-400">Long-term predictive analysis of recovery and physiological data.</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-2xl glass-card flex items-center gap-3 border-[#00D1FF]/20 shadow-xl shadow-[#00D1FF]/5">
                        <ShieldCheck size={18} className="text-[#00D1FF]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#00D1FF]">Trend Analysis ACTIVE</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Trend Chart */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="p-10 glass-morphism rounded-[3rem] border-white/5 relative overflow-hidden h-[600px]">
                        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                            <TrendingUp size={200} className="text-[#00D1FF]" />
                        </div>

                        <div className="flex justify-between items-center mb-12">
                            <div className="flex gap-4">
                                {["Mobility", "Healing", "Inflammation"].map(v => (
                                    <button
                                        key={v}
                                        onClick={() => setActiveView(v)}
                                        className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === v
                                                ? "bg-white text-black shadow-2xl scale-105"
                                                : "text-slate-500 hover:text-white bg-white/5"
                                            }`}
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#00D1FF]" /> Observed</span>
                                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#7000FF] opacity-30" /> Predicted</span>
                            </div>
                        </div>

                        {/* Custom SVG Chart */}
                        <div className="h-[300px] w-full relative group">
                            <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="trend-grad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.4" />
                                        <stop offset="100%" stopColor="#00D1FF" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* Grid Lines */}
                                {[0, 1, 2, 3].map(i => (
                                    <line key={i} x1="0" y1={i * 100} x2="1000" y2={i * 100} stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                                ))}

                                {/* Data Path */}
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    d="M 50,250 L 250,220 L 450,150 L 650,100 L 850,40"
                                    fill="none"
                                    stroke="#00D1FF"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />

                                {/* Area Fill */}
                                <motion.path
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    d="M 50,250 L 250,220 L 450,150 L 650,100 L 850,40 L 850,300 L 50,300 Z"
                                    fill="url(#trend-grad)"
                                />

                                {/* Prediction Line (Dashed) */}
                                <line x1="850" y1="40" x2="980" y2="10" stroke="#7000FF" strokeWidth="2" strokeDasharray="8,8" />

                                {/* Points */}
                                {[50, 250, 450, 650, 850].map((x, i) => (
                                    <g key={i}>
                                        <circle cx={x} cy={[250, 220, 150, 100, 40][i]} r="6" fill="#00D1FF" className="shadow-lg" />
                                        <circle cx={x} cy={[250, 220, 150, 100, 40][i]} r="12" fill="#00D1FF" fillOpacity="0.1" className="animate-pulse" />
                                    </g>
                                ))}
                            </svg>

                            <div className="flex justify-between mt-8 px-4">
                                {trendData.map(d => (
                                    <div key={d.month} className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{d.month}</div>
                                ))}
                                <div className="text-[10px] font-black text-[#7000FF] uppercase tracking-widest">Feb (Exp)</div>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/5">
                            <TrendSmallStat label="Net Recovery" value="+48%" icon={<ArrowUpRight size={14} />} color="text-emerald-400" />
                            <TrendSmallStat label="Peak Progress" value="Dec 24" icon={<Calendar size={14} />} color="text-[#00D1FF]" />
                            <TrendSmallStat label="Risk Variance" value="-12%" icon={<ArrowDownRight size={14} />} color="text-[#00D1FF]" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="p-10 rounded-[3rem] glass-card">
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                <Zap className="text-yellow-400" size={22} />
                                Efficiency Score
                            </h3>
                            <div className="flex items-center gap-8">
                                <div className="relative w-32 h-32">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="64" cy="64" r="58" fill="transparent" stroke="white" strokeOpacity="0.05" strokeWidth="12" />
                                        <motion.circle
                                            initial={{ strokeDashoffset: 364 }}
                                            animate={{ strokeDashoffset: 364 - (364 * 0.92) }}
                                            transition={{ duration: 2 }}
                                            cx="64" cy="64" r="58" fill="transparent" stroke="#00D1FF" strokeWidth="12" strokeDasharray="364" strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-2xl font-black text-white">92%</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        Your body is responding to rehabilitation protocols faster than 85% of patients in your demographic.
                                    </p>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                                        <Target size={12} /> Optimal Response Detected
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-10 rounded-[3rem] glass-card">
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                <Activity className="text-[#7000FF]" size={22} />
                                Neural Continuity
                            </h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Signal Stability</p>
                                        <p className="text-2xl font-black">98.4%</p>
                                    </div>
                                    <div className="h-10 w-32 flex items-end gap-1">
                                        {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex-1 bg-gradient-to-t from-[#7000FF]/20 to-[#7000FF] rounded-t-sm"
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed italic">
                                    "Long-term variability indicates a stabilized autonomic response after Week 4 intervention."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Predictive Sidebar */}
                <div className="space-y-8">
                    <div className="p-10 rounded-[3rem] glass-morphism border-[#7000FF]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#7000FF]/5 blur-[60px] rounded-full" />

                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-14 h-14 rounded-2xl bg-[#7000FF]/10 flex items-center justify-center text-[#7000FF] border border-[#7000FF]/20">
                                <Brain size={28} />
                            </div>
                            <div>
                                <h3 className="font-black text-2xl tracking-tight">AI Prognosis</h3>
                                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">TREND-V2</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4">
                                <div className="flex items-center gap-3 text-emerald-400">
                                    <TrendingUp size={18} />
                                    <span className="text-xs font-black uppercase tracking-widest">Positive Trajectory</span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    Based on current volumetric data, full mechanical integrity of the {activeView.toLowerCase()} cycle is expected by **Feb 18, 2026**.
                                </p>
                            </div>

                            <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 space-y-4">
                                <div className="flex items-center gap-3 text-amber-400">
                                    <AlertTriangle size={18} />
                                    <span className="text-xs font-black uppercase tracking-widest">Predictive Risk</span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    Possible stagnation in distal mobility detected if daily stress cycles exceed **14% variability**.
                                </p>
                                <button className="text-[10px] font-black text-amber-400 uppercase tracking-widest hover:underline">
                                    Adjust Protocol →
                                </button>
                            </div>

                            <div className="space-y-4 pt-4">
                                <button className="w-full py-5 rounded-2xl bg-white text-black font-black text-sm tracking-wide hover:scale-105 transition-all shadow-2xl">
                                    GENERATE TREND REPORT
                                </button>
                                <button className="w-full py-5 rounded-2xl border border-white/10 font-bold text-sm bg-white/5 hover:bg-white/10 transition-colors">
                                    SYNC CLINICAL DATA
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 rounded-[3rem] glass-card border-white/5">
                        <h4 className="font-black text-slate-500 uppercase tracking-widest text-[10px] mb-8">Data Sources</h4>
                        <div className="space-y-6">
                            <SourceItem icon={<Activity size={14} />} name="Physiological Stream" date="Live" />
                            <SourceItem icon={<TrendingUp size={14} />} name="3D Volumetric History" date="Jan 28" />
                            <SourceItem icon={<ShieldCheck size={14} />} name="Clinical Lab Record" date="Jan 15" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TrendSmallStat({ label, value, icon, color }: { label: string, value: string, icon: any, color: string }) {
    return (
        <div className="text-center">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{label}</p>
            <div className={`text-2xl font-black flex items-center justify-center gap-2 ${color}`}>
                {value}
                <span className="opacity-50">{icon}</span>
            </div>
        </div>
    );
}

function SourceItem({ icon, name, date }: { icon: any, name: string, date: string }) {
    return (
        <div className="flex justify-between items-center group cursor-pointer">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 text-slate-500 group-hover:text-[#00D1FF] transition-colors">{icon}</div>
                <span className="text-xs font-bold text-slate-300">{name}</span>
            </div>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{date}</span>
        </div>
    );
}
