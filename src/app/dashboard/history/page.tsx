"use client";

import { useEffect, useState } from "react";
import { History, FileText, Calendar, Search, Download, ShieldCheck, Lock, MoreHorizontal, Filter, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useSettings } from "@/context/SettingsContext";
import { PrintReport } from "@/components/dashboard/PrintReport";

export default function HistoryPage() {
    const { isPrivacyMode, userRole } = useSettings();
    const [scans, setScans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [printingRecord, setPrintingRecord] = useState<any>(null);

    useEffect(() => {
        if (printingRecord) {
            // Give a tiny bit of time for the component to render in the DOM
            setTimeout(() => {
                window.print();
                setPrintingRecord(null);
            }, 100);
        }
    }, [printingRecord]);

    useEffect(() => {
        async function fetchScans() {
            try {
                const res = await fetch('/api/scans');
                const data = await res.json();
                setScans(data);
            } catch (err) {
                console.error("Failed to fetch scans:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchScans();
    }, []);

    return (
        <div className="space-y-10 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight">
                        {userRole === 'patient' ? 'My Medical' : 'Diagnostic'} <span className="text-[#00D1FF]">{userRole === 'patient' ? 'Vault' : 'History'}</span>
                    </h1>
                    <p className="text-slate-400">
                        {userRole === 'patient'
                            ? "Securely access your historical scans and AI interpretations."
                            : "End-to-end encrypted medical history and AI-verified clinical records."}
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                        <Filter size={14} /> FILTER
                    </button>
                    <button className="px-6 py-3 rounded-2xl bg-[#00D1FF] text-black text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#00D1FF]/20">
                        EXPORT ALL
                    </button>
                </div>
            </div>

            <div className="glass-morphism rounded-[3rem] overflow-hidden border-white/5 shadow-2xl">
                <div className="p-8 border-b border-white/5 flex flex-col md:flex-row items-center justify-between bg-white/[0.02] gap-6">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search by ID, scan type, or date..."
                            className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3 px-6 py-2 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                        <ShieldCheck size={16} className="text-emerald-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">HIPAA Protected Storage Active</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 border-b border-white/5 bg-white/[0.01]">
                                <th className="px-10 py-6">Reference ID</th>
                                <th className="px-10 py-6">Timestamp</th>
                                <th className="px-10 py-6">Diagnostic Type</th>
                                <th className="px-10 py-6">Security</th>
                                <th className="px-10 py-6">AI Status</th>
                                <th className="px-10 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-10 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <Loader2 className="animate-spin text-[#00D1FF]" size={32} />
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Decrypting Secure Vault...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                scans.map((record, index) => (
                                    <motion.tr
                                        key={record.referenceId}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group hover:bg-white/[0.03] transition-all cursor-pointer"
                                    >
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col">
                                                <span className={`font-mono text-xs font-black text-[#00D1FF] mb-1 ${isPrivacyMode ? 'patient-data' : ''}`}>{record.referenceId}</span>
                                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">B-ALPHA PROTOCOL</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-3 text-sm text-slate-300 font-bold">
                                                <div className="p-2 rounded-lg bg-white/5 text-slate-500">
                                                    <Calendar size={14} />
                                                </div>
                                                {new Date(record.timestamp).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-[#7000FF]/10 flex items-center justify-center text-[#7000FF] border border-[#7000FF]/20">
                                                    <FileText size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-200">{record.type}</p>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">HL7 Compliant</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-2">
                                                <Lock size={12} className="text-emerald-400" />
                                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded">AES-256</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${record.status === 'Active' ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'}`} />
                                                <span className="text-xs font-black uppercase tracking-widest">{record.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                                <button
                                                    onClick={() => setPrintingRecord(record)}
                                                    className="p-3 rounded-xl bg-white/5 hover:bg-[#00D1FF] hover:text-black transition-all"
                                                >
                                                    <Download size={18} />
                                                </button>
                                                <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 bg-white/[0.01] flex justify-center border-t border-white/5">
                    <button className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">
                        Load Archive 2024 - 2025
                    </button>
                </div>
            </div>

            {printingRecord && (
                <PrintReport
                    data={{
                        referenceId: printingRecord.referenceId,
                        timestamp: printingRecord.timestamp,
                        type: printingRecord.type,
                        patient: printingRecord.patient || "Self",
                        risk: printingRecord.risk || "Safe",
                        analysis: printingRecord.analysis || { confidence: 0, findings: [], recommendations: [] },
                        summary: printingRecord.analysis?.summary
                    }}
                />
            )}
        </div>
    );
}
