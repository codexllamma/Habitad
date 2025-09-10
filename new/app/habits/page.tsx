'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Flame, Star } from 'lucide-react';

export default function Habits() {
  const [habitStates, setHabitStates] = useState<{[key: number]: boolean}>({});

  const habits = [
    { id: 1, name: 'Drink 8 glasses of water', streak: 12, category: 'Health', priority: 'high' },
    { id: 2, name: 'Read for 30 minutes', streak: 8, category: 'Learning', priority: 'high' },
    { id: 3, name: 'Exercise for 45 minutes', streak: 15, category: 'Fitness', priority: 'high' },
    { id: 4, name: 'Meditate for 10 minutes', streak: 22, category: 'Wellness', priority: 'medium' },
    { id: 5, name: 'Write in journal', streak: 6, category: 'Reflection', priority: 'medium' },
    { id: 6, name: 'Practice gratitude', streak: 18, category: 'Mindfulness', priority: 'medium' },
    { id: 7, name: 'Learn a new word', streak: 4, category: 'Learning', priority: 'low' },
    { id: 8, name: 'Take vitamins', streak: 28, category: 'Health', priority: 'low' },
  ];

  const toggleHabit = (habitId: number) => {
    setHabitStates(prev => ({
      ...prev,
      [habitId]: !prev[habitId]
    }));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Health': 'bg-green-100 text-green-800',
      'Learning': 'bg-blue-100 text-blue-800',
      'Fitness': 'bg-red-100 text-red-800',
      'Wellness': 'bg-purple-100 text-purple-800',
      'Reflection': 'bg-orange-100 text-orange-800',
      'Mindfulness': 'bg-teal-100 text-teal-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Star className="w-4 h-4 text-yellow-500 fill-current" />;
      case 'medium': return <Star className="w-4 h-4 text-yellow-400" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-200 pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare className="w-8 h-8 text-green-700" />
            <h1 className="text-4xl font-bold text-green-900">Habit Tracker</h1>
          </div>
          <p className="text-green-700 text-lg max-w-2xl mx-auto">
            Build consistency one day at a time. Track your daily habits and watch your streaks grow.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            {habits.map((habit, index) => (
              <Card
                key={habit.id}
                className={`bg-white/80 backdrop-blur-sm border-green-200/50 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                  habitStates[habit.id] ? 'ring-2 ring-green-400 bg-green-50/80' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        checked={habitStates[habit.id] || false}
                        onCheckedChange={() => toggleHabit(habit.id)}
                        className="w-6 h-6 border-2 border-green-400 data-[state=checked]:bg-green-500"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {getPriorityIcon(habit.priority)}
                          <h3 className={`font-semibold text-lg transition-all duration-300 ${
                            habitStates[habit.id] ? 'text-green-700 line-through' : 'text-green-900'
                          }`}>
                            {habit.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getCategoryColor(habit.category)}>
                            {habit.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-orange-600 mb-1">
                          <Flame className="w-4 h-4" />
                          <span className="font-bold text-lg">{habit.streak}</span>
                        </div>
                        <div className="text-xs text-green-700">days</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-300/50">
              <CardContent className="py-6">
                <h3 className="text-xl font-semibold text-green-900 mb-2">
                  Keep up the great work!
                </h3>
                <p className="text-green-700">
                  You've completed {Object.values(habitStates).filter(Boolean).length} out of {habits.length} habits today.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}