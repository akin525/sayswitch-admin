"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Search, Filter, X, Eye, Trash2, CreditCard, Building2,
    CheckCircle2, XCircle, Hash, Calendar, Mail, Phone, User
} from "lucide-react";

// --- TYPES ---
type VirtualAccount = {
    id: string;
    accountNumber: string;
    accountName: string;
    currency: string;
    businessName: string;
    businessEmail: string;
    provider: string;
    reference: string;
    status: 'Used' | 'Unused';
    createdAt: string;
    customerName?: string;
    customerPhone?: string;
};

export default function VirtualAccounts() {
    const [showFilters, setShowFilters] = useState(false);
    const [activeTab, setActiveTab] = useState("All Accounts");
    const [selectedAccount, setSelectedAccount] = useState<VirtualAccount | null>(null);

    // --- MOCK DATA ---
    const accounts: VirtualAccount[] = [
        { id: "1", accountNumber: "9002378600", accountName: "SAYSWITCH/Eskimo Nwa", currency: "NGN", businessName: "Falson Global services", businessEmail: "eskimonwagod@gmail.com", provider: "NETBANK", reference: "nh1hbxxksddrfm1idsnv", status: 'Unused', createdAt: "2026-03-29 12:41:13", customerName: "Eskimo Nwa", customerPhone: "09114957353" },
        { id: "2", accountNumber: "9002378590", accountName: "SAYSWITCH/billa Ibrahim bala11", currency: "NGN", businessName: "MACHIKA TELECOMS", businessEmail: "billabala728@gmail.com", provider: "NETBANK", reference: "uhkg9b74re27bsirz...", status: 'Unused', createdAt: "2026-03-28 09:15:00", customerName: "Billa Ibrahim", customerPhone: "08034567890" },
        { id: "3", accountNumber: "9002378583", accountName: "SAYSWITCH/Adebanjo Ayowole", currency: "NGN", businessName: "GIFTBILLS", businessEmail: "ayowoleolusayo1983@gmail.com", provider: "NETBANK", reference: "78ycdq34j8o8bxoqa...", status: 'Used', createdAt: "2026-03-27 14:22:10", customerName: "Adebanjo Ayowole", customerPhone: "07012345678" },
        { id: "4", accountNumber: "9002378576", accountName: "SAYSWITCH/Tboy Tboy", currency: "NGN", businessName: "Falson Global services", businessEmail: "kayjojo69@gmail.com", provider: "PROVIDUS", reference: "stxafqv5njf0yaqgh...", status: 'Unused', createdAt: "2026-03-26 11:05:44", customerName: "Tboy Tboy", customerPhone: "09087654321" },
    ];

    const tabs = ["All Accounts", "Unused Assigned", "Unused Providus", "Unused Unassigned"];

    return (
        <DashboardLayout>
            {/* 1. PAGE HEADER */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-1">
                    <CreditCard size={24} className="text-[#00823B]" />
                    <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Virtual Accounts</h1>
                </div>
                <p className="text-[13px] text-gray-500 font-medium">Manage generated virtual accounts, view details, and clear unused bins.</p>
            </div>

            {/* 2. THE CONTROL PANEL (Search, Filters, Tabs) */}
            <div className="bg-[var(--card)] rounded-[2rem] border border-[var(--border)] p-6 mb-8 shadow-sm">

                {/* Top Row: Search & Filter Toggle */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Quick search by account name, number..."
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

                {/* Advanced Filters Grid (Animated Expansion) */}
                <div className={`grid transition-all duration-300 ease-in-out ${showFilters ? "grid-rows-[1fr] opacity-100 mb-6" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-6 bg-[var(--background)] rounded-3xl border border-[var(--border)]">
                            <FilterSelect label="Currency" options={["All Currencies", "NGN", "USD"]} />
                            <FilterInput label="Business ID" placeholder="e.g. 112" />
                            <FilterSelect label="Provider" options={["All Providers", "NETBANK", "PROVIDUS"]} />
                            <FilterInput label="Account Number" placeholder="10 digits" />

                            <FilterInput label="Account Name" placeholder="Name" />
                            <FilterInput label="System Reference" placeholder="Ref code" />
                            <FilterSelect label="Usage Status" options={["All", "Used", "Unused"]} />
                            <FilterSelect label="Per Page" options={["15 records", "30 records", "50 records"]} />

                            <FilterDate label="Start Date" />
                            <FilterDate label="End Date" />

                            <div className="xl:col-span-2 flex items-end justify-end gap-4 pt-2">
                                <button onClick={() => setShowFilters(false)} className="flex items-center gap-2 text-xs font-black text-gray-500 hover:text-[var(--foreground)] transition-colors">
                                    <X size={14} /> Clear Filters
                                </button>
                                <button className="px-8 py-3 bg-[#00823B] text-white rounded-xl text-xs font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all">
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Horizontal Tabs */}
                <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2.5 rounded-xl text-[12px] font-black transition-all ${
                                activeTab === tab
                                    ? "bg-[#00823B] text-white shadow-md shadow-[#00823B]/20"
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
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Account Details</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Business Info</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Bank / Ref</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Status</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {accounts.map((acc) => (
                            <tr key={acc.id} className="hover:bg-[#00823B]/5 transition-colors group">
                                {/* Account Details */}
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[15px] tracking-tight">{acc.accountNumber}</span>
                                        <span className="text-[12px] font-bold text-gray-500">{acc.accountName}</span>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{acc.currency}</span>
                                    </div>
                                </td>

                                {/* Business Info */}
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-2 font-black text-[var(--foreground)] text-[13px]">
                                                <Building2 size={14} className="text-gray-400" /> {acc.businessName}
                                            </span>
                                        <span className="text-[11px] font-bold text-gray-500">{acc.businessEmail}</span>
                                    </div>
                                </td>

                                {/* Bank / Ref */}
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-2 items-start">
                                            <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase tracking-widest rounded-md border border-blue-500/20">
                                                {acc.provider}
                                            </span>
                                        <span className="text-[11px] font-bold text-gray-500 font-mono tracking-tight">{acc.reference}</span>
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-6 py-5">
                                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-black ${
                                            acc.status === 'Used' ? 'text-[#00823B]' : 'text-gray-500'
                                        }`}>
                                            {acc.status === 'Used' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                                            {acc.status}
                                        </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-5 text-right">
                                    <div className="flex items-center justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => setSelectedAccount(acc)}
                                            className="text-gray-400 hover:text-[#00823B] transition-colors"
                                            title="View Details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button className="text-gray-400 hover:text-red-500 transition-colors" title="Delete Bin">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 4. ACCOUNT INFORMATION MODAL */}
            {selectedAccount && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--card)] w-full max-w-2xl rounded-[2rem] border border-[var(--border)] shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[var(--border)] shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#00823B]/10 rounded-xl text-[#00823B]">
                                    <Eye size={18} />
                                </div>
                                <h2 className="text-lg font-black text-[var(--foreground)] tracking-tight">Account Information</h2>
                            </div>
                            <button onClick={() => setSelectedAccount(null)} className="p-2 text-gray-400 hover:text-[var(--foreground)] hover:bg-[var(--background)] rounded-full transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="p-8 overflow-y-auto custom-scrollbar space-y-10">

                            {/* Bank Details Section */}
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6">Bank Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                                    <ModalDetail icon={<CreditCard size={14}/>} label="Account Number" value={selectedAccount.accountNumber} isGreen />
                                    <ModalDetail icon={<Building2 size={14}/>} label="Provider Bank" value={selectedAccount.provider} />
                                    <ModalDetail icon={<User size={14}/>} label="Account Name" value={selectedAccount.accountName} />
                                    <ModalDetail icon={<Hash size={14}/>} label="Currency" value={selectedAccount.currency} />
                                    <ModalDetail icon={<Hash size={14}/>} label="System Reference" value={selectedAccount.reference} />
                                    <ModalDetail icon={<Calendar size={14}/>} label="Created At" value={selectedAccount.createdAt} />
                                </div>
                            </div>

                            <hr className="border-[var(--border)]/50" />

                            {/* Customer Information Section */}
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6">Customer Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                                    <ModalDetail icon={<User size={14}/>} label="Customer Name" value={selectedAccount.customerName || "N/A"} />
                                    <ModalDetail icon={<Phone size={14}/>} label="Phone Number" value={selectedAccount.customerPhone || "N/A"} />
                                    <ModalDetail icon={<Mail size={14}/>} label="Email Address" value={selectedAccount.businessEmail} />
                                    <ModalDetail icon={<Building2 size={14}/>} label="Business Profile" value={selectedAccount.businessName} />
                                </div>
                            </div>

                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-[var(--border)] shrink-0 flex justify-end">
                            <button onClick={() => setSelectedAccount(null)} className="px-6 py-3 border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--card)] text-[var(--foreground)] text-xs font-black rounded-xl transition-all shadow-sm">
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </DashboardLayout>
    );

    // --- REUSABLE FORM COMPONENTS FOR ADVANCED FILTERS ---
    function FilterInput({ label, placeholder }: { label: string, placeholder: string }) {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
                <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-[#00823B] transition-all placeholder:text-gray-600"
                />
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
                <div className="relative">
                    <input
                        type="date"
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-[#00823B] transition-all [color-scheme:dark]"
                    />
                </div>
            </div>
        );
    }

    // --- REUSABLE MODAL COMPONENT ---
    function ModalDetail({ icon, label, value, isGreen = false }: { icon: any, label: string, value: string, isGreen?: boolean }) {
        return (
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                    {icon}
                    <span className="text-[11px] font-bold">{label}</span>
                </div>
                <span className={`text-[14px] font-black tracking-tight ${isGreen ? 'text-[#00823B]' : 'text-[var(--foreground)]'}`}>
                    {value}
                </span>
            </div>
        );
    }
}