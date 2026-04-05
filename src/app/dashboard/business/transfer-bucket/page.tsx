"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    ArrowUpDown, Server, Smartphone, Wifi, Tv, Zap,
    Dices, GraduationCap, ArrowRightLeft, Landmark,
    Save, RefreshCw, AlertTriangle, CheckCircle2, ShieldAlert
} from "lucide-react";

// --- MOCK DATA FROM YOUR JSON ---
const MOCK_PROVIDERS = [
    { id: 1, name: "NIBSS", code: "NIP", status: 1 },
    { id: 2, name: "UP", code: "UP", status: 1 },
    { id: 3, name: "VFD", code: "VFD", status: 1 },
    { id: 4, name: "SAFEHAVEN", code: "SAFEHAVEN", status: 1 },
    { id: 5, name: "BANK78", code: "BANK78", status: 1 },
    { id: 6, name: "PROVIDUS", code: "PRV", status: 1 },
    { id: 7, name: "SASAPAY", code: "SASAPAY", status: 0 }, // Inactive example
    { id: 8, name: "SASAPAYTZS", code: "SASAPAYTZS", status: 1 }
];

const MOCK_SWITCH = {
    airtime: 1, internet: 1, cabletv: 1, electricity: 1,
    betting: 1, education: 1, transfer: 3, transfer_more: 3,
    transfer_x_more: 3, bank_settlement: 1
};

// --- META DICTIONARY FOR UI RENDERING ---
const SERVICE_META: Record<string, { label: string, icon: any, desc: string }> = {
    airtime: { label: "Airtime Recharge", icon: Smartphone, desc: "VTU and Airtime purchases" },
    internet: { label: "Data & Internet", icon: Wifi, desc: "Internet bundle subscriptions" },
    cabletv: { label: "Cable TV", icon: Tv, desc: "DSTV, GOTV, Startimes" },
    electricity: { label: "Electricity (Disco)", icon: Zap, desc: "Prepaid & Postpaid power" },
    betting: { label: "Betting & Lottery", icon: Dices, desc: "Wallet top-ups for merchants" },
    education: { label: "Education Payments", icon: GraduationCap, desc: "School fees and exam pins" },
    transfer: { label: "Standard Transfer", icon: ArrowRightLeft, desc: "Tier 1 Outbound transfers" },
    transfer_more: { label: "Transfer Bulk", icon: ArrowUpDown, desc: "Tier 2 Outbound & Bulk" },
    transfer_x_more: { label: "Transfer High-Volume", icon: ArrowUpDown, desc: "Tier 3 High volume routing" },
    bank_settlement: { label: "Bank Settlement", icon: Landmark, desc: "End of day merchant settlements" }
};

export default function TransferBucket() {
    const [providers] = useState(MOCK_PROVIDERS);
    const [routing, setRouting] = useState<Record<string, number>>(MOCK_SWITCH);
    const [isSaving, setIsSaving] = useState(false);

    // Handle Dropdown Change
    const handleRouteUpdate = (serviceKey: string, newProviderId: number) => {
        setRouting(prev => ({ ...prev, [serviceKey]: newProviderId }));
    };

    // Simulate Save API Call
    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1500);
    };

    return (
        <DashboardLayout>
            {/* 1. PAGE HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-[#005C29] to-[#00823B] rounded-2xl shadow-[0_8px_16px_rgba(0,130,59,0.2)]">
                        <ArrowUpDown size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Transfer Bucket & Switch</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Configure primary gateway routing for all platform services</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={() => setRouting(MOCK_SWITCH)} className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--foreground)] hover:bg-[var(--background)] transition-all shadow-sm">
                        <RefreshCw size={14} className="text-gray-400" /> Discard Changes
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#00823B] text-white rounded-xl text-xs font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all disabled:opacity-70"
                    >
                        {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                        {isSaving ? "Applying Rules..." : "Save Configuration"}
                    </button>
                </div>
            </div>

            {/* 2. GATEWAY HEALTH MONITOR */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <Server size={14} /> Gateway Provider Status
                    </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                    {providers.map(provider => (
                        <div
                            key={provider.id}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border ${
                                provider.status === 1
                                    ? "bg-[var(--card)] border-[var(--border)]"
                                    : "bg-red-500/5 border-red-500/20"
                            }`}
                        >
                            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[10px] font-black text-gray-500">
                                {provider.id}
                            </div>
                            <span className={`text-[12px] font-black tracking-widest uppercase ${provider.status === 1 ? "text-[var(--foreground)]" : "text-red-500"}`}>
                                {provider.name}
                            </span>
                            {provider.status === 1 ? (
                                <div className="w-2 h-2 rounded-full bg-[#00823B] shadow-[0_0_6px_#00823B] ml-1 animate-pulse"></div>
                            ) : (
                                <ShieldAlert size={14} className="text-red-500 ml-1" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. ROUTING CONFIGURATION GRID */}
            <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] shadow-sm p-6 sm:p-8">
                <div className="mb-8 border-b border-[var(--border)]/50 pb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-black tracking-tight text-[var(--foreground)] mb-1">Service Routing Rules</h2>
                        <p className="text-sm text-gray-500 font-medium">Map specific transaction types to your preferred provider.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Object.keys(routing).map((serviceKey) => {
                        const meta = SERVICE_META[serviceKey] || { label: serviceKey, icon: Zap, desc: "System service" };
                        const Icon = meta.icon;

                        const selectedProviderId = routing[serviceKey];
                        const selectedProvider = providers.find(p => p.id === selectedProviderId);
                        const isProviderDown = selectedProvider && selectedProvider.status === 0;

                        return (
                            <div
                                key={serviceKey}
                                className={`p-5 rounded-[2rem] border transition-all relative overflow-hidden group ${
                                    isProviderDown
                                        ? "bg-red-500/5 border-red-500/30"
                                        : "bg-[var(--background)] border-[var(--border)] hover:border-[#00823B]/40"
                                }`}
                            >
                                {/* Background Accent */}
                                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-8 -mt-8 opacity-20 transition-colors ${
                                    isProviderDown ? "bg-red-500" : "bg-[#00823B] group-hover:bg-[#00823B]"
                                }`}></div>

                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="mb-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className={`p-3 rounded-2xl ${isProviderDown ? "bg-red-500/10 text-red-500" : "bg-[var(--card)] border border-[var(--border)] text-[#00823B]"}`}>
                                                <Icon size={20} />
                                            </div>
                                            {isProviderDown && (
                                                <span className="flex items-center gap-1 bg-red-500 text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest shadow-md">
                                                    <AlertTriangle size={10} /> Provider Offline
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-sm font-black text-[var(--foreground)] tracking-tight">{meta.label}</h3>
                                        <p className="text-[11px] text-gray-500 font-bold mt-1">{meta.desc}</p>
                                    </div>

                                    {/* The Selector */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Route To Provider</label>
                                        <div className="relative">
                                            <select
                                                value={selectedProviderId}
                                                onChange={(e) => handleRouteUpdate(serviceKey, parseInt(e.target.value))}
                                                className={`w-full appearance-none rounded-xl px-4 py-3 text-[13px] font-black outline-none transition-all cursor-pointer ${
                                                    isProviderDown
                                                        ? "bg-red-500/10 border border-red-500/30 text-red-600 focus:ring-2 focus:ring-red-500/20"
                                                        : "bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] focus:ring-2 focus:ring-[#00823B]/20 focus:border-[#00823B]"
                                                }`}
                                            >
                                                {providers.map(p => (
                                                    <option key={p.id} value={p.id}>
                                                        {p.name} {p.status === 0 ? "(OFFLINE)" : ""}
                                                    </option>
                                                ))}
                                            </select>

                                            {/* Custom Chevron for select */}
                                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                                <ArrowUpDown size={14} className={isProviderDown ? "text-red-400" : "text-gray-400"} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </DashboardLayout>
    );
}