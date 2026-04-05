"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Scale, Search, Filter, Download, Calendar,
    CheckCircle2, XCircle, Clock, Eye, X, Copy, Check,
    Building2, AlertOctagon, UploadCloud, ShieldAlert,
    FileText, CreditCard, Hash
} from "lucide-react";

// --- TYPES ---
type ChargebackStatus = 'Action Required' | 'Under Review' | 'Won' | 'Lost' | 'Accepted';

type Chargeback = {
    id: string;
    transactionId: string;
    business: string;
    amount: string;
    reason: string;
    dueDate: string;
    status: ChargebackStatus;
    filedOn: string;
    customerName: string;
    evidenceSubmitted: boolean;
};

export default function ChargebacksPage() {
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDispute, setSelectedDispute] = useState<Chargeback | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    // --- MOCK DATA ---
    const chargebacks: Chargeback[] = [
        { id: "CHB-9021", transactionId: "TXN-001928374", business: "Machika Telecoms", amount: "₦45,000.00", reason: "Fraudulent Transaction", dueDate: "Tomorrow, 11:59 PM", status: 'Action Required', filedOn: "Yesterday", customerName: "John Doe", evidenceSubmitted: false },
        { id: "CHB-9022", transactionId: "TXN-001928311", business: "Spayz Logistics", amount: "₦12,500.00", reason: "Product Not Received", dueDate: "In 3 Days", status: 'Under Review', filedOn: "Mar 28, 2026", customerName: "Sarah Jenkins", evidenceSubmitted: true },
        { id: "CHB-9023", transactionId: "TXN-001928280", business: "Global Foodies", amount: "₦8,000.00", reason: "Duplicate Billing", dueDate: "Expired", status: 'Lost', filedOn: "Mar 15, 2026", customerName: "Michael Okonkwo", evidenceSubmitted: false },
        { id: "CHB-9024", transactionId: "TXN-001928210", business: "Acme Retail", amount: "₦120,000.00", reason: "Unrecognized Charge", dueDate: "Closed", status: 'Won', filedOn: "Mar 10, 2026", customerName: "Aisha Bello", evidenceSubmitted: true },
        { id: "CHB-9025", transactionId: "TXN-001928195", business: "Isakharu Tech", amount: "₦50,000.00", reason: "Canceled Subscription", dueDate: "Closed", status: 'Accepted', filedOn: "Mar 05, 2026", customerName: "David Smith", evidenceSubmitted: false },
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
                    <div className="p-2.5 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl shadow-lg shadow-rose-500/20">
                        <Scale size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Chargebacks & Disputes</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Manage transaction disputes and submit representment evidence</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-600 hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-all shadow-sm">
                        <Calendar size={14} className="text-rose-500" /> This Month
                    </button>
                    <button className="flex items-center gap-2 bg-[#1F2937] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg hover:bg-gray-800 transition-all">
                        <Download size={14} /> Export Register
                    </button>
                </div>
            </div>

            {/* 2. KPI METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard label="Action Required" value="12" subValue="₦450,200 at risk" color="text-rose-500" isAlert />
                <StatCard label="Under Review" value="34" subValue="Awaiting bank decision" color="text-amber-500" />
                <StatCard label="Win Rate (30 Days)" value="68.4%" subValue="Industry avg: 45%" color="text-[#00823B]" />
                <StatCard label="Total Value Lost" value="₦1.2M" subValue="YTD 2026" color="text-[var(--foreground)]" />
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
                                placeholder="Search by Chargeback ID, Transaction ID, or Business..."
                                className="w-full pl-12 pr-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-[var(--foreground)]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-black transition-all border ${
                                showFilters
                                    ? "bg-rose-500/10 text-rose-600 border-rose-500/30"
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
                                <FilterSelect label="Status" options={["All Statuses", "Action Required", "Under Review", "Won", "Lost", "Accepted"]} />
                                <FilterSelect label="Reason Code" options={["All Reasons", "Fraudulent", "Product Not Received", "Duplicate", "Unrecognized"]} />
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Business Name</label>
                                    <input type="text" placeholder="e.g. Spayz Logistics" className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-rose-500 transition-all" />
                                </div>
                                <FilterDate label="Filed From" />
                                <FilterDate label="Filed To" />
                                <div className="flex items-end lg:col-span-5">
                                    <button className="w-full md:w-auto px-8 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-black hover:bg-rose-700 transition-all shadow-md shadow-rose-500/20">Apply Filters</button>
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
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Dispute Info</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Business / Customer</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Amount & Reason</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Deadline</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Status</th>
                            <th className="px-6 py-5"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {chargebacks.map((chb) => (
                            <tr key={chb.id} className="hover:bg-rose-500/5 transition-colors group cursor-pointer" onClick={() => setSelectedDispute(chb)}>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[14px] group-hover:text-rose-500 transition-colors">{chb.id}</span>
                                        <span className="text-[11px] font-bold text-gray-500 font-mono tracking-tight">{chb.transactionId}</span>
                                        <span className="text-[10px] font-bold text-gray-400 mt-1">Filed: {chb.filedOn}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1.5">
                                            <span className="flex items-center gap-1.5 font-black text-[var(--foreground)] text-[13px]">
                                                <Building2 size={12} className="text-gray-400" /> {chb.business}
                                            </span>
                                        <span className="text-[11px] font-bold text-gray-500">Cardholder: {chb.customerName}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1 items-start">
                                        <span className="font-black text-[var(--foreground)] text-[15px]">{chb.amount}</span>
                                        <span className="px-2.5 py-1 bg-[var(--background)] border border-[var(--border)] text-gray-600 dark:text-gray-300 text-[10px] font-black uppercase tracking-widest rounded-md mt-0.5">
                                                {chb.reason}
                                            </span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                        <span className={`text-[12px] font-black tracking-tight ${chb.status === 'Action Required' ? 'text-rose-500 animate-pulse' : 'text-gray-500'}`}>
                                            {chb.dueDate}
                                        </span>
                                </td>

                                <td className="px-6 py-5">
                                    <StatusBadge status={chb.status} />
                                </td>

                                <td className="px-6 py-5 text-right">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedDispute(chb); }}
                                        className="p-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-gray-400 hover:text-rose-500 hover:border-rose-500/30 shadow-sm transition-all"
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

            {/* 4. CHARGEBACK DETAILS MODAL */}
            {selectedDispute && (
                <div className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--card)] w-full max-w-lg h-full rounded-[2rem] border border-[var(--border)] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[var(--border)] shrink-0 bg-[var(--background)]/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-rose-500/10 rounded-xl text-rose-500">
                                    <AlertOctagon size={18} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-[var(--foreground)] tracking-tight">Dispute Details</h2>
                                    <p className="text-xs font-bold text-gray-500">{selectedDispute.id}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedDispute(null)} className="p-2 text-gray-400 hover:text-[var(--foreground)] hover:bg-[var(--card)] rounded-full transition-all border border-transparent hover:border-[var(--border)]">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">

                            {/* Hero Amount & Urgency */}
                            <div className="flex flex-col items-center justify-center mb-8">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Disputed Amount</p>
                                <h2 className="text-4xl font-black text-[var(--foreground)] tracking-tight mb-4">{selectedDispute.amount}</h2>
                                <StatusBadge status={selectedDispute.status} />
                            </div>

                            {/* Urgency Banner */}
                            {selectedDispute.status === 'Action Required' && (
                                <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-start gap-3">
                                    <Clock size={18} className="text-rose-500 shrink-0 mt-0.5 animate-pulse" />
                                    <div>
                                        <h4 className="text-[11px] font-black text-rose-600 uppercase tracking-widest mb-1">Time Sensitive</h4>
                                        <p className="text-xs font-bold text-rose-500/80 leading-relaxed">
                                            Evidence must be submitted by <span className="font-black underline">{selectedDispute.dueDate}</span> or this dispute will be automatically lost.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Evidence Upload Area (Only if actionable) */}
                            {selectedDispute.status === 'Action Required' && (
                                <div className="mb-8">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 flex items-center gap-2">
                                        <UploadCloud size={14}/> Representment Evidence
                                    </h3>
                                    <div className="border-2 border-dashed border-[var(--border)] hover:border-rose-500/50 bg-[var(--background)] rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group">
                                        <div className="p-3 bg-[var(--card)] border border-[var(--border)] rounded-full mb-3 group-hover:scale-110 transition-transform">
                                            <UploadCloud size={20} className="text-gray-400 group-hover:text-rose-500" />
                                        </div>
                                        <p className="text-sm font-black text-[var(--foreground)] mb-1">Click to upload documents</p>
                                        <p className="text-[10px] font-bold text-gray-500">PDF, JPG, or PNG (Max 5MB). Include receipts, logs, or communications.</p>
                                    </div>
                                </div>
                            )}

                            {/* Details List */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 flex items-center gap-2">
                                    <Scale size={14}/> Dispute Core
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Reason Code" value={selectedDispute.reason} />
                                    <ModalRow label="Date Filed" value={selectedDispute.filedOn} />
                                    <ModalRow label="Cardholder Name" value={selectedDispute.customerName} isLast />
                                </div>

                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 mt-8 flex items-center gap-2">
                                    <CreditCard size={14}/> Original Transaction
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Transaction ID" value={selectedDispute.transactionId} copyable onCopy={() => handleCopy(selectedDispute.transactionId, 'tx')} copied={copied === 'tx'} />
                                    <ModalRow label="Merchant" value={selectedDispute.business} isLast />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        {selectedDispute.status === 'Action Required' ? (
                            <div className="p-6 border-t border-[var(--border)] shrink-0 flex gap-3 bg-[var(--background)]/50">
                                <button className="flex-1 py-3 border border-[var(--border)] bg-[var(--card)] hover:bg-gray-50 dark:hover:bg-gray-800 text-[var(--foreground)] text-xs font-black rounded-xl transition-all shadow-sm">
                                    Accept Liability
                                </button>
                                <button className="flex-1 py-3 bg-rose-600 text-white text-xs font-black rounded-xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-500/20">
                                    Submit Evidence
                                </button>
                            </div>
                        ) : (
                            <div className="p-6 border-t border-[var(--border)] shrink-0 flex justify-end bg-[var(--background)]/50">
                                <button onClick={() => setSelectedDispute(null)} className="px-8 py-3 bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--background)] text-xs font-black rounded-xl transition-all shadow-sm">
                                    Close Window
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </DashboardLayout>
    );

    // --- REUSABLE COMPONENTS ---
    function StatCard({ label, value, subValue, color = "text-[var(--foreground)]", isAlert = false }: any) {
        return (
            <div className={`bg-[var(--card)] p-6 rounded-[2rem] border shadow-sm transition-colors ${
                isAlert ? "border-rose-500/30 hover:border-rose-500/50 bg-rose-500/5" : "border-[var(--border)] hover:border-rose-500/30"
            }`}>
                <div className="flex justify-between items-start mb-2">
                    <p className={`text-[10px] font-black uppercase tracking-widest ${isAlert ? "text-rose-500" : "text-gray-400"}`}>{label}</p>
                    {isAlert && <ShieldAlert size={14} className="text-rose-500" />}
                </div>
                <h3 className={`text-2xl font-black tracking-tight mb-1 ${color}`}>{value}</h3>
                <p className="text-[11px] font-bold text-gray-500">{subValue}</p>
            </div>
        );
    }

    function FilterSelect({ label, options }: { label: string, options: string[] }) {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
                <select className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-rose-500 transition-all appearance-none cursor-pointer">
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
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-rose-500 transition-all dark:[color-scheme:dark]"
                />
            </div>
        );
    }

    function StatusBadge({ status }: { status: ChargebackStatus }) {
        const config = {
            'Action Required': { bg: 'bg-rose-500/10', text: 'text-rose-600', border: 'border-rose-500/20', icon: <AlertOctagon size={12}/> },
            'Under Review': { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/20', icon: <Clock size={12}/> },
            'Won': { bg: 'bg-[#00823B]/10', text: 'text-[#00823B]', border: 'border-[#00823B]/20', icon: <CheckCircle2 size={12}/> },
            'Lost': { bg: 'bg-gray-500/10', text: 'text-gray-500', border: 'border-gray-500/20', icon: <XCircle size={12}/> },
            'Accepted': { bg: 'bg-gray-500/10', text: 'text-gray-500', border: 'border-gray-500/20', icon: <Check size={12}/> },
        }[status];

        return (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${config.bg} ${config.text} ${config.border} border text-[10px] font-black uppercase tracking-widest`}>
                {status === 'Action Required' && <div className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></div>}
                {status !== 'Action Required' && config.icon}
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
                        <button onClick={onCopy} className="text-gray-400 hover:text-rose-500 transition-colors">
                            {copied ? <Check size={14} className="text-rose-500" /> : <Copy size={14} />}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}