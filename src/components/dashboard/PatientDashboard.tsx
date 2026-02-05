"use client";

import { motion } from "framer-motion";
import { Activity, Calendar, Clock, Heart, ShieldCheck, Zap, ChevronRight, Play, ShieldAlert, Scan } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import Link from "next/link";
import { LocalizedHealthNews } from "./LocalizedHealthNews";

export function PatientDashboard({ t }: { t: any }) {
    const { isPrivacyMode, isRuralMode } = useSettings();

    return (
        <div className={`space-y-10 pb-12 ${isPrivacyMode ? 'privacy-mode' : ''} ${isRuralMode ? 'rural-mode' : ''}`}>
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight uppercase italic">Welcome back, <span className="text-[#00D1FF] privacy-blur">{isPrivacyMode ? "ID-HIDDEN" : "JD-992"}</span></h1>
                    <p className="text-slate-400 font-medium">Your health journey at a glance. Visualizing your recovery milestones.</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/dashboard/risk" className="px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 shadow-xl shadow-red-500/5 flex items-center gap-3 group hover:bg-red-500/20 transition-all">
                        <ShieldAlert size={18} className="text-red-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Risk Sentinel: 1 Alert</span>
                    </Link>
                    <div className="px-6 py-3 rounded-2xl glass-card flex items-center gap-3 border-[#00D1FF]/20 shadow-xl shadow-[#00D1FF]/5">
                        <Heart size={18} className="text-[#00D1FF] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#00D1FF]">Recovery On Track</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    {/* Featured Recovery Card */}
                    <div className="p-10 glass-morphism rounded-[3rem] border-white/5 relative overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent">
                        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                            <Activity className="text-[#00D1FF]" size={150} />
                        </div>
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h3 className="text-2xl font-black mb-2 tracking-tight">Daily Progress</h3>
                                <p className="text-slate-500 text-sm">Week 2: Mobility Initialization</p>
                            </div>
                            <span className="bg-[#00D1FF]/10 text-[#00D1FF] text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest border border-[#00D1FF]/20">
                                Phase 1 of 4
                            </span>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-end text-sm">
                                <span className="text-slate-300 font-bold italic">"Your neural stability has improved by 14% since Tuesday."</span>
                                <span className="text-[#00D1FF] font-black">68% Overall</span>
                            </div>
                            <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "68%" }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-[#00D1FF] to-[#7000FF] rounded-full shadow-[0_0_15px_rgba(0,209,255,0.4)]"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mt-12">
                            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 text-center transition-colors hover:bg-white/[0.04]">
                                <Clock className="mx-auto mb-3 text-slate-500" size={20} />
                                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Time Logged</p>
                                <p className="text-lg font-black">12.4 hrs</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 text-center transition-colors hover:bg-white/[0.04]">
                                <Zap className="mx-auto mb-3 text-yellow-500" size={20} />
                                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Intensity</p>
                                <p className="text-lg font-black text-yellow-500">Low</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 text-center transition-colors hover:bg-white/[0.04]">
                                <Calendar className="mx-auto mb-3 text-slate-500" size={20} />
                                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Streak</p>
                                <p className="text-lg font-black">5 Days</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <Link href="/dashboard/rehab" className="group">
                            <div className="p-8 glass-card rounded-[2.5rem] border-white/5 hover:border-[#7000FF]/50 transition-all bg-[#7000FF]/[0.02]">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#7000FF]/10 text-[#7000FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Play fill="currentColor" size={20} />
                                    </div>
                                    <ChevronRight className="text-slate-600 group-hover:text-white transition-colors" size={20} />
                                </div>
                                <h4 className="font-black text-lg mb-2">Resume Rehab</h4>
                                <p className="text-xs text-slate-400 leading-relaxed italic">Next: Finger Extension protocols.</p>
                            </div>
                        </Link>

                        <Link href="/dashboard/lab-reports" className="group">
                            <div className="p-8 glass-card rounded-[2.5rem] border-white/5 hover:border-[#00D1FF]/50 transition-all bg-[#00D1FF]/[0.02]">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#00D1FF]/10 text-[#00D1FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <ChevronRight className="text-slate-600 group-hover:text-white transition-colors" size={20} />
                                </div>
                                <h4 className="font-black text-lg mb-2">My Reports</h4>
                                <p className="text-xs text-slate-400 leading-relaxed italic">Download your AI-translated files.</p>
                            </div>
                        </Link>

                        <Link href="/dashboard?modality=xray" className="group">
                            <div className="p-8 glass-card rounded-[2.5rem] border-white/5 hover:border-[#FACC15]/50 transition-all bg-[#FACC15]/[0.02]">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#FACC15]/10 text-[#FACC15] flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Scan size={24} />
                                    </div>
                                    <ChevronRight className="text-slate-600 group-hover:text-white transition-colors" size={20} />
                                </div>
                                <h4 className="font-black text-lg mb-2">Initialize Scan</h4>
                                <p className="text-xs text-slate-400 leading-relaxed italic">Direct AI-Vision upload channel.</p>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="space-y-8 flex flex-col">
                    <LocalizedHealthNews />

                    <div className="p-10 rounded-[3rem] bg-gradient-to-tr from-[#7000FF] to-[#00D1FF] text-white shadow-2xl shadow-[#00D1FF]/20 group cursor-pointer hover:scale-[1.02] transition-transform">
                        <h4 className="font-black text-2xl mb-4 leading-tight">Neural Insight of the Day</h4>
                        <p className="text-white/80 text-sm leading-relaxed mb-8 italic">"Remember to focus on 'Tendon Gliding' today. It significantly accelerates fine motor recovery by up to 22%."</p>
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                            Read More Neural Logs <ChevronRight size={14} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EventItem({ title, time, color }: any) {
    const colorClasses: any = {
        blue: "bg-[#00D1FF]",
        purple: "bg-[#7000FF]",
        slate: "bg-slate-600",
    };

    return (
        <div className="flex items-center gap-4 group cursor-pointer">
            <div className={`w-1.5 h-1.5 rounded-full ${colorClasses[color] || colorClasses.slate} group-hover:scale-150 transition-transform`} />
            <div>
                <p className="text-xs font-black">{title}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{time}</p>
            </div>
        </div>
    );
}
