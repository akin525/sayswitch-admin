"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Search, CheckCircle2, Copy, Maximize2, Send,
    Bookmark, Share2, Download, MoreVertical,
    Eye, Navigation, Globe, Building2, Activity, Clock,
    Calendar, Hash, Database, CreditCard, ShieldCheck,
    User, Smartphone, AlertTriangle, ArrowRightLeft, Zap,
    ShoppingCart, Landmark, Terminal, RefreshCw, ArrowDownLeft, Loader2, Check, X
} from "lucide-react";

export default function SearchTransactionAnalysis() {
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

    // --- 1. THE SEARCH HUB (IDLE STATE) ---
    if (searchState === 'idle' || searchState === 'searching') {
        return (
            <DashboardLayout>
                <div className="max-w-5xl mx-auto mt-10 animate-in zoom-in-95 fade-in duration-500">

                    {/* Elite Hero Banner with Glassmorphism & Patterns */}
                    <div className="bg-[#00823B] rounded-t-[2.5rem] p-8 sm:p-14 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-2xl relative overflow-hidden group">
                        {/* Background Grid Pattern */}
                        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none transition-transform duration-1000 group-hover:scale-110"></div>
                        <div className="absolute -right-20 -top-20 opacity-10 pointer-events-none rotate-12 transition-transform duration-700 group-hover:rotate-45">
                            <Activity size={400} />
                        </div>

                        <div className="text-white relative z-10 max-w-xl">
                            <h3 className="text-3xl sm:text-5xl font-black tracking-tight mb-3 leading-tight">Search Transaction Audit</h3>
                            <p className="text-white/80 text-sm font-medium leading-relaxed">Instantly retrieve forensic data, webhook payloads, and gateway routing details using a unique identifier.</p>
                        </div>

                        {/* Live Stat Counters */}
                        <div className="flex items-center gap-6 sm:gap-10 text-white relative z-10 bg-black/20 px-8 py-5 rounded-3xl backdrop-blur-md border border-white/10 shadow-inner">
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">1.2M</span>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mt-2">Indexed</span>
                            </div>
                            <div className="w-px h-12 bg-white/20"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">45ms</span>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mt-2">Latency</span>
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
                                    placeholder="e.g. TXN_00000000X2010211..."
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
                                {["TXN_", "REF_", "SES_", "PAY_", "CUS_"].map(prefix => (
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

    // --- 2. THE DASHBOARD (FOUND STATE) ---
    const analysisTabs = [
        { id: 'Overview', icon: <Eye size={16}/>, title: "Overview", sub: "Core details" },
        { id: 'Webhook', icon: <Terminal size={16}/>, title: "Webhook", sub: "Event payloads" },
        { id: 'Gateway', icon: <Globe size={16}/>, title: "Gateway", sub: "Routing & Auth" },
        { id: 'Business', icon: <Building2 size={16}/>, title: "Business", sub: "Merchant data" },
        { id: 'Timeline', icon: <Activity size={16}/>, title: "Timeline", sub: "Lifecycle flow" },
        { id: 'Analytics', icon: <ShieldCheck size={16}/>, title: "Risk & Velocity", sub: "Fraud analysis" },
    ];

    return (
        <DashboardLayout>
            <div className="flex flex-col h-full max-w-7xl mx-auto animate-in slide-in-from-bottom-8 fade-in duration-500">

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
                                <h1 className="text-3xl font-black tracking-tight text-[var(--foreground)]">Analysis Report</h1>
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00823B]/10 border border-[#00823B]/20 text-[#00823B] rounded-lg text-[11px] font-black uppercase tracking-widest shadow-sm">
                                    <CheckCircle2 size={14}/> Success
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-[13px] font-bold text-gray-500">
                                <span className="font-mono bg-[var(--background)] px-3 py-1.5 rounded-lg border border-[var(--border)] flex items-center gap-2 shadow-inner text-[var(--foreground)]">
                                    # {searchQuery || "00000000X2010211"}
                                    <Copy size={14} className="cursor-pointer text-gray-400 hover:text-[#00823B] transition-colors" onClick={() => handleCopy(searchQuery || "00000000X2010211", 'id')}/>
                                    {copied === 'id' && <Check size={14} className="text-[#00823B]"/>}
                                </span>
                                <span className="flex items-center gap-2"><Calendar size={16} className="text-gray-400"/> Feb 21, 2026 • 05:50:07 AM</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Values & Tools */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10 w-full lg:w-auto border-t lg:border-t-0 border-[var(--border)] pt-6 lg:pt-0">
                        <div className="text-left lg:text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Gross Amount</p>
                            <h2 className="text-4xl font-black tracking-tight text-[var(--foreground)]">KES 700.00</h2>
                            <p className="text-sm font-bold text-[#00823B] mt-1 flex items-center lg:justify-end gap-1">
                                <ArrowDownLeft size={14}/> Net: KES 679.00
                            </p>
                        </div>
                        <div className="flex items-center gap-3 lg:border-l border-[var(--border)] lg:pl-6 w-full sm:w-auto">
                            <ActionButton icon={<Bookmark size={18}/>} tooltip="Save" />
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
                                className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all relative overflow-hidden group ${
                                    activeTab === tab.id
                                        ? "bg-[var(--foreground)] text-[var(--background)] shadow-lg dark:bg-white dark:text-black"
                                        : "bg-transparent text-gray-500 hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                                }`}
                            >
                                <div className={`p-2 rounded-xl transition-colors ${activeTab === tab.id ? 'bg-[var(--background)]/20 dark:bg-black/10' : 'bg-[var(--background)] border border-[var(--border)] group-hover:border-gray-400'}`}>
                                    {tab.icon}
                                </div>
                                <div className="text-left">
                                    <p className={`text-[14px] font-black leading-none tracking-tight ${activeTab === tab.id ? 'text-[var(--background)] dark:text-black' : 'text-[var(--foreground)]'}`}>{tab.title}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2.3 TAB CONTENT ENGINE */}
                <div className="bg-[var(--background)] border border-[var(--border)] border-t-0 rounded-b-[2.5rem] p-6 sm:p-10 flex-1 shadow-inner min-h-[600px]">
                    {activeTab === 'Overview' && <TabOverview />}
                    {activeTab === 'Webhook' && <TabWebhook />}
                    {activeTab === 'Gateway' && <TabGateway />}
                    {activeTab === 'Business' && <TabBusiness />}
                    {activeTab === 'Timeline' && <TabTimeline />}
                    {activeTab === 'Analytics' && <TabAnalytics />}
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
                        <div className="absolute top-0 left-0 w-full h-2 bg-[var(--foreground)]"></div>
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2.5 bg-[#00823B]/10 text-[#00823B] rounded-xl"><Landmark size={20}/></div>
                                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">Financial Ledger</h3>
                            </div>
                            <div className="space-y-4">
                                <ReceiptRow label="Gross Processing Vol." value="KES 700.00" />
                                <ReceiptRow label="Acquirer Fee (1.5%)" value="- KES 10.50" isSub />
                                <ReceiptRow label="SaySwitch Fee (1.5%)" value="- KES 10.50" isSub />
                                <ReceiptRow label="Tax / Stamp Duty" value="KES 0.00" isSub />
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t-2 border-dashed border-[var(--border)]">
                            <div className="flex justify-between items-end">
                                <span className="text-xs font-black uppercase tracking-widest text-[#00823B]">Net Settled</span>
                                <span className="text-2xl font-black text-[#00823B]">KES 679.00</span>
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 mt-2 text-right">Settled to Merchant Wallet</p>
                        </div>
                    </div>

                    {/* Metadata Grids */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <DetailCard title="Customer Identity" icon={<User size={18}/>}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                                <DataRow label="Name" value="Not Provided (Guest Profile)" />
                                <DataRow label="Email Address" value="customer_891@example.com" copyable />
                                <DataRow label="Phone Number" value="+254 712 345 678" copyable />
                                <DataRow label="IP Geolocation" value="172.71.223.202 (Nairobi, KE)" />
                            </div>
                        </DetailCard>

                        <DetailCard title="System Identifiers" icon={<Hash size={18}/>}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                                <DataRow label="Database ID" value="466544" copyable />
                                <DataRow label="Client Reference" value="00000000X2010211" copyable />
                                <DataRow label="Correlation ID" value="COR_17716493815489628" copyable />
                                <DataRow label="Gateway Session" value="SES_9981273918237" copyable />
                            </div>
                        </DetailCard>
                    </div>
                </div>
            </div>
        );
    }

    // ============================================================================
    // TAB: WEBHOOK (Terminal Style)
    // ============================================================================
    function TabWebhook() {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-[var(--card)] p-4 sm:p-6 rounded-3xl border border-[var(--border)] shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl"><Navigation size={24} className="rotate-45" /></div>
                        <div>
                            <h3 className="text-lg font-black tracking-tight text-[var(--foreground)]">Event Dispatcher</h3>
                            <p className="text-xs font-bold text-gray-500 mt-0.5">Webhook delivered to merchant endpoint successfully.</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">
                        <RefreshCw size={16} /> Force Resend Event
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <StatBox label="Status" value="Delivered" icon={<CheckCircle2 size={16} className="text-[#00823B]"/>} highlight />
                    <StatBox label="Attempts" value="1/3" icon={<RefreshCw size={16}/>} />
                    <StatBox label="Event Type" value="transaction.success" icon={<Activity size={16}/>} />
                    <StatBox label="Latency" value="142ms" icon={<Clock size={16}/>} />
                    <StatBox label="HTTP Code" value="200 OK" icon={<Globe size={16}/>} highlight />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <TerminalBlock title="POST /webhook/payload" icon={<Send size={14}/>} code={`{
  "event": "transaction.success",
  "data": {
    "id": 466544,
    "business_id": 252,
    "currency": "KES",
    "amount": "700",
    "fee": "21",
    "trx": "COR_17716493815489628",
    "reference": "00000000X2010211",
    "customer": {
       "ip": "172.71.223.202",
       "phone": "+254712345678"
    }
  }
}`} />
                    <TerminalBlock title="Response from Merchant Server" icon={<Globe size={14}/>} code={`HTTP/1.1 200 OK
Content-Type: application/json
Date: Sun, 21 Feb 2026 05:50:08 GMT

{
  "id": 2084870,
  "payment_system_transaction_id": "00000000X2010211",
  "status": "COMPLETED",
  "amount": 700,
  "currency": "KES",
  "message": "Webhook processed successfully.",
  "timestamp": "2026-02-21T05:50:08Z"
}`} />
                </div>
            </div>
        );
    }

    // ============================================================================
    // TAB: GATEWAY (CSS Credit Card)
    // ============================================================================
    function TabGateway() {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Visual Payment Source */}
                    <DetailCard title="Payment Instrument" icon={<CreditCard size={18}/>}>

                        {/* CSS Credit Card Design */}
                        <div className="w-full max-w-sm mx-auto h-48 sm:h-56 bg-gradient-to-br from-slate-800 to-black rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden mb-6 border border-slate-700">
                            {/* Card Chip & Network */}
                            <div className="flex justify-between items-start relative z-10">
                                <div className="w-12 h-10 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-md opacity-80 border border-yellow-600/50"></div>
                                <div className="text-white/90 font-black text-xl italic tracking-tighter">VISA</div>
                            </div>
                            {/* Card Number */}
                            <div className="relative z-10 mt-auto">
                                <div className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Card Number</div>
                                <div className="text-white font-mono text-xl sm:text-2xl tracking-[0.2em] shadow-sm">**** **** **** 4091</div>
                            </div>
                            {/* Card Footer */}
                            <div className="flex justify-between items-end relative z-10 mt-6">
                                <div>
                                    <div className="text-white/60 text-[8px] font-black uppercase tracking-widest mb-1">Cardholder</div>
                                    <div className="text-white font-black text-sm uppercase tracking-widest">GUEST USER</div>
                                </div>
                                <div>
                                    <div className="text-white/60 text-[8px] font-black uppercase tracking-widest mb-1">Expires</div>
                                    <div className="text-white font-mono text-sm tracking-widest">12/28</div>
                                </div>
                            </div>
                            {/* Decor */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <DataRow label="Auth Method" value="3D Secure V2" />
                            <DataRow label="Funding Source" value="Credit" />
                            <DataRow label="Card Issuer" value="Safaricom PLC" />
                            <DataRow label="Card Country" value="Kenya (KE)" />
                        </div>
                    </DetailCard>

                    {/* Routing Details */}
                    <DetailCard title="Acquirer & Routing Data" icon={<ArrowRightLeft size={18}/>}>
                        <div className="space-y-6">
                            <DataRow label="Payment Processor" value="MPESA / CyberSource Gateway" />
                            <DataRow label="Acquirer Ref (ARN)" value="899210293847162599001" copyable />
                            <DataRow label="Auth Code" value="AUTH-8821" copyable />

                            <div className="p-5 bg-[#00823B]/10 border border-[#00823B]/20 rounded-2xl">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#00823B] mb-1">Gateway Response</p>
                                <p className="text-sm font-black text-[var(--foreground)]">Approved & Completed Successfully</p>
                            </div>

                            <DataRow label="Network Latency" value="840ms" />
                            <DataRow label="Settlement Path" value="T+1 Standard (Batch 102A)" />
                        </div>
                    </DetailCard>
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
                <div className="bg-[var(--card)] p-8 sm:p-10 rounded-[2.5rem] border border-[var(--border)] shadow-xl relative overflow-hidden">
                    {/* Background Graphic */}
                    <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none -mb-10 -mr-10">
                        <Building2 size={300} />
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10 mb-10">
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-indigo-500/30 shrink-0">
                            MT
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                                <h2 className="text-3xl font-black text-[var(--foreground)] tracking-tight">Machika Telecoms</h2>
                                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-indigo-500/20">Tier 3 Verified</span>
                            </div>
                            <p className="text-sm font-bold text-gray-500">Business ID: 252 • Registered March 2025 • Telecommunications</p>
                        </div>
                        <button className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] dark:bg-white dark:text-black rounded-2xl text-sm font-black hover:scale-105 transition-transform shadow-lg shrink-0">
                            Open Full Profile
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10 border-t border-[var(--border)] pt-10">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Live Wallet Balance</p>
                            <p className="text-3xl font-black text-[var(--foreground)] tracking-tight">KES 145,290.00</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Settlement Destination</p>
                            <p className="text-lg font-black text-[var(--foreground)] tracking-tight">KCB Bank Kenya</p>
                            <p className="text-sm font-bold text-gray-500 font-mono mt-1">Acct: ****4412</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Account Manager</p>
                            <p className="text-lg font-black text-[var(--foreground)] tracking-tight">Admin Super</p>
                            <p className="text-sm font-bold text-gray-500 mt-1">super@sayswitch.com</p>
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
            { title: "Checkout Session Created", time: "5:48:12 AM", desc: "Customer initiated payment via SaySwitch Hosted Page.", icon: <ShoppingCart size={16}/>, color: "text-gray-500", bg: "bg-gray-500/10", border: "border-gray-500/20" },
            { title: "3D Secure Authentication Triggered", time: "5:49:05 AM", desc: "Customer redirected to issuing bank OTP challenge page.", icon: <ShieldCheck size={16}/>, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
            { title: "Charge Authorized & Captured", time: "5:49:45 AM", desc: "Acquirer approved the transaction for KES 700.00.", icon: <CheckCircle2 size={16}/>, color: "text-[#00823B]", bg: "bg-[#00823B]/10", border: "border-[#00823B]/20" },
            { title: "Webhook Successfully Delivered", time: "5:50:07 AM", desc: "200 OK received from merchant server (142ms latency).", icon: <Send size={16}/>, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
            { title: "Funds Settled to Merchant Wallet", time: "5:50:08 AM", desc: "Net amount of KES 679.00 credited to Business ID 252.", icon: <Landmark size={16}/>, color: "text-[#00823B]", bg: "bg-[#00823B] text-white", border: "border-[#00823B] shadow-lg shadow-[#00823B]/30" },
        ];

        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto py-8">
                <div className="relative">
                    {/* The Line */}
                    <div className="absolute left-[27px] sm:left-[39px] top-4 bottom-4 w-1 bg-[var(--border)] rounded-full"></div>

                    <div className="space-y-10 relative z-10">
                        {events.map((evt, idx) => (
                            <div key={idx} className="flex gap-6 sm:gap-8 group">
                                {/* The Icon Node */}
                                <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full border-4 border-[var(--background)] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${evt.bg} ${evt.color} ${evt.border}`}>
                                    {evt.icon}
                                </div>

                                {/* Content Card */}
                                <div className="bg-[var(--card)] p-6 sm:p-8 rounded-3xl border border-[var(--border)] shadow-sm hover:shadow-md hover:border-gray-400 transition-all flex-1 -mt-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                        <h4 className="text-base font-black text-[var(--foreground)] tracking-tight">{evt.title}</h4>
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
    // TAB: ANALYTICS & RISK
    // ============================================================================
    function TabAnalytics() {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Visual Risk Gauge */}
                    <div className="bg-[var(--card)] p-8 rounded-[2rem] border border-[var(--border)] shadow-sm flex flex-col items-center justify-center text-center">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-8 w-full text-left">Fraud AI Assessment</h3>

                        {/* Custom SVG Gauge */}
                        <div className="relative w-48 h-48 mb-6">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" stroke="var(--border)" strokeWidth="8" fill="none" />
                                <circle cx="50" cy="50" r="40" stroke="#00823B" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="230" className="animate-[spin_1s_ease-out_forwards]" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black text-[#00823B] tracking-tighter">03</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">Score / 100</span>
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00823B]/10 border border-[#00823B]/20 text-[#00823B] rounded-xl text-xs font-black uppercase tracking-widest mb-6">
                            <ShieldCheck size={16}/> Extremely Low Risk
                        </div>
                        <p className="text-sm font-bold text-gray-500 max-w-xs">Transaction passed all 42 security heuristics and 3D Secure verification.</p>
                    </div>

                    {/* Detailed Rules Check */}
                    <DetailCard title="Security Rule Matrix" icon={<Activity size={18}/>}>
                        <div className="space-y-4 mt-2">
                            <RuleCheck label="Address Verification System (AVS)" pass />
                            <RuleCheck label="Card Verification Value (CVV)" pass />
                            <RuleCheck label="IP Geolocation matches BIN Country" pass />
                            <RuleCheck label="Velocity: >5 txns in 24 hours" pass={false} neutral />
                            <RuleCheck label="Device Fingerprint matches history" pass />
                            <RuleCheck label="Email Domain Reputation" pass />
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
            <button className="p-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-gray-400 hover:text-[var(--foreground)] hover:border-gray-400 transition-all shadow-sm" title={tooltip}>
                {icon}
            </button>
        );
    }

    function DetailCard({ title, icon, children, className = "" }: any) {
        return (
            <div className={`bg-[var(--card)] p-6 sm:p-8 rounded-[2rem] border border-[var(--border)] shadow-sm ${className}`}>
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-8 flex items-center gap-2 pb-4 border-b border-[var(--border)]">
                    {icon} {title}
                </h3>
                <div className="flex flex-col gap-6">
                    {children}
                </div>
            </div>
        );
    }

    function DataRow({ label, value, copyable = false }: any) {
        return (
            <div className="flex flex-col gap-1.5 border-b border-[var(--border)]/50 pb-4 last:border-0 last:pb-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</span>
                <div className="flex items-center gap-2">
                    <span className="text-[14px] font-black text-[var(--foreground)] tracking-tight break-all">{value}</span>
                    {copyable && <Copy size={12} className="text-gray-400 hover:text-[#00823B] cursor-pointer transition-colors" />}
                </div>
            </div>
        );
    }

    function ReceiptRow({ label, value, isSub = false }: any) {
        return (
            <div className="flex justify-between items-center py-1">
                <span className={`text-sm font-bold ${isSub ? 'text-gray-500' : 'text-[var(--foreground)] font-black'}`}>{label}</span>
                <span className={`text-sm font-black ${value.includes('-') ? 'text-red-500' : 'text-[var(--foreground)]'}`}>{value}</span>
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

    function RuleCheck({ label, pass, neutral = false }: any) {
        return (
            <div className="flex items-center gap-4 py-3 border-b border-[var(--border)]/50 last:border-0 last:pb-0">
                <div className={`p-1.5 rounded-full shrink-0 ${pass ? 'bg-[#00823B]/20 text-[#00823B]' : neutral ? 'bg-gray-500/20 text-gray-500' : 'bg-red-500/20 text-red-500'}`}>
                    {pass ? <Check size={14}/> : neutral ? <Activity size={14}/> : <X size={14}/>}
                </div>
                <span className="text-sm font-bold text-[var(--foreground)]">{label}</span>
            </div>
        );
    }
}