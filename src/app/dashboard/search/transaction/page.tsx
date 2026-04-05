"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Search, Filter, X, Eye, Copy, Check, ArrowUpDown,
    Calendar, Hash, CreditCard, Building2, User, CheckCircle2, XCircle, Clock
} from "lucide-react";

// --- TYPES ---
type Transaction = {
    id: string;
    reference: string;
    business: string;
    amount: string;
    fee: string;
    type: string;
    channel: string;
    status: 'Successful' | 'Pending' | 'Failed';
    date: string;
    customerName: string;
    customerEmail: string;
};

export default function SearchTransactionPage() {
    const [showFilters, setShowFilters] = useState(false);
    const [activeTab, setActiveTab] = useState("All Transactions");
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    // --- MOCK DATA ---
    const transactions: Transaction[] = [
        { id: "TXN-9002378600", reference: "REF-NIP-998273", business: "Falson Global services", amount: "₦450,000.00", fee: "₦45.00", type: "Collection", channel: "Bank Transfer", status: 'Successful', date: "2026-03-29 12:41:13", customerName: "Eskimo Nwa", customerEmail: "eskimonwagod@gmail.com" },
        { id: "TXN-9002378590", reference: "REF-CRD-112233", business: "MACHIKA TELECOMS", amount: "₦12,500.00", fee: "₦187.50", type: "Collection", channel: "Card", status: 'Pending', date: "2026-03-28 09:15:00", customerName: "Billa Ibrahim", customerEmail: "billabala728@gmail.com" },
        { id: "TXN-9002378583", reference: "REF-OUT-445566", business: "GIFTBILLS", amount: "₦85,000.00", fee: "₦25.00", type: "Payout", channel: "Wallet", status: 'Successful', date: "2026-03-27 14:22:10", customerName: "Adebanjo Ayowole", customerEmail: "ayowoleolusayo1983@gmail.com" },
        { id: "TXN-9002378576", reference: "REF-BIL-778899", business: "Falson Global services", amount: "₦5,400.00", fee: "₦0.00", type: "Bill Payment", channel: "USSD", status: 'Failed', date: "2026-03-26 11:05:44", customerName: "Tboy Tboy", customerEmail: "kayjojo69@gmail.com" },
    ];

    const tabs = ["All Transactions", "Successful", "Pending", "Failed / Reversed"];

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <DashboardLayout>
            {/* 1. PAGE HEADER */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-1">
                    <ArrowUpDown size={24} className="text-[#00823B]" />
                    <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Search Transactions</h1>
                </div>
                <p className="text-[13px] text-gray-500 font-medium">Query the global ledger for specific transactions using advanced parameters.</p>
            </div>

            {/* 2. THE EXACT SEARCH STRUCTURE (Based on image_35aed5.png) */}
            <div className="bg-[var(--card)] rounded-[2rem] border border-[var(--border)] p-6 mb-8 shadow-sm">

                {/* Search Bar & Filter Toggle */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Quick search by transaction ID, reference, or amount..."
                            className="w-full pl-12 pr-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-[#00823B]/20 focus:border-[#00823B] transition-all text-[var(--foreground)] placeholder:text-gray-500"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-[13px] font-black transition-all border ${
                            showFilters
                                ? "bg-[#00823B]/10 text-[#00823B] border-[#00823B]/30"
                                : "bg-[var(--background)] text-gray-400 border-[var(--border)] hover:text-[var(--foreground)] hover:border-gray-500"
                        }`}
                    >
                        <Filter size={16} /> Advanced Filters
                    </button>
                </div>

                {/* Advanced Filters Grid (Animated Expansion matching screenshot) */}
                <div className={`grid transition-all duration-300 ease-in-out ${showFilters ? "grid-rows-[1fr] opacity-100 mb-6" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-6 bg-[var(--background)] rounded-3xl border border-[var(--border)]">
                            <FilterSelect label="Status" options={["All Statuses", "Successful", "Pending", "Failed"]} />
                            <FilterSelect label="Transaction Type" options={["All Types", "Collection", "Payout", "Bill Payment"]} />
                            <FilterSelect label="Channel" options={["All Channels", "Bank Transfer", "Card", "USSD"]} />
                            <FilterInput label="System Reference" placeholder="Ref code" />

                            <FilterInput label="Customer Email" placeholder="email@example.com" />
                            <FilterInput label="Business Name" placeholder="e.g. Falson Global" />
                            <FilterDate label="Start Date" />
                            <FilterDate label="End Date" />

                            <div className="xl:col-span-4 flex items-center justify-end gap-4 pt-2">
                                <button onClick={() => setShowFilters(false)} className="flex items-center gap-2 text-xs font-black text-gray-500 hover:text-[var(--foreground)] transition-colors">
                                    <X size={14} /> Clear Filters
                                </button>
                                <button className="px-8 py-3 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-xl text-xs font-black shadow-lg shadow-[#8b5cf6]/20 transition-all">
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Horizontal Tabs (Matching image_35ae9c.png) */}
                <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2.5 rounded-xl text-[12px] font-black transition-all ${
                                activeTab === tab
                                    ? "bg-[#8b5cf6] text-white shadow-md shadow-[#8b5cf6]/20"
                                    : "bg-[var(--background)] text-gray-400 hover:text-[var(--foreground)] border border-[var(--border)]"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. DATA TABLE */}
            <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                        <tr className="bg-[var(--background)]/40 border-b border-[var(--border)]">
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Transaction Info</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Business & Customer</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Amount & Type</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Status</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-[#00823B]/5 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[15px] tracking-tight">{tx.id}</span>
                                        <span className="text-[11px] font-bold text-gray-500 font-mono">{tx.reference}</span>
                                        <span className="text-[10px] font-bold text-gray-400 mt-0.5">{tx.date}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1.5">
                                            <span className="flex items-center gap-1.5 font-black text-[var(--foreground)] text-[13px]">
                                                <Building2 size={12} className="text-gray-400" /> {tx.business}
                                            </span>
                                        <span className="text-[11px] font-bold text-gray-500 flex items-center gap-1.5">
                                                <User size={12} /> {tx.customerName}
                                            </span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1 items-start">
                                        <span className="font-black text-[var(--foreground)] text-[14px]">{tx.amount}</span>
                                        <span className="px-2 py-0.5 bg-[var(--background)] border border-[var(--border)] text-gray-500 text-[9px] font-black uppercase tracking-widest rounded mt-1">
                                                {tx.type} • {tx.channel}
                                            </span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <StatusBadge status={tx.status} />
                                </td>

                                <td className="px-6 py-5 text-right">
                                    <button
                                        onClick={() => setSelectedTx(tx)}
                                        className="p-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-gray-400 hover:text-[#00823B] hover:border-[#00823B]/30 shadow-sm transition-all"
                                        title="View Details"
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

            {/* 4. TRANSACTION INFORMATION MODAL (Based on image_35aefb.png) */}
            {selectedTx && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--card)] w-full max-w-2xl rounded-[2rem] border border-[var(--border)] shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[var(--border)] shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#8b5cf6]/10 rounded-xl text-[#8b5cf6]">
                                    <Eye size={18} />
                                </div>
                                <h2 className="text-lg font-black text-[var(--foreground)] tracking-tight">Transaction Information</h2>
                            </div>
                            <button onClick={() => setSelectedTx(null)} className="p-2 text-gray-400 hover:text-[var(--foreground)] hover:bg-[var(--background)] rounded-full transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable Split Grid matching screenshot) */}
                        <div className="p-8 overflow-y-auto custom-scrollbar space-y-10">

                            {/* TRANSACTION DETAILS SECTION */}
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6">Transaction Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                                    <ModalDetail icon={<Hash size={14}/>} label="Transaction ID" value={selectedTx.id} isHighlight copyable onCopy={() => handleCopy(selectedTx.id, 'id')} copied={copied === 'id'} />
                                    <ModalDetail icon={<Hash size={14}/>} label="System Reference" value={selectedTx.reference} copyable onCopy={() => handleCopy(selectedTx.reference, 'ref')} copied={copied === 'ref'} />
                                    <ModalDetail icon={<CreditCard size={14}/>} label="Amount" value={selectedTx.amount} />
                                    <ModalDetail icon={<ArrowUpDown size={14}/>} label="Type & Channel" value={`${selectedTx.type} • ${selectedTx.channel}`} />
                                    <ModalDetail icon={<Calendar size={14}/>} label="Created At" value={selectedTx.date} />
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                                            <CheckCircle2 size={14} />
                                            <span className="text-[11px] font-bold">Status</span>
                                        </div>
                                        <StatusBadge status={selectedTx.status} />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-[var(--border)]/50" />

                            {/* CUSTOMER INFORMATION SECTION */}
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6">Customer Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                                    <ModalDetail icon={<User size={14}/>} label="Customer Name" value={selectedTx.customerName} />
                                    <ModalDetail icon={<User size={14}/>} label="Email Address" value={selectedTx.customerEmail} />
                                    <ModalDetail icon={<Building2 size={14}/>} label="Merchant Business" value={selectedTx.business} />
                                    <ModalDetail icon={<CreditCard size={14}/>} label="Processing Fee" value={selectedTx.fee} />
                                </div>
                            </div>

                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-[var(--border)] shrink-0 flex justify-end">
                            <button onClick={() => setSelectedTx(null)} className="px-6 py-3 border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--card)] text-[var(--foreground)] text-xs font-black rounded-xl transition-all shadow-sm">
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </DashboardLayout>
    );

    // --- REUSABLE COMPONENTS ---

    function FilterInput({ label, placeholder }: { label: string, placeholder: string }) {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
                <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-[#8b5cf6] transition-all placeholder:text-gray-600"
                />
            </div>
        );
    }

    function FilterSelect({ label, options }: { label: string, options: string[] }) {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
                <select className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-[#8b5cf6] transition-all appearance-none cursor-pointer">
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
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-[#8b5cf6] transition-all dark:[color-scheme:dark]"
                />
            </div>
        );
    }

    function StatusBadge({ status }: { status: Transaction['status'] }) {
        const config = {
            'Successful': { text: 'text-[#00823B]', icon: <CheckCircle2 size={14}/> },
            'Pending': { text: 'text-amber-500', icon: <Clock size={14}/> },
            'Failed': { text: 'text-gray-500', icon: <XCircle size={14}/> },
        }[status];

        return (
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-black ${config.text}`}>
                {config.icon}
                {status}
            </span>
        );
    }

    function ModalDetail({ icon, label, value, isHighlight = false, copyable = false, onCopy, copied }: any) {
        return (
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                    {icon}
                    <span className="text-[11px] font-bold">{label}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`text-[14px] font-black tracking-tight ${isHighlight ? 'text-[#8b5cf6]' : 'text-[var(--foreground)]'}`}>
                        {value}
                    </span>
                    {copyable && (
                        <button onClick={onCopy} className="text-gray-400 hover:text-[#8b5cf6] transition-colors ml-1">
                            {copied ? <Check size={14} className="text-[#8b5cf6]" /> : <Copy size={14} />}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}