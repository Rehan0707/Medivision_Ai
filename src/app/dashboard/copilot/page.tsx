"use client";

import { motion } from "framer-motion";
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
    Download
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";

export default function CopilotPage() {
    const { userRole } = useSettings();
    const [isGenerating, setIsGenerating] = useState(false);

    if (userRole !== "doctor") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                    <ShieldCheck size={40} />
                </div>
                <h2 className="text-2xl font-black tracking-tight">Access Restricted</h2>
                <p className="text-slate-400 max-w-md">The Doctor Co-Pilot is a clinical support tool restricted to medical professionals. Please switch to the Doctor Portal to access this feature.</p>
            </div>
        );
    }
    const [clinicalNote, setClinicalNote] = useState("");
    const [latestScan, setLatestScan] = useState<any>(null);

    useEffect(() => {
        async function fetchLatest() {
            try {
                const res = await fetch('/api/scans');
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
            setClinicalNote("No scan data found in vault. Please upload a scan to generate a synthesis.");
            return;
        }

        setIsGenerating(true);
        try {
            const res = await fetch('/api/ai/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: `As a clinical AI assistant, draft a professional medical note for Doctor review based on this scan data:
                    Type: ${latestScan.type}
                    Findings: ${latestScan.analysis?.findings?.join(', ')}
                    Risk: ${latestScan.risk}
                    Confidence: ${latestScan.analysis?.confidence}%
                    
                    The note should be concise, use clinical terminology, and follow a standard SOAP/consult format. Start directly with the text.`
                })
            });
            const data = await res.json();
            setClinicalNote(data.text);
        } catch (err) {
            setClinicalNote("Synthesis failed. Neural link interrupted.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-10 pb-12">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight">Doctor <span className="text-[#00D1FF]">Co-Pilot</span></h1>
                    <p className="text-slate-400">Decision-support engine for rapid clinical synthesis and diagnostic validation.</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-2xl glass-card flex items-center gap-3 border-[#00D1FF]/20 shadow-xl shadow-[#00D1FF]/5">
                        <ShieldCheck size={18} className="text-[#00D1FF]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#00D1FF]">AI-COPILOT HYBRID-MODE</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Clinical synthesis */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Case Summary Card */}
                    <div className="p-10 glass-morphism rounded-[3rem] border-white/5 relative overflow-hidden bg-white/[0.01]">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-xl font-black flex items-center gap-3">
                                <FileText className="text-[#00D1FF]" size={22} />
                                Neural Case Synthesis
                            </h3>
                            <div className="text-[10px] font-black bg-[#00D1FF]/10 text-[#00D1FF] px-4 py-1.5 rounded-full border border-[#00D1FF]/20">
                                CASE ID: #7721-D
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <SmallCaseStat label="Stability" value="Locked" status="optimal" />
                            <SmallCaseStat label="Confidence" value="98.2%" status="high" />
                            <SmallCaseStat label="Risk Level" value="Low" status="optimal" />
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-6">
                            <div className="flex items-start gap-6">
                                <div className="p-4 rounded-2xl bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/20">
                                    <Brain size={24} />
                                </div>
                                <div className="space-y-3">
                                    <h4 className="font-bold text-lg">AI Clinical Impression</h4>
                                    <p className="text-slate-300 text-sm leading-relaxed italic">
                                        "Volumetric analysis indicates a primary structural anomaly in the distal phalange junction. Neural patterns match ICD-10 Code S62.3 with 92% morphological similarity. No evidence of comminuted fragmentation."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Differential Diagnosis Engine */}
                    <div className="p-10 rounded-[3rem] glass-card border-[#7000FF]/10 bg-[#7000FF]/[0.02]">
                        <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                            <Microscope className="text-[#7000FF]" size={22} />
                            Differential Engine (DDx)
                        </h3>
                        <div className="space-y-4">
                            <DifferentialItem name="Acute Transverse Fracture" probability={92} confidence="HIGH" />
                            <DifferentialItem name="Sub-condylar Fissure" probability={15} confidence="LOW" />
                            <DifferentialItem name="Pathological Bone Resorption" probability={4} confidence="TRACE" />
                        </div>
                    </div>

                    {/* AI Note Generator */}
                    <div className="p-10 rounded-[3rem] glass-morphism border-white/5 bg-white/[0.01]">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black flex items-center gap-3">
                                <MessageSquare className="text-pink-400" size={22} />
                                Clinical Note Draft
                            </h3>
                            <button
                                onClick={generateNote}
                                disabled={isGenerating}
                                className="px-6 py-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 text-[10px] font-black uppercase tracking-widest hover:bg-pink-500/20 transition-all flex items-center gap-2"
                            >
                                <Zap size={12} className={isGenerating ? "animate-spin" : ""} />
                                {isGenerating ? "SYNTESIZING..." : "AUTO-DRAFT"}
                            </button>
                        </div>
                        <div className="relative">
                            <textarea
                                value={clinicalNote}
                                onChange={(e) => setClinicalNote(e.target.value)}
                                placeholder="Click AUTO-DRAFT to generate a clinical memo based on AI findings..."
                                className="w-full h-48 bg-black/40 rounded-[2rem] border border-white/5 p-8 text-slate-300 text-sm leading-relaxed focus:outline-none focus:border-[#00D1FF]/50 transition-all resize-none"
                            />
                            {clinicalNote && (
                                <div className="absolute bottom-6 right-6 flex gap-3">
                                    <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 transition-all">
                                        <Download size={18} />
                                    </button>
                                    <button className="px-6 py-3 rounded-xl bg-[#00D1FF] text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
                                        VERIFY & SIGN
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Evidence & Actions */}
                <div className="space-y-8">
                    {/* Doctor Info Card */}
                    <div className="p-8 rounded-[2.5rem] glass-morphism border-[#00D1FF]/20 bg-[#00D1FF]/5">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-[#00D1FF]" />
                            <div>
                                <h4 className="font-black text-lg">Dr. Clinical User</h4>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Medical Specialist</p>
                            </div>
                        </div>
                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Shift Status</span>
                                <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    Active Consult
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Neural Consultation Chat */}
                    <div className="p-8 rounded-[2.5rem] glass-morphism border-white/5 bg-white/[0.01] flex flex-col h-[400px]">
                        <h4 className="text-[10px] font-black text-[#00D1FF] uppercase tracking-widest mb-6 flex items-center gap-2">
                            <MessageSquare size={14} /> Neural Consultation
                        </h4>
                        <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-[11px] leading-relaxed text-slate-300">
                                <span className="font-black text-[#00D1FF] block mb-1 uppercase tracking-widest">System</span>
                                Neural link established. Case data #7721-D synchronized. Ask any clinical or radiological question.
                            </div>
                            <div className="p-4 rounded-2xl bg-[#00D1FF]/10 border border-[#00D1FF]/20 text-[11px] leading-relaxed text-white self-end ml-8">
                                <span className="font-black text-[#00D1FF] block mb-1 uppercase tracking-widest">AI Synthesis</span>
                                Based on the sub-voxel density, I recommend checking the proximal ligament for microscopic tearing.
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Query neural engine..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#00D1FF] transition-all pr-12"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#00D1FF] hover:scale-110 transition-all">
                                <Zap size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Voxel Evidence */}
                    <div className="p-8 rounded-[2.5rem] glass-card border-white/5">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Evidence Records</h4>
                        <div className="space-y-4">
                            <EvidenceItem icon={<Activity size={14} />} title="3D Volumetric Mesh" status="verified" />
                            <EvidenceItem icon={<Microscope size={14} />} title="Lab Pattern Match" status="verified" />
                            <EvidenceItem icon={<Zap size={14} />} title="Thermal Gradient" status="pending" />
                        </div>
                    </div>

                    {/* Quick Consultation */}
                    <div className="p-8 rounded-[3rem] bg-gradient-to-tr from-[#7000FF] to-[#00D1FF] text-white relative overflow-hidden group cursor-pointer shadow-2xl">
                        <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <Users2 size={240} />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <Stethoscope size={24} />
                            </div>
                            <div>
                                <h4 className="font-black text-xl mb-2 italic">Patient Briefing</h4>
                                <p className="text-white/70 text-sm leading-relaxed mb-8">Explain findings to the patient with AI-simplified language in real-time.</p>
                                <button className="w-full py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:px-8 transition-all">
                                    START SESSION
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SmallCaseStat({ label, value, status }: { label: string, value: string, status: 'optimal' | 'high' }) {
    return (
        <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
            <p className={`text-xl font-black ${status === 'optimal' ? 'text-white' : 'text-[#00D1FF]'}`}>{value}</p>
        </div>
    );
}

function DifferentialItem({ name, probability, confidence }: { name: string, probability: number, confidence: string }) {
    return (
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-between group hover:border-[#7000FF]/50 transition-all">
            <div className="space-y-1">
                <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors">{name}</h4>
                <div className="flex items-center gap-3">
                    <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${probability}%` }}
                            className="h-full bg-gradient-to-r from-[#7000FF] to-[#00D1FF]"
                        />
                    </div>
                    <span className="text-[10px] font-black text-slate-500">{probability}%</span>
                </div>
            </div>
            <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10 ${confidence === 'HIGH' ? 'text-[#00D1FF]' : 'text-slate-500'
                }`}>
                {confidence}
            </div>
        </div>
    );
}

function EvidenceItem({ icon, title, status }: { icon: any, title: string, status: 'verified' | 'pending' }) {
    return (
        <div className="flex justify-between items-center group">
            <div className="flex items-center gap-3 text-slate-400 group-hover:text-white transition-colors">
                <div className="p-2 rounded-lg bg-white/5">{icon}</div>
                <span className="text-xs font-bold">{title}</span>
            </div>
            {status === 'verified' ? (
                <CheckCircle2 size={16} className="text-emerald-500" />
            ) : (
                <Clock size={16} className="text-slate-600" />
            )}
        </div>
    );
}
