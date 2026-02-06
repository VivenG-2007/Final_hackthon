import React from 'react';
import { FileText, GraduationCap, TrendingUp, Briefcase, CheckCircle, Sparkles } from 'lucide-react';
import Background from '../../components/Background';

export const metadata = {
  title: 'Our Services | The Resume Hub',
  description: 'Explore our AI-powered career solutions.',
};

export default function ServicesPage() {
  const services = [
    {
      icon: <FileText className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: "AI Resume Evaluator",
      description: "Get comprehensive AI-powered analysis of your resume with actionable insights to improve your job application success.",
      color: "from-purple-500 to-pink-500",
      features: [
        "Instant resume analysis and scoring",
        "ATS compatibility checking",
        "Keyword optimization suggestions",
        "Format and structure recommendations",
        "Industry-specific feedback"
      ]
    },
    {
      icon: <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: "Personalized Training",
      description: "Access tailored learning paths designed to help you master the skills needed for your dream career.",
      color: "from-cyan-500 to-blue-500",
      features: [
        "Customized learning roadmaps",
        "Interactive course materials",
        "Skill gap analysis",
        "Progress tracking and milestones",
        "Expert-curated content"
      ]
    },
    {
      icon: <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: "Career Path Planner",
      description: "Visualize and plan your career trajectory with AI-powered insights tailored to your goals and market trends.",
      color: "from-orange-500 to-pink-500",
      features: [
        "Personalized career roadmaps",
        "Market trend analysis",
        "Salary expectations and growth",
        "Skills required for advancement",
        "Alternative career path suggestions"
      ]
    },
    {
      icon: <Briefcase className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: "Interview Preparation",
      description: "Practice and perfect your interview skills with AI-driven mock interviews and real-time feedback.",
      color: "from-yellow-500 to-orange-500",
      features: [
        "AI-powered mock interviews",
        "Real-time response feedback",
        "Common interview questions database",
        "Body language and communication tips",
        "Company-specific preparation"
      ]
    }
  ];

  return (
    <div className="min-h-screen relative transition-colors duration-300 bg-background text-foreground">
      <Background />

      {/* Hero Section - Mobile First */}
      <div className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
            <span className="text-xs sm:text-sm font-semibold text-purple-500">
              Our Services
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            AI-Powered Career Solutions
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto opacity-80">
            Comprehensive tools and services to help you succeed at every stage of your career journey
          </p>
        </div>
      </div>

      {/* Services Grid - Mobile First */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl p-6 sm:p-8 glass card-shadow hover:card-shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className={`inline-flex p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 bg-gradient-to-br ${service.color}`}>
                <div className="text-white">{service.icon}</div>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed opacity-80">
                {service.description}
              </p>

              {/* Features List */}
              <div className="pt-4 sm:pt-6 border-t border-white/10">
                <h4 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                  Key Features:
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-purple-500" />
                      <span className="text-xs sm:text-sm opacity-80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section - Mobile First */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg opacity-70">
            Get started in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              step: "01",
              title: "Sign Up",
              description: "Create your account and tell us about your career goals and aspirations."
            },
            {
              step: "02",
              title: "Choose Services",
              description: "Select the services that match your needs and start your journey."
            },
            {
              step: "03",
              title: "Achieve Goals",
              description: "Follow personalized guidance and watch your career transform."
            }
          ].map((step, index) => (
            <div
              key={index}
              className="text-center p-6 sm:p-8 rounded-xl sm:rounded-2xl glass card-shadow"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                {step.step}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm opacity-70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section - Mobile First */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 z-10">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center card-shadow-purple"
          style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))' }}>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-80">
              Choose the service that fits your needs and start advancing your career today
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}