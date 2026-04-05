"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Search, CheckCircle2, Copy, Maximize2, Send,
    Bookmark, Share2, Download, MoreVertical,
    Eye, Building2, Activity, Clock, Calendar,
    Hash, Database, ShieldCheck, UserCheck,
    ArrowUpRight, Landmark, Lock, FileText, Check,
    ArrowRight, X, Loader2, Terminal, Navigation, Globe, RefreshCw, ShoppingCart, Smartphone, CreditCard
} from "lucide-react";

export default function SearchCheckoutAnalysis() {
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
                            <ShoppingCart size={350} />
                        </div>

                        <div className="text-white relative z-10 max-w-xl">
                            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3 leading-tight">Checkout Forensic Search</h1>
                            <p className="text-white/90 text-sm font-medium leading-relaxed">Investigate hosted payment sessions, track customer drop-offs, device fingerprinting, and 3D Secure authentications.</p>
                        </div>

                        {/* Live Stat Counters */}
                        <div className="flex items-center gap-6 sm:gap-10 text-white relative z-10 bg-black/20 px-8 py-5 rounded-3xl backdrop-blur-md border border-white/10 shadow-inner">
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">5.2M</span>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70 mt-2">Sessions</span>
                            </div>
                            <div className="w-px h-12 bg-white/20"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">32ms</span>
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
                                    placeholder="e.g. CHK_88291029, ORD_2026..."
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
                                {["CHK_", "ORD_", "SES_", "CUS_"].map(prefix => (
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
        { id: 'Customer', icon: <UserCheck size={16}/>, title: "Customer", sub: "Identity & Device" },
        { id: 'Payment', icon: <CreditCard size={16}/>, title: "Payment Source", sub: "Card / Transfer" },
        { id: 'Webhook', icon: <Terminal size={16}/>, title: "Webhook", sub: "Event Payloads" },
        { id: 'Business', icon: <Building2 size={16}/>, title: "Business", sub: "Merchant" },
        { id: 'Timeline', icon: <Activity size={16}/>, title: "Timeline", sub: "Session Log" },
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
                                <h1 className="text-3xl font-black tracking-tight text-[var(--foreground)]">Checkout Analysis</h1>
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00823B]/10 border border-[#00823B]/20 text-[#00823B] rounded-lg text-[11px] font-black uppercase tracking-widest shadow-sm">
                                    <CheckCircle2 size={14}/> Successful
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-[13px] font-bold text-gray-500">
                                <span className="font-mono bg-[var(--background)] px-3 py-1.5 rounded-lg border border-[var(--border)] flex items-center gap-2 shadow-inner text-[var(--foreground)]">
                                    # {searchQuery || "CHK_88291029"}
                                    <Copy size={14} className="cursor-pointer text-gray-400 hover:text-[#00823B] transition-colors" onClick={() => handleCopy(searchQuery || "CHK_88291029", 'id')}/>
                                    {copied === 'id' && <Check size={14} className="text-[#00823B]"/>}
                                </span>
                                <span className="flex items-center gap-2"><Calendar size={16} className="text-gray-400"/> Apr 05, 2026 • 09:12:44 AM</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Values & Tools */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10 w-full lg:w-auto border-t lg:border-t-0 border-[var(--border)] pt-6 lg:pt-0">
                        <div className="text-left lg:text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Order Amount</p>
                            <h2 className="text-4xl font-black tracking-tight text-[var(--foreground)]">₦15,000.00</h2>
                            <p className="text-sm font-bold text-[#00823B] mt-1 flex items-center lg:justify-end gap-1">
                                <ShieldCheck size={14}/> Fraud Score: Low Risk
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
                                className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all relative overflow-hidden group ${
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
                    {activeTab === 'Customer' && <TabCustomer />}
                    {activeTab === 'Payment' && <TabPayment />}
                    {activeTab === 'Webhook' && <TabWebhook />}
                    {activeTab === 'Business' && <TabBusiness />}
                    {activeTab === 'Timeline' && <TabTimeline />}
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
                                <div className="p-2.5 bg-[#00823B]/10 text-[#00823B] rounded-xl"><ShoppingCart size={20}/></div>
                                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">Checkout Order</h3>
                            </div>
                            <div className="space-y-4">
                                <ReceiptRow label="Order Amount" value="₦15,000.00" />
                                <ReceiptRow label="Merchant Fee (1.5%)" value="- ₦225.00" isSub />
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t-2 border-dashed border-[var(--border)] relative">
                            {/* Receipt Cutout dots */}
                            <div className="absolute -left-10 -top-2 w-4 h-4 rounded-full bg-[var(--background)] border-r border-[var(--border)]"></div>
                            <div className="absolute -right-10 -top-2 w-4 h-4 rounded-full bg-[var(--background)] border-l border-[var(--border)]"></div>

                            <div className="flex justify-between items-end">
                                <span className="text-xs font-black uppercase tracking-widest text-[#00823B]">Customer Paid</span>
                                <span className="text-2xl font-black text-[#00823B]">₦15,000.00</span>
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 mt-2 text-right">Captured successfully</p>
                        </div>
                    </div>

                    {/* Metadata Grids */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <DetailCard title="Customer Basics" icon={<UserCheck size={18}/>}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                                <DataRow label="Customer Name" value="John Doe" />
                                <DataRow label="Email Address" value="j.doe@gmail.com" copyable />
                                <DataRow label="Phone Number" value="+234 803 456 7890" copyable />
                                <DataRow label="Returning Customer" value="Yes (5th Order)" isHighlight color="text-[#00823B]" />
                            </div>
                        </DetailCard>

                        <DetailCard title="System Identifiers" icon={<Hash size={18}/>}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                                <DataRow label="Checkout Session ID" value="CHK_88291029" copyable />
                                <DataRow label="Merchant Order Ref" value="ORD-2026-04-05" copyable />
                                <DataRow label="Payment Method" value="Credit Card" />
                                <DataRow label="Fraud AI Score" value="Low Risk (03/100)" isHighlight color="text-[#00823B]" />
                            </div>
                        </DetailCard>
                    </div>
                </div>
            </div>
        );
    }

    // ============================================================================
    // TAB: CUSTOMER (Identity & Device Fingerprint)
    // ============================================================================
    function TabCustomer() {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Device Fingerprint */}
                    <DetailCard title="Device & Network" icon={<Smartphone size={18}/>}>
                        <div className="p-5 bg-[#00823B]/5 border border-[#00823B]/20 rounded-2xl flex items-start gap-4 mb-4">
                            <ShieldCheck size={24} className="text-[#00823B] shrink-0" />
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#00823B] mb-1">Device Trusted</p>
                                <p className="text-sm font-bold text-[var(--foreground)]">This device fingerprint has successfully completed transactions on SaySwitch before. No proxies or VPNs detected.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                            <DataRow label="IP Address" value="197.210.64.12" copyable />
                            <DataRow label="Geolocation" value="Lagos, Nigeria" />
                            <DataRow label="OS & Browser" value="iOS 17.4 / Safari Mobile" />
                            <DataRow label="Screen Resolution" value="393x852" />
                        </div>
                    </DetailCard>

                    {/* Customer Velocity / History */}
                    <DetailCard title="Customer Velocity" icon={<Activity size={18}/>}>
                        <div className="space-y-4">
                            <div className="p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Lifetime Value</p>
                                    <p className="text-xl font-black text-[var(--foreground)] tracking-tight">₦450,200.00</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Orders</p>
                                    <p className="text-xl font-black text-[#00823B] tracking-tight">5</p>
                                </div>
                            </div>

                            <DataRow label="First Seen" value="Feb 12, 2026" />
                            <DataRow label="Chargeback History" value="0 Disputes (Excellent Standing)" />
                            <DataRow label="Cards Saved" value="1 (Tokenized)" />
                        </div>
                    </DetailCard>
                </div>
            </div>
        );
    }

    // ============================================================================
    // TAB: PAYMENT (Card Info)
    // ============================================================================
    function TabPayment() {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Visual Bank Card */}
                    <DetailCard title="Payment Instrument" icon={<CreditCard size={18}/>}>

                        {/* Card Design */}
                        <div className="w-full max-w-sm mx-auto bg-gradient-to-br from-slate-800 to-black rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden mb-6 border border-slate-700/50">
                            {/* Card Chip & Network */}
                            <div className="flex justify-between items-start relative z-10 mb-8">
                                <div className="w-12 h-10 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-md opacity-80 border border-yellow-600/50"></div>
                                <div className="text-white/90 font-black text-2xl italic tracking-tighter">VISA</div>
                            </div>
                            {/* Account Number */}
                            <div className="relative z-10 mb-6 mt-auto">
                                <div className="text-white/50 text-[9px] font-black uppercase tracking-widest mb-1">Card Number</div>
                                <div className="text-white font-mono text-2xl sm:text-3xl tracking-[0.15em] shadow-sm">**** **** 4091</div>
                            </div>
                            {/* Account Name */}
                            <div className="flex justify-between items-end relative z-10">
                                <div>
                                    <div className="text-white/50 text-[8px] font-black uppercase tracking-widest mb-1">Cardholder</div>
                                    <div className="text-white font-black text-[13px] uppercase tracking-widest">JOHN DOE</div>
                                </div>
                                <div>
                                    <div className="text-white/50 text-[8px] font-black uppercase tracking-widest mb-1">Expires</div>
                                    <div className="text-white font-mono text-sm tracking-widest">12/28</div>
                                </div>
                            </div>
                            {/* Decor */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#00823B]/20 rounded-full blur-[80px] pointer-events-none"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <DataRow label="Funding Source" value="Credit" />
                            <DataRow label="Issuer Country" value="Nigeria (NG)" />
                        </div>
                    </DetailCard>

                    {/* Authorization Details */}
                    <DetailCard title="Acquirer & Authorization" icon={<Lock size={18}/>}>
                        <div className="space-y-6">
                            <div className="p-5 bg-[#00823B]/10 border border-[#00823B]/20 rounded-2xl flex items-start gap-4">
                                <ShieldCheck size={24} className="text-[#00823B] shrink-0" />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#00823B] mb-1">3D Secure Verified</p>
                                    <p className="text-sm font-bold text-[var(--foreground)]">Customer successfully authenticated via OTP. Liability shift applies.</p>
                                </div>
                            </div>
                            <DataRow label="Payment Processor" value="CyberSource Gateway" />
                            <DataRow label="Acquirer Ref (ARN)" value="899210293847162599001" copyable />
                            <DataRow label="Auth Code" value="AUTH-8821" copyable />
                            <DataRow label="Response Message" value="Approved & Completed Successfully" />
                        </div>
                    </DetailCard>
                </div>
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
                    <StatBox label="Event Type" value="checkout.success" icon={<Activity size={16}/>} />
                    <StatBox label="Latency" value="214ms" icon={<Clock size={16}/>} />
                    <StatBox label="HTTP Code" value="200 OK" icon={<Globe size={16}/>} highlight />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <TerminalBlock title="POST /webhook/checkout" icon={<Send size={14}/>} code={`{
  "event": "checkout.success",
  "data": {
    "session_id": "CHK_88291029",
    "business_id": 252,
    "currency": "NGN",
    "amount": "15000",
    "fee": "225",
    "reference": "ORD-2026-04-05",
    "customer": {
       "name": "John Doe",
       "email": "j.doe@gmail.com",
       "phone": "+2348034567890"
    },
    "payment_method": "card",
    "authorization": {
       "auth_code": "AUTH-8821",
       "last4": "4091",
       "card_type": "visa"
    }
  }
}`} />
                    <TerminalBlock title="Response from Merchant Server" icon={<Globe size={14}/>} code={`HTTP/1.1 200 OK
Content-Type: application/json
Date: Sun, 05 Apr 2026 09:13:00 GMT

{
  "status": "success",
  "message": "Checkout webhook received and order updated.",
  "timestamp": "2026-04-05T09:13:00Z"
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
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2"><ShoppingCart size={14}/> Checkout Configuration</p>
                            <p className="text-xl font-black text-[var(--foreground)] tracking-tight">API & Hosted Page</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2"><CreditCard size={14}/> Allowed Methods</p>
                            <p className="text-xl font-black text-[var(--foreground)] tracking-tight">Card, Bank, USSD</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Activity size={14}/> Fee Structure</p>
                            <p className="text-xl font-black text-[var(--foreground)] tracking-tight">1.5% Cap ₦2000</p>
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
            { title: "Checkout Session Created", time: "09:11:42 AM", desc: "Customer visited hosted payment page via merchant redirect.", icon: <Globe size={18}/>, status: "completed" },
            { title: "Method Selected: Card", time: "09:12:05 AM", desc: "Customer inputted Visa Card ending in 4091.", icon: <CreditCard size={18}/>, status: "completed" },
            { title: "3D Secure Authentication Triggered", time: "09:12:15 AM", desc: "Customer redirected to issuing bank OTP challenge page.", icon: <Lock size={18}/>, status: "completed" },
            { title: "Charge Authorized & Captured", time: "09:12:44 AM", desc: "Acquirer approved the transaction for ₦15,000.00.", icon: <CheckCircle2 size={18}/>, status: "completed" },
            { title: "Webhook Dispatched", time: "09:13:00 AM", desc: "Event dispatched to merchant webhook URL.", icon: <Send size={18}/>, status: "completed" },
            { title: "Transaction Settled", time: "09:13:01 AM", desc: "Funds queued for Next-Day Settlement (T+1).", icon: <Landmark size={18}/>, status: "active" },
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
                <span className={`text-sm z-10 bg-[var(--card)] pl-2 font-black tracking-tight ${value.includes('-') ? 'text-red-500' : 'text-[var(--foreground)]'}`}>{value}</span>
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