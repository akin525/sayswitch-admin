"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Search, CheckCircle2, Copy, Maximize2, Send,
    Bookmark, Share2, Download, MoreVertical,
    Eye, Building2, Activity, Clock, Calendar,
    Hash, Database, ShieldCheck, UserCheck,
    ArrowUpRight, Landmark, Lock, FileText, Check,
    ArrowRight, X, Loader2, Terminal, Navigation, Globe, RefreshCw
} from "lucide-react";

export default function SearchPayoutAnalysis() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchState, setSearchState] = useState<'idle' | 'searching' | 'found'>('idle');
    const [activeTab, setActiveTab] = useState('Overview');
    const [copied, setCopied] = useState<string | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setSearchState('searching');
        setTimeout(() => setSearchState('found'), 1200);
    };

    const resetSearch = () => {
        setSearchQuery("");
        setSearchState('idle');
        setActiveTab('Overview');
    };

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    // ============================================================================
    // 1. THE SEARCH HUB (IDLE STATE)
    // ============================================================================
    if (searchState === 'idle' || searchState === 'searching') {
        return (
            <DashboardLayout>
                <div className="max-w-5xl mx-auto mt-10 animate-in zoom-in-95 fade-in duration-500">

                    {/* Elite Hero Banner with Glassmorphism & SaySwitch Green */}
                    <div className="bg-gradient-to-br from-[#005C29] to-[#00823B] rounded-t-[2.5rem] p-8 sm:p-14 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-2xl relative overflow-hidden group">
                        {/* Background Grid Pattern */}
                        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none transition-transform duration-1000 group-hover:scale-110"></div>
                        <div className="absolute -right-10 -top-20 opacity-10 pointer-events-none rotate-12 transition-transform duration-700 group-hover:rotate-45">
                            <ArrowUpRight size={350} />
                        </div>

                        <div className="text-white relative z-10 max-w-xl">
                            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3 leading-tight">Payout Search</h1>
                            <p className="text-white/90 text-sm font-medium leading-relaxed">Investigate outbound merchant withdrawals, authorization workflows, and destination bank settlements.</p>
                        </div>

                        {/* Live Stat Counters */}
                        <div className="flex items-center gap-6 sm:gap-10 text-white relative z-10 bg-black/20 px-8 py-5 rounded-3xl backdrop-blur-md border border-white/10 shadow-inner">
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">340K</span>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70 mt-2">Indexed</span>
                            </div>
                            <div className="w-px h-12 bg-white/20"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">62ms</span>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70 mt-2">Latency</span>
                            </div>
                        </div>
                    </div>

                    {/* Elite Search Input Engine */}
                    <div className="bg-[var(--card)] border border-[var(--border)] border-t-0 rounded-b-[2.5rem] p-6 sm:p-10 shadow-xl relative z-20">
                        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 relative">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00823B] transition-colors" size={24} />
                                <input
                                    type="text"
                                    placeholder="e.g. PAY_0918273611..."
                                    className="w-full pl-16 pr-6 py-6 bg-[var(--background)] border-2 border-[var(--border)] rounded-3xl text-lg font-black outline-none focus:ring-4 focus:ring-[#00823B]/10 focus:border-[#00823B] transition-all text-[var(--foreground)] placeholder:text-gray-400 shadow-inner"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    disabled={searchState === 'searching'}
                                    autoFocus
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={searchState === 'searching'}
                                className="px-10 py-6 bg-[#00823B] text-white rounded-3xl text-[15px] font-black shadow-[0_10px_40px_-10px_rgba(0,130,59,0.5)] hover:shadow-[0_10px_40px_-5px_rgba(0,130,59,0.7)] hover:bg-[#005C29] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0 min-w-[180px]"
                            >
                                {searchState === 'searching' ? <Loader2 size={22} className="animate-spin" /> : <Search size={22} />}
                                {searchState === 'searching' ? "Querying..." : "Run Search"}
                            </button>
                        </form>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8 pt-8 border-t border-[var(--border)]">
                            <span className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 whitespace-nowrap">Suggested Prefix:</span>
                            <div className="flex flex-wrap gap-2">
                                {["PAY_", "POUT_", "BAT_", "MER_"].map(prefix => (
                                    <button
                                        key={prefix}
                                        type="button"
                                        onClick={() => setSearchQuery(prefix)}
                                        className="px-4 py-2 bg-[var(--background)] border border-[var(--border)] text-gray-500 hover:text-[#00823B] hover:border-[#00823B]/30 hover:bg-[#00823B]/5 text-xs font-black rounded-xl transition-all font-mono"
                                    >
                                        {prefix}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    // ============================================================================
    // 2. THE DASHBOARD (FOUND STATE)
    // ============================================================================
    const analysisTabs = [
        { id: 'Overview', icon: <Eye size={16}/>, title: "Overview", sub: "Financials" },
        { id: 'Beneficiary', icon: <Landmark size={16}/>, title: "Beneficiary", sub: "Destination" },
        { id: 'Authorization', icon: <Lock size={16}/>, title: "Authorization", sub: "Approvals" },
        { id: 'Webhook', icon: <Terminal size={16}/>, title: "Webhook", sub: "Event Payloads" },
        { id: 'Business', icon: <Building2 size={16}/>, title: "Business", sub: "Merchant" },
        { id: 'Timeline', icon: <Activity size={16}/>, title: "Timeline", sub: "Audit Log" },
        { id: 'Audit', icon: <ShieldCheck size={16}/>, title: "Compliance", sub: "Risk Rules" },
    ];

    return (
        <DashboardLayout>
            <div className="flex flex-col h-full max-w-[1400px] mx-auto animate-in slide-in-from-bottom-8 fade-in duration-500">

                {/* 2.1 PREMIUM DASHBOARD HEADER */}
                <div className="bg-[var(--card)] rounded-t-[2.5rem] border border-[var(--border)] p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-sm relative overflow-hidden">
                    {/* Subtle Green Glow */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00823B]/5 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Left: Identity */}
                    <div className="flex items-start sm:items-center gap-6 relative z-10">
                        <button onClick={resetSearch} className="p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl text-gray-400 hover:text-[#00823B] hover:border-[#00823B]/30 transition-all hidden sm:block shadow-sm">
                            <Search size={22} />
                        </button>
                        <div>
                            <div className="flex items-center gap-4 mb-3">
                                <h1 className="text-3xl font-black tracking-tight text-[var(--foreground)]">Payout Analysis</h1>
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00823B]/10 border border-[#00823B]/20 text-[#00823B] rounded-lg text-[11px] font-black uppercase tracking-widest shadow-sm">
                                    <CheckCircle2 size={14}/> Processed
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-[13px] font-bold text-gray-500">
                                <span className="font-mono bg-[var(--background)] px-3 py-1.5 rounded-lg border border-[var(--border)] flex items-center gap-2 shadow-inner text-[var(--foreground)]">
                                    # {searchQuery || "PAY_0918273611"}
                                    <Copy size={14} className="cursor-pointer text-gray-400 hover:text-[#00823B] transition-colors" onClick={() => handleCopy(searchQuery || "PAY_0918273611", 'id')}/>
                                    {copied === 'id' && <Check size={14} className="text-[#00823B]"/>}
                                </span>
                                <span className="flex items-center gap-2"><Calendar size={16} className="text-gray-400"/> Mar 29, 2026 • 10:24:12 AM</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Values & Tools */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10 w-full lg:w-auto border-t lg:border-t-0 border-[var(--border)] pt-6 lg:pt-0">
                        <div className="text-left lg:text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Requested Amount</p>
                            <h2 className="text-4xl font-black tracking-tight text-[var(--foreground)]">₦2,500,000.00</h2>
                            <p className="text-sm font-bold text-red-500 mt-1 flex items-center lg:justify-end gap-1">
                                <ArrowUpRight size={14}/> Deducted: ₦2,500,050.00
                            </p>
                        </div>
                        <div className="flex items-center gap-3 lg:border-l border-[var(--border)] lg:pl-6 w-full sm:w-auto">
                            <ActionButton icon={<FileText size={18}/>} tooltip="Receipt" />
                            <ActionButton icon={<Download size={18}/>} tooltip="Export" />
                            <ActionButton icon={<Share2 size={18}/>} tooltip="Share" />
                            <ActionButton icon={<MoreVertical size={18}/>} tooltip="More" />
                        </div>
                    </div>
                </div>

                {/* 2.2 SEAMLESS TAB NAVIGATION */}
                <div className="bg-[var(--card)] border-x border-b border-[var(--border)] px-4 sm:px-8 overflow-x-auto scrollbar-hide relative z-20">
                    <div className="flex min-w-max gap-1 py-3">
                        {analysisTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all relative overflow-hidden group ${
                                    activeTab === tab.id
                                        ? "bg-[var(--foreground)] text-[var(--background)] shadow-lg dark:bg-white dark:text-black"
                                        : "bg-transparent text-gray-500 hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                                }`}
                            >
                                <div className={`p-2 rounded-xl transition-colors ${activeTab === tab.id ? 'bg-[var(--background)]/20 dark:bg-black/10' : 'bg-[var(--background)] border border-[var(--border)] group-hover:border-gray-400'}`}>
                                    {tab.icon}
                                </div>
                                <div className="text-left pr-2">
                                    <p className={`text-[13px] font-black leading-none tracking-tight ${activeTab === tab.id ? 'text-[var(--background)] dark:text-black' : 'text-[var(--foreground)]'}`}>{tab.title}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2.3 TAB CONTENT ENGINE */}
                <div className="bg-[var(--background)] border border-[var(--border)] border-t-0 rounded-b-[2.5rem] p-6 sm:p-10 flex-1 shadow-inner min-h-[600px]">
                    {activeTab === 'Overview' && <TabOverview />}
                    {activeTab === 'Beneficiary' && <TabBeneficiary />}
                    {activeTab === 'Authorization' && <TabAuthorization />}
                    {activeTab === 'Webhook' && <TabWebhook />}
                    {activeTab === 'Business' && <TabBusiness />}
                    {activeTab === 'Timeline' && <TabTimeline />}
                    {activeTab === 'Audit' && <TabAudit />}
                </div>
            </div>
        </DashboardLayout>
    );

    // ============================================================================
    // TAB: OVERVIEW (Financial Receipt Style)
    // ============================================================================
    function TabOverview() {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* The Digital Receipt */}
                    <div className="lg:col-span-1 bg-[var(--card)] p-8 rounded-[2rem] border border-[var(--border)] shadow-md relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 left-0 w-full h-2 bg-[#00823B]"></div>
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2.5 bg-[#00823B]/10 text-[#00823B] rounded-xl"><Database size={20}/></div>
                                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">Wallet Deduction Ledger</h3>
                            </div>
                            <div className="space-y-4">
                                <ReceiptRow label="Requested Payout" value="₦2,500,000.00" />
                                <ReceiptRow label="Platform Flat Fee" value="+ ₦50.00" isSub />
                                <ReceiptRow label="Tax / VAT" value="₦0.00" isSub />
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t-2 border-dashed border-[var(--border)] relative">
                            {/* Receipt Cutout dots */}
                            <div className="absolute -left-10 -top-2 w-4 h-4 rounded-full bg-[var(--background)] border-r border-[var(--border)]"></div>
                            <div className="absolute -right-10 -top-2 w-4 h-4 rounded-full bg-[var(--background)] border-l border-[var(--border)]"></div>

                            <div className="flex justify-between items-end">
                                <span className="text-xs font-black uppercase tracking-widest text-red-500">Total Deducted</span>
                                <span className="text-2xl font-black text-red-500">₦2,500,050.00</span>
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 mt-2 text-right">Debited from Main Wallet</p>
                        </div>
                    </div>

                    {/* Metadata Grids */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <DetailCard title="Beneficiary Snapshot" icon={<UserCheck size={18}/>}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                                <DataRow label="Account Name" value="Yusuf Tasiu Machika" />
                                <DataRow label="Destination Bank" value="United Bank for Africa (UBA)" />
                                <DataRow label="Account Number" value="2093817263" copyable />
                                <DataRow label="Name Match Score" value="98% Match" isHighlight />
                            </div>
                        </DetailCard>

                        <DetailCard title="System Identifiers" icon={<Hash size={18}/>}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                                <DataRow label="Payout ID" value="PAY_0918273611" copyable />
                                <DataRow label="Client Reference" value="POUT-9912A" copyable />
                                <DataRow label="Batch Reference" value="BAT-1029A" copyable />
                                <DataRow label="NIBSS Session ID" value="090111260329102455129938271" copyable />
                            </div>
                        </DetailCard>
                    </div>
                </div>
            </div>
        );
    }

    // ============================================================================
    // TAB: BENEFICIARY (Institutional Bank UI)
    // ============================================================================
    function TabBeneficiary() {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Visual Bank Account */}
                    <DetailCard title="Destination Account" icon={<Landmark size={18}/>}>

                        {/* Institutional Bank Card Design - Pure Green Theme */}
                        <div className="w-full max-w-sm mx-auto bg-gradient-to-br from-[#062113] to-black rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden mb-6 border border-[#00823B]/30">
                            {/* Bank Name */}
                            <div className="flex justify-between items-start relative z-10 mb-8">
                                <div className="text-white/90 font-black text-2xl tracking-tight flex items-center gap-2">
                                    <div className="w-6 h-6 bg-[#00823B] rounded-sm"></div>
                                    UBA
                                </div>
                                <Landmark size={24} className="text-[#00823B]/40" />
                            </div>
                            {/* Account Number */}
                            <div className="relative z-10 mb-6">
                                <div className="text-[#00823B]/60 text-[9px] font-black uppercase tracking-widest mb-1">Account Number</div>
                                <div className="text-white font-mono text-2xl sm:text-3xl tracking-[0.15em] shadow-sm">2093 8172 63</div>
                            </div>
                            {/* Account Name */}
                            <div className="relative z-10">
                                <div className="text-[#00823B]/60 text-[8px] font-black uppercase tracking-widest mb-1">Beneficiary Name</div>
                                <div className="text-white font-black text-[13px] uppercase tracking-widest">YUSUF TASIU MACHIKA</div>
                            </div>
                            {/* Decor */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#00823B]/20 rounded-full blur-[80px] pointer-events-none"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <DataRow label="Bank Code (CBN)" value="033" />
                            <DataRow label="Routing Pathway" value="NIP (NIBSS)" />
                        </div>
                    </DetailCard>

                    {/* Validation Details */}
                    <DetailCard title="Account Validation" icon={<ShieldCheck size={18}/>}>
                        <div className="space-y-6">
                            <div className="p-5 bg-[#00823B]/10 border border-[#00823B]/20 rounded-2xl flex items-start gap-4">
                                <CheckCircle2 size={24} className="text-[#00823B] shrink-0" />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#00823B] mb-1">Pre-flight Validation Passed</p>
                                    <p className="text-sm font-bold text-[var(--foreground)]">The destination account was successfully resolved and verified via NIBSS before funds were dispatched.</p>
                                </div>
                            </div>
                            <DataRow label="Resolved Name" value="YUSUF TASIU MACHIKA" />
                            <DataRow label="KYC Level" value="Tier 3 (BVN Linked)" />
                            <DataRow label="Validation Timestamp" value="Mar 29, 2026 • 10:23:45 AM" />
                        </div>
                    </DetailCard>
                </div>
            </div>
        );
    }

    // ============================================================================
    // TAB: AUTHORIZATION (Connected Maker-Checker flow)
    // ============================================================================
    function TabAuthorization() {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <DetailCard title="Maker-Checker Workflow" icon={<Lock size={18}/>}>
                    <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">

                        {/* Step 1: The Maker */}
                        <div className="bg-[var(--background)] p-8 rounded-[2rem] border border-[var(--border)] w-full flex-1 relative overflow-hidden group hover:border-[#00823B]/30 transition-colors shadow-sm">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Database size={100} />
                            </div>
                            <div className="flex items-center gap-4 mb-8 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-gray-500">
                                    <Database size={24}/>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Step 1: Initiator (Maker)</p>
                                    <p className="text-xl font-black text-[var(--foreground)] tracking-tight mt-0.5">System API</p>
                                </div>
                            </div>
                            <div className="space-y-5 relative z-10">
                                <DataRow label="Initiation Source" value="Merchant API (Server-to-Server)" />
                                <DataRow label="IP Address" value="102.89.34.211 (Whitelisted)" />
                                <DataRow label="Timestamp" value="10:24:12 AM" />
                            </div>
                        </div>

                        {/* The Connector Arrow (Desktop) */}
                        <div className="hidden lg:flex items-center justify-center text-[#00823B] shrink-0 animate-pulse">
                            <ArrowRight size={32} strokeWidth={3} />
                        </div>
                        {/* The Connector Arrow (Mobile) */}
                        <div className="lg:hidden flex items-center justify-center text-[#00823B] shrink-0 animate-pulse rotate-90">
                            <ArrowRight size={24} strokeWidth={3} />
                        </div>

                        {/* Step 2: The Checker */}
                        <div className="bg-[#00823B]/5 p-8 rounded-[2rem] border-2 border-[#00823B]/30 w-full flex-1 relative overflow-hidden shadow-lg shadow-[#00823B]/5 hover:border-[#00823B]/50 transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <ShieldCheck size={100} className="text-[#00823B]" />
                            </div>
                            <div className="flex items-center gap-4 mb-8 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-[#00823B] flex items-center justify-center text-white shadow-lg shadow-[#00823B]/30">
                                    <ShieldCheck size={24}/>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#00823B]">Step 2: Approver (Checker)</p>
                                    <p className="text-xl font-black text-[var(--foreground)] tracking-tight mt-0.5">Auto-Approved</p>
                                </div>
                            </div>
                            <div className="space-y-5 relative z-10">
                                <DataRow label="Approval Source" value="Risk Engine (Below threshold)" />
                                <DataRow label="Rule Applied" value="Payout < ₦5M auto-approve" />
                                <DataRow label="Timestamp" value="10:24:14 AM" />
                            </div>
                        </div>

                    </div>
                </DetailCard>
            </div>
        );
    }

    // ============================================================================
    // TAB: WEBHOOK (Terminal Style)
    // ============================================================================
    function TabWebhook() {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[var(--card)] p-6 sm:p-8 rounded-[2.5rem] border border-[var(--border)] shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#00823B]/10 text-[#00823B] rounded-2xl border border-[#00823B]/20"><Navigation size={24} className="rotate-45" /></div>
                        <div>
                            <h3 className="text-lg font-black tracking-tight text-[var(--foreground)]">Event Dispatcher</h3>
                            <p className="text-xs font-bold text-gray-500 mt-0.5">Webhook delivered to merchant endpoint successfully.</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 bg-[#00823B] text-white px-6 py-3 rounded-xl text-sm font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] hover:-translate-y-0.5 transition-all">
                        <RefreshCw size={16} /> Force Resend Event
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <StatBox label="Status" value="Delivered" icon={<CheckCircle2 size={16} className="text-[#00823B]"/>} highlight />
                    <StatBox label="Attempts" value="1/3" icon={<RefreshCw size={16}/>} />
                    <StatBox label="Event Type" value="payout.success" icon={<Activity size={16}/>} />
                    <StatBox label="Latency" value="184ms" icon={<Clock size={16}/>} />
                    <StatBox label="HTTP Code" value="200 OK" icon={<Globe size={16}/>} highlight />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <TerminalBlock title="POST /webhook/payouts" icon={<Send size={14}/>} code={`{
  "event": "payout.success",
  "data": {
    "id": "PAY_0918273611",
    "business_id": 252,
    "currency": "NGN",
    "amount": "2500000",
    "fee": "50",
    "reference": "POUT-9912A",
    "destination": {
       "bank_code": "033",
       "account_number": "2093817263",
       "account_name": "Yusuf Tasiu Machika"
    }
  }
}`} />
                    <TerminalBlock title="Response from Merchant Server" icon={<Globe size={14}/>} code={`HTTP/1.1 200 OK
Content-Type: application/json
Date: Sun, 29 Mar 2026 10:24:56 GMT

{
  "status": "success",
  "message": "Payout webhook processed.",
  "timestamp": "2026-03-29T10:24:56Z"
}`} />
                </div>
            </div>
        );
    }

    // ============================================================================
    // TAB: BUSINESS
    // ============================================================================
    function TabBusiness() {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-[var(--card)] p-8 sm:p-12 rounded-[3rem] border border-[var(--border)] shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none -mb-10 -mr-10">
                        <Building2 size={400} />
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10 mb-12">
                        <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-[#00823B] to-[#003B1A] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-[#00823B]/30 shrink-0 border-4 border-[var(--background)]">
                            MT
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                                <h2 className="text-3xl sm:text-4xl font-black text-[var(--foreground)] tracking-tight">Machika Telecoms</h2>
                                <span className="px-3 py-1.5 bg-[#00823B]/10 text-[#00823B] text-[10px] font-black uppercase tracking-widest rounded-xl border border-[#00823B]/20 flex items-center gap-1.5">
                                    <CheckCircle2 size={12}/> Tier 3 Verified
                                </span>
                            </div>
                            <p className="text-sm font-bold text-gray-500">Business ID: 252 • Registered March 2025 • Telecommunications</p>
                        </div>
                        <button className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] dark:bg-white dark:text-black rounded-2xl text-sm font-black hover:scale-105 transition-transform shadow-lg shrink-0">
                            Open Full Profile
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10 border-t border-[var(--border)] pt-12">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Database size={14}/> Pre-Payout Balance</p>
                            <p className="text-3xl font-black text-[var(--foreground)] tracking-tight">₦7,025,490.00</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Database size={14}/> Post-Payout Balance</p>
                            <p className="text-3xl font-black text-[var(--foreground)] tracking-tight">₦4,525,440.00</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2"><ShieldCheck size={14}/> Daily Payout Limit</p>
                            <p className="text-xl font-black text-[var(--foreground)] tracking-tight">₦50,000,000.00</p>
                            <p className="text-sm font-bold text-[#00823B] mt-1">45.5M remaining</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ============================================================================
    // TAB: TIMELINE (Forensic Flow)
    // ============================================================================
    function TabTimeline() {
        const events = [
            { title: "Payout Requested", time: "10:24:12 AM", desc: "API request received for ₦2,500,000.00.", icon: <ArrowUpRight size={18}/>, status: "completed" },
            { title: "Account Validation (NIBSS)", time: "10:24:13 AM", desc: "Destination account 2093817263 verified successfully.", icon: <UserCheck size={18}/>, status: "completed" },
            { title: "Risk & Velocity Check", time: "10:24:14 AM", desc: "Transaction cleared automated fraud thresholds.", icon: <ShieldCheck size={18}/>, status: "completed" },
            { title: "Wallet Debit", time: "10:24:15 AM", desc: "₦2,500,050.00 (inclusive of fees) deducted from main wallet.", icon: <Database size={18}/>, status: "completed" },
            { title: "Dispatched to Gateway", time: "10:24:16 AM", desc: "Payload sent to NIP for processing.", icon: <Send size={18}/>, status: "completed" },
            { title: "Settlement Confirmed", time: "10:24:55 AM", desc: "Final success response received from destination bank.", icon: <Landmark size={18}/>, status: "active" },
        ];

        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto py-8">
                <div className="relative">
                    {/* The Line */}
                    <div className="absolute left-[31px] sm:left-[47px] top-8 bottom-8 w-1 bg-[#00823B]/20 rounded-full"></div>

                    <div className="space-y-12 relative z-10">
                        {events.map((evt, idx) => (
                            <div key={idx} className="flex gap-6 sm:gap-10 group">
                                {/* The Icon Node */}
                                <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full border-8 border-[var(--background)] flex items-center justify-center shrink-0 transition-transform duration-300 shadow-sm z-10 ${
                                    evt.status === 'active'
                                        ? 'bg-[#00823B] text-white shadow-[#00823B]/40 shadow-xl scale-110'
                                        : 'bg-[var(--card)] text-gray-500 border-[var(--border)] group-hover:border-[#00823B]/50 group-hover:text-[#00823B]'
                                }`}>
                                    {evt.icon}
                                </div>

                                {/* Content Card */}
                                <div className={`p-6 sm:p-8 rounded-[2rem] border transition-all flex-1 flex flex-col justify-center ${
                                    evt.status === 'active'
                                        ? 'bg-[#00823B]/5 border-[#00823B]/30 shadow-md'
                                        : 'bg-[var(--card)] border-[var(--border)] shadow-sm hover:shadow-md'
                                }`}>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                                        <h4 className={`text-lg font-black tracking-tight ${evt.status === 'active' ? 'text-[#00823B]' : 'text-[var(--foreground)]'}`}>
                                            {evt.title}
                                        </h4>
                                        <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest bg-[var(--background)] px-3 py-1.5 rounded-lg border border-[var(--border)] w-fit">
                                            {evt.time}
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold text-gray-500 leading-relaxed">{evt.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // ============================================================================
    // TAB: AUDIT & RISK (Compliance Matrix)
    // ============================================================================
    function TabAudit() {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Velocity Analysis & Gauge */}
                    <div className="bg-[var(--card)] p-8 sm:p-10 rounded-[2.5rem] border border-[var(--border)] shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                            <Activity size={150} />
                        </div>

                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-8 w-full text-left relative z-10">System Risk Assessment</h3>

                        {/* Custom SVG Gauge - Green Theme */}
                        <div className="relative w-48 h-48 mb-8 relative z-10">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" stroke="var(--border)" strokeWidth="8" fill="none" />
                                <circle cx="50" cy="50" r="40" stroke="#00823B" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="230" className="animate-[spin_1.5s_ease-out_forwards]" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black text-[#00823B] tracking-tighter">03</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">Score / 100</span>
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00823B]/10 border border-[#00823B]/20 text-[#00823B] rounded-xl text-xs font-black uppercase tracking-widest mb-4 relative z-10">
                            <ShieldCheck size={18}/> Extremely Low Risk
                        </div>
                        <p className="text-sm font-bold text-gray-500 max-w-xs relative z-10">Transaction passed all internal compliance, AML checks, and velocity thresholds.</p>
                    </div>

                    {/* Detailed Rules Check */}
                    <DetailCard title="Compliance Matrix Rules" icon={<ShieldCheck size={18}/>}>
                        <div className="space-y-4 mt-2">
                            <RuleCheck label="Destination Bank is Whitelisted" pass />
                            <RuleCheck label="API Key Configuration valid" pass />
                            <RuleCheck label="Sufficient Wallet Balance" pass />
                            <RuleCheck label="Anti-Money Laundering (AML) flags" pass neutral />
                            <RuleCheck label="Beneficiary Name Match > 80%" pass />
                            <RuleCheck label="24h Velocity < Daily Limit" pass />
                        </div>
                    </DetailCard>
                </div>
            </div>
        );
    }

    // ============================================================================
    // REUSABLE MICRO-COMPONENTS
    // ============================================================================

    function ActionButton({ icon, tooltip }: any) {
        return (
            <button className="p-3 sm:p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl text-gray-400 hover:text-[var(--foreground)] hover:border-gray-400 transition-all shadow-sm" title={tooltip}>
                {icon}
            </button>
        );
    }

    function DetailCard({ title, icon, children, className = "" }: any) {
        return (
            <div className={`bg-[var(--card)] p-6 sm:p-10 rounded-[2.5rem] border border-[var(--border)] shadow-sm ${className}`}>
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-8 flex items-center gap-3 pb-5 border-b border-[var(--border)]">
                    <span className="p-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-gray-400">{icon}</span> {title}
                </h3>
                <div className="flex flex-col gap-6">
                    {children}
                </div>
            </div>
        );
    }

    function DataRow({ label, value, copyable = false, isHighlight = false, color = "text-[#00823B]" }: any) {
        return (
            <div className="flex flex-col gap-2 border-b border-[var(--border)]/50 pb-5 last:border-0 last:pb-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</span>
                <div className="flex items-center gap-2">
                    <span className={`text-[15px] font-black tracking-tight break-all ${isHighlight ? color : 'text-[var(--foreground)]'}`}>{value}</span>
                    {copyable && <Copy size={14} className="text-gray-400 hover:text-[#00823B] cursor-pointer transition-colors" />}
                </div>
            </div>
        );
    }

    function ReceiptRow({ label, value, isSub = false }: any) {
        return (
            <div className="flex justify-between items-center py-2 relative">
                {isSub && <div className="absolute bottom-0 left-0 w-full border-b border-dashed border-[var(--border)] opacity-50"></div>}
                <span className={`text-sm z-10 bg-[var(--card)] pr-2 font-bold ${isSub ? 'text-gray-500' : 'text-[var(--foreground)] font-black'}`}>{label}</span>
                <span className={`text-sm z-10 bg-[var(--card)] pl-2 font-black tracking-tight ${value.includes('+') ? 'text-red-500' : 'text-[var(--foreground)]'}`}>{value}</span>
            </div>
        );
    }

    function RuleCheck({ label, pass, neutral = false }: any) {
        return (
            <div className="flex items-center gap-5 py-3 border-b border-[var(--border)]/50 last:border-0 last:pb-0">
                <div className={`p-2 rounded-full shrink-0 ${pass && !neutral ? 'bg-[#00823B]/20 text-[#00823B]' : neutral ? 'bg-gray-500/20 text-gray-500' : 'bg-red-500/20 text-red-500'}`}>
                    {pass && !neutral ? <Check size={16} strokeWidth={3}/> : neutral ? <Activity size={16}/> : <X size={16} strokeWidth={3}/>}
                </div>
                <span className="text-[14px] font-bold text-[var(--foreground)]">{label}</span>
            </div>
        );
    }

    function StatBox({ label, value, icon, highlight = false }: any) {
        return (
            <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5 shadow-inner flex flex-col justify-between min-h-[100px] transition-colors hover:border-gray-400">
                <div className="flex items-center gap-2 text-gray-400 mb-3">
                    {icon}
                    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
                </div>
                <span className={`text-lg font-black leading-none truncate ${highlight ? 'text-[#00823B]' : 'text-[var(--foreground)]'}`}>
                    {value}
                </span>
            </div>
        );
    }

    function TerminalBlock({ title, icon, code }: any) {
        return (
            <div className="flex flex-col bg-[#0f172a] rounded-[2rem] border border-slate-800 shadow-2xl overflow-hidden">
                {/* Mac OS Style Terminal Header */}
                <div className="bg-[#1e293b] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        {icon} {title}
                    </div>
                    <button className="text-slate-400 hover:text-white transition-colors"><Copy size={14}/></button>
                </div>
                <div className="p-6 overflow-x-auto text-[13px] font-mono text-slate-300 leading-relaxed custom-scrollbar">
                    <pre><code>{code}</code></pre>
                </div>
            </div>
        );
    }
}