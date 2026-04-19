"use client";

import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Building2, Search, X, ArrowDownToLine, ArrowUpFromLine,
    Settings2, Lock, CheckCircle2, Loader2
} from "lucide-react";

// --- TYPES ---
type Business = {
    id: number;
    name: string;
    email: string;
};

export default function CashierOperationsPage() {
    // State
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
    const [activeTab, setActiveTab] = useState<'Deposit' | 'Standard' | 'Manual'>('Deposit');

    // Form States
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock Database for Autocomplete
    const mockBusinesses: Business[] = [
        { id: 8, name: "SAMMIGHTY", email: "akinlabisamson15@gmail.com" },
        { id: 252, name: "MACHIKA TELECOMS", email: "admin@machikatelecoms.ng" },
        { id: 109, name: "GLOBAL FOODIES", email: "finance@globalfoodies.com" },
        { id: 44, name: "AfriClique LOGISTICS", email: "hello@AfriClique.io" }
    ];

    // Handle Search Autocomplete Simulation
    const filteredBusinesses = searchQuery.length > 0
        ? mockBusinesses.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.email.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    const handleSelectBusiness = (business: Business) => {
        setSelectedBusiness(business);
        setSearchQuery("");
        setShowSuccess(false);
    };

    const handleClearBusiness = () => {
        setSelectedBusiness(null);
        setShowSuccess(false);
    };

    const handleProcess = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto mt-8 animate-in fade-in duration-500">

                {/* Header Text */}
                <div className="mb-6">
                    <p className="text-sm font-medium text-gray-400">
                        Process manual deposits, standard payouts, and forced gateway payouts for specific businesses.
                    </p>
                </div>

                {/* ========================================================= */}
                {/* 1. TARGET BUSINESS SECTION */}
                {/* ========================================================= */}
                <div className={`bg-[var(--card)] rounded-2xl border transition-all duration-300 shadow-sm mb-6 ${
                    selectedBusiness ? 'border-[#00823B]/50 shadow-[#00823B]/5' : 'border-[var(--border)]'
                }`}>
                    <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-4 text-gray-300">
                            <Building2 size={16} className={selectedBusiness ? 'text-[#00823B]' : 'text-gray-400'} />
                            <h2 className="text-sm font-black text-[var(--foreground)] tracking-tight">Target Business</h2>
                        </div>

                        {!selectedBusiness ? (
                            // STATE 1: SEARCH INPUT
                            <div className="relative">
                                <div className="relative flex items-center group">
                                    <Search className="absolute left-4 text-gray-500 group-focus-within:text-[#00823B] transition-colors" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search by business name..."
                                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold text-[var(--foreground)] outline-none focus:border-[#00823B] focus:ring-1 focus:ring-[#00823B] transition-all placeholder:text-gray-600"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {/* Autocomplete Dropdown */}
                                {searchQuery && (
                                    <div className="absolute top-full left-0 w-full mt-2 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl z-50 overflow-hidden">
                                        {filteredBusinesses.length > 0 ? (
                                            <ul className="max-h-60 overflow-y-auto">
                                                {filteredBusinesses.map(b => (
                                                    <li
                                                        key={b.id}
                                                        onClick={() => handleSelectBusiness(b)}
                                                        className="px-5 py-3 hover:bg-[var(--background)] cursor-pointer flex items-center justify-between border-b border-[var(--border)]/50 last:border-0 transition-colors"
                                                    >
                                                        <div>
                                                            <p className="text-sm font-black text-[var(--foreground)]">{b.name}</p>
                                                            <p className="text-xs font-bold text-gray-500">{b.email}</p>
                                                        </div>
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#00823B] bg-[#00823B]/10 px-2 py-1 rounded">ID: {b.id}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="p-5 text-center text-sm font-bold text-gray-500">
                                                No businesses found matching "{searchQuery}"
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            // STATE 2: SELECTED BUSINESS PILL
                            <div className="flex items-center justify-between bg-[var(--background)] border border-[#00823B]/30 rounded-xl p-4 animate-in zoom-in-95 duration-200">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-black text-[var(--foreground)] tracking-tight">{selectedBusiness.name}</h3>
                                        <span className="px-2 py-0.5 bg-[#00823B]/10 text-[#00823B] text-[10px] font-black rounded uppercase tracking-widest border border-[#00823B]/20">
                                            ID: {selectedBusiness.id}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500 mt-0.5">{selectedBusiness.email}</p>
                                </div>
                                <button
                                    onClick={handleClearBusiness}
                                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                    title="Clear Selection"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* ========================================================= */}
                {/* 2. OPERATIONS SECTION */}
                {/* ========================================================= */}
                <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm relative overflow-hidden">

                    {/* LOCK OVERLAY (Only visible if no business selected) */}
                    {!selectedBusiness && (
                        <div className="absolute inset-0 z-20 bg-[var(--card)]/60 backdrop-blur-[2px] flex items-center justify-center">
                            <div className="px-6 py-3 bg-[#111] dark:bg-[#1a1f2e] border border-gray-800 text-gray-300 text-sm font-black rounded-xl shadow-2xl flex items-center gap-2">
                                <Lock size={16} className="text-gray-500" />
                                Select a business above to unlock operations
                            </div>
                        </div>
                    )}

                    {/* Tabs Header */}
                    <div className="flex items-center gap-2 px-2 pt-2 border-b border-[var(--border)] overflow-x-auto scrollbar-hide">
                        <TabButton
                            active={activeTab === 'Deposit'}
                            onClick={() => setActiveTab('Deposit')}
                            icon={<ArrowDownToLine size={16}/>}
                            label="Cashier Deposit"
                        />
                        <TabButton
                            active={activeTab === 'Standard'}
                            onClick={() => setActiveTab('Standard')}
                            icon={<ArrowUpFromLine size={16}/>}
                            label="Standard Payout"
                        />
                        <TabButton
                            active={activeTab === 'Manual'}
                            onClick={() => setActiveTab('Manual')}
                            icon={<Settings2 size={16}/>}
                            label="Manual Payout"
                        />
                    </div>

                    {/* Operations Form */}
                    <div className="p-6 sm:p-8">
                        <form onSubmit={handleProcess} className="flex flex-col gap-6">

                            {/* Grid for main inputs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InputField
                                    label="Sender Name"
                                    placeholder="e.g. Medusa Settlement"
                                />
                                <InputField
                                    label="Sender Account"
                                    placeholder="Optional"
                                />
                                <InputField
                                    label="Amount"
                                    placeholder="e.g. 592900"
                                    type="number"
                                />
                                <InputField
                                    label="Narration"
                                    placeholder="e.g. GL Balance Clearing"
                                />
                            </div>

                            {/* Auth PIN */}
                            <div className="w-full sm:w-1/2">
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-1">
                                    Authorization PIN
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                    <input
                                        type="password"
                                        placeholder="****"
                                        maxLength={4}
                                        required
                                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-3 pl-11 pr-4 text-sm font-black text-[var(--foreground)] outline-none focus:border-[#00823B] transition-colors tracking-widest placeholder:tracking-normal"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={!selectedBusiness || isProcessing}
                                    className={`w-full py-4 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${
                                        showSuccess
                                            ? "bg-[#00823B] text-white"
                                            : "bg-[#00823B] text-white shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] disabled:opacity-50 disabled:shadow-none"
                                    }`}
                                >
                                    {isProcessing ? (
                                        <><Loader2 size={18} className="animate-spin"/> Processing...</>
                                    ) : showSuccess ? (
                                        <><CheckCircle2 size={18}/> Operation Successful</>
                                    ) : (
                                        `Process ${activeTab === 'Deposit' ? 'Deposit' : 'Payout'}`
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );

    // --- SUB-COMPONENTS ---

    function TabButton({ active, onClick, icon, label }: any) {
        return (
            <button
                type="button"
                onClick={onClick}
                className={`flex items-center gap-2 px-5 py-4 border-b-2 transition-colors ${
                    active
                        ? "border-[#00823B] text-[#00823B]"
                        : "border-transparent text-gray-500 hover:text-[var(--foreground)] hover:border-gray-500"
                }`}
            >
                <span className={active ? 'text-[#00823B]' : 'text-gray-400'}>{icon}</span>
                <span className="text-[13px] font-black">{label}</span>
            </button>
        );
    }

    function InputField({ label, placeholder, type = "text" }: any) {
        return (
            <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">
                    {label}
                </label>
                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm font-bold text-[var(--foreground)] outline-none focus:border-[#00823B] transition-colors placeholder:text-gray-600"
                />
            </div>
        );
    }
}