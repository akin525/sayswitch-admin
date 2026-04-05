"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Activity, ShieldCheck, Zap, Server, Globe, Cpu,
    ArrowUpRight, AlertCircle, Clock, RefreshCw, Database
} from "lucide-react";
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell
} from 'recharts';

export default function SystemAnalytics() {
    // --- MOCK INFRA DATA ---
    const trafficData = [
        { time: '00:00', requests: 2400 }, { time: '04:00', requests: 1200 },
        { time: '08:00', requests: 5800 }, { time: '12:00', requests: 7200 },
        { time: '16:00', requests: 8100 }, { time: '20:00', requests: 4500 },
        { time: '23:59', requests: 3100 },
    ];

    const apiLatency = [
        { endpoint: '/v1/charge', time: 120 },
        { endpoint: '/v1/disburse', time: 340 },
        { endpoint: '/v1/verify', time: 85 },
        { endpoint: '/v1/balance', time: 45 },
        { endpoint: '/v1/webhook', time: 210 },
    ];

    return (
        <DashboardLayout>
            {/* 1. HEADER AREA */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#00823B] rounded-2xl shadow-[0_8px_16px_rgba(0,130,59,0.2)] animate-pulse">
                        <Activity size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">System Analytics</h1>
                        <p className="text-[13px] text-gray-500 font-medium flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#00823B]"></span>
                            Live infrastructure monitoring
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-500 shadow-sm flex items-center gap-2">
                        <Database size={14} className="text-[#00823B]" />
                        DB: 0.04ms
                    </div>
                    <button className="p-2 bg-[#00823B]/10 text-[#00823B] rounded-xl hover:bg-[#00823B]/20 transition-all">
                        <RefreshCw size={18} />
                    </button>
                </div>
            </div>

            {/* 2. REAL-TIME HEALTH CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <HealthCard title="Core Uptime" value="99.999%" status="Healthy" icon={<ShieldCheck size={18}/>} />
                <HealthCard title="Avg. Latency" value="142ms" status="Fast" icon={<Zap size={18}/>} />
                <HealthCard title="Error Rate" value="0.02%" status="Minimal" icon={<AlertCircle size={18}/>} />
                <HealthCard title="CPU Load" value="24%" status="Low" icon={<Cpu size={18}/>} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                {/* 3. LIVE TRAFFIC (REQUESTS PER SECOND) */}
                <div className="lg:col-span-8 bg-[var(--card)] rounded-[32px] border border-[var(--border)] p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-black text-[var(--foreground)] tracking-tight">API Traffic Flow</h3>
                            <p className="text-xs text-gray-400 font-medium">Request volume over last 24 hours</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-[#00823B]/10 text-[#00823B] text-[10px] font-black rounded-lg uppercase">Global</span>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trafficData}>
                                <defs>
                                    <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00823B" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#00823B" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="requests" stroke="#00823B" strokeWidth={3} fillOpacity={1} fill="url(#colorRequests)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 4. API LATENCY BY ENDPOINT */}
                <div className="lg:col-span-4 bg-[var(--card)] rounded-[32px] border border-[var(--border)] p-8 shadow-sm">
                    <h3 className="font-black text-[var(--foreground)] tracking-tight mb-2">API Latency</h3>
                    <p className="text-xs text-gray-400 font-medium mb-8">Response time by endpoint (ms)</p>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={apiLatency}>
                                <XAxis dataKey="endpoint" hide />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{fill: 'transparent'}}
                                    contentStyle={{ borderRadius: '12px', border: 'none', background: '#0f172a', color: '#fff' }}
                                />
                                <Bar dataKey="time" radius={[6, 6, 6, 6]} barSize={40}>
                                    {apiLatency.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.time > 300 ? '#ef4444' : '#00823B'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-4 space-y-2">
                        {apiLatency.map((api, idx) => (
                            <div key={idx} className="flex items-center justify-between text-[11px] font-bold">
                                <span className="text-gray-500">{api.endpoint}</span>
                                <span className={api.time > 300 ? "text-red-500" : "text-[#00823B]"}>{api.time}ms</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. SERVER NODES STATUS */}
            <div className="bg-[var(--card)] rounded-[32px] border border-[var(--border)] p-6 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 mb-6">
                    <Server size={18} className="text-[#00823B]" />
                    <h3 className="font-black text-[var(--foreground)] tracking-tight">Infrastructure Nodes</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <NodeStatus name="Nginx Edge-01" region="Lagos, NG" load="12%" uptime="42 days" />
                    <NodeStatus name="Nginx Edge-02" region="London, UK" load="08%" uptime="12 days" />
                    <NodeStatus name="Worker-Node-01" region="Lagos, NG" load="45%" uptime="104 days" />
                </div>
            </div>
        </DashboardLayout>
    );

    // --- MINI COMPONENTS ---
    function HealthCard({ title, value, status, icon }: { title: string, value: string, status: string, icon: any }) {
        return (
            <div className="bg-[var(--card)] p-5 rounded-[24px] border border-[var(--border)] shadow-sm relative overflow-hidden group hover:border-[#00823B]/40 transition-all">
                <div className="flex justify-between items-start relative z-10">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</p>
                        <h3 className="text-2xl font-black text-[var(--foreground)] mt-1">{value}</h3>
                        <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded-full bg-[#00823B]/10 text-[#00823B] text-[9px] font-black uppercase">
                            {status}
                        </span>
                    </div>
                    <div className="p-2 bg-[#00823B]/5 text-[#00823B] rounded-xl group-hover:bg-[#00823B] group-hover:text-white transition-all">
                        {icon}
                    </div>
                </div>
            </div>
        );
    }

    function NodeStatus({ name, region, load, uptime }: { name: string, region: string, load: string, uptime: string }) {
        return (
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--background)] border border-[var(--border)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#00823B] shadow-[0_0_8px_#00823B]"></div>
                    <div>
                        <p className="text-xs font-black text-[var(--foreground)]">{name}</p>
                        <p className="text-[10px] text-gray-500 font-medium">{region}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-[#00823B]">{load} load</p>
                    <p className="text-[9px] text-gray-400 uppercase font-black tracking-tighter">{uptime} up</p>
                </div>
            </div>
        );
    }
}