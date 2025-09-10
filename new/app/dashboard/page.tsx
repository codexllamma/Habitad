'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Target, Flame, Bell, Coffee } from 'lucide-react';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const topHabits = [
    { name: 'Morning Coffee', streak: 28, icon: Coffee },
    { name: 'Daily Exercise', streak: 14, icon: Target },
    { name: 'Reading', streak: 21, icon: Clock },
  ];

  const upcomingReminders = [
    { title: 'Focus Session', time: '2:00 PM', type: 'focus' },
    { title: 'Meditation', time: '5:00 PM', type: 'meditation' },
    { title: 'Journal Entry', time: '8:00 PM', type: 'journal' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Good morning! ☀️</h1>
          <p className="text-amber-700 text-lg">{currentTime}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Top Habit Streaks */}
          <Card className="bg-white/80 backdrop-blur-sm border-amber-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900">
                <Flame className="w-5 h-5 text-orange-500" />
                Top Habit Streaks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topHabits.map((habit, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <habit.icon className="w-5 h-5 text-amber-700" />
                    <span className="font-medium text-amber-900">{habit.name}</span>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {habit.streak} days
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notifications & Reminders */}
          <Card className="bg-white/80 backdrop-blur-sm border-amber-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900">
                <Bell className="w-5 h-5 text-amber-600" />
                Today's Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingReminders.map((reminder, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <p className="font-medium text-amber-900">{reminder.title}</p>
                    <p className="text-sm text-amber-700">{reminder.time}</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                    Set
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-white/80 backdrop-blur-sm border-amber-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900">
                <Calendar className="w-5 h-5 text-amber-600" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg">
                <div className="text-3xl font-bold text-amber-900">7</div>
                <div className="text-sm text-amber-700">Active Goals</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg">
                <div className="text-3xl font-bold text-amber-900">85%</div>
                <div className="text-sm text-amber-700">Weekly Progress</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg">
                <div className="text-3xl font-bold text-amber-900">12</div>
                <div className="text-sm text-amber-700">Meditation Sessions</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coffee Break Inspiration */}
        <Card className="mt-8 bg-gradient-to-r from-amber-100 to-orange-100 border-amber-300/50">
          <CardContent className="text-center py-8">
            <Coffee className="w-12 h-12 text-amber-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-amber-900 mb-2">Coffee Break Wisdom</h3>
            <p className="text-amber-800 italic max-w-md mx-auto">
              "Success is the sum of small efforts, repeated day in and day out." - Robert Collier
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}