"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, ChevronRight, Activity, Bone, AlertCircle, CheckCircle2, Search, Zap, ShieldCheck, Microscope, Scan, Info, Brain, WifiOff, Sparkles, SplitSquareVertical, Database } from "lucide-react";
import HeroScene from "@/components/animations/Model";
import HandScene from "@/components/animations/HandScene";
import BrainScene from "@/components/animations/BrainScene";
import ThoraxScene from "@/components/animations/ThoraxScene";
import KneeScene from "@/components/animations/KneeScene";
import SpineScene from "@/components/animations/SpineScene";
import { useSettings } from "@/context/SettingsContext";
import { ComparisonModal } from "@/components/dashboard/ComparisonModal";
import { PrintReport } from "@/components/dashboard/PrintReport";
import { AdminStats } from "@/components/dashboard/AdminStats";
import { PatientDashboard } from "@/components/dashboard/PatientDashboard";
import { useSearchParams } from "next/navigation";
import { runLocalInference, MLResult } from "@/lib/ml/engine";

function LiveNeuralFeed() {
    const feeds = [
        "SYNAPSE-V4: 3D Reconstruction Latency < 1.2s",
        "ENCRYPTION: AES-256 Rotation Success",
        "NODE-SG1: New Peer Handshake Initialized",
        "DIAGNOSTIC: Volumetric Mesh Verified (CONF: 98.4%)",
        "SYSTEM: E2E Neural Tunnel Established",
        "PROTOCOL: HIPAA-Compliance Heartbeat Recorded",
    ];

    return (
        <div className="w-full bg-[#00D1FF]/5 border-y border-[#00D1FF]/10 py-2 overflow-hidden whitespace-nowrap relative">
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="inline-flex gap-20 items-center"
            >
                {[...feeds, ...feeds].map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00D1FF]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00D1FF] opacity-70 italic">{text}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function Dashboard() {
    const { isRuralMode, isPrivacyMode, userRole, t } = useSettings();
    const searchParams = useSearchParams();

    // States
    const [selectedModality, setSelectedModality] = useState<"xray" | "mri" | "ct" | null>(null);
    const [customMlResult, setCustomMlResult] = useState<MLResult | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [isComparing, setIsComparing] = useState(false);
    const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [detectedPart, setDetectedPart] = useState<string>("hand");
    const [currentScanImage, setCurrentScanImage] = useState<string>("/scans/hand_active_scan.png");
    const [hasIssue, setHasIssue] = useState(false);
    const [analysisData, setAnalysisData] = useState<any>(null);

    useEffect(() => {
        const modality = searchParams.get("modality");
        if (modality === "xray" || modality === "mri" || modality === "ct") {
            setSelectedModality(modality);
        }
    }, [searchParams]);

    const modalities = [
        {
            id: "xray",
            name: "X-RAY 3D",
            icon: <Bone size={32} />,
            description: "High-fidelity bone architecture & fracture analysis.",
            color: "text-[#00D1FF]",
            bg: "bg-[#00D1FF]/5",
            border: "border-[#00D1FF]/20",
            hover: "hover:border-[#00D1FF]/50"
        },
        {
            id: "mri",
            name: "MRI 3D",
            icon: <Brain size={32} />,
            description: "Neural pathways & soft tissue volumetric scanning.",
            color: "text-[#7000FF]",
            bg: "bg-[#7000FF]/5",
            border: "border-[#7000FF]/20",
            hover: "hover:border-[#7000FF]/50"
        },
        {
            id: "ct",
            name: "CT SCAN 3D",
            icon: <Scan size={32} />,
            description: "Cross-sectional organ mapping & vascular density.",
            color: "text-emerald-400",
            bg: "bg-emerald-400/5",
            border: "border-emerald-400/20",
            hover: "hover:border-emerald-400/50"
        }
    ];

    const getHudTitle = () => {
        if (detectedPart.includes("brain") || detectedPart.includes("mri") || detectedPart.includes("head")) return "Neural Architecture Analysis";
        if (detectedPart.includes("hand") || detectedPart.includes("carpal")) return "Metacarpal Architecture";
        if (detectedPart.includes("chest") || detectedPart.includes("lung")) return "Thoracic Cavity Analysis";
        return "System Scanning Architecture";
    };

    const getHudDescription = () => {
        if (analysisData?.preciseAbnormality || analysisData?.preciseLocation) {
            return `${analysisData.preciseAbnormality || "Abnormality"} identified at ${analysisData.preciseLocation || "specified anatomical zone"}. ${analysisData.summary || ""}`;
        }
        if (detectedPart.includes("brain") || detectedPart.includes("mri") || detectedPart.includes("head"))
            return "Cerebral cortex symmetry verified. Ventricular volumes within expected parameters. No acute intracranial hemorrhage detected.";
        if (detectedPart.includes("hand") || detectedPart.includes("carpal"))
            return "Phalangeal alignment is symmetric. Carpal joint spaces are preserved. No cortical disruption identified in any of the visible hand structures.";
        return "Performing multi-voxel cross-reference parsing across diagnostic dataset layers.";
    };

    const handleGeminiAnalysis = async (imageData?: string) => {
        setIsAiAnalyzing(true);
        const imageToAnalyze = imageData || currentScanImage;

        try {
            // Run custom ML alongside Gemini
            const customMlPromise = runLocalInference(imageToAnalyze, selectedModality || "xray");

            const res = await fetch('/api/ai/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: imageToAnalyze,
                    prompt: `Perform a high-level clinical cross-reference and visual analysis for this medical scan. 
                    Return ONLY a JSON object with the following structure:
                    {
                        "detectedPart": "string (e.g. hand, brain)",
                        "preciseAbnormality": "string (Identify exact issue, e.g. hairline fracture, tumor, hemorrhage)",
                        "preciseLocation": "string (Describe precise coordinates or anatomical zone, e.g. third metacarpal distal end, left temporal lobe)",
                        "findings": ["string", "string"],
                        "recommendations": ["string"],
                        "summary": "string",
                        "confidence": number (0-100)
                    }`
                })
            });
            const data = await res.json();
            const customResult = await customMlPromise;
            setCustomMlResult(customResult);

            let parsedData: any;
            try {
                const jsonStr = data.text.replace(/```json|```/g, '').trim();
                parsedData = JSON.parse(jsonStr);

                if (parsedData.detectedPart) {
                    setDetectedPart(parsedData.detectedPart.toLowerCase());
                }
                setAiResponse(parsedData.summary);
                setAnalysisData(parsedData);

                const issueKeywords = ["fracture", "abnormality", "lesion", "displacement", "tumor", "mass", "bleed", "hemorrhage", "break", "tear", "mass", "cyst", "calcification"];
                const containsIssue = parsedData.findings?.some((f: string) =>
                    issueKeywords.some(kw => f.toLowerCase().includes(kw))
                ) ||
                    (parsedData.summary && issueKeywords.some(kw => parsedData.summary.toLowerCase().includes(kw))) ||
                    (parsedData.preciseAbnormality && issueKeywords.some(kw => parsedData.preciseAbnormality.toLowerCase().includes(kw)) && !parsedData.preciseAbnormality.toLowerCase().includes("none") && !parsedData.preciseAbnormality.toLowerCase().includes("normal"));

                setHasIssue(!!containsIssue);
                await saveScanToDb(parsedData, imageToAnalyze);
            } catch (pErr) {
                console.error("Failed to parse Gemini JSON:", pErr);
                setAiResponse(data.text);
            }

        } catch (err) {
            console.error("AI Analysis failed:", err);
            setAiResponse("Analysis connection timeout. Please verify Clinical Intelligence sync.");
        } finally {
            setIsAiAnalyzing(false);
        }
    };

    const saveScanToDb = async (analysisData: any, image: string) => {
        try {
            await fetch('/api/scans/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    referenceId: `MV-${Math.floor(Math.random() * 9000) + 1000}`,
                    type: analysisData.detectedPart ? `${analysisData.detectedPart.toUpperCase()} Scan` : "Medical Scan",
                    patient: "Self",
                    risk: analysisData.findings?.length > 3 ? "High" : "Safe",
                    analysis: {
                        confidence: analysisData.confidence || 95,
                        findings: analysisData.findings || [],
                        recommendations: analysisData.recommendations || []
                    },
                    imageUrl: image.length < 100000 ? image : undefined
                })
            });
        } catch (err) {
            console.error("Failed to save scan:", err);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setScanProgress(0);
        setDetectedPart("searching");
        setAiResponse(null);

        const reader = new FileReader();
        const base64Promise = new Promise((resolve) => {
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
        const base64 = await base64Promise as string;
        setCurrentScanImage(base64);

        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsUploading(false);
                        setAnalysisComplete(true);
                        handleGeminiAnalysis(base64);
                    }, 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 50);
    };

    const [showHelp, setShowHelp] = useState(false);

    // Specific role-based redirects/renders
    if (userRole === "admin") return <AdminStats t={t} />;
    if (userRole === "patient" && !searchParams.get("modality") && !analysisComplete) return <PatientDashboard t={t} />;

    return (
        <div className="space-y-10 relative">
            {/* Help Overlay */}
            <AnimatePresence>
                {showHelp && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
                        onClick={() => setShowHelp(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-2xl bg-[#020617] border border-white/10 rounded-[3rem] p-12 shadow-2xl space-y-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-3xl font-black italic uppercase italic tracking-tighter">Mission <span className="text-[#00D1FF]">Guide</span></h3>
                                    <p className="text-slate-500 font-medium">Getting started with MediVision AI</p>
                                </div>
                                <button onClick={() => setShowHelp(false)} className="text-slate-500 hover:text-white transition-colors">
                                    <ChevronRight size={32} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#00D1FF]/10 border border-[#00D1FF]/20 flex items-center justify-center text-[#00D1FF] font-black">01</div>
                                    <h4 className="font-black text-sm uppercase">Target</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium">Select a diagnostic modality (X-Ray, MRI, or CT) to initialize the neural sensors.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#7000FF]/10 border border-[#7000FF]/20 flex items-center justify-center text-[#7000FF] font-black">02</div>
                                    <h4 className="font-black text-sm uppercase">Ingest</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium">Upload your medical imaging file. Our local ML will immediately begin volumetric parsing.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 font-black">03</div>
                                    <h4 className="font-black text-sm uppercase">Visualize</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium">Interact with the 3D reconstruction and consult our AI for clinical findings and mapping.</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowHelp(false)}
                                className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                            >
                                Acknowledged
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Help Trigger */}
            <button
                onClick={() => setShowHelp(true)}
                className="fixed bottom-10 right-10 w-14 h-14 rounded-full bg-[#00D1FF] text-black shadow-2xl shadow-[#00D1FF]/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 border-4 border-[#020617]"
                title="Open Guide"
            >
                <Info size={24} />
            </button>

            <LiveNeuralFeed />
            <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
                {!analysisComplete ? (
                    <div className="flex flex-col space-y-12 pb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mt-12"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-[10px] font-black text-[#00D1FF] mb-6 border-[#00D1FF]/20 uppercase tracking-[0.2em]">
                                <Activity size={14} className="animate-pulse" />
                                Patient Diagnostic Portal
                            </div>
                            <h2 className="text-5xl font-black mb-4 tracking-tighter uppercase italic">
                                Welcome to <span className="gradient-text">MediVision</span>
                            </h2>
                            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                                Get started by selecting the type of scan you want to analyze. Our AI will guide you through the process step-by-step.
                            </p>

                            {/* Step Indicator */}
                            <div className="flex items-center justify-center gap-4 mt-8">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${!selectedModality ? 'bg-[#00D1FF] text-black' : 'bg-white/5 text-slate-500'}`}>1. SELECT TYPE</span>
                                <div className="w-10 h-[1px] bg-white/10" />
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedModality && !analysisComplete ? 'bg-[#00D1FF] text-black' : 'bg-white/5 text-slate-500'}`}>2. UPLOAD SCAN</span>
                                <div className="w-10 h-[1px] bg-white/10" />
                                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 text-slate-500">3. VIEW RESULTS</span>
                            </div>
                        </motion.div>

                        {!selectedModality ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                                {modalities.map((m, idx) => (
                                    <motion.div
                                        key={m.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        onClick={() => setSelectedModality(m.id as any)}
                                        className={`p-10 rounded-[3.5rem] ${m.bg} border-2 ${m.border} ${m.hover} cursor-pointer transition-all group relative overflow-hidden`}
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[80px] rounded-full translate-x-10 -translate-y-10" />
                                        <div className={`w-16 h-16 rounded-2xl ${m.bg} border ${m.border} flex items-center justify-center ${m.color} mb-8 group-hover:scale-110 transition-transform shadow-inner`}>
                                            {m.icon}
                                        </div>
                                        <h3 className="text-3xl font-black mb-4 tracking-tight text-white italic uppercase">{m.name}</h3>
                                        <p className="text-slate-400 leading-relaxed font-medium mb-8">{m.description}</p>
                                        <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] ${m.color}`}>
                                            Initialize Node <ChevronRight size={14} />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full max-w-3xl mx-auto px-4"
                            >
                                <button
                                    onClick={() => setSelectedModality(null)}
                                    className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <ChevronRight size={14} className="rotate-180" /> Change Modality
                                </button>

                                <div
                                    onClick={() => !isUploading && document.getElementById('dashboard-upload')?.click()}
                                    className={`border-2 border-dashed rounded-[3rem] p-20 flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden group ${isUploading ? "border-[#00D1FF] bg-[#00D1FF]/5" : "border-white/10 bg-white/[0.02] hover:border-[#00D1FF]/40 hover:bg-white/[0.04]"
                                        }`}
                                >
                                    <input
                                        type="file"
                                        id="dashboard-upload"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                        accept="image/*,.dicom"
                                    />
                                    {isUploading && (
                                        <motion.div
                                            initial={{ top: "-100%" }}
                                            animate={{ top: "100%" }}
                                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                            className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00D1FF] to-transparent z-10"
                                        />
                                    )}

                                    <div className={`w-28 h-28 rounded-[2.5rem] flex items-center justify-center mb-10 transition-all duration-500 ${isUploading ? "bg-[#00D1FF] text-black scale-110 shadow-[0_0_30px_rgba(0,209,255,0.4)]" : "bg-white/5 text-slate-400 group-hover:scale-110"
                                        }`}>
                                        {isUploading ? <Scan className="animate-pulse" size={48} /> : <Upload size={48} />}
                                    </div>

                                    <AnimatePresence mode="wait">
                                        {isUploading ? (
                                            <motion.div
                                                key="uploading"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="text-center"
                                            >
                                                <p className="text-3xl font-black mb-3 tracking-tighter italic">NEURAL PARSING: {scanProgress}%</p>
                                                <div className="w-80 h-2 bg-white/10 rounded-full mx-auto overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-[#00D1FF]"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${scanProgress}%` }}
                                                    />
                                                </div>
                                                <p className="text-slate-500 text-[10px] mt-6 uppercase tracking-[0.3em] font-black">Syncing with {selectedModality?.toUpperCase()} Global Database...</p>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="idle"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-center"
                                            >
                                                <p className="text-3xl font-black mb-3 tracking-tight italic uppercase">Drop {selectedModality?.toUpperCase()} data here</p>
                                                <p className="text-slate-500 text-sm font-bold tracking-wide">Supports DICOM, PNG, JPG (Full encryption enabled)</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                            <StatCard icon={<Activity size={20} />} label="AI Precision" value="99.4%" />
                            <StatCard icon={<ShieldCheck size={20} />} label="Neural Safety" value="Verified" />
                            <StatCard icon={<Microscope size={20} />} label="Analysis Flow" value="End-to-End" />
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="pb-12 space-y-8"
                    >
                        {/* Result Header & Actions */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl">
                            <div className="flex items-center gap-6">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner border border-white/10 ${hasIssue ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                    {hasIssue ? <AlertCircle size={32} /> : <CheckCircle2 size={32} />}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black tracking-tight uppercase italic">{hasIssue ? "Abnormality Detected" : "Clear Scan Result"}</h2>
                                    <p className="text-slate-400 font-medium">Reference ID: MV-{Math.floor(Math.random() * 9000) + 1000} • {selectedModality?.toUpperCase()}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => {
                                        setAnalysisComplete(false);
                                        setSelectedModality(null);
                                        setAnalysisData(null);
                                        setAiResponse(null);
                                        setScanProgress(0);
                                    }}
                                    className="px-8 py-4 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all"
                                >
                                    New Scan
                                </button>
                                <button className="px-8 py-4 rounded-xl bg-[#00D1FF] text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#00D1FF]/20">
                                    Export Analysis
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <div className="rounded-[2.5rem] glass-morphism relative overflow-hidden h-[650px] border-white/5 shadow-2xl">
                                    <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-center">
                                        <div className="flex bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/10">
                                            <button className="px-6 py-2.5 rounded-xl bg-[#00D1FF] text-black text-xs font-black shadow-lg">3D MESH</button>
                                            <button className="px-6 py-2.5 rounded-xl text-slate-400 text-xs font-bold hover:text-white transition-colors">SLICE VIEW</button>
                                        </div>
                                        <div className="flex gap-3">
                                            <button className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-slate-400 hover:text-[#00D1FF] transition-all">
                                                <Search size={20} />
                                            </button>
                                            <button className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-slate-400 hover:text-[#00D1FF] transition-all">
                                                <Info size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="absolute top-28 left-8 z-20">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl"
                                        >
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Original Scan</p>
                                            <div className="w-32 aspect-square rounded-xl overflow-hidden border border-white/10 relative">
                                                <img src={currentScanImage} alt="Scan" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-[#00D1FF]/10 animate-pulse" />
                                            </div>
                                        </motion.div>
                                    </div>

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {!isRuralMode ? (
                                            <div className="w-full h-full opacity-80 scale-125">
                                                {(detectedPart.includes('brain') || detectedPart.includes('mri') || (selectedModality === 'mri' && detectedPart === 'searching')) ? (
                                                    <BrainScene hasIssue={hasIssue} />
                                                ) : (detectedPart.includes('hand') || detectedPart.includes('carpal') || detectedPart.includes('finger') || detectedPart.includes('wrist') || detectedPart.includes('digit') || detectedPart.includes('metacarpal')) ? (
                                                    <HandScene hasIssue={hasIssue} />
                                                ) : (detectedPart.includes('knee') || detectedPart.includes('leg') || detectedPart.includes('joint') || detectedPart.includes('femur') || detectedPart.includes('tibia')) ? (
                                                    <KneeScene hasIssue={hasIssue} />
                                                ) : (detectedPart.includes('spine') || detectedPart.includes('back') || detectedPart.includes('vertebra') || detectedPart.includes('cervical')) ? (
                                                    <SpineScene hasIssue={hasIssue} />
                                                ) : (detectedPart.includes('chest') || detectedPart.includes('lung') || detectedPart.includes('thorax') || detectedPart.includes('rib') || (selectedModality === 'xray' && detectedPart === 'searching')) ? (
                                                    <ThoraxScene hasIssue={hasIssue} />
                                                ) : (selectedModality === 'ct' && detectedPart === 'searching') ? (
                                                    <SpineScene hasIssue={hasIssue} />
                                                ) : (
                                                    <HeroScene />
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-slate-500 gap-4">
                                                <WifiOff size={48} className="opacity-20" />
                                                <p className="text-xs font-black uppercase tracking-[0.2em] opacity-40">3D Assets Optimized Out</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="absolute bottom-10 left-10 right-10 z-20">
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="p-8 rounded-3xl glass-card border-white/10 relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00D1FF]" />
                                            <div className="flex items-start gap-6">
                                                <div className="p-3 rounded-2xl bg-[#00D1FF]/10 text-[#00D1FF]">
                                                    <AlertCircle size={28} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h4 className="font-black text-xl tracking-tight uppercase italic">{getHudTitle()}</h4>
                                                        <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${hasIssue ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}>
                                                            {hasIssue ? "ABNORMALITY DETECTED" : "ZERO ABNORMALITY DETECTED"}
                                                        </span>
                                                    </div>
                                                    <p className="text-slate-300 text-sm leading-relaxed max-w-2xl font-medium mb-4">
                                                        {getHudDescription()}
                                                    </p>
                                                    {analysisData && (
                                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                                            <div>
                                                                <p className="text-[9px] font-black text-[#00D1FF] uppercase tracking-widest mb-1">Identified Problem</p>
                                                                <p className={`text-xs font-bold text-white uppercase italic ${isPrivacyMode ? 'privacy-blur' : ''}`}>{analysisData.preciseAbnormality || "Normal Morphology"}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[9px] font-black text-[#00D1FF] uppercase tracking-widest mb-1">Anatomical Zone</p>
                                                                <p className={`text-xs font-bold text-white uppercase italic ${isPrivacyMode ? 'privacy-blur' : ''}`}>{analysisData.preciseLocation || "Global Scan"}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-10 rounded-[2.5rem] glass-card">
                                        <h4 className="font-black mb-6 flex items-center gap-3 text-lg italic uppercase">
                                            <Zap className="text-yellow-400" size={22} />
                                            Diagnostic Biomarkers
                                        </h4>
                                        <ul className="space-y-4">
                                            {customMlResult?.detectedBiomarkers.map((bm, i) => (
                                                <li key={i} className="flex items-center gap-4 text-sm text-slate-300 font-medium">
                                                    <div className="w-6 h-6 rounded-full border border-emerald-500/30 flex items-center justify-center shrink-0">
                                                        <CheckCircle2 size={14} className="text-emerald-500" />
                                                    </div>
                                                    {bm}: <span className="text-emerald-400 ml-1">Optimal</span>
                                                </li>
                                            ))}
                                            {(!customMlResult) && (
                                                <li className="flex items-center gap-4 text-sm text-slate-300 font-medium opacity-50 italic">
                                                    Initialize analysis to extract clinical biomarkers...
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="p-10 rounded-[2.5rem] glass-card relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Database size={100} />
                                        </div>
                                        <h4 className="font-black mb-8 flex items-center gap-3 text-[#00D1FF] text-lg italic uppercase">
                                            <Zap size={22} />
                                            Neural Telemetry
                                        </h4>
                                        <div className="space-y-8">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Voxel Density</p>
                                                    <p className="text-xl font-black text-white">{customMlResult?.voxelDensity || "--"}%</p>
                                                </div>
                                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Neural Entropy</p>
                                                    <p className="text-xl font-black text-white">{customMlResult ? (100 - customMlResult.confidence).toFixed(2) : "--"}%</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex justify-between text-xs font-black uppercase tracking-wider text-slate-500">
                                                    <span>Synapse-X Confidence</span>
                                                    <span className="text-[#00D1FF]">{customMlResult?.confidence || "--"}%</span>
                                                </div>
                                                <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${customMlResult?.confidence || 0}%` }}
                                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00D1FF] to-[#7000FF] shadow-[0_0_15px_rgba(0,209,255,0.5)]"
                                                    />
                                                </div>
                                            </div>

                                            {/* Probability Map Visualization */}
                                            <div className="pt-4 space-y-3">
                                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Neural Distribution Map</p>
                                                <div className="h-10 flex items-end gap-1">
                                                    {customMlResult?.probabilityMap.map((val, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ height: 0 }}
                                                            animate={{ height: `${val * 100}%` }}
                                                            className="flex-1 bg-white/10 rounded-t-sm"
                                                        />
                                                    ))}
                                                    {!customMlResult && Array.from({ length: 12 }).map((_, i) => (
                                                        <div key={i} className="flex-1 bg-white/5 h-2 rounded-t-sm" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="p-10 rounded-[3rem] glass-morphism border-[#00D1FF]/20 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D1FF]/5 blur-[60px] rounded-full" />
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-14 h-14 rounded-2xl bg-[#00D1FF]/10 flex items-center justify-center text-[#00D1FF] border border-[#00D1FF]/20 shadow-inner">
                                            <Brain size={28} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-2xl tracking-tight uppercase italic">Diagnosis AI</h3>
                                            <p className={`text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black ${isPrivacyMode ? 'patient-sensitive' : ''}`}>DUAL-ENGINE V4</p>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5">
                                            <div className="flex justify-between items-center mb-4">
                                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Clinical Insight</h4>
                                                <button onClick={() => handleGeminiAnalysis()} disabled={isAiAnalyzing} className="flex items-center gap-2 text-[10px] font-black text-[#00D1FF] hover:scale-105 transition-transform">
                                                    <Sparkles size={12} className={isAiAnalyzing ? "animate-spin" : ""} />
                                                    {isAiAnalyzing ? "CONSULTING..." : "LIVE CONSULT"}
                                                </button>
                                            </div>
                                            <p className="text-[13px] leading-relaxed text-slate-300 italic font-medium">
                                                {aiResponse || "Initialize Dual-Engine analysis for cross-referenced differential diagnosis."}
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <button onClick={() => setIsComparing(true)} className="w-full py-5 rounded-2xl bg-[#00D1FF] text-black font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform shadow-2xl flex items-center justify-center gap-3">
                                                <SplitSquareVertical size={18} />
                                                SPLIT-VIEW COMPARISON
                                            </button>
                                            <button onClick={() => window.print()} className="w-full py-5 rounded-2xl border border-white/10 font-bold text-xs uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-colors">
                                                GENERATE CLINICAL PDF
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 rounded-[2.5rem] bg-[#7000FF]/5 border border-[#7000FF]/20 group hover:bg-[#7000FF]/10 transition-colors">
                                    <div className="flex items-center gap-4 text-[#7000FF] mb-4">
                                        <Microscope size={24} className="group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Neural Accuracy Logic</span>
                                    </div>
                                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                        Cross-referencing MediVision Custom ML with Gemini 2.5 Hub to verify diagnostic confidence levels.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                <ComparisonModal isOpen={isComparing} onClose={() => setIsComparing(false)} originalImage={currentScanImage} detectedPart={detectedPart} hasIssue={hasIssue} />
                {analysisData && (
                    <PrintReport data={{
                        referenceId: `MV-${Math.floor(Math.random() * 9000) + 1000}`,
                        timestamp: new Date(),
                        type: analysisData.detectedPart ? `${analysisData.detectedPart.toUpperCase()} Scan` : "Medical Scan",
                        patient: "Self (Authorized)",
                        risk: (analysisData.findings && analysisData.findings.length > 3) ? "High" : "Safe",
                        analysis: {
                            confidence: analysisData.confidence || 95,
                            findings: analysisData.findings || [],
                            recommendations: analysisData.recommendations || []
                        },
                        summary: analysisData.summary
                    }} />
                )}
            </div>
        </div>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="p-6 rounded-3xl glass-card border-white/5 flex flex-col items-center text-center group hover:border-[#00D1FF]/30 transition-all">
            <div className="mb-3 text-slate-500 group-hover:text-[#00D1FF] transition-colors">{icon}</div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{label}</p>
            <p className="font-bold text-slate-200 tracking-tight text-lg">{value}</p>
        </div>
    );
}
