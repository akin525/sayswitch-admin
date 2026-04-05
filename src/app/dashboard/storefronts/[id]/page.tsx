"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    ArrowLeft, Store, ExternalLink, Copy, Check,
    Settings, ShoppingBag, Eye, CreditCard, Box, Users
} from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function StorefrontDetails({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState("Overview");
    const [copied, setCopied] = useState(false);

    // --- MOCK DATA ---
    const store = {
        id: params.id,
        name: "Machika Gadgets",
        merchant: "MACHIKA TELECOMS",
        url: "say.sw/machika-gadgets",
        status: "Active",
        revenue: "₦4,520,000",
        orders: "1,204",
        views: "34.2K",
        conversion: "3.5%"
    };

    const chartData = [
        { name: '10am', sales: 4000 }, { name: '12pm', sales: 7000 },
        { name: '2pm', sales: 5500 }, { name: '4pm', sales: 9000 },
        { name: '6pm', sales: 12000 }, { name: '8pm', sales: 8000 },
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(`https://${store.url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const tabs = ["Overview", "Products", "Orders", "Design Settings", "Developers"];

    return (
        <DashboardLayout>
            {/* 1. TOP NAV & STORE HERO */}
            <div className="relative mb-8 overflow-hidden rounded-[2.5rem] border border-[var(--border)] bg-[var(--card)] shadow-sm">
                <div className="h-28 w-full bg-gradient-to-r from-[#00823B] via-[#00A84D] to-[#005C29] relative overflow-hidden">
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent background-size-[20px_20px]"></div>

                    <Link href="/dashboard/storefronts" className="absolute top-5 left-6 flex items-center gap-2 text-white/80 hover:text-white font-bold text-xs bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl transition-all">
                        <ArrowLeft size={14} /> Back to Storefronts
                    </Link>
                </div>

                <div className="px-6 sm:px-10 pb-8">
                    <div className="relative -mt-12 flex flex-col md:flex-row md:items-end justify-between gap-6">

                        <div className="flex flex-col sm:flex-row sm:items-end gap-6">
                            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-3xl border-4 border-[var(--card)] bg-[#111827] shadow-2xl flex items-center justify-center text-4xl font-black text-white relative">
                                <Store size={40} className="text-[#00823B]" />
                            </div>

                            <div className="flex flex-col gap-2 pb-1">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight">{store.name}</h1>
                                    <span className="bg-[#00823B]/10 text-[#00823B] text-[9px] font-black px-2.5 py-1 rounded-md border border-[#00823B]/20 uppercase tracking-widest flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00823B] animate-pulse"></div> {store.status}
                                    </span>
                                </div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    Owned by <Link href="#" className="text-[#00823B] hover:underline">{store.merchant}</Link>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pb-1">
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--foreground)] shadow-sm">
                                {store.url}
                                <button onClick={handleCopy} className="ml-2 text-gray-400 hover:text-[#00823B] transition-colors">
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                            </div>
                            <button className="flex items-center gap-2 bg-[#1F2937] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-md hover:bg-gray-800 transition-all">
                                <ExternalLink size={14} /> Visit Store
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. NAVIGATION TABS */}
            <div className="border-b border-[var(--border)] mb-8 overflow-x-auto scrollbar-hide">
                <div className="flex gap-8 px-2 min-w-max">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-[11px] font-black uppercase tracking-widest transition-all relative ${
                                activeTab === tab ? "text-[#00823B]" : "text-gray-400 hover:text-[var(--foreground)]"
                            }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#00823B] rounded-t-full shadow-[0_0_10px_#00823B]"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. TAB CONTENT: OVERVIEW */}
            {activeTab === "Overview" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">

                    {/* Store Metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <MetricCard label="Net Revenue" value={store.revenue} icon={<CreditCard size={16}/>} isGreen />
                        <MetricCard label="Total Orders" value={store.orders} icon={<ShoppingBag size={16}/>} />
                        <MetricCard label="Page Views" value={store.views} icon={<Eye size={16}/>} />
                        <MetricCard label="Conv. Rate" value={store.conversion} icon={<Users size={16}/>} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Sales Chart */}
                        <div className="lg:col-span-2 bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-sm font-black text-[var(--foreground)] uppercase tracking-widest">Sales Volume (Today)</h3>
                            </div>
                            <div className="h-[280px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData} margin={{ left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#00823B" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#00823B" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} tickFormatter={(val) => `₦${val/1000}k`} />
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--card)' }} />
                                        <Area type="monotone" dataKey="sales" stroke="#00823B" strokeWidth={4} fill="url(#colorSales)" activeDot={{ r: 6, fill: '#00823B', stroke: '#fff', strokeWidth: 2 }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recent Orders Mini-List */}
                        <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] p-8 shadow-sm flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-sm font-black text-[var(--foreground)] uppercase tracking-widest">Live Orders</h3>
                                <span className="p-2 bg-[#00823B]/10 text-[#00823B] rounded-xl"><ShoppingBag size={16}/></span>
                            </div>
                            <div className="space-y-4 flex-1">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-2xl border border-[var(--border)] bg-[var(--background)] hover:border-[#00823B]/30 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center">
                                                <Box size={16} className="text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-[var(--foreground)]">AirPods Pro</p>
                                                <p className="text-[10px] text-gray-500 font-bold mt-0.5">ORD-99{i}2</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-black text-[#00823B]">₦120k</p>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-3 rounded-xl border border-[var(--border)] text-xs font-black text-gray-500 hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-colors">
                                View All Orders
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* PLACEHOLDER FOR OTHER TABS */}
            {activeTab !== "Overview" && (
                <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] border-dashed p-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
                    <div className="p-4 bg-[var(--background)] rounded-full mb-4">
                        <Settings size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-lg font-black text-[var(--foreground)]">No configuration available for {activeTab}</h3>
                    <p className="text-sm text-gray-500 max-w-xs mt-2 font-medium">This module is currently under development.</p>
                </div>
            )}

        </DashboardLayout>
    );

    function MetricCard({ label, value, icon, isGreen = false }: any) {
        return (
            <div className="bg-[var(--card)] p-6 rounded-[2rem] border border-[var(--border)] shadow-sm">
                <div className="flex items-center gap-3 mb-4 text-gray-400">
                    {icon}
                    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
                </div>
                <h3 className={`text-2xl font-black tracking-tight ${isGreen ? "text-[#00823B]" : "text-[var(--foreground)]"}`}>{value}</h3>
            </div>
        );
    }
}