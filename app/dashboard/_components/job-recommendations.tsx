"use client"
import React, { useEffect, useState } from 'react';
import { Briefcase, Zap, TrendingUp, DollarSign, Target, CheckCircle, Sparkles } from 'lucide-react';
import { fetchWithFallback, MOCK_DATA } from '@/app/lib/api-config';
import { useUser } from '@clerk/nextjs';

export default function JobRecommendations() {
    const { user } = useUser();
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            const userId = user?.username || user?.primaryEmailAddress?.emailAddress || user?.id || 'user_demo';
            try {
                const data = await fetchWithFallback(
                    '/api/webhook/jobs/recommend',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            user_id: userId,
                            data: {
                                skills: ["React", "TypeScript", "Node.js"],
                                experience_years: 3,
                                target_role: "Frontend Developer",
                                location: "Remote"
                            }
                        })
                    },
                    MOCK_DATA.jobs.recommend
                );
                setJobs((data as any).jobs || []);
            } catch (error) {
                console.error("Failed to fetch job recommendations", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchJobs();
    }, [user]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse mt-8">
                {[1, 2].map(i => <div key={i} className="h-64 bg-black/[0.02] dark:bg-white/5 rounded-[2rem]" />)}
            </div>
        );
    }

    return (
        <section className="space-y-8 mt-12">
            <h2 className="text-2xl font-black flex items-center gap-3 tracking-tight">
                <Target className="w-8 h-8 text-blue-500" />
                Curated Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.map((job, idx) => (
                    <div key={idx} className="glass rounded-[2rem] p-8 border border-black/5 dark:border-white/10 hover:border-blue-500/30 transition-all duration-500 group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:bg-blue-500/10" />

                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="max-w-[70%]">
                                <h3 className="text-xl font-black group-hover:text-blue-400 transition-colors leading-tight">{job.title}</h3>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/60 mt-2">
                                    <DollarSign className="w-3 h-3 text-green-500" />
                                    {job.salary_range_usd}
                                </div>
                            </div>
                            <div className="bg-blue-600/20 text-blue-400 px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest ring-1 ring-blue-500/30 shadow-lg shadow-blue-500/10">
                                {job.match_percent}% Match
                            </div>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div>
                                <p className="text-[10px] font-black uppercase text-foreground/50 mb-3 tracking-[0.2em]">Verified Skills</p>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills_matched?.map((skill: string) => (
                                        <span key={skill} className="text-[10px] font-bold px-3 py-1.5 bg-green-500/10 text-green-400 rounded-xl flex items-center gap-2 border border-green-500/10">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-black uppercase text-foreground/50 mb-3 tracking-[0.2em]">Upskill Priority</p>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills_to_learn?.map((skill: string) => (
                                        <span key={skill} className="text-[10px] font-bold px-3 py-1.5 bg-blue-500/10 text-blue-300 rounded-xl border border-blue-500/10">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full animate-pulse ${job.growth_outlook === 'strong' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]'}`} />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${job.growth_outlook === 'strong' ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {job.growth_outlook} Growth
                                </span>
                            </div>
                            <button className="text-xs font-black text-blue-400 hover:text-blue-300 transition-all flex items-center gap-2 group uppercase tracking-widest">
                                Apply <Zap className="w-4 h-4 fill-current group-hover:scale-125 transition-transform" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
