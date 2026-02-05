"use client";

import { motion } from "framer-motion";
import { Settings, Shield, Globe, WifiOff, Bell, User, CheckCircle2, ChevronRight, Moon, Lock } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function SettingsPage() {
    const { isRuralMode, isPrivacyMode, setIsRuralMode, setIsPrivacyMode, userRole } = useSettings();

    return (
        <div className="space-y-10 pb-12">
            <div>
                <h1 className="text-4xl font-black mb-2 tracking-tight">System <span className="text-[#00D1FF]">Settings</span></h1>
                <p className="text-slate-400">Manage your neural identity, node preferences, and privacy blockade level.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile & Identity */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="p-10 rounded-[3rem] glass-morphism border-white/5 bg-white/[0.01]">
                        <h3 className="text-xl font-black mb-10 flex items-center gap-3 uppercase italic">
                            <User className="text-[#00D1FF]" size={22} />
                            Identity Profile
                        </h3>
                        <div className="flex flex-col md:flex-row items-center gap-10 mb-10 pb-10 border-b border-white/5">
                            <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-[#00D1FF] flex items-center justify-center text-4xl font-black">
                                {userRole === 'doctor' ? 'DR' : 'JD'}
                            </div>
                            <div className="space-y-2 text-center md:text-left">
                                <h4 className="text-2xl font-black">{userRole === 'doctor' ? 'Dr. Clinical User' : 'John Doe'}</h4>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">{userRole} Identity ID: #MV-9921-X</p>
                                <div className="flex gap-3 justify-center md:justify-start">
                                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">Verified</span>
                                    <span className="px-3 py-1 rounded-full bg-[#7000FF]/10 text-[#7000FF] text-[10px] font-black uppercase tracking-widest border border-[#7000FF]/20 text-blue-glow">Pro Member</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Email Address</label>
                                <input type="text" value="user@medivision.ai" readOnly className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-slate-300 font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Language Protocol</label>
                                <select className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-slate-300 font-medium outline-none focus:border-[#00D1FF]/50">
                                    <option>English (Global)</option>
                                    <option>Hindi (Localized)</option>
                                    <option>Spanish (ES)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 rounded-[3rem] glass-morphism border-white/5">
                        <h3 className="text-xl font-black mb-10 flex items-center gap-3 uppercase italic">
                            <Shield className="text-[#7000FF]" size={22} />
                            Platform Logic
                        </h3>
                        <div className="space-y-6">
                            <ToggleSetting
                                icon={<WifiOff size={20} />}
                                title="Rural Access Mode"
                                description="Optimizes performance for low-bandwidth environments by reducing 3D model complexity."
                                active={isRuralMode}
                                onToggle={() => setIsRuralMode(!isRuralMode)}
                            />
                            <ToggleSetting
                                icon={<Lock size={20} />}
                                title="Privacy Shield"
                                description="Anonymizes sensitive patient data across all diagnostic views for classroom or remote sharing."
                                active={isPrivacyMode}
                                onToggle={() => setIsPrivacyMode(!isPrivacyMode)}
                            />
                            <ToggleSetting
                                icon={<Bell size={20} />}
                                title="Neural Notifications"
                                description="Receive haptic and visual updates for real-time scan analysis completion."
                                active={true}
                                onToggle={() => { }}
                            />
                        </div>
                    </div>
                </div>

                {/* Account Security */}
                <div className="space-y-8">
                    <div className="p-8 rounded-[2.5rem] glass-card border-white/5">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Security Hub</h4>
                        <div className="space-y-4">
                            <button className="w-full p-4 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-slate-300 flex items-center justify-between hover:bg-white/10 transition-all">
                                <span>Change Secure Password</span>
                                <ChevronRight size={14} />
                            </button>
                            <button className="w-full p-4 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-slate-300 flex items-center justify-between hover:bg-white/10 transition-all">
                                <span>Multi-Factor (2FA)</span>
                                <span className="text-emerald-500 text-[9px] font-black uppercase">Active</span>
                            </button>
                            <button className="w-full p-4 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-slate-300 flex items-center justify-between hover:bg-white/10 transition-all">
                                <span>Login History</span>
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="p-8 rounded-[3rem] bg-gradient-to-tr from-[#00D1FF]/20 to-transparent border border-[#00D1FF]/10">
                        <Moon size={32} className="text-[#00D1FF] mb-6 shadow-glow" />
                        <h4 className="font-black text-lg mb-2 uppercase italic">Diagnostic Mode</h4>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">Platform default is set to Clinical Dark. Light mode is available upon regional health board request.</p>
                        <button className="w-full py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest">
                            ENABLE LIGHT MODE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ToggleSetting({ icon, title, description, active, onToggle }: { icon: any, title: string, description: string, active: boolean, onToggle: () => void }) {
    return (
        <div className="flex items-start justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-white/10 transition-all">
            <div className="flex gap-4">
                <div className={`p-3 rounded-xl bg-white/5 ${active ? 'text-[#00D1FF]' : 'text-slate-500'}`}>{icon}</div>
                <div>
                    <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors">{title}</h4>
                    <p className="text-xs text-slate-500 font-medium max-w-md leading-relaxed">{description}</p>
                </div>
            </div>
            <button
                onClick={onToggle}
                className={`w-14 h-8 rounded-full p-1 transition-all ${active ? 'bg-[#00D1FF]' : 'bg-slate-800'}`}
            >
                <motion.div
                    animate={{ x: active ? 24 : 0 }}
                    className="w-6 h-6 rounded-full bg-white shadow-lg"
                />
            </button>
        </div>
    );
}
