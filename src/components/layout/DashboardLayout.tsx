"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    // State for mobile sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("sayswitch_token");
        if (!token) {
            router.push("/login");
        } else {
            setIsAuthenticated(true);
        }
    }, [pathname, router]);

    if (isAuthenticated === null) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[var(--background)]">
                <Loader2 className="h-10 w-10 animate-spin text-[#00823B]" />
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[var(--background)] font-sans">

            {/* Pass state to Sidebar */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Pass state to Header so it can trigger the menu */}
                <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[var(--background)]">
                    <div className="p-4 sm:p-6 md:p-8 max-w-[1600px] mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}