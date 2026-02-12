"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Stethoscope,
    ShieldCheck,
    Brain,
    FileText,
    Zap,
    Activity,
    Info,
    MessageSquare,
    Clock,
    CheckCircle2,
    Users2,
    Microscope,
    Download,
    Sparkles,
    HeartPulse,
    CheckSquare,
    Compass,
    GraduationCap,
    ArrowUpRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";
import { apiUrl } from "@/lib/api";

export default function CopilotPage() {
    const router = useRouter();
    const { userRole } = useSettings();
    const [isGenerating, setIsGenerating] = useState(false);
    const [clinicalNote, setClinicalNote] = useState("");
    const [latestScan, setLatestScan] = useState<any>(null);

    useEffect(() => {
        async function fetchLatest() {
            try {
                const res = await fetch(apiUrl('/api/scans'));
                const data = await res.json();
                if (data && data.length > 0) setLatestScan(data[0]);
            } catch (err) {
                console.error("Failed to fetch latest scan:", err);
            }
        }
        fetchLatest();
    }, []);

    const generateNote = async () => {
        if (!latestScan) {
            setClinicalNote("No scan data found. Please upload a scan first.");
            return;
        }

        setIsGenerating(true);
        try {
            const res = await fetch(apiUrl('/api/ai/synthesize-note'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    scanData: latestScan,
                    role: 'patient'
                })
            });
            const data = await res.json();
            setClinicalNote(data.text || data.message || 'Synthesis failed.');
        } catch (err) {
            setClinicalNote("Synthesis failed. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return <UnifiedCopilotView latestScan={latestScan} isGenerating={isGenerating} clinicalNote={clinicalNote} generateNote={generateNote} setClinicalNote={setClinicalNote} onRehabClick={() => router.push('/dashboard/rehab')} />;
}

/* --- UNIFIED CO-PILOT VIEW --- */
function UnifiedCopilotView({ latestScan, isGenerating, clinicalNote, generateNote, setClinicalNote, onRehabClick }: any) {
    return (
        <div className="space-y-10 pb-12">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight italic uppercase">AI <span className="text-[#00D1FF]">Co-Pilot</span></h1>
                    <p className="text-slate-400 font-medium">Your AI-powered health companion for scan understanding and recovery guidance.</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-2xl glass-card flex items-center gap-3 border-[#00D1FF]/20 shadow-xl shadow-[#00D1FF]/5">
                        <ShieldCheck size={18} className="text-[#00D1FF]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#00D1FF]">AI ASSISTED</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="p-10 glass-morphism rounded-[3rem] border-white/5 relative overflow-hidden bg-white/[0.01]">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-xl font-black flex items-center gap-3 uppercase italic">
                                <HeartPulse className="text-[#00D1FF]" size={22} />
                                My Health Progress
                            </h3>
                            <div className="text-[10px] font-black bg-[#00D1FF]/10 text-[#00D1FF] px-4 py-1.5 rounded-full border border-[#00D1FF]/20">
                                {latestScan ? `CASE: #${latestScan.referenceId || "MV"}` : "NO SCAN YET"}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <SmallStat label="Recovery" value={latestScan?.status === 'Active' ? '68%' : 'Starting'} status="high" />
                            <SmallStat label="Clarity" value={latestScan?.analysis?.confidence > 0.8 ? 'Excellent' : 'Clear'} status="optimal" />
                            <SmallStat label="Wellness" value={latestScan?.risk || 'Stable'} status="optimal" />
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-6">
                            <div className="flex items-start gap-6">
                                <div className="p-4 rounded-2xl bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/20">
                                    <Brain size={24} />
                                </div>
                                <div className="space-y-3">
                                    <h4 className="font-bold text-lg">AI Insight</h4>
                                    <p className="text-slate-300 text-sm leading-relaxed italic">
                                        "{latestScan?.analysis?.summary || "Upload a scan to get AI-powered explanations in plain English."}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 rounded-[3rem] glass-card border-[#7000FF]/10 bg-[#7000FF]/[0.02]">
                        <h3 className="text-xl font-black mb-8 flex items-center gap-3 uppercase italic">
                            <Compass className="text-[#7000FF]" size={22} />
                            Healing Trajectory
                        </h3>
                        <div className="space-y-4">
                            {latestScan?.analysis?.findings?.length > 0 ? (
                                latestScan.analysis.findings.slice(0, 3).map((f: string, i: number) => (
                                    <ListItem key={i} name={f} probability={Math.max(20, 100 - (i * 25))} confidence={i === 0 ? "HIGH" : "MEDIUM"} color="from-[#7000FF] to-[#00D1FF]" />
                                ))
                            ) : (
                                <>
                                    <ListItem name="Initial Healing Phase" probability={100} confidence="COMPLETE" color="from-emerald-500 to-teal-500" />
                                    <ListItem name="Mobility Restoration" probability={45} confidence="ACTIVE" color="from-[#7000FF] to-[#00D1FF]" />
                                    <ListItem name="Full Strength Return" probability={12} confidence="UPCOMING" color="from-slate-700 to-slate-800" />
                                </>
                            )}
                        </div>
                    </div>

                    <div className="p-10 rounded-[3rem] glass-morphism border-white/5 bg-white/[0.01]">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black flex items-center gap-3 uppercase italic">
                                <Sparkles className="text-amber-400" size={22} />
                                AI Plain-English Guide
                            </h3>
                            <button onClick={generateNote} disabled={isGenerating} className="px-6 py-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-black uppercase tracking-widest hover:bg-amber-500/20 transition-all flex items-center gap-2">
                                <Zap size={12} className={isGenerating ? "animate-spin" : ""} />
                                {isGenerating ? "GENERATING..." : "EXPLAIN MY DATA"}
                            </button>
                        </div>
                        <div className="relative">
                            <textarea value={clinicalNote} onChange={(e) => setClinicalNote(e.target.value)} className="w-full h-48 bg-black/40 rounded-[2rem] border border-white/5 p-8 text-slate-300 text-sm leading-relaxed focus:outline-none focus:border-[#00D1FF]/50 transition-all resize-none" placeholder="Your personalized health explanation will appear here..." />
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <NeuralChat title="Neural Guide" systemMsg="Hello! I can explain your medical results in plain English. Click 'Explain My Data' to get started." />
                    <QuickRecords label="Care Checklist" items={[{ title: "3D Volumetric Mesh", status: "verified" }, { title: "Lab Pattern Match", status: "verified" }, { title: "Recovery Plan", status: latestScan ? "verified" : "pending" }]} />
                    <ActionCard icon={<Stethoscope size={24} />} title="Explain My Scan" desc="Get a simple, easy-to-understand explanation of your scan results." btn="EXPLAIN NOW" onClick={generateNote} />
                    <ActionCard icon={<Activity size={24} />} title="Start Recovery Session" desc="Follow personalized AI-guided rehab exercises to speed up healing." btn="GO TO REHAB" onClick={onRehabClick} />
                </div>
            </div>
        </div>
    );
}

/* --- SHARED COMPONENTS --- */
function SmallStat({ label, value, status }: { label: string, value: string, status: 'optimal' | 'high' }) {
    return (
        <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
            <p className={`text-xl font-black ${status === 'optimal' ? 'text-white' : 'text-[#00D1FF]'}`}>{value}</p>
        </div>
    );
}

function ListItem({ name, probability, confidence, color }: { name: string, probability: number, confidence: string, color: string }) {
    return (
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-between group hover:border-[#7000FF]/50 transition-all">
            <div className="space-y-1">
                <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors">{name}</h4>
                <div className="flex items-center gap-3">
                    <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${probability}%` }} className={`h-full bg-gradient-to-r ${color}`} />
                    </div>
                    <span className="text-[10px] font-black text-slate-500">{probability}%</span>
                </div>
            </div>
            <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10 ${confidence === 'HIGH' || confidence === 'COMPLETE' ? 'text-emerald-400 border-emerald-400/20' : confidence === 'ACTIVE' ? 'text-[#00D1FF] border-[#00D1FF]/20' : 'text-slate-500'}`}>
                {confidence}
            </div>
        </div>
    );
}

function UserCard({ name, role, status, pulse }: any) {
    return (
        <div className="p-8 rounded-[2.5rem] glass-morphism border-[#00D1FF]/20 bg-[#00D1FF]/5">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-[#00D1FF] relative">
                    {pulse && <div className="absolute inset-0 rounded-full bg-[#00D1FF] animate-ping opacity-20" />}
                </div>
                <div>
                    <h4 className="font-black text-lg">{name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{role}</p>
                </div>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{pulse ? 'Shift Status' : 'System Connection'}</span>
                <span className={`flex items-center gap-2 text-xs font-bold text-emerald-400`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {status}
                </span>
            </div>
        </div>
    );
}

function NeuralChat({ title, systemMsg }: any) {
    return (
        <div className="p-8 rounded-[2.5rem] glass-morphism border-white/5 bg-white/[0.01] flex flex-col h-[400px]">
            <h4 className="text-[10px] font-black text-[#00D1FF] uppercase tracking-widest mb-6 flex items-center gap-2 italic">
                <MessageSquare size={14} /> {title}
            </h4>
            <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-[11px] leading-relaxed text-slate-300">
                    <span className="font-black text-[#00D1FF] block mb-1 uppercase tracking-widest tracking-tighter">System Intelligence</span>
                    {systemMsg}
                </div>
                <div className="p-4 rounded-2xl bg-[#00D1FF]/10 border border-[#00D1FF]/20 text-[11px] leading-relaxed text-white self-end ml-8 italic">
                    <span className="font-black text-[#00D1FF] block mb-1 uppercase tracking-widest tracking-tighter">AI Analysis</span>
                    Neural link verified. I am processing the latest volumetric scan to provide real-time guidance.
                </div>
            </div>
            <div className="relative">
                <input type="text" placeholder="Engage neural guide..." className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-xs focus:outline-none focus:border-[#00D1FF] transition-all pr-14" />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#00D1FF] hover:scale-110 transition-all">
                    <Zap size={18} />
                </button>
            </div>
        </div>
    );
}

function QuickRecords({ label, items }: any) {
    return (
        <div className="p-8 rounded-[2.5rem] glass-card border-white/5">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">{label}</h4>
            <div className="space-y-4">
                {items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center group">
                        <div className="flex items-center gap-3 text-slate-400 group-hover:text-white transition-colors">
                            <div className="p-2 rounded-lg bg-white/5"><CheckSquare size={14} /></div>
                            <span className="text-xs font-bold">{item.title}</span>
                        </div>
                        {item.status === 'verified' ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Clock size={16} className="text-slate-600" />}
                    </div>
                ))}
            </div>
        </div>
    );
}

function ActionCard({ icon, title, desc, btn, onClick }: any) {
    return (
        <div className="p-8 rounded-[3rem] bg-gradient-to-tr from-[#7000FF] to-[#00D1FF] text-white relative overflow-hidden group cursor-pointer shadow-2xl">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Brain size={240} />
            </div>
            <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    {icon}
                </div>
                <div>
                    <h4 className="font-black text-xl mb-2 italic uppercase">{title}</h4>
                    <p className="text-white/70 text-sm leading-relaxed mb-8">{desc}</p>
                    <button onClick={onClick} className="w-full py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:px-8 transition-all">
                        {btn}
                    </button>
                </div>
            </div>
        </div>
    );
}
