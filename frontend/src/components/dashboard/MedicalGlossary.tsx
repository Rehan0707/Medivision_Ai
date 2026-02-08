"use client";

import { motion } from "framer-motion";
import { BookOpen, Search, Info, ExternalLink } from "lucide-react";
import { useState } from "react";

const GLOSSARY_TERMS = [
    { term: "Spondylolisthesis", definition: "A condition where one vertebra slides forward over the one below it, often cause by a stress fracture or disc degeneration.", category: "Spine" },
    { term: "Glioma", definition: "A type of tumor that starts in the glial cells (supporting cells) of the brain or spine.", category: "Neurology" },
    { term: "Vascular Expansion", definition: "The widening of blood vessels, often monitored for metabolic health and neural repair.", category: "Vascular" },
    { term: "Neural Connectome", definition: "A comprehensive map of neural connections in the brain representing the functional architecture of the mind.", category: "Neurology" },
    { term: "Cortical Thinning", definition: "The reduction in the thickness of the outer layer of the brain, often tracked in aging or neurodegenerative studies.", category: "Neurology" }
];

export default function MedicalGlossary() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTerms = GLOSSARY_TERMS.filter(t =>
        t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-10 rounded-[3rem] glass-morphism border-white/5 bg-white/[0.01]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black uppercase italic tracking-tight text-white">Clinical <span className="text-indigo-400">Dictionary</span></h3>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Plain-English definitions for complex terms</p>
                    </div>
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search terms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-6 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500/50 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTerms.map((item, i) => (
                    <motion.div
                        key={item.term}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-black text-white italic uppercase tracking-tight">{item.term}</h4>
                            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                {item.category}
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium mb-4">
                            {item.definition}
                        </p>
                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-indigo-400 transition-colors cursor-pointer">
                            Learn more about this condition <ExternalLink size={10} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
