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
      // Use higher threshold for better stability
      setIsScrolled(window.scrollY > 40);
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
      className={`fixed left-0 right-0 z-[100] will-change-transform transition-all duration-500 ease-out pointer-events-none ${isScrolled ? 'top-0' : 'top-4 md:top-6'
        }`}
    >
      <header
        className={`mx-auto transition-all duration-500 ease-out pointer-events-auto border border-white/10 ${isScrolled
          ? 'max-w-full w-full h-16 rounded-none bg-white/70 dark:bg-black/80 backdrop-blur-xl border-x-0 border-t-0 shadow-lg'
          : 'max-w-7xl w-[95%] h-18 sm:h-20 rounded-[2rem] bg-white/20 dark:bg-black/30 backdrop-blur-3xl shadow-[0_15px_35px_rgba(0,0,0,0.15)]'
          }`}
      >
        <div className="h-full flex items-center justify-between px-6 sm:px-10 relative">

          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 sm:gap-4 transition-all hover:scale-105 active:scale-95 group overflow-visible">
              <div
                className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl group-hover:rotate-6 transition-transform flex items-center justify-center bg-white shadow-md border border-indigo-100 dark:border-indigo-900/50 p-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 opacity-100" />
                <Image
                  src="/logo.svg"
                  alt="The Resume Hub"
                  width={40}
                  height={40}
                  className="relative z-10 w-full h-full object-contain drop-shadow-sm"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center select-none" suppressHydrationWarning>
                <span
                  className="text-lg sm:text-2xl font-black bg-clip-text text-transparent leading-none inline-block bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400"
                  style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  The Resume Hub
                </span>
                <span
                  className="text-[10px] font-extrabold opacity-50 hidden sm:block tracking-[0.3em] uppercase mt-1 text-foreground"
                >
                  Innovibe
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden lg:block absolute left-1/2 -translate-x-1/2">
            <ul className="flex gap-2 items-center bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/5 backdrop-blur-sm">
              {navLinks.map((link) => {
                const isActive = checkActive(link.href);
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`px-6 py-2 rounded-full transition-all duration-300 font-bold text-sm tracking-wide relative overflow-hidden group ${isActive
                        ? 'text-white'
                        : 'text-foreground/70 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full -z-10 shadow-lg" />
                      )}
                      {link.label}
                      {!isActive && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-1/3 opacity-50" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5 justify-end">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full transition-all active:scale-95 flex items-center justify-center bg-white/5 dark:bg-white/10 hover:bg-white/20 border border-white/20">
              {mounted ? <ThemeToggle /> : <div className="w-5 h-5 rounded-full bg-white/5" />}
            </div>

            <div className="flex items-center gap-4">
              {mounted && isLoaded ? (
                <>
                  <SignedIn>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 p-[2px] rounded-full bg-gradient-to-tr from-indigo-600 to-blue-600 shadow-md hover:scale-105 transition-all active:scale-95 flex items-center justify-center overflow-hidden">
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
                    <div className="hidden sm:flex gap-3">
                      <SignInButton mode="modal">
                        <button className="px-5 py-2.5 rounded-xl font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-all text-xs uppercase tracking-widest cursor-pointer text-foreground/80 border border-transparent hover:border-black/10 dark:hover:border-white/10">
                          Login
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-black shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer">
                          Join <Sparkles className="w-3 h-3" />
                        </button>
                      </SignUpButton>
                    </div>
                  </SignedOut>
                </>
              ) : (
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 animate-pulse" />
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all active:scale-90 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> : <Menu className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-0 left-0 w-full h-full z-[99] lg:hidden pointer-events-auto">
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-24 left-4 right-4 bg-white dark:bg-neutral-900 rounded-[2rem] overflow-hidden shadow-2xl animate-in slide-in-from-top-4 duration-500 border border-black/5 dark:border-white/5">
            <ul className="flex flex-col p-8 space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between text-2xl font-black transition-all ${checkActive(link.href)
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-foreground/70 active:text-indigo-500'
                      }`}
                  >
                    {link.label}
                    {checkActive(link.href) && <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-lg" />}
                  </Link>
                </li>
              ))}
              <li className="pt-6 border-t border-black/5 dark:border-white/10">
                <SignedOut>
                  <div className="flex flex-col gap-4">
                    <SignInButton mode="modal">
                      <button className="w-full py-4 rounded-2xl font-black bg-black/5 dark:bg-white/5 active:scale-95 transition-all text-lg tracking-widest uppercase text-foreground">
                        Login
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="w-full py-4 rounded-2xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-xl active:scale-95 transition-all text-lg tracking-widest uppercase">
                        Get Started
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="flex justify-center p-6 bg-black/5 dark:bg-white/5 rounded-2xl">
                    <UserButton appearance={{ elements: { avatarBox: "w-20 h-20 border-4 border-white dark:border-white/10" } }} />
                  </div>
                </SignedIn>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
