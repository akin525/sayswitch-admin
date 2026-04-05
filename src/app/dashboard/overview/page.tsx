"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Calendar, ChevronRight, Search, Download, MoreHorizontal,
    RefreshCw, Filter, Wallet, CheckCircle2, AlertTriangle, TrendingUp, Shield,
    X, ArrowUpRight, Copy, Check, Fingerprint, CreditCard, User, History,
    ArrowRightLeft, RotateCcw, ShieldCheck, Printer
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// --- TYPES ---
type Transaction = {
    id: string;
    business: string;
    amount: string;
    type: string;
    status: string;
    date: string;
    fee?: string;
    customerEmail?: string;
    customerName?: string;
    reference?: string;
    channel?: string;
    bank?: string;
    cardType?: string;
    ipAddress?: string;
};

export default function OverviewPage() {
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
    const [copied, setCopied] = useState(false);

    // --- MOCK DATA ---
    const recentTransactions: Transaction[] = [
        { id: "000000000000365315394", business: "Spayz", amount: "KSh100", type: "Transaction", status: "success", date: "Mar 27, 2026, 11:17 AM", fee: "KSh2.50", customerEmail: "samson@sayswitch.com", customerName: "Samson Admin", reference: "SS-TX-99182", channel: "Card", bank: "Access Bank", cardType: "Visa •••• 4242", ipAddress: "192.168.1.1" },
        { id: "000000000000365315386", business: "Spayz", amount: "KSh100", type: "Transaction", status: "success", date: "Mar 27, 2026, 11:17 AM", fee: "KSh2.50", customerEmail: "client@mail.com", customerName: "John Doe", reference: "SS-TX-99183", channel: "Bank Transfer", bank: "Zenith Bank", ipAddress: "102.16.8.44" },
        { id: "00000000000X2587301", business: "Isakharu Tech", amount: "KSh49", type: "Transaction", status: "success", date: "Mar 27, 2026, 11:17 AM", fee: "KSh1.20", customerEmail: "info@tech.io", reference: "SS-TX-99184", channel: "USSD", bank: "GTBank", ipAddress: "41.52.1.9" },
    ];

    const statsGrid = [
        { title: "Sum Transactions", value: "₦29,541,832.13" },
        { title: "Total Transactions", value: "1,181" },
        { title: "Total Active Business", value: "9" },
        { title: "Transaction Fee", value: "₦384,777.18" },
        { title: "Transaction System Fee", value: "₦234,665.57" },
        { title: "Payout Fee", value: "₦247,721.29" },
        { title: "Payout System Fee", value: "₦6,090.00" },
        { title: "Total Merchants", value: "392" },
    ];

    const chartData = [
        { name: 'Mon', volume: 4000 }, { name: 'Tue', volume: 3000 }, { name: 'Wed', volume: 5500 }, { name: 'Thu', volume: 2780 }, { name: 'Fri', volume: 6890 }, { name: 'Sat', volume: 2390 }, { name: 'Sun', volume: 3490 },
    ];

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <DashboardLayout>
            {/* 1. TOP HEADER & FILTERS */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#00823B] rounded-xl shadow-[0_0_15px_rgba(0,130,59,0.3)]">
                        <ShieldCheck size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">System Overview</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Real-time health and financial monitoring</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-[var(--card)] p-2 rounded-2xl border border-[var(--border)] shadow-sm">
                    <div className="flex bg-[var(--background)] rounded-xl p-1">
                        <button className="px-4 py-1.5 text-xs font-bold rounded-lg bg-[#00823B] text-white shadow-sm">NGN</button>
                        <button className="px-4 py-1.5 text-xs font-bold rounded-lg text-gray-500 hover:text-[#00823B]">USD</button>
                    </div>
                    <div className="h-6 w-px bg-[var(--border)] mx-1"></div>
                    <div className="flex items-center gap-2 px-2 py-1.5 bg-[var(--background)] rounded-xl border border-[var(--border)] text-xs font-bold text-[var(--foreground)]">
                        <Calendar size={14} className="text-[#00823B]" />
                        <span>03/26/26 - 03/27/26</span>
                    </div>
                    <button className="p-2 text-[#00823B] bg-[#00823B]/10 rounded-xl hover:bg-[#00823B]/20 transition-all">
                        <RefreshCw size={18} />
                    </button>
                </div>
            </div>

            {/* 2. HERO CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <HeroCard title="Total System Balance" value="₦308,321.98" icon={<Wallet className="text-white" />} color="bg-gradient-to-br from-[#005C29] to-[#00823B]" isWhiteText />
                <HeroCard title="Available Wallet" value="₦4,525,490.19" icon={<CheckCircle2 className="text-[#00823B]" />} color="bg-[var(--card)] border border-[var(--border)]" />
                <HeroCard title="Pending Settlements" value="₦139,504.84" icon={<AlertTriangle className="text-amber-500" />} color="bg-[var(--card)] border border-[var(--border)]" />
            </div>

            {/* 3. GRAPH & DENSE STATS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                <div className="lg:col-span-8 bg-[var(--card)] rounded-3xl border border-[var(--border)] p-6 shadow-sm overflow-hidden relative group">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#00823B]/10 rounded-lg"><TrendingUp size={18} className="text-[#00823B]" /></div>
                            <h2 className="font-bold text-[var(--foreground)]">Transaction Velocity</h2>
                        </div>
                        <div className="flex bg-[var(--background)] rounded-lg p-1 border border-[var(--border)]">
                            <button className="px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded-md bg-[#00823B] text-white">Live</button>
                            <button className="px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded-md text-gray-500">History</button>
                        </div>
                    </div>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="g-green" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00823B" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#00823B" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="volume" stroke="#00823B" strokeWidth={4} fill="url(#g-green)" activeDot={{ r: 8, strokeWidth: 0 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                    {statsGrid.slice(0, 8).map((stat, idx) => (
                        <div key={idx} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 flex flex-col justify-between hover:border-[#00823B]/50 transition-all">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.title}</p>
                            <p className="text-lg font-black text-[var(--foreground)] mt-2">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. TABLE */}
            <div className="bg-[var(--card)] rounded-3xl border border-[var(--border)] shadow-sm overflow-hidden">
                <div className="p-6 border-b border-[var(--border)] flex justify-between items-center bg-[var(--background)]/20">
                    <h2 className="font-bold text-[var(--foreground)] flex items-center gap-2">
                        <ArrowRightLeft size={18} className="text-[#00823B]" /> Recent Activity
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input className="pl-9 pr-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-xl text-xs focus:ring-1 focus:ring-[#00823B] outline-none" placeholder="Search logs..." />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[var(--background)]/50 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-[var(--border)]">
                        <tr>
                            <th className="px-6 py-4">Transaction ID</th>
                            <th className="px-6 py-4">Entity</th>
                            <th className="px-6 py-4">Value</th>
                            <th className="px-6 py-4">Channel</th>
                            <th className="px-6 py-4">State</th>
                            <th className="px-6 py-4">Time</th>
                            <th className="px-4 py-4"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)] bg-[var(--card)]">
                        {recentTransactions.map((trx, idx) => (
                            <tr key={idx} onClick={() => setSelectedTx(trx)} className="hover:bg-[#00823B]/5 cursor-pointer transition-colors group">
                                <td className="px-6 py-4 font-bold text-gray-500">{trx.id}</td>
                                <td className="px-6 py-4 font-black text-[var(--foreground)] group-hover:text-[#00823B]">{trx.business}</td>
                                <td className="px-6 py-4 font-black text-[var(--foreground)]">{trx.amount}</td>
                                <td className="px-6 py-4 font-medium text-gray-400">{trx.channel}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#00823B]/20 bg-[#00823B]/5 text-[#00823B] text-[10px] font-black uppercase tracking-widest">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00823B] animate-pulse shadow-[0_0_8px_#00823B]"></div> {trx.status}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs font-medium text-gray-400">{trx.date}</td>
                                <td className="px-4 py-4 text-right"><MoreHorizontal size={18} className="text-gray-300" /></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- THE BIG MODAL --- */}
            {selectedTx && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-[var(--card)] w-full max-w-2xl rounded-[32px] shadow-2xl border border-[var(--border)] overflow-hidden relative animate-in zoom-in-95 duration-300">

                        {/* Header Area */}
                        <div className="relative h-32 bg-gradient-to-r from-[#005C29] to-[#00823B] p-8 flex justify-between items-start overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                            <div className="z-10">
                                <p className="text-[#E6F3EB]/60 text-[10px] font-black uppercase tracking-[0.2em]">Detailed Record</p>
                                <h2 className="text-2xl font-black text-white mt-1">{selectedTx.amount}</h2>
                            </div>
                            <button onClick={() => setSelectedTx(null)} className="z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"><X size={20} /></button>
                        </div>

                        {/* Status Stepper */}
                        <div className="px-8 -mt-6 relative z-10 flex justify-center">
                            <div className="bg-[var(--card)] border border-[var(--border)] shadow-xl px-6 py-3 rounded-2xl flex items-center gap-6">
                                <Step icon={<Fingerprint size={16} />} label="Auth" active />
                                <div className="w-8 h-px bg-[#00823B]"></div>
                                <Step icon={<CreditCard size={16} />} label="Process" active />
                                <div className="w-8 h-px bg-[#00823B]"></div>
                                <Step icon={<CheckCircle2 size={16} />} label="Success" active />
                            </div>
                        </div>

                        {/* Modal Body: Two Columns */}
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Column 1: Financials */}
                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <History size={14} /> Financial Flow
                                </h4>
                                <div className="space-y-4">
                                    <ModalInfo label="Business Entity" value={selectedTx.business} />
                                    <ModalInfo label="Transaction Fee" value={selectedTx.fee || "0.00"} />
                                    <ModalInfo label="Settlement Channel" value={selectedTx.channel || "Auto"} />
                                    <ModalInfo label="Gateway Reference" value={selectedTx.reference || "N/A"} copyable />
                                    <ModalInfo label="Processing Bank" value={selectedTx.bank || "N/A"} />
                                </div>
                            </div>

                            {/* Column 2: Metadata */}
                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <User size={14} /> Customer Identity
                                </h4>
                                <div className="space-y-4 bg-[var(--background)]/50 p-5 rounded-2xl border border-[var(--border)]">
                                    <ModalInfo label="Full Name" value={selectedTx.customerName || "Anonymous"} />
                                    <ModalInfo label="Email Address" value={selectedTx.customerEmail || "N/A"} />
                                    <ModalInfo label="IP Location" value={selectedTx.ipAddress || "0.0.0.0"} />
                                    <ModalInfo label="Payment Method" value={selectedTx.cardType || "Standard Transfer"} />
                                </div>
                            </div>
                        </div>

                        {/* Footer / Actions */}
                        <div className="px-8 pb-8 pt-4 flex flex-wrap gap-3">
                            <button className="flex-1 flex items-center justify-center gap-2 bg-[#00823B] hover:bg-[#005C29] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#00823B]/30 transition-all active:scale-95">
                                <Printer size={18} /> Print Invoice
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-4 rounded-2xl font-bold transition-all active:scale-95">
                                <RotateCcw size={18} /> Process Refund
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );

    // --- SUB-COMPONENTS ---
    function HeroCard({ title, value, icon, color, isWhiteText = false }: { title: string, value: string, icon: any, color: string, isWhiteText?: boolean }) {
        return (
            <div className={`${color} p-6 rounded-[2.5rem] relative overflow-hidden group`}>
                <div className="flex justify-between items-start relative z-10">
                    <div>
                        <p className={`${isWhiteText ? 'text-white/60' : 'text-gray-500'} text-[10px] font-black uppercase tracking-widest`}>{title}</p>
                        <h2 className={`text-3xl font-black mt-1 ${isWhiteText ? 'text-white' : 'text-[var(--foreground)]'}`}>{value}</h2>
                    </div>
                    <div className={`p-3 rounded-2xl shadow-sm ${isWhiteText ? 'bg-white/20' : 'bg-gray-100'}`}>{icon}</div>
                </div>
            </div>
        );
    }

    function ModalInfo({ label, value, isLast = false, copyable = false }: { label: string, value: string, isLast?: boolean, copyable?: boolean }) {
        return (
            <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
                <div className="flex items-center gap-2">
                    <span className="text-[13px] font-black text-[var(--foreground)]">{value}</span>
                    {copyable && (
                        <button onClick={() => handleCopy(value)} className="text-gray-400 hover:text-[#00823B]">
                            {copied ? <Check size={12} className="text-[#00823B]" /> : <Copy size={12} />}
                        </button>
                    )}
                </div>
            </div>
        );
    }

    function Step({ icon, label, active }: { icon: any, label: string, active: boolean }) {
        return (
            <div className="flex flex-col items-center gap-1">
                <div className={`p-2 rounded-full ${active ? 'bg-[#00823B] text-white' : 'bg-gray-100 text-gray-400'}`}>{icon}</div>
                <span className={`text-[9px] font-black uppercase tracking-tighter ${active ? 'text-[#00823B]' : 'text-gray-400'}`}>{label}</span>
            </div>
        );
    }
}