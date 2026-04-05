"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    FileBarChart, Search, Filter, Download, Calendar,
    CheckCircle2, XCircle, Clock, Eye, X,
    FileText, FileSpreadsheet, FileArchive, Building2,
    ShieldCheck, Landmark, Plus, Loader2
} from "lucide-react";

// --- TYPES ---
type ReportCategory = 'Financial' | 'Regulatory' | 'Operational' | 'Compliance';
type ReportFormat = 'PDF' | 'Excel' | 'CSV';

type ReportArchive = {
    id: string;
    name: string;
    category: ReportCategory;
    dateRange: string;
    format: ReportFormat;
    generatedBy: string;
    status: 'Ready' | 'Generating' | 'Failed';
    createdAt: string;
    size?: string;
};

export default function ReportsPage() {
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isGenerating, setIsGenerating] = useState<string | null>(null);

    // --- MOCK DATA ---
    const reportArchives: ReportArchive[] = [
        { id: "RPT-00918", name: "End of Day Settlement Ledger", category: "Financial", dateRange: "Mar 28, 2026", format: 'Excel', generatedBy: "System Auto", status: 'Ready', createdAt: "Today, 01:00 AM", size: "4.2 MB" },
        { id: "RPT-00917", name: "CBN Anti-Money Laundering (AML)", category: "Regulatory", dateRange: "Q1 2026", format: 'PDF', generatedBy: "Admin User", status: 'Ready', createdAt: "Yesterday, 14:30 PM", size: "1.8 MB" },
        { id: "RPT-00916", name: "Monthly Revenue & Fee Deduction", category: "Financial", dateRange: "Feb 01 - Feb 28, 2026", format: 'PDF', generatedBy: "Finance Team", status: 'Ready', createdAt: "Mar 01, 2026", size: "2.1 MB" },
        { id: "RPT-00915", name: "Merchant KYC Compliance Audit", category: "Compliance", dateRange: "Mar 2026", format: 'Excel', generatedBy: "Compliance Dept", status: 'Generating', createdAt: "Today, 10:15 AM" },
        { id: "RPT-00914", name: "System Uptime & Gateway Route", category: "Operational", dateRange: "Last 7 Days", format: 'CSV', generatedBy: "Admin User", status: 'Failed', createdAt: "Mar 25, 2026" },
        { id: "RPT-00913", name: "Chargeback & Dispute Ratios", category: "Operational", dateRange: "YTD 2026", format: 'Excel', generatedBy: "System Auto", status: 'Ready', createdAt: "Mar 20, 2026", size: "5.5 MB" },
    ];

    const templates = [
        { id: "tpl_1", name: "Daily Settlement Recon", category: "Financial", icon: <Landmark size={20}/> },
        { id: "tpl_2", name: "Suspicious Activity Report (SAR)", category: "Regulatory", icon: <ShieldCheck size={20}/> },
        { id: "tpl_3", name: "Merchant Performance Matrix", category: "Operational", icon: <Building2 size={20}/> },
    ];

    const handleQuickGenerate = (id: string) => {
        setIsGenerating(id);
        setTimeout(() => setIsGenerating(null), 2000);
    };

    return (
        <DashboardLayout>
            {/* 1. PAGE HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl shadow-lg shadow-slate-500/20">
                        <FileBarChart size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Official Reports</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Access structured financial statements, regulatory filings, and audits</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold text-gray-600 hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-all shadow-sm">
                        <Calendar size={14} className="text-slate-500" /> Schedule Report
                    </button>
                    <button className="flex items-center gap-2 bg-[#00823B] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all">
                        <Plus size={14} /> Custom Report Builder
                    </button>
                </div>
            </div>

            {/* 2. QUICK TEMPLATES ROW */}
            <div className="mb-8">
                <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 pl-1">Standard Report Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {templates.map(tpl => (
                        <div key={tpl.id} className="bg-[var(--card)] p-6 rounded-[2rem] border border-[var(--border)] shadow-sm hover:border-slate-500/30 transition-all group flex flex-col justify-between h-[160px]">
                            <div className="flex items-start justify-between">
                                <div className="p-3 bg-slate-500/10 text-slate-500 rounded-2xl group-hover:bg-slate-500 group-hover:text-white transition-colors">
                                    {tpl.icon}
                                </div>
                                <span className="px-2.5 py-1 bg-[var(--background)] border border-[var(--border)] text-gray-500 text-[9px] font-black uppercase tracking-widest rounded-md">
                                    {tpl.category}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-[var(--foreground)] tracking-tight mb-3">{tpl.name}</h3>
                                <button
                                    onClick={() => handleQuickGenerate(tpl.id)}
                                    disabled={isGenerating === tpl.id}
                                    className="w-full py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[11px] font-black text-gray-500 hover:text-slate-600 hover:border-slate-500/30 transition-all flex items-center justify-center gap-2"
                                >
                                    {isGenerating === tpl.id ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
                                    {isGenerating === tpl.id ? "Compiling..." : "Generate Now"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. CONTROL PANEL & TABLE (REPORT ARCHIVE) */}
            <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] shadow-sm overflow-hidden flex flex-col">

                {/* Top Controls */}
                <div className="p-6 border-b border-[var(--border)] bg-[var(--background)]/30">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                        <h2 className="text-sm font-black text-[var(--foreground)] uppercase tracking-widest flex items-center gap-2">
                            <FileArchive size={18} className="text-slate-500"/> Report Archive
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by Report Name, ID, or Creator..."
                                className="w-full pl-12 pr-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all text-[var(--foreground)]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-black transition-all border ${
                                showFilters
                                    ? "bg-slate-500/10 text-slate-600 border-slate-500/30"
                                    : "bg-[var(--card)] text-gray-500 border-[var(--border)] hover:text-[var(--foreground)]"
                            }`}
                        >
                            <Filter size={16} /> Advanced Filters
                        </button>
                    </div>

                    {/* Expandable Advanced Filters */}
                    <div className={`grid transition-all duration-300 ease-in-out ${showFilters ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-5 bg-[var(--background)] rounded-2xl border border-[var(--border)]">
                                <FilterSelect label="Category" options={["All Categories", "Financial", "Regulatory", "Operational", "Compliance"]} />
                                <FilterSelect label="Format" options={["All Formats", "PDF", "Excel", "CSV"]} />
                                <FilterSelect label="Status" options={["All Statuses", "Ready", "Generating", "Failed"]} />
                                <FilterDate label="Generated From" />
                                <FilterDate label="Generated To" />
                                <div className="flex items-end lg:col-span-5">
                                    <button className="w-full md:w-auto px-8 py-2.5 bg-slate-700 text-white rounded-xl text-xs font-black hover:bg-slate-800 transition-all shadow-md shadow-slate-500/20">Apply Filters</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[var(--background)]/40 border-b border-[var(--border)]">
                        <tr>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Document Profile</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Category & Format</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Data Range</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Status</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest text-right">Action</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {reportArchives.map((rpt) => (
                            <tr key={rpt.id} className="hover:bg-slate-500/5 transition-colors group cursor-pointer">
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[var(--foreground)] text-[14px] group-hover:text-slate-600 transition-colors">{rpt.name}</span>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[11px] font-bold text-gray-500 font-mono tracking-tight">{rpt.id}</span>
                                            <span className="text-[10px] text-gray-400">• Generated by {rpt.generatedBy}</span>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-2 items-start">
                                            <span className="px-2.5 py-1 bg-[var(--background)] border border-[var(--border)] text-gray-600 dark:text-gray-300 text-[9px] font-black uppercase tracking-widest rounded-md">
                                                {rpt.category}
                                            </span>
                                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500">
                                                {rpt.format === 'PDF' ? <FileText size={12} className="text-red-500"/> :
                                                    rpt.format === 'Excel' ? <FileSpreadsheet size={12} className="text-[#00823B]"/> :
                                                        <FileBarChart size={12} className="text-emerald-500"/>}
                                            {rpt.format}
                                            </span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1 items-start">
                                        <span className="font-black text-[var(--foreground)] text-[13px]">{rpt.dateRange}</span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 mt-0.5">
                                                <Clock size={10} /> {rpt.createdAt}
                                            </span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <StatusBadge status={rpt.status} />
                                </td>

                                <td className="px-6 py-5 text-right">
                                    {rpt.status === 'Ready' ? (
                                        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[var(--card)] hover:bg-slate-500/10 text-gray-600 hover:text-slate-600 border border-[var(--border)] hover:border-slate-500/30 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-sm">
                                            <Download size={14} /> Download <span className="text-[9px] text-gray-400 normal-case tracking-normal ml-1">({rpt.size})</span>
                                        </button>
                                    ) : rpt.status === 'Generating' ? (
                                        <span className="inline-flex items-center gap-2 px-4 py-2 text-[11px] font-black text-blue-500 uppercase tracking-widest">
                                                <Loader2 size={14} className="animate-spin" /> Compiling
                                            </span>
                                    ) : (
                                        <button className="inline-flex items-center gap-2 px-4 py-2 text-[11px] font-black text-red-500 hover:text-red-600 uppercase tracking-widest transition-colors">
                                            <XCircle size={14} /> Retry
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </DashboardLayout>
    );

    // --- REUSABLE COMPONENTS ---
    function FilterSelect({ label, options }: { label: string, options: string[] }) {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
                <select className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-slate-500 transition-all appearance-none cursor-pointer">
                    {options.map(opt => <option key={opt}>{opt}</option>)}
                </select>
            </div>
        );
    }

    function FilterDate({ label }: { label: string }) {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
                <input
                    type="date"
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-bold text-[var(--foreground)] outline-none focus:border-slate-500 transition-all dark:[color-scheme:dark]"
                />
            </div>
        );
    }

    function StatusBadge({ status }: { status: ReportArchive['status'] }) {
        const config = {
            'Ready': { bg: 'bg-[#00823B]/10', text: 'text-[#00823B]', border: 'border-[#00823B]/20', icon: <CheckCircle2 size={12}/> },
            'Generating': { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20', icon: <Loader2 size={12} className="animate-spin"/> },
            'Failed': { bg: 'bg-red-500/10', text: 'text-red-600', border: 'border-red-500/20', icon: <XCircle size={12}/> },
        }[status];

        return (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${config.bg} ${config.text} ${config.border} border text-[10px] font-black uppercase tracking-widest`}>
                {status === 'Ready' && <div className="w-1.5 h-1.5 rounded-full bg-[#00823B] animate-pulse"></div>}
                {status !== 'Ready' && config.icon}
                {status}
            </div>
        );
    }
}