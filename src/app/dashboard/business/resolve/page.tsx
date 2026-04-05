"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    AlertTriangle, Search, Filter, RefreshCw, CheckCircle2,
    XCircle, Clock, ShieldAlert, ArrowRightLeft, Info,
    Database, Shield, ArrowUpRight, X, Copy
} from "lucide-react";

// --- TYPES ---
type StuckTransaction = {
    id: string;
    reference: string;
    business: string;
    amount: string;
    provider: string;
    timeStuck: string;
    riskLevel: 'high' | 'medium' | 'low';
    errorLog: string;
};

export default function ResolveTransactions() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTx, setSelectedTx] = useState<StuckTransaction | null>(null);
    const [isQuerying, setIsQuerying] = useState(false);
    const [queryResult, setQueryResult] = useState<"success" | "failed" | null>(null);

    // --- MOCK DATA ---
    const stuckTransactions: StuckTransaction[] = [
        { id: "TX-88291A", reference: "NIP-992837461", business: "Spayz Logistics", amount: "₦450,000.00", provider: "NIBSS", timeStuck: "4 hours", riskLevel: 'high', errorLog: "Upstream timeout waiting for final credit confirmation." },
        { id: "TX-88292B", reference: "PRV-110293847", business: "Isakharu Tech", amount: "₦12,500.00", provider: "PROVIDUS", timeStuck: "45 mins", riskLevel: 'medium', errorLog: "Webhook payload verification failed due to signature mismatch." },
        { id: "TX-88293C", reference: "VFD-554637281", business: "Global Foodies", amount: "₦85,000.00", provider: "VFD", timeStuck: "12 mins", riskLevel: 'low', errorLog: "Pending core banking settlement response." },
        { id: "TX-88294D", reference: "SAF-993827162", business: "Acme Retail", amount: "₦1,200,000.00", provider: "SAFEHAVEN", timeStuck: "1 day", riskLevel: 'high', errorLog: "Suspected duplicate transaction signature. Manual review required." },
        { id: "TX-88295E", reference: "NET-334928172", business: "Green Energy Ltd", amount: "₦5,400.00", provider: "NETBANK", timeStuck: "2 hours", riskLevel: 'medium', errorLog: "Customer bank debited, gateway mapping failed." },
    ];

    // Simulate querying the upstream provider
    const handleQueryProvider = () => {
        setIsQuerying(true);
        setQueryResult(null);
        setTimeout(() => {
            setIsQuerying(false);
            // Randomly mock a success or failure response for the demo
            setQueryResult(Math.random() > 0.5 ? "success" : "failed");
        }, 2000);
    };

    return (
        <DashboardLayout>
            {/* 1. PAGE HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-500 rounded-2xl shadow-[0_8px_16px_rgba(245,158,11,0.2)]">
                        <AlertTriangle size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Resolve Transactions</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Investigate and manually resolve stuck or disputed transfers</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 border border-[var(--border)] px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-all bg-[var(--card)] shadow-sm">
                        <Database size={14} /> View Audit Logs
                    </button>
                    <button className="flex items-center gap-2 bg-[#00823B] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all">
                        <RefreshCw size={14} /> Auto-Query All
                    </button>
                </div>
            </div>

            {/* 2. RISK & QUEUE STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total Stuck Value" value="₦1,752,900.00" sub="Across 32 transactions" icon={<Database size={18}/>} />
                <StatCard label="Critical Aging (>3hrs)" value="12" sub="Requires immediate action" icon={<ShieldAlert size={18}/>} isAlert />
                <StatCard label="Provider Timeouts" value="18" sub="Mainly NIBSS & Providus" icon={<Clock size={18}/>} />
                <StatCard label="Resolved Today" value="145" sub="100% SLA met" icon={<CheckCircle2 size={18}/>} isSuccess />
            </div>

            {/* 3. RESOLUTION QUEUE TABLE */}
            <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] shadow-sm overflow-hidden flex flex-col">

                {/* Search & Filter Bar */}
                <div className="p-6 border-b border-[var(--border)] bg-[var(--background)]/30 flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative flex-1 max-w-lg">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by Session ID, Reference, or Amount..."
                            className="w-full pl-10 pr-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-[var(--foreground)]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-500 hover:text-[var(--foreground)] transition-all">
                            <Filter size={14} className="text-amber-500" /> Provider: All
                        </button>
                        <button className="flex items-center gap-2 px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-500 hover:text-[var(--foreground)] transition-all">
                            <Filter size={14} className="text-amber-500" /> Risk: High
                        </button>
                    </div>
                </div>

                {/* The Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                        <tr className="bg-[var(--background)]/40 border-b border-[var(--border)]">
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Transaction Info</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Amount & Provider</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Aging / Risk</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest text-right">Action</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {stuckTransactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-[var(--background)]/50 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                            <span className="font-black text-[var(--foreground)] text-[14px] tracking-tight flex items-center gap-2">
                                                {tx.id} <Copy size={12} className="text-gray-400 cursor-pointer hover:text-[#00823B]" />
                                            </span>
                                        <span className="text-[11px] font-bold text-gray-500 font-mono bg-[var(--background)] px-2 py-0.5 rounded w-fit border border-[var(--border)]">
                                                {tx.reference}
                                            </span>
                                        <span className="text-[11px] font-bold text-gray-500 mt-1 flex items-center gap-1.5">
                                                <ArrowRightLeft size={10} /> {tx.business}
                                            </span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col items-start gap-1.5">
                                        <span className="font-black text-[var(--foreground)] text-[15px]">{tx.amount}</span>
                                        <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase tracking-widest rounded-md border border-blue-500/20">
                                                {tx.provider}
                                            </span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-2 items-start">
                                        <RiskBadge level={tx.riskLevel} time={tx.timeStuck} />
                                        <div className="flex items-start gap-1.5 text-[10px] text-gray-500 font-bold max-w-[200px] leading-tight">
                                            <Info size={12} className="shrink-0 mt-0.5 text-gray-400" />
                                            <span className="truncate" title={tx.errorLog}>{tx.errorLog}</span>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-5 text-right">
                                    <button
                                        onClick={() => setSelectedTx(tx)}
                                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-white border border-amber-500/20 text-xs font-black rounded-xl transition-all shadow-sm active:scale-95"
                                    >
                                        Resolve <ArrowUpRight size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 4. THE RESOLUTION MODAL (Command Center) */}
            {selectedTx && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-[var(--card)] w-full max-w-3xl rounded-[2.5rem] border border-[var(--border)] shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-8 border-b border-[var(--border)] shrink-0 bg-gradient-to-r from-amber-500/10 to-transparent">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <ShieldAlert size={24} className="text-amber-500" />
                                    <h2 className="text-xl font-black text-[var(--foreground)] tracking-tight">Resolution Command Center</h2>
                                </div>
                                <p className="text-xs text-gray-500 font-bold">You are authorizing actions for <span className="text-[var(--foreground)]">{selectedTx.id}</span></p>
                            </div>
                            <button onClick={() => { setSelectedTx(null); setQueryResult(null); }} className="p-2 text-gray-400 hover:text-[var(--foreground)] bg-[var(--background)] border border-[var(--border)] rounded-full transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 overflow-y-auto custom-scrollbar flex flex-col lg:flex-row gap-8">

                            {/* Left: Transaction Details */}
                            <div className="flex-1 space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Transaction Snapshot</h3>
                                <div className="bg-[var(--background)] p-5 rounded-2xl border border-[var(--border)] space-y-4">
                                    <ModalDetail label="Amount in Limbo" value={selectedTx.amount} isAlert />
                                    <ModalDetail label="Provider" value={selectedTx.provider} />
                                    <ModalDetail label="System Reference" value={selectedTx.reference} />
                                    <ModalDetail label="Merchant" value={selectedTx.business} />
                                    <div className="pt-2 border-t border-[var(--border)]">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Last Known Error</p>
                                        <p className="text-xs font-bold text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20 leading-relaxed">
                                            {selectedTx.errorLog}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Resolution Actions */}
                            <div className="flex-1 flex flex-col">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Diagnostic & Actions</h3>

                                {/* Step 1: Query */}
                                <div className="bg-[var(--background)] p-6 rounded-2xl border border-[var(--border)] mb-6 flex flex-col items-center justify-center text-center">
                                    <p className="text-xs font-bold text-gray-500 mb-4">Step 1: Check upstream status directly with {selectedTx.provider}.</p>

                                    {queryResult === null ? (
                                        <button
                                            onClick={handleQueryProvider}
                                            disabled={isQuerying}
                                            className="w-full py-3 bg-[#1F2937] text-white rounded-xl text-xs font-black shadow-md hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                                        >
                                            {isQuerying ? <RefreshCw size={16} className="animate-spin" /> : <Search size={16} />}
                                            {isQuerying ? "Querying Network..." : "Re-Query Provider"}
                                        </button>
                                    ) : queryResult === "success" ? (
                                        <div className="w-full p-4 bg-[#00823B]/10 border border-[#00823B]/30 rounded-xl flex items-center justify-center gap-2 text-[#00823B] font-black text-sm">
                                            <CheckCircle2 size={18} /> Provider confirms Success
                                        </div>
                                    ) : (
                                        <div className="w-full p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center gap-2 text-red-500 font-black text-sm">
                                            <XCircle size={18} /> Provider confirms Failure
                                        </div>
                                    )}
                                </div>

                                {/* Step 2: Force Actions */}
                                <div className="space-y-3 mt-auto">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-center">Step 2: Manual Override</p>
                                    <button className="w-full py-4 bg-[#00823B] text-white rounded-xl text-sm font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all flex items-center justify-center gap-2">
                                        <CheckCircle2 size={18} /> Force Pass (Credit Merchant)
                                    </button>
                                    <button className="w-full py-4 bg-red-500 text-white rounded-xl text-sm font-black shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all flex items-center justify-center gap-2">
                                        <ArrowRightLeft size={18} /> Force Fail & Reverse Funds
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}

        </DashboardLayout>
    );

    // --- HELPER COMPONENTS ---
    function StatCard({ label, value, sub, icon, isAlert = false, isSuccess = false }: any) {
        return (
            <div className={`bg-[var(--card)] p-6 rounded-[2rem] border transition-all ${
                isAlert ? "border-amber-500/30" : isSuccess ? "border-[#00823B]/30" : "border-[var(--border)]"
            }`}>
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl ${
                        isAlert ? 'bg-amber-500/10 text-amber-500' : isSuccess ? 'bg-[#00823B]/10 text-[#00823B]' : 'bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)]'
                    }`}>
                        {icon}
                    </div>
                </div>
                <h3 className={`text-2xl font-black tracking-tight mb-1 ${
                    isAlert ? "text-amber-500" : isSuccess ? "text-[#00823B]" : "text-[var(--foreground)]"
                }`}>{value}</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-[10px] font-bold text-gray-500">{sub}</p>
            </div>
        );
    }

    function RiskBadge({ level, time }: { level: string, time: string }) {
        const config = {
            high: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/20', icon: <ShieldAlert size={10}/> },
            medium: { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/20', icon: <Clock size={10}/> },
            low: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20', icon: <Info size={10}/> },
        }[level as 'high' | 'medium' | 'low'];

        return (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${config.bg} ${config.text} ${config.border} border text-[10px] font-black uppercase tracking-widest`}>
                {config.icon} Stuck for {time}
            </div>
        );
    }

    function ModalDetail({ label, value, isAlert = false }: any) {
        return (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 uppercase">{label}</span>
                <span className={`text-[14px] font-black ${isAlert ? "text-amber-500 text-lg" : "text-[var(--foreground)]"}`}>
                    {value}
                </span>
            </div>
        );
    }
}