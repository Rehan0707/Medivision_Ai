"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, AlertTriangle, CheckCircle2, FileText, Download, Activity } from "lucide-react";

export default function AuditPage() {
    const logs = [
        { time: "2 min ago", action: "E2E Encryption Verified", target: "Scan #MV-9921", status: "secure" },
        { time: "15 min ago", action: "Neural Logic Update", target: "Gemini Node", status: "secure" },
        { time: "1 hour ago", action: "Access Authorization", target: "Sarah M. (Doctor)", status: "secure" },
        { time: "4 hours ago", action: "Data Export Request", target: "John D. (Patient)", status: "warning" },
    ];

    return (
        <div className="space-y-10 pb-12">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight italic uppercase">Security <span className="text-[#7000FF]">Audit</span></h1>
                    <p className="text-slate-400 font-medium">Real-time ledger of network transactions, encryption handshakes, and access logs.</p>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">System Integrity: 100% Secure</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-3 space-y-6">
                    <div className="p-10 rounded-[3rem] glass-morphism border-white/5 bg-white/[0.01]">
                        <h3 className="text-xl font-black mb-8 flex items-center gap-3 uppercase italic">
                            <Activity className="text-[#00D1FF]" size={22} />
                            Network Ledger
                        </h3>
                        <div className="space-y-4">
                            {logs.map((log, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className={`p-3 rounded-xl ${log.status === 'secure' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                            {log.status === 'secure' ? <Lock size={18} /> : <AlertTriangle size={18} />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">{log.action}</p>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{log.target}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-600 font-bold">{log.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="p-8 rounded-[2.5rem] bg-[#7000FF]/5 border border-[#7000FF]/20">
                        <ShieldCheck size={32} className="text-[#7000FF] mb-6 shadow-glow" />
                        <h4 className="font-black text-lg mb-2 uppercase italic">E2E Protocol</h4>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">MediVision uses quantum-resistant AES-256 for all scan data transitions.</p>
                        <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                            <Download size={14} /> SECURITY WHITE-PAPER
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
