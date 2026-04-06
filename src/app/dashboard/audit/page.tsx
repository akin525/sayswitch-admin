"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    Search, Filter, Download, Calendar, Activity,
    Clock, ShieldAlert, ShieldCheck, User, Globe,
    Database, Terminal, CheckCircle2, XCircle,
    Eye, X, Copy, Check, ArrowRight, Laptop, FileCode2
} from "lucide-react";

// --- TYPES ---
type LogLevel = 'Info' | 'Warning' | 'Critical';
type LogCategory = 'Authentication' | 'Financial' | 'System' | 'Configuration';

type AuditLog = {
    id: string;
    timestamp: string;
    actor: { name: string; email: string; type: 'Staff' | 'System' | 'Merchant API' };
    action: string;
    category: LogCategory;
    level: LogLevel;
    resource: string;
    ipAddress: string;
    userAgent: string;
    status: 'Success' | 'Failed';
    payload: any;
    previousState?: any;
};

export default function AuditLogsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    // --- MOCK DATA ---
    const auditLogs: AuditLog[] = [
        {
            id: "EVT-882910293", timestamp: "Today, 14:22:05",
            actor: { name: "Sarah Adebayo", email: "sarah.a@sayswitch.com", type: 'Staff' },
            action: "Approved Merchant Payout", category: "Financial", level: "Info", resource: "Payout PAY_0918273611", ipAddress: "102.89.34.211", userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...", status: "Success",
            payload: { payout_id: "PAY_0918273611", amount: 2500000, action: "approve", approved_by: "EMP-00192" }
        },
        {
            id: "EVT-882910292", timestamp: "Today, 13:45:12",
            actor: { name: "System Engine", email: "system@sayswitch.internal", type: 'System' },
            action: "Auto-Swept Virtual Accounts", category: "Financial", level: "Info", resource: "Batch BAT-1029A", ipAddress: "10.0.0.52 (Internal)", userAgent: "SaySwitch-Cron-Worker/v2.4", status: "Success",
            payload: { batch_id: "BAT-1029A", accounts_swept: 142, total_volume: 45200500 }
        },
        {
            id: "EVT-882910291", timestamp: "Today, 11:15:00",
            actor: { name: "Admin Super", email: "super@sayswitch.com", type: 'Staff' },
            action: "Updated Merchant Fee Configuration", category: "Configuration", level: "Warning", resource: "Business ID 252", ipAddress: "197.210.64.12", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...", status: "Success",
            previousState: { processing_fee: "1.5%", fee_cap: 2000, daily_limit: 50000000 },
            payload: { processing_fee: "1.2%", fee_cap: 1500, daily_limit: 100000000 }
        },
        {
            id: "EVT-882910290", timestamp: "Today, 09:05:33",
            actor: { name: "Machika Integration", email: "api_key_live_8829...", type: 'Merchant API' },
            action: "Failed API Authentication", category: "Authentication", level: "Critical", resource: "Endpoint /v1/payouts", ipAddress: "41.190.2.45", userAgent: "PostmanRuntime/7.32.3", status: "Failed",
            payload: { error: "Invalid API Secret", request_headers: { "Authorization": "Bearer sk_live_***" } }
        },
        {
            id: "EVT-882910289", timestamp: "Yesterday, 16:30:21",
            actor: { name: "Michael Okonkwo", email: "michael.o@sayswitch.com", type: 'Staff' },
            action: "Suspended User Account", category: "System", level: "Critical", resource: "Staff ID EMP-00105", ipAddress: "102.89.34.200", userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X)...", status: "Success",
            previousState: { account_status: "Active", access_level: "Support L1" },
            payload: { account_status: "Suspended", reason: "Security policy violation investigation" }
        },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-[1400px] mx-auto mt-8 animate-in fade-in duration-500 flex flex-col h-full">

                {/* 1. PREMIUM HERO BANNER */}
                <div className="bg-gradient-to-br from-[#005C29] to-[#00823B] rounded-[2.5rem] p-8 sm:p-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 shadow-2xl relative overflow-hidden group mb-8">
                    {/* Background Patterns */}
                    <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none transition-transform duration-1000 group-hover:scale-110"></div>
                    <div className="absolute -right-10 -top-20 opacity-10 pointer-events-none rotate-12 transition-transform duration-700 group-hover:rotate-45">
                        <Terminal size={350} />
                    </div>

                    <div className="text-white relative z-10 max-w-2xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                                <Activity size={24} className="text-white" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80 bg-white/10 px-3 py-1 rounded-full border border-white/20">System Auditing</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3 leading-tight">Global Activity Logs</h1>
                        <p className="text-white/90 text-sm font-medium leading-relaxed">Immutable record of all system events, configuration changes, API requests, and staff actions for compliance and forensic tracking.</p>
                    </div>

                    {/* Live Stat Counters */}
                    <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full lg:w-auto">
                        <div className="bg-black/20 p-5 rounded-3xl backdrop-blur-md border border-white/10 shadow-inner flex items-center gap-6">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 mb-1 block">Events (24h)</span>
                                <span className="text-3xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">14.2K</span>
                            </div>
                            <div className="w-px h-10 bg-white/20"></div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-300 mb-1 flex items-center gap-1"><ShieldAlert size={12}/> Critical</span>
                                <span className="text-3xl font-black tracking-tighter leading-none text-red-400">3</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. CONTROL PANEL */}
                <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] shadow-sm overflow-hidden flex flex-col mb-8">
                    <div className="p-6 border-b border-[var(--border)] bg-[var(--background)]/30">
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00823B] transition-colors" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by Event ID, Actor Email, Action, or IP Address..."
                                    className="w-full pl-14 pr-4 py-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl text-[14px] font-bold outline-none focus:ring-2 focus:ring-[#00823B]/20 focus:border-[#00823B] transition-all text-[var(--foreground)] placeholder:text-gray-500 shadow-inner"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-[14px] font-black transition-all border ${
                                    showFilters
                                        ? "bg-[#00823B]/10 text-[#00823B] border-[#00823B]/30"
                                        : "bg-[var(--background)] text-gray-500 border-[var(--border)] hover:text-[var(--foreground)] hover:border-gray-500 shadow-sm"
                                }`}
                            >
                                <Filter size={18} /> Advanced Filters
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-[#1F2937] text-white px-6 py-4 rounded-2xl text-[14px] font-black shadow-lg hover:bg-gray-800 transition-all">
                                <Download size={18} /> Export Logs
                            </button>
                        </div>

                        {/* Expandable Advanced Filters */}
                        <div className={`grid transition-all duration-300 ease-in-out ${showFilters ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                            <div className="overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 p-6 bg-[var(--background)] rounded-3xl border border-[var(--border)] mt-2">
                                    <FilterSelect label="Category" options={["All Categories", "Authentication", "Financial", "System", "Configuration"]} />
                                    <FilterSelect label="Severity Level" options={["All Levels", "Info", "Warning", "Critical"]} />
                                    <FilterSelect label="Actor Type" options={["All Actors", "Staff", "System", "Merchant API"]} />
                                    <FilterDate label="Start Date & Time" type="datetime-local" />
                                    <FilterDate label="End Date & Time" type="datetime-local" />

                                    <div className="xl:col-span-5 flex items-center justify-end gap-4 pt-2">
                                        <button onClick={() => setShowFilters(false)} className="text-xs font-black text-gray-500 hover:text-[var(--foreground)] transition-colors">
                                            Clear Filters
                                        </button>
                                        <button className="px-8 py-3 bg-[#00823B] text-white rounded-xl text-xs font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all">
                                            Apply Audit Filters
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. DATA TABLE */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[var(--background)]/40 border-b border-[var(--border)]">
                            <tr>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Event & Time</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Actor Identity</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Action & Resource</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Severity</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest text-right">Inspect</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border)]">
                            {auditLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-[#00823B]/5 transition-colors group cursor-pointer" onClick={() => setSelectedLog(log)}>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-mono text-[var(--foreground)] text-[12px] font-bold group-hover:text-[#00823B] transition-colors">{log.id}</span>
                                            <span className="text-[11px] font-bold text-gray-500 flex items-center gap-1.5"><Clock size={12}/>{log.timestamp}</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-gray-500">
                                                {log.actor.type === 'Staff' ? <User size={14}/> : log.actor.type === 'System' ? <Database size={14}/> : <Globe size={14}/>}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-[var(--foreground)] text-[13px]">{log.actor.name}</span>
                                                <span className="text-[10px] font-bold text-gray-500">{log.actor.email}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1.5 items-start">
                                            <span className="font-black text-[var(--foreground)] text-[14px]">{log.action}</span>
                                            <span className="px-2 py-0.5 bg-[var(--background)] border border-[var(--border)] text-gray-500 text-[9px] font-black uppercase tracking-widest rounded">
                                                    Target: {log.resource}
                                                </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <LevelBadge level={log.level} />
                                    </td>

                                    <td className="px-6 py-5 text-right">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedLog(log); }}
                                            className="p-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-gray-400 hover:text-[#00823B] hover:border-[#00823B]/30 shadow-sm transition-all"
                                        >
                                            <Terminal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 4. FORENSIC INSPECTOR MODAL */}
            {selectedLog && (
                <div className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--card)] w-full max-w-2xl h-full rounded-[2.5rem] border border-[var(--border)] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-[var(--border)] shrink-0 bg-[var(--background)]/50">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-[#00823B]/10 rounded-2xl text-[#00823B] border border-[#00823B]/20">
                                    <FileCode2 size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-[var(--foreground)] tracking-tight">Event Inspector</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[11px] font-mono font-bold text-gray-500">{selectedLog.id}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                                        <span className="text-[11px] font-bold text-gray-500">{selectedLog.timestamp}</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setSelectedLog(null)} className="p-2.5 bg-[var(--card)] border border-[var(--border)] text-gray-400 hover:text-[var(--foreground)] hover:bg-[var(--background)] rounded-full transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 space-y-8">

                            {/* Hero Status Banner */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-[var(--background)] border border-[var(--border)] rounded-[2rem]">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Action Executed</p>
                                    <h3 className="text-lg font-black text-[var(--foreground)]">{selectedLog.action}</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <LevelBadge level={selectedLog.level} />
                                    {selectedLog.status === 'Success'
                                        ? <span className="flex items-center gap-1 px-3 py-1.5 bg-[#00823B]/10 text-[#00823B] text-[11px] font-black uppercase tracking-widest rounded-lg border border-[#00823B]/20"><CheckCircle2 size={14}/> Success</span>
                                        : <span className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-600 text-[11px] font-black uppercase tracking-widest rounded-lg border border-red-500/20"><XCircle size={14}/> Failed</span>
                                    }
                                </div>
                            </div>

                            {/* Context Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-5">
                                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-[var(--border)] pb-2 flex items-center gap-2"><User size={14}/> Actor Details</h4>
                                    <DataRow label="Name / Identifier" value={selectedLog.actor.name} />
                                    <DataRow label="Email / Identity" value={selectedLog.actor.email} copyable />
                                    <DataRow label="Entity Type" value={selectedLog.actor.type} />
                                </div>
                                <div className="space-y-5">
                                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-[var(--border)] pb-2 flex items-center gap-2"><Globe size={14}/> Network Context</h4>
                                    <DataRow label="IP Address" value={selectedLog.ipAddress} copyable />
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">User Agent</span>
                                        <span className="text-[12px] font-mono text-[var(--foreground)] bg-[var(--background)] p-2 rounded-lg border border-[var(--border)] break-all">{selectedLog.userAgent}</span>
                                    </div>
                                </div>
                            </div>

                            {/* JSON Payload Inspector (Terminal Style) */}
                            <div>
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2"><Database size={14}/> Event Payload & Data State</h4>

                                {selectedLog.previousState ? (
                                    /* Show Diff View if previous state exists (e.g. Configuration Change) */
                                    <div className="flex flex-col gap-4">
                                        <TerminalBlock title="previous_state.json" code={JSON.stringify(selectedLog.previousState, null, 2)} type="danger" />
                                        <div className="flex justify-center text-gray-400"><ArrowRight size={20} className="rotate-90 sm:rotate-0" /></div>
                                        <TerminalBlock title="new_state.json" code={JSON.stringify(selectedLog.payload, null, 2)} type="success" />
                                    </div>
                                ) : (
                                    /* Show single payload */
                                    <TerminalBlock title="event_payload.json" code={JSON.stringify(selectedLog.payload, null, 2)} />
                                )}
                            </div>

                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-[var(--border)] shrink-0 flex gap-3 bg-[var(--background)]/50">
                            <button className="flex-1 py-4 border border-[var(--border)] bg-[var(--card)] hover:bg-gray-50 dark:hover:bg-gray-800 text-[var(--foreground)] text-[13px] font-black rounded-2xl transition-all shadow-sm">
                                Export Evidence
                            </button>
                            <button className="flex-1 py-4 bg-[#00823B] text-white text-[13px] font-black rounded-2xl hover:bg-[#005C29] transition-all shadow-lg shadow-[#00823B]/20">
                                View Linked Resource
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );

    // --- REUSABLE COMPONENTS ---

    function FilterSelect({ label, options }: { label: string, options: string[] }) {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
                <select className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-bold text-[var(--foreground)] outline-none focus:border-[#00823B] transition-all appearance-none cursor-pointer">
                    {options.map(opt => <option key={opt}>{opt}</option>)}
                </select>
            </div>
        );
    }

    function FilterDate({ label, type = "date" }: { label: string, type?: string }) {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
                <input
                    type={type}
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-bold text-[var(--foreground)] outline-none focus:border-[#00823B] transition-all dark:[color-scheme:dark]"
                />
            </div>
        );
    }

    function LevelBadge({ level }: { level: LogLevel }) {
        if (level === 'Critical') return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/10 text-red-600 border border-red-500/20 text-[10px] font-black uppercase tracking-widest"><ShieldAlert size={12}/> Critical</span>;
        if (level === 'Warning') return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[10px] font-black uppercase tracking-widest"><Activity size={12}/> Warning</span>;
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 border border-blue-500/20 text-[10px] font-black uppercase tracking-widest"><ShieldCheck size={12}/> Info</span>;
    }

    function DataRow({ label, value, copyable = false }: any) {
        return (
            <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</span>
                <div className="flex items-center gap-2">
                    <span className="text-[14px] font-black text-[var(--foreground)] tracking-tight break-all">{value}</span>
                    {copyable && <Copy size={14} className="text-gray-400 hover:text-[#00823B] cursor-pointer transition-colors" onClick={() => handleCopy(value, label)}/>}
                </div>
            </div>
        );
    }

    function TerminalBlock({ title, code, type = "neutral" }: { title: string, code: string, type?: "neutral" | "danger" | "success" }) {
        const bgClass = type === "danger" ? "bg-red-500/5 border-red-500/20" : type === "success" ? "bg-[#00823B]/5 border-[#00823B]/20" : "bg-[#0f172a] border-slate-800";
        const headerClass = type === "danger" ? "bg-red-500/10 border-red-500/20" : type === "success" ? "bg-[#00823B]/10 border-[#00823B]/20" : "bg-[#1e293b] border-slate-800";
        const textClass = type === "danger" ? "text-red-400" : type === "success" ? "text-[#00823B]" : "text-slate-300";

        return (
            <div className={`flex flex-col rounded-[1.5rem] border shadow-inner overflow-hidden ${bgClass}`}>
                <div className={`px-4 py-3 border-b flex items-center justify-between ${headerClass}`}>
                    <div className="flex items-center gap-2">
                        {type === 'neutral' && (
                            <>
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                            </>
                        )}
                        <span className={`text-[10px] font-black uppercase tracking-widest ml-2 ${textClass}`}>{title}</span>
                    </div>
                    <button className={`${textClass} opacity-70 hover:opacity-100 transition-opacity`}><Copy size={14}/></button>
                </div>
                <div className={`p-5 overflow-x-auto text-[13px] font-mono leading-relaxed custom-scrollbar ${textClass}`}>
                    <pre><code>{code}</code></pre>
                </div>
            </div>
        );
    }
}