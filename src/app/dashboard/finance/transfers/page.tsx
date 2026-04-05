"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    ArrowRightLeft, Search, Filter, Download, Calendar,
    MoreHorizontal, CheckCircle2, XCircle, Clock,
    Eye, X, Copy, Check, Building2, Landmark, User,
    RefreshCw, AlertTriangle, ShieldCheck
} from "lucide-react";

// --- TYPES ---
type Transfer = {
    id: string;
    reference: string;
    sessionId?: string;
    business: string;
    amount: string;
    fee: string;
    recipientName: string;
    recipientBank: string;
    recipientAccount: string;
    status: 'Successful' | 'Processing' | 'Failed' | 'Reversed';
    date: string;
    errorReason?: string;
};

export default function TransfersPage() {
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    // --- MOCK DATA ---
    const transfers: Transfer[] = [
        { id: "TRF-00918273", reference: "OUT-NIP-99812", sessionId: "090111260329102455129938271", business: "Machika Telecoms", amount: "₦1,250,000.00", fee: "₦50.00", recipientName: "Yusuf Tasiu", recipientBank: "UBA", recipientAccount: "2093817263", status: 'Successful', date: "Today, 10:24 AM" },
        { id: "TRF-00918274", reference: "OUT-PRV-11223", business: "Spayz Logistics", amount: "₦45,000.00", fee: "₦25.00", recipientName: "Sarah Jenkins", recipientBank: "PROVIDUS", recipientAccount: "9902837461", status: 'Processing', date: "Today, 09:15 AM" },
        { id: "TRF-00918275", reference: "OUT-VFD-44556", sessionId: "090111260329083011992837462", business: "Global Foodies", amount: "₦85,000.00", fee: "₦50.00", recipientName: "Michael Okonkwo", recipientBank: "VFD MFB", recipientAccount: "1002938475", status: 'Successful', date: "Today, 08:30 AM" },
        { id: "TRF-00918276", reference: "OUT-NIP-77889", business: "Green Energy Ltd", amount: "₦540,000.00", fee: "₦50.00", recipientName: "Oluwaseun Adeyemi", recipientBank: "GTBANK", recipientAccount: "0123948576", status: 'Failed', date: "Yesterday, 18:45 PM", errorReason: "Beneficiary account inactive or dormant." },
        { id: "TRF-00918277", reference: "OUT-SAF-22334", sessionId: "090111260328142055992837464", business: "Isakharu Tech", amount: "₦2,500,000.00", fee: "₦50.00", recipientName: "Isakharu Technologies", recipientBank: "SAFEHAVEN", recipientAccount: "9002837465", status: 'Successful', date: "Yesterday, 14:20 PM" },
        { id: "TRF-00918278", reference: "OUT-NIP-55667", sessionId: "090111260328111055992837465", business: "Acme Retail", amount: "₦120,000.00", fee: "₦50.00", recipientName: "Aisha Bello", recipientBank: "ZENITH", recipientAccount: "2110938475", status: 'Reversed', date: "Yesterday, 11:10 AM", errorReason: "Timeout waiting for core banking response. Auto-reversed." },
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
                    <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/20">
                        <ArrowRightLeft size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Outbound Transfers</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Monitor and manage money moving out to external bank accounts</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-600 hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-all shadow-sm">
                        <Calendar size={14} className="text-blue-500" /> Today
                    </button>
                    <button className="flex items-center gap-2 bg-[#1F2937] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg hover:bg-gray-800 transition-all">
                        <Download size={14} /> Export List
                    </button>
                </div>
            </div>

            {/* 2. KPI METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard label="Total Outbound (Today)" value="₦14,250,000" subValue="842 transfers" />
                <StatCard label="Successful" value="₦13,800,000" subValue="96.8% success rate" color="text-[#00823B]" />
                <StatCard label="Processing" value="₦350,000" subValue="Waiting on NIBSS" color="text-amber-500" />
                <StatCard label="Failed / Reversed" value="₦100,000" subValue="12 transfers affected" color="text-red-500" />
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
                                placeholder="Search by Transfer ID, Session ID, or Account Number..."
                                className="w-full pl-12 pr-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[var(--foreground)]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-black transition-all border ${
                                showFilters
                                    ? "bg-blue-500/10 text-blue-600 border-blue-500/30"
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
                                <FilterSelect label="Status" options={["All Statuses", "Successful", "Processing", "Failed", "Reversed"]} />
                                <FilterSelect label="Provider" options={["All Providers", "NIBSS", "PROVIDUS", "VFD", "SAFEHAVEN"]} />
                                <div className="flex flex-col gap-1.5 lg:col-span-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Destination Bank</label>
                                    <input type="text" placeholder="e.g. GTBank" className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-blue-500 transition-all" />
                                </div>
                                <div className="flex items-end">
                                    <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20">Apply Filters</button>
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
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Transfer Details</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Sender (Business)</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Destination Bank</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Value & Fee</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Status</th>
                            <th className="px-6 py-5"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {transfers.map((trf) => (
                            <tr key={trf.id} className="hover:bg-blue-500/5 transition-colors group cursor-pointer" onClick={() => setSelectedTransfer(trf)}>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[14px] group-hover:text-blue-500 transition-colors">{trf.id}</span>
                                        <span className="text-[11px] font-bold text-gray-500 font-mono tracking-tight">{trf.reference}</span>
                                        <span className="text-[10px] font-bold text-gray-400 mt-1">{trf.date}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                        <span className="flex items-center gap-1.5 font-black text-[var(--foreground)] text-[13px]">
                                            <Building2 size={12} className="text-gray-400" /> {trf.business}
                                        </span>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1 items-start">
                                            <span className="px-2.5 py-1 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] text-[10px] font-black uppercase tracking-widest rounded-md">
                                                {trf.recipientBank}
                                            </span>
                                        <span className="text-[12px] font-black text-[var(--foreground)] mt-0.5">{trf.recipientAccount}</span>
                                        <span className="text-[10px] font-bold text-gray-500">{trf.recipientName}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[15px]">{trf.amount}</span>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fee: {trf.fee}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <StatusBadge status={trf.status} />
                                </td>

                                <td className="px-6 py-5 text-right">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedTransfer(trf); }}
                                        className="p-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-gray-400 hover:text-blue-500 hover:border-blue-500/30 shadow-sm transition-all"
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

            {/* 4. TRANSFER DETAILS MODAL */}
            {selectedTransfer && (
                <div className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--card)] w-full max-w-lg h-full rounded-[2rem] border border-[var(--border)] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[var(--border)] shrink-0 bg-[var(--background)]/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
                                    <ArrowRightLeft size={18} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-[var(--foreground)] tracking-tight">Transfer Details</h2>
                                    <p className="text-xs font-bold text-gray-500">{selectedTransfer.date}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedTransfer(null)} className="p-2 text-gray-400 hover:text-[var(--foreground)] hover:bg-[var(--card)] rounded-full transition-all border border-transparent hover:border-[var(--border)]">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">

                            {/* Hero Amount */}
                            <div className="flex flex-col items-center justify-center mb-10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Transfer Amount</p>
                                <h2 className="text-4xl font-black text-[var(--foreground)] tracking-tight mb-4">{selectedTransfer.amount}</h2>
                                <StatusBadge status={selectedTransfer.status} />
                            </div>

                            {/* Error Reason (if failed) */}
                            {(selectedTransfer.status === 'Failed' || selectedTransfer.status === 'Reversed') && selectedTransfer.errorReason && (
                                <div className="mb-8 p-4 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-start gap-3">
                                    <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-[11px] font-black text-red-600 uppercase tracking-widest mb-1">Failure Reason</h4>
                                        <p className="text-xs font-bold text-red-500/80 leading-relaxed">{selectedTransfer.errorReason}</p>
                                    </div>
                                </div>
                            )}

                            <hr className="border-[var(--border)]/50 mb-8" />

                            {/* Details List */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 flex items-center gap-2">
                                    <Landmark size={14}/> Destination
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Bank Name" value={selectedTransfer.recipientBank} />
                                    <ModalRow label="Account Number" value={selectedTransfer.recipientAccount} copyable onCopy={() => handleCopy(selectedTransfer.recipientAccount, 'acc')} copied={copied === 'acc'} />
                                    <ModalRow label="Account Name" value={selectedTransfer.recipientName} isLast />
                                </div>

                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 mt-8 flex items-center gap-2">
                                    <ShieldCheck size={14}/> Identifiers
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Transfer ID" value={selectedTransfer.id} copyable onCopy={() => handleCopy(selectedTransfer.id, 'id')} copied={copied === 'id'} />
                                    <ModalRow label="System Ref" value={selectedTransfer.reference} />
                                    <ModalRow label="Session ID" value={selectedTransfer.sessionId || "Pending..."} copyable={!!selectedTransfer.sessionId} onCopy={() => selectedTransfer.sessionId && handleCopy(selectedTransfer.sessionId, 'session')} copied={copied === 'session'} isLast />
                                </div>

                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 mt-8 flex items-center gap-2">
                                    <Building2 size={14}/> Source
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Merchant Business" value={selectedTransfer.business} />
                                    <ModalRow label="Processing Fee" value={selectedTransfer.fee} isLast />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-[var(--border)] shrink-0 flex gap-3 bg-[var(--background)]/50">
                            {(selectedTransfer.status === 'Failed' || selectedTransfer.status === 'Reversed') ? (
                                <button className="flex-1 py-3 bg-[#1F2937] text-white text-xs font-black rounded-xl hover:bg-gray-800 transition-all shadow-md flex items-center justify-center gap-2">
                                    <RefreshCw size={14} /> Re-query Status
                                </button>
                            ) : (
                                <button className="flex-1 py-3 border border-[var(--border)] bg-[var(--card)] hover:bg-gray-50 dark:hover:bg-gray-800 text-[var(--foreground)] text-xs font-black rounded-xl transition-all shadow-sm">
                                    Download Receipt
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
            <div className="bg-[var(--card)] p-6 rounded-[2rem] border border-[var(--border)] shadow-sm hover:border-blue-500/30 transition-colors">
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
                <select className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer">
                    {options.map(opt => <option key={opt}>{opt}</option>)}
                </select>
            </div>
        );
    }

    function StatusBadge({ status }: { status: Transfer['status'] }) {
        const config = {
            'Successful': { bg: 'bg-[#00823B]/10', text: 'text-[#00823B]', border: 'border-[#00823B]/20', icon: <CheckCircle2 size={12}/> },
            'Processing': { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/20', icon: <Clock size={12}/> },
            'Failed': { bg: 'bg-red-500/10', text: 'text-red-600', border: 'border-red-500/20', icon: <XCircle size={12}/> },
            'Reversed': { bg: 'bg-gray-500/10', text: 'text-gray-500', border: 'border-gray-500/20', icon: <ArrowRightLeft size={12}/> },
        }[status];

        return (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${config.bg} ${config.text} ${config.border} border text-[10px] font-black uppercase tracking-widest`}>
                {status === 'Successful' ? <div className="w-1.5 h-1.5 rounded-full bg-[#00823B] animate-pulse"></div> : config.icon}
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
                        <button onClick={onCopy} className="text-gray-400 hover:text-blue-500 transition-colors">
                            {copied ? <Check size={14} className="text-blue-500" /> : <Copy size={14} />}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}