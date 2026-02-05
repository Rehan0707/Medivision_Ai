"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Newspaper, ExternalLink, RefreshCw, AlertCircle, Sparkles, Sprout } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

interface HealthNews {
    id: string;
    title: string;
    source: string;
    time: string;
    category: string;
    impact: "high" | "medium" | "low";
    summary: string;
}

export const LocalizedHealthNews = () => {
    const { isRuralMode } = useSettings();
    const [location, setLocation] = useState<string>("Detecting Location...");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [news, setNews] = useState<HealthNews[]>([]);

    const mockNews: Record<string, HealthNews[]> = {
        "Mumbai, MH": [
            {
                id: "1",
                title: "Monsoon Health Advisory issued for Mumbai Metro",
                source: "Directorate of Health Services",
                time: "2h ago",
                category: "Public Health",
                impact: "high",
                summary: "BMC issues guidelines for vector-borne disease prevention ahead of early monsoon patterns."
            },
            {
                id: "2",
                title: "New AI-Diagnostic Hub opens in BKC",
                source: "MediVision Network",
                time: "5h ago",
                category: "Innovation",
                impact: "medium",
                summary: "Digital health infrastructure expands in Mumbai with 3 new centers powered by Synapse-X."
            }
        ],
        "San Francisco, CA": [
            {
                id: "3",
                title: "SF Health Dept reports record low flu cases",
                source: "SF Health Watch",
                time: "1h ago",
                category: "Epidemiology",
                impact: "low",
                summary: "Vaccination coverage reaches 85% in the Bay Area, leading to significant downward trends."
            },
            {
                id: "4",
                title: "Bio-Tech Summit to unveil Neural-Link recovery tech",
                source: "TechHealth Daily",
                time: "4h ago",
                category: "Conference",
                impact: "medium",
                summary: "Local startups set to demonstrate new kinetic recovery sensors for stroke rehabilitation."
            }
        ],
        "Global Sentinel": [
            {
                id: "5",
                title: "WHO announces new Global Data Standards",
                source: "World Health Org",
                time: "8h ago",
                category: "Policy",
                impact: "high",
                summary: "New protocols for medical data privacy and cross-border AI diagnostics released."
            }
        ],
        "Rural Outreach": [
            {
                id: "6",
                title: "Mobile Clinic Schedule: Western Block Phase 1",
                source: "Community Health Hub",
                time: "1h ago",
                category: "Availability",
                impact: "high",
                summary: "Standard checkups and diagnostic scanning now available via the MediVision Mobile Unit."
            },
            {
                id: "7",
                title: "New low-latency protocols for Remote Areas",
                source: "Synapse-X Rural",
                time: "6h ago",
                category: "Technical",
                impact: "medium",
                summary: "MediVision AI now processes 40% faster on 2G/3G connections for remote diagnostic reliability."
            }
        ]
    };

    const detectLocation = () => {
        setIsRefreshing(true);
        // Simulate geolocation detection
        setTimeout(() => {
            if (isRuralMode) {
                setLocation("Rural Outpost-42");
                setNews(mockNews["Rural Outreach"]);
            } else {
                const locations = ["Mumbai, MH", "San Francisco, CA", "Global Sentinel"];
                const randomLoc = locations[Math.floor(Math.random() * locations.length)];
                setLocation(randomLoc);
                setNews(mockNews[randomLoc]);
            }
            setIsRefreshing(false);
        }, 1500);
    };

    useEffect(() => {
        detectLocation();
    }, []);

    const getImpactColor = (impact: string) => {
        switch (impact) {
            case "high": return "text-red-400 bg-red-400/10";
            case "medium": return "text-yellow-400 bg-yellow-400/10";
            default: return "text-emerald-400 bg-emerald-400/10";
        }
    };

    return (
        <div className="p-8 glass-morphism rounded-[2.5rem] border-white/5 bg-white/[0.01] h-full flex flex-col">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <div className="flex items-center gap-2 text-[#00D1FF] mb-2 px-3 py-1 bg-[#00D1FF]/10 rounded-full w-fit">
                        <MapPin size={12} className={isRefreshing ? "animate-bounce" : ""} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{location}</span>
                    </div>
                    <h3 className="font-black text-xl italic uppercase tracking-tight flex items-center gap-3">
                        <Newspaper size={20} className="text-slate-500" />
                        Local <span className="text-[#00D1FF]">Pulse</span>
                        {isRuralMode && (
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[8px] font-black uppercase tracking-tighter ml-2">
                                <Sprout size={10} />
                                Remote Intel
                            </div>
                        )}
                    </h3>
                </div>
                <button
                    onClick={detectLocation}
                    disabled={isRefreshing}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 text-slate-500 hover:text-white hover:border-[#00D1FF]/30 transition-all active:scale-95"
                >
                    <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                <AnimatePresence mode="wait">
                    {isRefreshing ? (
                        <div className="space-y-6 py-4">
                            {[1, 2].map(i => (
                                <div key={i} className="animate-pulse space-y-3">
                                    <div className="h-4 bg-white/5 rounded w-3/4" />
                                    <div className="h-2 bg-white/5 rounded w-full" />
                                    <div className="h-2 bg-white/5 rounded w-5/6" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            key={location}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            {news.map((item) => (
                                <div key={item.id} className="group cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${getImpactColor(item.impact)}`}>
                                            {item.impact} Impact
                                        </span>
                                        <span className="text-[10px] text-slate-500 font-bold uppercase">{item.time}</span>
                                    </div>
                                    <h4 className="font-bold text-sm text-slate-200 group-hover:text-[#00D1FF] transition-colors mb-2 leading-snug">
                                        {item.title}
                                    </h4>
                                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">
                                        {item.summary}
                                    </p>
                                    <div className="flex justify-between items-center text-[9px] font-black uppercase text-slate-600 tracking-widest border-t border-white/5 pt-3 group-hover:border-[#00D1FF]/20 transition-colors">
                                        <span>{item.source}</span>
                                        <div className="flex items-center gap-1 group-hover:text-white transition-colors">
                                            Details <ExternalLink size={10} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-[#00D1FF]/5 border border-[#00D1FF]/10 flex items-center gap-4 group hover:bg-[#00D1FF]/10 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-[#00D1FF]/20 flex items-center justify-center text-[#00D1FF]">
                    <Sparkles size={16} />
                </div>
                <div>
                    <p className="text-[9px] font-black text-[#00D1FF] uppercase tracking-widest">AI Intelligence</p>
                    <p className="text-[10px] text-slate-300 font-medium">Get a personalized risk assessment for your area.</p>
                </div>
            </div>
        </div>
    );
};
