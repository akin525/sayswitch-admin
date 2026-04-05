"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Building2, TrendingUp, Users, ShieldAlert,
    ArrowUpRight, Download, Plus, Filter, Search,
    MoreHorizontal, CheckCircle2, Clock, Factory
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import Link from "next/link";

export default function BusinessOverview() {
    // --- MOCK DATA ---
    const acquisitionData = [
        { month: 'Jan', new: 45, total: 850 }, { month: 'Feb', new: 52, total: 902 },
        { month: 'Mar', new: 88, total: 990 }, { month: 'Apr', new: 65, total: 1055 },
        { month: 'May', new: 110, total: 1165 }, { month: 'Jun', new: 39, total: 1204 },
    ];

    const industryData = [
        { name: 'Ecommerce', value: 45 },
        { name: 'Logistics', value: 25 },
        { name: 'SaaS', value: 15 },
        { name: 'Agriculture', value: 15 },
    ];

    const COLORS = ['#00823B', '#00A84D', '#10B981', '#E6F3EB'];

    const pendingApprovals = [
        { id: "BUS-9920", name: "Apex Retail", industry: "Ecommerce", date: "2 hours ago", missing: "Utility Bill" },
        { id: "BUS-9921", name: "FarmFresh NG", industry: "Agriculture", date: "5 hours ago", missing: "Director ID" },
        { id: "BUS-9922", name: "Swift Delivery", industry: "Logistics", date: "1 day ago", missing: "CAC Certificate" },
        { id: "BUS-9923", name: "TechNova", industry: "SaaS", date: "1 day ago", missing: "Address Proof" },
    ];

    return (
        <DashboardLayout>
            {/* 1. PAGE HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-[#005C29] to-[#00823B] rounded-2xl shadow-[0_8px_16px_rgba(0,130,59,0.2)]">
                        <Building2 size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Business Overview</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Acquisition trends, industry distribution, and onboarding queue</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 border border-[var(--border)] px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-all bg-[var(--card)] shadow-sm">
                        <Download size={14} /> Export Report
                    </button>
                    <button className="flex items-center gap-2 bg-[#00823B] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all">
                        <Plus size={14} /> New Business
                    </button>
                </div>
            </div>

            {/* 2. TOP KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Registered"
                    value="1,204"
                    trend="+12% this month"
                    icon={<Users size={20} className="text-[#00823B]" />}
                />
                <StatCard
                    title="Active Businesses"
                    value="1,180"
                    trend="98% activation rate"
                    icon={<CheckCircle2 size={20} className="text-[#00823B]" />}
                />
                <StatCard
                    title="Pending KYC"
                    value="18"
                    trend="Needs review"
                    icon={<Clock size={20} className="text-amber-500" />}
                    isAlert
                />
                <StatCard
                    title="Blocked Accounts"
                    value="6"
                    trend="-2 from last week"
                    icon={<ShieldAlert size={20} className="text-red-500" />}
                />
            </div>

            {/* 3. CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">

                {/* Acquisition Trend Chart */}
                <div className="lg:col-span-8 bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-black text-[var(--foreground)] tracking-tight">Merchant Acquisition</h3>
                            <p className="text-xs text-gray-500 font-bold mt-1">New business registrations over time</p>
                        </div>
                        <div className="flex items-center gap-2 bg-[var(--background)] p-1 rounded-lg border border-[var(--border)]">
                            <button className="px-4 py-1.5 text-[10px] font-black uppercase rounded-md bg-[#00823B] text-white shadow-sm">Monthly</button>
                            <button className="px-4 py-1.5 text-[10px] font-black uppercase rounded-md text-gray-500 hover:text-[var(--foreground)] transition-colors">Quarterly</button>
                        </div>
                    </div>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={acquisitionData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorAcq" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00823B" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#00823B" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.6} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: '1px solid var(--border)', backgroundColor: 'var(--card)', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ fontWeight: 900, color: '#00823B' }}
                                />
                                <Area type="monotone" dataKey="new" stroke="#00823B" strokeWidth={4} fillOpacity={1} fill="url(#colorAcq)" activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Industry Distribution Donut */}
                <div className="lg:col-span-4 bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] p-8 shadow-sm flex flex-col">
                    <h3 className="font-black text-[var(--foreground)] tracking-tight mb-2">Industry Distribution</h3>
                    <p className="text-xs text-gray-500 font-bold mb-6">Market share by sector</p>

                    <div className="flex-1 flex items-center justify-center relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Top Sector</p>
                            <p className="text-xl font-black text-[var(--foreground)] mt-1">E-com</p>
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie
                                    data={industryData}
                                    innerRadius={70}
                                    outerRadius={95}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {industryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--card)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {industryData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-[var(--background)] p-2 rounded-xl border border-[var(--border)]">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{item.name}</span>
                                    <span className="text-xs font-black text-[var(--foreground)]">{item.value}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. ACTION QUEUE: PENDING APPROVALS */}
            <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-[var(--border)] gap-4 bg-[var(--background)]/40">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/10 rounded-xl">
                            <Clock size={18} className="text-amber-500" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-[var(--foreground)] uppercase tracking-wide">Action Required: KYC Queue</h2>
                            <p className="text-[11px] text-gray-500 font-bold mt-0.5">Businesses waiting for documentation approval</p>
                        </div>
                    </div>
                    <Link href="/dashboard/business/directory" className="text-xs font-black text-[#00823B] hover:text-[#005C29] uppercase tracking-widest transition-colors">
                        View All Businesses &rarr;
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-[var(--card)] border-b border-[var(--border)]">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Business Name</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Industry</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Missing Document</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Submitted</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)] bg-[var(--card)]">
                        {pendingApprovals.map((bus, idx) => (
                            <tr key={idx} className="hover:bg-[var(--background)]/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[var(--foreground)] font-black text-xs">
                                            {bus.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-black text-[var(--foreground)]">{bus.name}</p>
                                            <p className="text-[10px] text-gray-500 font-bold">{bus.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs font-bold text-gray-500">{bus.industry}</td>
                                <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[10px] font-black uppercase tracking-widest">
                                            <ShieldAlert size={10} /> {bus.missing}
                                        </span>
                                </td>
                                <td className="px-6 py-4 text-xs font-bold text-gray-500">{bus.date}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[11px] font-black text-[var(--foreground)] hover:text-[#00823B] hover:border-[#00823B]/30 transition-all shadow-sm">
                                        Review Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </DashboardLayout>
    );

    // --- HELPER COMPONENTS ---
    function StatCard({ title, value, trend, icon, isAlert = false }: any) {
        return (
            <div className={`bg-[var(--card)] p-6 rounded-[2rem] border transition-all ${
                isAlert
                    ? "border-amber-500/30 shadow-[0_4px_12px_rgba(245,158,11,0.05)]"
                    : "border-[var(--border)] shadow-sm hover:border-[#00823B]/30"
            }`}>
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl ${isAlert ? 'bg-amber-500/10' : 'bg-[#00823B]/10'}`}>
                        {icon}
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        isAlert ? 'text-amber-600 bg-amber-500/10' : 'text-[#00823B] bg-[#00823B]/10'
                    }`}>
                        {trend}
                    </div>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
                <h3 className="text-3xl font-black text-[var(--foreground)] tracking-tight">{value}</h3>
            </div>
        );
    }
}