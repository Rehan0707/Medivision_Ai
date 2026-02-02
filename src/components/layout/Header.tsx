"use client";

import { Bell, Search, User, Globe, Wifi, WifiOff, ShieldCheck, ShieldAlert } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export function Header() {
    const {
        isRuralMode, setIsRuralMode,
        isPrivacyMode, setIsPrivacyMode,
        language, setLanguage
    } = useSettings();

    return (
        <header className="h-20 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
            <div className="flex items-center gap-6 flex-1">
                <div className="relative max-w-md w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search patients, scans, or reports..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-all font-medium"
                    />
                </div>

                <div className="hidden lg:flex items-center gap-3">
                    <button
                        onClick={() => setIsRuralMode(!isRuralMode)}
                        title="Rural Mode (Low Bandwidth)"
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${isRuralMode
                            ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                            : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                            }`}
                    >
                        {isRuralMode ? <WifiOff size={16} /> : <Wifi size={16} />}
                        <span className="text-[10px] font-black uppercase tracking-widest">{isRuralMode ? 'Rural Mode' : 'High-Bandwidth'}</span>
                    </button>

                    <button
                        onClick={() => setIsPrivacyMode(!isPrivacyMode)}
                        title="Privacy Mode (Anonymize Data)"
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${isPrivacyMode
                            ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                            : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                            }`}
                    >
                        {isPrivacyMode ? <ShieldAlert size={16} /> : <ShieldCheck size={16} />}
                        <span className="text-[10px] font-black uppercase tracking-widest">{isPrivacyMode ? 'Privacy On' : 'Standard'}</span>
                    </button>

                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as any)}
                        className="bg-white/5 border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl outline-none hover:bg-white/10 transition-all cursor-pointer"
                    >
                        <option value="en">EN</option>
                        <option value="hi">हिन्दी</option>
                        <option value="mr">मराठी</option>
                        <option value="ta">தமிழ்</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">System Live</span>
                </div>

                <button className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                    <Bell size={20} className="text-slate-300 group-hover:text-white transition-colors" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-[#00D1FF] rounded-full border-2 border-[#020617] group-hover:scale-125 transition-transform" />
                </button>

                <div className="flex items-center gap-4 pl-6 border-l border-white/10 ml-2">
                    <div className="text-right hidden sm:block">
                        <p className={`text-sm font-black tracking-tight ${isPrivacyMode ? 'patient-data' : ''}`}>Dr. Rehan S.</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">Neurologist</p>
                    </div>
                    <button className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-300 p-[1px] group">
                        <div className="w-full h-full rounded-[15px] bg-[#020617] flex items-center justify-center overflow-hidden group-hover:bg-slate-900 transition-colors">
                            <User size={24} className="text-slate-200" />
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
}
