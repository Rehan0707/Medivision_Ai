"use client";

import { Users2, MessageSquare, Shield, Star, Globe2, Plus, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const boards = [
    { title: "Trauma Reconstruction", desc: "Collaborate on complex orthopedic reconstructions with top surgeons.", members: "1.2k Active", type: "Expertise", color: "#00D1FF" },
    { title: "Neuro-Visual Board", desc: "Shared diagnostic analysis for critical neuro-imaging datasets.", members: "840 Active", type: "Private", color: "#7000FF" },
    { title: "AI Research Hub", desc: "Shaping the future of neural architectures in clinical practice.", members: "5k Members", type: "Open Source", color: "#10b981" },
];

export default function CommunityPage() {
    return (
        <div className="space-y-12 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight">Expert <span className="text-[#00D1FF]">Network</span></h1>
                    <p className="text-slate-400">Secure, HIPAA-compliant collaboration framework for clinical specialists.</p>
                </div>
                <button className="px-8 py-4 rounded-2xl bg-white text-black font-black text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-xl flex items-center gap-3">
                    <Plus size={16} /> START SESSION
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {boards.map((board, index) => (
                    <motion.div
                        key={board.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-10 glass-morphism rounded-[3rem] border-white/5 relative overflow-hidden group hover:border-white/20 transition-all cursor-pointer shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Globe2 size={120} style={{ color: board.color }} />
                        </div>
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-white/10" style={{ backgroundColor: `${board.color}15`, color: board.color }}>
                            <Users2 size={28} />
                        </div>
                        <h3 className="text-2xl font-black mb-3 tracking-tight">{board.title}</h3>
                        <p className="text-sm text-slate-400 mb-10 leading-relaxed font-medium">{board.desc}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 bg-white/5 rounded-full text-slate-400">{board.members}</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: board.color }}>{board.type}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-10 glass-card rounded-[3rem] border-white/5 shadow-2xl">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                            <MessageSquare className="text-[#00D1FF]" />
                            Live Discussions
                        </h3>
                        <button className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[#00D1FF] transition-colors">See all</button>
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-6 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-[#00D1FF]/30 transition-all cursor-pointer group">
                                <div className="w-14 h-14 rounded-2xl bg-slate-800 shrink-0 overflow-hidden relative border border-white/10">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#00D1FF]/20 to-transparent" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-lg leading-tight group-hover:text-[#00D1FF] transition-colors">Neural mapping of sub-voxel fractures in geriatric patients</h4>
                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">45m ago</span>
                                    </div>
                                    <p className="text-sm text-slate-500 line-clamp-1 mb-4 font-medium italic">"I'm observing a higher false-positive rate in osteoporotic bone. Anyone else noticed this in the 4.2 kernel?"</p>
                                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <div className="flex items-center gap-2"><MessageCircle size={14} className="text-[#00D1FF]" /> 48 Comments</div>
                                        <div className="flex items-center gap-2"><Users2 size={14} className="text-[#7000FF]" /> 32 Doctors Active</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-10 glass-morphism rounded-[3rem] border-[#7000FF]/20 bg-[#7000FF]/5 relative overflow-hidden flex flex-col items-center text-center justify-center group cursor-pointer shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#7000FF] shadow-[0_0_20px_rgba(112,0,255,0.8)]" />
                    <Shield size={60} className="text-[#7000FF] mb-8 group-hover:scale-110 transition-transform duration-500" />
                    <h3 className="text-2xl font-black mb-4 tracking-tight">Verified Specialist?</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-8 font-medium">
                        Apply for verified board access to collaborate on high-stakes clinical cases and surgical planning.
                    </p>
                    <button className="w-full py-5 rounded-2xl bg-black text-white font-black text-xs tracking-[0.2em] uppercase border border-[#7000FF]/30 hover:border-[#7000FF] transition-all flex items-center justify-center gap-3">
                        GET VERIFIED <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
