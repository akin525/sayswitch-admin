"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Hash, RefreshCw, Lock, ArrowLeft, Copy, Check, ShieldCheck,
    Building2, Briefcase, Search, Filter, Download, MoreHorizontal,
    ArrowUpRight, Globe, DollarSign, Percent, Target, Edit2, Eye,
    Plus, X, Info, BookOpen, Calculator, Settings, MoreVertical,
    ChevronDown, CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function BusinessDetails({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState("Fees");

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

    const tabs = ["Business", "Edit Business", "Transactions", "Payout", "Settlement", "Wallets", "Wallet Transactions", "Teams", "Fees"];

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
            case "Fees":
                return <TabFees />;
            default:
                return <TabPlaceholder tabName={activeTab} />;
        }
    };

    return (
        <DashboardLayout>
            {/* 1. TOP NAV & GLASS HEADER */}
            <div className="relative mb-8 overflow-hidden rounded-[2.5rem] border border-[var(--border)] bg-[var(--card)] shadow-sm">
                <div className="h-24 w-full bg-gradient-to-r from-[#00823B] via-[#00A84D] to-[#00823B] relative">
                    <Link href="/dashboard/business/directory" className="absolute top-4 left-6 flex items-center gap-2 text-white/80 hover:text-white font-bold text-xs bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-lg transition-all">
                        <ArrowLeft size={14} /> Back
                    </Link>
                </div>

                <div className="px-8 pb-8">
                    <div className="relative -mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
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

// --- FEES TAB ---
function TabFees() {
    // Modal State Management
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        type: 'collection' | 'payout';
        action: 'create' | 'edit';
    }>({
        isOpen: false,
        type: 'collection',
        action: 'create',
    });

    const openModal = (type: 'collection' | 'payout', action: 'create' | 'edit') => {
        setModalState({ isOpen: true, type, action });
    };

    const closeModal = () => {
        setModalState({ ...modalState, isOpen: false });
    };

    // Mock Fee Data
    const collectionFees = [
        { title: "dedicated", subtitle: "Collection Fee", type: "Flat Rate", value: "dedicated 10", cap: "dedicated 10", active: true },
        { title: "NGN", subtitle: "Collection Fee", type: "Flat Rate", value: "NGN 10", cap: "NGN 10", active: true },
        { title: "USD", subtitle: "Collection Fee", type: "Flat Rate", value: "USD 0.05", cap: "USD 0.05", active: true },
        { title: "ZAR", subtitle: "Collection Fee", type: "Percentage", value: "0.1%", cap: "ZAR 0.1", active: true },
        { title: "BANKTRANSFER", subtitle: "Collection Fee", type: "Flat Rate", value: "BANKTRANSFER 10", cap: "BANKTRANSFER 10", active: true },
        { title: "USSD", subtitle: "Collection Fee", type: "Flat Rate", value: "USSD 10", cap: "USSD 10", active: true }
    ];

    const payoutFees = [
        { title: "NGN", subtitle: "Payout Fee", type: "Flat Rate", value: "NGN 10", range: "NGN 1000000", min: "NGN 10", max: "NGN 10", active: true }
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search fees by currency or type..."
                        className="w-full pl-10 pr-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-[13px] outline-none focus:ring-2 focus:ring-[#00823B]/20 focus:border-[#00823B] transition-all shadow-sm"
                    />
                </div>
                <div className="relative min-w-[160px] w-full sm:w-auto">
                    <select className="w-full appearance-none bg-[var(--card)] border border-[var(--border)] rounded-2xl px-4 py-3 pr-10 text-[13px] font-bold outline-none focus:ring-2 focus:ring-[#00823B]/20 focus:border-[#00823B] shadow-sm cursor-pointer">
                        <option>All Fees</option>
                        <option>Collection Fees</option>
                        <option>Payout Fees</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
            </div>

            {/* Collection Fees */}
            <div className="bg-[var(--card)] rounded-[2rem] border border-[var(--border)] p-6 md:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-[#00823B]/10 rounded-xl text-[#00823B]">
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <h2 className="text-[15px] font-black text-[var(--foreground)]">Collection Fees</h2>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{collectionFees.length} fees configured</p>
                        </div>
                    </div>
                    <button
                        onClick={() => openModal('collection', 'create')}
                        className="flex items-center justify-center gap-2 bg-[#00823B] text-white px-5 py-2.5 rounded-xl text-[12px] font-black hover:bg-[#005C29] transition-all shadow-lg shadow-[#00823B]/20"
                    >
                        <Plus size={16} /> Add Collection Fee
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {collectionFees.map((fee, idx) => (
                        <FeeCard key={idx} data={fee} onEdit={() => openModal('collection', 'edit')} />
                    ))}
                </div>
            </div>

            {/* Payout Fees */}
            <div className="bg-[var(--card)] rounded-[2rem] border border-[var(--border)] p-6 md:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-green-500/10 rounded-xl text-green-500 border border-green-500/20">
                            <DollarSign size={20} />
                        </div>
                        <div>
                            <h2 className="text-[15px] font-black text-[var(--foreground)]">Payout Fees</h2>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{payoutFees.length} fee configured</p>
                        </div>
                    </div>
                    <button
                        onClick={() => openModal('payout', 'create')}
                        className="flex items-center justify-center gap-2 bg-[#00823B] text-white px-5 py-2.5 rounded-xl text-[12px] font-black hover:bg-[#005C29] transition-all shadow-lg shadow-[#00823B]/20"
                    >
                        <Plus size={16} /> Add Payout Fee
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {payoutFees.map((fee, idx) => (
                        <PayoutFeeCard key={idx} data={fee} onEdit={() => openModal('payout', 'edit')} />
                    ))}
                </div>
            </div>

            {/* Best Practices */}
            <div className="bg-indigo-50 dark:bg-indigo-500/5 rounded-[2rem] border border-indigo-100 dark:border-indigo-500/20 p-6 flex items-start gap-4 shadow-sm">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full shrink-0">
                    <Info size={20} />
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-black text-indigo-950 dark:text-indigo-100">Fee Management Best Practices</h3>
                    <p className="text-[13px] text-indigo-800/80 dark:text-indigo-300 font-medium">
                        Optimize your fee structures to balance profitability with competitive pricing. Consider market rates and transaction volumes when setting fees.
                    </p>
                    <div className="flex flex-wrap items-center gap-5 mt-2 text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                        <a href="#" className="flex items-center gap-1.5 hover:text-indigo-800 transition-colors"><Globe size={14}/> View Documentation</a>
                        <a href="#" className="flex items-center gap-1.5 hover:text-indigo-800 transition-colors"><Calculator size={14}/> Fee Calculator</a>
                        <a href="#" className="flex items-center gap-1.5 hover:text-indigo-800 transition-colors"><Settings size={14}/> Advanced Settings</a>
                    </div>
                </div>
            </div>

            {/* Dynamic Modal Component */}
            {modalState.isOpen && (
                <DynamicFeeModal
                    onClose={closeModal}
                    type={modalState.type}
                    action={modalState.action}
                />
            )}
        </div>
    );
}

// --- SUB-COMPONENTS FOR FEES ---

function FeeCard({ data, onEdit }: any) {
    return (
        <div className="group bg-[var(--background)] rounded-[1.5rem] border border-[var(--border)] p-5 hover:border-[#00823B]/30 hover:shadow-md transition-all flex flex-col gap-4 relative overflow-hidden bg-white dark:bg-gray-900">
            <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                    <div className="w-11 h-11 rounded-[0.8rem] bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center text-white shadow-sm shrink-0">
                        <Globe size={22} />
                    </div>
                    <div>
                        <h3 className="font-black text-[var(--foreground)] text-sm">{data.title}</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{data.subtitle}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {data.active && (
                        <span className="bg-[#00823B]/10 text-[#00823B] border border-[#00823B]/20 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Active
                        </span>
                    )}
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1">
                        <MoreVertical size={16} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-3 mt-1">
                <div className="flex justify-between items-center text-[13px]">
                    <div className="flex items-center gap-2 text-gray-500 text-[11px] font-black uppercase tracking-wider">
                        {data.type === 'Percentage' ? <Percent size={14} className="text-[#00823B]"/> : <DollarSign size={14} className="text-[#00823B]"/>}
                        {data.type}
                    </div>
                    <div className="font-black text-[var(--foreground)]">{data.value}</div>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                    <div className="flex items-center gap-2 text-gray-500 text-[11px] font-black uppercase tracking-wider">
                        <Target size={14} className="text-[#E85D04]"/>
                        Cap Value
                    </div>
                    <div className="font-black text-[var(--foreground)]">{data.cap}</div>
                </div>
            </div>

            <div className="hidden group-hover:flex items-center gap-2 mt-2 pt-4 border-t border-[var(--border)]/60 animate-in fade-in slide-in-from-top-2 duration-200">
                <button onClick={onEdit} className="flex-1 bg-[#00823B]/10 text-[#00823B] font-black text-[11px] uppercase tracking-widest py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-[#00823B]/20 transition-colors">
                    <Edit2 size={14}/> Edit
                </button>
                <button className="p-2 bg-[var(--background)] border border-[var(--border)] text-gray-500 rounded-xl hover:text-[var(--foreground)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Eye size={16}/>
                </button>
                <button className="p-2 bg-[var(--background)] border border-[var(--border)] text-gray-500 rounded-xl hover:text-[var(--foreground)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Copy size={16}/>
                </button>
            </div>
        </div>
    );
}

function PayoutFeeCard({ data, onEdit }: any) {
    return (
        <div className="group bg-[var(--background)] rounded-[1.5rem] border border-[var(--border)] p-5 hover:border-[#00823B]/30 hover:shadow-md transition-all flex flex-col gap-4 relative bg-white dark:bg-gray-900">
            <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                    <div className="w-11 h-11 rounded-[0.8rem] bg-gradient-to-br from-indigo-500 to-blue-400 flex items-center justify-center text-white shadow-sm shrink-0">
                        <Globe size={22} />
                    </div>
                    <div>
                        <h3 className="font-black text-[var(--foreground)] text-sm">{data.title}</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{data.subtitle}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {data.active && (
                        <span className="bg-[#00823B]/10 text-[#00823B] border border-[#00823B]/20 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Active
                        </span>
                    )}
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1">
                        <MoreVertical size={16} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-2.5 mt-1">
                <div className="flex justify-between items-center text-[13px]">
                    <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-wider">
                        <DollarSign size={14} className="text-[#00823B]"/> Flat Rate
                    </div>
                    <div className="font-black text-[var(--foreground)]">{data.value}</div>
                </div>
                <div className="flex justify-between items-center text-[13px] pb-3 border-b border-[var(--border)]/50">
                    <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-wider">
                        <ArrowUpRight size={14} className="text-purple-500"/> Range Set
                    </div>
                    <div className="font-black text-[var(--foreground)]">{data.range}</div>
                </div>

                <div className="flex justify-between items-center pt-1">
                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Min Fee</span>
                        <span className="text-[11px] font-black text-[var(--foreground)]">{data.min}</span>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Max Fee</span>
                        <span className="text-[11px] font-black text-[var(--foreground)]">{data.max}</span>
                    </div>
                </div>
            </div>

            <div className="hidden group-hover:flex items-center gap-2 mt-2 pt-2 border-t border-[var(--border)]/60 animate-in fade-in slide-in-from-top-2 duration-200">
                <button onClick={onEdit} className="flex-1 bg-[#00823B]/10 text-[#00823B] font-black text-[11px] uppercase tracking-widest py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-[#00823B]/20 transition-colors">
                    <Edit2 size={14}/> Edit
                </button>
                <button className="p-2 bg-[var(--background)] border border-[var(--border)] text-gray-500 rounded-xl hover:text-[var(--foreground)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Eye size={16}/>
                </button>
                <button className="p-2 bg-[var(--background)] border border-[var(--border)] text-gray-500 rounded-xl hover:text-[var(--foreground)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Copy size={16}/>
                </button>
            </div>
        </div>
    );
}

// --- DYNAMIC UNIFIED MODAL ---
function DynamicFeeModal({ onClose, type, action }: { onClose: () => void, type: 'collection' | 'payout', action: 'create' | 'edit' }) {
    // Determine active styling for the Fee Type buttons
    const [selectedFeeType, setSelectedFeeType] = useState(action === 'create' ? 'select' : 'flat');

    // Dynamic strings based on props
    const titleText = `${action === 'edit' ? 'Edit' : 'Create'} ${type} Fee`;
    const subtitleText = action === 'edit' ? 'Update existing fee configuration' : 'Set up a new fee structure';
    const buttonText = action === 'edit' ? 'Update Fee' : 'Create Fee';

    // Icon configuration for Header
    const HeaderIcon = action === 'create' ? Plus : Edit2;
    const headerIconColorClasses = action === 'create'
        ? 'bg-[#00823B]/10 text-[#00823B] border-[#00823B]/20'
        : 'bg-green-500/10 text-[#00823B] border-[#00823B]/20';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-[var(--card)] w-full max-w-2xl rounded-[2rem] shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl border ${headerIconColorClasses}`}>
                            <HeaderIcon size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-[var(--foreground)] capitalize">{titleText}</h2>
                            <p className="text-xs font-bold text-gray-500">{subtitleText}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:bg-[var(--background)] hover:text-[var(--foreground)] rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                    {/* Currency Select (Simulated Dropdown state) */}
                    <div className="space-y-2 relative">
                        <label className="text-[11px] font-black text-[var(--foreground)] uppercase tracking-wider">Currency / Payment Method</label>
                        <div className="border border-transparent ring-1 ring-[var(--border)] hover:ring-[#00823B]/50 rounded-xl bg-[var(--background)] focus-within:ring-[#00823B] focus-within:ring-2 transition-all">
                            <div className="p-3 border-b border-[var(--border)] flex items-center gap-2">
                                <Search size={14} className="text-gray-400"/>
                                <input type="text" placeholder="Search currencies..." className="bg-transparent text-sm w-full outline-none font-medium" />
                            </div>
                            <div className="max-h-40 overflow-y-auto py-1">
                                <div className="px-4 py-3 text-sm font-bold text-[var(--foreground)] bg-[#00823B]/5 border-l-2 border-[#00823B] flex justify-between items-center cursor-pointer">
                                    Select Option
                                    <CheckCircle2 size={16} className="text-[#00823B]" />
                                </div>
                                <div className="px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-gray-50 cursor-pointer transition-colors">Dedicated</div>
                                <div className="px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-gray-50 cursor-pointer transition-colors">BANKTRANSFER</div>
                                <div className="px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-gray-50 cursor-pointer transition-colors">USSD</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {/* Fee Type Selectors */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-[var(--foreground)] uppercase tracking-wider">Fee Type</label>
                            <div className="flex flex-col gap-2.5">
                                {/* Select Fee Type Option */}
                                <button
                                    onClick={() => setSelectedFeeType('select')}
                                    className={`w-full flex justify-between items-center px-4 py-3.5 border rounded-xl text-sm font-bold transition-all ${
                                        selectedFeeType === 'select'
                                            ? 'border-[#00823B] bg-[#00823B]/5 text-[var(--foreground)] shadow-sm'
                                            : 'border-[var(--border)] text-gray-500 hover:bg-[var(--background)]'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Calculator size={18} className={selectedFeeType === 'select' ? "text-[var(--foreground)]" : ""} /> Select Fee Type
                                    </div>
                                    {selectedFeeType === 'select' && <CheckCircle2 size={18} className="text-[#00823B]" />}
                                </button>

                                {/* Percentage Option */}
                                <button
                                    onClick={() => setSelectedFeeType('percentage')}
                                    className={`w-full flex justify-between items-center px-4 py-3.5 border rounded-xl text-sm font-bold transition-all ${
                                        selectedFeeType === 'percentage'
                                            ? 'border-[#00823B] bg-[#00823B]/5 text-[var(--foreground)] shadow-sm'
                                            : 'border-[var(--border)] text-gray-500 hover:bg-[var(--background)]'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Percent size={18} className={selectedFeeType === 'percentage' ? "text-[#00823B]" : ""} /> Percentage
                                    </div>
                                    {selectedFeeType === 'percentage' && <CheckCircle2 size={18} className="text-[#00823B]" />}
                                </button>

                                {/* Flat Rate Option */}
                                <button
                                    onClick={() => setSelectedFeeType('flat')}
                                    className={`w-full flex justify-between items-center px-4 py-3.5 border rounded-xl text-sm font-bold transition-all ${
                                        selectedFeeType === 'flat'
                                            ? 'border-[#00823B] bg-[#00823B]/5 text-[var(--foreground)] shadow-sm'
                                            : 'border-[var(--border)] text-gray-500 hover:bg-[var(--background)]'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <DollarSign size={18} className={selectedFeeType === 'flat' ? "text-[#00823B]" : ""}/> Flat Rate
                                    </div>
                                    {selectedFeeType === 'flat' && <CheckCircle2 size={18} className="text-[#00823B]" />}
                                </button>
                            </div>
                        </div>

                        {/* Value Inputs - Conditional rendering based on Type */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-[var(--foreground)] uppercase tracking-wider">Fee Value</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter fee value"
                                        defaultValue={action === 'edit' ? "10" : ""}
                                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm font-black text-[var(--foreground)] outline-none focus:border-[#00823B] focus:ring-1 focus:ring-[#00823B] transition-all placeholder:font-medium placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Show Cap Value ONLY if it's a Collection Fee */}
                            {type === 'collection' && (
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-[var(--foreground)] uppercase tracking-wider">Cap Value</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Enter cap value"
                                            defaultValue={action === 'edit' ? "10" : ""}
                                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm font-black text-[var(--foreground)] outline-none focus:border-[#00823B] focus:ring-1 focus:ring-[#00823B] transition-all placeholder:font-medium placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Show Range Set and Min/Max ONLY if it's a Payout Fee */}
                    {type === 'payout' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-[var(--foreground)] uppercase tracking-wider">Range Set</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Range set value"
                                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm font-black text-[var(--foreground)] outline-none focus:border-[#00823B] focus:ring-1 focus:ring-[#00823B] transition-all placeholder:font-medium placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-[var(--foreground)] uppercase tracking-wider">Minimum Fee</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Minimum fee"
                                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm font-black text-[var(--foreground)] outline-none focus:border-[#00823B] focus:ring-1 focus:ring-[#00823B] transition-all placeholder:font-medium placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-[var(--foreground)] uppercase tracking-wider">Maximum Fee</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Maximum fee"
                                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm font-black text-[var(--foreground)] outline-none focus:border-[#00823B] focus:ring-1 focus:ring-[#00823B] transition-all placeholder:font-medium placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Info Banner */}
                    <div className="bg-green-50/50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20 rounded-2xl p-5 flex gap-4">
                        <Info size={20} className="text-[#00823B] shrink-0" />
                        <div>
                            <h4 className="text-[12px] font-black text-[#00823B] mb-2 uppercase tracking-widest">Fee Configuration Tips</h4>
                            <ul className="text-[12px] text-[#00823B]/80 font-bold space-y-1.5 list-disc pl-4 marker:text-[#00823B]/50">
                                <li>Percentage fees are calculated as a percentage of the transaction amount</li>
                                <li>Flat fees are fixed amounts regardless of transaction size</li>
                                {type === 'payout'
                                    ? <li>Min/Max fees create boundaries for variable fee structures</li>
                                    : <li>Cap values limit the maximum fee charged</li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[var(--border)] bg-[var(--background)]/50 flex justify-end gap-4 rounded-b-[2rem]">
                    <button onClick={onClose} className="px-6 py-3 rounded-xl text-[12px] font-black text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors w-full sm:w-auto text-center">
                        Cancel
                    </button>
                    <button className="flex items-center justify-center gap-2 px-8 py-3 bg-[#00823B] text-white rounded-xl text-[12px] font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all w-full sm:w-auto text-center">
                        {action === 'edit' ? <Edit2 size={16} /> : <Check size={16} />}
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// EXISTING TABS (Unchanged mostly, kept for completion)
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <WalletCard currency="NGN" label="Main NGN Wallet" balance="₦4,525,490.19" isActive />
                <WalletCard currency="USD" label="USD Settlement" balance="$1,240.50" />
                <WalletCard currency="KES" label="Kenya Shilling" balance="KSh 0.00" />
            </div>

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