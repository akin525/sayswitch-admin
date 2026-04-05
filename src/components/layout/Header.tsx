"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Bell, Search, Sun, Moon, LogOut, Menu } from "lucide-react";

export default function Header({ toggleSidebar }: { toggleSidebar?: () => void }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    // Prevent hydration mismatch for theme toggle
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("sayswitch_token");
        router.push("/login");
    };

    return (
        <header className="h-20 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 md:px-8 shrink-0 transition-colors duration-300">

            {/* LEFT SIDE: Mobile Toggle & Global Search */}
            <div className="flex items-center gap-4 flex-1">

                {/* Mobile Menu Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden p-2 -ml-2 text-gray-500 hover:text-[var(--foreground)] hover:bg-[var(--background)] rounded-xl transition-all active:scale-95"
                >
                    <Menu size={24} />
                </button>

                {/* Global Search Bar */}
                <div className="flex-1 max-w-xl hidden sm:block">
                    <div className="flex items-center bg-[var(--background)] rounded-xl px-4 py-2.5 border border-[var(--border)] focus-within:ring-2 focus-within:ring-[#00823B]/20 focus-within:border-[#00823B] transition-all shadow-sm group">
                        <Search size={16} className="text-gray-400 group-focus-within:text-[#00823B] transition-colors" />
                        <input
                            type="text"
                            placeholder="Search transactions, customers, or settlements..."
                            className="bg-transparent border-none outline-none ml-3 w-full text-[13px] font-bold text-[var(--foreground)] placeholder:text-gray-500 placeholder:font-medium"
                        />
                        {/* Keyboard Shortcut Hint (Standard in elite dashboards) */}
                        <div className="hidden lg:flex items-center gap-1 px-2 py-1 bg-[var(--card)] border border-[var(--border)] rounded-md shadow-sm">
                            <span className="text-[10px] font-black text-gray-400">⌘K</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Actions & Profile */}
            <div className="flex items-center gap-2 sm:gap-4">

                {/* Theme Toggle */}
                {mounted && (
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2.5 rounded-xl text-gray-400 hover:bg-[var(--background)] hover:text-[var(--foreground)] border border-transparent hover:border-[var(--border)] transition-all"
                        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                )}

                {/* Notifications */}
                <button className="p-2.5 rounded-xl text-gray-400 hover:bg-[var(--background)] hover:text-[var(--foreground)] border border-transparent hover:border-[var(--border)] transition-all relative">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-[var(--card)] rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                </button>

                <div className="h-8 w-px bg-[var(--border)] mx-1 hidden md:block"></div>

                {/* User Profile Block */}
                <div className="flex items-center gap-3 pl-1 sm:pl-2 cursor-pointer group">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[13px] font-black text-[var(--foreground)] group-hover:text-[#00823B] transition-colors">Admin User</span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Superadmin</span>
                    </div>

                    {/* Styled Avatar */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#005C29] to-[#00823B] flex items-center justify-center text-white font-black shadow-md shadow-[#00823B]/20 group-hover:shadow-[#00823B]/40 transition-all">
                        AD
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all ml-1 hidden sm:block"
                    title="Secure Logout"
                >
                    <LogOut size={18} />
                </button>

            </div>
        </header>
    );
}