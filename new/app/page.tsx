'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/AuthModal';
import { Target, CheckSquare, Brain, BookOpen } from 'lucide-react';

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const features = [
    {
      title: "Micro Goal Planner",
      description: "Break down your big dreams into manageable, actionable steps",
      icon: Target,
      href: "/planner",
      gradient: "from-purple-400 to-purple-600"
    },
    {
      title: "Habit Tracker",
      description: "Build lasting habits with our intuitive tracking system",
      icon: CheckSquare,
      href: "/habits",
      gradient: "from-green-400 to-green-600"
    },
    {
      title: "Meditation Center",
      description: "Find your inner peace with guided meditation sessions",
      icon: Brain,
      href: "/meditation",
      gradient: "from-teal-400 to-teal-600"
    },
    {
      title: "Daily Journal",
      description: "Reflect, grow, and document your journey to success",
      icon: BookOpen,
      href: "/journaling",
      gradient: "from-pink-400 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Background lights */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent"> Productivity</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Unlock your potential with our comprehensive suite of productivity tools. 
            Plan your goals, track your habits, meditate mindfully, and journal your journey to success.
          </p>
          <Button 
            onClick={() => setShowAuthModal(true)}
            className="bg-white text-blue-900 hover:bg-blue-50 text-lg px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Start Your Journey
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => window.location.href = feature.href}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 h-full border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:bg-white/15">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-blue-100 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Why Choose Habitad?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Integrated Experience</h3>
              <p className="text-blue-200">All your productivity tools in one seamless platform</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Science-Backed Methods</h3>
              <p className="text-blue-200">Built on proven psychological principles for lasting change</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Beautiful Design</h3>
              <p className="text-blue-200">Elegant interface that makes productivity enjoyable</p>
            </div>
          </div>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}