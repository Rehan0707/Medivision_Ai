"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ShieldCheck, Mail, Lock, User, UserPlus, LogIn, ChevronRight, Zap, Globe, Microscope, Activity } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState<"patient" | "doctor" | "admin">("patient");
    const { setUserRole } = useSettings();
    const router = useRouter();

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock Auth Logic
        setUserRole(role);
        router.push("/dashboard");
    };

    const handleGoogleAuth = () => {
        // Mock Google Auth
        setUserRole("patient");
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden selection:bg-[#00D1FF]/30">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#00D1FF]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#7000FF]/5 blur-[120px] rounded-full" />
                <div className="absolute top-0 left-0 w-full h-full medical-grid opacity-20" />
            </div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                    }
                }}
                className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10"
            >
                {/* Visual Side */}
                <div className="hidden lg:block space-y-12 text-left">
                    <motion.div className="space-y-6">
                        <motion.div
                            variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                        >
                            <Link href="/" className="inline-block group">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00D1FF] to-[#7000FF] flex items-center justify-center font-bold text-black text-xl shadow-[0_0_20px_rgba(0,209,255,0.3)] group-hover:scale-110 transition-transform">
                                        MV
                                    </div>
                                    <span className="text-xl font-black tracking-tighter uppercase italic">MediVision AI</span>
                                </div>
                            </Link>
                        </motion.div>
                        <motion.h1
                            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                            className="text-7xl font-black tracking-tight leading-tight"
                        >
                            Access the <br />
                            <span className="gradient-text italic">Neural Network</span>
                        </motion.h1>
                        <motion.p
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                            className="text-slate-400 text-lg max-w-md leading-relaxed font-medium"
                        >
                            MediVision AI is transforming the diagnostic experience with real-time neural visualization and clinical intelligence.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        className="space-y-8"
                    >
                        <AuthFeature icon={<ShieldCheck size={20} />} text="End-to-end encrypted medical data" />
                        <AuthFeature icon={<Microscope size={20} />} text="AI-powered diagnostic assistance" />
                        <AuthFeature icon={<Activity size={20} />} text="Real-time physiological stream tracking" />
                    </motion.div>
                </div>

                {/* Form Side */}
                <motion.div
                    variants={{ hidden: { scale: 0.95, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
                    className="w-full max-w-md mx-auto"
                >
                    <div className="p-10 rounded-[3rem] glass-morphism border-white/5 relative overflow-hidden bg-white/[0.01] shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00D1FF] via-[#7000FF] to-[#00D1FF]" />

                        <div className="mb-10 flex justify-center">
                            <div className="bg-white/5 p-1 rounded-2xl border border-white/5 flex gap-1">
                                <button
                                    onClick={() => setIsLogin(true)}
                                    className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isLogin ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => setIsLogin(false)}
                                    className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${!isLogin ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>

                        <div className="mb-8 text-center px-4">
                            <h2 className="text-3xl font-black mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h2>
                            <p className="text-sm text-slate-500">{isLogin ? "Log in to view your medical vault." : "Join the future of healthcare today."}</p>
                        </div>

                        <div className="space-y-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleGoogleAuth}
                                className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-sm font-bold tracking-tight"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                {isLogin ? "Sign in with Google" : "Sign up with Google"}
                            </motion.button>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-[#020617] px-4 text-slate-500 font-bold tracking-[0.2em]">OR</span>
                                </div>
                            </div>

                            <form onSubmit={handleAuth} className="space-y-5">
                                <AnimatePresence mode="wait">
                                    {!isLogin && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-5"
                                        >
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00D1FF] transition-colors" size={18} />
                                                <input
                                                    type="text"
                                                    placeholder="Full Name"
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-all font-medium placeholder:text-slate-600"
                                                />
                                            </div>

                                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Identity Verification</p>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {["patient", "doctor", "admin"].map((r) => (
                                                        <motion.button
                                                            key={r}
                                                            type="button"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => setRole(r as any)}
                                                            className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${role === r ? 'bg-[#00D1FF] text-black border-[#00D1FF] shadow-[0_0_15px_rgba(0,209,255,0.3)]' : 'bg-white/5 text-slate-500 border-white/5 hover:border-white/20'}`}
                                                        >
                                                            {r}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00D1FF] transition-colors" size={18} />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-all font-medium placeholder:text-slate-600"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00D1FF] transition-colors" size={18} />
                                        <input
                                            type="password"
                                            placeholder="Secure Password"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-all font-medium placeholder:text-slate-600"
                                        />
                                    </div>
                                    {isLogin && (
                                        <div className="flex justify-end px-2">
                                            <button type="button" className="text-[10px] font-bold text-slate-500 hover:text-[#00D1FF] transition-colors uppercase tracking-widest">
                                                Forgot Password?
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#00D1FF] to-[#7000FF] text-black font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#00D1FF]/10 transition-all flex items-center justify-center gap-3 mt-4"
                                >
                                    {isLogin ? "AUTHORIZE ACCESS" : "INITIALIZE ACCOUNT"}
                                    <ChevronRight size={16} />
                                </motion.button>
                            </form>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase">
                                Secured by <span className="text-[#00D1FF]">Neural-Blockade v4.1</span>
                            </p>
                        </div>
                    </div>

                    <motion.div
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        className="mt-12 flex justify-center gap-8 text-slate-500"
                    >
                        <Link href="/" className="flex items-center gap-2 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                            <Globe size={14} /> Global Access
                        </Link>
                        <button className="flex items-center gap-2 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                            <ShieldCheck size={14} /> Bio-Metrics
                        </button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}

function AuthFeature({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-[#00D1FF] group-hover:scale-110 transition-transform shadow-inner">
                {icon}
            </div>
            <p className="text-slate-300 font-bold text-sm tracking-tight">{text}</p>
        </div>
    );
}
