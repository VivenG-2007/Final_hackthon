"use client"
import { Sparkles, TrendingUp, CheckCircle, Search, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function ResumeAnalyserSection() {
    const router = useRouter();

    const handleResumeAnalyserClick = useCallback(() => {
        router.push("/resume-analyser");
    }, [router]);

    return (
        <section className="rounded-[2rem] p-8 glass card-shadow border border-white/10 hover:shadow-pink-500/5 transition-all duration-500" aria-labelledby="resume-analyser-heading">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-pink-500/20" aria-hidden="true">
                    <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 id="resume-analyser-heading" className="text-3xl font-black tracking-tight text-foreground">Resume Intelligence</h2>
            </div>

            <div className="space-y-8">
                <p className="text-foreground/70 font-medium leading-relaxed">
                    Optimize your resume with our AI-powered analyzer. Identify critical gaps and keyword opportunities to beat the ATS.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-1.5 rounded-lg bg-green-500/20" aria-hidden="true">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                            </div>
                            <span className="font-bold text-sm text-foreground/90 uppercase tracking-tight">ATS Score</span>
                        </div>
                        <p className="text-xs text-foreground/60 leading-relaxed font-medium">Measure compatibility with automated screening.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-1.5 rounded-lg bg-blue-500/20" aria-hidden="true">
                                <Search className="w-4 h-4 text-blue-400" />
                            </div>
                            <span className="font-bold text-sm text-foreground/90 uppercase tracking-tight">Keywords</span>
                        </div>
                        <p className="text-xs text-foreground/60 leading-relaxed font-medium">Extract high-impact industry terms for your role.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-1.5 rounded-lg bg-purple-500/20" aria-hidden="true">
                                <TrendingUp className="w-4 h-4 text-purple-400" />
                            </div>
                            <span className="font-bold text-sm text-foreground/90 uppercase tracking-tight">Improvements</span>
                        </div>
                        <p className="text-xs text-foreground/60 leading-relaxed font-medium">Get actionable tips to boost your presentation.</p>
                    </div>
                </div>

                <button
                    onClick={handleResumeAnalyserClick}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-purple-500/20 text-sm uppercase tracking-widest"
                >
                    <Sparkles className="w-5 h-5" aria-hidden="true" />
                    Launch Analyzer Pro
                </button>
            </div>
        </section>
    );
}
