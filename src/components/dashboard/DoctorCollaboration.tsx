"use client";

import { motion } from "framer-motion";
import { MessageSquare, Video, Calendar, Shield, Users, ArrowRight, Activity } from "lucide-react";

export default function DoctorCollaboration() {
    return (
        <div className="space-y-8">
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#7000FF] via-[#00D1FF] to-[#7000FF] p-[1px] group">
                <div className="w-full h-full bg-[#020617] rounded-[2.4rem] p-10 relative overflow-hidden">
                    {/* Animated background pulse */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#7000FF]/10 blur-[80px] rounded-full group-hover:bg-[#00D1FF]/10 transition-colors" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-[#7000FF]/20 flex items-center justify-center text-[#7000FF] border border-[#7000FF]/20 shadow-[0_0_30px_rgba(112,0,255,0.2)]">
                                <Users size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tight text-white">Board <span className="text-[#7000FF]">Consult</span></h3>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Live specialist collaboration</p>
                            </div>
                        </div>

                        <div className="space-y-6 mb-10">
                            <Collaborator name="Dr. Sarah Chen" specialty="Neuro-Radiologist" status="Online" />
                            <Collaborator name="Dr. Mark Miller" specialty="Orthopedic Surgeon" status="Offline" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-[#00D1FF]/50 transition-all group/btn">
                                <Video className="text-[#00D1FF]" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white">Telecast</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-[#7000FF]/50 transition-all group/btn">
                                <MessageSquare className="text-[#7000FF]" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white">Direct Chat</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 rounded-[2.5rem] glass-card border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-4 text-emerald-400 mb-6">
                    <Shield size={20} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">HIPAA Secure Tunnel</span>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
                    End-to-end encrypted channel for sharing radiological assets and AI-driven diagnostic hypotheses.
                </p>
                <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 group">
                    View Compliance Logs
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}

function Collaborator({ name, specialty, status }: { name: string, specialty: string, status: 'Online' | 'Offline' }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/5" />
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#020617] ${status === 'Online' ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white">{name}</h4>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{specialty}</p>
                </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${status === 'Online' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-slate-800 text-slate-500 border-white/5'}`}>
                {status}
            </div>
        </div>
    );
}
