"use client";

import { motion } from "framer-motion";
import { Heart, Moon, Footprints, Droplets, ArrowUpRight, TrendingUp } from "lucide-react";

export default function HealthMetrics() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
                icon={<Heart className="text-rose-500" size={20} />}
                label="Resting Heart Rate"
                value="64"
                unit="BPM"
                trend="+2.1%"
                color="rose"
            />
            <MetricCard
                icon={<Moon className="text-indigo-400" size={20} />}
                label="Sleep Quality"
                value="88"
                unit="%"
                trend="+5%"
                color="indigo"
            />
            <MetricCard
                icon={<Footprints className="text-emerald-400" size={20} />}
                label="Daily Steps"
                value="8,432"
                unit="STEPS"
                trend="-12%"
                color="emerald"
            />
            <MetricCard
                icon={<Droplets className="text-[#00D1FF]" size={20} />}
                label="Hydration Level"
                value="2.4"
                unit="LITERS"
                trend="STABLE"
                color="sky"
            />
        </div>
    );
}

function MetricCard({ icon, label, value, unit, trend, color }: { icon: React.ReactNode, label: string, value: string, unit: string, trend: string, color: string }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl glass-card border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
        >
            <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl bg-${color}-500/10`}>
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-widest ${trend.includes('+') ? 'text-emerald-400' : trend.includes('-') ? 'text-rose-400' : 'text-slate-500'}`}>
                    {trend !== 'STABLE' && <TrendingUp size={10} />}
                    {trend}
                </div>
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white italic tracking-tighter">{value}</span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{unit}</span>
                </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[9px] font-black text-[#00D1FF] uppercase tracking-widest">View Historical Data</span>
                <ArrowUpRight size={12} className="text-[#00D1FF]" />
            </div>
        </motion.div>
    );
}
