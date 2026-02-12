"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Activity, Target, Layers, Box, ChevronRight, CheckCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { apiUrl, authHeaders } from "@/lib/api";

interface XvrRegistrationPanelProps {
    image: string;
    onRegistrationComplete: (data: any) => void;
}

export default function XvrRegistrationPanel({ image, onRegistrationComplete }: XvrRegistrationPanelProps) {
    const { data: session } = useSession();
    const [status, setStatus] = useState<"idle" | "registering" | "complete" | "error">("idle");
    const [metrics, setMetrics] = useState<any>(null);

    const startRegistration = async () => {
        setStatus("registering");
        try {
            const res = await fetch(apiUrl('/api/ai/xvr-registration'), {
                method: 'POST',
                headers: authHeaders((session as any)?.accessToken),
                body: JSON.stringify({ image })
            });
            const data = await res.json();
            setMetrics(data);
            setStatus("complete");
            onRegistrationComplete(data);
        } catch (error) {
            console.error("XVR Registration failed:", error);
            setStatus("error");
        }
    };

    return (
        <div className="p-8 glass-card rounded-[2.5rem] border-[#00D1FF]/20 relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00D1FF]/10 flex items-center justify-center text-[#00D1FF]">
                        <Box size={20} />
                    </div>
                    <div>
                        <h3 className="font-black text-xs uppercase tracking-widest text-slate-300">XVR System</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">2D/3D Volume Registration</p>
                    </div>
                </div>
                {status === "complete" && <CheckCircle2 className="text-emerald-400" size={20} />}
            </div>

            {status === "idle" && (
                <div className="space-y-4">
                    <p className="text-[10px] text-slate-400 leading-relaxed italic">
                        Initialize patient-specific pose regression to align the 2D X-ray with its corresponding 3D anatomical volume.
                    </p>
                    <button
                        onClick={startRegistration}
                        className="w-full py-4 rounded-xl bg-[#00D1FF]/10 border border-[#00D1FF]/20 text-[#00D1FF] font-black text-[10px] tracking-widest uppercase hover:bg-[#00D1FF]/20 transition-all flex items-center justify-center gap-2"
                    >
                        Initialize XVR-Net <ChevronRight size={14} />
                    </button>
                </div>
            )}

            {status === "registering" && (
                <div className="space-y-6">
                    <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 5, ease: "easeInOut" }}
                            className="absolute inset-y-0 bg-[#00D1FF]"
                        />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#00D1FF]">
                        <span className="animate-pulse">Optimizing Pose...</span>
                        <span>Scale 8/8</span>
                    </div>
                </div>
            )}

            {status === "complete" && metrics && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <MetricBox label="MACE (mm)" value={metrics.registration_metrics.mace_mm} color="#00D1FF" />
                        <MetricBox label="CONFIDENCE" value={`${(metrics.registration_metrics.confidence * 100).toFixed(0)}%`} color="#10b981" />
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Estimated 6-DOF Pose</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            <PoseValue label="Rot X" value={metrics.pose.rotation[0].toFixed(3)} />
                            <PoseValue label="Tra X" value={metrics.pose.translation[0].toFixed(1)} />
                            <PoseValue label="Rot Y" value={metrics.pose.rotation[1].toFixed(3)} />
                            <PoseValue label="Tra Y" value={metrics.pose.translation[1].toFixed(1)} />
                            <PoseValue label="Rot Z" value={metrics.pose.rotation[2].toFixed(3)} />
                            <PoseValue label="Tra Z" value={metrics.pose.translation[2].toFixed(1)} />
                        </div>
                    </div>

                    <button className="w-full py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black text-[9px] tracking-widest uppercase cursor-default">
                        Registration Verified
                    </button>
                </div>
            )}

            {status === "error" && (
                <div className="text-center py-4 text-red-400 text-[10px] font-black uppercase tracking-widest">
                    Registration Engine Offline
                </div>
            )}
        </div>
    );
}

function MetricBox({ label, value, color }: { label: string, value: any, color: string }) {
    return (
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
            <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-1">{label}</p>
            <p className="text-sm font-black" style={{ color }}>{value}</p>
        </div>
    );
}

function PoseValue({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex justify-between items-center py-1 border-b border-white/5 last:border-0">
            <span className="text-[9px] text-slate-500 font-bold uppercase">{label}</span>
            <span className="text-[10px] font-black text-white">{value}</span>
        </div>
    );
}
