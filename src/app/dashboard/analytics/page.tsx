"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    BarChart2, Calendar, Download, TrendingUp,
    Activity, CreditCard, ArrowUpRight, Users,
    Smartphone, Globe, Zap
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

export default function AnalyticsPage() {
    const [dateRange, setDateRange] = useState("Last 30 Days");

    // --- MOCK DATA ---
    const volumeData = [
        { date: '01 Apr', volume: 12.5, revenue: 1.2 }, { date: '05 Apr', volume: 15.2, revenue: 1.5 },
        { date: '10 Apr', volume: 14.8, revenue: 1.4 }, { date: '15 Apr', volume: 18.9, revenue: 1.8 },
        { date: '20 Apr', volume: 22.4, revenue: 2.1 }, { date: '25 Apr', volume: 28.5, revenue: 2.8 },
        { date: '30 Apr', volume: 32.1, revenue: 3.2 },
    ];

    const channelData = [
        { name: 'Bank Transfer', value: 65 },
        { name: 'Card Payment', value: 25 },
        { name: 'USSD', value: 7 },
        { name: 'QR Code', value: 3 },
    ];

    const topMerchants = [
        { id: "1", name: "Machika Telecoms", volume: "₦142.5M", txCount: "12,450", trend: "+12.5%" },
        { id: "2", name: "Spayz Logistics", volume: "₦89.2M", txCount: "8,920", trend: "+8.2%" },
        { id: "3", name: "Green Energy Ltd", volume: "₦65.4M", txCount: "5,100", trend: "+15.4%" },
        { id: "4", name: "Isakharu Tech", volume: "₦42.1M", txCount: "3,240", trend: "-2.1%" },
        { id: "5", name: "Global Foodies", volume: "₦28.8M", txCount: "4,500", trend: "+5.8%" },
    ];

    const COLORS = ['#8b5cf6', '#a855f7', '#c084fc', '#e9d5ff'];

    return (
        <DashboardLayout>
            {/* 1. PAGE HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl shadow-lg shadow-violet-500/20">
                        <BarChart2 size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Financial Analytics</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Platform-wide volume, revenue metrics, and channel performance</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="appearance-none pl-10 pr-10 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-600 hover:text-[var(--foreground)] focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all shadow-sm cursor-pointer"
                        >
                            <option>Today</option>
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>This Quarter</option>
                            <option>Year to Date</option>
                        </select>
                        <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500 pointer-events-none" />
                    </div>
                    <button className="flex items-center gap-2 bg-[#1F2937] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg hover:bg-gray-800 transition-all">
                        <Download size={14} /> Export Report
                    </button>
                </div>
            </div>

            {/* 2. TOP KPI CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    label="Total Processing Volume"
                    value="₦842.5M"
                    trend="+14.5% vs last period"
                    icon={<Activity size={18}/>}
                    color="text-violet-500"
                />
                <StatCard
                    label="Platform Revenue (Fees)"
                    value="₦12.4M"
                    trend="+18.2% vs last period"
                    icon={<TrendingUp size={18}/>}
                    color="text-[#00823B]"
                />
                <StatCard
                    label="Active Merchants"
                    value="3,492"
                    trend="+124 new signups"
                    icon={<Users size={18}/>}
                />
                <StatCard
                    label="Success Rate"
                    value="98.8%"
                    trend="+0.4% improvement"
                    icon={<Zap size={18}/>}
                />
            </div>

            {/* 3. MAIN CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                {/* Large Area Chart: Volume & Revenue Trend */}
                <div className="lg:col-span-2 bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] p-6 sm:p-8 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h3 className="font-black text-[var(--foreground)] tracking-tight text-lg">Growth Trajectory</h3>
                            <p className="text-xs text-gray-500 font-bold mt-1">Transaction volume vs. Platform revenue (in Millions)</p>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                            <div className="flex items-center gap-1.5 text-[var(--foreground)]">
                                <div className="w-2 h-2 rounded-full bg-violet-500"></div> Volume
                            </div>
                            <div className="flex items-center gap-1.5 text-[var(--foreground)]">
                                <div className="w-2 h-2 rounded-full bg-[#00823B]"></div> Revenue
                            </div>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={volumeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00823B" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#00823B" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.6} />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} tickFormatter={(val) => `₦${val}M`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="volume" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorVolume)" activeDot={{ r: 6, strokeWidth: 0 }} />
                                <Area type="monotone" dataKey="revenue" stroke="#00823B" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" activeDot={{ r: 5, strokeWidth: 0 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Donut Chart: Channel Distribution */}
                <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] p-6 sm:p-8 shadow-sm flex flex-col">
                    <h3 className="font-black text-[var(--foreground)] tracking-tight text-lg">Channel Distribution</h3>
                    <p className="text-xs text-gray-500 font-bold mt-1 mb-6">Payment methods used by customers</p>

                    <div className="flex-1 flex items-center justify-center relative min-h-[220px]">
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-black text-[var(--foreground)]">65%</span>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Bank Tx</span>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={channelData}
                                    innerRadius={75}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                    cornerRadius={8}
                                >
                                    {channelData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid var(--border)', backgroundColor: 'var(--card)', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} itemStyle={{ fontWeight: 900 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                        {channelData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-[var(--background)] p-2.5 rounded-xl border border-[var(--border)]">
                                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx] }}></div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none">{item.name}</span>
                                    <span className="text-[13px] font-black text-[var(--foreground)] mt-1 leading-none">{item.value}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. BOTTOM ROW: TOP MERCHANTS LEADERBOARD */}
            <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 sm:p-8 border-b border-[var(--border)] bg-[var(--background)]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h3 className="font-black text-[var(--foreground)] tracking-tight text-lg">Top Performing Merchants</h3>
                        <p className="text-xs text-gray-500 font-bold mt-1">Leaderboard based on total processing volume</p>
                    </div>
                    <button className="text-xs font-black text-violet-500 hover:text-violet-600 uppercase tracking-widest transition-colors flex items-center gap-1">
                        View Full Report <ArrowUpRight size={14}/>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[var(--background)]/40 border-b border-[var(--border)]">
                        <tr>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest w-16 text-center">Rank</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Merchant Profile</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Total Volume</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Transactions</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest text-right">Growth (MoM)</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {topMerchants.map((merchant, idx) => (
                            <tr key={merchant.id} className="hover:bg-violet-500/5 transition-colors group">
                                <td className="px-6 py-5 text-center">
                                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-black ${
                                            idx === 0 ? 'bg-amber-500/20 text-amber-600' :
                                                idx === 1 ? 'bg-gray-300/20 text-gray-500' :
                                                    idx === 2 ? 'bg-orange-600/20 text-orange-700' :
                                                        'bg-[var(--background)] text-gray-400 border border-[var(--border)]'
                                        }`}>
                                            #{idx + 1}
                                        </span>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center font-black">
                                            {merchant.name.charAt(0)}
                                        </div>
                                        <span className="font-black text-[var(--foreground)] tracking-tight text-[14px] group-hover:text-violet-500 transition-colors">
                                                {merchant.name}
                                            </span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="font-black text-[var(--foreground)] text-[15px]">{merchant.volume}</span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-[12px] font-bold text-gray-500">{merchant.txCount} txns</span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest ${
                                            merchant.trend.startsWith('+') ? 'bg-[#00823B]/10 text-[#00823B]' : 'bg-red-500/10 text-red-500'
                                        }`}>
                                            {merchant.trend}
                                        </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </DashboardLayout>
    );

    // --- REUSABLE COMPONENTS ---

    function StatCard({ label, value, trend, icon, color = "text-[var(--foreground)]" }: any) {
        return (
            <div className="bg-[var(--card)] p-6 rounded-[2rem] border border-[var(--border)] shadow-sm hover:border-violet-500/30 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-2xl bg-[var(--background)] border border-[var(--border)] text-gray-500 group-hover:bg-violet-500/10 group-hover:text-violet-500 group-hover:border-violet-500/20 transition-colors">
                        {icon}
                    </div>
                </div>
                <h3 className={`text-3xl font-black tracking-tight mb-2 ${color}`}>{value}</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <p className={`text-[11px] font-bold ${trend.includes('+') ? 'text-[#00823B]' : 'text-gray-500'}`}>{trend}</p>
            </div>
        );
    }

    // Custom Tooltip for Recharts to match the Elite theme
    function CustomTooltip({ active, payload, label }: any) {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[var(--card)] border border-[var(--border)] p-4 rounded-2xl shadow-xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center justify-between gap-6 mb-2 last:mb-0">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                <span className="text-xs font-bold text-gray-400 capitalize">{entry.name}</span>
                            </div>
                            <span className="text-sm font-black text-[var(--foreground)]">₦{entry.value}M</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    }
}