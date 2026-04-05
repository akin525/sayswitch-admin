"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, Sun, Moon, ArrowRight, ShieldCheck, Zap, Activity } from "lucide-react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("sayswitch_token", "admin_session_789");
        router.push("/dashboard/overview"); // <-- Updated path
    };

    return (
        <div className="min-h-screen flex w-full bg-[var(--background)] transition-colors duration-300 font-sans">

            {/* LEFT SIDE - BRANDING & TRUST (Hidden on smaller screens) */}
            <div className="hidden lg:flex w-1/2 bg-brand relative items-center justify-center p-12 overflow-hidden">
                {/* Modern subtle mesh gradient background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

                <div className="relative z-10 text-white max-w-lg w-full flex flex-col justify-between h-full py-10">

                    {/* Top: Logo inside a clean white pill for perfect contrast */}
                    <div>
                        <div className="inline-flex items-center bg-white px-4 py-2.5 rounded-2xl shadow-lg mb-12">
                            <Image
                                src="/say-switchlogo.png"
                                alt="SaySwitch Logo"
                                width={150}
                                height={40}
                                className="h-8 w-auto object-contain"
                                priority
                            />
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-[1.15] tracking-tight">
                            Manage your gateway with confidence.
                        </h1>
                        <p className="text-brand-light text-lg mb-12 opacity-90 leading-relaxed max-w-md">
                            Access your command center to monitor transactions in real-time, manage settlements, and configure your payment infrastructure.
                        </p>
                    </div>

                    {/* Bottom: Glassmorphic Feature Cards */}
                    <div className="space-y-4">
                        <FeatureRow icon={<ShieldCheck size={20} />} title="Bank-Grade Security" desc="End-to-end encryption for all transaction data." />
                        <FeatureRow icon={<Zap size={20} />} title="Lightning Fast" desc="Sub-second processing and real-time webhooks." />
                        <FeatureRow icon={<Activity size={20} />} title="99.99% Uptime" desc="Reliable infrastructure built for enterprise scale." />
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE - LOGIN FORM */}
            <div className="w-full lg:w-1/2 flex flex-col relative">

                {/* Theme Toggle Top Right */}
                <div className="absolute top-6 right-6 z-10">
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2.5 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--background)] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
                            aria-label="Toggle Dark Mode"
                        >
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    )}
                </div>

                <div className="flex-1 flex items-center justify-center p-8 sm:p-12">
                    <div className="w-full max-w-[420px]">

                        {/* Mobile Logo (Only shows on mobile, uses white bg for contrast) */}
                        <div className="flex lg:hidden mb-10">
                            <div className="inline-flex items-center bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-100">
                                <Image
                                    src="/say-switchlogo.png"
                                    alt="SaySwitch Logo"
                                    width={140}
                                    height={36}
                                    className="h-7 w-auto object-contain"
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-2.5">
                                Welcome back
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
                                Enter your admin credentials to access the dashboard.
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">

                            {/* Email Input */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-[var(--foreground)]" htmlFor="email">
                                    Email Address
                                </label>
                                <div className="relative flex items-center group">
                                    <Mail className="absolute left-3.5 text-gray-400 group-focus-within:text-brand transition-colors" size={20} />
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="admin@sayswitch.com"
                                        required
                                        className="w-full pl-11 pr-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-semibold text-[var(--foreground)]" htmlFor="password">
                                        Password
                                    </label>
                                    <a href="#" className="text-sm font-medium text-brand hover:text-brand-dark transition-colors">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative flex items-center group">
                                    <Lock className="absolute left-3.5 text-gray-400 group-focus-within:text-brand transition-colors" size={20} />
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-11 pr-12 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all shadow-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center pt-1 pb-2">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-brand bg-[var(--background)] border-[var(--border)] rounded focus:ring-brand focus:ring-offset-0 transition-colors cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="ml-2.5 block text-sm font-medium text-gray-600 dark:text-gray-300 cursor-pointer">
                                    Keep me logged in
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white py-3.5 rounded-xl font-semibold transition-all shadow-[0_4px_14px_0_rgba(0,130,59,0.25)] hover:shadow-[0_6px_20px_rgba(0,130,59,0.3)] active:scale-[0.98]"
                            >
                                Sign In to Dashboard
                                <ArrowRight size={18} />
                            </button>
                        </form>

                        <div className="mt-10 text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Need administrative access? <a href="#" className="text-brand font-semibold hover:underline">Contact IT Support</a>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper component for the left panel feature list
function FeatureRow({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/10 border border-white/5 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-white/20 text-white shrink-0">
                {icon}
            </div>
            <div>
                <h4 className="text-white font-semibold text-sm">{title}</h4>
                <p className="text-brand-light text-xs mt-0.5 opacity-80">{desc}</p>
            </div>
        </div>
    );
}