"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Store, Search, Filter, Plus, ExternalLink,
    Copy, Check, MoreHorizontal, TrendingUp,
    ShoppingBag, Eye, Link2
} from "lucide-react";
import Link from "next/link";

export default function StorefrontsList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // --- MOCK DATA ---
    const storefronts = [
        { id: "STR-001", name: "Machika Gadgets", merchant: "Machika Telecoms", revenue: "₦4,520,000", orders: 1, views: 3420, status: "Active", url: "say.sw/machika-gadgets" },
        { id: "STR-002", name: "AfriClique Logistics Fees", merchant: "AfriClique Logistics", revenue: "₦850,000", orders: 34, views: 890, status: "Active", url: "say.sw/AfriClique-fees" },
        { id: "STR-003", name: "Isakharu Tech Services", merchant: "Isakharu Tech", revenue: "₦120,000", orders: 5, views: 120, status: "Inactive", url: "say.sw/isakharu" },
        { id: "STR-004", name: "Green Energy Bills", merchant: "Green Energy Ltd", revenue: "₦12,400,000", orders: 892, views: 15400, status: "Active", url: "say.sw/green-energy" },
        { id: "STR-005", name: "Acme Retail Store", merchant: "Acme Retail", revenue: "₦0", orders: 0, views: 12, status: "Draft", url: "say.sw/acme-retail" },
    ];

    const handleCopy = (e: React.MouseEvent, text: string, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(`https://${text}`);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <DashboardLayout>
            {/* 1. HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-[#005C29] to-[#00823B] rounded-2xl shadow-lg shadow-[#00823B]/20">
                        <Store size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Storefronts</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Monitor and manage merchant hosted payment pages</p>
                    </div>
                </div>

                <button className="flex items-center justify-center gap-2 bg-[#00823B] text-white px-6 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all">
                    <Plus size={16} /> Create Storefront
                </button>
            </div>

            {/* 2. KPI CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard label="Total Store Revenue" value="₦17,890,000" icon={<TrendingUp size={18}/>} color="text-[#00823B]" />
                <StatCard label="Active Storefronts" value="842" icon={<Store size={18}/>} />
                <StatCard label="Total Orders" value="12,450" icon={<ShoppingBag size={18}/>} />
                <StatCard label="Total Page Views" value="894K" icon={<Eye size={18}/>} />
            </div>

            {/* 3. STOREFRONT TABLE */}
            <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-[var(--border)] bg-[var(--background)]/40 flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search stores, merchants, or URLs..."
                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-[#00823B]/20 focus:border-[#00823B] transition-all text-[var(--foreground)]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-500 hover:text-[var(--foreground)] transition-all">
                        <Filter size={14} className="text-[#00823B]" /> Filter Active
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[var(--background)]/30 border-b border-[var(--border)]">
                        <tr>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Store Details</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Store Link</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Performance</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Status</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {storefronts.map((store) => (
                            <tr key={store.id} className="hover:bg-[#00823B]/5 transition-colors group">
                                <td className="px-6 py-5">
                                    <Link href={`/dashboard/storefronts/${store.id}`} className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-[var(--foreground)] font-black shadow-sm group-hover:from-[#00823B] group-hover:to-[#005C29] group-hover:text-white transition-all border border-[var(--border)]">
                                            <Store size={20} />
                                        </div>
                                        <div>
                                            <p className="font-black text-[var(--foreground)] tracking-tight text-[15px] group-hover:text-[#00823B] transition-colors">{store.name}</p>
                                            <p className="text-[11px] text-gray-500 font-bold mt-0.5">{store.merchant} • {store.id}</p>
                                        </div>
                                    </Link>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--background)] border border-[var(--border)] rounded-lg w-fit">
                                        <Link2 size={12} className="text-gray-400" />
                                        <span className="text-[11px] font-bold text-[var(--foreground)]">{store.url}</span>
                                        <button
                                            onClick={(e) => handleCopy(e, store.url, store.id)}
                                            className="ml-2 text-gray-400 hover:text-[#00823B] transition-colors"
                                        >
                                            {copiedId === store.id ? <Check size={14} className="text-[#00823B]"/> : <Copy size={14}/>}
                                        </button>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[14px]">{store.revenue}</span>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                                {store.orders} Orders • {store.views} Views
                                            </span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                                            store.status === 'Active' ? 'bg-[#00823B]/10 text-[#00823B] border-[#00823B]/20' :
                                                store.status === 'Draft' ? 'bg-gray-500/10 text-gray-500 border-gray-500/20' :
                                                    'bg-red-500/10 text-red-500 border-red-500/20'
                                        }`}>
                                            {store.status === 'Active' && <div className="w-1.5 h-1.5 rounded-full bg-[#00823B] animate-pulse"></div>}
                                            {store.status}
                                        </span>
                                </td>

                                <td className="px-6 py-5 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-gray-400 hover:text-[#00823B] hover:border-[#00823B]/30 shadow-sm transition-all" title="View Public Page">
                                            <ExternalLink size={16} />
                                        </button>
                                        <Link href={`/dashboard/storefronts/${store.id}`}>
                                            <button className="p-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-gray-400 hover:text-[var(--foreground)] hover:border-gray-500 shadow-sm transition-all" title="Manage Store">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );

    function StatCard({ label, value, icon, color = "text-[var(--foreground)]" }: any) {
        return (
            <div className="bg-[var(--card)] p-6 rounded-[2rem] border border-[var(--border)] shadow-sm hover:border-[#00823B]/30 transition-all group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-2xl bg-[var(--background)] border border-[var(--border)] text-gray-500 group-hover:bg-[#00823B]/10 group-hover:text-[#00823B] group-hover:border-[#00823B]/20 transition-colors">
                        {icon}
                    </div>
                </div>
                <h3 className={`text-2xl font-black tracking-tight mb-1 ${color}`}>{value}</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
            </div>
        );
    }
}