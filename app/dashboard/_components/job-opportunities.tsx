"use client"
import { Briefcase, TrendingUp, Zap, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { fetchWithFallback, MOCK_DATA } from '@/app/lib/api-config';
import { MarketSummaryResponse } from '@/app/lib/types';

export default function JobOpportunitiesSection() {
    const [marketSummary, setMarketSummary] = useState<MarketSummaryResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [skillsData, setSkillsData] = useState<any>(null);

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const [summary, skills] = await Promise.all([
                    fetchWithFallback('/api/jobs/market/summary', {}, MOCK_DATA.jobs.market.summary),
                    fetchWithFallback('/api/jobs/market/skills', {}, MOCK_DATA.jobs.market.skills)
                ]);
                setMarketSummary(summary as unknown as MarketSummaryResponse);
                setSkillsData(skills);
            } catch (error) {
                console.error('Failed to fetch market data', error);
                setMarketSummary(MOCK_DATA.jobs.market.summary as unknown as MarketSummaryResponse);
                setSkillsData(MOCK_DATA.jobs.market.skills);
            } finally {
                setLoading(false);
            }
        };

        fetchMarketData();
    }, []);

    const handleJobOpportunitiesClick = useCallback(() => {
        window.open('https://www.naukri.com/', '_blank');
    }, []);

    return (
        <aside className="rounded-[2rem] p-8 glass card-shadow border border-white/10 h-full flex flex-col hover:shadow-cyan-500/5 transition-all duration-500" aria-labelledby="job-opportunities-heading">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20" aria-hidden="true">
                    <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h2 id="job-opportunities-heading" className="text-2xl font-black tracking-tight text-foreground">Market Pulse</h2>
            </div>

            <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {loading ? (
                    <div className="space-y-4 animate-pulse">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-24 bg-white/5 rounded-2xl" />
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Fastest Growing Roles */}
                        <div className="space-y-5">
                            <h3 className="text-[10px] font-black text-foreground/50 uppercase tracking-[0.2em]">High Growth Roles</h3>
                            <div className="space-y-3">
                                {marketSummary?.fastest_growing?.slice(0, 2).map((role, index) => (
                                    <article key={index} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 transition-all hover:bg-white/10 group">
                                        <div className="p-2 rounded-xl bg-orange-500/10 group-hover:scale-110 transition-transform" aria-hidden="true">
                                            <TrendingUp className="w-5 h-5 text-orange-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground/90 text-sm mb-1">{role.role}</h4>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm" />
                                                <p className="text-xs text-green-400 font-black">+{role.growth} Growth</p>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        {/* In-Demand Skills */}
                        {skillsData?.technical_skills && (
                            <div className="space-y-5 pt-8 border-t border-white/5">
                                <h3 className="text-[10px] font-black text-foreground/50 uppercase tracking-[0.2em]">Critical Skills</h3>
                                <div className="space-y-3">
                                    {skillsData.technical_skills.slice(0, 3).map((s: any, idx: number) => (
                                        <div key={idx} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                                            <span className="text-sm font-bold text-foreground/80">{s.skill}</span>
                                            <span className="text-[10px] font-black px-2 py-1 bg-purple-500/10 text-purple-400 rounded-lg uppercase tracking-wider">{s.growth} trend</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Hot Skills Tags */}
                        {marketSummary?.hot_skills && (
                            <div className="pt-8 border-t border-white/5">
                                <h3 className="text-[10px] font-black text-foreground/50 uppercase tracking-[0.2em] mb-4">Trending Tech</h3>
                                <div className="flex flex-wrap gap-2">
                                    {marketSummary.hot_skills.map((skill, idx) => (
                                        <span key={idx} className="text-[10px] font-black px-3 py-1.5 bg-cyan-500/5 text-cyan-400 rounded-xl border border-cyan-500/10 hover:bg-cyan-500/10 transition-colors uppercase tracking-widest cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <button
                onClick={handleJobOpportunitiesClick}
                className="w-full mt-8 py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-black transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 text-sm uppercase tracking-widest"
                aria-label="Find your career path"
            >
                <Zap className="w-5 h-5" aria-hidden="true" />
                Find Career Path
            </button>
        </aside>
    );
}
