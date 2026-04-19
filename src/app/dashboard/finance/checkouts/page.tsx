"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    ShoppingCart, Search, Filter, Download, Calendar,
    CheckCircle2, XCircle, Clock, Eye, X, Copy, Check,
    Building2, CreditCard, Hash, AlertTriangle, Smartphone,
    Globe, User, ArrowUpRight
} from "lucide-react";

// --- TYPES ---
type CheckoutStatus = 'Successful' | 'Pending' | 'Abandoned' | 'Failed';

type CheckoutSession = {
    id: string;
    reference: string;
    business: string;
    amount: string;
    customerEmail: string;
    customerName?: string;
    paymentMethod: 'Card' | 'Bank Transfer' | 'USSD' | 'QR Code' | 'Pending';
    status: CheckoutStatus;
    date: string;
    device: string;
    ipAddress: string;
    riskScore: 'Low' | 'Medium' | 'High';
};

export default function CheckoutsPage() {
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSession, setSelectedSession] = useState<CheckoutSession | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    // --- MOCK DATA ---
    const checkouts: CheckoutSession[] = [
        { id: "CHK-9910293", reference: "ORD-8829102", business: "Machika Telecoms", amount: "₦15,000.00", customerEmail: "j.doe@gmail.com", customerName: "John Doe", paymentMethod: 'Card', status: 'Successful', date: "Today, 10:24 AM", device: "iPhone 14 Pro / Safari", ipAddress: "197.210.64.12", riskScore: 'Low' },
        { id: "CHK-9910294", reference: "INV-2026-04", business: "AfriClique Logistics", amount: "₦450,000.00", customerEmail: "sarah.j@company.com", paymentMethod: 'Bank Transfer', status: 'Pending', date: "Today, 09:15 AM", device: "Windows 11 / Chrome", ipAddress: "102.89.34.211", riskScore: 'Low' },
        { id: "CHK-9910295", reference: "CART-9011", business: "Global Foodies", amount: "₦8,500.00", customerEmail: "mike1990@yahoo.com", paymentMethod: 'Pending', status: 'Abandoned', date: "Today, 08:30 AM", device: "Android / Chrome Mobile", ipAddress: "41.190.2.45", riskScore: 'Medium' },
        { id: "CHK-9910296", reference: "ORD-8829000", business: "Green Energy Ltd", amount: "₦5,400.00", customerEmail: "aisha.bello@outlook.com", paymentMethod: 'USSD', status: 'Failed', date: "Yesterday, 18:45 PM", device: "Unknown / API", ipAddress: "197.210.12.9", riskScore: 'Low' },
        { id: "CHK-9910297", reference: "SUB-MONTHLY", business: "Isakharu Tech", amount: "₦120,000.00", customerEmail: "david.smith@tech.io", customerName: "David Smith", paymentMethod: 'Card', status: 'Successful', date: "Yesterday, 14:20 PM", device: "MacBook Pro / Edge", ipAddress: "154.120.89.3", riskScore: 'Low' },
        { id: "CHK-9910298", reference: "ORD-8828999", business: "Acme Retail", amount: "₦34,000.00", customerEmail: "fraud.alert@suspicious.net", paymentMethod: 'Card', status: 'Failed', date: "Yesterday, 11:10 AM", device: "Linux / Tor Browser", ipAddress: "185.220.101.4", riskScore: 'High' },
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
                    <div className="p-2.5 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-lg shadow-teal-500/20">
                        <ShoppingCart size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Checkout Sessions</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Monitor live payment gateway sessions and drop-off rates</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-600 hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-all shadow-sm">
                        <Calendar size={14} className="text-teal-500" /> Today
                    </button>
                    <button className="flex items-center gap-2 bg-[#1F2937] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg hover:bg-gray-800 transition-all">
                        <Download size={14} /> Export Sessions
                    </button>
                </div>
            </div>

            {/* 2. KPI METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard label="Checkout Volume" value="₦4,850,000" subValue="Today's attempted value" color="text-[var(--foreground)]" />
                <StatCard label="Conversion Rate" value="76.2%" subValue="+1.4% from yesterday" color="text-teal-500" />
                <StatCard label="Abandoned Checkouts" value="18.5%" subValue="User dropped off" color="text-amber-500" />
                <StatCard label="High Risk Sessions" value="12" subValue="Blocked by fraud engine" color="text-red-500" />
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
                                placeholder="Search by Session ID, Customer Email, or Amount..."
                                className="w-full pl-12 pr-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-[var(--foreground)]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-black transition-all border ${
                                showFilters
                                    ? "bg-teal-500/10 text-teal-600 border-teal-500/30"
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
                                <FilterSelect label="Status" options={["All Statuses", "Successful", "Pending", "Abandoned", "Failed"]} />
                                <FilterSelect label="Payment Method" options={["All Methods", "Card", "Bank Transfer", "USSD", "QR Code"]} />
                                <FilterSelect label="Risk Level" options={["All Risk Levels", "Low", "Medium", "High"]} />
                                <FilterDate label="From Date" />
                                <FilterDate label="To Date" />
                                <div className="flex items-end lg:col-span-5">
                                    <button className="w-full md:w-auto px-8 py-2.5 bg-teal-500 text-white rounded-xl text-xs font-black hover:bg-teal-600 transition-all shadow-md shadow-teal-500/20">Apply Filters</button>
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
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Session Details</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Merchant / Order Ref</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Customer Details</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Amount & Method</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Status</th>
                            <th className="px-6 py-5"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {checkouts.map((chk) => (
                            <tr key={chk.id} className="hover:bg-teal-500/5 transition-colors group cursor-pointer" onClick={() => setSelectedSession(chk)}>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[14px] group-hover:text-teal-500 transition-colors">{chk.id}</span>
                                        <span className="text-[10px] font-bold text-gray-400 mt-1">{chk.date}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1.5 items-start">
                                            <span className="flex items-center gap-1.5 font-black text-[var(--foreground)] text-[13px]">
                                                <Building2 size={12} className="text-gray-400" /> {chk.business}
                                            </span>
                                        <span className="px-2 py-0.5 bg-[var(--background)] border border-[var(--border)] text-gray-500 text-[10px] font-mono font-bold rounded">
                                                {chk.reference}
                                            </span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        {chk.customerName && <span className="font-black text-[var(--foreground)] text-[13px]">{chk.customerName}</span>}
                                        <span className="text-[11px] font-bold text-gray-500">{chk.customerEmail}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1 items-start">
                                        <span className="font-black text-[var(--foreground)] text-[15px]">{chk.amount}</span>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                                                <CreditCard size={10} className="text-teal-500"/> {chk.paymentMethod}
                                            </span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <StatusBadge status={chk.status} />
                                </td>

                                <td className="px-6 py-5 text-right">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedSession(chk); }}
                                        className="p-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-gray-400 hover:text-teal-500 hover:border-teal-500/30 shadow-sm transition-all"
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

            {/* 4. CHECKOUT SESSION DETAILS MODAL */}
            {selectedSession && (
                <div className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--card)] w-full max-w-lg h-full rounded-[2rem] border border-[var(--border)] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[var(--border)] shrink-0 bg-[var(--background)]/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-teal-500/10 rounded-xl text-teal-500">
                                    <ShoppingCart size={18} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-[var(--foreground)] tracking-tight">Checkout Session</h2>
                                    <p className="text-xs font-bold text-gray-500">{selectedSession.date}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedSession(null)} className="p-2 text-gray-400 hover:text-[var(--foreground)] hover:bg-[var(--card)] rounded-full transition-all border border-transparent hover:border-[var(--border)]">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">

                            {/* Hero Amount */}
                            <div className="flex flex-col items-center justify-center mb-8">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Checkout Amount</p>
                                <h2 className="text-4xl font-black text-[var(--foreground)] tracking-tight mb-4">{selectedSession.amount}</h2>
                                <div className="flex items-center gap-2">
                                    <StatusBadge status={selectedSession.status} />
                                    {selectedSession.riskScore === 'High' && (
                                        <span className="px-2.5 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-md flex items-center gap-1">
                                            <AlertTriangle size={10} /> High Risk
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Details List */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 flex items-center gap-2">
                                    <Hash size={14}/> Payment Details
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Session ID" value={selectedSession.id} copyable onCopy={() => handleCopy(selectedSession.id, 'id')} copied={copied === 'id'} />
                                    <ModalRow label="Order Reference" value={selectedSession.reference} />
                                    <ModalRow label="Payment Method" value={selectedSession.paymentMethod} isLast />
                                </div>

                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 mt-8 flex items-center gap-2">
                                    <User size={14}/> Customer & Merchant
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Merchant" value={selectedSession.business} />
                                    <ModalRow label="Customer Email" value={selectedSession.customerEmail} />
                                    <ModalRow label="Customer Name" value={selectedSession.customerName || "Not Provided"} isLast />
                                </div>

                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 mt-8 flex items-center gap-2">
                                    <Smartphone size={14}/> Security & Device Info
                                </h3>
                                <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-2">
                                    <ModalRow label="Device Profile" value={selectedSession.device} />
                                    <ModalRow label="IP Address" value={selectedSession.ipAddress} />
                                    <ModalRow label="Fraud Risk Score" value={selectedSession.riskScore} isLast />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-[var(--border)] shrink-0 flex justify-end bg-[var(--background)]/50">
                            <button onClick={() => setSelectedSession(null)} className="px-8 py-3 bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--background)] text-xs font-black rounded-xl transition-all shadow-sm">
                                Close Window
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
            <div className="bg-[var(--card)] p-6 rounded-[2rem] border border-[var(--border)] shadow-sm hover:border-teal-500/30 transition-colors">
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
                <select className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-teal-500 transition-all appearance-none cursor-pointer">
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
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-teal-500 transition-all dark:[color-scheme:dark]"
                />
            </div>
        );
    }

    function StatusBadge({ status }: { status: CheckoutSession['status'] }) {
        const config = {
            'Successful': { bg: 'bg-[#00823B]/10', text: 'text-[#00823B]', border: 'border-[#00823B]/20', icon: <CheckCircle2 size={12}/> },
            'Pending': { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20', icon: <Clock size={12}/> },
            'Abandoned': { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/20', icon: <AlertTriangle size={12}/> },
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
                        <button onClick={onCopy} className="text-gray-400 hover:text-teal-500 transition-colors">
                            {copied ? <Check size={14} className="text-teal-500" /> : <Copy size={14} />}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}