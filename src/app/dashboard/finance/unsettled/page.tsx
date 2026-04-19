"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Hourglass, Search, Filter, Download, Calendar,
    MoreHorizontal, CheckCircle2, XCircle, Clock,
    Eye, X, Copy, Check, Building2, CreditCard,
    Hash, AlertTriangle, Play, PauseCircle
} from "lucide-react";

// --- TYPES ---
type UnsettledStatus = 'Pending Batch' | 'On Hold' | 'Delayed';

type UnsettledTx = {
    id: string;
    reference: string;
    business: string;
    amount: string;
    fee: string;
    netAmount: string;
    expectedSettlementDate: string;
    status: UnsettledStatus;
    transactionDate: string;
    holdReason?: string;
};

export default function UnsettledTransactionsPage() {
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTx, setSelectedTx] = useState<UnsettledTx | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    // --- MOCK DATA ---
    const unsettledRecords: UnsettledTx[] = [
        { id: "UST-10293847", reference: "REF-NIP-998273", business: "Machika Telecoms", amount: "₦450,000.00", fee: "₦4,500.00", netAmount: "₦445,500.00", expectedSettlementDate: "Tomorrow, 08:00 AM", status: 'Pending Batch', transactionDate: "Today, 10:24 AM" },
        { id: "UST-10293848", reference: "REF-CRD-112233", business: "AfriClique Logistics", amount: "₦12,500.00", fee: "₦187.50", netAmount: "₦12,312.50", expectedSettlementDate: "Tomorrow, 08:00 AM", status: 'Pending Batch', transactionDate: "Today, 09:15 AM" },
        { id: "UST-10293849", reference: "REF-OUT-445566", business: "Global Foodies", amount: "₦850,000.00", fee: "₦8,500.00", netAmount: "₦841,500.00", expectedSettlementDate: "Paused", status: 'On Hold', transactionDate: "Yesterday, 08:30 AM", holdReason: "High-value transaction flagged by anti-fraud engine. Requires manual clearance." },
        { id: "UST-10293850", reference: "REF-BIL-778899", business: "Green Energy Ltd", amount: "₦54,000.00", fee: "₦540.00", netAmount: "₦53,460.00", expectedSettlementDate: "T+2 Days", status: 'Delayed', transactionDate: "Yesterday, 18:45 PM", holdReason: "Gateway settlement delay." },
        { id: "UST-10293851", reference: "REF-NIP-223344", business: "Isakharu Tech", amount: "₦1,200,000.00", fee: "₦12,000.00", netAmount: "₦1,188,000.00", expectedSettlementDate: "Tomorrow, 08:00 AM", status: 'Pending Batch', transactionDate: "Today, 14:20 PM" },
        { id: "UST-10293852", reference: "REF-CRD-556677", business: "Acme Retail", amount: "₦340,000.00", fee: "₦3,400.00", netAmount: "₦336,600.00", expectedSettlementDate: "Paused", status: 'On Hold', transactionDate: "Apr 02, 2026", holdReason: "Merchant KYC verification incomplete." },
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
                    <div className="p-2.5 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-lg shadow-orange-500/20">
                        <Hourglass size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Unsettled Transactions</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Monitor funds in transit waiting to be swept into merchant payouts</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-600 hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-all shadow-sm">
                        <Calendar size={14} className="text-orange-500" /> Next Batch
                    </button>
                    <button className="flex items-center gap-2 bg-[#1F2937] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg hover:bg-gray-800 transition-all">
                        <Download size={14} /> Export Unsettled
                    </button>
                </div>
            </div>

            {/* 2. KPI METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard label="Total Unsettled Volume" value="₦2,906,500" subValue="Across 1,402 transactions" color="text-[var(--foreground)]" />
                <StatCard label="Ready for Next Batch" value="₦1,716,500" subValue="Sweeping tomorrow 08:00 AM" color="text-[#00823B]" />
                <StatCard label="Funds On Hold" value="₦1,190,000" subValue="Manual review required" color="text-orange-500" isAlert />
                <StatCard label="Average Aging" value="1.2 Days" subValue="From transaction to payout" color="text-gray-500" />
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
                                placeholder="Search by Transaction ID, Business, or Amount..."
                                className="w-full pl-12 pr-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-[var(--foreground)]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-black transition-all border ${
                                showFilters
                                    ? "bg-orange-500/10 text-orange-600 border-orange-500/30"
                                    : "bg-[var(--card)] text-gray-500 border-[var(--border)] hover:text-[var(--foreground)]"
                            }`}
                        >
                            <Filter size={16} /> Advanced Filters
                        </button>
                    </div>

                    {/* Expandable Advanced Filters */}
                    <div className={`grid transition-all duration-300 ease-in-out ${showFilters ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-5 bg-[var(--background)] rounded-2xl border border-[var(--border)]">
                                <FilterSelect label="Status" options={["All Statuses", "Pending Batch", "On Hold", "Delayed"]} />
                                <div className="flex flex-col gap-1.5 lg:col-span-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Business Name</label>
                                    <input type="text" placeholder="e.g. Global Foodies" className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-orange-500 transition-all" />
                                </div>
                                <FilterDate label="Transaction Date From" />
                                <FilterDate label="Transaction Date To" />
                                <div className="flex items-end lg:col-span-5">
                                    <button className="w-full md:w-auto px-8 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-black hover:bg-orange-700 transition-all shadow-md shadow-orange-500/20">Apply Filters</button>
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
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Transaction Ref</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Merchant</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Values (Gross / Net)</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Expected Payout</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Status</th>
                            <th className="px-6 py-5"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {unsettledRecords.map((tx) => (
                            <tr key={tx.id} className="hover:bg-orange-500/5 transition-colors group cursor-pointer" onClick={() => setSelectedTx(tx)}>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[14px] group-hover:text-orange-500 transition-colors">{tx.id}</span>
                                        <span className="text-[11px] font-bold text-gray-500 font-mono tracking-tight">{tx.reference}</span>
                                        <span className="text-[10px] font-bold text-gray-400 mt-1">{tx.transactionDate}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                        <span className="flex items-center gap-1.5 font-black text-[var(--foreground)] text-[13px]">
                                            <Building2 size={12} className="text-gray-400" /> {tx.business}
                                        </span>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[15px]">{tx.netAmount}</span>
                                        <span className="text-[10px] font-bold text-gray-500">Gross: {tx.amount}</span>
                                        <span className="text-[10px] font-bold text-red-500/80 tracking-widest">- {tx.fee} (Fee)</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1 items-start">
                                            <span className="px-2.5 py-1 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] text-[10px] font-black uppercase tracking-widest rounded-md">
                                                {tx.expectedSettlementDate}
                                            </span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <StatusBadge status={tx.status} />
                                </td>

                                <td className="px-6 py-5 text-right">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedTx(tx); }}
                                        className="p-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-gray-400 hover:text-orange-500 hover:border-orange-500/30 shadow-sm transition-all"
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

            {/* 4. DETAILS MODAL */}
            {selectedTx && (
                <div className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--card)] w-full max-w-lg h-full rounded-[2rem] border border-[var(--border)] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[var(--border)] shrink-0 bg-[var(--background)]/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-500/10 rounded-xl text-orange-500">
                                    <Hourglass size={18} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-[var(--foreground)] tracking-tight">Unsettled Details</h2>
                                    <p className="text-xs font-bold text-gray-500">{selectedTx.transactionDate}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedTx(null)} className="p-2 text-gray-400 hover:text-[var(--foreground)] hover:bg-[var(--card)] rounded-full transition-all border border-transparent hover:border-[var(--border)]">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">

                            {/* Hero Amount */}
                            <div className="flex flex-col items-center justify-center mb-8">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Net Payable Amount</p>
                                <h2 className="text-4xl font-black text-[var(--foreground)] tracking-tight mb-4">{selectedTx.netAmount}</h2>
                                <StatusBadge status={selectedTx.status} />
                            </div>

                            {/* Hold Reason (if applicable) */}
                            {selectedTx.status === 'On Hold' && selectedTx.holdReason && (
                                <div className="mb-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl flex items-start gap-3">
                                    <AlertTriangle size={16} className="text-orange-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-[11px] font-black text-orange-600 uppercase tracking-widest mb-1">Administrative Hold</h4>
                                        <p className="text-xs font-bold text-orange-600/80 leading-relaxed">{selectedTx.holdReason}</p>
                                    </div>
                                </div>
                            )}

                            <hr className="border-[var(--border)]/50 mb-8" />

                            {/* Details List */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 flex items-center gap-2">
                                    <CreditCard size={14}/> Financial Breakdown
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Gross Transaction" value={selectedTx.amount} />
                                    <ModalRow label="Platform Fee" value={selectedTx.fee} isAlert />
                                    <ModalRow label="Expected Payout Date" value={selectedTx.expectedSettlementDate} isLast />
                                </div>

                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 mt-8 flex items-center gap-2">
                                    <Building2 size={14}/> Merchant Info
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Business Name" value={selectedTx.business} />
                                </div>

                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 mt-8 flex items-center gap-2">
                                    <Hash size={14}/> Identifiers
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Record ID" value={selectedTx.id} copyable onCopy={() => handleCopy(selectedTx.id, 'id')} copied={copied === 'id'} />
                                    <ModalRow label="System Ref" value={selectedTx.reference} copyable onCopy={() => handleCopy(selectedTx.reference, 'ref')} copied={copied === 'ref'} isLast />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-[var(--border)] shrink-0 flex gap-3 bg-[var(--background)]/50">
                            {selectedTx.status === 'On Hold' ? (
                                <>
                                    <button className="flex-1 py-3 border border-[var(--border)] bg-[var(--card)] hover:bg-gray-50 dark:hover:bg-gray-800 text-[var(--foreground)] text-xs font-black rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
                                        <XCircle size={14} /> Reverse Funds
                                    </button>
                                    <button className="flex-1 py-3 bg-[#00823B] text-white text-xs font-black rounded-xl hover:bg-[#005C29] transition-all shadow-lg shadow-[#00823B]/20 flex items-center justify-center gap-2">
                                        <Play size={14} /> Release Hold
                                    </button>
                                </>
                            ) : (
                                <button className="w-full py-3 bg-orange-500 text-white text-xs font-black rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2">
                                    <PauseCircle size={14} /> Place on Hold
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </DashboardLayout>
    );

    // --- REUSABLE COMPONENTS ---
    function StatCard({ label, value, subValue, color = "text-[var(--foreground)]", isAlert = false }: any) {
        return (
            <div className={`bg-[var(--card)] p-6 rounded-[2rem] border shadow-sm transition-colors ${
                isAlert ? "border-orange-500/30 bg-orange-500/5 hover:border-orange-500/50" : "border-[var(--border)] hover:border-orange-500/30"
            }`}>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{label}</p>
                <h3 className={`text-2xl font-black tracking-tight mb-1 ${color}`}>{value}</h3>
                <p className={`text-[11px] font-bold ${isAlert ? "text-orange-500" : "text-gray-500"}`}>{subValue}</p>
            </div>
        );
    }

    function FilterSelect({ label, options }: { label: string, options: string[] }) {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
                <select className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-orange-500 transition-all appearance-none cursor-pointer">
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
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-orange-500 transition-all dark:[color-scheme:dark]"
                />
            </div>
        );
    }

    function StatusBadge({ status }: { status: UnsettledTx['status'] }) {
        const config = {
            'Pending Batch': { bg: 'bg-[#00823B]/10', text: 'text-[#00823B]', border: 'border-[#00823B]/20', icon: <Clock size={12}/> },
            'On Hold': { bg: 'bg-orange-500/10', text: 'text-orange-600', border: 'border-orange-500/20', icon: <PauseCircle size={12}/> },
            'Delayed': { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/20', icon: <AlertTriangle size={12}/> },
        }[status];

        return (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${config.bg} ${config.text} ${config.border} border text-[10px] font-black uppercase tracking-widest`}>
                {config.icon}
                {status}
            </div>
        );
    }

    function ModalRow({ label, value, copyable = false, onCopy, copied, isLast = false, isAlert = false }: any) {
        return (
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 ${!isLast ? "border-b border-[var(--border)]/50" : ""}`}>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 sm:mb-0">{label}</span>
                <div className="flex items-center gap-2">
                    <span className={`text-[13px] font-black ${isAlert ? 'text-red-500' : 'text-[var(--foreground)]'}`}>{value}</span>
                    {copyable && (
                        <button onClick={onCopy} className="text-gray-400 hover:text-orange-500 transition-colors">
                            {copied ? <Check size={14} className="text-orange-500" /> : <Copy size={14} />}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}