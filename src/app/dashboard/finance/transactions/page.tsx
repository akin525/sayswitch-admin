"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    ArrowUpDown, Search, Filter, Download, Calendar,
    MoreHorizontal, CheckCircle2, XCircle, Clock,
    ArrowUpRight, ArrowDownLeft, Eye, X, Copy, Check,
    Building2, CreditCard, Hash, ShieldCheck
} from "lucide-react";

// --- TYPES ---
type Transaction = {
    id: string;
    reference: string;
    business: string;
    amount: string;
    fee: string;
    type: 'Collection' | 'Payout' | 'Transfer' | 'Bill Payment';
    channel: string;
    status: 'Success' | 'Pending' | 'Failed';
    date: string;
    customer?: string;
};

export default function Transactions() {
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
    const [copied, setCopied] = useState(false);

    // --- MOCK DATA ---
    const transactions: Transaction[] = [
        { id: "TXN-001928374", reference: "REF-NIP-998273", business: "Machika Telecoms", amount: "₦450,000.00", fee: "₦45.00", type: 'Collection', channel: "Bank Transfer", status: 'Success', date: "Today, 10:24 AM", customer: "John Doe" },
        { id: "TXN-001928375", reference: "REF-CRD-112233", business: "Spayz Logistics", amount: "₦12,500.00", fee: "₦187.50", type: 'Collection', channel: "Card", status: 'Success', date: "Today, 09:15 AM", customer: "Sarah Jenkins" },
        { id: "TXN-001928376", reference: "REF-OUT-445566", business: "Global Foodies", amount: "₦85,000.00", fee: "₦25.00", type: 'Payout', channel: "NIBSS", status: 'Pending', date: "Today, 08:30 AM" },
        { id: "TXN-001928377", reference: "REF-BIL-778899", business: "Green Energy Ltd", amount: "₦5,400.00", fee: "₦0.00", type: 'Bill Payment', channel: "Wallet", status: 'Failed', date: "Yesterday, 18:45 PM", customer: "Mike Okonkwo" },
        { id: "TXN-001928378", reference: "REF-NIP-223344", business: "Isakharu Tech", amount: "₦1,200,000.00", fee: "₦50.00", type: 'Transfer', channel: "Bank Transfer", status: 'Success', date: "Yesterday, 14:20 PM" },
        { id: "TXN-001928379", reference: "REF-CRD-556677", business: "Acme Retail", amount: "₦34,000.00", fee: "₦510.00", type: 'Collection', channel: "Card", status: 'Success', date: "Yesterday, 11:10 AM", customer: "Aisha Bello" },
    ];

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <DashboardLayout>
            {/* 1. PAGE HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-[#005C29] to-[#00823B] rounded-2xl shadow-lg shadow-[#00823B]/20">
                        <ArrowUpDown size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">All Transactions</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Monitor and audit all system-wide transactions</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-600 hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-all shadow-sm">
                        <Calendar size={14} className="text-[#00823B]" /> Today
                    </button>
                    <button className="flex items-center gap-2 bg-[#00823B] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all">
                        <Download size={14} /> Export CSV
                    </button>
                </div>
            </div>

            {/* 2. KPI METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard label="Total Volume (Today)" value="₦48,250,000" subValue="1,204 transactions" />
                <StatCard label="Success Rate" value="98.5%" subValue="+0.2% from yesterday" color="text-[#00823B]" />
                <StatCard label="Pending Value" value="₦1,420,000" subValue="Across 34 transactions" color="text-amber-500" />
                <StatCard label="Failed Transactions" value="12" subValue="Requires attention" color="text-red-500" />
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
                                placeholder="Search by Transaction ID, Reference, or Amount..."
                                className="w-full pl-12 pr-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-[#00823B]/20 focus:border-[#00823B] transition-all text-[var(--foreground)]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-black transition-all border ${
                                showFilters
                                    ? "bg-[#00823B]/10 text-[#00823B] border-[#00823B]/30"
                                    : "bg-[var(--card)] text-gray-500 border-[var(--border)] hover:text-[var(--foreground)]"
                            }`}
                        >
                            <Filter size={16} /> Advanced Filters
                        </button>
                    </div>

                    {/* Expandable Advanced Filters */}
                    <div className={`grid transition-all duration-300 ease-in-out ${showFilters ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-[var(--background)] rounded-2xl border border-[var(--border)]">
                                <FilterSelect label="Status" options={["All Statuses", "Success", "Pending", "Failed"]} />
                                <FilterSelect label="Type" options={["All Types", "Collection", "Payout", "Transfer", "Bill Payment"]} />
                                <FilterSelect label="Channel" options={["All Channels", "Bank Transfer", "Card", "Wallet", "USSD"]} />
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Min Amount (₦)</label>
                                    <input type="number" placeholder="0.00" className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-[#00823B] transition-all" />
                                </div>

                                <FilterDate label="From Date" />
                                <FilterDate label="To Date" />

                                <div className="flex items-end lg:col-span-2">
                                    <button className="w-full py-2.5 bg-[#00823B] text-white rounded-xl text-xs font-black hover:bg-[#005C29] transition-all shadow-md shadow-[#00823B]/10">
                                        Apply Filters
                                    </button>
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
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Transaction Info</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Business / Customer</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Value & Fee</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Type</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Status</th>
                            <th className="px-6 py-5"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-[#00823B]/5 transition-colors group cursor-pointer" onClick={() => setSelectedTx(tx)}>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[14px] group-hover:text-[#00823B] transition-colors">{tx.id}</span>
                                        <span className="text-[11px] font-bold text-gray-500 font-mono tracking-tight">{tx.reference}</span>
                                        <span className="text-[10px] font-bold text-gray-400 mt-1">{tx.date}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1.5">
                                            <span className="flex items-center gap-1.5 font-black text-[var(--foreground)] text-[13px]">
                                                <Building2 size={12} className="text-gray-400" /> {tx.business}
                                            </span>
                                        {tx.customer && (
                                            <span className="text-[11px] font-bold text-gray-500">From: {tx.customer}</span>
                                        )}
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[15px]">{tx.amount}</span>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fee: {tx.fee}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1 items-start">
                                            <span className="px-2.5 py-1 bg-[var(--background)] border border-[var(--border)] text-gray-600 dark:text-gray-300 text-[10px] font-black uppercase tracking-widest rounded-md">
                                                {tx.type}
                                            </span>
                                        <span className="text-[11px] font-bold text-gray-500">{tx.channel}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <StatusBadge status={tx.status} />
                                </td>

                                <td className="px-6 py-5 text-right">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedTx(tx); }}
                                        className="p-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-gray-400 hover:text-[#00823B] hover:border-[#00823B]/30 shadow-sm transition-all"
                                    >
                                        <ArrowUpRight size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 4. TRANSACTION DETAILS MODAL */}
            {selectedTx && (
                <div className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--card)] w-full max-w-lg h-full rounded-[2rem] border border-[var(--border)] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[var(--border)] shrink-0 bg-[var(--background)]/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#00823B]/10 rounded-xl text-[#00823B]">
                                    <ArrowUpDown size={18} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-[var(--foreground)] tracking-tight">Transaction Details</h2>
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
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Total Amount</p>
                                <h2 className="text-4xl font-black text-[var(--foreground)] tracking-tight mb-4">{selectedTx.amount}</h2>
                                <StatusBadge status={selectedTx.status} />
                            </div>

                            <hr className="border-[var(--border)]/50 mb-8" />

                            {/* Details List */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 flex items-center gap-2">
                                    <Hash size={14}/> Identifiers
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Transaction ID" value={selectedTx.id} copyable onCopy={() => handleCopy(selectedTx.id)} copied={copied} />
                                    <ModalRow label="System Reference" value={selectedTx.reference} copyable onCopy={() => handleCopy(selectedTx.reference)} copied={copied} isLast />
                                </div>

                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 mt-8 flex items-center gap-2">
                                    <Building2 size={14}/> Parties Involved
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Merchant Business" value={selectedTx.business} />
                                    <ModalRow label="Customer / Sender" value={selectedTx.customer || "N/A"} isLast />
                                </div>

                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 mt-8 flex items-center gap-2">
                                    <CreditCard size={14}/> Financials
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Transaction Type" value={selectedTx.type} />
                                    <ModalRow label="Payment Channel" value={selectedTx.channel} />
                                    <ModalRow label="Processing Fee" value={selectedTx.fee} isLast />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-[var(--border)] shrink-0 flex gap-3 bg-[var(--background)]/50">
                            <button className="flex-1 py-3 border border-[var(--border)] bg-[var(--card)] hover:bg-gray-50 dark:hover:bg-gray-800 text-[var(--foreground)] text-xs font-black rounded-xl transition-all shadow-sm">
                                View Webhook Logs
                            </button>
                            <button className="flex-1 py-3 bg-[#00823B] text-white text-xs font-black rounded-xl hover:bg-[#005C29] transition-all shadow-lg shadow-[#00823B]/20">
                                Download Receipt
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
            <div className="bg-[var(--card)] p-6 rounded-[2rem] border border-[var(--border)] shadow-sm hover:border-[#00823B]/30 transition-colors">
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
                <select className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-[#00823B] transition-all appearance-none cursor-pointer">
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
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-[#00823B] transition-all dark:[color-scheme:dark]"
                />
            </div>
        );
    }

    function StatusBadge({ status }: { status: Transaction['status'] }) {
        const config = {
            'Success': { bg: 'bg-[#00823B]/10', text: 'text-[#00823B]', border: 'border-[#00823B]/20', icon: <CheckCircle2 size={12}/> },
            'Pending': { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/20', icon: <Clock size={12}/> },
            'Failed': { bg: 'bg-red-500/10', text: 'text-red-600', border: 'border-red-500/20', icon: <XCircle size={12}/> },
        }[status];

        return (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${config.bg} ${config.text} ${config.border} border text-[10px] font-black uppercase tracking-widest`}>
                {status === 'Success' ? <div className="w-1.5 h-1.5 rounded-full bg-[#00823B] animate-pulse"></div> : config.icon}
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
                        <button onClick={onCopy} className="text-gray-400 hover:text-[#00823B] transition-colors">
                            {copied ? <Check size={14} className="text-[#00823B]" /> : <Copy size={14} />}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}