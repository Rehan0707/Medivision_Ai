"use client";

import { motion } from "framer-motion";
import { Bone, User, Scan, Activity, Microscope, HeartPulse, FileText, Zap } from "lucide-react";

export type ScanType = 'bone' | 'chest' | 'abdominal' | 'dental' | 'mammogram' | 'ct' | 'fluoroscopy' | 'angiography' | 'dexa';

interface ScanTypeSelectorProps {
    selectedType: ScanType | null;
    onSelect: (type: ScanType) => void;
}

const SCAN_TYPES: { id: ScanType; label: string; icon: any; description: string }[] = [
    { id: 'bone', label: 'Bone X-Ray', icon: Bone, description: 'Fractures, infections, arthritis' },
    { id: 'chest', label: 'Chest X-Ray', icon: User, description: 'Lungs, heart, chest wall' },
    { id: 'abdominal', label: 'Abdominal X-Ray', icon: Activity, description: 'Digestive tract, kidneys' },
    { id: 'dental', label: 'Dental X-Ray', icon: FileText, description: 'Teeth, jaw, oral health' },
    { id: 'mammogram', label: 'Mammogram', icon: Microscope, description: 'Breast tissue analysis' },
    { id: 'ct', label: 'CT Scan', icon: Scan, description: 'Cross-sectional imaging' },
    { id: 'fluoroscopy', label: 'Fluoroscopy', icon: Zap, description: 'Real-time moving images' },
    { id: 'angiography', label: 'Angiography', icon: HeartPulse, description: 'Blood vessel imaging' },
    { id: 'dexa', label: 'Bone Density', icon: Bone, description: 'Osteoporosis screening' },
];

export function ScanTypeSelector({ selectedType, onSelect }: ScanTypeSelectorProps) {
    return (
        <div className="space-y-4 mb-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Select Examination Protocol</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {SCAN_TYPES.map((type) => {
                    const isSelected = selectedType === type.id;
                    return (
                        <button
                            key={type.id}
                            onClick={() => onSelect(type.id)}
                            className={`p-4 rounded-2xl border text-left transition-all group relative overflow-hidden ${isSelected
                                    ? 'bg-[#00D1FF]/10 border-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.2)]'
                                    : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
                                }`}
                        >
                            <div className={`flex items-center gap-3 mb-2 ${isSelected ? 'text-[#00D1FF]' : 'text-slate-300 group-hover:text-white'}`}>
                                <type.icon size={20} />
                                <span className="font-bold text-sm tracking-wide">{type.label}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-tight">
                                {type.description}
                            </p>

                            {isSelected && (
                                <motion.div
                                    layoutId="scan-type-active"
                                    className="absolute inset-0 border-2 border-[#00D1FF] rounded-2xl pointer-events-none"
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
