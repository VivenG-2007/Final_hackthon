"use client"

import React, { useEffect, useState } from 'react';

export default function Background() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[var(--background)]">
            {/* Optimized Mesh Gradient Animation */}
            <div className="absolute top-[-25%] left-[-25%] w-[150%] h-[150%] opacity-20 dark:opacity-10 animate-slow-spin">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,var(--primary-purple),transparent_60%)] blur-[80px]" />
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,var(--primary-pink),transparent_60%)] blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,var(--primary-cyan),transparent_60%)] blur-[80px]" />
            </div>

            {/* Simple Grain Overlay (Faster than SVG Filter) */}
            <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none surface-grain" />
        </div>
    );
}
