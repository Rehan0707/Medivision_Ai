"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Activity,
    Bone,
    Stethoscope,
    History,
    Settings,
    Users2,
    ChevronLeft,
    ChevronRight,
    LogOut,
    FileSearch,
    ShieldCheck,
    TrendingUp
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSettings } from "@/context/SettingsContext";

export function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { t } = useSettings();

    const menuItems = [
        { name: t("dashboard"), icon: LayoutDashboard, href: "/dashboard" },
        { name: t("visualizer"), icon: Bone, href: "/dashboard/visualizer" },
        { name: t("signals"), icon: Activity, href: "/dashboard/signals" },
        { name: t("trends"), icon: TrendingUp, href: "/dashboard/trends" },
        { name: t("labReports"), icon: FileSearch, href: "/dashboard/lab-reports" },
        { name: t("rehab"), icon: ChevronRight, href: "/dashboard/rehab" },
        { name: t("copilot"), icon: Stethoscope, href: "/dashboard/copilot" },
        { name: t("history"), icon: History, href: "/dashboard/history" },
        { name: t("settings"), icon: Settings, href: "/dashboard/settings" },
    ];

    return (
        <motion.div
            initial={false}
            animate={{ width: isCollapsed ? "80px" : "280px" }}
            className="h-screen sticky top-0 bg-[#020617]/50 backdrop-blur-xl border-r border-white/5 flex flex-col transition-all duration-300 ease-in-out z-40"
        >
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00D1FF] to-[#7000FF] flex items-center justify-center font-bold text-black shrink-0 shadow-[0_0_15px_rgba(0,209,255,0.3)]">
                    MV
                </div>
                {!isCollapsed && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-bold text-xl tracking-tight whitespace-nowrap"
                    >
                        MediVision <span className="text-[#00D1FF]">AI</span>
                    </motion.span>
                )}
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#00D1FF] text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#00D1FF]/20"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Menu Items */}
            <nav className="flex-1 px-4 mt-10 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group relative ${isActive
                                ? "bg-[#00D1FF]/10 text-[#00D1FF] font-semibold"
                                : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                                }`}
                        >
                            <item.icon size={22} className={isActive ? "text-[#00D1FF]" : "group-hover:text-white transition-colors"} />
                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="whitespace-nowrap"
                                >
                                    {item.name}
                                </motion.span>
                            )}
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute left-0 w-1 h-6 bg-[#00D1FF] rounded-r-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Vision & Disclaimer Area */}
            {!isCollapsed && (
                <div className="px-6 mb-6">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                        <div className="flex items-center gap-2 text-[#00D1FF]">
                            <ShieldCheck size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Vision Protocol</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed italic">
                            "Transforming medical data into clear visual insights."
                        </p>
                        <div className="pt-2 border-t border-white/5">
                            <p className="text-[8px] text-slate-600 uppercase font-black tracking-tighter">
                                Assistive AI • Not for Diagnosis
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Area */}
            <div className="p-4 border-t border-white/5 space-y-2">
                <Link
                    href="/dashboard/settings"
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all group"
                >
                    <Settings size={22} />
                    {!isCollapsed && <span>Settings</span>}
                </Link>
                <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all group">
                    <LogOut size={22} />
                    {!isCollapsed && <span>Sign Out</span>}
                </button>
            </div>
        </motion.div>
    );
}
