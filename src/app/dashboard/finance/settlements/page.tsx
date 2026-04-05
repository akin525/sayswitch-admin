"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Landmark, Search, Filter, Download, Calendar,
    CheckCircle2, XCircle, Clock, Eye, X, Copy, Check,
    Building2, CreditCard, Hash, FileText, RefreshCw, AlertTriangle
} from "lucide-react";

// --- TYPES ---
type Settlement = {
    id: string;
    batchId: string;
    business: string;
    grossAmount: string;
    fees: string;
    netAmount: string;
    destinationBank: string;
    destinationAccount: string;
    status: 'Processed' | 'Pending' | 'Failed';
    date: string;
    transactionCount: number;
    errorLog?: string;
};

export default function SettlementsPage() {
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSettle, setSelectedSettle] = useState<Settlement | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    // --- MOCK DATA ---
    const settlements: Settlement[] = [
        { id: "STL-9928371", batchId: "BAT-1029A", business: "Machika Telecoms", grossAmount: "₦4,525,490.00", fees: "₦25,490.00", netAmount: "₦4,500,000.00", destinationBank: "UBA", destinationAccount: "2093817263", status: 'Processed', date: "Today, 08:00 AM", transactionCount: 142 },
        { id: "STL-9928372", batchId: "BAT-1029A", business: "Spayz Logistics", grossAmount: "₦1,250,000.00", fees: "₦12,500.00", netAmount: "₦1,237,500.00", destinationBank: "PROVIDUS", destinationAccount: "9902837461", status: 'Pending', date: "Today, 08:00 AM", transactionCount: 89 },
        { id: "STL-9928373", batchId: "BAT-1028C", business: "Global Foodies", grossAmount: "₦85,000.00", fees: "₦850.00", netAmount: "₦84,150.00", destinationBank: "VFD MFB", destinationAccount: "1002938475", status: 'Processed', date: "Yesterday, 08:00 AM", transactionCount: 12 },
        { id: "STL-9928374", batchId: "BAT-1028C", business: "Green Energy Ltd", grossAmount: "₦540,000.00", fees: "₦5,400.00", netAmount: "₦534,600.00", destinationBank: "GTBANK", destinationAccount: "0123948576", status: 'Failed', date: "Yesterday, 08:00 AM", transactionCount: 45, errorLog: "Account name mismatch. Settlement reversed to merchant wallet." },
        { id: "STL-9928375", batchId: "BAT-1027D", business: "Isakharu Tech", grossAmount: "₦2,500,000.00", fees: "₦25,000.00", netAmount: "₦2,475,000.00", destinationBank: "SAFEHAVEN", destinationAccount: "9002837465", status: 'Processed', date: "Mar 26, 2026", transactionCount: 210 },
        { id: "STL-9928376", batchId: "BAT-1027D", business: "Acme Retail", grossAmount: "₦120,000.00", fees: "₦1,200.00", netAmount: "₦118,800.00", destinationBank: "ZENITH", destinationAccount: "2110938475", status: 'Processed', date: "Mar 26, 2026", transactionCount: 34 },
    ];

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <DashboardLayout>
            {/* 1. PAGE HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg shadow-indigo-500/20">
                        <Landmark size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Merchant Settlements</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Monitor batch payouts and merchant account crediting</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-600 hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-all shadow-sm">
                        <Calendar size={14} className="text-indigo-500" /> Last 7 Days
                    </button>
                    <button className="flex items-center gap-2 bg-[#1F2937] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg hover:bg-gray-800 transition-all">
                        <Download size={14} /> Export Report
                    </button>
                </div>
            </div>

            {/* 2. KPI METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard label="Total Settled (Today)" value="₦18,450,000" subValue="24 Merchants" color="text-indigo-500" />
                <StatCard label="Pending Settlement" value="₦2,150,000" subValue="Processing queue" color="text-amber-500" />
                <StatCard label="Failed Settlements" value="₦540,000" subValue="1 Merchant affected" color="text-red-500" />
                <StatCard label="Next Batch Cycle" value="08:00 AM" subValue="Tomorrow" color="text-[var(--foreground)]" />
            </div>

            {/* 3. CONTROL PANEL & TABLE */}
            <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] shadow-sm overflow-hidden flex flex-col">

                {/* Top Controls */}
                <div className="p-6 border-b border-[var(--border)] bg-[var(--background)]/30">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by Settlement ID, Batch, or Business..."
                                className="w-full pl-12 pr-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-[var(--foreground)]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-black transition-all border ${
                                showFilters
                                    ? "bg-indigo-500/10 text-indigo-600 border-indigo-500/30"
                                    : "bg-[var(--card)] text-gray-500 border-[var(--border)] hover:text-[var(--foreground)]"
                            }`}
                        >
                            <Filter size={16} /> Advanced Filters
                        </button>
                    </div>

                    {/* Expandable Advanced Filters */}
                    <div className={`grid transition-all duration-300 ease-in-out ${showFilters ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-5 bg-[var(--background)] rounded-2xl border border-[var(--border)]">
                                <FilterSelect label="Status" options={["All Statuses", "Processed", "Pending", "Failed"]} />
                                <FilterSelect label="Business" options={["All Merchants", "Machika Telecoms", "Spayz Logistics"]} />
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Batch ID</label>
                                    <input type="text" placeholder="e.g. BAT-1029A" className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-indigo-500 transition-all" />
                                </div>
                                <FilterDate label="From Date" />
                                <FilterDate label="To Date" />
                                <div className="flex items-end lg:col-span-5">
                                    <button className="w-full md:w-auto px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20">Apply Filters</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[var(--background)]/40 border-b border-[var(--border)]">
                        <tr>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Settlement Ref</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Business</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Value Breakdown</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Destination Bank</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Status</th>
                            <th className="px-6 py-5"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {settlements.map((stl) => (
                            <tr key={stl.id} className="hover:bg-indigo-500/5 transition-colors group cursor-pointer" onClick={() => setSelectedSettle(stl)}>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[14px] group-hover:text-indigo-500 transition-colors">{stl.id}</span>
                                        <span className="text-[11px] font-bold text-gray-500 font-mono tracking-tight">{stl.batchId}</span>
                                        <span className="text-[10px] font-bold text-gray-400 mt-1">{stl.date}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1.5">
                                            <span className="flex items-center gap-1.5 font-black text-[var(--foreground)] text-[13px]">
                                                <Building2 size={12} className="text-gray-400" /> {stl.business}
                                            </span>
                                        <span className="text-[10px] font-bold text-gray-500 bg-[var(--background)] border border-[var(--border)] px-2 py-0.5 rounded w-fit">
                                                {stl.transactionCount} txns
                                            </span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[15px]">{stl.netAmount}</span>
                                        <span className="text-[10px] font-bold text-gray-500">Gross: {stl.grossAmount}</span>
                                        <span className="text-[10px] font-bold text-red-500/80 tracking-widest">- {stl.fees} (Fees)</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1 items-start">
                                            <span className="px-2.5 py-1 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] text-[10px] font-black uppercase tracking-widest rounded-md">
                                                {stl.destinationBank}
                                            </span>
                                        <span className="text-[12px] font-black text-[var(--foreground)] mt-0.5">{stl.destinationAccount}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <StatusBadge status={stl.status} />
                                </td>

                                <td className="px-6 py-5 text-right">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedSettle(stl); }}
                                        className="p-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-gray-400 hover:text-indigo-500 hover:border-indigo-500/30 shadow-sm transition-all"
                                    >
                                        <Eye size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 4. SETTLEMENT DETAILS MODAL */}
            {selectedSettle && (
                <div className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--card)] w-full max-w-lg h-full rounded-[2rem] border border-[var(--border)] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[var(--border)] shrink-0 bg-[var(--background)]/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
                                    <Landmark size={18} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-[var(--foreground)] tracking-tight">Settlement Report</h2>
                                    <p className="text-xs font-bold text-gray-500">{selectedSettle.date}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedSettle(null)} className="p-2 text-gray-400 hover:text-[var(--foreground)] hover:bg-[var(--card)] rounded-full transition-all border border-transparent hover:border-[var(--border)]">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">

                            {/* Hero Amount */}
                            <div className="flex flex-col items-center justify-center mb-8">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Net Settled Amount</p>
                                <h2 className="text-4xl font-black text-[var(--foreground)] tracking-tight mb-4">{selectedSettle.netAmount}</h2>
                                <StatusBadge status={selectedSettle.status} />
                            </div>

                            {/* Breakdown Card */}
                            <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-5 mb-8 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-bold text-gray-500">Gross Volume</span>
                                    <span className="text-[13px] font-black text-[var(--foreground)]">{selectedSettle.grossAmount}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-bold text-gray-500">Platform Fees Deducted</span>
                                    <span className="text-[13px] font-black text-red-500">- {selectedSettle.fees}</span>
                                </div>
                                <div className="pt-3 border-t border-[var(--border)] flex justify-between items-center">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-indigo-500">Total Payout</span>
                                    <span className="text-[15px] font-black text-[var(--foreground)]">{selectedSettle.netAmount}</span>
                                </div>
                            </div>

                            {/* Error Reason (if failed) */}
                            {selectedSettle.status === 'Failed' && selectedSettle.errorLog && (
                                <div className="mb-8 p-4 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-start gap-3">
                                    <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-[11px] font-black text-red-600 uppercase tracking-widest mb-1">Settlement Failure</h4>
                                        <p className="text-xs font-bold text-red-500/80 leading-relaxed">{selectedSettle.errorLog}</p>
                                    </div>
                                </div>
                            )}

                            {/* Details List */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 flex items-center gap-2">
                                    <Landmark size={14}/> Destination Bank Account
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Bank Name" value={selectedSettle.destinationBank} />
                                    <ModalRow label="Account Number" value={selectedSettle.destinationAccount} copyable onCopy={() => handleCopy(selectedSettle.destinationAccount, 'acc')} copied={copied === 'acc'} isLast />
                                </div>

                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 mt-8 flex items-center gap-2">
                                    <Hash size={14}/> Identifiers
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Settlement ID" value={selectedSettle.id} copyable onCopy={() => handleCopy(selectedSettle.id, 'id')} copied={copied === 'id'} />
                                    <ModalRow label="Batch Ref" value={selectedSettle.batchId} />
                                    <ModalRow label="Total Transactions" value={`${selectedSettle.transactionCount} txns`} isLast />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-[var(--border)] shrink-0 flex gap-3 bg-[var(--background)]/50">
                            {selectedSettle.status === 'Failed' ? (
                                <button className="flex-1 py-3 bg-[#1F2937] text-white text-xs font-black rounded-xl hover:bg-gray-800 transition-all shadow-md flex items-center justify-center gap-2">
                                    <RefreshCw size={14} /> Retry Settlement
                                </button>
                            ) : (
                                <button className="flex-1 py-3 border border-[var(--border)] bg-[var(--card)] hover:bg-gray-50 dark:hover:bg-gray-800 text-[var(--foreground)] text-xs font-black rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
                                    <FileText size={14} /> Download Remittance
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </DashboardLayout>
    );

    // --- REUSABLE COMPONENTS ---
    function StatCard({ label, value, subValue, color = "text-[var(--foreground)]" }: any) {
        return (
            <div className="bg-[var(--card)] p-6 rounded-[2rem] border border-[var(--border)] shadow-sm hover:border-indigo-500/30 transition-colors">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{label}</p>
                <h3 className={`text-2xl font-black tracking-tight mb-1 ${color}`}>{value}</h3>
                <p className="text-[11px] font-bold text-gray-500">{subValue}</p>
            </div>
        );
    }

    function FilterSelect({ label, options }: { label: string, options: string[] }) {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
                <select className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer">
                    {options.map(opt => <option key={opt}>{opt}</option>)}
                </select>
            </div>
        );
    }

    function FilterDate({ label }: { label: string }) {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
                <input
                    type="date"
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-indigo-500 transition-all dark:[color-scheme:dark]"
                />
            </div>
        );
    }

    function StatusBadge({ status }: { status: Settlement['status'] }) {
        const config = {
            'Processed': { bg: 'bg-[#00823B]/10', text: 'text-[#00823B]', border: 'border-[#00823B]/20', icon: <CheckCircle2 size={12}/> },
            'Pending': { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/20', icon: <Clock size={12}/> },
            'Failed': { bg: 'bg-red-500/10', text: 'text-red-600', border: 'border-red-500/20', icon: <XCircle size={12}/> },
        }[status];

        return (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${config.bg} ${config.text} ${config.border} border text-[10px] font-black uppercase tracking-widest`}>
                {status === 'Processed' ? <div className="w-1.5 h-1.5 rounded-full bg-[#00823B] animate-pulse"></div> : config.icon}
                {status}
            </div>
        );
    }

    function ModalRow({ label, value, copyable = false, onCopy, copied, isLast = false }: any) {
        return (
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 ${!isLast ? "border-b border-[var(--border)]/50" : ""}`}>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 sm:mb-0">{label}</span>
                <div className="flex items-center gap-2">
                    <span className="text-[13px] font-black text-[var(--foreground)]">{value}</span>
                    {copyable && (
                        <button onClick={onCopy} className="text-gray-400 hover:text-indigo-500 transition-colors">
                            {copied ? <Check size={14} className="text-indigo-500" /> : <Copy size={14} />}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}