'use client';

import React from 'react';
import Link from 'next/link';
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Brain, Rocket, Shield, Star, CheckCircle2, ArrowRight, Sparkles, Zap, MessageSquare, Briefcase } from 'lucide-react';
import Background from '../components/Background';

export default function HomePage() {
  const { isLoaded, isSignedIn } = useUser();

  if (isLoaded && isSignedIn) {
    redirect("/dashboard");
  }

  const features = [
    {
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      title: "AI Resume Analysis",
      desc: "Get instant, professional feedback on your resume with our advanced AI scanner."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-pink-500" />,
      title: "Mock Interviews",
      desc: "Practice with our real-time AI interviewer that gives you instant scoring and feedback."
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      title: "ATS Optimization",
      desc: "Ensure your resume beats the bots with our built-in ATS compatibility auditor."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-foreground/80">The Future of Career Growth</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Land Your Dream Job <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Powered by AI.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/70 mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Master your interviews, optimize your resume, and get personalized career guidance with the world's most advanced AI career assistant.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link href="/sign-up" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-black shadow-xl shadow-purple-500/20 hover:scale-105 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-2 group">
              Get Started for Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-foreground rounded-2xl font-bold border border-white/10 transition-all text-sm uppercase tracking-widest backdrop-blur-md flex items-center justify-center gap-2">
              Learn How it Works
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-6 bg-black/5 dark:bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="glass p-8 rounded-[2rem] border border-white/10 hover:border-white/20 transition-all hover:-translate-y-2 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-[3rem] p-12 border border-white/10 flex flex-wrap justify-center gap-12 md:gap-24">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">10k+</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">Resumes Optimized</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">95%</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">24/7</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">AI Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Trust Section */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-purple-500" />
            <span className="font-black tracking-wider uppercase text-xs">Innovibe Career Suite</span>
          </div>
          <p className="text-foreground/60 text-xs tracking-widest font-bold">© 2026 THE RESUME HUB. EMPOWERING CAREERS WORLDWIDE.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-foreground/70 hover:text-purple-500 transition-colors text-[10px] font-bold uppercase tracking-widest">Privacy</Link>
            <Link href="/terms" className="text-foreground/70 hover:text-purple-500 transition-colors text-[10px] font-bold uppercase tracking-widest">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}