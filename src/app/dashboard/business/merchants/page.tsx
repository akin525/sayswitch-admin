"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Users, Search, Filter, Download, MoreHorizontal,
    ChevronLeft, ChevronRight, UserPlus, CheckCircle2,
    Clock, ShieldAlert, Mail, Phone, Building, ArrowUpRight
} from "lucide-react";
import Link from "next/link";

// --- TYPES ---
type Merchant = {
    id: string;
    name: string;
    email: string;
    phone: string;
    linkedBusiness: string;
    status: 'verified' | 'unverified' | 'suspended';
    walletBalance: string;
    joinedDate: string;
};

export default function MerchantList() {
    const [searchTerm, setSearchTerm] = useState("");

    // --- MOCK DATA ---
    const merchants: Merchant[] = [
        { id: "MER-1001", name: "Yusuf Tasiu Machika", email: "machikatelecoms@gmail.com", phone: "07025245508", linkedBusiness: "Machika Telecoms", status: 'verified', walletBalance: "₦4,525,490.19", joinedDate: "Jan 12, 2026" },
        { id: "MER-1002", name: "Sarah Jenkins", email: "sarah.j@spayz.com", phone: "+234 812 345 6789", linkedBusiness: "Spayz Logistics", status: 'verified', walletBalance: "₦1,250,000.00", joinedDate: "Feb 05, 2026" },
        { id: "MER-1003", name: "Michael Okonkwo", email: "mike.ok@gmail.com", phone: "+234 903 456 7890", linkedBusiness: "Independent", status: 'unverified', walletBalance: "₦0.00", joinedDate: "Mar 20, 2026" },
        { id: "MER-1004", name: "Aisha Bello", email: "a.bello@isakharu.io", phone: "+234 701 234 5678", linkedBusiness: "Isakharu Tech", status: 'verified', walletBalance: "₦850,200.50", joinedDate: "Nov 15, 2025" },
        { id: "MER-1005", name: "David Smith", email: "d.smith@shadow.net", phone: "+234 805 678 9012", linkedBusiness: "Shadow Services", status: 'suspended', walletBalance: "₦45,000.00", joinedDate: "Dec 01, 2025" },
        { id: "MER-1006", name: "Chioma Adeyemi", email: "chioma@green.ng", phone: "+234 814 567 8901", linkedBusiness: "Green Energy Ltd", status: 'verified', walletBalance: "₦3,120,400.00", joinedDate: "Feb 28, 2026" },
    ];

    return (
        <DashboardLayout>
            {/* 1. HEADER & ACTIONS */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-[#005C29] to-[#00823B] rounded-2xl shadow-[0_8px_16px_rgba(0,130,59,0.2)]">
                        <Users size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Merchant List</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Manage individual merchant accounts and terminal operators</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 border border-[var(--border)] px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-all bg-[var(--card)] shadow-sm">
                        <Download size={14} /> Export List
                    </button>
                    <button className="flex items-center gap-2 bg-[#00823B] text-white px-5 py-2 rounded-xl text-xs font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all">
                        <UserPlus size={14} /> Add Merchant
                    </button>
                </div>
            </div>

            {/* 2. STATS OVERVIEW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <MiniStat label="Total Merchants" value="3,492" />
                <MiniStat label="Verified Accounts" value="3,150" color="text-[#00823B]" />
                <MiniStat label="Pending KYC" value="314" color="text-amber-500" />
                <MiniStat label="Suspended" value="28" color="text-red-500" />
            </div>

            {/* 3. DIRECTORY TABLE CONTAINER */}
            <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] shadow-sm overflow-hidden flex flex-col">

                {/* Search, Filter & Bulk Actions Bar */}
                <div className="p-5 border-b border-[var(--border)] bg-[var(--background)]/30 flex flex-col lg:flex-row justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name, email, or phone..."
                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#00823B]/20 focus:border-[#00823B] transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-500 hover:text-[var(--foreground)] transition-all">
                            <Filter size={14} className="text-[#00823B]" /> Status: All
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-500 hover:text-[var(--foreground)] transition-all">
                            <Building size={14} className="text-[#00823B]" /> Business: All
                        </button>
                        <div className="h-6 w-px bg-[var(--border)] mx-1 hidden sm:block"></div>
                        <button className="px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-400 hover:text-[var(--foreground)] transition-all hidden sm:block">
                            Bulk Actions
                        </button>
                    </div>
                </div>

                {/* The Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                        <tr className="bg-[var(--background)]/50 border-b border-[var(--border)]">
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest whitespace-nowrap">Merchant Profile</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest whitespace-nowrap">Contact Info</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest whitespace-nowrap">Linked Entity</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest whitespace-nowrap">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest whitespace-nowrap text-right">Wallet Balance</th>
                            <th className="px-4 py-4"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {merchants.map((merchant) => (
                            <tr key={merchant.id} className="hover:bg-[#00823B]/5 transition-colors group cursor-pointer">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {/* Gradient User Avatar */}
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-[var(--foreground)] font-black shadow-sm group-hover:from-[#00823B] group-hover:to-[#005C29] group-hover:text-white transition-all">
                                            {merchant.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-black text-[var(--foreground)] tracking-tight group-hover:text-[#00823B] transition-colors">{merchant.name}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{merchant.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1 text-[11px] font-bold text-gray-500">
                                        <span className="flex items-center gap-1.5"><Mail size={12} className="text-gray-400"/> {merchant.email}</span>
                                        <span className="flex items-center gap-1.5"><Phone size={12} className="text-gray-400"/> {merchant.phone}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[11px] font-black text-gray-600 dark:text-gray-300">
                                            <Building size={12} className="text-[#00823B]" />
                                            {merchant.linkedBusiness}
                                        </span>
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={merchant.status} />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <p className="font-black text-[var(--foreground)]">{merchant.walletBalance}</p>
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-gray-400 hover:text-[#00823B] hover:border-[#00823B]/30 shadow-sm transition-all">
                                            <ArrowUpRight size={16} />
                                        </button>
                                        <button className="p-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-gray-400 hover:text-[#00823B] hover:border-[#00823B]/30 shadow-sm transition-all">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination */}
                <div className="p-5 border-t border-[var(--border)] bg-[var(--background)]/30 flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">
                        Showing <span className="text-[var(--foreground)]">6</span> of 3,492 merchants
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 border border-[var(--border)] rounded-xl text-gray-400 hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-all"><ChevronLeft size={16}/></button>
                        <button className="px-4 py-2 border border-[#00823B]/20 bg-[#00823B]/10 rounded-xl text-[#00823B] text-xs font-black shadow-sm">1</button>
                        <button className="px-4 py-2 border border-[var(--border)] rounded-xl text-gray-500 text-xs font-black hover:bg-[var(--card)] hover:text-[var(--foreground)] transition-colors">2</button>
                        <button className="px-4 py-2 border border-[var(--border)] rounded-xl text-gray-500 text-xs font-black hover:bg-[var(--card)] hover:text-[var(--foreground)] transition-colors">3</button>
                        <span className="px-2 text-gray-400 font-bold">...</span>
                        <button className="p-2 border border-[var(--border)] rounded-xl text-gray-400 hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-all"><ChevronRight size={16}/></button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );

    // --- SUB-COMPONENTS ---
    function StatusBadge({ status }: { status: Merchant['status'] }) {
        const configs = {
            verified: { bg: 'bg-[#00823B]/10', text: 'text-[#00823B]', border: 'border-[#00823B]/20', icon: <CheckCircle2 size={12}/>, label: 'Verified' },
            unverified: { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/20', icon: <Clock size={12}/>, label: 'Unverified' },
            suspended: { bg: 'bg-red-500/10', text: 'text-red-600', border: 'border-red-500/20', icon: <ShieldAlert size={12}/>, label: 'Suspended' },
        };
        const config = configs[status];
        return (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg} ${config.text} ${config.border} border text-[10px] font-black uppercase tracking-widest`}>
                {config.icon} {config.label}
            </div>
        );
    }

    function MiniStat({ label, value, color = "text-[var(--foreground)]" }: { label: string, value: string, color?: string }) {
        return (
            <div className="bg-[var(--card)] p-5 rounded-[24px] border border-[var(--border)] shadow-sm hover:border-[#00823B]/30 transition-colors">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <p className={`text-2xl font-black tracking-tight ${color}`}>{value}</p>
            </div>
        );
    }
}