"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Play, ChevronRight, Clock, Target, Zap, Heart, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

const rehabData: Record<string, any> = {
    hand: {
        exercises: [
            { id: 1, name: "Finger Extensions", duration: "10 mins", difficulty: "Easy", reps: "3 sets | 12 reps", progress: 100 },
            { id: 2, name: "Volar Stretching", duration: "15 mins", difficulty: "Medium", reps: "3 sets | 10 reps", progress: 45 },
            { id: 3, name: "Grip Initialization", duration: "20 mins", difficulty: "Low", reps: "Continuous", progress: 0 },
        ],
        milestones: ["Inflammation Control", "Tendon Gliding", "Grip Strength", "Full Dexterity"],
        guidance: "Focus on slow, controlled movements. Avoid heavy lifting for the next 14 days. Neural pathways are currently recalibrating fine motor control."
    },
    brain: {
        exercises: [
            { id: 1, name: "Cognitive Load Training", duration: "15 mins", difficulty: "Medium", reps: "2 sessions", progress: 100 },
            { id: 2, name: "Visual Processing Task", duration: "10 mins", difficulty: "Low", reps: "5 sets", progress: 20 },
            { id: 3, name: "Memory Recall Logic", duration: "20 mins", difficulty: "High", reps: "Daily", progress: 0 },
        ],
        milestones: ["Neuro-stability", "Visual Focus", "Short-term Recall", "Executive Function"],
        guidance: "Prioritize sleep hygiene (8h+). Reduce blue light exposure. Cerebral voxels show steady recovery in the temporal lobe."
    },
    default: {
        exercises: [
            { id: 1, name: "Basic Mobility", duration: "15 mins", difficulty: "Low", reps: "3 sets", progress: 50 },
            { id: 2, name: "Isometric Holds", duration: "10 mins", difficulty: "Medium", reps: "5 reps", progress: 10 },
        ],
        milestones: ["Pain Management", "Range of Motion", "Weight Bearing", "Stability"],
        guidance: "Consistency is key. The neural engine recommends staying within the 'low stress' zone for 7 more days."
    }
};

export default function RehabPage() {
    const { t } = useSettings();
    const [detectedPart] = useState<string>("hand"); // This could be synced from a global state/DB later
    const data = rehabData[detectedPart as keyof typeof rehabData] || rehabData.default;

    return (
        <div className="space-y-10 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight">Recovery <span className="text-[#7000FF]">Roadmap</span></h1>
                    <p className="text-slate-400">Personalized rehabilitation protocols for {detectedPart.toUpperCase()} integrity.</p>
                </div>
                <div className="flex items-center gap-6 glass-card px-8 py-4 rounded-3xl border-[#00D1FF]/20 shadow-xl shadow-[#00D1FF]/5">
                    <div className="text-right">
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Total Mobility</p>
                        <p className="text-3xl font-black text-[#00D1FF]">32<span className="text-sm font-bold opacity-50">%</span></p>
                    </div>
                    <div className="w-32 h-2.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "32%" }}
                            transition={{ duration: 1.5 }}
                            className="h-full bg-gradient-to-r from-[#00D1FF] to-[#7000FF]"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="p-10 glass-morphism rounded-[3rem] relative overflow-hidden border-white/5 shadow-2xl">
                        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                            <Activity className="text-[#00D1FF]" size={180} />
                        </div>

                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl font-black tracking-tight">Prescribed Regimen</h2>
                            <div className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-[#00D1FF] bg-[#00D1FF]/10 px-4 py-1.5 rounded-full border border-[#00D1FF]/20">
                                <Zap size={12} className="animate-pulse" />
                                Week 2: Initial Stress
                            </div>
                        </div>

                        <div className="space-y-4">
                            {data.exercises.map((ex: any) => (
                                <motion.div
                                    key={ex.id}
                                    whileHover={{ x: 10 }}
                                    className="p-6 glass-card rounded-[2rem] flex items-center justify-between group cursor-pointer border-white/5 hover:border-[#00D1FF]/30 transition-all"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${ex.progress === 100 ? "bg-emerald-500/20 text-emerald-400" : "bg-[#00D1FF]/10 text-[#00D1FF]"
                                            }`}>
                                            <Play size={24} fill="currentColor" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{ex.name}</h4>
                                            <div className="flex items-center gap-4">
                                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Clock size={12} /> {ex.duration}
                                                </p>
                                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{ex.reps}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-10">
                                        <div className="text-right hidden sm:block">
                                            <div className="flex justify-between text-[10px] items-center mb-2">
                                                <span className="text-slate-500 font-black uppercase tracking-widest mr-4">Success</span>
                                                <span className="font-bold">{ex.progress}%</span>
                                            </div>
                                            <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full ${ex.progress === 100 ? "bg-emerald-500" : "bg-[#00D1FF]"}`} style={{ width: `${ex.progress}%` }} />
                                            </div>
                                        </div>
                                        <ArrowUpRight size={20} className="text-slate-600 group-hover:text-white transition-colors" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="p-10 glass-card rounded-[3rem] border-[#7000FF]/10 relative overflow-hidden bg-[#7000FF]/[0.02]">
                        <h3 className="text-xl font-black mb-10 flex items-center gap-3 text-[#7000FF]">
                            <Zap size={22} />
                            Neural Guidance
                        </h3>
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 mb-10 italic text-slate-300 leading-relaxed">
                            "{data.guidance}"
                        </div>

                        <div className="relative h-32 flex items-center px-4">
                            <div className="absolute w-[calc(100%-32px)] h-1 bg-white/5 top-1/2 -translate-y-1/2 rounded-full" />
                            <div className="absolute w-[32%] h-1 bg-gradient-to-r from-[#00D1FF] to-[#7000FF] top-1/2 -translate-y-1/2 rounded-full" />

                            {data.milestones.map((milestone: string, idx: number) => (
                                <div
                                    key={idx}
                                    className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 flex items-center justify-center transition-all ${idx <= 1 ? "bg-[#00D1FF] border-[#020617] scale-110 shadow-[0_0_20px_rgba(0,209,255,0.4)]" : "bg-[#020617] border-white/10"
                                        }`}
                                    style={{ left: `${(idx / (data.milestones.length - 1)) * 100}%` }}
                                >
                                    <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap text-slate-500">
                                        {milestone}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="p-8 glass-morphism rounded-[2.5rem] border-[#7000FF]/20 bg-[#7000FF]/5">
                        <h3 className="font-black text-sm uppercase tracking-[0.3em] mb-6 flex items-center gap-2 text-[#7000FF]">
                            <Target size={18} />
                            Daily Objectives
                        </h3>
                        <div className="space-y-5">
                            <GoalItem text="Morning stretch sequence" completed />
                            <GoalItem text="4L hydration protocol" />
                            <GoalItem text="Evening mobility session" />
                            <GoalItem text="Volar splint hygiene" />
                        </div>
                    </div>

                    <div className="p-8 glass-card rounded-[2.5rem] border-white/5 group hover:border-[#00D1FF]/30 transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Health Matrix</h4>
                                <p className="text-xl font-black tracking-tight">Stability Optimal</p>
                            </div>
                            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                                <Heart size={20} className="animate-pulse" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between text-[11px] font-bold">
                                <span className="text-slate-500 uppercase">Bone Mineral Density</span>
                                <span className="text-emerald-400">NORMAL</span>
                            </div>
                            <div className="flex justify-between text-[11px] font-bold">
                                <span className="text-slate-500 uppercase">Inflammation Level</span>
                                <span className="text-[#00D1FF]">LOW</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-white text-black relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <ShieldCheck size={120} />
                        </div>
                        <h4 className="font-black text-lg mb-2">Certify Completion</h4>
                        <p className="text-xs text-slate-600 mb-6 leading-relaxed">Securely upload your progress data to the clinical cloud for doctor review.</p>
                        <button className="w-full py-4 rounded-2xl bg-black text-white font-black text-xs tracking-widest uppercase hover:px-8 transition-all">
                            SYNC PROGRESS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function GoalItem({ text, completed = false }: { text: string; completed?: boolean }) {
    return (
        <div className={`flex items-center gap-4 transition-all ${completed ? "opacity-40" : ""}`}>
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${completed ? "bg-[#7000FF] border-[#7000FF]" : "bg-white/5 border-white/10"
                }`}>
                {completed && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
            <span className={`text-[13px] font-semibold ${completed ? "line-through text-slate-500" : "text-slate-300"}`}>{text}</span>
        </div>
    );
}
