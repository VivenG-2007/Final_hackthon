"use client"
import { Trophy, TrendingUp, Zap, Sparkles, Brain, Briefcase, Video, CheckCircle } from 'lucide-react';
import { useMemo, memo, useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MOCK_DATA } from '@/app/lib/api-config';
import DashboardLoading from './loading';

const Background = dynamic(() => import('../../components/Background'), {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-background -z-10" />
});

// Memoized stat card component
const StatCard = memo(({ stat }: { stat: any }) => (
    <div
        className="rounded-2xl p-6 glass card-shadow transform transition-transform duration-300 hover:scale-105"
        role="article"
        aria-label={`${stat.label}: ${stat.value}`}
    >
        <div className={`inline-flex p-3 rounded-xl mb-4 bg-gradient-to-br ${stat.color}`}>
            <div className="text-white">{stat.icon}</div>
        </div>
        <div className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">
            {stat.value}
        </div>
        <div className="text-sm font-semibold mb-1 opacity-80 text-foreground">
            {stat.label}
        </div>
        {stat.progress !== undefined && (
            <div className="mt-4">
                <div className="flex justify-between text-xs opacity-60 mb-1 text-foreground">
                    <span>Progress</span>
                    <span>{stat.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div
                        className={`h-full bg-gradient-to-r ${stat.color}`}
                        style={{ width: `${stat.progress}%` }}
                    />
                </div>
            </div>
        )}
    </div>
));
StatCard.displayName = 'StatCard';

interface DashboardClientProps {
    initialStats: any;
    user: {
        firstName?: string | null;
    } | null;
}

const JobRecommendations = dynamic(() => import('./_components/job-recommendations'), {
    loading: () => <div className="h-48 rounded-2xl bg-card animate-pulse" />,
    ssr: false
});

const CareerMarketInsights = dynamic(() => import('./_components/career-market-insights'), {
    loading: () => <div className="h-48 rounded-2xl bg-card animate-pulse" />,
    ssr: false
});

const ResumeAnalyserSection = dynamic(() => import('./_components/resume-analyser'), {
    loading: () => <div className="h-96 rounded-2xl bg-card animate-pulse" />,
    ssr: false
});

const JobOpportunitiesSection = dynamic(() => import('./_components/job-opportunities'), {
    loading: () => <div className="h-96 rounded-2xl bg-card animate-pulse" />,
    ssr: false
});

export default function DashboardClient({ initialStats, user }: DashboardClientProps) {
    const statsData = initialStats || MOCK_DATA.dashboard.stats;
    const [isLoading, setIsLoading] = useState(true);
    const [isContentVisible, setIsContentVisible] = useState(false);

    // Handle initial loading and smooth transition
    useEffect(() => {
        let mounted = true;
        let contentTimeout: NodeJS.Timeout | undefined;

        // Simulate minimum loading time for UX (show loading for at least 800ms)
        const minLoadTime = setTimeout(() => {
            if (mounted) {
                setIsLoading(false);
                // Add small delay before showing content for smooth transition
                contentTimeout = setTimeout(() => {
                    if (mounted) {
                        setIsContentVisible(true);
                    }
                }, 50);
            }
        }, 800);

        return () => {
            mounted = false;
            clearTimeout(minLoadTime);
            if (contentTimeout) clearTimeout(contentTimeout);
        };
    }, []);

    // Stats memoization
    const stats = useMemo(() => {
        const data = initialStats?.stats || initialStats || MOCK_DATA.dashboard.stats?.stats || MOCK_DATA.dashboard.stats;

        return [
            { icon: <Brain className="w-6 h-6" />, value: `${data.profile_score}%`, label: "Profile Score", color: "from-purple-500 to-indigo-500", progress: data.profile_score },
            { icon: <Zap className="w-6 h-6" />, value: data.streak_days?.toString() || "0", label: "Learning Streak", color: "from-orange-400 to-red-500" },
            { icon: <Trophy className="w-6 h-6" />, value: data.achievements?.toString() || "0", label: "Achievements", color: "from-yellow-400 to-orange-500" },
            { icon: <CheckCircle className="w-6 h-6" />, value: data.skills_assessed?.toString() || "0", label: "Skills Mastered", color: "from-pink-400 to-rose-500" },
            { icon: <TrendingUp className="w-6 h-6" />, value: data.interviews_completed?.toString() || "0", label: "Interviews", color: "from-green-400 to-emerald-500" },
            { icon: <Briefcase className="w-6 h-6" />, value: data.resumes_analyzed?.toString() || "0", label: "Resumes", color: "from-blue-400 to-cyan-500" },
        ];
    }, [statsData]);

    // Show loading screen while loading
    if (isLoading) {
        return <DashboardLoading />;
    }

    return (
        <div className={`min-h-screen relative transition-all duration-500 bg-background text-foreground ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}>
            <Background />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8 md:space-y-12 pb-24 relative z-10">

                {/* Welcome Section */}
                <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white text-center shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
                            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" />
                            <span className="text-xs sm:text-sm font-medium text-white/90">Premium Member</span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent drop-shadow-sm leading-tight">
                            Welcome back, {user?.firstName || 'User'}!
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed font-medium px-2 sm:px-0">
                            Your career journey is on track. You have <strong className="text-white decoration-purple-400 underline decoration-2 underline-offset-4">3 new job matches</strong> and <strong className="text-white decoration-pink-400 underline decoration-2 underline-offset-4">2 pending assessments</strong> today.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                            <Link href="/plan" className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-white text-purple-900 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-white/20 hover:-translate-y-1 text-sm sm:text-base">
                                View Career Plan
                            </Link>
                            <Link href="/resume-analyser" className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-purple-600/30 text-white border border-white/20 rounded-xl font-bold hover:bg-purple-600/40 transition-all backdrop-blur-md hover:-translate-y-1 text-sm sm:text-base">
                                Analyze Resume
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Quick Stats Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} />
                    ))}
                </section>

                {/* Practice & Prepare Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-purple-500" />
                        Practice & Prepare
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Link href="/interview" className="group relative overflow-hidden rounded-2xl p-8 glass card-shadow hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-cyan-500">
                                <Video className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-4 shadow-lg">
                                    <Video className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">AI Mock Interview</h3>
                                <p className="opacity-70 mb-6 max-w-sm">Practice real-time voice interviews with our sophisticated AI. Get instant feedback on your answers.</p>
                                <span className="inline-flex items-center gap-2 text-sm font-bold text-cyan-500">
                                    Start Session <Zap className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>

                        <Link href="/assess" className="group relative overflow-hidden rounded-2xl p-8 glass card-shadow hover:shadow-orange-500/20 transition-all duration-300 hover:scale-[1.02]">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-orange-500">
                                <Trophy className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-4 shadow-lg">
                                    <Trophy className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">Skill Assessment</h3>
                                <p className="opacity-70 mb-6 max-w-sm">Take adaptive quizzes generated to test your specific technology stack and knowledge gaps.</p>
                                <span className="inline-flex items-center gap-2 text-sm font-bold text-orange-500">
                                    Take Quiz <Zap className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    </div>
                </section>

                {/* Resume & Job Match Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <ResumeAnalyserSection />
                        <JobRecommendations />
                    </div>
                    <div>
                        <JobOpportunitiesSection />
                    </div>
                </div>

                {/* Market Intelligence */}
                <CareerMarketInsights />
            </main>
        </div>
    );
}
