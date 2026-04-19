"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    FileText, Download, Building2, Calendar,
    CheckCircle2, Clock, XCircle, FileSpreadsheet,
    Search, Filter, RefreshCw, Loader2, Database,
    ArrowUpDown, CreditCard, ArrowRightLeft, ArrowUpRight, ArrowDownLeft, Landmark
} from "lucide-react";

// --- TYPES ---
type ExportDataType = 'Transactions' | 'Checkouts' | 'Transfers' | 'Payouts' | 'Incoming Transfers' | 'Settlements';

type ExportJob = {
    id: string;
    business: string;
    dataType: ExportDataType;
    dateRange: string;
    format: 'CSV' | 'Excel' | 'PDF';
    status: 'Completed' | 'Processing' | 'Failed';
    generatedAt: string;
    size?: string;
};

export default function ExportPerBusiness() {
    const [isGenerating, setIsGenerating] = useState(false);

    // --- MOCK DATA ---
    const recentExports: ExportJob[] = [
        { id: "EXP-90812", business: "Machika Telecoms", dataType: "Transactions", dateRange: "Mar 01 - Mar 31, 2026", format: 'CSV', status: 'Completed', generatedAt: "Today, 10:45 AM", size: "2.4 MB" },
        { id: "EXP-90811", business: "AfriClique Logistics", dataType: "Payouts", dateRange: "Jan 01 - Mar 31, 2026", format: 'Excel', status: 'Processing', generatedAt: "Today, 10:42 AM" },
        { id: "EXP-90810", business: "Global Foodies", dataType: "Checkouts", dateRange: "Feb 01 - Feb 28, 2026", format: 'PDF', status: 'Completed', generatedAt: "Yesterday, 16:30 PM", size: "1.1 MB" },
        { id: "EXP-90809", business: "Isakharu Tech", dataType: "Transfers", dateRange: "Jan 01 - Jan 31, 2026", format: 'CSV', status: 'Failed', generatedAt: "Mar 25, 2026" },
        { id: "EXP-90808", business: "Acme Retail", dataType: "Incoming Transfers", dateRange: "Q4 2025", format: 'Excel', status: 'Completed', generatedAt: "Mar 20, 2026", size: "5.8 MB" },
        { id: "EXP-90807", business: "Green Energy Ltd", dataType: "Settlements", dateRange: "Feb 01 - Feb 28, 2026", format: 'CSV', status: 'Completed', generatedAt: "Mar 18, 2026", size: "840 KB" },
    ];

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);
        setTimeout(() => setIsGenerating(false), 2000);
    };

    return (
        <DashboardLayout>
            {/* 1. PAGE HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-[#005C29] to-[#00823B] rounded-2xl shadow-lg shadow-[#00823B]/20">
                        <FileText size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Export Per Business</h1>
                        <p className="text-[13px] text-gray-500 font-medium">Generate and download targeted financial reports for specific merchants</p>
                    </div>
                </div>
            </div>

            {/* 2. REPORT GENERATION ENGINE */}
            <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] shadow-sm p-8 mb-8">
                <div className="mb-6 flex items-center gap-2">
                    <div className="p-2 bg-[#00823B]/10 rounded-xl text-[#00823B]">
                        <FileSpreadsheet size={18} />
                    </div>
                    <h2 className="text-sm font-black uppercase tracking-[0.1em] text-[var(--foreground)]">New Report Generation</h2>
                </div>

                <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">

                    {/* Select Business */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Target Business</label>
                        <div className="relative">
                            <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl pl-11 pr-4 py-3 text-[13px] font-bold text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[#00823B]/20 focus:border-[#00823B] transition-all appearance-none cursor-pointer">
                                <option value="">Select merchant...</option>
                                <option value="machika">Machika Telecoms</option>
                                <option value="AfriClique">AfriClique Logistics</option>
                                <option value="isakharu">Isakharu Tech</option>
                                <option value="global">Global Foodies</option>
                            </select>
                        </div>
                    </div>

                    {/* Select Data Type */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Data Category</label>
                        <div className="relative">
                            <Database size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl pl-11 pr-4 py-3 text-[13px] font-bold text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[#00823B]/20 focus:border-[#00823B] transition-all appearance-none cursor-pointer">
                                <option value="">Select data...</option>
                                <option value="transactions">Transactions</option>
                                <option value="checkouts">Checkouts</option>
                                <option value="transfers">Transfers</option>
                                <option value="payouts">Payouts</option>
                                <option value="incoming">Incoming Transfers</option>
                                <option value="settlements">Settlements</option>
                            </select>
                        </div>
                    </div>

                    {/* From Date */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Start Date</label>
                        <input
                            type="date"
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-bold text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[#00823B]/20 focus:border-[#00823B] transition-all dark:[color-scheme:dark]"
                        />
                    </div>

                    {/* To Date */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">End Date</label>
                        <input
                            type="date"
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-bold text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[#00823B]/20 focus:border-[#00823B] transition-all dark:[color-scheme:dark]"
                        />
                    </div>

                    {/* Generate Button */}
                    <div className="flex flex-col gap-2">
                        <button
                            type="submit"
                            disabled={isGenerating}
                            className="w-full h-[46px] flex items-center justify-center gap-2 bg-[#00823B] text-white rounded-xl text-xs font-black shadow-lg shadow-[#00823B]/20 hover:bg-[#005C29] transition-all disabled:opacity-70"
                        >
                            {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                            {isGenerating ? "Processing..." : "Generate File"}
                        </button>
                    </div>

                </form>
            </div>

            {/* 3. EXPORT HISTORY LOG */}
            <div className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-[var(--border)] bg-[var(--background)]/30 flex flex-col md:flex-row justify-between gap-4">
                    <h2 className="text-sm font-black text-[var(--foreground)] uppercase tracking-widest flex items-center gap-2">
                        Export History
                    </h2>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                                type="text"
                                placeholder="Search exports..."
                                className="w-full pl-10 pr-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-[#00823B]/20 focus:border-[#00823B] transition-all"
                            />
                        </div>
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[12px] font-black text-gray-500 hover:text-[var(--foreground)] transition-all">
                            <Filter size={14} /> Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[var(--background)]/40 border-b border-[var(--border)]">
                        <tr>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Report Info</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Business</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Data Category</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Date Range</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Status</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 tracking-widest text-right">Action</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                        {recentExports.map((job) => (
                            <tr key={job.id} className="hover:bg-[#00823B]/5 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                            <span className="font-black text-[var(--foreground)] text-[14px] flex items-center gap-2">
                                                {job.format === 'CSV' ? <FileSpreadsheet size={14} className="text-emerald-500"/> :
                                                    job.format === 'Excel' ? <FileSpreadsheet size={14} className="text-green-600"/> :
                                                        <FileText size={14} className="text-red-500"/>}
                                                {job.format} Document
                                            </span>
                                        <span className="text-[11px] font-bold text-gray-500 tracking-tight">{job.id}</span>
                                        <span className="text-[10px] font-bold text-gray-400 mt-0.5">{job.generatedAt}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2 font-black text-[var(--foreground)] text-[13px]">
                                        <Building2 size={14} className="text-[#00823B]" /> {job.business}
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <DataTypeBadge type={job.dataType} />
                                </td>

                                <td className="px-6 py-5">
                                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 bg-[var(--background)] px-3 py-1.5 rounded-lg border border-[var(--border)] w-fit">
                                            <Calendar size={12} /> {job.dateRange}
                                        </span>
                                </td>

                                <td className="px-6 py-5">
                                    <StatusBadge status={job.status} />
                                </td>

                                <td className="px-6 py-5 text-right">
                                    {job.status === 'Completed' ? (
                                        <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--card)] hover:bg-[#00823B]/10 text-gray-600 hover:text-[#00823B] border border-[var(--border)] hover:border-[#00823B]/30 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-sm">
                                            <Download size={14} /> Download <span className="text-[9px] text-gray-400 normal-case tracking-normal ml-1">({job.size})</span>
                                        </button>
                                    ) : job.status === 'Processing' ? (
                                        <span className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-black text-blue-500 uppercase tracking-widest">
                                                <Loader2 size={14} className="animate-spin" /> Compiling
                                            </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-black text-red-500 uppercase tracking-widest">
                                                <XCircle size={14} /> Failed
                                            </span>
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

    // --- HELPER COMPONENTS ---

    function DataTypeBadge({ type }: { type: ExportDataType }) {
        const config = {
            'Transactions': { icon: <ArrowUpDown size={12} className="text-[#00823B]" /> },
            'Checkouts': { icon: <CreditCard size={12} className="text-purple-500" /> },
            'Transfers': { icon: <ArrowRightLeft size={12} className="text-blue-500" /> },
            'Payouts': { icon: <ArrowUpRight size={12} className="text-amber-500" /> },
            'Incoming Transfers': { icon: <ArrowDownLeft size={12} className="text-emerald-500" /> },
            'Settlements': { icon: <Landmark size={12} className="text-indigo-500" /> },
        }[type];

        return (
            <div className="flex items-center gap-2 bg-[var(--background)] border border-[var(--border)] px-3 py-1.5 rounded-lg w-fit">
                {config.icon}
                <span className="text-[11px] font-bold text-[var(--foreground)]">{type}</span>
            </div>
        );
    }

    function StatusBadge({ status }: { status: ExportJob['status'] }) {
        const config = {
            'Completed': { bg: 'bg-[#00823B]/10', text: 'text-[#00823B]', border: 'border-[#00823B]/20', icon: <CheckCircle2 size={12}/> },
            'Processing': { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20', icon: <Loader2 size={12} className="animate-spin"/> },
            'Failed': { bg: 'bg-red-500/10', text: 'text-red-600', border: 'border-red-500/20', icon: <XCircle size={12}/> },
        }[status];

        return (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md ${config.bg} ${config.text} ${config.border} border text-[10px] font-black uppercase tracking-widest`}>
                {status === 'Completed' && <div className="w-1.5 h-1.5 rounded-full bg-[#00823B] animate-pulse"></div>}
                {status !== 'Completed' && config.icon}
                {status}
            </div>
        );
    }
}