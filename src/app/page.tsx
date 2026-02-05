"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Brain, Activity, Bone, FlaskConical, ChevronRight, ShieldCheck, Microscope, Zap, ArrowRight, CheckCircle2, Globe2 } from "lucide-react";
import HeroScene from "@/components/animations/Model";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#020617] overflow-x-hidden selection:bg-[#00D1FF]/30">
      {/* Background Elements */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#00D1FF]/5 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#7000FF]/5 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-0 left-0 w-full h-full medical-grid opacity-20" />
        <motion.div
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00D1FF]/50 to-transparent shadow-[0_0_20px_rgba(0,209,255,0.5)] opacity-30"
        />
      </motion.div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 w-full z-50 px-10 py-8 flex justify-between items-center pointer-events-auto bg-[#020617]/50 backdrop-blur-md border-b border-white/5"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 180 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00D1FF] to-[#7000FF] flex items-center justify-center font-bold text-black shadow-lg"
          >
            MV
          </motion.div>
          <span className="text-xl font-black tracking-tighter uppercase italic">MediVision AI</span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/auth" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
            Support
          </Link>
          <Link href="/auth" className="px-8 py-3 rounded-xl glass-morphism border-white/10 text-xs font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
            Sign In
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-48 pb-20 mx-auto max-w-7xl z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            className="z-10 text-left"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-bold text-[#00D1FF] mb-8 border-[#00D1FF]/20"
            >
              <Zap size={14} className="animate-pulse" />
              <span className="tracking-[0.2em] uppercase">The Future of Medical Imaging</span>
            </motion.div>

            <motion.h1
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              className="text-7xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-white"
            >
              Visualizing <br />
              <span className="gradient-text italic">Human Health</span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
              className="text-xl text-slate-400 mb-12 max-w-xl leading-relaxed font-medium"
            >
              MediVision AI transforms complex medical data into clear visual insights, empowering patients to see and understand what is happening inside their bodies.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex flex-wrap gap-6"
            >
              <Link href="/auth" className="group px-10 py-5 rounded-2xl bg-[#00D1FF] text-black font-black hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(0,209,255,0.4)]">
                LAUNCH PLATFORM
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <button
                onClick={() => document.getElementById('vision-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 rounded-2xl border border-white/10 glass-card hover:bg-white/5 transition-colors font-bold tracking-wide text-white hover:border-[#00D1FF]/50 active:scale-95"
              >
                WHY IT MATTERS
              </button>
            </motion.div>
          </motion.div>

          {/* Hero Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00D1FF]/30 to-[#7000FF]/30 blur-[120px] rounded-full animate-pulse" />

            {/* HUD Elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 p-6 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 z-20 space-y-4 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00D1FF]">Neural-Link Sync</span>
              </div>
              <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: ["20%", "95%", "88%"] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="h-full bg-gradient-to-r from-[#00D1FF] to-[#7000FF]"
                />
              </div>
            </motion.div>

            <motion.div
              animate={{ x: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 p-6 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 z-20 shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-[#00D1FF]/10 text-[#00D1FF]">
                  <Activity size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Stream</p>
                  <p className="text-xl font-black text-white italic">4.8 GB/s</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 2, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10 scale-125"
            >
              <HeroScene />
            </motion.div>
            {/* Floating Stats Or Something */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -top-10 -right-10 glass-card p-6 rounded-[2rem] border-white/10 shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Activity size={24} className="animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Neural Accuracy</p>
                  <p className="text-xl font-black text-white italic">99.82%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Live Intelligence Feed */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative px-6 py-12 border-y border-white/5 bg-white/[0.01] overflow-hidden"
      >
        <div className="mx-auto max-w-7xl flex flex-wrap justify-between items-center gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="flex items-center gap-12"
          >
            <StatItem label="Scans Processed" value="1.2M+" color="text-[#00D1FF]" />
            <StatItem label="Neural Nodes" value="48.5k" color="text-[#7000FF]" />
            <StatItem label="Avg Response" value="0.4s" color="text-emerald-400" />
          </motion.div>
          <div className="flex-1 max-w-md hidden md:block">
            <motion.div
              animate={{ borderColor: ["rgba(255,255,255,0.1)", "rgba(0,209,255,0.3)", "rgba(255,255,255,0.1)"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between shadow-inner"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Diagnostic Stream</span>
              </div>
              <span className="text-[10px] font-bold text-[#00D1FF] animate-pulse">OPTIMIZING_NEURAL_WEIGHTS...</span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Solving for Clarity Section */}
      <section id="vision-section" className="relative px-6 py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-[#ff3e3e] text-xs font-black uppercase tracking-[0.4em] mb-6">The Challenge</h3>
            <h2 className="text-5xl font-black mb-8 text-white leading-tight">Medical data is everywhere, but it's <br /><span className="text-white/20 italic">locked behind complexity.</span></h2>
            <div className="space-y-6">
              <ChallengeItem text="X-rays and MRIs look meaningless to non-doctors, leading to fear and confusion." delay={0.1} />
              <ChallengeItem text="Lab reports are filled with jargon that makes it impossible for patients to stay informed." delay={0.2} />
              <ChallengeItem text="Rural areas lack specialists, making quality diagnostics nearly inaccessible." delay={0.3} />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center p-12 rounded-[3rem] bg-gradient-to-br from-[#00D1FF]/10 to-[#7000FF]/10 border border-white/5 relative group"
          >
            <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-3xl rounded-[3rem] -z-10" />
            <h3 className="text-[#00D1FF] text-xs font-black uppercase tracking-[0.4em] mb-6">Our Vision</h3>
            <h2 className="text-4xl font-black mb-8 italic text-white leading-tight underline decoration-[#00D1FF]/30 decoration-4 underline-offset-8">"I can clearly see and understand what’s happening in my body."</h2>
            <p className="text-slate-400 leading-relaxed text-xl font-medium">
              We bridge the gap by converting medical data into visual, interactive, and human-friendly outputs. No more guessing. No more jargon. Just clarity.
            </p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="mt-10 w-20 h-20 rounded-full border border-[#00D1FF]/30 flex items-center justify-center text-[#00D1FF] cursor-pointer"
            >
              <Activity size={32} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative px-6 py-32 border-t border-white/5 bg-slate-900/[0.02]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black mb-8 text-white tracking-tight"
            >
              How <span className="text-[#00D1FF] italic">MediVision AI</span> Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-400 max-w-2xl mx-auto text-xl font-medium"
            >
              A comprehensive intelligence layer for every aspect of your health.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Bone className="text-[#00D1FF]" size={28} />}
              title="3D Visualization"
              description="Upload X-rays/MRIs and see affected regions in interactive 3D space."
              delay={0.1}
            />
            <FeatureCard
              icon={<Activity className="text-emerald-400" size={28} />}
              title="Signal Intelligence"
              description="Pattern recognition and simple explanations for ECG, BP, and SpO₂ data."
              delay={0.2}
            />
            <FeatureCard
              icon={<FlaskConical className="text-[#7000FF]" size={28} />}
              title="Report Machine Reading"
              description="Automatic jargon removal and highlight of abnormal lab values."
              delay={0.3}
            />
            <FeatureCard
              icon={<Zap className="text-yellow-400" size={28} />}
              title="Recovery Guidance"
              description="Personalized timelines and lifestyle suggestions for healing."
              delay={0.4}
            />
            <FeatureCard
              icon={<Microscope className="text-pink-400" size={28} />}
              title="Predictive Trends"
              description="Track health data over time to identify potential risks early."
              delay={0.5}
            />
            <FeatureCard
              icon={<Brain className="text-blue-400" size={28} />}
              title="Doctor Co-Pilot"
              description="AI support for specialists to summarize and visualize findings."
              delay={0.6}
            />
          </div>
        </div>
      </section>
      {/* Addressing Global Health Equity Section */}
      <section className="relative px-6 py-32 overflow-hidden bg-white/[0.01]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-[10px] font-black uppercase tracking-widest"
            >
              <Globe2 size={14} /> Global Social Impact
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black mb-8 leading-tight text-white tracking-tighter uppercase italic"
            >
              Solving for <br /><span className="text-emerald-400">Equity.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-xl font-medium leading-relaxed"
            >
              Advanced diagnostics shouldn't be limited to prime urban centers. MediVision AI includes a dedicated <span className="text-white font-bold">Rural Mode</span>—optimizing for low-bandwidth environments and high-contrast visibility.
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-xl bg-white/5 text-emerald-400 border border-white/5">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="font-black text-lg text-white uppercase italic">Multi-Lingual</h4>
                <p className="text-slate-500 text-sm font-medium">Native support for Hindi, Marathi, and Tamil to bridge communication gaps in regional consultations.</p>
              </div>
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-xl bg-white/5 text-[#00D1FF] border border-white/5">
                  <Zap size={24} />
                </div>
                <h4 className="font-black text-lg text-white uppercase italic">Offline Sync</h4>
                <p className="text-slate-500 text-sm font-medium">Neural models optimized for local edge device execution, ensuring diagnostics occur even without stability.</p>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="p-12 rounded-[5rem] bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 backdrop-blur-2xl">
              <div className="text-center space-y-8">
                <div className="w-24 h-24 rounded-[2rem] bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
                  <Globe2 size={48} />
                </div>
                <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter leading-none italic">Democratizing <br />Intelligence.</h3>
                <div className="flex justify-center gap-4">
                  <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase text-slate-400">Rural Access Mode</span>
                  <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase text-slate-400">E2E Privacy</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="px-6 py-40 text-center relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-[#00D1FF]/10 blur-[150px] rounded-full"
        />
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-black mb-16 leading-tight text-white tracking-tighter"
        >
          Empowering patients. <br /><span className="gradient-text italic">Supporting doctors.</span>
        </motion.h2>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/auth" className="relative z-10 inline-flex px-16 py-8 rounded-[2rem] bg-white text-black font-black text-xl hover:shadow-[0_0_80px_rgba(255,255,255,0.4)] transition-all uppercase tracking-widest shadow-2xl">
            GET STARTED NOW
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 border-t border-white/5 text-center text-slate-500 text-sm font-black uppercase tracking-[0.3em]">
        <p>&copy; 2026 MediVision AI. Built for the neural age of healthcare.</p>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -15, scale: 1.02, rotateY: 5 }}
      className="p-10 rounded-[3rem] glass-morphism border-white/[0.03] hover:border-[#00D1FF]/50 transition-all group perspective-1000"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 group-hover:bg-[#00D1FF]/10 transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4 tracking-tight text-white uppercase italic">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed font-medium">{description}</p>
    </motion.div>
  );
}

function StatItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
      }}
      className="flex flex-col"
    >
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">{label}</span>
      <span className={`text-4xl font-black ${color} tabular-nums tracking-tighter italic`}>{value}</span>
    </motion.div>
  );
}

function ChallengeItem({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-colors group flex items-start gap-4"
    >
      <div className="mt-1 w-2 h-2 rounded-full bg-[#ff3e3e]/50 group-hover:bg-[#ff3e3e] transition-colors" />
      <p className="text-slate-400 text-base font-medium leading-relaxed group-hover:text-slate-200 transition-colors">{text}</p>
    </motion.div>
  );
}
