"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Search, CheckCircle2, Copy, ShieldAlert,
    Bookmark, Share2, Download, MoreVertical,
    Eye, Building2, Activity, Clock, Calendar,
    Hash, ShieldCheck, UserCheck, Key,
    ArrowUpRight, Lock, FileText, Check,
    ArrowRight, X, Loader2, Users, UserCircle, LayoutGrid, Fingerprint, ToggleRight, ToggleLeft, History, Globe
} from "lucide-react";

export default function StaffManagementPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchState, setSearchState] = useState<'idle' | 'searching' | 'found'>('idle');
    const [activeTab, setActiveTab] = useState('Profile');
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
        setActiveTab('Profile');
    };

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    // ============================================================================
    // 1. THE DIRECTORY HUB (IDLE STATE)
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
                            <Users size={350} />
                        </div>

                        <div className="text-white relative z-10 max-w-xl">
                            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3 leading-tight">Team & Access Control</h1>
                            <p className="text-white/90 text-sm font-medium leading-relaxed">Manage staff profiles, configure granular role-based access rights, and audit internal system activity.</p>
                        </div>

                        {/* Live Stat Counters */}
                        <div className="flex items-center gap-6 sm:gap-10 text-white relative z-10 bg-black/20 px-8 py-5 rounded-3xl backdrop-blur-md border border-white/10 shadow-inner">
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">42</span>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70 mt-2">Active Staff</span>
                            </div>
                            <div className="w-px h-12 bg-white/20"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">8</span>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70 mt-2">System Roles</span>
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
                                    placeholder="Search by staff name, email, or employee ID..."
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
                                {searchState === 'searching' ? "Locating..." : "Find Staff"}
                            </button>
                        </form>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8 pt-8 border-t border-[var(--border)]">
                            <span className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 whitespace-nowrap">Quick Filters:</span>
                            <div className="flex flex-wrap gap-2">
                                {["Administrators", "Support Team", "Compliance", "Finance", "Suspended"].map(filter => (
                                    <button
                                        key={filter}
                                        type="button"
                                        onClick={() => setSearchQuery(filter)}
                                        className="px-4 py-2 bg-[var(--background)] border border-[var(--border)] text-gray-500 hover:text-[#00823B] hover:border-[#00823B]/30 hover:bg-[#00823B]/5 text-xs font-black rounded-xl transition-all"
                                    >
                                        {filter}
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
    const staffTabs = [
        { id: 'Profile', icon: <UserCircle size={16}/>, title: "Identity", sub: "Core Profile" },
        { id: 'Access', icon: <Key size={16}/>, title: "Access Rights", sub: "RBAC Matrix" },
        { id: 'Security', icon: <ShieldCheck size={16}/>, title: "Security", sub: "2FA & Sessions" },
        { id: 'Audit', icon: <History size={16}/>, title: "Audit Trail", sub: "Action Logs" },
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

                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] bg-gradient-to-br from-[#00823B] to-[#003B1A] flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-[#00823B]/20 shrink-0 border-4 border-[var(--background)]">
                            SA
                        </div>

                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--foreground)]">Sarah Adebayo</h1>
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00823B]/10 border border-[#00823B]/20 text-[#00823B] rounded-lg text-[11px] font-black uppercase tracking-widest shadow-sm">
                                    <CheckCircle2 size={14}/> Active
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-[13px] font-bold text-gray-500">
                                <span className="font-mono bg-[var(--background)] px-3 py-1.5 rounded-lg border border-[var(--border)] flex items-center gap-2 shadow-inner text-[var(--foreground)]">
                                    ID: {searchQuery || "EMP-00192"}
                                    <Copy size={14} className="cursor-pointer text-gray-400 hover:text-[#00823B] transition-colors" onClick={() => handleCopy(searchQuery || "EMP-00192", 'id')}/>
                                    {copied === 'id' && <Check size={14} className="text-[#00823B]"/>}
                                </span>
                                <span className="flex items-center gap-2 px-2 py-1 bg-[#00823B]/10 text-[#00823B] rounded-md border border-[#00823B]/20 text-[11px] uppercase tracking-widest font-black">Super Admin</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10 w-full lg:w-auto border-t lg:border-t-0 border-[var(--border)] pt-6 lg:pt-0">
                        <div className="text-left lg:text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Last Login</p>
                            <h2 className="text-xl font-black tracking-tight text-[var(--foreground)]">Today, 08:14 AM</h2>
                            <p className="text-xs font-bold text-[#00823B] mt-1 flex items-center lg:justify-end gap-1">
                                <Globe size={12}/> 102.89.34.211 (Lagos)
                            </p>
                        </div>
                        <div className="flex items-center gap-3 lg:border-l border-[var(--border)] lg:pl-6 w-full sm:w-auto">
                            <ActionButton icon={<Lock size={18}/>} tooltip="Reset Password" />
                            <ActionButton icon={<ShieldAlert size={18}/>} tooltip="Suspend User" color="hover:text-red-500 hover:border-red-500/30" />
                            <ActionButton icon={<MoreVertical size={18}/>} tooltip="More" />
                        </div>
                    </div>
                </div>

                {/* 2.2 SEAMLESS TAB NAVIGATION */}
                <div className="bg-[var(--card)] border-x border-b border-[var(--border)] px-4 sm:px-8 overflow-x-auto scrollbar-hide relative z-20">
                    <div className="flex min-w-max gap-1 py-3">
                        {staffTabs.map((tab) => (
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
                    {activeTab === 'Profile' && <TabProfile />}
                    {activeTab === 'Access' && <TabAccess />}
                    {activeTab === 'Security' && <TabSecurity />}
                    {activeTab === 'Audit' && <TabAudit />}
                </div>
            </div>
        </DashboardLayout>
    );

    // ============================================================================
    // TAB: PROFILE (Identity & HR Data)
    // ============================================================================
    function TabProfile() {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <DetailCard title="Official Information" icon={<UserCircle size={18}/>}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                            <DataRow label="Full Legal Name" value="Sarah Adebayo" />
                            <DataRow label="Corporate Email" value="sarah.a@sayswitch.com" copyable />
                            <DataRow label="Phone Number" value="+234 803 123 4567" copyable />
                            <DataRow label="Staff ID" value="EMP-00192" copyable />
                        </div>
                    </DetailCard>

                    <DetailCard title="Organizational Chart" icon={<Building2 size={18}/>}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                            <DataRow label="Department" value="Operations & Risk" />
                            <DataRow label="Primary Role" value="Lead Investigator" />
                            <DataRow label="Manager / Supervisor" value="Michael Okonkwo (VP Ops)" />
                            <DataRow label="Date Joined" value="14 August 2024" />
                        </div>
                    </DetailCard>

                </div>
            </div>
        );
    }

    // ============================================================================
    // TAB: ACCESS (RBAC Matrix)
    // ============================================================================
    function TabAccess() {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">

                <div className="bg-[var(--card)] p-6 sm:p-8 rounded-[2.5rem] border border-[var(--border)] shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[#00823B]"><Key size={16}/></span>
                                Role-Based Access Control
                            </h3>
                            <p className="text-sm font-bold text-[var(--foreground)] mt-4">Current Assigned Role: <span className="text-[#00823B] font-black">Super Admin</span></p>
                        </div>
                        <button className="px-6 py-3 bg-[#00823B] text-white rounded-xl text-xs font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all">
                            Edit Permissions
                        </button>
                    </div>

                    <div className="overflow-x-auto border border-[var(--border)] rounded-3xl">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[var(--background)] border-b border-[var(--border)]">
                            <tr>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Platform Module</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-center">View (Read)</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-center">Create / Edit (Write)</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-center">Approve / Delete (Admin)</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border)] bg-[var(--card)]">
                            <PermissionRow module="Dashboard & Analytics" read write admin={false} />
                            <PermissionRow module="Transactions & Transfers" read write admin />
                            <PermissionRow module="Payouts (Maker/Checker)" read write admin />
                            <PermissionRow module="Merchant KYC / Approvals" read write admin />
                            <PermissionRow module="Staff & Roles Configuration" read={true} write={false} admin={false} />
                            <PermissionRow module="System Webhooks & API Keys" read write admin />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    // ============================================================================
    // TAB: SECURITY (2FA & Sessions)
    // ============================================================================
    function TabSecurity() {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <DetailCard title="Authentication Settings" icon={<ShieldCheck size={18}/>}>
                        <div className="flex items-center justify-between p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl mb-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-[#00823B]/10 text-[#00823B] rounded-xl"><Fingerprint size={20}/></div>
                                <div>
                                    <p className="font-black text-[var(--foreground)] text-sm">Two-Factor Auth (2FA)</p>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Authenticator App (Active)</p>
                                </div>
                            </div>
                            <ToggleRight size={32} className="text-[#00823B]" />
                        </div>
                        <DataRow label="Password Last Changed" value="45 Days Ago (Feb 10, 2026)" />
                        <DataRow label="Force Password Reset" value="Pending Next Login" isHighlight color="text-amber-500" />
                    </DetailCard>

                    <DetailCard title="Active Sessions & IP Whitelist" icon={<LayoutGrid size={18}/>}>
                        <div className="space-y-4">
                            <div className="p-4 bg-[#00823B]/5 border border-[#00823B]/20 rounded-2xl">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="font-black text-[var(--foreground)] text-sm">Current Session</p>
                                    <span className="px-2 py-0.5 bg-[#00823B]/10 text-[#00823B] text-[9px] font-black uppercase tracking-widest rounded border border-[#00823B]/20">Active Now</span>
                                </div>
                                <p className="text-[11px] font-bold text-gray-500">MacBook Pro • Safari • 102.89.34.211</p>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Lagos, Nigeria</p>
                            </div>
                            <button className="w-full py-3 bg-[var(--background)] border border-[var(--border)] hover:border-red-500/50 hover:text-red-500 text-gray-500 rounded-xl text-xs font-black transition-colors">
                                Revoke All Other Sessions
                            </button>
                        </div>
                    </DetailCard>
                </div>
            </div>
        );
    }

    // ============================================================================
    // TAB: AUDIT (Activity Timeline)
    // ============================================================================
    function TabAudit() {
        const events = [
            { title: "Approved Merchant Payout", time: "10:24 AM, Today", desc: "Approved PAY_0918273611 for Machika Telecoms (₦2.5M).", icon: <CheckCircle2 size={16}/>, color: "text-[#00823B]", bg: "bg-[#00823B]/10", border: "border-[#00823B]/20" },
            { title: "Logged In", time: "08:14 AM, Today", desc: "Successful login via 2FA from 102.89.34.211.", icon: <UserCircle size={16}/>, color: "text-[#00823B]", bg: "bg-[#00823B]/10", border: "border-[#00823B]/20" },
            { title: "Updated Webhook URL", time: "04:15 PM, Yesterday", desc: "Modified endpoint for Business ID 252.", icon: <Globe size={16}/>, color: "text-gray-500", bg: "bg-gray-500/10", border: "border-gray-500/20" },
            { title: "Viewed Transaction", time: "03:10 PM, Yesterday", desc: "Forensic audit run on TXN_00000000X2010211.", icon: <Eye size={16}/>, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
            { title: "Suspended Merchant", time: "11:20 AM, Yesterday", desc: "Placed Global Foodies (ID 109) on administrative hold.", icon: <ShieldAlert size={16}/>, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
        ];

        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto py-4">
                <div className="relative border-l-2 border-[var(--border)] ml-6 space-y-8 py-4">
                    {events.map((evt, idx) => (
                        <div key={idx} className="relative pl-8 sm:pl-12 group">
                            {/* Connector Dot */}
                            <div className={`absolute -left-[18px] top-1 w-9 h-9 rounded-full flex items-center justify-center border-4 border-[var(--background)] shadow-sm transition-transform group-hover:scale-110 ${evt.bg} ${evt.color}`}>
                                {evt.icon}
                            </div>

                            {/* Content */}
                            <div className="bg-[var(--card)] p-5 rounded-3xl border border-[var(--border)] shadow-sm hover:border-gray-400 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-sm font-black text-[var(--foreground)]">{evt.title}</h4>
                                    <span className="text-[10px] font-bold text-gray-400 bg-[var(--background)] px-2.5 py-1 rounded-md border border-[var(--border)]">{evt.time}</span>
                                </div>
                                <p className="text-xs font-medium text-gray-500 leading-relaxed">{evt.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="mt-8 w-full py-4 bg-[var(--background)] border border-[var(--border)] text-gray-500 hover:text-[var(--foreground)] rounded-2xl text-xs font-black transition-colors">
                    Load Older Activity
                </button>
            </div>
        );
    }

    // ============================================================================
    // REUSABLE MICRO-COMPONENTS
    // ============================================================================

    function ActionButton({ icon, tooltip, color = "text-gray-400 hover:text-[var(--foreground)] hover:border-gray-400" }: any) {
        return (
            <button className={`p-3 sm:p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl transition-all shadow-sm ${color}`} title={tooltip}>
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

    function DataRow({ label, value, copyable = false, isLink = false, isHighlight = false, color = "text-[#00823B]" }: any) {
        return (
            <div className="flex flex-col gap-2 border-b border-[var(--border)]/50 pb-5 last:border-0 last:pb-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</span>
                <div className="flex items-center gap-2">
                    <span className={`text-[15px] font-black tracking-tight break-all ${isHighlight ? color : isLink ? 'text-[#00823B] hover:underline cursor-pointer' : 'text-[var(--foreground)]'}`}>{value}</span>
                    {copyable && <Copy size={14} className="text-gray-400 hover:text-[#00823B] cursor-pointer transition-colors" />}
                </div>
            </div>
        );
    }

    function PermissionRow({ module, read, write, admin }: any) {
        return (
            <tr className="hover:bg-[var(--background)] transition-colors">
                <td className="px-6 py-5">
                    <span className="text-[13px] font-black text-[var(--foreground)]">{module}</span>
                </td>
                <td className="px-6 py-5 text-center">
                    {read ? <CheckCircle2 size={18} className="mx-auto text-[#00823B]" /> : <X size={18} className="mx-auto text-gray-300" />}
                </td>
                <td className="px-6 py-5 text-center">
                    {write ? <CheckCircle2 size={18} className="mx-auto text-[#00823B]" /> : <X size={18} className="mx-auto text-gray-300" />}
                </td>
                <td className="px-6 py-5 text-center">
                    {admin ? <CheckCircle2 size={18} className="mx-auto text-[#00823B]" /> : <X size={18} className="mx-auto text-gray-300" />}
                </td>
            </tr>
        );
    }
}