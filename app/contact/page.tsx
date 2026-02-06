"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Code, Database } from 'lucide-react';
import Background from '../../components/Background';

export default function ContactPage() {
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

  const developers = useMemo(() => [
    { name: "Viven Gorantla", role: "Frontend Developer", icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />, color: "from-purple-500 to-pink-500" },
    { name: "Aarav Singh", role: "Frontend Developer", icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />, color: "from-cyan-500 to-blue-500" },
    { name: "Dheer", role: "Backend Developer", icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />, color: "from-orange-500 to-pink-500" },
    { name: "Emmanuel", role: "Backend Developer", icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />, color: "from-yellow-500 to-orange-500" },
    { name: "Tharun", role: "Backend Developer", icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />, color: "from-pink-500 to-purple-500" }
  ], []);

  return (
    <div className="min-h-screen relative transition-colors duration-300">
      <Background />

      {/* Hero Section - Mobile First */}
      <div className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
            <span className="text-xs sm:text-sm font-semibold text-purple-500">
              Get In Touch
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Contact Us
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto opacity-80">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Info Cards - Mobile First */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="p-5 sm:p-6 rounded-xl glass card-shadow text-center">
            <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 mb-3 sm:mb-4">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Email</h3>
            <p className="text-xs sm:text-sm opacity-70">contact@careeragent.com</p>
          </div>

          <div className="p-5 sm:p-6 rounded-xl glass card-shadow text-center">
            <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 mb-3 sm:mb-4">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Phone</h3>
            <p className="text-xs sm:text-sm opacity-70">+91 9922133817</p>
          </div>

          <div className="p-5 sm:p-6 rounded-xl glass card-shadow text-center">
            <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 mb-3 sm:mb-4">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Location</h3>
            <p className="text-xs sm:text-sm opacity-70">Remote Team</p>
          </div>
        </div>
      </div>

      {/* Contact Form - Mobile First */}
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 glass card-shadow">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send Us a Message</h2>
          <form className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Your Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 glass card-shadow text-sm sm:text-base input-glass"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 glass card-shadow text-sm sm:text-base input-glass"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 glass card-shadow text-sm sm:text-base input-glass"
                placeholder="Tell us how we can help you..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 card-shadow-lg hover:card-shadow-purple flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm sm:text-base"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Development Team - Mobile First */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Our Development Team
          </h2>
          <p className="text-base sm:text-lg opacity-70">
            Meet the people behind the platform
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 rounded-xl glass card-shadow text-center hover:card-shadow-lg transition-all duration-300"
            >
              <div className={`inline-flex p-3 sm:p-4 rounded-full bg-gradient-to-br ${dev.color} mb-3 sm:mb-4`}>
                <div className="text-white">{dev.icon}</div>
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1">
                {dev.name}
              </h3>
              <p className="text-xs sm:text-sm opacity-70">
                {dev.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}