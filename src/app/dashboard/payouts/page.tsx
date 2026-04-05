"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    CreditCard, Search, Filter, Download, Calendar,
    CheckCircle2, XCircle, Clock, Eye, X, Copy, Check,
    Building2, Landmark, ShieldCheck, ArrowUpRight,
    User, CheckCircle, XOctagon, Loader2
} from "lucide-react";

// --- TYPES ---
type PayoutStatus = 'Processed' | 'Pending Approval' | 'Processing' | 'Failed' | 'Rejected';

type Payout = {
    id: string;
    reference: string;
    business: string;
    amount: string;
    fee: string;
    totalDeduction: string;
    destinationBank: string;
    destinationAccount: string;
    accountName: string;
    status: PayoutStatus;
    requestedAt: string;
    processedAt?: string;
    riskScore: 'Low' | 'Medium' | 'High';
};

export default function PayoutsPage() {
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    // --- MOCK DATA ---
    const payouts: Payout[] = [
        { id: "PAY-09182736", reference: "POUT-9912A", business: "Machika Telecoms", amount: "₦2,500,000.00", fee: "₦50.00", totalDeduction: "₦2,500,050.00", destinationBank: "UBA", destinationAccount: "2093817263", accountName: "Yusuf Tasiu Machika", status: 'Pending Approval', requestedAt: "Today, 10:24 AM", riskScore: 'Low' },
        { id: "PAY-09182737", reference: "POUT-9912B", business: "Spayz Logistics", amount: "₦450,000.00", fee: "₦25.00", totalDeduction: "₦450,025.00", destinationBank: "PROVIDUS", destinationAccount: "9902837461", accountName: "Spayz Logistics Ltd", status: 'Processed', requestedAt: "Today, 09:15 AM", processedAt: "Today, 09:18 AM", riskScore: 'Low' },
        { id: "PAY-09182738", reference: "POUT-9912C", business: "Global Foodies", amount: "₦12,500,000.00", fee: "₦50.00", totalDeduction: "₦12,500,050.00", destinationBank: "VFD MFB", destinationAccount: "1002938475", accountName: "Global Foodies Inc", status: 'Pending Approval', requestedAt: "Today, 08:30 AM", riskScore: 'High' },
        { id: "PAY-09182739", reference: "POUT-9912D", business: "Green Energy Ltd", amount: "₦85,000.00", fee: "₦50.00", totalDeduction: "₦85,050.00", destinationBank: "GTBANK", destinationAccount: "0123948576", accountName: "Green Energy", status: 'Failed', requestedAt: "Yesterday, 18:45 PM", riskScore: 'Low' },
        { id: "PAY-09182740", reference: "POUT-9912E", business: "Isakharu Tech", amount: "₦540,000.00", fee: "₦50.00", totalDeduction: "₦540,050.00", destinationBank: "SAFEHAVEN", destinationAccount: "9002837465", accountName: "Isakharu Technologies", status: 'Processing', requestedAt: "Yesterday, 14:20 PM", riskScore: 'Medium' },
        { id: "PAY-09182741", reference: "POUT-9912F", business: "Acme Retail", amount: "₦120,000.00", fee: "₦50.00", totalDeduction: "₦120,050.00", destinationBank: "ZENITH", destinationAccount: "2110938475", accountName: "Acme Retail Store", status: 'Rejected', requestedAt: "Yesterday, 11:10 AM", riskScore: 'High' },
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
                    <div className="p-2.5 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-2xl shadow-lg shadow-fuchsia-500/20">
                        <ArrowUpRight size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Merchant Payouts</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Review, approve, and monitor requested outbound payouts</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-600 hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-all shadow-sm">
                        <Calendar size={14} className="text-fuchsia-500" /> Today
                    </button>
                    <button className="flex items-center gap-2 bg-[#1F2937] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg hover:bg-gray-800 transition-all">
                        <Download size={14} /> Export Register
                    </button>
                </div>
            </div>

            {/* 2. KPI METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard label="Pending Approvals" value="2" subValue="Requires attention" color="text-amber-500" isAlert />
                <StatCard label="Value Awaiting Approval" value="₦15,000,000" subValue="High value flagged" color="text-fuchsia-500" />
                <StatCard label="Processed (Today)" value="₦450,000" subValue="12 successful payouts" color="text-[#00823B]" />
                <StatCard label="Failed / Rejected" value="2" subValue="Requires merchant action" color="text-red-500" />
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
                                placeholder="Search by Payout ID, Business, or Account Number..."
                                className="w-full pl-12 pr-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all text-[var(--foreground)]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-black transition-all border ${
                                showFilters
                                    ? "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/30"
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
                                <FilterSelect label="Status" options={["All Statuses", "Processed", "Pending Approval", "Processing", "Failed", "Rejected"]} />
                                <FilterSelect label="Risk Score" options={["All Risk Levels", "Low", "Medium", "High"]} />
                                <div className="flex flex-col gap-1.5 lg:col-span-3">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Destination Bank</label>
                                    <input type="text" placeholder="e.g. GTBank" className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-fuchsia-500 transition-all" />
                                </div>
                                <FilterDate label="Date From" />
                                <FilterDate label="Date To" />
                                <div className="flex items-end lg:col-span-3">
                                    <button className="w-full py-2.5 bg-fuchsia-600 text-white rounded-xl text-xs font-black hover:bg-fuchsia-700 transition-all shadow-md shadow-fuchsia-500/20">Apply Filters</button>
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
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Payout Info</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Business Detail</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Destination Account</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Value & Deduction</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Status</th>
                            <th className="px-6 py-5"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {payouts.map((pay) => (
                            <tr key={pay.id} className="hover:bg-fuchsia-500/5 transition-colors group cursor-pointer" onClick={() => setSelectedPayout(pay)}>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[14px] group-hover:text-fuchsia-500 transition-colors">{pay.id}</span>
                                        <span className="text-[11px] font-bold text-gray-500 font-mono tracking-tight">{pay.reference}</span>
                                        <span className="text-[10px] font-bold text-gray-400 mt-1">{pay.requestedAt}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1.5 items-start">
                                            <span className="flex items-center gap-1.5 font-black text-[var(--foreground)] text-[13px]">
                                                <Building2 size={12} className="text-gray-400" /> {pay.business}
                                            </span>
                                        {pay.riskScore === 'High' && (
                                            <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-widest rounded flex items-center gap-1">
                                                    High Risk
                                                </span>
                                        )}
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1 items-start">
                                            <span className="px-2.5 py-1 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] text-[10px] font-black uppercase tracking-widest rounded-md">
                                                {pay.destinationBank}
                                            </span>
                                        <span className="text-[12px] font-black text-[var(--foreground)] mt-0.5">{pay.destinationAccount}</span>
                                        <span className="text-[10px] font-bold text-gray-500">{pay.accountName}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[15px]">{pay.amount}</span>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fee: {pay.fee}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <StatusBadge status={pay.status} />
                                </td>

                                <td className="px-6 py-5 text-right">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedPayout(pay); }}
                                        className="p-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-gray-400 hover:text-fuchsia-500 hover:border-fuchsia-500/30 shadow-sm transition-all"
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

            {/* 4. PAYOUT DETAILS MODAL */}
            {selectedPayout && (
                <div className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--card)] w-full max-w-lg h-full rounded-[2rem] border border-[var(--border)] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[var(--border)] shrink-0 bg-[var(--background)]/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-fuchsia-500/10 rounded-xl text-fuchsia-500">
                                    <ArrowUpRight size={18} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-[var(--foreground)] tracking-tight">Payout Details</h2>
                                    <p className="text-xs font-bold text-gray-500">{selectedPayout.requestedAt}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedPayout(null)} className="p-2 text-gray-400 hover:text-[var(--foreground)] hover:bg-[var(--card)] rounded-full transition-all border border-transparent hover:border-[var(--border)]">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">

                            {/* Hero Amount */}
                            <div className="flex flex-col items-center justify-center mb-8">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Requested Payout</p>
                                <h2 className="text-4xl font-black text-[var(--foreground)] tracking-tight mb-4">{selectedPayout.amount}</h2>
                                <StatusBadge status={selectedPayout.status} />
                            </div>

                            {/* Financial Breakdown */}
                            <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-5 mb-8 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-bold text-gray-500">Payout Amount</span>
                                    <span className="text-[13px] font-black text-[var(--foreground)]">{selectedPayout.amount}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-bold text-gray-500">Processing Fee</span>
                                    <span className="text-[13px] font-black text-gray-500">+ {selectedPayout.fee}</span>
                                </div>
                                <div className="pt-3 border-t border-[var(--border)] flex justify-between items-center">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-fuchsia-500">Total Deducted</span>
                                    <span className="text-[15px] font-black text-[var(--foreground)]">{selectedPayout.totalDeduction}</span>
                                </div>
                            </div>

                            {/* Details List */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 flex items-center gap-2">
                                    <Landmark size={14}/> Receiving Bank Account
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Bank Name" value={selectedPayout.destinationBank} />
                                    <ModalRow label="Account Number" value={selectedPayout.destinationAccount} copyable onCopy={() => handleCopy(selectedPayout.destinationAccount, 'acc')} copied={copied === 'acc'} />
                                    <ModalRow label="Account Name" value={selectedPayout.accountName} isLast />
                                </div>

                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 mt-8 flex items-center gap-2">
                                    <ShieldCheck size={14}/> System & Audit
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Payout ID" value={selectedPayout.id} copyable onCopy={() => handleCopy(selectedPayout.id, 'id')} copied={copied === 'id'} />
                                    <ModalRow label="Merchant Business" value={selectedPayout.business} />
                                    <ModalRow label="System Risk Score" value={selectedPayout.riskScore} isAlert={selectedPayout.riskScore === 'High'} isLast />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer (Dynamic based on status) */}
                        <div className="p-6 border-t border-[var(--border)] shrink-0 flex gap-3 bg-[var(--background)]/50">
                            {selectedPayout.status === 'Pending Approval' ? (
                                <>
                                    <button className="flex-1 py-3 border border-red-500/20 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2">
                                        <XOctagon size={14} /> Reject
                                    </button>
                                    <button className="flex-[2] py-3 bg-[#00823B] text-white text-xs font-black rounded-xl hover:bg-[#005C29] transition-all shadow-lg shadow-[#00823B]/20 flex items-center justify-center gap-2">
                                        <CheckCircle size={14} /> Approve Payout
                                    </button>
                                </>
                            ) : selectedPayout.status === 'Processed' ? (
                                <button className="w-full py-3 border border-[var(--border)] bg-[var(--card)] hover:bg-gray-50 dark:hover:bg-gray-800 text-[var(--foreground)] text-xs font-black rounded-xl transition-all shadow-sm">
                                    Download Payout Receipt
                                </button>
                            ) : (
                                <button className="w-full py-3 bg-[#1F2937] text-white text-xs font-black rounded-xl hover:bg-gray-800 transition-all shadow-md">
                                    View Audit Log
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
                isAlert ? "border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50" : "border-[var(--border)] hover:border-fuchsia-500/30"
            }`}>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{label}</p>
                <h3 className={`text-2xl font-black tracking-tight mb-1 ${color}`}>{value}</h3>
                <p className={`text-[11px] font-bold ${isAlert ? "text-amber-600" : "text-gray-500"}`}>{subValue}</p>
            </div>
        );
    }

    function FilterSelect({ label, options }: { label: string, options: string[] }) {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
                <select className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-fuchsia-500 transition-all appearance-none cursor-pointer">
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
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-fuchsia-500 transition-all dark:[color-scheme:dark]"
                />
            </div>
        );
    }

    function StatusBadge({ status }: { status: PayoutStatus }) {
        const config = {
            'Processed': { bg: 'bg-[#00823B]/10', text: 'text-[#00823B]', border: 'border-[#00823B]/20', icon: <CheckCircle2 size={12}/> },
            'Pending Approval': { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/20', icon: <Clock size={12}/> },
            'Processing': { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20', icon: <Loader2 size={12} className="animate-spin"/> },
            'Failed': { bg: 'bg-red-500/10', text: 'text-red-600', border: 'border-red-500/20', icon: <XCircle size={12}/> },
            'Rejected': { bg: 'bg-gray-500/10', text: 'text-gray-500', border: 'border-gray-500/20', icon: <XOctagon size={12}/> },
        }[status];

        return (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md ${config.bg} ${config.text} ${config.border} border text-[10px] font-black uppercase tracking-widest`}>
                {status === 'Processed' ? <div className="w-1.5 h-1.5 rounded-full bg-[#00823B] animate-pulse"></div> : config.icon}
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
                        <button onClick={onCopy} className="text-gray-400 hover:text-fuchsia-500 transition-colors">
                            {copied ? <Check size={14} className="text-fuchsia-500" /> : <Copy size={14} />}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}