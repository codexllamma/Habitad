'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Play, Pause, RotateCcw, Clock } from 'lucide-react';

export default function Meditation() {
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const presetTimes = [
    { value: '5', label: '5 minutes' },
    { value: '10', label: '10 minutes' },
    { value: '15', label: '15 minutes' },
    { value: '20', label: '20 minutes' },
    { value: '30', label: '30 minutes' },
  ];

  const meditationTypes = [
    {
      title: 'Mindfulness Meditation',
      description: 'Focus on the present moment and observe your thoughts without judgment.',
      duration: '5-30 min',
      difficulty: 'Beginner'
    },
    {
      title: 'Breathing Exercise',
      description: 'Deep breathing techniques to calm your mind and reduce stress.',
      duration: '3-15 min',
      difficulty: 'Beginner'
    },
    {
      title: 'Body Scan',
      description: 'Progressive relaxation focusing on different parts of your body.',
      duration: '10-30 min',
      difficulty: 'Intermediate'
    },
    {
      title: 'Loving Kindness',
      description: 'Cultivate compassion and positive feelings towards yourself and others.',
      duration: '10-20 min',
      difficulty: 'Intermediate'
    }
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-cyan-200 pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-teal-700" />
            <h1 className="text-4xl font-bold text-teal-900">Meditation Center</h1>
          </div>
          <p className="text-teal-700 text-lg max-w-2xl mx-auto">
            Find inner peace and clarity through guided meditation. Choose your practice and duration.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Timer Section */}
          <Card className="bg-white/80 backdrop-blur-sm border-teal-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-teal-900">
                <Clock className="w-5 h-5" />
                Meditation Timer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-teal-700">Select Duration</label>
                <Select onValueChange={setSelectedTime}>
                  <SelectTrigger className="border-teal-300 focus:border-teal-500">
                    <SelectValue placeholder="Choose meditation time" />
                  </SelectTrigger>
                  <SelectContent>
                    {presetTimes.map((time) => (
                      <SelectItem key={time.value} value={time.value}>
                        {time.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTime && (
                <div className="text-center space-y-6">
                  <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-3xl font-bold">
                        {Math.floor(parseInt(selectedTime) * 60 / 60)}:{String(parseInt(selectedTime) * 60 % 60).padStart(2, '0')}
                      </div>
                      <div className="text-sm opacity-90">minutes</div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={togglePlay}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-6"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isPlaying ? 'Pause' : 'Start'}
                    </Button>
                    <Button
                      onClick={resetTimer}
                      variant="outline"
                      className="border-teal-300 text-teal-700 hover:bg-teal-50"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Meditation Types */}
          <Card className="bg-white/80 backdrop-blur-sm border-teal-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-teal-900">Meditation Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {meditationTypes.map((type, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-teal-50/80 border border-teal-200/50 hover:bg-teal-100/80 transition-colors cursor-pointer"
                >
                  <h3 className="font-semibold text-teal-900 mb-2">{type.title}</h3>
                  <p className="text-teal-700 text-sm mb-3">{type.description}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded">
                      {type.duration}
                    </span>
                    <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded">
                      {type.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Inspirational Quote */}
        <Card className="mt-8 bg-gradient-to-r from-teal-100 to-cyan-100 border-teal-300/50 max-w-2xl mx-auto">
          <CardContent className="text-center py-8">
            <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <p className="text-teal-800 italic text-lg mb-2">
              "Meditation is not evasion; it is a serene encounter with reality."
            </p>
            <p className="text-teal-600 text-sm">— Thich Nhat Hanh</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}