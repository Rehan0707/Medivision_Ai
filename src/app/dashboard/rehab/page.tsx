"use client";

import { motion } from "framer-motion";
import { Zap, Calendar, Activity, CheckCircle2, ChevronRight, Play, Info, Timer, Target } from "lucide-react";
import { useState } from "react";

import RehabExerciseScene from "@/components/animations/RehabExerciseScene";
import RehabCalendar from "@/components/dashboard/RehabCalendar";
import DoctorCollaboration from "@/components/dashboard/DoctorCollaboration";

export default function RehabPage() {
    const exercises = [
        { title: "Dynamic Neural Stretch", duration: "12 min", intensity: "Low", status: "Compete" },
        { title: "Metacarpal articulation v4", duration: "8 min", intensity: "Med", status: "In Progress" },
        { title: "Vascular Expansion Flow", duration: "15 min", intensity: "Low", status: "Upcoming" }
    ];

    return (
        <div className="space-y-10 pb-12">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight italic uppercase">Recovery <span className="text-[#00D1FF]">Protocol</span></h1>
                    <p className="text-slate-400 font-medium">Personalized AI recovery pathways and physiological milestone tracking.</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-2xl glass-card border-white/5 flex items-center gap-3">
                        <Timer size={18} className="text-[#00D1FF]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#00D1FF]">DAY 14 / 30</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Protocol Overview */}
                <div className="lg:col-span-2 space-y-8">
                    {/* 3D Exercise Visualizer */}
                    <div className="relative aspect-video rounded-[3.5rem] overflow-hidden group">
                        <RehabExerciseScene />
                        <div className="absolute top-8 left-8 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 z-10">
                            <p className="text-[10px] font-black text-[#00D1FF] uppercase tracking-widest mb-1">Active Visual Guide</p>
                            <h4 className="text-lg font-black italic uppercase">Physiological Extension</h4>
                        </div>
                        <div className="absolute bottom-8 right-8 flex gap-4 z-10">
                            <button className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                                <Info size={20} />
                            </button>
                            <button className="px-8 py-3 rounded-2xl bg-[#00D1FF] text-black font-black text-xs uppercase tracking-widest shadow-xl shadow-[#00D1FF]/20">
                                FULL SCREEN
                            </button>
                        </div>
                    </div>

                    {/* Interactive Recovery Calendar */}
                    <RehabCalendar />

                    {/* Milestone Roadmap (Smaller) */}
                    <div className="p-10 rounded-[3rem] glass-morphism border-white/5 bg-white/[0.01]">
                        <h3 className="text-xl font-black mb-10 flex items-center gap-3 uppercase italic text-white">
                            <Target className="text-[#7000FF]" size={22} />
                            Functional Milestones
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-12 ml-4 border-l-2 border-white/5 pl-10 relative">
                                <Milestone date="Aug 12" title="Initial Assessment" status="done" />
                                <Milestone date="Aug 18" title="Baseline Stabilization" status="done" />
                            </div>
                            <div className="space-y-12 ml-4 border-l-2 border-white/5 pl-10 relative">
                                <Milestone date="Aug 25" title="Tissue Regen Phase 1" status="active" />
                                <Milestone date="Sep 02" title="Mobility Test" status="upcoming" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Exercises Sidebar */}
                <div className="space-y-8">
                    <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#00D1FF] to-[#7000FF] p-[1px]">
                        <div className="w-full h-full bg-[#020617] rounded-[2.4rem] p-8">
                            <h3 className="text-lg font-black mb-6 uppercase italic flex items-center gap-3">
                                <Play size={18} className="text-[#00D1FF]" /> Next Motion
                            </h3>
                            <div className="space-y-4">
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">Initialize the neural-sync to begin <span className="text-[#00D1FF]">Metacarpal articulation v4</span>.</p>
                                <button className="w-full py-4 rounded-xl bg-[#00D1FF] text-black font-black text-[10px] uppercase tracking-widest">
                                    START SESSION
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] glass-card border-white/5">
                        <h3 className="text-xs font-black mb-8 flex items-center gap-3 uppercase italic text-slate-500 tracking-widest">
                            Task Queue
                        </h3>
                        <div className="space-y-4">
                            {exercises.map((ex, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group cursor-pointer">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors">{ex.title}</h4>
                                        {ex.status === 'Compete' ? <CheckCircle2 size={16} className="text-emerald-500" /> : <ChevronRight size={16} className="text-slate-600" />}
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{ex.duration}</span>
                                        <span className="text-[9px] font-black text-[#00D1FF] uppercase tracking-widest">{ex.intensity} INTENSITY</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Doctor Collaboration Sidebar */}
                    <DoctorCollaboration />

                    <div className="p-8 rounded-[2.5rem] bg-[#7000FF]/5 border border-[#7000FF]/20 group hover:bg-[#7000FF]/10 transition-colors">
                        <div className="flex items-center gap-4 text-[#7000FF] mb-4">
                            <Zap size={24} className="group-hover:scale-110 transition-transform shadow-glow" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Motion Sensor Hub</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-bold italic">
                            "Optimal alignment detected. Your range of motion has improved by 4.2% in the last 24 hours."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Milestone({ date, title, status, description }: { date: string, title: string, status: 'done' | 'active' | 'upcoming', description?: string }) {
    return (
        <div className="relative">
            <div className={`absolute -left-[51px] top-0 w-10 h-10 rounded-full border-4 border-[#020617] flex items-center justify-center z-10 ${status === 'done' ? 'bg-emerald-500' :
                status === 'active' ? 'bg-[#00D1FF] shadow-[0_0_15px_rgba(0,209,255,0.5)]' :
                    'bg-slate-800'
                }`}>
                {status === 'done' && <CheckCircle2 size={16} className="text-white" />}
                {status === 'active' && <Zap size={16} className="text-black" />}
            </div>
            <div className="mb-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{date}</span>
                <h4 className={`text-lg font-black tracking-tight italic uppercase ${status === 'upcoming' ? 'text-slate-600' : 'text-white'}`}>{title}</h4>
            </div>
            {description && (
                <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-md">{description}</p>
            )}
        </div>
    );
}
