"use client";

import { useEffect, useState } from 'react';
import { Brain, Briefcase, Trophy, Sparkles } from 'lucide-react';

export default function DashboardLoading() {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('Loading Dashboard');

    useEffect(() => {
        // Simulate loading progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) return 90; // Cap at 90% until actual load
                return prev + Math.random() * 15;
            });
        }, 200);

        // Animate loading text
        const textInterval = setInterval(() => {
            setLoadingText((prev) => {
                if (prev === 'Loading Dashboard...') return 'Loading Dashboard';
                return prev + '.';
            });
        }, 400);

        return () => {
            clearInterval(progressInterval);
            clearInterval(textInterval);
        };
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 animate-pulse" />

            {/* Animated Orbs */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-slow-spin" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-slow-spin" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />

            {/* Main Loading Content */}
            <div className="relative z-10 max-w-md w-full mx-auto px-6">
                <div className="text-center space-y-8">
                    {/* Logo/Icon Animation */}
                    <div className="flex justify-center items-center gap-4 mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 animate-pulse" />
                            <div className="relative bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 p-6 rounded-2xl shadow-2xl">
                                <Briefcase className="w-12 h-12 text-white animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Loading Text */}
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">
                            {loadingText}
                        </h2>
                        <p className="text-sm opacity-60">
                            Preparing your personalized experience
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-3">
                        <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
                            <div
                                className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 transition-all duration-300 ease-out rounded-full shadow-lg"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                            </div>
                        </div>
                        <div className="text-xs opacity-50 font-medium">
                            {Math.round(progress)}%
                        </div>
                    </div>

                    {/* Loading Feature Icons */}
                    <div className="flex justify-center items-center gap-6 pt-4">
                        <div className="animate-enter stagger-1">
                            <div className="p-3 rounded-xl bg-purple-500/10 backdrop-blur-sm">
                                <Brain className="w-6 h-6 text-purple-500" />
                            </div>
                        </div>
                        <div className="animate-enter stagger-2">
                            <div className="p-3 rounded-xl bg-blue-500/10 backdrop-blur-sm">
                                <Trophy className="w-6 h-6 text-blue-500" />
                            </div>
                        </div>
                        <div className="animate-enter stagger-3">
                            <div className="p-3 rounded-xl bg-pink-500/10 backdrop-blur-sm">
                                <Sparkles className="w-6 h-6 text-pink-500" />
                            </div>
                        </div>
                    </div>

                    {/* Helpful Tips (Optional) */}
                    <div className="pt-8 animate-enter stagger-3">
                        <p className="text-xs opacity-40 italic">
                            💡 Tip: Complete daily assessments to maintain your learning streak
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
