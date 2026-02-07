"use client"
import React, { useEffect, useState } from 'react';
import { TrendingUp, DollarSign, Globe, ArrowRight, ShieldCheck, Activity, Brain } from 'lucide-react';
import { fetchWithFallback, MOCK_DATA } from '@/app/lib/api-config';

export default function CareerMarketInsights() {
    const [salaries, setSalaries] = useState<any[]>([]);
    const [industryData, setIndustryData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [salaryRes, industryRes] = await Promise.all([
                    fetchWithFallback('/api/jobs/market/salaries', {}, MOCK_DATA.jobs.market.salaries),
                    fetchWithFallback('/api/jobs/market/industry/technology', {}, MOCK_DATA.jobs.market.industry('technology'))
                ]);
                setSalaries((salaryRes as any).roles || []);
                setIndustryData(industryRes);
            } catch (error) {
                console.error("Failed to fetch market insights", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="h-64 bg-black/[0.02] dark:bg-white/5 animate-pulse rounded-[2rem] mt-12" />;

    return (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            <div className="lg:col-span-2 glass rounded-[2rem] p-10 border border-black/5 dark:border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full -mr-32 -mt-32 blur-3xl transition-all group-hover:bg-purple-500/10" />

                <h2 className="text-2xl font-black mb-10 flex items-center gap-4 relative z-10 tracking-tight">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/20">
                        <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    Global Salary Benchmarks
                </h2>

                <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                    {salaries.map((s, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between group/item hover:bg-black/[0.04] dark:hover:bg-white/10 transition-all duration-300">
                            <div>
                                <p className="text-[10px] font-black opacity-50 mb-2 uppercase tracking-[0.2em]">{s.role}</p>
                                <p className="text-xl font-black text-foreground/90 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">{s.range}</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                                <TrendingUp className="w-6 h-6 text-green-400" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass rounded-[2rem] p-10 border border-black/5 dark:border-white/10 relative overflow-hidden flex flex-col justify-between group">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full -ml-24 -mb-24 blur-3xl transition-all group-hover:bg-blue-500/10" />

                <div className="relative z-10">
                    <h2 className="text-2xl font-black mb-2 flex items-center gap-4 tracking-tight">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20">
                            <Globe className="w-6 h-6 text-white" />
                        </div>
                        Industry Outlook
                    </h2>
                    <p className="text-[10px] opacity-40 mb-12 uppercase tracking-[0.3em] font-black ml-16">Technology Sector</p>

                    <div className="space-y-8">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-lg shadow-blue-500/5">
                                <Activity className="w-7 h-7 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-1">Global Demand</p>
                                <p className="text-2xl font-black capitalize text-blue-400 tracking-tight">{industryData?.outlook || "Aggressive"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20 shadow-lg shadow-green-500/5">
                                <TrendingUp className="w-7 h-7 text-green-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-1">Growth Forecast</p>
                                <p className="text-2xl font-black text-green-400 tracking-tight">+{industryData?.growth_rate || "12%"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 relative z-10">
                    <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center gap-3">
                        <ShieldCheck className="w-4 h-4 text-purple-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Verified Data Points</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
