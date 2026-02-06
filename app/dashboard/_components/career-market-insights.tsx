"use client"
import React, { useEffect, useState } from 'react';
import { TrendingUp, DollarSign, Globe, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
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

    if (loading) return <div className="h-48 bg-white/5 animate-pulse rounded-2xl" />;

    return (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass rounded-2xl p-8 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />

                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 relative z-10">
                    <TrendingUp className="w-6 h-6 text-purple-500" />
                    Salary Benchmarks
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                    {salaries.map((s, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
                            <div>
                                <p className="text-sm font-bold opacity-60 mb-1">{s.role}</p>
                                <p className="text-lg font-bold text-white">{s.range}</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <DollarSign className="w-5 h-5 text-green-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass rounded-2xl p-8 border border-white/10 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full -ml-24 -mb-24 blur-3xl" />

                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <Globe className="w-6 h-6 text-blue-500" />
                        Industry Outlook
                    </h2>
                    <p className="text-sm opacity-60 mb-8 uppercase tracking-widest font-bold">Technology Sector</p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                <Activity className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm opacity-60">Demand Level</p>
                                <p className="text-xl font-bold capitalize text-blue-400">{industryData?.outlook || "Strong"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm opacity-60">Growth Rate</p>
                                <p className="text-xl font-bold text-green-400">+{industryData?.growth_rate || "12%"}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
