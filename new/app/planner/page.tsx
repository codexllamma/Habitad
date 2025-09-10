'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Target, Plus } from 'lucide-react';

export default function Planner() {
  const [goals, setGoals] = useState('');

  const handleSave = () => {
    // Save functionality to be implemented
    console.log('Saving goals:', goals);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="w-8 h-8 text-purple-700" />
            <h1 className="text-4xl font-bold text-purple-900">Micro Goal Planner</h1>
          </div>
          <p className="text-purple-700 text-lg max-w-2xl mx-auto">
            Transform your big dreams into actionable steps. Break down your goals and create a clear path to success.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-200/50 p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-purple-900 flex items-center gap-2">
                <Plus className="w-6 h-6" />
                Your Goals & Action Plans
              </h2>
              <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Progress
              </Button>
            </div>
            
            <textarea
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Got a goal to plan in mind. Enter a simple prompt and watch your goal
              be broken down into micro-goals that you can take action on starting now."
              className="w-full h-[70vh] p-6 text-purple-900 placeholder-purple-500 border-2 border-purple-300 rounded-xl resize-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-purple-50/80 backdrop-blur-sm text-lg leading-relaxed"
              style={{ caretColor: '#7c3aed' }}
            />
            
            <div className="mt-6 text-sm text-purple-600 text-center">
              💡 Tip: Break large goals into weekly or daily micro-goals for better success rates
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}