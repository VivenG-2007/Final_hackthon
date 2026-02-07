'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NavBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoaded } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const checkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/dashboard';
    }
    return pathname === href;
  };

  return (
    <div
      className={`fixed left-0 right-0 z-[100] transition-all duration-300 pointer-events-none ${isScrolled ? 'top-0' : 'top-4 md:top-6'}`}
      suppressHydrationWarning
    >
      <header
        className={`mx-auto transition-all duration-500 ease-out pointer-events-auto border border-white/10 ${isScrolled
          ? 'max-w-full w-full h-16 rounded-none bg-[var(--background)]/80 backdrop-blur-xl border-x-0 shadow-lg'
          : 'max-w-7xl w-[95%] h-18 sm:h-20 rounded-[2rem] bg-[var(--card-bg)] backdrop-blur-3xl shadow-lg'
          }`}
      >
        <div className="h-full flex items-center justify-between px-6 sm:px-10 relative">

          {/* Branding */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 sm:gap-4 transition-all group overflow-visible">
              <div className="relative w-10 h-10 sm:w-14 sm:h-14 p-1 rounded-2xl flex items-center justify-center bg-white/10 dark:bg-white/5 backdrop-blur-md shadow-lg border border-white/20 dark:border-white/10 transform group-hover:rotate-3 transition-all duration-300">
                <Image
                  src="/logo.svg"
                  alt="The Resume Hub"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain p-1"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center select-none">
                <span className="text-lg sm:text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-none">
                  The Resume Hub
                </span>
                <span className="text-[10px] font-bold opacity-70 hidden sm:block tracking-[0.3em] uppercase mt-1 text-purple-600 dark:text-purple-400">
                  Innovibe
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <ul className="flex gap-1 items-center bg-white/5 dark:bg-black/20 p-1 rounded-full border border-white/10 backdrop-blur-sm">
              {navLinks.map((link) => {
                const isActive = checkActive(link.href);
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`px-6 py-2 rounded-full transition-all duration-300 font-bold text-sm tracking-wide relative overflow-hidden group ${isActive
                        ? 'text-white'
                        : 'text-foreground/70 hover:text-purple-600 dark:hover:text-purple-400'
                        }`}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full -z-10 shadow-lg shadow-purple-500/20" />
                      )}
                      {link.label}
                      {!isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-1/3 opacity-70" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-4 justify-end">
            <div className="p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <ThemeToggle />
            </div>

            <div className="flex items-center min-w-[40px] sm:min-w-[120px] justify-end relative h-10">
              <div className={`flex items-center gap-2 sm:gap-4 transition-all duration-500 ${mounted && isLoaded ? 'opacity-100' : 'opacity-0 scale-95'}`}>
                <SignedIn>
                  <div className="w-10 h-10 sm:w-11 sm:h-11 p-0.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden bg-white dark:bg-black">
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox: "w-full h-full",
                            userButtonTrigger: "focus:shadow-none bg-transparent h-full w-full"
                          }
                        }}
                      />
                    </div>
                  </div>
                </SignedIn>
                <SignedOut>
                  <div className="hidden sm:flex gap-2">
                    <SignInButton mode="modal">
                      <button className="px-4 py-2 rounded-xl font-bold hover:bg-purple-500/10 transition-all text-xs uppercase tracking-widest cursor-pointer text-purple-600 dark:text-purple-400">
                        Login
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-black shadow-lg hover:shadow-purple-500/25 active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer">
                        Join <Sparkles className="w-3 h-3 text-white" />
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>
              </div>

              {!mounted && (
                <div className="absolute right-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-purple-500/10 animate-pulse border border-purple-500/10" />
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all active:scale-90 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-purple-600 dark:text-purple-400" /> : <Menu className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
