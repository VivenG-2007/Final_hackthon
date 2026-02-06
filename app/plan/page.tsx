"use client"
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  Compass, Map, Target, Flag, ArrowRight, CheckCircle,
  BarChart, Calendar, Briefcase, BookOpen, User,
  ChevronRight, Loader2
} from 'lucide-react';
import Background from '../../components/Background';
import Link from 'next/link';

import { fetchWithFallback, MOCK_DATA } from '../lib/api-config';

export default function CareerPlan() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);

  // Form State
  const [currentRole, setCurrentRole] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [skills, setSkills] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    const userId = user?.username || user?.id || 'user_demo';
    const skillList = skills.split(',').map((s: string) => s.trim()).filter(Boolean);

    try {
      // 1. First, analyze the Skill Gap
      const gapData = await fetchWithFallback(
        '/api/jobs/market/skill-gap',
        {
          method: 'POST',
          body: JSON.stringify({
            skills: skillList,
            target_role: targetRole
          })
        },
        MOCK_DATA.jobs.market.skill_gap
      );
      setAnalysis(gapData);

      // 2. Then, generate the roadmap based on identified gaps
      const data = await fetchWithFallback(
        '/api/webhook/learning/generate',
        {
          method: 'POST',
          body: JSON.stringify({
            user_id: userId,
            data: {
              gaps: gapData.skills_missing || skillList,
              target_role: targetRole
            }
          })
        },
        MOCK_DATA.learning.generate
      );

      // Map API response (skills based) to UI expected format (Phases)
      const apiPlan = (data as any).plan || [];
      const mappedRoadmap = apiPlan.map((item: any, index: number) => ({
        phase: index + 1,
        title: `Master ${item.skill}`,
        duration: "1 Month",
        description: `Focus on acquiring high-priority skills: ${item.skill}.`,
        status: index === 0 ? "in-progress" : "pending",
        items: item.resources?.map((r: any) => `${r.type === 'course' ? 'Take' : 'Practice'} ${r.title} (${r.platform})`) || ["Study documentation", "Build a small project"]
      }));

      setGeneratedPlan({
        currentRole,
        targetRole,
        timeframe: `${mappedRoadmap.length || 6} months`,
        roadmap: mappedRoadmap.length > 0 ? mappedRoadmap : [
          {
            phase: 1,
            title: "Skill Gaps Analysis",
            duration: "Week 1",
            description: "Analyzing your current skills against the target role.",
            status: "done",
            items: ["Identify missing skills", "Set learning goals"]
          },
          ...((MOCK_DATA.learning.generate.plan as any[]).map((p, i) => ({
            phase: i + 2,
            title: `Learn ${p.skill}`,
            duration: "2 Weeks",
            description: "Intensive study and practice.",
            status: "pending",
            items: p.resources?.map((r: any) => r.title) || []
          })))
        ]
      });

    } catch (e) {
      console.error("Failed to generate plan", e);
      setGeneratedPlan({
        currentRole,
        targetRole,
        timeframe: "6 months",
        roadmap: [
          {
            phase: 1,
            title: "Foundation",
            duration: "Month 1",
            description: "Strengthen core concepts.",
            status: "pending",
            items: ["Review Basics", "Advanced Topics"]
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen relative transition-colors duration-300">
      <Background />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Compass className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-semibold text-orange-500">Career GPS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Career Path Planner
          </h1>
          <p className="opacity-70 max-w-2xl mx-auto text-lg">
            Visualize your journey from where you are to where you want to be with AI-driven roadmaps.
          </p>
        </div>

        {/* Input Form */}
        {!generatedPlan ? (
          <div className="max-w-3xl mx-auto glass card-shadow rounded-2xl p-8 md:p-12 animate-in slide-in-from-bottom-4">
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2 opacity-80">Current Role</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5 opacity-50" />
                    <input
                      value={currentRole}
                      onChange={(e) => setCurrentRole(e.target.value)}
                      placeholder="e.g. Junior Developer"
                      className="w-full pl-12 pr-4 py-3 rounded-xl input-glass focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-2 opacity-80">Target Role</label>
                  <div className="relative">
                    <Target className="absolute left-4 top-3.5 w-5 h-5 opacity-50" />
                    <input
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      placeholder="e.g. CTO"
                      className="w-full pl-12 pr-4 py-3 rounded-xl input-glass focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2 opacity-80">Current Skills (Comma separated)</label>
                <textarea
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. HTML, CSS, JavaScript, Basic React..."
                  className="w-full px-4 py-3 rounded-xl input-glass focus:ring-2 focus:ring-orange-500 outline-none transition-all h-32 resize-none"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !currentRole || !targetRole}
                className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Building Roadmap...
                  </>
                ) : (
                  <>
                    <Map className="w-5 h-5" />
                    Generate My Plan
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Roadmap View */
          <div className="animate-in fade-in duration-500">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Sidebar Summary */}
              <div className="lg:w-1/3 space-y-6">
                <div className="glass card-shadow rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full -mr-8 -mt-8" />

                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Flag className="w-5 h-5 text-orange-500" />
                    Trip Summary
                  </h3>

                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-12 bg-gray-200 rounded-full dark:bg-gray-700 relative">
                        <div className="absolute top-0 w-full h-1/2 bg-green-500 rounded-full" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <p className="text-xs opacity-50 uppercase tracking-widest">Start</p>
                          <p className="font-bold">{currentRole}</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-50 uppercase tracking-widest">Goal</p>
                          <p className="font-bold text-orange-500">{targetRole}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200/20 dark:border-white/10 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs opacity-50">Estimated Time</p>
                        <p className="font-bold text-lg">{generatedPlan?.timeframe}</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-50">Total Milestones</p>
                        <p className="font-bold text-lg">{generatedPlan?.roadmap?.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setGeneratedPlan(null)}
                  className="w-full py-4 rounded-xl font-bold border border-orange-500/30 text-orange-500 hover:bg-orange-500/10 transition-all"
                >
                  Create New Plan
                </button>
              </div>

              {/* Timeline */}
              <div className="flex-1 space-y-6">
                {generatedPlan?.roadmap?.map((phase: any, i: number) => (
                  <div key={i} className="glass card-shadow rounded-2xl p-8 relative group hover:border-orange-500/30 transition-colors">
                    <div className="absolute top-8 left-0 w-1 h-16 bg-orange-500 rounded-r-full" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pl-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-orange-500 mb-1 block">Phase {phase.phase} • {phase.duration}</span>
                        <h3 className="text-2xl font-bold">{phase.title}</h3>
                      </div>
                      <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${phase.status === 'in-progress' ? 'bg-orange-500/10 text-orange-500' : 'bg-gray-500/10 text-gray-500'}`}>
                        {phase.status}
                      </div>
                    </div>

                    <p className="opacity-70 mb-6 pl-4 leading-relaxed max-w-2xl">{phase.description}</p>

                    <div className="pl-4 space-y-3">
                      {phase.items.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-black/5 hover:bg-black/10 transition-colors">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${phase.status === 'in-progress' ? 'border-orange-500' : 'border-gray-400'}`}>
                            {phase.status === 'in-progress' && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                          </div>
                          <span className="font-medium opacity-80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}