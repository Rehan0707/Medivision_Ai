"use client";

import { motion } from "framer-motion";
import { Activity, Heart, Zap, ShieldCheck, Thermometer, Droplets, ArrowUpRight, ArrowDownRight, Info, Upload, Sparkles, Scan, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";

import { ECGMonitor } from "@/components/dashboard/ECGMonitor";
import { runLocalInference, MLResult } from "@/lib/ml/engine";

function EcgAnalysisSection() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [localMlResult, setLocalMlResult] = useState<MLResult | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsAnalyzing(true);
        setAnalysisResult(null);

        const reader = new FileReader();
        const base64Promise = new Promise((resolve) => {
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
        const base64 = await base64Promise as string;
        setPreviewImage(base64);

        try {
            // Dual Engine Analysis
            const localPromise = runLocalInference(base64, "ecg");

            const res = await fetch('/api/ai/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: base64,
                    prompt: `Analyze this ECG (Electrocardiogram) scan image/recording. 
                    Identify the heart rhythm, any abnormalities (arrhythmia, tachycardia, bradycardia, etc.), and provide a plain-English explanation of what is happening.
                    Return ONLY a JSON object:
                    {
                        "rhythm": "string",
                        "findings": ["string"],
                        "summary": "string",
                        "confidence": number,
                        "heartRateBpm": number
                    }`
                })
            });

            const data = await res.json();
            const localResult = await localPromise;

            const jsonStr = data.text.replace(/```json|```/g, '').trim();
            setAnalysisResult(JSON.parse(jsonStr));
            setLocalMlResult(localResult);
        } catch (err) {
            console.error("ECG Analysis Error:", err);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="p-10 rounded-[3rem] glass-morphism border-[#00D1FF]/20 bg-[#00D1FF]/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D1FF]/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#00D1FF]/20 flex items-center justify-center text-[#00D1FF] shadow-inner border border-[#00D1FF]/20">
                        <Heart size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black italic uppercase tracking-tight">Cardiovascular <span className="text-[#00D1FF]">Vision</span></h3>
                        <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-black">AI-ECG Recog Layer v4.0</p>
                    </div>
                </div>

                <label className="cursor-pointer group">
                    <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileUpload} />
                    <div className="px-8 py-5 rounded-2xl bg-[#00D1FF] text-black font-black text-xs uppercase tracking-[0.2em] shadow-xl group-hover:scale-105 transition-transform flex items-center gap-3">
                        <Upload size={18} />
                        {isAnalyzing ? "Analyzing Waves..." : "Upload ECG Image"}
                    </div>
                </label>
            </div>

            {isAnalyzing && (
                <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                    <div className="w-20 h-20 rounded-full border-t-2 border-[#00D1FF] animate-spin mb-6" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00D1FF]">Syncing with Cardiac Neural Node...</p>
                </div>
            )}

            {analysisResult && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div className="p-6 rounded-3xl bg-black/40 border border-white/10 aspect-video relative overflow-hidden">
                            {previewImage && <img src={previewImage} className="w-full h-full object-cover opacity-50 grayscale" />}
                            <div className="absolute inset-0 medical-grid opacity-20" />
                            <div className="absolute top-4 right-6 px-3 py-1 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF]/30 text-[#00D1FF] text-[10px] font-black uppercase tracking-widest">Captured Lead</div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Detected BPM</p>
                                <p className="text-2xl font-black text-white">{analysisResult.heartRateBpm || "--"}</p>
                            </div>
                            <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Synapse Confidence</p>
                                <p className="text-2xl font-black text-[#00D1FF]">{localMlResult?.confidence || "--"}%</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-3 text-emerald-400 mb-4">
                                <ShieldCheck size={20} />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">{analysisResult.rhythm || "Neural Analysis Complete"}</span>
                            </div>
                            <p className="text-xl font-medium text-slate-200 leading-relaxed italic">
                                "{analysisResult.summary}"
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Diagnostic Findings</h4>
                            <div className="grid grid-cols-1 gap-3">
                                {analysisResult.findings?.map((f: string, i: number) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 group hover:bg-[#00D1FF]/5 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00D1FF]" />
                                        <span className="text-sm font-medium text-slate-300">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="flex items-center gap-2 text-[10px] font-black text-[#00D1FF] hover:scale-105 transition-transform uppercase tracking-widest">
                            <Sparkles size={14} /> Consult Cardiology AI <ChevronRight size={14} />
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default function SignalsPage() {
    const { isPrivacyMode } = useSettings();
    const [heartRate, setHeartRate] = useState(72);
    const [spo2, setSpo2] = useState(98.4);
    const [temp, setTemp] = useState(36.6);

    // Simulate real-time signal drift (High-fidelity)
    useEffect(() => {
        const interval = setInterval(() => {
            setHeartRate(h => {
                const shift = (Math.random() - 0.5) * 4;
                const newRate = h + shift;
                return Math.max(65, Math.min(85, newRate));
            });
            setSpo2(s => Math.max(97.5, Math.min(99.8, s + (Math.random() - 0.5) * 0.1)));
            setTemp(t => Math.max(36.4, Math.min(37.1, t + (Math.random() - 0.5) * 0.05)));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-10 pb-12">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight uppercase italic underline decoration-[#00D1FF]/30 underline-offset-8">Signal <span className="text-[#00D1FF]">Intelligence</span></h1>
                    <p className="text-slate-400 font-medium">Real-time physiological stream tracking with proprietary Synapse-X cross-referencing.</p>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 shadow-xl shadow-emerald-500/5 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live Secure Stream Active</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Signal Display */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="p-10 rounded-[3rem] glass-morphism border-white/5 relative overflow-hidden bg-white/[0.01]">
                        {/* (Internal Waveform code remains same as before) */}
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-xl font-black flex items-center gap-3 uppercase italic tracking-tight">
                                <div className="w-10 h-10 rounded-xl bg-[#00D1FF]/10 flex items-center justify-center text-[#00D1FF]">
                                    <Activity size={20} />
                                </div>
                                Multi-Channel Waveform
                            </h3>
                            <div className="flex gap-2">
                                <span className="px-4 py-2 rounded-lg bg-[#00D1FF] text-black text-[10px] font-black uppercase tracking-widest cursor-default">ECG</span>
                                <span className="px-4 py-2 rounded-lg bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest cursor-not-allowed">EEG</span>
                                <span className="px-4 py-2 rounded-lg bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest cursor-not-allowed">EMG</span>
                            </div>
                        </div>

                        {/* Real-Time Waveform */}
                        <div className="h-64 w-full relative mb-8 flex items-center justify-center overflow-hidden rounded-3xl bg-black/60 border border-white/10 shadow-inner">
                            <div className="absolute inset-0 opacity-20 medical-grid" />
                            <div className="absolute top-4 left-6 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Live Lead II</span>
                            </div>
                            <ECGMonitor heartRate={heartRate} />
                            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/80 to-transparent pointer-events-none" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <SignalMetric
                                icon={<Heart className="text-red-400" size={18} />}
                                label="Heart Rate"
                                value={`${Math.round(heartRate)}`}
                                unit="BPM"
                                trend="stable"
                            />
                            <SignalMetric
                                icon={<Droplets className="text-blue-400" size={18} />}
                                label="O₂ Saturation"
                                value={`${spo2.toFixed(1)}`}
                                unit="%"
                                trend="up"
                            />
                            <SignalMetric
                                icon={<Thermometer className="text-orange-400" size={18} />}
                                label="Surface Temp"
                                value={`${temp.toFixed(1)}`}
                                unit="°C"
                                trend="stable"
                            />
                        </div>
                    </div>

                    {/* NEW: ECG Upload & AI Analysis Section */}
                    <EcgAnalysisSection />

                    <div className="p-10 rounded-[3rem] glass-card border-[#7000FF]/10 bg-[#7000FF]/[0.02]">
                        <h3 className="text-xl font-black mb-8 flex items-center gap-3 uppercase italic">
                            <Zap className="text-[#7000FF]" size={22} />
                            Neural Pattern Match
                        </h3>
                        <div className="space-y-6">
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">AI is scanning historical patterns for arrhythmia or abnormal recovery signals...</p>
                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm">Sinus Rhythm Verified</h4>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">99.8% Neural Concordance</p>
                                    </div>
                                </div>
                                <ArrowUpRight size={20} className="text-[#00D1FF]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-8">
                    <div className="p-8 rounded-[2.5rem] glass-morphism border-white/5">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Device Sync</h4>
                        <div className="space-y-4">
                            <DeviceItem name="MediLink Implant v2" status="connected" battery={88} />
                            <DeviceItem name="Vitals Patch Alpha" status="connected" battery={42} />
                            <DeviceItem name="Neural Crown 4" status="searching" />
                        </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-gradient-to-tr from-[#00D1FF]/20 to-transparent border border-[#00D1FF]/10 relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-[#00D1FF]/10 flex items-center justify-center text-[#00D1FF] mb-6 shadow-glow">
                                <Info size={24} />
                            </div>
                            <h4 className="font-black text-lg mb-2 uppercase italic tracking-tight">Vitals Summary</h4>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">All physiological signals are within normal clinical thresholds. No immediate action required.</p>
                            <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-black uppercase tracking-widest transition-all">
                                DOWNLOAD LOGS
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function SignalMetric({ icon, label, value, unit, trend }: { icon: any, label: string, value: string, unit: string, trend: 'up' | 'down' | 'stable' }) {
    return (
        <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-xl bg-white/[0.05] text-slate-400 group-hover:text-white transition-colors">{icon}</div>
                <div className="px-2 py-1 rounded-md bg-white/[0.05]">
                    {trend === 'up' && <ArrowUpRight size={14} className="text-emerald-400" />}
                    {trend === 'down' && <ArrowDownRight size={14} className="text-red-400" />}
                    {trend === 'stable' && <Activity size={14} className="text-[#00D1FF]" />}
                </div>
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
            <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white tabular-nums">{value}</span>
                <span className="text-xs font-bold text-slate-500 uppercase">{unit}</span>
            </div>
        </div>
    );
}

function DeviceItem({ name, status, battery }: { name: string, status: 'connected' | 'searching', battery?: number }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700 animate-ping'}`} />
                <span className="text-xs font-bold text-slate-300">{name}</span>
            </div>
            {battery !== undefined && (
                <span className="text-[9px] font-black text-slate-500">{battery}%</span>
            )}
        </div>
    );
}
