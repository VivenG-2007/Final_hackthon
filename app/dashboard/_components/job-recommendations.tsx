"use client"
import React, { useEffect, useState } from 'react';
import { Briefcase, Zap, TrendingUp, DollarSign, Target, CheckCircle } from 'lucide-react';
import { fetchWithFallback, MOCK_DATA } from '@/app/lib/api-config';
import { useUser } from '@clerk/nextjs';

export default function JobRecommendations() {
    const { user } = useUser();
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            const userId = user?.username || user?.id || 'user_demo';
            try {
                const data = await fetchWithFallback(
                    '/api/webhook/jobs/recommend',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            user_id: userId,
                            data: {
                                skills: ["React", "TypeScript", "Node.js"], // Simplified for demo
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                {[1, 2].map(i => <div key={i} className="h-48 bg-white/5 rounded-2xl" />)}
            </div>
        );
    }

    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-blue-500" />
                Recommended Matches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.map((job, idx) => (
                    <div key={idx} className="glass rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -mr-8 -mt-8" />

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{job.title}</h3>
                                <div className="flex items-center gap-2 text-sm opacity-60 mt-1">
                                    <DollarSign className="w-4 h-4" />
                                    {job.salary_range_usd}
                                </div>
                            </div>
                            <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-blue-500/30">
                                {job.match_percent}% Match
                            </div>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <div>
                                <p className="text-xs font-bold uppercase opacity-40 mb-2 tracking-wider">Skills Matched</p>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills_matched?.map((skill: string) => (
                                        <span key={skill} className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded-lg flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3" /> {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-bold uppercase opacity-40 mb-2 tracking-wider">Next to Learn</p>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills_to_learn?.map((skill: string) => (
                                        <span key={skill} className="text-xs px-2 py-1 bg-blue-500/10 text-blue-300 rounded-lg">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center relative z-10">
                            <span className={`text-xs font-bold uppercase ${job.growth_outlook === 'strong' ? 'text-green-400' : 'text-yellow-400'}`}>
                                Outlook: {job.growth_outlook}
                            </span>
                            <button className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group">
                                Apply Now <Zap className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
