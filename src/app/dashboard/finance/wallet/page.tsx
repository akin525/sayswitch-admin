"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Wallet, Search, Filter, Download, Calendar,
    CheckCircle2, XCircle, Clock, Eye, X, Copy, Check,
    Building2, ArrowDownToLine, ArrowUpFromLine, Hash,
    AlignLeft, DollarSign
} from "lucide-react";

// --- TYPES ---
type WalletTxType = 'Credit' | 'Debit';

type WalletTransaction = {
    id: string;
    reference: string;
    business: string;
    type: WalletTxType;
    amount: string;
    balanceAfter: string;
    description: string;
    status: 'Successful' | 'Pending' | 'Failed';
    date: string;
    category: 'Top-up' | 'Fee Deduction' | 'Manual Adjustment' | 'Payout Reversal';
};

export default function WalletTransactions() {
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTx, setSelectedTx] = useState<WalletTransaction | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    // --- MOCK DATA ---
    const walletLedger: WalletTransaction[] = [
        { id: "WLT-88192301", reference: "REF-W-99210", business: "Machika Telecoms", type: 'Credit', amount: "₦450,000.00", balanceAfter: "₦4,525,490.19", description: "Virtual Account Top-up via NIBSS", status: 'Successful', date: "Today, 10:24 AM", category: 'Top-up' },
        { id: "WLT-88192302", reference: "REF-W-99211", business: "AfriClique Logistics", type: 'Debit', amount: "₦12,500.00", balanceAfter: "₦1,237,500.00", description: "Platform Monthly Subscription Fee", status: 'Successful', date: "Today, 09:15 AM", category: 'Fee Deduction' },
        { id: "WLT-88192303", reference: "REF-W-99212", business: "Global Foodies", type: 'Credit', amount: "₦85,000.00", balanceAfter: "₦84,150.00", description: "Reversal for Failed Transfer TRF-00918275", status: 'Pending', date: "Today, 08:30 AM", category: 'Payout Reversal' },
        { id: "WLT-88192304", reference: "REF-W-99213", business: "Green Energy Ltd", type: 'Debit', amount: "₦5,400.00", balanceAfter: "₦534,600.00", description: "Manual Admin Deduction (Chargeback)", status: 'Failed', date: "Yesterday, 18:45 PM", category: 'Manual Adjustment' },
        { id: "WLT-88192305", reference: "REF-W-99214", business: "Isakharu Tech", type: 'Credit', amount: "₦1,200,000.00", balanceAfter: "₦3,675,000.00", description: "Virtual Account Top-up via PROVIDUS", status: 'Successful', date: "Yesterday, 14:20 PM", category: 'Top-up' },
        { id: "WLT-88192306", reference: "REF-W-99215", business: "Acme Retail", type: 'Debit', amount: "₦500.00", balanceAfter: "₦118,300.00", description: "SMS Notification Charges", status: 'Successful', date: "Yesterday, 11:10 AM", category: 'Fee Deduction' },
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
                    <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20">
                        <Wallet size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Wallet Transaction</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Monitor internal wallet credits, debits, and balance updates</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-600 hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-all shadow-sm">
                        <Calendar size={14} className="text-cyan-500" /> Today
                    </button>
                    <button className="flex items-center gap-2 bg-[#1F2937] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg hover:bg-gray-800 transition-all">
                        <Download size={14} /> Export Ledger
                    </button>
                </div>
            </div>

            {/* 2. KPI METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard label="Total System Balance" value="₦284,520,000" subValue="Across all active wallets" color="text-cyan-500" />
                <StatCard label="Credits (Today)" value="₦12,450,000" subValue="1,204 Inflows" color="text-[#00823B]" />
                <StatCard label="Debits (Today)" value="₦4,120,000" subValue="342 Outflows" color="text-red-500" />
                <StatCard label="Pending Updates" value="18" subValue="Awaiting confirmation" color="text-amber-500" />
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
                                placeholder="Search by Wallet TX ID, Reference, or Description..."
                                className="w-full pl-12 pr-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-[var(--foreground)]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-black transition-all border ${
                                showFilters
                                    ? "bg-cyan-500/10 text-cyan-600 border-cyan-500/30"
                                    : "bg-[var(--card)] text-gray-500 border-[var(--border)] hover:text-[var(--foreground)]"
                            }`}
                        >
                            <Filter size={16} /> Advanced Filters
                        </button>
                    </div>

                    {/* Expandable Advanced Filters */}
                    <div className={`grid transition-all duration-300 ease-in-out ${showFilters ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-5 bg-[var(--background)] rounded-2xl border border-[var(--border)]">
                                <FilterSelect label="Type" options={["All", "Credit", "Debit"]} />
                                <FilterSelect label="Category" options={["All Categories", "Top-up", "Fee Deduction", "Manual Adjustment", "Payout Reversal"]} />
                                <div className="flex flex-col gap-1.5 lg:col-span-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Business Name</label>
                                    <input type="text" placeholder="e.g. AfriClique Logistics" className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-cyan-500 transition-all" />
                                </div>
                                <FilterDate label="From Date" />
                                <FilterDate label="To Date" />
                                <div className="flex items-end lg:col-span-6">
                                    <button className="w-full md:w-auto px-8 py-2.5 bg-cyan-600 text-white rounded-xl text-xs font-black hover:bg-cyan-700 transition-all shadow-md shadow-cyan-500/20">Apply Filters</button>
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
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Entry Details</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Wallet / Business</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Type & Amount</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Balance After</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Status</th>
                            <th className="px-6 py-5"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {walletLedger.map((tx) => (
                            <tr key={tx.id} className="hover:bg-cyan-500/5 transition-colors group cursor-pointer" onClick={() => setSelectedTx(tx)}>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[14px] group-hover:text-cyan-500 transition-colors">{tx.id}</span>
                                        <span className="text-[11px] font-bold text-gray-500 font-mono tracking-tight">{tx.reference}</span>
                                        <span className="text-[10px] font-bold text-gray-400 mt-1">{tx.date}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1.5 items-start">
                                            <span className="flex items-center gap-1.5 font-black text-[var(--foreground)] text-[13px]">
                                                <Building2 size={12} className="text-gray-400" /> {tx.business}
                                            </span>
                                        <span className="px-2 py-0.5 bg-[var(--background)] border border-[var(--border)] text-gray-500 text-[10px] font-bold rounded uppercase tracking-widest">
                                                {tx.category}
                                            </span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-1.5 rounded-lg border ${tx.type === 'Credit' ? 'bg-[#00823B]/10 border-[#00823B]/20 text-[#00823B]' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                                            {tx.type === 'Credit' ? <ArrowDownToLine size={14}/> : <ArrowUpFromLine size={14}/>}
                                        </div>
                                        <div className="flex flex-col">
                                                <span className={`font-black text-[15px] ${tx.type === 'Credit' ? 'text-[#00823B]' : 'text-red-500'}`}>
                                                    {tx.type === 'Credit' ? '+' : '-'}{tx.amount}
                                                </span>
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{tx.type}</span>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <span className="font-black text-[var(--foreground)] text-[14px]">{tx.balanceAfter}</span>
                                </td>

                                <td className="px-6 py-5">
                                    <StatusBadge status={tx.status} />
                                </td>

                                <td className="px-6 py-5 text-right">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedTx(tx); }}
                                        className="p-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-gray-400 hover:text-cyan-500 hover:border-cyan-500/30 shadow-sm transition-all"
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

            {/* 4. WALLET TRANSACTION DETAILS MODAL */}
            {selectedTx && (
                <div className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--card)] w-full max-w-lg h-full rounded-[2rem] border border-[var(--border)] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[var(--border)] shrink-0 bg-[var(--background)]/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-500">
                                    <Wallet size={18} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-[var(--foreground)] tracking-tight">Ledger Entry</h2>
                                    <p className="text-xs font-bold text-gray-500">{selectedTx.date}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedTx(null)} className="p-2 text-gray-400 hover:text-[var(--foreground)] hover:bg-[var(--card)] rounded-full transition-all border border-transparent hover:border-[var(--border)]">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">

                            {/* Hero Amount */}
                            <div className="flex flex-col items-center justify-center mb-10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Entry Amount</p>
                                <h2 className={`text-4xl font-black tracking-tight mb-4 flex items-center gap-2 ${selectedTx.type === 'Credit' ? 'text-[#00823B]' : 'text-red-500'}`}>
                                    {selectedTx.type === 'Credit' ? '+' : '-'}{selectedTx.amount}
                                </h2>
                                <StatusBadge status={selectedTx.status} />
                            </div>

                            {/* Description Banner */}
                            <div className="mb-8 p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl flex items-start gap-3">
                                <AlignLeft size={16} className="text-cyan-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1">Narration</h4>
                                    <p className="text-[13px] font-bold text-[var(--foreground)] leading-relaxed">{selectedTx.description}</p>
                                </div>
                            </div>

                            <hr className="border-[var(--border)]/50 mb-8" />

                            {/* Details List */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 flex items-center gap-2">
                                    <Building2 size={14}/> Wallet Information
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Merchant Business" value={selectedTx.business} />
                                    <ModalRow label="Category" value={selectedTx.category} />
                                    <ModalRow label="Balance After Txn" value={selectedTx.balanceAfter} isLast />
                                </div>

                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 mt-8 flex items-center gap-2">
                                    <Hash size={14}/> System Identifiers
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Ledger ID" value={selectedTx.id} copyable onCopy={() => handleCopy(selectedTx.id, 'id')} copied={copied === 'id'} />
                                    <ModalRow label="System Ref" value={selectedTx.reference} copyable onCopy={() => handleCopy(selectedTx.reference, 'ref')} copied={copied === 'ref'} isLast />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-[var(--border)] shrink-0 flex gap-3 bg-[var(--background)]/50">
                            <button className="flex-1 py-3 border border-[var(--border)] bg-[var(--card)] hover:bg-gray-50 dark:hover:bg-gray-800 text-[var(--foreground)] text-xs font-black rounded-xl transition-all shadow-sm">
                                View Linked Transaction
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </DashboardLayout>
    );

    // --- REUSABLE COMPONENTS ---
    function StatCard({ label, value, subValue, color = "text-[var(--foreground)]" }: any) {
        return (
            <div className="bg-[var(--card)] p-6 rounded-[2rem] border border-[var(--border)] shadow-sm hover:border-cyan-500/30 transition-colors">
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
                <select className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-cyan-500 transition-all appearance-none cursor-pointer">
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
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-cyan-500 transition-all dark:[color-scheme:dark]"
                />
            </div>
        );
    }

    function StatusBadge({ status }: { status: WalletTransaction['status'] }) {
        const config = {
            'Successful': { bg: 'bg-[#00823B]/10', text: 'text-[#00823B]', border: 'border-[#00823B]/20', icon: <CheckCircle2 size={12}/> },
            'Pending': { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/20', icon: <Clock size={12}/> },
            'Failed': { bg: 'bg-red-500/10', text: 'text-red-600', border: 'border-red-500/20', icon: <XCircle size={12}/> },
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
                        <button onClick={onCopy} className="text-gray-400 hover:text-cyan-500 transition-colors">
                            {copied ? <Check size={14} className="text-cyan-500" /> : <Copy size={14} />}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}