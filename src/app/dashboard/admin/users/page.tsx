"use client";

import { motion } from "framer-motion";
import { Users2, ShieldCheck, Search, Filter, Mail, MoreHorizontal } from "lucide-react";

export default function UsersAdminPage() {
    const users = [
        { name: "Dr. Sarah Mitchell", email: "sarah.m@medivision.ai", role: "Doctor", status: "Active" },
        { name: "John Doe", email: "john@patient.com", role: "Patient", status: "Active" },
        { name: "Admin Lead", email: "admin@medivision.ai", role: "Admin", status: "Active" },
    ];

    return (
        <div className="space-y-10 pb-12">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight italic uppercase">User <span className="text-[#00D1FF]">Management</span></h1>
                    <p className="text-slate-400 font-medium">Control node access and role authorization for the MediVision network.</p>
                </div>
                <button className="px-8 py-4 rounded-2xl bg-[#00D1FF] text-black text-[10px] font-black uppercase tracking-[0.2em]">
                    AUTHORIZE NEW USER
                </button>
            </div>

            <div className="glass-morphism rounded-[3rem] overflow-hidden border-white/5 bg-white/[0.01]">
                <div className="p-8 border-b border-white/5 flex gap-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input type="text" placeholder="Search by name, email, or role..." className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 text-sm font-medium" />
                    </div>
                    <button className="px-8 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><Filter size={14} /> Log Sort</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 border-b border-white/5">
                                <th className="px-10 py-6">Identity</th>
                                <th className="px-10 py-6">Neural Role</th>
                                <th className="px-10 py-6">Status</th>
                                <th className="px-10 py-6 text-right">Auth Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map((user, i) => (
                                <tr key={i} className="group hover:bg-white/[0.03] transition-all">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-black">{user.name[0]}</div>
                                            <div>
                                                <p className="font-black text-white">{user.name}</p>
                                                <p className="text-xs text-slate-500 font-medium">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 ${user.role === 'Admin' ? 'text-[#7000FF] bg-[#7000FF]/5' :
                                                user.role === 'Doctor' ? 'text-[#00D1FF] bg-[#00D1FF]/5' :
                                                    'text-slate-500 bg-white/5'
                                            }`}>{user.role}</span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                            <span className="text-xs font-black uppercase tracking-widest text-emerald-500">{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-500 transition-all"><MoreHorizontal size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
