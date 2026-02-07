'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme');
        const isLight = savedTheme === 'light';
        setTheme(isLight ? 'light' : 'dark');

        // Sync classes on mount
        if (isLight) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        if (nextTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-all duration-300 group flex items-center justify-center min-w-[40px] min-h-[40px] hover:bg-purple-500/10 focus:outline-none relative"
            aria-label="Toggle theme"
        >
            <div className="relative w-5 h-5 flex items-center justify-center">
                <Sun
                    className={`absolute inset-0 w-full h-full text-amber-400 transition-all duration-500 ${mounted && theme === 'dark' ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-90'}`}
                />
                <Moon
                    className={`absolute inset-0 w-full h-full text-purple-500 transition-all duration-500 ${mounted && theme === 'light' ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-90'}`}
                />
                <div
                    className={`w-1.5 h-1.5 rounded-full bg-purple-500/30 animate-pulse transition-opacity duration-300 ${mounted ? 'opacity-0 h-0 w-0' : 'opacity-100'}`}
                />
            </div>
        </button>
    );
}
