"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Hash, RefreshCw, Lock, ArrowLeft, Copy, Check, ShieldCheck,
    Building2, Briefcase, Search, Filter, Download, MoreHorizontal, ArrowUpRight
} from "lucide-react";
import Link from "next/link";

export default function BusinessDetails({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState("Business");

    // --- MOCK DATA ---
    const businessData = {
        name: "MACHIKA TELECOMS",
        bizId: "112",
        userId: "100",
        tin: "N/A",
        status: "ACTIVE",
        mode: "LIVE MODE",
        dateCreated: "Jul 17, 2025 • 12:59 PM",
        email: "machikatelecoms@gmail.com",
        phone: "07025245508",
        industry: "BILLS PAYMENT",
        address: "Old Goruba Road Gra, KATSINA, Katsina"
    };

    const tabs = ["Business", "Edit Business", "Transactions", "Payout", "Settlement", "Wallets", "Wallet Transactions", "Teams"];

    // --- RENDER TAB CONTENT ---
    const renderTabContent = () => {
        switch (activeTab) {
            case "Business":
                return <TabBusiness data={businessData} />;
            case "Edit Business":
                return <TabEditBusiness data={businessData} />;
            case "Transactions":
                return <TabTransactions />;
            case "Wallets":
                return <TabWallets />;
            // Add remaining tabs here as we build them...
            default:
                return <TabPlaceholder tabName={activeTab} />;
        }
    };
    return (
        <DashboardLayout>
            {/* 1. TOP NAV & GLASS HEADER */}
            <div className="relative mb-8 overflow-hidden rounded-[2.5rem] border border-[var(--border)] bg-[var(--card)] shadow-sm">
                {/* Branding Banner */}
                <div className="h-24 w-full bg-gradient-to-r from-[#00823B] via-[#00A84D] to-[#00823B] relative">
                    <Link href="/dashboard/business/directory" className="absolute top-4 left-6 flex items-center gap-2 text-white/80 hover:text-white font-bold text-xs bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-lg transition-all">
                        <ArrowLeft size={14} /> Back
                    </Link>
                </div>

                <div className="px-8 pb-8">
                    <div className="relative -mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6">

                        <div className="flex items-center gap-6">
                            {/* Avatar */}
                            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-3xl border-4 border-[var(--card)] bg-gradient-to-br from-[#005C29] to-[#00823B] shadow-2xl flex items-center justify-center text-4xl font-black text-white">
                                {businessData.name.charAt(0)}
                            </div>

                            <div className="flex flex-col gap-1.5 pt-6">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-2xl font-black text-[var(--foreground)] tracking-tight uppercase">{businessData.name}</h1>
                                    <div className="flex gap-2">
                                        <span className="bg-[#00823B]/10 text-[#00823B] text-[9px] font-black px-2 py-0.5 rounded border border-[#00823B]/20">{businessData.status}</span>
                                        <span className="bg-blue-500/10 text-blue-500 text-[9px] font-black px-2 py-0.5 rounded border border-blue-500/20">{businessData.mode}</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                    <span className="flex items-center gap-1"><Hash size={12} className="text-[#00823B]"/> Biz ID: {businessData.bizId}</span>
                                    <span className="text-[var(--border)]">|</span>
                                    <span className="flex items-center gap-1">User ID: {businessData.userId}</span>
                                    <span className="text-[var(--border)]">|</span>
                                    <span>TIN: {businessData.tin}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-6">
                            <button className="flex items-center gap-2 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] px-4 py-2.5 rounded-xl text-xs font-black hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                                <RefreshCw size={14} /> Refresh
                            </button>
                            <button className="flex items-center gap-2 bg-red-500/10 text-red-500 px-6 py-2.5 rounded-xl text-xs font-black hover:bg-red-500 hover:text-white transition-all border border-red-500/20">
                                <Lock size={14} /> Block Business
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. NAVIGATION TABS */}
            <div className="border-b border-[var(--border)] mb-8 overflow-x-auto scrollbar-hide">
                <div className="flex gap-8 px-2 min-w-max">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-[11px] font-black uppercase tracking-widest transition-all relative ${
                                activeTab === tab
                                    ? "text-[#00823B]"
                                    : "text-gray-400 hover:text-[var(--foreground)]"
                            }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#00823B] rounded-t-full shadow-[0_0_10px_#00823B]"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. DYNAMIC TAB CONTENT AREA */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {renderTabContent()}
            </div>

        </DashboardLayout>
    );
}

// ============================================================================
// TAB COMPONENTS
// ============================================================================

function TabBusiness({ data }: { data: any }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Merchant Identity Card */}
            <div className="bg-[var(--card)] rounded-[2rem] border border-[var(--border)] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#00823B]/10 rounded-xl text-[#00823B]">
                            <ShieldCheck size={20} />
                        </div>
                        <h2 className="text-sm font-black uppercase tracking-[0.1em] text-[var(--foreground)]">Merchant Identity</h2>
                    </div>
                    <button onClick={() => handleCopy(data.email)} className="text-gray-400 hover:text-[#00823B] transition-colors">
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                </div>
                <div className="space-y-1">
                    <DetailRow label="Full Name" value="YUSUF TASIU MACHIKA" />
                    <DetailRow label="Email Address" value={data.email} isGreen />
                    <DetailRow label="Phone Number" value={data.phone} />
                    <DetailRow label="Provided ID" value="NIN (29608783941)" />
                    <DetailRow label="BVN" value="22619599977" isLast />
                </div>
            </div>

            {/* Business Profile Card */}
            <div className="bg-[var(--card)] rounded-[2rem] border border-[var(--border)] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-[#00823B]/10 rounded-xl text-[#00823B]">
                        <Building2 size={20} />
                    </div>
                    <h2 className="text-sm font-black uppercase tracking-[0.1em] text-[var(--foreground)]">Business Profile</h2>
                </div>
                <div className="space-y-1">
                    <DetailRow label="Industry" value={data.industry} />
                    <DetailRow label="Business Type" value="Registered Business" />
                    <DetailRow label="Support Email" value={data.email} />
                    <DetailRow label="Full Address" value={data.address} isLast />
                </div>
            </div>
        </div>
    );
}

function TabTransactions() {
    const mockTx = [
        { id: "TX-9910", amount: "₦45,000", type: "Payment", status: "Success", date: "Today, 10:24 AM" },
        { id: "TX-9911", amount: "₦12,500", type: "Transfer", status: "Pending", date: "Today, 09:12 AM" },
        { id: "TX-9912", amount: "₦150,000", type: "Settlement", status: "Success", date: "Yesterday" },
    ];

    return (
        <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] shadow-sm overflow-hidden flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-[var(--border)] gap-4 bg-[var(--background)]/30">
                <div className="flex items-center gap-2">
                    <h2 className="text-sm font-black text-[var(--foreground)] uppercase tracking-wide">Recent Transactions</h2>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search transactions..." className="w-full pl-9 pr-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[13px] outline-none focus:ring-2 focus:ring-[#00823B]/20 focus:border-[#00823B] transition-all" />
                    </div>
                    <button className="flex items-center gap-2 border border-[var(--border)] px-4 py-2 rounded-xl text-[13px] font-bold text-gray-600 hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-colors bg-[var(--card)]">
                        <Filter size={14} /> Filter
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-[var(--card)] border-b border-[var(--border)]">
                    <tr>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction ID</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                        <th className="px-6 py-4"></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)] bg-[var(--card)]">
                    {mockTx.map((trx, idx) => (
                        <tr key={idx} className="hover:bg-[var(--background)]/50 transition-colors group cursor-pointer">
                            <td className="px-6 py-4 font-bold text-gray-500">{trx.id}</td>
                            <td className="px-6 py-4 font-black text-[var(--foreground)]">{trx.amount}</td>
                            <td className="px-6 py-4 font-bold text-gray-500">{trx.type}</td>
                            <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                        trx.status === 'Success' ? 'bg-[#00823B]/10 text-[#00823B] border-[#00823B]/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                    }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${trx.status === 'Success' ? 'bg-[#00823B]' : 'bg-amber-500'}`}></div>
                                        {trx.status}
                                    </span>
                            </td>
                            <td className="px-6 py-4 text-[11px] font-bold text-gray-500">{trx.date}</td>
                            <td className="px-6 py-4 text-right">
                                <button className="p-2 text-gray-400 hover:text-[#00823B] rounded-lg hover:bg-[var(--background)] transition-colors">
                                    <ArrowUpRight size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function TabPlaceholder({ tabName }: { tabName: string }) {
    return (
        <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] border-dashed p-20 flex flex-col items-center justify-center text-center">
            <div className="p-4 bg-[var(--background)] rounded-full mb-4">
                <Briefcase size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-black text-[var(--foreground)]">No data found for {tabName}</h3>
            <p className="text-sm text-gray-500 max-w-xs mt-2 font-medium">There are currently no records or configurations available in this section.</p>
        </div>
    );
}

// --- HELPER COMPONENT ---
function DetailRow({ label, value, isGreen = false, isLast = false }: any) {
    return (
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between py-4 ${!isLast ? "border-b border-[var(--border)]/50" : ""}`}>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">{label}</span>
            <span className={`text-[13px] font-black text-left sm:text-right ${isGreen ? "text-[#00823B]" : "text-[var(--foreground)]"}`}>
                {value}
            </span>
        </div>
    );
}
function TabEditBusiness({ data }: { data: any }) {
    return (
        <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] shadow-sm p-8 lg:p-10">
            <div className="mb-8 border-b border-[var(--border)]/50 pb-6">
                <h2 className="text-lg font-black uppercase tracking-widest text-[var(--foreground)] mb-2">Edit Business Profile</h2>
                <p className="text-sm text-gray-500 font-medium">Update the merchant's core identity and contact information.</p>
            </div>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                {/* Identity Section */}
                <div>
                    <h3 className="text-xs font-black text-[#00823B] uppercase tracking-[0.2em] mb-4">Core Identity</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Business Name" defaultValue={data.name} />
                        <FormInput label="Industry" defaultValue={data.industry} />
                        <FormInput label="Business Category" defaultValue="Telecommunications" />
                        <FormInput label="Tax Identification Number (TIN)" defaultValue={data.tin} placeholder="Enter TIN" />
                    </div>
                </div>

                <hr className="border-[var(--border)]/50" />

                {/* Contact Section */}
                <div>
                    <h3 className="text-xs font-black text-[#00823B] uppercase tracking-[0.2em] mb-4">Contact Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Support Email" type="email" defaultValue={data.email} />
                        <FormInput label="Support Phone" type="tel" defaultValue={data.phone} />
                        <div className="md:col-span-2">
                            <FormInput label="Full Registered Address" defaultValue={data.address} />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <button type="button" className="px-6 py-3 rounded-xl text-xs font-bold text-gray-500 hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-all border border-transparent hover:border-[var(--border)]">
                        Cancel Changes
                    </button>
                    <button type="submit" className="px-8 py-3 bg-[#00823B] text-white rounded-xl text-xs font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all">
                        Save Configuration
                    </button>
                </div>
            </form>
        </div>
    );
}

// Reusable Form Input Component
function FormInput({ label, type = "text", defaultValue, placeholder }: any) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
            <input
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-bold text-[var(--foreground)] outline-none focus:border-[#00823B] focus:ring-1 focus:ring-[#00823B] transition-all placeholder:text-gray-600 placeholder:font-medium"
            />
        </div>
    );
}


function TabWallets() {
    return (
        <div className="space-y-8">
            {/* Wallet Balances Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <WalletCard currency="NGN" label="Main NGN Wallet" balance="₦4,525,490.19" isActive />
                <WalletCard currency="USD" label="USD Settlement" balance="$1,240.50" />
                <WalletCard currency="KES" label="Kenya Shilling" balance="KSh 0.00" />
            </div>

            {/* Quick Ledger Summary */}
            <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-black text-[var(--foreground)] tracking-tight">Ledger Summary (NGN)</h3>
                    <button className="text-xs font-bold text-[#00823B] hover:text-[#005C29] uppercase tracking-widest">View Full Ledger &rarr;</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <LedgerStat label="Total Inflow" value="₦28,450,000.00" isPositive />
                    <LedgerStat label="Total Outflow" value="₦23,924,509.81" />
                    <LedgerStat label="Total Fees Paid" value="₦125,400.00" />
                </div>
            </div>
        </div>
    );
}

// Sub-components for Wallets
function WalletCard({ currency, label, balance, isActive = false }: any) {
    return (
        <div className={`rounded-[2rem] border p-6 transition-all ${
            isActive
                ? "bg-gradient-to-br from-[#005C29] to-[#00823B] border-transparent shadow-[0_8px_20px_rgba(0,130,59,0.2)]"
                : "bg-[var(--card)] border-[var(--border)] hover:border-[#00823B]/50"
        }`}>
            <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black shadow-inner ${
                    isActive ? "bg-white/20 text-white" : "bg-[var(--background)] text-gray-500"
                }`}>
                    {currency}
                </div>
                {isActive && (
                    <span className="px-3 py-1 bg-white/20 text-white text-[9px] font-black uppercase rounded-full border border-white/10 tracking-widest">
                        Primary
                    </span>
                )}
            </div>
            <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isActive ? "text-white/70" : "text-gray-400"}`}>{label}</p>
            <h3 className={`text-2xl font-black tracking-tight ${isActive ? "text-white" : "text-[var(--foreground)]"}`}>{balance}</h3>
        </div>
    );
}

function LedgerStat({ label, value, isPositive = false }: any) {
    return (
        <div className="p-5 rounded-2xl bg-[var(--background)] border border-[var(--border)]">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{label}</p>
            <p className={`text-lg font-black tracking-tight ${isPositive ? "text-[#00823B]" : "text-[var(--foreground)]"}`}>{value}</p>
        </div>
    );
}