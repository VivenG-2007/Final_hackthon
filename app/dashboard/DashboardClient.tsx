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

// Memoized stat card component with Improved Styling
const StatCard = memo(({ stat }: { stat: any }) => (
    <div
        className="rounded-3xl p-6 glass card-shadow transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/10 border border-white/10 dark:border-white/5"
        role="article"
    >
        <div className={`inline-flex p-3 rounded-2xl mb-4 bg-gradient-to-br ${stat.color} shadow-lg shadow-purple-500/10`}>
            <div className="text-white">{stat.icon}</div>
        </div>
        <div className={`text-3xl sm:text-4xl font-black mb-2 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
            {stat.value}
        </div>
        <div className="text-sm font-bold mb-1 text-foreground/80 tracking-wide uppercase">
            {stat.label}
        </div>
        {stat.progress !== undefined && (
            <div className="mt-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-70 mb-2 text-foreground">
                    <span>Mastery</span>
                    <span>{stat.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 dark:bg-black/20 overflow-hidden border border-white/5">
                    <div
                        className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-1000 ease-out`}
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

    useEffect(() => {
        let mounted = true;
        const minLoadTime = setTimeout(() => {
            if (mounted) {
                setIsLoading(false);
                setTimeout(() => { if (mounted) setIsContentVisible(true); }, 50);
            }
        }, 800);
        return () => { mounted = false; clearTimeout(minLoadTime); };
    }, []);

    const stats = useMemo(() => {
        const data = initialStats?.stats || initialStats || MOCK_DATA.dashboard.stats?.stats;
        return [
            { icon: <Brain className="w-6 h-6" />, value: `${data.profile_score}%`, label: "Profile Score", color: "from-purple-500 to-indigo-500", progress: data.profile_score },
            { icon: <Zap className="w-6 h-6" />, value: data.streak_days?.toString() || "0", label: "Learning Streak", color: "from-orange-400 to-pink-500" },
            { icon: <Trophy className="w-6 h-6" />, value: data.achievements?.toString() || "0", label: "Achievements", color: "from-yellow-400 to-orange-500" },
            { icon: <CheckCircle className="w-6 h-6" />, value: data.skills_assessed?.toString() || "0", label: "Skills Mastered", color: "from-pink-400 to-rose-500" },
            { icon: <TrendingUp className="w-6 h-6" />, value: data.interviews_completed?.toString() || "0", label: "Interviews", color: "from-blue-500 to-purple-600" },
            { icon: <Briefcase className="w-6 h-6" />, value: data.resumes_analyzed?.toString() || "0", label: "Resumes", color: "from-cyan-400 to-blue-500" },
        ];
    }, [statsData]);

    if (isLoading) return <DashboardLoading />;

    return (
        <div className={`min-h-screen relative transition-all duration-500 bg-background text-foreground ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}>
            <Background />

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8 md:space-y-12 pb-24 relative z-10">

                {/* Welcome Section - Enhanced */}
                <section className="relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 text-white text-center shadow-2xl border border-white/10">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                            <span className="text-xs font-bold tracking-widest uppercase">Career Intelligence Active</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent leading-tight">
                            Welcome, {user?.firstName || 'User'}!
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed font-medium">
                            Your career growth is accelerating. You have <span className="text-pink-400 font-bold">3 new job matches</span> and <span className="text-cyan-400 font-bold">2 assessments</span> waiting.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/plan" className="px-8 py-4 bg-white text-purple-900 rounded-2xl font-black hover:scale-105 transition-all shadow-xl hover:shadow-white/20 text-sm uppercase tracking-widest">
                                View Career Plan
                            </Link>
                            <Link href="/resume-analyser" className="px-8 py-4 bg-purple-600/30 text-white border border-white/20 rounded-2xl font-black hover:bg-purple-600/40 transition-all backdrop-blur-md hover:scale-105 text-sm uppercase tracking-widest">
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
                    <h2 className="text-2xl font-black mb-8 flex items-center gap-3 tracking-tight">
                        <Sparkles className="w-8 h-8 text-purple-500" />
                        Practice & Prepare
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Link href="/interview" className="group relative overflow-hidden rounded-[2rem] p-10 glass card-shadow hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-[1.02] border border-white/10">
                            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity text-cyan-500">
                                <Video className="w-48 h-48" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-6 shadow-xl group-hover:rotate-6 transition-transform">
                                    <Video className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-black mb-3 group-hover:text-cyan-400 transition-colors">AI Mock Interview</h3>
                                <p className="text-foreground/70 mb-8 max-w-sm font-medium leading-relaxed">Practice real-time voice interviews with our sophisticated AI. Get instant scoring and feedback.</p>
                                <span className="inline-flex items-center gap-2 text-sm font-black text-cyan-500 uppercase tracking-widest">
                                    Start Session <Zap className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>

                        <Link href="/assess" className="group relative overflow-hidden rounded-[2rem] p-10 glass card-shadow hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.02] border border-white/10">
                            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity text-purple-500">
                                <Trophy className="w-48 h-48" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6 shadow-xl group-hover:-rotate-6 transition-transform">
                                    <Trophy className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-black mb-3 group-hover:text-purple-400 transition-colors">Skill Assessment</h3>
                                <p className="text-foreground/70 mb-8 max-w-sm font-medium leading-relaxed">Take adaptive quizzes generated to test your specific technology stack and knowledge gaps.</p>
                                <span className="inline-flex items-center gap-2 text-sm font-black text-purple-500 uppercase tracking-widest">
                                    Take Quiz <Zap className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    </div>
                </section>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <ResumeAnalyserSection />
                        <JobRecommendations />
                    </div>
                    <div>
                        <JobOpportunitiesSection />
                    </div>
                </div>

                <CareerMarketInsights />
            </main>
        </div>
    );
}
