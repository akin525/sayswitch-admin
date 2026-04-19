"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    BarChart2,
    PieChart,
    Activity,
    Briefcase,
    Eye,
    Building2,
    Users,
    CreditCard,
    ArrowUpDown,
    AlertTriangle,
    Store,
    Mail,
    DollarSign,
    FileText,
    CheckCircle,
    XCircle,
    Wallet,
    ArrowDownLeft,
    Clock,
    BarChart,
    Search,
    Shield,
    UserCheck,
    Inbox,
    TrendingUp,
    ChevronDown,
    LogOut,
    X,
    Sparkles,
} from "lucide-react";

// ---------------- TYPES ----------------
type SubMenuItem = {
    label: string;
    href: string;
    icon: ReactNode;
};

type MenuItem = {
    label: string;
    icon: ReactNode;
    href?: string;
    subItems?: SubMenuItem[];
};

type MenuSection = {
    title: string;
    items: MenuItem[];
};

type SidebarProps = {
    isOpen?: boolean;
    setIsOpen?: (value: boolean) => void;
};

type NavNodeProps = {
    item: MenuItem;
    pathname: string;
    isOpen: boolean;
    toggle: () => void;
};

type SubNavNodeProps = {
    subItem: SubMenuItem;
    pathname: string;
};

// ---------------- MENU ----------------
const MENU_SECTIONS: MenuSection[] = [
    {
        title: "Dashboard",
        items: [
            { label: "Overview", icon: <BarChart2 size={18} />, href: "/dashboard/overview" },
            { label: "Board Analytics", icon: <PieChart size={18} />, href: "/dashboard/board-analytics" },
            { label: "System Analytics", icon: <Activity size={18} />, href: "/dashboard/system-analytics" },
        ],
    },
    {
        title: "Business Operations",
        items: [
            {
                label: "Business Management",
                icon: <Briefcase size={18} />,
                subItems: [
                    { label: "Business Overview", icon: <Eye size={16} />, href: "/dashboard/business/overview" },
                    { label: "Business Directory", icon: <Building2 size={16} />, href: "/dashboard/business/directory" },
                    { label: "Merchant List", icon: <Users size={16} />, href: "/dashboard/business/merchants" },
                    { label: "Virtual Accounts", icon: <CreditCard size={16} />, href: "/dashboard/business/virtual-accounts" },
                    { label: "Transfer Bucket", icon: <ArrowUpDown size={16} />, href: "/dashboard/business/transfer-bucket" },
                    { label: "Resolve Transaction", icon: <AlertTriangle size={16} />, href: "/dashboard/business/resolve" },
                ],
            },
            { label: "Storefronts", icon: <Store size={18} />, href: "/dashboard/storefronts" },
            { label: "Communications", icon: <Mail size={18} />, href: "/dashboard/communications" },
        ],
    },
    {
        title: "Financial Operations",
        items: [
            {
                label: "Finance",
                icon: <DollarSign size={18} />,
                subItems: [
                    { label: "Export Per Business", icon: <FileText size={16} />, href: "/dashboard/finance/export" },
                    { label: "Transactions", icon: <ArrowUpDown size={16} />, href: "/dashboard/finance/transactions" },
                    { label: "Transfers", icon: <ArrowUpDown size={16} />, href: "/dashboard/finance/transfers" },
                    { label: "Settlements", icon: <CheckCircle size={16} />, href: "/dashboard/finance/settlements" },
                    { label: "Chargebacks", icon: <XCircle size={16} />, href: "/dashboard/finance/chargebacks" },
                    { label: "Checkouts", icon: <CreditCard size={16} />, href: "/dashboard/finance/checkouts" },
                    { label: "Wallet Transactions", icon: <Wallet size={16} />, href: "/dashboard/finance/wallet" },
                    { label: "Incoming Transfers", icon: <ArrowDownLeft size={16} />, href: "/dashboard/finance/incoming" },
                    { label: "Unsettled Transactions", icon: <Clock size={16} />, href: "/dashboard/finance/unsettled" },
                ],
            },
            { label: "Payouts", icon: <CreditCard size={18} />, href: "/dashboard/payouts" },
            { label: "Analytics", icon: <BarChart size={18} />, href: "/dashboard/analytics" },
            { label: "Reports", icon: <FileText size={18} />, href: "/dashboard/reports" },
            {
                label: "Search & Lookup",
                icon: <Search size={18} />,
                subItems: [
                    { label: "Search Transaction", icon: <ArrowUpDown size={16} />, href: "/dashboard/search/transaction" },
                    { label: "Search Payout", icon: <CreditCard size={16} />, href: "/dashboard/search/payout" },
                    { label: "Search Incoming", icon: <ArrowDownLeft size={16} />, href: "/dashboard/search/incoming" },
                    { label: "Search Checkout", icon: <CreditCard size={16} />, href: "/dashboard/search/checkout" },
                ],
            },
        ],
    },
    {
        title: "Administration",
        items: [
            {
                label: "Compliance",
                icon: <Shield size={18} />,
                subItems: [
                    { label: "Business Approval", icon: <UserCheck size={16} />, href: "/dashboard/compliance/approval" },
                ],
            },
            { label: "Staff Management", icon: <Users size={18} />, href: "/dashboard/staff" },
            {
                label: "Cashier Operations",
                icon: <Inbox size={18} />,
                subItems: [
                    { label: "Operations", icon: <CreditCard size={16} />, href: "/dashboard/cashier/payout" },
                    // { label: "Deposit Cashier", icon: <Wallet size={16} />, href: "/dashboard/cashier/deposit" },
                ],
            },
            // { label: "Growth & Performance", icon: <TrendingUp size={18} />, href: "/dashboard/growth" },
            { label: "Audit Logs", icon: <FileText size={18} />, href: "/dashboard/audit" },
        ],
    },
];

// ---------------- COMPONENT ----------------
export default function Sidebar({ isOpen = false, setIsOpen }: SidebarProps) {
    const pathname = usePathname();
    const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

    useEffect(() => {
        const activeDropdowns: string[] = [];

        MENU_SECTIONS.forEach((section) => {
            section.items.forEach((item) => {
                if (item.subItems?.some((sub) => pathname.startsWith(sub.href))) {
                    activeDropdowns.push(item.label);
                }
            });
        });

        setOpenDropdowns(activeDropdowns);
    }, [pathname]);

    useEffect(() => {
        if (setIsOpen) setIsOpen(false);
    }, [pathname, setIsOpen]);

    const toggleDropdown = (label: string) => {
        setOpenDropdowns((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen?.(false)}
                />
            )}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 md:static
                    w-[290px] h-screen shrink-0
                    bg-white/95 dark:bg-[#0B1220]/95
                    backdrop-blur-xl
                    border-r border-slate-200/70 dark:border-white/10
                    shadow-[0_10px_40px_rgba(2,6,23,0.08)]
                    dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                    flex flex-col
                    transition-transform duration-300 ease-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >
                {/* HEADER */}
                <div className="h-20 px-5 border-b border-slate-200/70 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-white dark:bg-white/5 px-3 py-2 border border-slate-200 dark:border-white/10 shadow-sm">
                            <Image
                                src="/say-switchlogo.png"
                                alt="SaySwitch Logo"
                                width={120}
                                height={30}
                                className="h-6 w-auto object-contain"
                                priority
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => setIsOpen?.(false)}
                        className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* PROFILE */}
                <div className="p-4">
                    <div className="relative overflow-hidden rounded-2xl border border-emerald-100 dark:border-emerald-500/10 bg-gradient-to-br from-emerald-50 via-white to-slate-50 dark:from-emerald-500/10 dark:via-white/5 dark:to-white/[0.03] p-4 shadow-sm">
                        <div className="absolute top-0 right-0 h-20 w-20 rounded-full bg-emerald-500/10 blur-2xl" />

                        <div className="relative flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-green-700 text-white font-bold text-base shadow-md">
                                A
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                                    Admin Super
                                </h3>
                                <p className="mt-0.5 truncate text-xs font-medium text-slate-500 dark:text-slate-400">
                                    Super Administrator
                                </p>
                            </div>
                        </div>

                        <div className="relative mt-4 flex items-center justify-between rounded-xl bg-white/70 dark:bg-white/5 px-3 py-2 border border-slate-200/70 dark:border-white/10">
                            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                                Access Level
                            </span>
                            <span className="rounded-full bg-emerald-100 dark:bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                                Full Access
                            </span>
                        </div>
                    </div>
                </div>

                {/* NAV */}
                <nav className="flex-1 overflow-y-auto px-3 pb-6 custom-scrollbar">
                    <div className="space-y-7">
                        {MENU_SECTIONS.map((section) => (
                            <div key={section.title}>
                                <div className="px-3 mb-3">
                                    <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                                        {section.title}
                                    </h4>
                                </div>

                                <ul className="space-y-1.5">
                                    {section.items.map((item) => (
                                        <NavNode
                                            key={item.label}
                                            item={item}
                                            pathname={pathname}
                                            isOpen={openDropdowns.includes(item.label)}
                                            toggle={() => toggleDropdown(item.label)}
                                        />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </nav>

                {/* FOOTER */}
                <div className="border-t border-slate-200/70 dark:border-white/10 p-4">
                    <button className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400 transition-all hover:bg-red-600 hover:text-white hover:border-red-600">
                        <LogOut size={16} className="transition-transform group-hover:-translate-x-0.5" />
                        Secure Logout
                    </button>
                </div>
            </aside>
        </>
    );
}

// ---------------- NAV NODE ----------------
function NavNode({ item, pathname, isOpen, toggle }: NavNodeProps) {
    const isDirectActive = item.href ? pathname === item.href : false;
    const isParentActive = item.subItems?.some((sub) => pathname.startsWith(sub.href)) ?? false;
    const isActive = isDirectActive || isParentActive;

    if (item.subItems) {
        return (
            <li>
                <button
                    onClick={toggle}
                    className={`
                        group w-full flex items-center justify-between
                        rounded-2xl px-3.5 py-3
                        transition-all duration-200
                        ${isActive || isOpen
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"}
                    `}
                >
                    <div className="flex items-center gap-3 min-w-0">
                        <span
                            className={`
                                flex h-9 w-9 items-center justify-center rounded-xl transition-colors
                                ${isActive || isOpen
                                ? "bg-white dark:bg-white/10 text-emerald-600 dark:text-emerald-300 shadow-sm"
                                : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white"}
                            `}
                        >
                            {item.icon}
                        </span>
                        <span className="truncate text-[14px] font-medium">{item.label}</span>
                    </div>

                    <ChevronDown
                        size={16}
                        className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                </button>

                <div
                    className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                    <div className="overflow-hidden">
                        <ul className="ml-6 mt-1 space-y-1 border-l border-slate-200 dark:border-white/10 pl-4">
                            {item.subItems.map((subItem) => (
                                <SubNavNode key={subItem.label} subItem={subItem} pathname={pathname} />
                            ))}
                        </ul>
                    </div>
                </div>
            </li>
        );
    }

    return (
        <li>
            <Link
                href={item.href || "#"}
                className={`
                    group relative flex items-center gap-3 rounded-2xl px-3.5 py-3 transition-all duration-200
                    ${isDirectActive
                    ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"}
                `}
            >
                {isDirectActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-emerald-600" />
                )}

                <span
                    className={`
                        flex h-9 w-9 items-center justify-center rounded-xl transition-colors
                        ${isDirectActive
                        ? "bg-white dark:bg-white/10 text-emerald-600 dark:text-emerald-300 shadow-sm"
                        : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white"}
                    `}
                >
                    {item.icon}
                </span>

                <span className="truncate text-[14px] font-medium">{item.label}</span>
            </Link>
        </li>
    );
}

// ---------------- SUB NAV NODE ----------------
function SubNavNode({ subItem, pathname }: SubNavNodeProps) {
    const isActive = pathname === subItem.href;

    return (
        <li>
            <Link
                href={subItem.href}
                className={`
                    group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] transition-all duration-200
                    ${isActive
                    ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-white"}
                `}
            >
                <span
                    className={`h-1.5 w-1.5 rounded-full ${
                        isActive ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-600"
                    }`}
                />

                <span
                    className={`flex items-center justify-center ${
                        isActive ? "text-emerald-600 dark:text-emerald-300" : "text-slate-400 dark:text-slate-500"
                    }`}
                >
                    {subItem.icon}
                </span>

                <span className="truncate font-medium">{subItem.label}</span>
            </Link>
        </li>
    );
}
