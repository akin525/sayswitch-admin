"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    ShieldCheck, Building2, Users, FileText, AlertTriangle,
    CheckCircle2, XCircle, Clock, Search, Filter,
    ChevronRight, ArrowLeft, Database, Activity,
    FileBadge, ScanFace, Globe, Check, X, Download, MessageSquare, Copy, Eye
} from "lucide-react";

export default function ComplianceApprovalPage() {
    const [viewState, setViewState] = useState<'queue' | 'reviewing'>('queue');
    const [activeTab, setActiveTab] = useState('Overview');

    const handleReview = () => {
        setViewState('reviewing');
        setActiveTab('Overview');
    };

    const backToQueue = () => {
        setViewState('queue');
    };

    // ============================================================================
    // 1. THE QUEUE VIEW (IDLE STATE)
    // ============================================================================
    if (viewState === 'queue') {
        const queue = [
            { id: "MER-00912", name: "Machika Telecoms", type: "LLC", tier: "Tier 3", submitted: "2 hours ago", risk: "Low", status: "Pending Review" },
            { id: "MER-00913", name: "Spayz Logistics", type: "Sole Prop", tier: "Tier 2", submitted: "5 hours ago", risk: "Medium", status: "Pending Review" },
            { id: "MER-00914", name: "Global Foodies", type: "LLC", tier: "Tier 3", submitted: "1 day ago", risk: "High", status: "Escalated" },
            { id: "MER-00915", name: "Green Energy Ltd", type: "Public Ltd", tier: "Tier 3", submitted: "2 days ago", risk: "Low", status: "Awaiting Info" },
        ];

        return (
            <DashboardLayout>
                <div className="max-w-6xl mx-auto mt-8 animate-in fade-in duration-500">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2.5 bg-[#00823B]/10 text-[#00823B] rounded-2xl">
                                    <ShieldCheck size={24} />
                                </div>
                                <h1 className="text-3xl font-black tracking-tight text-[var(--foreground)]">Compliance Queue</h1>
                            </div>
                            <p className="text-sm font-bold text-gray-500">Review KYB applications, verify documents, and approve merchants.</p>
                        </div>
                        <div className="flex gap-4">
                            <StatPill label="Pending Reviews" value="24" icon={<Clock size={16}/>} />
                            <StatPill label="High Risk" value="3" icon={<AlertTriangle size={16}/>} alert />
                        </div>
                    </div>

                    {/* Search & Filters */}
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-4 mb-6 shadow-sm flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search business name, RC number, or email..."
                                className="w-full pl-12 pr-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-2xl text-sm font-bold outline-none focus:border-[#00823B] transition-colors"
                            />
                        </div>
                        <button className="px-6 py-3 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-2xl text-sm font-black hover:border-gray-400 transition-all flex items-center gap-2">
                            <Filter size={18}/> Filters
                        </button>
                    </div>

                    {/* Queue Table */}
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-[2.5rem] shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-[var(--background)]/50 border-b border-[var(--border)]">
                                <tr>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Business Identity</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Structure & Tier</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">AI Risk Score</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Action</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--border)]">
                                {queue.map((req) => (
                                    <tr key={req.id} className="hover:bg-[#00823B]/5 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center font-black text-gray-500 group-hover:text-[#00823B] group-hover:border-[#00823B]/30 transition-colors">
                                                    {req.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-[15px] font-black text-[var(--foreground)]">{req.name}</p>
                                                    <p className="text-[11px] font-bold text-gray-500">{req.id} • Submitted {req.submitted}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1.5 items-start">
                                                <span className="px-2.5 py-1 bg-[var(--background)] border border-[var(--border)] text-gray-600 rounded-md text-[10px] font-black uppercase tracking-widest">{req.type}</span>
                                                <span className="text-[12px] font-bold text-gray-500">{req.tier} Request</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                                                    req.risk === 'Low' ? 'bg-[#00823B]/10 text-[#00823B]' :
                                                        req.risk === 'Medium' ? 'bg-amber-500/10 text-amber-600' : 'bg-red-500/10 text-red-600'
                                                }`}>
                                                    <Activity size={12}/> {req.risk} Risk
                                                </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button onClick={handleReview} className="px-5 py-2.5 bg-[#00823B] text-white rounded-xl text-xs font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all flex items-center gap-2 ml-auto">
                                                Review <ChevronRight size={14}/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    // ============================================================================
    // 2. THE REVIEW DASHBOARD
    // ============================================================================
    const reviewTabs = [
        { id: 'Overview', icon: <Building2 size={16}/>, title: "Overview", sub: "Business Info" },
        { id: 'Documents', icon: <FileBadge size={16}/>, title: "Documents", sub: "KYC & KYB" },
        { id: 'Directors', icon: <Users size={16}/>, title: "Directors", sub: "UBOs & Execs" },
        { id: 'RiskAML', icon: <ShieldCheck size={16}/>, title: "Risk & AML", sub: "Sanctions Check" },
    ];

    return (
        <DashboardLayout>
            <div className="flex flex-col h-full max-w-[1400px] mx-auto animate-in slide-in-from-right-8 fade-in duration-500">

                {/* 2.1 BACK NAV & ACTION HEADER */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <button onClick={backToQueue} className="flex items-center gap-2 text-sm font-black text-gray-500 hover:text-[var(--foreground)] transition-colors w-fit">
                        <ArrowLeft size={16}/> Back to Queue
                    </button>
                    <div className="flex items-center gap-3">
                        <button className="px-5 py-2.5 bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--card)] text-[var(--foreground)] rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-sm">
                            <MessageSquare size={14}/> Request Info
                        </button>
                        <button className="px-5 py-2.5 bg-red-500/10 text-red-600 border border-red-500/20 hover:bg-red-500 hover:text-white rounded-xl text-xs font-black transition-all flex items-center gap-2">
                            <XCircle size={14}/> Reject
                        </button>
                        <button className="px-6 py-2.5 bg-[#00823B] text-white rounded-xl text-xs font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all flex items-center gap-2">
                            <CheckCircle2 size={14}/> Approve Tier 3
                        </button>
                    </div>
                </div>

                {/* 2.2 BUSINESS IDENTITY HEADER */}
                <div className="bg-[var(--card)] rounded-t-[2.5rem] border border-[var(--border)] p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00823B]/5 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="flex items-start sm:items-center gap-6 relative z-10">
                        <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-[#005C29] to-[#00823B] flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-[#00823B]/30 shrink-0 border-4 border-[var(--background)]">
                            MT
                        </div>
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-3xl font-black tracking-tight text-[var(--foreground)]">Machika Telecoms</h1>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                    <Clock size={12}/> In Review
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-[13px] font-bold text-gray-500">
                                <span>ID: MER-00912</span>
                                <span>•</span>
                                <span>Limited Liability Company (LLC)</span>
                                <span>•</span>
                                <span>Applied for: Tier 3</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2.3 TAB NAVIGATION */}
                <div className="bg-[var(--card)] border-x border-b border-[var(--border)] px-4 sm:px-8 overflow-x-auto scrollbar-hide relative z-20">
                    <div className="flex min-w-max gap-1 py-3">
                        {reviewTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl transition-all relative overflow-hidden group ${
                                    activeTab === tab.id
                                        ? "bg-[var(--foreground)] text-[var(--background)] shadow-lg dark:bg-white dark:text-black"
                                        : "bg-transparent text-gray-500 hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                                }`}
                            >
                                <div className={`p-2 rounded-xl transition-colors ${activeTab === tab.id ? 'bg-[var(--background)]/20 dark:bg-black/10' : 'bg-[var(--background)] border border-[var(--border)] group-hover:border-gray-400'}`}>
                                    {tab.icon}
                                </div>
                                <p className={`text-[13px] font-black leading-none tracking-tight pr-2 ${activeTab === tab.id ? 'text-[var(--background)] dark:text-black' : 'text-[var(--foreground)]'}`}>{tab.title}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2.4 TAB CONTENT ENGINE */}
                <div className="bg-[var(--background)] border border-[var(--border)] border-t-0 rounded-b-[2.5rem] p-6 sm:p-10 flex-1 shadow-inner min-h-[600px]">
                    {activeTab === 'Overview' && <TabOverview />}
                    {activeTab === 'Documents' && <TabDocuments />}
                    {activeTab === 'Directors' && <TabDirectors />}
                    {activeTab === 'RiskAML' && <TabRiskAML />}
                </div>
            </div>
        </DashboardLayout>
    );

    // ============================================================================
    // TAB: OVERVIEW (Business Profile)
    // ============================================================================
    function TabOverview() {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <DetailCard title="Corporate Identity" icon={<Building2 size={18}/>}>
                        <DataRow label="Registered Business Name" value="Machika Telecommunications Limited" />
                        <DataRow label="Registration Number (RC)" value="RC-1029384" copyable />
                        <DataRow label="Tax Identification Number (TIN)" value="1928374650-0001" copyable />
                        <DataRow label="Date of Incorporation" value="14 August 2018" />
                        <DataRow label="Industry / Category" value="Telecommunications & IT Services" />
                    </DetailCard>

                    <DetailCard title="Contact & Operations" icon={<Globe size={18}/>}>
                        <DataRow label="Official Email" value="admin@machikatelecoms.ng" copyable />
                        <DataRow label="Support Phone" value="+234 800 123 4567" copyable />
                        <DataRow label="Website" value="https://machikatelecoms.ng" isLink />
                        <DataRow label="Registered Address" value="14 Victoria Island Way, Lagos, Nigeria" />
                        <DataRow label="Expected Monthly Volume" value="₦50M - ₦100M" />
                    </DetailCard>
                </div>
            </div>
        );
    }

    // ============================================================================
    // TAB: DOCUMENTS (KYC/KYB Uploads)
    // ============================================================================
    function TabDocuments() {
        const docs = [
            { name: "Certificate of Incorporation", type: "PDF", status: "verified", date: "Mar 29, 2026" },
            { name: "Memorandum & Articles (MEMART)", type: "PDF", status: "pending", date: "Mar 29, 2026" },
            { name: "Status Report (CAC 1.1)", type: "PDF", status: "verified", date: "Mar 29, 2026" },
            { name: "Utility Bill (Proof of Address)", type: "JPEG", status: "rejected", date: "Mar 29, 2026", note: "Document is blurry/unreadable." },
            { name: "Director ID (Yusuf Tasiu)", type: "PNG", status: "verified", date: "Mar 29, 2026" },
        ];

        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {docs.map((doc, i) => (
                        <div key={i} className={`bg-[var(--card)] p-6 rounded-[2rem] border shadow-sm flex flex-col justify-between transition-all hover:shadow-md ${
                            doc.status === 'rejected' ? 'border-red-500/30' : 'border-[var(--border)]'
                        }`}>
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-gray-500">
                                        <FileText size={20}/>
                                    </div>
                                    <DocBadge status={doc.status} />
                                </div>
                                <h4 className="text-sm font-black text-[var(--foreground)] leading-snug mb-1">{doc.name}</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{doc.type} • Uploaded {doc.date}</p>

                                {doc.note && (
                                    <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                                        <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-0.5">Rejection Reason</p>
                                        <p className="text-xs font-bold text-red-600/80">{doc.note}</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex gap-2">
                                <button className="flex-1 py-2.5 bg-[var(--background)] border border-[var(--border)] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl text-xs font-black text-[var(--foreground)] transition-colors flex items-center justify-center gap-2">
                                    <Eye size={14}/> View
                                </button>
                                {doc.status !== 'verified' && (
                                    <button className="flex-1 py-2.5 bg-[#00823B]/10 border border-[#00823B]/20 hover:bg-[#00823B] hover:text-white text-[#00823B] rounded-xl text-xs font-black transition-colors flex items-center justify-center gap-2">
                                        <Check size={14}/> Verify
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ============================================================================
    // TAB: DIRECTORS (UBOs)
    // ============================================================================
    function TabDirectors() {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <DetailCard title="Primary Director / UBO" icon={<Users size={18}/>}>
                    <div className="flex flex-col md:flex-row gap-8">

                        {/* Biometric Card */}
                        <div className="w-full md:w-64 shrink-0 flex flex-col gap-4">
                            <div className="aspect-square bg-[var(--background)] border-2 border-[var(--border)] border-dashed rounded-[2rem] overflow-hidden relative group">
                                {/* Simulated Image Placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                    <ScanFace size={60} className="text-slate-400 opacity-50" />
                                </div>
                                <div className="absolute bottom-4 left-0 right-0 text-center z-20">
                                    <span className="px-3 py-1 bg-[#00823B] text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg">98% Liveness Match</span>
                                </div>
                            </div>
                            <button className="w-full py-3 bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--card)] rounded-xl text-xs font-black transition-colors flex justify-center items-center gap-2">
                                <Download size={14}/> Download ID
                            </button>
                        </div>

                        {/* Data Grid */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 content-start">
                            <DataRow label="Full Legal Name" value="Yusuf Tasiu Machika" />
                            <DataRow label="Role / Title" value="Managing Director (100% Shareholder)" />

                            <div className="sm:col-span-2 p-5 bg-[#00823B]/5 border border-[#00823B]/20 rounded-2xl flex items-start gap-4">
                                <ShieldCheck size={20} className="text-[#00823B] shrink-0" />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#00823B] mb-1">BVN Verified via NIBSS</p>
                                    <p className="text-sm font-bold text-[var(--foreground)]">Bank Verification Number matches provided identity documents and facial biometrics.</p>
                                </div>
                            </div>

                            <DataRow label="BVN" value="22334455667" copyable />
                            <DataRow label="Date of Birth" value="12 May 1985" />
                            <DataRow label="Phone Number" value="+234 803 111 2222" />
                            <DataRow label="Residential Address" value="Plot 4, Lekki Phase 1, Lagos" />
                        </div>
                    </div>
                </DetailCard>
            </div>
        );
    }

    // ============================================================================
    // TAB: RISK & AML (Sanctions Matrix)
    // ============================================================================
    function TabAudit() {
        // Renamed to match the component map
        return TabRiskAML();
    }

    function TabRiskAML() {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* AI Risk Gauge */}
                    <div className="bg-[var(--card)] p-8 sm:p-10 rounded-[2.5rem] border border-[var(--border)] shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                            <Activity size={150} />
                        </div>

                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-8 w-full text-left relative z-10">AI Entity Risk Assessment</h3>

                        {/* Custom SVG Gauge - Green Theme */}
                        <div className="relative w-48 h-48 mb-8 relative z-10">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" stroke="var(--border)" strokeWidth="8" fill="none" />
                                <circle cx="50" cy="50" r="40" stroke="#00823B" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="240" className="animate-[spin_1.5s_ease-out_forwards]" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black text-[#00823B] tracking-tighter">12</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">Score / 100</span>
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00823B]/10 border border-[#00823B]/20 text-[#00823B] rounded-xl text-xs font-black uppercase tracking-widest mb-4 relative z-10">
                            <ShieldCheck size={18}/> Low Risk Entity
                        </div>
                        <p className="text-sm font-bold text-gray-500 max-w-xs relative z-10">Business and directors passed global sanctions screening and adverse media checks.</p>
                    </div>

                    {/* Global Sanctions Check */}
                    <DetailCard title="Global AML & Sanctions Check" icon={<Globe size={18}/>}>
                        <div className="space-y-4 mt-2">
                            <RuleCheck label="OFAC Sanctions List" pass />
                            <RuleCheck label="UN Security Council Resolutions" pass />
                            <RuleCheck label="EU Consolidated List" pass />
                            <RuleCheck label="HM Treasury (UK) Sanctions" pass />
                            <RuleCheck label="Politically Exposed Person (PEP) Match" pass />
                            <RuleCheck label="Adverse Media (News Screen)" pass neutral />
                        </div>
                    </DetailCard>
                </div>
            </div>
        );
    }

    // ============================================================================
    // REUSABLE MICRO-COMPONENTS
    // ============================================================================

    function StatPill({ label, value, icon, alert = false }: any) {
        return (
            <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl border ${
                alert ? 'bg-red-500/10 border-red-500/20 text-red-600' : 'bg-[var(--card)] border-[var(--border)] text-[var(--foreground)]'
            }`}>
                <div className={`${alert ? 'text-red-500' : 'text-gray-400'}`}>{icon}</div>
                <div>
                    <div className={`text-[10px] font-black uppercase tracking-widest ${alert ? 'text-red-500/70' : 'text-gray-500'}`}>{label}</div>
                    <div className="text-sm font-black leading-none">{value}</div>
                </div>
            </div>
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

    function DataRow({ label, value, copyable = false, isLink = false, isHighlight = false, color = "text-[#00823B]" }: any) {
        return (
            <div className="flex flex-col gap-2 border-b border-[var(--border)]/50 pb-4 last:border-0 last:pb-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</span>
                <div className="flex items-center gap-2">
                    <span className={`text-[14px] font-black tracking-tight break-all ${isHighlight ? color : isLink ? 'text-blue-500 hover:underline cursor-pointer' : 'text-[var(--foreground)]'}`}>
                        {value}
                    </span>
                    {copyable && <Copy size={14} className="text-gray-400 hover:text-[#00823B] cursor-pointer transition-colors" />}
                </div>
            </div>
        );
    }

    function DocBadge({ status }: { status: string }) {
        if (status === 'verified') return <span className="px-2.5 py-1 bg-[#00823B]/10 text-[#00823B] text-[9px] font-black uppercase tracking-widest rounded-md border border-[#00823B]/20 flex items-center gap-1"><CheckCircle2 size={10}/> Verified</span>;
        if (status === 'rejected') return <span className="px-2.5 py-1 bg-red-500/10 text-red-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-red-500/20 flex items-center gap-1"><XCircle size={10}/> Rejected</span>;
        return <span className="px-2.5 py-1 bg-amber-500/10 text-amber-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-amber-500/20 flex items-center gap-1"><Clock size={10}/> Pending</span>;
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
}