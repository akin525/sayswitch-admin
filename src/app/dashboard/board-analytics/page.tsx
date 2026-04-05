"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    BarChart3, TrendingUp, Users, Target, ArrowUpRight,
    Download, Calendar, Filter, PieChart, Zap
} from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, PieChart as RePie, Pie
} from 'recharts';

export default function BoardAnalytics() {
    // --- MOCK DATA ---
    const merchantPerformance = [
        { name: 'Spayz', volume: 12000000, growth: '+12%' },
        { name: 'Isakharu', volume: 8500000, growth: '+8%' },
        { name: 'Tech Solutions', volume: 5200000, growth: '-2%' },
        { name: 'Acme Corp', volume: 4100000, growth: '+15%' },
        { name: 'Global Pay', volume: 3900000, growth: '+5%' },
    ];

    const volumeByChannel = [
        { name: 'Card', value: 65 },
        { name: 'Bank Transfer', value: 20 },
        { name: 'USSD', value: 10 },
        { name: 'QR', value: 5 },
    ];

    const COLORS = ['#00823B', '#005C29', '#00A84D', '#E6F3EB'];

    return (
        <DashboardLayout>
            {/* 1. HEADER AREA */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#00823B] rounded-2xl shadow-[0_8px_16px_rgba(0,130,59,0.2)]">
                        <BarChart3 size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Board Analytics</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Strategic insights and high-level performance metrics</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                        <Calendar size={14} className="text-[#00823B]" />
                        This Fiscal Year
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#00823B] text-white rounded-xl text-xs font-bold shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all">
                        <Download size={14} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* 2. TOP TIER STRATEGIC STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <StrategicCard title="Gross Volume" value="₦1.2B" change="+18.4%" icon={<TrendingUp size={16}/>} />
                <StrategicCard title="Avg. Success Rate" value="99.2%" change="+0.4%" icon={<Zap size={16}/>} />
                <StrategicCard title="Active Merchants" value="1,204" change="+42" icon={<Users size={16}/>} />
                <StrategicCard title="Target Achievement" value="84%" change="On Track" icon={<Target size={16}/>} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                {/* 3. MERCHANT PERFORMANCE RANKING */}
                <div className="lg:col-span-7 bg-[var(--card)] rounded-[32px] border border-[var(--border)] p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-black text-[var(--foreground)] tracking-tight">Top Performing Merchants</h3>
                        <Filter size={16} className="text-gray-400 cursor-pointer" />
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={merchantPerformance} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" opacity={0.5} />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--foreground)', fontSize: 12, fontWeight: 700 }}
                                />
                                <Tooltip
                                    cursor={{fill: '#00823B', opacity: 0.05}}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="volume" radius={[0, 8, 8, 0]} barSize={32}>
                                    {merchantPerformance.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#00823B' : '#00823B/40'} fillOpacity={1 - (index * 0.15)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 4. CHANNEL DISTRIBUTION */}
                <div className="lg:col-span-5 bg-[var(--card)] rounded-[32px] border border-[var(--border)] p-8 shadow-sm flex flex-col">
                    <h3 className="font-black text-[var(--foreground)] tracking-tight mb-8">Channel Utilization</h3>

                    <div className="flex-1 flex items-center justify-center relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Primary</p>
                            <p className="text-2xl font-black text-[#00823B]">Card</p>
                        </div>
                        <ResponsiveContainer width="100%" height={250}>
                            <RePie>
                                <Pie
                                    data={volumeByChannel}
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {volumeByChannel.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </RePie>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-3 mt-6">
                        {volumeByChannel.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-[var(--background)]/50 border border-[var(--border)]">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                                    <span className="text-xs font-bold text-gray-600">{item.name}</span>
                                </div>
                                <span className="text-xs font-black text-[var(--foreground)]">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. PERFORMANCE LOG */}
            <div className="bg-[#00823B] rounded-[32px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="relative z-10">
                    <h2 className="text-xl font-black mb-1">System Health is Optimal</h2>
                    <p className="text-white/70 text-sm">Your success rate is 4.2% higher than this time last month.</p>
                </div>
                <button className="relative z-10 px-8 py-3 bg-white text-[#00823B] rounded-2xl font-black text-sm hover:shadow-xl transition-all active:scale-95">
                    View Technical Logs
                </button>
            </div>
        </DashboardLayout>
    );

    // --- MINI COMPONENT ---
    function StrategicCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: any }) {
        return (
            <div className="bg-[var(--card)] p-5 rounded-[24px] border border-[var(--border)] shadow-sm group hover:border-[#00823B]/50 transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-[#00823B]/10 rounded-xl text-[#00823B] group-hover:bg-[#00823B] group-hover:text-white transition-all">
                        {icon}
                    </div>
                    <div className="flex items-center gap-1 text-[#00823B] bg-[#00823B]/5 px-2 py-0.5 rounded-lg">
                        <span className="text-[10px] font-black">{change}</span>
                        <ArrowUpRight size={10} />
                    </div>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</p>
                <h3 className="text-2xl font-black text-[var(--foreground)] mt-1">{value}</h3>
            </div>
        );
    }
}