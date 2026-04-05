"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link"; // Import Link for navigation
import {
    Building2, Search, Filter, Download, MoreHorizontal,
    ChevronLeft, ChevronRight, Plus, CheckCircle,
    Clock, ShieldAlert, ArrowUpRight, Eye
} from "lucide-react";

// --- TYPES ---
type Business = {
    id: string;
    name: string;
    email: string;
    category: string;
    status: 'active' | 'pending' | 'blocked';
    volume: string;
    joinedDate: string;
};

export default function BusinessDirectory() {
    const [searchTerm, setSearchTerm] = useState("");

    const businesses: Business[] = [
        { id: "BUS-9910", name: "Spayz Logistics", email: "ops@spayz.com", category: "Transport", status: 'active', volume: "₦12.5M", joinedDate: "Jan 12, 2026" },
        { id: "BUS-9911", name: "Isakharu Tech", email: "hello@isakharu.io", category: "Software", status: 'active', volume: "₦8.2M", joinedDate: "Feb 05, 2026" },
        { id: "BUS-9912", name: "Acme Retail", email: "billing@acme.co", category: "Ecommerce", status: 'pending', volume: "₦0.00", joinedDate: "Mar 20, 2026" },
        { id: "BUS-9913", name: "Global Foodies", email: "owner@gfood.com", category: "Hospitality", status: 'active', volume: "₦4.1M", joinedDate: "Nov 15, 2025" },
        { id: "BUS-9914", name: "Shadow Services", email: "unknown@hidden.com", category: "Consulting", status: 'blocked', volume: "₦250k", joinedDate: "Dec 01, 2025" },
        { id: "BUS-9915", name: "Green Energy Ltd", email: "contact@green.ng", category: "Utilities", status: 'active', volume: "₦1.9M", joinedDate: "Feb 28, 2026" },
    ];

    return (
        <DashboardLayout>
            {/* HEADER & ACTIONS */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#00823B] rounded-2xl shadow-[0_8px_16px_rgba(0,130,59,0.2)]">
                        <Building2 size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Business Directory</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Manage and monitor all registered merchant entities</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 border border-[var(--border)] px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all bg-[var(--card)]">
                        <Download size={14} /> Export List
                    </button>
                    <button className="flex items-center gap-2 bg-[#00823B] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all">
                        <Plus size={14} /> Register New Business
                    </button>
                </div>
            </div>

            {/* STATS OVERVIEW */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <MiniStat label="Total Businesses" value="1,204" />
                <MiniStat label="Active" value="1,180" color="text-[#00823B]" />
                <MiniStat label="Pending Review" value="18" color="text-amber-500" />
                <MiniStat label="Blocked" value="6" color="text-red-500" />
            </div>

            {/* DIRECTORY TABLE CONTAINER */}
            <div className="bg-[var(--card)] rounded-[32px] border border-[var(--border)] shadow-sm overflow-hidden flex flex-col">
                {/* Search & Filter Bar */}
                <div className="p-5 border-b border-[var(--border)] bg-[var(--background)]/30 flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name, ID, or email..."
                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#00823B]/20 focus:border-[#00823B] transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-500">
                            <Filter size={14} className="inline mr-2" /> Category: All
                        </button>
                        <button className="px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-500">
                            <Filter size={14} className="inline mr-2" /> Status: All
                        </button>
                    </div>
                </div>

                {/* The Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                        <tr className="bg-[var(--background)]/50 border-b border-[var(--border)]">
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Business Detail</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Category</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Volume (MTD)</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Joined Date</th>
                            <th className="px-4 py-4"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {businesses.map((bus) => (
                            <tr key={bus.id} className="hover:bg-[#00823B]/5 transition-colors group">
                                <td className="px-6 py-4">
                                    {/* Wrapping Identity in Link */}
                                    <Link href={`/dashboard/business/directory/${bus.id}`} className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[#00823B] font-bold shadow-inner group-hover:bg-[#00823B] group-hover:text-white transition-all">
                                            {bus.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-black text-[var(--foreground)] tracking-tight group-hover:text-[#00823B] transition-colors">{bus.name}</p>
                                            <p className="text-[11px] text-gray-500 font-medium">{bus.id} • {bus.email}</p>
                                        </div>
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-[11px] font-bold text-gray-600 dark:text-gray-400">
                                        {bus.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={bus.status} />
                                </td>
                                <td className="px-6 py-4">
                                    <p className="font-black text-[var(--foreground)]">{bus.volume}</p>
                                    <div className="flex items-center gap-1 text-[10px] text-[#00823B] font-bold">
                                        <ArrowUpRight size={10} /> +4.2%
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs font-bold text-gray-500">
                                    {bus.joinedDate}
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {/* Dynamic Detail Link for Eye Icon */}
                                        <Link href={`/dashboard/business/directory/${bus.id}`}>
                                            <button className="p-2 bg-white dark:bg-gray-800 border border-[var(--border)] rounded-lg text-gray-400 hover:text-[#00823B] shadow-sm">
                                                <Eye size={16} />
                                            </button>
                                        </Link>
                                        <button className="p-2 bg-white dark:bg-gray-800 border border-[var(--border)] rounded-lg text-gray-400 hover:text-[#00823B] shadow-sm">
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
                        Showing <span className="text-[var(--foreground)]">6</span> of 1,204 businesses
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 border border-[var(--border)] rounded-xl text-gray-400 hover:bg-white transition-all"><ChevronLeft size={16}/></button>
                        <button className="px-4 py-2 border border-[#00823B]/20 bg-[#00823B]/10 rounded-xl text-[#00823B] text-xs font-black">1</button>
                        <button className="px-4 py-2 border border-[var(--border)] rounded-xl text-gray-500 text-xs font-black hover:bg-white">2</button>
                        <button className="p-2 border border-[var(--border)] rounded-xl text-gray-400 hover:bg-white transition-all"><ChevronRight size={16}/></button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );

    function StatusBadge({ status }: { status: Business['status'] }) {
        const configs = {
            active: { bg: 'bg-[#00823B]/10', text: 'text-[#00823B]', icon: <CheckCircle size={12}/>, label: 'Active' },
            pending: { bg: 'bg-amber-500/10', text: 'text-amber-600', icon: <Clock size={12}/>, label: 'Pending' },
            blocked: { bg: 'bg-red-500/10', text: 'text-red-600', icon: <ShieldAlert size={12}/>, label: 'Blocked' },
        };
        const config = configs[status];
        return (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg} ${config.text} text-[10px] font-black uppercase tracking-widest border border-current opacity-80`}>
                {config.icon} {config.label}
            </div>
        );
    }

    function MiniStat({ label, value, color = "text-[var(--foreground)]" }: { label: string, value: string, color?: string }) {
        return (
            <div className="bg-[var(--card)] p-5 rounded-[24px] border border-[var(--border)] shadow-sm">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <p className={`text-2xl font-black tracking-tight ${color}`}>{value}</p>
            </div>
        );
    }
}