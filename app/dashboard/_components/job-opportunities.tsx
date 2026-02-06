"use client"
import { Briefcase, TrendingUp, Zap } from 'lucide-react';
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
        window.open('https://www.naukri.com/nlogin/login?utm_source=google&utm_medium=cpc&utm_campaign=Brand&gclsrc=aw.ds&gad_source=1&gad_campaignid=19863995494&gbraid=0AAAAADLp3cHQfND7JICwSWl7ABrZEFpKS&gclid=CjwKCAiA1obMBhAbEiwAsUBbImgMOIAkykiuV2OkABrwfUqdzb4yUI8Jkj-ZBPA3kZs2MsUFmEgKiRoCHtEQAvD_BwE', '_blank');
    }, []);

    return (
        <aside className="rounded-2xl p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 h-full flex flex-col" aria-labelledby="job-opportunities-heading">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500" aria-hidden="true">
                    <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h2 id="job-opportunities-heading" className="text-2xl font-bold text-white">Market Insights</h2>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {loading ? (
                    <div className="space-y-4 animate-pulse">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-20 bg-gray-800/50 rounded-xl" />
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Fastest Growing Roles */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Top Growing Roles</h3>
                            {marketSummary?.fastest_growing?.slice(0, 2).map((role, index) => (
                                <article key={index} className="flex items-start gap-3 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50 transition-colors hover:bg-gray-800/50">
                                    <div className="p-2 rounded-lg bg-green-500/20" aria-hidden="true">
                                        <TrendingUp className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">{role.role}</h4>
                                        <p className="text-sm text-green-400 font-bold">+{role.growth} Growth</p>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* In-Demand Skills */}
                        {skillsData?.technical_skills && (
                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Critical Skills</h3>
                                <div className="space-y-3">
                                    {skillsData.technical_skills.slice(0, 3).map((s: any, idx: number) => (
                                        <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                                            <span className="text-sm font-medium">{s.skill}</span>
                                            <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg">{s.growth} growth</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Hot Skills Tags */}
                        {marketSummary?.hot_skills && (
                            <div className="pt-4 border-t border-white/5">
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Trending keywords</h3>
                                <div className="flex flex-wrap gap-2">
                                    {marketSummary.hot_skills.map((skill, idx) => (
                                        <span key={idx} className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded-lg border border-cyan-500/20">
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
                className="w-full mt-6 py-4 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                aria-label="Find your career path"
            >
                <Zap className="w-5 h-5" aria-hidden="true" />
                Find Your Career Path
            </button>
        </aside>
    );
}
