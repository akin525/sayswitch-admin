"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Megaphone, Mail, MessageSquare, Bell, Plus,
    Search, Filter, MoreHorizontal, CheckCircle2,
    Clock, AlertTriangle, Send, BarChart3, Edit3
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

// --- TYPES ---
type Campaign = {
    id: string;
    name: string;
    type: 'Email' | 'SMS' | 'Push';
    status: 'Sent' | 'Scheduled' | 'Draft' | 'Failed';
    audience: string;
    sentCount: string;
    openRate?: string;
    date: string;
};

export default function Communications() {
    const [activeTab, setActiveTab] = useState("Broadcasts");

    // --- MOCK DATA ---
    const campaigns: Campaign[] = [
        { id: "CMP-001", name: "Q2 API Gateway Upgrade", type: 'Email', status: 'Sent', audience: "All Active Merchants", sentCount: "3,492", openRate: "68.4%", date: "Today, 10:00 AM" },
        { id: "CMP-002", name: "NIBSS Downtime Alert", type: 'SMS', status: 'Sent', audience: "High-Volume Merchants", sentCount: "450", date: "Yesterday, 14:30 PM" },
        { id: "CMP-003", name: "New Storefront Features", type: 'Email', status: 'Scheduled', audience: "E-commerce Sector", sentCount: "1,204", date: "Tomorrow, 09:00 AM" },
        { id: "CMP-004", name: "Welcome Series (Step 1)", type: 'Email', status: 'Draft', audience: "New Signups", sentCount: "-", date: "Last edited 2 days ago" },
        { id: "CMP-005", name: "Failed Settlement Notice", type: 'SMS', status: 'Failed', audience: "Specific UID: 112", sentCount: "0", date: "Mar 26, 2026" },
    ];

    const deliveryData = [
        { time: '10am', count: 400 }, { time: '11am', count: 3000 },
        { time: '12pm', count: 4500 }, { time: '1pm', count: 2000 },
        { time: '2pm', count: 800 }, { time: '3pm', count: 1200 },
    ];

    const tabs = ["Broadcasts", "Transactional Logs", "Templates", "Webhooks"];

    return (
        <DashboardLayout>
            {/* 1. PAGE HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-lg shadow-purple-500/20">
                        <Megaphone size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Communications</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Manage multi-channel broadcasts, alerts, and transactional messages</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 border border-[var(--border)] px-4 py-2.5 rounded-xl text-xs font-bold text-[var(--foreground)] hover:bg-[var(--background)] transition-all bg-[var(--card)] shadow-sm">
                        <Edit3 size={14} /> Create Template
                    </button>
                    <button className="flex items-center gap-2 bg-[#00823B] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all">
                        <Plus size={14} /> New Campaign
                    </button>
                </div>
            </div>

            {/* 2. CHANNEL HEALTH & METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Email Health */}
                <div className="bg-[var(--card)] rounded-[2rem] border border-[var(--border)] p-6 shadow-sm flex items-center justify-between group hover:border-purple-500/30 transition-all">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg"><Mail size={16} /></div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Delivery</h3>
                        </div>
                        <p className="text-2xl font-black text-[var(--foreground)] tracking-tight">99.8%</p>
                        <p className="text-[10px] font-bold text-[#00823B] mt-1">+0.2% from last week</p>
                    </div>
                    <div className="w-24 h-12">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={deliveryData}>
                                <defs>
                                    <linearGradient id="colorEmail" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="count" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorEmail)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* SMS Health */}
                <div className="bg-[var(--card)] rounded-[2rem] border border-[var(--border)] p-6 shadow-sm flex items-center justify-between group hover:border-blue-500/30 transition-all">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg"><MessageSquare size={16} /></div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">SMS Delivery</h3>
                        </div>
                        <p className="text-2xl font-black text-[var(--foreground)] tracking-tight">98.5%</p>
                        <p className="text-[10px] font-bold text-amber-500 mt-1">Route delays detected</p>
                    </div>
                    <div className="w-24 h-12">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={deliveryData}>
                                <defs>
                                    <linearGradient id="colorSMS" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSMS)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Push Health */}
                <div className="bg-[var(--card)] rounded-[2rem] border border-[var(--border)] p-6 shadow-sm flex items-center justify-between group hover:border-emerald-500/30 transition-all">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><Bell size={16} /></div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">In-App / Push</h3>
                        </div>
                        <p className="text-2xl font-black text-[var(--foreground)] tracking-tight">100%</p>
                        <p className="text-[10px] font-bold text-gray-500 mt-1">Optimal routing</p>
                    </div>
                    <div className="w-24 h-12 flex items-center justify-end">
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-6 bg-emerald-500/40 rounded-full"></div>
                            <div className="w-1.5 h-8 bg-emerald-500/60 rounded-full"></div>
                            <div className="w-1.5 h-10 bg-emerald-500/80 rounded-full"></div>
                            <div className="w-1.5 h-12 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. NAVIGATION TABS */}
            <div className="border-b border-[var(--border)] mb-8 overflow-x-auto scrollbar-hide">
                <div className="flex gap-8 px-2 min-w-max">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-[11px] font-black uppercase tracking-widest transition-all relative ${
                                activeTab === tab
                                    ? "text-purple-500"
                                    : "text-gray-400 hover:text-[var(--foreground)]"
                            }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-purple-500 rounded-t-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* 4. MAIN CONTENT TABLE */}
            <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-[var(--border)] bg-[var(--background)]/30 flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search campaigns, subjects, or audiences..."
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-[var(--foreground)]"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[11px] font-black text-gray-500 hover:text-[var(--foreground)] transition-all uppercase tracking-widest">
                            <Filter size={14} className="text-purple-500" /> Channel: All
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-[var(--background)]/40 border-b border-[var(--border)]">
                        <tr>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Campaign Details</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Target Audience</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Performance</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</th>
                            <th className="px-6 py-5"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {campaigns.map((camp) => (
                            <tr key={camp.id} className="hover:bg-[var(--background)]/50 transition-colors group cursor-pointer">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                                            camp.type === 'Email' ? 'bg-purple-500/10 border-purple-500/20 text-purple-500' :
                                                camp.type === 'SMS' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
                                                    'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                                        }`}>
                                            {camp.type === 'Email' ? <Mail size={16}/> : camp.type === 'SMS' ? <MessageSquare size={16}/> : <Bell size={16}/>}
                                        </div>
                                        <div>
                                            <p className="font-black text-[var(--foreground)] tracking-tight text-[14px] group-hover:text-purple-500 transition-colors">{camp.name}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{camp.id} • {camp.type}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                        <span className="px-3 py-1.5 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[11px] font-black text-gray-500 dark:text-gray-300 tracking-wide">
                                            {camp.audience}
                                        </span>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[13px]">{camp.sentCount} Sent</span>
                                        {camp.openRate && (
                                            <span className="text-[10px] font-bold text-[#00823B] flex items-center gap-1">
                                                    <BarChart3 size={10} /> {camp.openRate} Opened
                                                </span>
                                        )}
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <StatusBadge status={camp.status} />
                                    <p className="text-[9px] font-bold text-gray-400 mt-1.5 uppercase tracking-widest">{camp.date}</p>
                                </td>

                                <td className="px-6 py-5 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-gray-400 hover:text-purple-500 hover:border-purple-500/30 shadow-sm transition-all" title="View Report">
                                            <BarChart3 size={16} />
                                        </button>
                                        <button className="p-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-gray-400 hover:text-[var(--foreground)] hover:border-gray-500 shadow-sm transition-all">
                                            <MoreHorizontal size={16} />
                                        </button>
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

    // --- HELPER COMPONENT ---
    function StatusBadge({ status }: { status: Campaign['status'] }) {
        const config = {
            'Sent': { bg: 'bg-[#00823B]/10', text: 'text-[#00823B]', icon: <Send size={10}/> },
            'Scheduled': { bg: 'bg-amber-500/10', text: 'text-amber-500', icon: <Clock size={10}/> },
            'Draft': { bg: 'bg-[var(--background)]', text: 'text-gray-500', icon: <Edit3 size={10}/> },
            'Failed': { bg: 'bg-red-500/10', text: 'text-red-500', icon: <AlertTriangle size={10}/> }
        }[status];

        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-current opacity-80 text-[9px] font-black uppercase tracking-widest ${config.bg} ${config.text}`}>
                {config.icon} {status}
            </span>
        );
    }
}