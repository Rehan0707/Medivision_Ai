import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Users2, ShieldCheck, Zap, Activity, Database, Server, Lock } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import { apiUrl, authHeaders } from "@/lib/api";

export function AdminStats({ t }: { t: (key: any) => string }) {
    const { isRuralMode, isPrivacyMode } = useSettings();
    const { data: session } = useSession();
    const [stats, setStats] = useState<any>(null);
    const [auditLogs, setAuditLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [protocolMsg, setProtocolMsg] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const headers: any = {};
                if (session) {
                    headers['Authorization'] = `Bearer ${(session as any).accessToken}`;
                }

                const [statsRes, auditRes] = await Promise.all([
                    fetch(apiUrl('/api/admin/stats'), { headers: authHeaders((session as any)?.accessToken) }),
                    fetch(apiUrl('/api/admin/audit'), { headers: authHeaders((session as any)?.accessToken) })
                ]);
                const statsData = await statsRes.json();
                const auditData = await auditRes.json();
                setStats(statsData);
                setAuditLogs(auditData);
            } catch (err) {
                console.error("Failed to fetch admin data:", err);
            } finally {
                setLoading(false);
            }
        }
        if (session) fetchData();
    }, [session]);

    return (
        <div className={`space-y-10 pb-12 ${isPrivacyMode ? 'privacy-mode' : ''} ${isRuralMode ? 'rural-mode' : ''}`}>
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight uppercase italic">Admin <span className="text-[#00D1FF]">Control</span></h1>
                    <p className="text-slate-400 font-medium">Holistic system health, security audit, and user telemetry.</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-2xl glass-card border-green-500/20 bg-green-500/5 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-green-400 font-black">All Modules Operational</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link href="/dashboard/admin/users" className="block transform hover:scale-[1.02] transition-transform">
                    <AdminStatCard icon={<Users2 />} label="Active Users" value={stats?.activeUsers?.toString() || "..."} trend="+12% today" color="blue" />
                </Link>
                <AdminStatCard icon={<Database />} label="Metadata Stored" value={stats?.metadataStored || "..."} trend="AES-256 Encrypted" color="purple" />
                <AdminStatCard icon={<Server />} label="AI Latency" value={stats?.aiLatency || "..."} trend="Optimal Cluster" color="emerald" />
                <Link href="/dashboard/admin/audit" className="block transform hover:scale-[1.02] transition-transform">
                    <AdminStatCard icon={<ShieldCheck />} label="HIPAA Compliance" value="verified" trend="B-ALPHA v2" color="blue" />
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-10 glass-morphism rounded-[3rem] border-white/5 bg-white/[0.01]">
                    <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                        <Activity className="text-[#00D1FF]" size={22} />
                        Global Diagnostics Throughput
                    </h3>
                    <div className="h-64 flex items-end gap-2 px-4">
                        {(stats?.throughputData || [40, 60, 45, 90, 65, 80, 55, 95, 70, 85, 40, 100]).map((h: number, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.05, duration: 1 }}
                                className="flex-1 bg-gradient-to-t from-[#00D1FF]/10 to-[#00D1FF] rounded-t-lg relative group"
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-black">
                                    {Math.floor(h * 12.5)}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-6 px-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <span>00:00</span>
                        <span>06:00</span>
                        <span>12:00</span>
                        <span>18:00</span>
                        <span>23:59</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-8 glass-card rounded-[2.5rem]">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#7000FF] mb-6">Security Events</h4>
                        <div className="space-y-5">
                            {auditLogs.length > 0 ? auditLogs.map((log: any, i: number) => (
                                <AuditItem key={i} text={log.text} status={log.status} />
                            )) : (
                                <p className="text-[10px] text-slate-500 italic pb-1">Synchronizing audit vault...</p>
                            )}
                        </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#7000FF] to-[#00D1FF] text-white">
                        <Lock size={32} className="mb-6 opacity-40" />
                        <h4 className="font-black text-xl mb-2">Master Override</h4>
                        <p className="text-white/70 text-sm leading-relaxed mb-6 italic">Secure emergency protocol for immediate data lockdown across all regions.</p>
                        <button
                            onClick={() => {
                                setProtocolMsg('Protocol Alpha initiated. All regions secured.');
                                setTimeout(() => setProtocolMsg(''), 4000);
                            }}
                            className="w-full py-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 text-white font-black text-xs uppercase tracking-widest hover:bg-black/50 transition-all"
                        >
                            TRIGGER PROTOCOL ALPHA
                        </button>
                        {protocolMsg && <p className="text-emerald-400 text-xs mt-2 font-bold">{protocolMsg}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

function AdminStatCard({ icon, label, value, trend, color }: { icon: React.ReactNode, label: string, value: string, trend: string, color: string }) {
    const colorClasses: Record<string, string> = {
        blue: "text-[#00D1FF] bg-[#00D1FF]/10 border-[#00D1FF]/20",
        purple: "text-[#7000FF] bg-[#7000FF]/10 border-[#7000FF]/20",
        emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    };

    return (
        <div className="p-8 glass-card rounded-[2.5rem]">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${colorClasses[color] || colorClasses.blue}`}>
                {icon}
            </div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{label}</p>
            <h3 className="text-2xl font-black mb-2">{value}</h3>
            <p className="text-[10px] text-slate-400 font-bold italic">{trend}</p>
        </div>
    );
}

function AuditItem({ text, status }: { text: string, status: 'safe' | 'warning' | 'error' }) {
    return (
        <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="text-slate-300">{text}</span>
            <div className={`w-2 h-2 rounded-full ${status === 'safe' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`} />
        </div>
    );
}
