'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

/**
 * TopNav Component
 * High-performance Liquid Glass design.
 * Features ultra-translucent backgrounds, high-intensity backdrop blur, and floating pill navigation.
 */
const TopNav = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Unified active link check (works on both server and client)
    const checkActive = (href: string) => pathname === href;

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] h-20 bg-white/10 dark:bg-black/40 backdrop-blur-3xl border-b border-white/20 transition-all duration-500 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]">
            <div className="max-w-7xl mx-auto h-full flex justify-between items-center px-4 sm:px-8">
                {/* Brand Logo - Enhanced Glass Styling */}
                <Link href="/" className="flex items-center gap-3 sm:gap-4 hover:scale-105 transition-all group">
                    <div className="relative w-10 h-10 p-2 rounded-xl bg-white/20 border border-white/30 backdrop-blur-md shadow-lg group-hover:rotate-6 transition-transform">
                        <Image
                            src="/logo.svg"
                            alt="The Resume Hub"
                            fill
                            className="object-contain p-1"
                            priority
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-xl font-black bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400 bg-clip-text text-transparent hidden sm:block leading-none">
                            ResuHub
                        </span>
                        <span className="text-[10px] font-bold opacity-60 hidden sm:block tracking-widest uppercase">
                            AI Precision
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav - Floating Pill Style */}
                <nav className="hidden lg:block">
                    <ul className="flex gap-2 items-center bg-white/10 dark:bg-black/30 p-1.5 rounded-full border border-white/10 backdrop-blur-xl">
                        {[
                            { href: '/', label: 'Home' },
                            { href: '/services', label: 'Services' },
                            { href: '/about', label: 'About' },
                            { href: '/contact', label: 'Contact' },
                        ].map((link) => {
                            const isActive = checkActive(link.href);
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`px-6 py-2 rounded-full transition-all duration-300 font-bold text-sm tracking-wide relative overflow-hidden group ${isActive
                                                ? 'text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-md transform scale-105'
                                                : 'text-foreground/80 hover:text-foreground hover:bg-white/10'
                                            }`}
                                    >
                                        {link.label}
                                        {!isActive && (
                                            <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full opacity-50" />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Actions - Premium Glass Look */}
                <div className="flex items-center gap-3 sm:gap-6">
                    <div className="p-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all">
                        <ThemeToggle />
                    </div>

                    <div className="hidden sm:flex gap-4 items-center">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="px-5 py-2.5 rounded-xl font-bold hover:bg-white/10 active:scale-95 transition-all text-xs uppercase tracking-[0.2em] border border-white/10 cursor-pointer">
                                    Login
                                </button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-black shadow-[0_10px_20px_-5px_rgba(147,51,234,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(147,51,234,0.6)] active:scale-95 transition-all text-xs uppercase tracking-[0.2em] flex items-center gap-2 cursor-pointer">
                                    Join <Sparkles className="w-3 h-3" />
                                </button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <div className="p-0.5 rounded-full bg-gradient-to-br from-purple-400 to-orange-400 shadow-lg ring-2 ring-white/10">
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-10 h-10 rounded-full border-2 border-transparent transition-transform active:scale-90 hover:scale-105 cursor-pointer",
                                            userButtonTrigger: "focus:shadow-none bg-black/20 backdrop-blur-md rounded-full"
                                        }
                                    }}
                                />
                            </div>
                        </SignedIn>
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-3 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all active:scale-90 cursor-pointer"
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay - Liquid Flow Design */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 top-[80px] lg:hidden z-[90] animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
                    <div className="absolute top-4 left-4 right-4 bg-white/95 dark:bg-black/90 backdrop-blur-3xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-top-8 duration-500">
                        <ul className="flex flex-col p-8 space-y-6">
                            {[
                                { href: '/', label: 'Home' },
                                { href: '/services', label: 'Services' },
                                { href: '/about', label: 'About' },
                                { href: '/contact', label: 'Contact' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center justify-between text-2xl font-black transition-all ${checkActive(link.href)
                                                ? 'text-purple-500 translate-x-2'
                                                : 'text-foreground/70 active:text-purple-500'
                                            }`}
                                    >
                                        {link.label}
                                        {checkActive(link.href) && <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]" />}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-8 border-t border-white/10 flex flex-col gap-6">
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <button className="w-full py-4 rounded-2xl font-black bg-white/10 border border-white/10 active:scale-95 transition-all text-lg tracking-widest uppercase cursor-pointer">
                                            Login
                                        </button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <button className="w-full py-4 rounded-2xl font-black bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl active:scale-95 transition-all text-lg tracking-widest uppercase cursor-pointer">
                                            Get Started
                                        </button>
                                    </SignUpButton>
                                </SignedOut>
                                <SignedIn>
                                    <div className="flex justify-center p-4 bg-white/5 rounded-2xl">
                                        <UserButton appearance={{ elements: { avatarBox: "w-16 h-16 border-2 border-white/20 cursor-pointer" } }} />
                                    </div>
                                </SignedIn>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </header>
    );
};

export default TopNav;
