"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function RehabCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 25)); // Aug 25, 2026

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const scheduledDays = [12, 14, 18, 20, 22, 25, 27, 30];
    const completedDays = [12, 14, 18, 20];
    const activeDay = 25;

    return (
        <div className="p-8 rounded-[3rem] glass-morphism border-white/5 bg-white/[0.01]">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h3 className="text-xl font-black uppercase italic tracking-tight text-white">Recovery <span className="text-[#00D1FF]">Calendar</span></h3>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Consistency is key to neural repair</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-black uppercase tracking-widest text-white">
                        {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-4 mb-4">
                {DAYS.map(day => (
                    <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500 py-2">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-4">
                {[...Array(firstDayOfMonth)].map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {[...Array(daysInMonth)].map((_, i) => {
                    const day = i + 1;
                    const isScheduled = scheduledDays.includes(day);
                    const isCompleted = completedDays.includes(day);
                    const isActive = day === activeDay;

                    return (
                        <motion.div
                            key={day}
                            whileHover={{ scale: 1.1 }}
                            className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative cursor-pointer border transition-all ${isActive
                                    ? 'bg-[#00D1FF]/20 border-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.2)]'
                                    : isCompleted
                                        ? 'bg-emerald-500/10 border-emerald-500/30'
                                        : isScheduled
                                            ? 'bg-white/5 border-white/10'
                                            : 'border-transparent text-slate-600'
                                }`}
                        >
                            <span className={`text-xs font-black ${isActive ? 'text-[#00D1FF]' : isCompleted ? 'text-emerald-400' : isScheduled ? 'text-white' : 'text-slate-600'}`}>
                                {day}
                            </span>
                            {isCompleted && (
                                <CheckCircle2 size={10} className="text-emerald-500 mt-1" />
                            )}
                            {isScheduled && !isCompleted && !isActive && (
                                <Circle size={6} className="text-[#00D1FF] fill-[#00D1FF] mt-1" />
                            )}
                            {isActive && (
                                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#00D1FF] animate-ping" />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-10 pt-8 border-t border-white/5 grid grid-cols-3 gap-4">
                <LegendItem color="bg-emerald-500" label="Completed" />
                <LegendItem color="bg-[#00D1FF]" label="Scheduled" />
                <LegendItem color="bg-slate-700" label="Rest Day" />
            </div>
        </div>
    );
}

function LegendItem({ color, label }: { color: string, label: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</span>
        </div>
    );
}
