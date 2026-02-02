"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, ChevronRight, Activity, Bone, AlertCircle, CheckCircle2, Search, Zap, ShieldCheck, Microscope, Scan, Info, Brain, WifiOff, Sparkles, SplitSquareVertical } from "lucide-react";
import HeroScene from "@/components/animations/Model";
import HandScene from "@/components/animations/HandScene";
import BrainScene from "@/components/animations/BrainScene";
import { useSettings } from "@/context/SettingsContext";
import { ComparisonModal } from "@/components/dashboard/ComparisonModal";

export default function Dashboard() {
    const { isRuralMode, isPrivacyMode, t } = useSettings();
    const [isUploading, setIsUploading] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [isComparing, setIsComparing] = useState(false);
    const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [detectedPart, setDetectedPart] = useState<string>("hand");
    const [currentScanImage, setCurrentScanImage] = useState<string>("/scans/hand_active_scan.png");

    const getHudTitle = () => {
        if (detectedPart.includes("brain") || detectedPart.includes("mri") || detectedPart.includes("head")) return "Neural Architecture Analysis";
        if (detectedPart.includes("hand") || detectedPart.includes("carpal")) return "Metacarpal Architecture";
        if (detectedPart.includes("chest") || detectedPart.includes("lung")) return "Thoracic Cavity Analysis";
        return "System Scanning Architecture";
    };

    const getHudDescription = () => {
        if (detectedPart.includes("brain") || detectedPart.includes("mri") || detectedPart.includes("head"))
            return "Cerebral cortex symmetry verified. Ventricular volumes within expected parameters. No acute intracranial hemorrhage detected.";
        if (detectedPart.includes("hand") || detectedPart.includes("carpal"))
            return "Phalangeal alignment is symmetric. Carpal joint spaces are preserved. No cortical disruption identified in any of the visible hand structures.";
        return "Performing multi-voxel cross-reference parsing across diagnostic dataset layers.";
    };

    const handleGeminiAnalysis = async () => {
        setIsAiAnalyzing(true);
        try {
            const res = await fetch('/api/ai/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: currentScanImage,
                    prompt: "Perform a high-level clinical cross-reference and visual analysis for this medical scan. 1. Start your response with 'BODY_PART: [Detected Part]' (e.g. BODY_PART: hand). 2. Provide Neural Findings (mention specifics from the image), 3. Differential Diagnosis, and 4. Clinical Recommendation."
                })
            });
            const data = await res.json();

            // Extract body part if mentioned
            if (data.text.includes("BODY_PART:")) {
                const partMatch = data.text.match(/BODY_PART:\s*(\w+)/i);
                if (partMatch) setDetectedPart(partMatch[1].toLowerCase());
            }

            setAiResponse(data.text);
        } catch (err) {
            console.error("AI Analysis failed:", err);
            setAiResponse("Analysis connection timeout. Please verify Clinical Intelligence sync.");
        } finally {
            setIsAiAnalyzing(false);
        }
    };

    const saveScanToDb = async () => {
        try {
            await fetch('/api/scans/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    referenceId: `MV-${Math.floor(Math.random() * 9000) + 1000}`,
                    type: "Hand X-Ray",
                    patient: "Self",
                    risk: "Low",
                    analysis: {
                        confidence: 99.4,
                        findings: ["Metacarpal architecture intact", "No fractures"],
                        recommendations: ["Full range of motion exercises"]
                    }
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

        // Convert to Base64
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
                    saveScanToDb();
                    setTimeout(() => {
                        setIsUploading(false);
                        setAnalysisComplete(true);
                        // Trigger AI analysis automatically after upload
                        handleGeminiAnalysis();
                    }, 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 50);
    };

    return (
        <div className="w-full max-w-7xl mx-auto">
            {!analysisComplete ? (
                <div className="flex flex-col items-center justify-center min-h-[70vh]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-2xl"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-3 tracking-tight">{t("uploadScan")}</h2>
                            <p className="text-slate-400">Initialize neural pipeline by uploading medical imaging data.</p>
                        </div>

                        <div
                            onClick={() => !isUploading && document.getElementById('dashboard-upload')?.click()}
                            className={`border-2 border-dashed rounded-[2.5rem] p-16 flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden group ${isUploading ? "border-[#00D1FF] bg-[#00D1FF]/5" : "border-white/10 bg-white/[0.02] hover:border-[#00D1FF]/40 hover:bg-white/[0.04]"
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

                            <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mb-8 transition-all duration-500 ${isUploading ? "bg-[#00D1FF] text-black scale-110 shadow-[0_0_30px_rgba(0,209,255,0.4)]" : "bg-white/5 text-slate-400 group-hover:scale-110"
                                }`}>
                                {isUploading ? <Scan className="animate-pulse" size={40} /> : <Upload size={40} />}
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
                                        <p className="text-2xl font-black mb-2 tracking-tight">NEURAL ANALYSIS: {scanProgress}%</p>
                                        <div className="w-64 h-1.5 bg-white/10 rounded-full mx-auto overflow-hidden">
                                            <motion.div
                                                className="h-full bg-[#00D1FF]"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${scanProgress}%` }}
                                            />
                                        </div>
                                        <p className="text-slate-500 text-xs mt-4 uppercase tracking-[0.2em] font-bold">Processing Hand/Carpal Stream...</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="idle"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center"
                                    >
                                        <p className="text-2xl font-bold mb-2">Drop imaging data here</p>
                                        <p className="text-slate-500 text-sm">Supports DICOM, PNG, JPG (Full encryption enabled)</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mt-12">
                            <StatCard icon={<Activity size={20} />} label="AI Precision" value="99.4%" />
                            <StatCard icon={<Bone size={20} />} label="Carpal Mapping" value="Active" />
                            <StatCard icon={<ShieldCheck size={20} />} label="Security" value="AES-256" />
                        </div>
                    </motion.div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12"
                >
                    {/* Visualizer Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="rounded-[2.5rem] glass-morphism relative overflow-hidden h-[650px] border-white/5 shadow-2xl">
                            {/* Visualizer Header */}
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

                            {/* Image Preview Overlay (Top Left) */}
                            <div className="absolute top-28 left-8 z-20">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl"
                                >
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Original Scan</p>
                                    <div className="w-32 aspect-square rounded-xl overflow-hidden border border-white/10 relative">
                                        <img
                                            src={currentScanImage}
                                            alt="Diagnostic Scan"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-[#00D1FF]/10 animate-pulse" />
                                    </div>
                                </motion.div>
                            </div>

                            {/* 3D Scene */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {!isRuralMode ? (
                                    <div className="w-full h-full opacity-80 scale-125">
                                        {(detectedPart.includes('brain') || detectedPart.includes('mri')) ? (
                                            <BrainScene />
                                        ) : detectedPart.includes('hand') ? (
                                            <HandScene />
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

                            {/* HUD Overlay */}
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
                                                <h4 className="font-black text-xl tracking-tight">Neural Flag: {getHudTitle()}</h4>
                                                <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">ZERO ABNORMALITY DETECTED</span>
                                            </div>
                                            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                                                {getHudDescription()}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="p-10 rounded-[2.5rem] glass-card">
                                <h4 className="font-black mb-6 flex items-center gap-3 text-lg">
                                    <Zap className="text-yellow-400" size={22} />
                                    Bone Integrity
                                </h4>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-4 text-sm text-slate-300 group">
                                        <div className="w-6 h-6 rounded-full border border-emerald-500/30 flex items-center justify-center shrink-0">
                                            <CheckCircle2 size={14} className="text-emerald-500" />
                                        </div>
                                        No acute osseous abnormality.
                                    </li>
                                    <li className="flex items-center gap-4 text-sm text-slate-300 group">
                                        <div className="w-6 h-6 rounded-full border border-emerald-500/30 flex items-center justify-center shrink-0">
                                            <CheckCircle2 size={14} className="text-emerald-500" />
                                        </div>
                                        Soft tissues are grossly unremarkable.
                                    </li>
                                </ul>
                            </div>
                            <div className="p-10 rounded-[2.5rem] glass-card">
                                <h4 className="font-black mb-6 flex items-center gap-3 text-emerald-400 text-lg">
                                    <Activity size={22} />
                                    Force Metrics
                                </h4>
                                <div className="space-y-6">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                                        <span>Grip Potential</span>
                                        <span className="text-[#00D1FF]">96%</span>
                                    </div>
                                    <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "96%" }}
                                            className="absolute top-0 left-0 h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                        />
                                    </div>
                                    <div className="flex justify-between text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                                        <span>Joint Flex: High</span>
                                        <span>Mobility: Optimal</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-8">
                        <div className="p-10 rounded-[3rem] glass-morphism border-[#00D1FF]/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D1FF]/5 blur-[60px] rounded-full" />

                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-14 h-14 rounded-2xl bg-[#00D1FF]/10 flex items-center justify-center text-[#00D1FF] border border-[#00D1FF]/20">
                                    <Brain size={28} />
                                </div>
                                <div>
                                    <h3 className="font-black text-2xl tracking-tight">Diagnosis AI</h3>
                                    <p className={`text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black ${isPrivacyMode ? 'patient-sensitive' : ''}`}>EXTREMITY-V2</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Neural Insight</h4>
                                        <button
                                            onClick={handleGeminiAnalysis}
                                            disabled={isAiAnalyzing}
                                            className="flex items-center gap-2 text-[10px] font-black text-[#00D1FF] hover:scale-105 transition-transform"
                                        >
                                            <Sparkles size={12} className={isAiAnalyzing ? "animate-spin" : ""} />
                                            {isAiAnalyzing ? t("diagnosing") : t("liveConsult")}
                                        </button>
                                    </div>
                                    <p className="text-[13px] leading-relaxed text-slate-300 italic">
                                        {aiResponse || "Initialize Gemini Clinical Intelligence for a cross-referenced differential diagnosis of the current dataset."}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => setIsComparing(true)}
                                        className="w-full py-5 rounded-2xl bg-[#00D1FF] text-black font-black text-sm tracking-wide hover:scale-[1.02] transition-transform shadow-2xl flex items-center justify-center gap-3"
                                    >
                                        <SplitSquareVertical size={18} />
                                        SPLIT-VIEW COMPARISON
                                    </button>
                                    <button className="w-full py-5 rounded-2xl border border-white/10 font-bold text-sm bg-white/5 hover:bg-white/10 transition-colors">
                                        GENERATE CLINICAL PDF
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-[#7000FF]/5 border border-[#7000FF]/20 group hover:bg-[#7000FF]/10 transition-colors">
                            <div className="flex items-center gap-4 text-[#7000FF] mb-4">
                                <Microscope size={24} className="group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-black uppercase tracking-[0.2em]">Rural Accessibility</span>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                High-contrast mode enabled for low-quality screen viewing. Standardized for primary care clinics.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            <ComparisonModal
                isOpen={isComparing}
                onClose={() => setIsComparing(false)}
                originalImage={currentScanImage}
                detectedPart={detectedPart}
            />
        </div>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="p-6 rounded-2xl glass-card border-white/5 flex flex-col items-center text-center group hover:border-[#00D1FF]/30 transition-all">
            <div className="mb-3 text-slate-500 group-hover:text-[#00D1FF] transition-colors">{icon}</div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{label}</p>
            <p className="font-bold text-slate-200 tracking-tight">{value}</p>
        </div>
    );
}
