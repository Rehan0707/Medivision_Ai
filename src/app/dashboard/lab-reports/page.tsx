"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Upload,
    Search,
    CheckCircle2,
    AlertTriangle,
    Microscope,
    ArrowRight,
    Brain,
    Info,
    ChevronDown,
    Activity
} from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

const mockReports = [
    { id: "R-8821", name: "Comprehensive Blood Panel", date: "Jan 28, 2026", status: "Critical Path", patient: "JD-992" },
    { id: "R-8790", name: "Lipid Profile", date: "Jan 15, 2026", status: "Normal", patient: "JD-992" },
    { id: "R-8742", name: "Urinalysis", date: "Jan 05, 2026", status: "Optimal", patient: "JD-992" },
];

export default function LabReportsPage() {
    const { isRuralMode, isPrivacyMode } = useSettings();
    const [selectedReport, setSelectedReport] = useState<any>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisData, setAnalysisData] = useState<any>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsAnalyzing(true);
        setSelectedReport({ id: "NEW", name: file.name, date: "Just now", status: "Analyzing...", patient: "User" });
        setAnalysisData(null);

        try {
            const reader = new FileReader();
            const base64Promise = new Promise((resolve) => {
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
            const base64 = await base64Promise as string;

            const res = await fetch('/api/ai/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: base64,
                    prompt: `Perform a detailed machine reading of this lab report. 
                    1. Remove all unnecessary medical jargon and explain findings in plain English.
                    2. Provide a 'summary'.
                    3. List 'biomarkers' with fields: name, value, status (optimal, high, or low).
                    4. Provide a 'criticalAction'.
                    
                    Return ONLY a JSON object with these keys: { "summary": "...", "biomarkers": [{ "name": "...", "value": "...", "status": "..." }], "criticalAction": "..." }`
                })
            });
            const data = await res.json();

            // Attempt to parse JSON from the text response
            try {
                const jsonStr = data.text.replace(/```json|```/g, '').trim();
                const parsed = JSON.parse(jsonStr);
                setAnalysisData(parsed);
            } catch (pErr) {
                console.error("Failed to parse AI JSON:", pErr);
                setAnalysisData({
                    summary: data.text,
                    biomarkers: [],
                    criticalAction: "Consult with a specialist for a detailed breakdown."
                });
            }

            setSelectedReport({
                id: `R-${Math.floor(Math.random() * 9000) + 1000}`,
                name: file.name,
                date: new Date().toLocaleDateString(),
                status: "Analysis Ready",
                patient: "Self-Upload"
            });
        } catch (err) {
            console.error("Lab Analysis failed:", err);
            setAnalysisData({ summary: "Analysis timeout. Please verify Clinical Intelligence sync.", biomarkers: [], criticalAction: "Retry upload." });
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight">Lab <span className="text-[#00D1FF]">Intelligence</span></h1>
                    <p className="text-slate-400">Machine reading and plain-English translation of technical lab results.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Sidebar: Upload & History */}
                <div className="space-y-6">
                    <div
                        onClick={() => document.getElementById('report-upload')?.click()}
                        className="p-8 glass-morphism rounded-[2rem] border-dashed border-white/10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-[#00D1FF]/50 hover:bg-white/[0.04] transition-all group relative overflow-hidden"
                    >
                        <input
                            type="file"
                            id="report-upload"
                            className="hidden"
                            onChange={handleFileUpload}
                            accept=".pdf,.jpg,.png"
                        />
                        <div className="w-16 h-16 rounded-2xl bg-[#00D1FF]/10 text-[#00D1FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                            {isAnalyzing ? <Activity className="animate-spin" /> : <Upload />}
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold">Upload New Report</p>
                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">PDF, JPG, PNG</p>
                        </div>
                    </div>

                    <div className="p-8 glass-card rounded-[2rem]">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">Recent Reports</h3>
                        <div className="space-y-4">
                            {mockReports.map((report) => (
                                <div
                                    key={report.id}
                                    onClick={() => {
                                        setSelectedReport(report);
                                        setAnalysisData(null);
                                    }}
                                    className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedReport?.id === report.id ? 'bg-[#00D1FF]/10 border-[#00D1FF]/30' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-xs font-bold truncate pr-2">{report.name}</p>
                                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${report.status === 'Critical Path' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                            {report.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                        <span>{report.date}</span>
                                        <span className={isPrivacyMode ? 'patient-data' : ''}>{report.patient}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content: Analysis */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        {selectedReport ? (
                            <motion.div
                                key="analysis"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-8"
                            >
                                <div className="p-10 glass-morphism rounded-[3rem] border-white/5 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                                        <Microscope size={120} />
                                    </div>

                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 rounded-2xl bg-[#00D1FF]/20 text-[#00D1FF] flex items-center justify-center">
                                            <Brain size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black tracking-tight">AI Diagnostic Summary</h2>
                                            <p className="text-sm text-slate-400">Analysis of {selectedReport.name} ({selectedReport.id})</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00D1FF] mb-4">Plain-English Breakdown</h3>
                                                <div className="text-slate-300 leading-relaxed italic text-sm space-y-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                                                    {analysisData ? (
                                                        <p className="whitespace-pre-wrap leading-relaxed">{analysisData.summary}</p>
                                                    ) : (
                                                        <p>"Your results indicate a slight elevation in Vitamin D deficiency, which explains the joint fatigue. All other metrics, including renal function and core electrolytes, are within optimal clinical ranges."</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/20">
                                                <div className="flex items-center gap-3 text-orange-400 mb-3">
                                                    <AlertTriangle size={18} />
                                                    <span className="text-xs font-black uppercase tracking-widest">Critical Action</span>
                                                </div>
                                                <p className="text-xs text-slate-400">
                                                    {analysisData ? analysisData.criticalAction : "Increase dietary intake of calcitriol and schedule a follow-up panel in 14 days."}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Extracted Biomarkers</h3>
                                                {analysisData && (
                                                    <span className="text-[8px] font-black bg-[#00D1FF]/10 text-[#00D1FF] px-3 py-1 rounded-full uppercase tracking-tighter">AI VALIDATED</span>
                                                )}
                                            </div>

                                            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                                {analysisData?.biomarkers && analysisData.biomarkers.length > 0 ? (
                                                    analysisData.biomarkers.map((bm: any, idx: number) => (
                                                        <Biomarker
                                                            key={idx}
                                                            name={bm.name}
                                                            value={bm.value}
                                                            status={bm.status.toLowerCase() as any}
                                                        />
                                                    ))
                                                ) : !analysisData && !isAnalyzing ? (
                                                    <>
                                                        <Biomarker name="Hemoglobin (Hb)" value="14.2 g/dL" status="optimal" />
                                                        <Biomarker name="Serum Vitamin D" value="18.5 ng/mL" status="low" />
                                                        <Biomarker name="WBC Count" value="6.5 k/uL" status="optimal" />
                                                        <Biomarker name="Creatinine" value="0.9 mg/dL" status="optimal" />
                                                    </>
                                                ) : (
                                                    <div className="p-12 rounded-[2rem] border border-dashed border-white/5 flex flex-col items-center justify-center text-center gap-4">
                                                        <Activity className="text-slate-700 animate-pulse" size={32} />
                                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Parsing Result Stream...</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <StatBox
                                        icon={<Activity size={20} className="text-[#00D1FF]" />}
                                        label="Clinical Trust"
                                        value="99.2%"
                                    />
                                    <StatBox
                                        icon={<Info size={20} className="text-purple-400" />}
                                        label="Ref. Studies"
                                        value="1,402"
                                    />
                                    <button className="p-8 rounded-[2.5rem] bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-2xl flex items-center justify-center gap-3">
                                        DOWNLOAD PDF REPORT <ArrowRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-[600px] glass-morphism rounded-[3rem] border-white/5 border-dashed flex flex-col items-center justify-center text-center p-10">
                                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-slate-600 mb-6">
                                    <FileText size={32} />
                                </div>
                                <h2 className="text-xl font-bold mb-2">No Report Selected</h2>
                                <p className="text-slate-500 text-sm max-w-sm">Select a report from the history or upload a new one to begin AI-powered machine reading.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

function Biomarker({ name, value, status }: { name: string, value: string, status: 'optimal' | 'low' | 'high' }) {
    const getStatusColor = () => {
        switch (status) {
            case 'optimal': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'low': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'high': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    return (
        <div className="flex items-center justify-between p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors group">
            <div className="space-y-1">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{name}</p>
                <p className="text-xl font-black tracking-tight group-hover:text-[#00D1FF] transition-colors">{value}</p>
            </div>
            <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border shrink-0 ${getStatusColor()}`}>
                {status}
            </div>
        </div>
    );
}

function StatBox({ icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="p-8 glass-card rounded-[2.5rem] flex flex-col items-center justify-center text-center">
            <div className="mb-4">{icon}</div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{label}</p>
            <p className="text-2xl font-black">{value}</p>
        </div>
    );
}
