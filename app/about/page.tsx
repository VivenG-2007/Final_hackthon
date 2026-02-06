"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { Target, Users, Award, Lightbulb, Heart, Rocket } from 'lucide-react';
import Background from '../../components/Background';

export default function AboutPage() {
  const [theme, setTheme] = useState('dark');

  // Sync with global theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    const handleStorage = () => {
      const newTheme = localStorage.getItem('theme') || 'dark';
      setTheme(newTheme);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const values = useMemo(() => [
    {
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Mission-Driven",
      description: "Empowering professionals to unlock their full potential through AI-powered career guidance.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Community First",
      description: "Building a supportive ecosystem where career growth is collaborative and accessible to all.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Excellence",
      description: "Delivering world-class tools and resources backed by cutting-edge AI technology.",
      color: "from-orange-500 to-pink-500"
    },
    {
      icon: <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Innovation",
      description: "Continuously evolving our platform to meet the changing demands of the modern workforce.",
      color: "from-yellow-500 to-orange-500"
    }
  ], []);

  return (
    <div className="min-h-screen relative transition-colors duration-300">
      <Background />

      {/* Hero Section - Mobile First */}
      <div className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
            <span className="text-xs sm:text-sm font-semibold text-purple-500">
              About Us
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Transforming Careers with AI
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto opacity-80">
            We believe everyone deserves access to intelligent career guidance.
            Our mission is to democratize career success through cutting-edge AI technology.
          </p>
        </div>
      </div>

      {/* Our Story Section - Mobile First */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 glass card-shadow">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
            <h2 className="text-2xl sm:text-3xl font-bold">Our Story</h2>
          </div>
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg leading-relaxed opacity-80">
            <p>
              Intelligent Career Agent was born from a simple observation:
              career guidance was either too expensive, too generic, or simply unavailable for most professionals.
            </p>
            <p>
              We assembled a team of AI researchers, career coaches, and technologists to build a platform
              that combines the best of human expertise with the power of artificial intelligence.
            </p>
            <p>
              Today, we're proud to serve professionals worldwide, helping them navigate career
              transitions, optimize their resumes, and achieve their professional goals.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section - Mobile First */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Our Core Values
          </h2>
          <p className="text-base sm:text-lg opacity-70">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl p-6 sm:p-8 glass card-shadow hover:card-shadow-lg transition-all duration-300"
            >
              <div className={`inline-flex p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 bg-gradient-to-br ${value.color}`}>
                <div className="text-white">{value.icon}</div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                {value.title}
              </h3>

              <p className="text-sm sm:text-base leading-relaxed opacity-80">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section - Mobile First */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center card-shadow-purple"
          style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))' }}>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Join Our Journey
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-80">
              Be part of the career revolution. Start transforming your professional life today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}