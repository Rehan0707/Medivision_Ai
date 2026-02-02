"use client";

import { motion } from "framer-motion";
import { Brain, Activity, Bone, FlaskConical, ChevronRight, ShieldCheck, Microscope, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import HeroScene from "@/components/animations/Model";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] overflow-hidden selection:bg-[#00D1FF]/30">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#00D1FF]/5 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#7000FF]/5 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-0 left-0 w-full h-full medical-grid opacity-20" />
      </div>

      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-bold text-[#00D1FF] mb-8 border-[#00D1FF]/20"
            >
              <Zap size={14} className="animate-pulse" />
              <span className="tracking-[0.2em] uppercase">The Future of Medical Imaging</span>
            </motion.div>

            <h1 className="text-7xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
              Visualizing <br />
              <span className="gradient-text">Human Health</span>
            </h1>

            <p className="text-xl text-slate-400 mb-12 max-w-xl leading-relaxed">
              MediVision AI transforms complex medical data into clear visual insights, empowering patients to see and understand what is happening inside their bodies.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link href="/dashboard" className="group px-10 py-5 rounded-2xl bg-[#00D1FF] text-black font-black hover:scale-105 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(0,209,255,0.4)]">
                LAUNCH PLATFORM
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-10 py-5 rounded-2xl border border-white/10 glass-card hover:bg-white/5 transition-colors font-bold tracking-wide">
                WHY IT MATTERS
              </button>
            </div>
          </motion.div>

          {/* ... existing hero animation ... */}
        </div>
      </section>

      {/* Solving for Clarity Section */}
      <section className="relative px-6 py-24 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h3 className="text-[#ff3e3e] text-xs font-black uppercase tracking-[0.3em] mb-4">The Challenge</h3>
            <h2 className="text-4xl font-black mb-8">Medical data is everywhere, but it's <span className="text-white/40">locked behind complexity.</span></h2>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <p className="text-slate-400 text-sm">X-rays and MRIs look meaningless to non-doctors, leading to fear and confusion.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <p className="text-slate-400 text-sm">Lab reports are filled with jargon that makes it impossible for patients to stay informed.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <p className="text-slate-400 text-sm">Rural areas lack specialists, making quality diagnostics nearly inaccessible.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-[#00D1FF] text-xs font-black uppercase tracking-[0.3em] mb-4">Our Vision</h3>
            <h2 className="text-4xl font-black mb-6 italic">"I can clearly see and understand what’s happening in my body."</h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              We bridge the gap by converting medical data into visual, interactive, and human-friendly outputs. No more guessing. No more jargon. Just clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid - Updated to match the 6 core features */}
      <section className="relative px-6 py-32 border-t border-white/5 bg-slate-900/[0.02]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black mb-6">How <span className="text-[#00D1FF]">MediVision AI</span> Works</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              A comprehensive intelligence layer for every aspect of your health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Bone className="text-[#00D1FF]" />}
              title="3D Visualization"
              description="Upload X-rays/MRIs and see affected regions in interactive 3D space."
              delay={0.1}
            />
            <FeatureCard
              icon={<Activity className="text-emerald-400" />}
              title="Signal Intelligence"
              description="Pattern recognition and simple explanations for ECG, BP, and SpO₂ data."
              delay={0.2}
            />
            <FeatureCard
              icon={<FlaskConical className="text-[#7000FF]" />}
              title="Report Machine Reading"
              description="Automatic jargon removal and highlight of abnormal lab values."
              delay={0.3}
            />
            <FeatureCard
              icon={<Zap className="text-yellow-400" />}
              title="Recovery Guidance"
              description="Personalized timelines and lifestyle suggestions for healing."
              delay={0.4}
            />
            <FeatureCard
              icon={<Microscope className="text-pink-400" />}
              title="Predictive Trends"
              description="Track health data over time to identify potential risks early."
              delay={0.5}
            />
            <FeatureCard
              icon={<Brain className="text-blue-400" />}
              title="Doctor Co-Pilot"
              description="AI support for specialists to summarize and visualize findings."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-32 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-[#00D1FF]/5 blur-[120px] rounded-full" />
        <h2 className="text-5xl md:text-7xl font-black mb-12 leading-tight">Empowering patients. <br /><span className="gradient-text">Supporting doctors.</span></h2>
        <Link href="/dashboard" className="relative z-10 inline-flex px-12 py-6 rounded-2xl bg-white text-black font-black hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">
          GET STARTED NOW
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/5 text-center text-slate-500 text-sm font-medium">
        <p>&copy; 2026 MediVision AI. Built for the future of healthcare.</p>
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
      whileHover={{ y: -10, scale: 1.02 }}
      className="p-8 rounded-[2rem] glass-morphism border-white/[0.03] hover:border-[#00D1FF]/50 transition-all group"
    >
      <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function ProcessStep({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="text-2xl font-black text-slate-700 group-hover:text-[#00D1FF] transition-colors duration-500">{number}</div>
      <div>
        <h4 className="font-bold text-lg mb-1 group-hover:translate-x-1 transition-transform">{title}</h4>
        <p className="text-sm text-slate-500 max-w-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
