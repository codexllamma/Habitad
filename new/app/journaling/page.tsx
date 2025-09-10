'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Save, Calendar, Heart } from 'lucide-react';

export default function Journaling() {
  const [journalEntry, setJournalEntry] = useState('');
  const [savedEntries, setSavedEntries] = useState<string[]>([]);

  const handleSave = () => {
    if (journalEntry.trim()) {
      setSavedEntries([...savedEntries, journalEntry]);
      setJournalEntry('');
    }
  };

  const journalPrompts = [
    "What are three things I'm grateful for today?",
    "What challenged me today and how did I overcome it?",
    "What did I learn about myself today?",
    "What made me smile or laugh today?",
    "How did I show kindness to myself or others?",
    "What are my hopes for tomorrow?",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-rose-700" />
            <h1 className="text-4xl font-bold text-rose-900">Daily Journal</h1>
          </div>
          <p className="text-rose-700 text-lg max-w-2xl mx-auto">
            Reflect on your day, capture your thoughts, and document your journey of growth and self-discovery.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Main Journal Area */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-rose-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-rose-900">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Today's Entry
                  </div>
                  <div className="text-sm font-normal text-rose-600">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder="You have had a long day. Let it all out. Reflect a little. 
                  It can be a plain raw journal, or feel free to select a template to help you get started."
                  className="w-full h-[60vh] p-6 text-rose-900 placeholder-rose-500 border-2 border-rose-300 rounded-xl resize-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all duration-300 bg-gray-50/80 backdrop-blur-sm text-lg leading-relaxed"
                  style={{ caretColor: '#e11d48' }}
                />
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-rose-600">
                    {journalEntry.length} characters
                  </div>
                  <Button onClick={handleSave} className="bg-rose-600 hover:bg-rose-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Entry
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Journal Prompts */}
            <Card className="bg-white/80 backdrop-blur-sm border-rose-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-rose-900">
                  <Heart className="w-5 h-5 text-pink-500" />
                  Writing Prompts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {journalPrompts.map((prompt, index) => (
                  <div
                    key={index}
                    onClick={() => setJournalEntry(prev => prev + '\n\n' + prompt + '\n')}
                    className="p-3 bg-rose-50/80 rounded-lg cursor-pointer hover:bg-rose-100/80 transition-colors border border-rose-200/50"
                  >
                    <p className="text-sm text-rose-800">{prompt}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Entries */}
            <Card className="bg-white/80 backdrop-blur-sm border-rose-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-rose-900">Recent Entries</CardTitle>
              </CardHeader>
              <CardContent>
                {savedEntries.length === 0 ? (
                  <p className="text-rose-600 text-sm italic">No entries yet. Start writing!</p>
                ) : (
                  <div className="space-y-3">
                    {savedEntries.slice(-3).map((entry, index) => (
                      <div key={index} className="p-3 bg-pink-50/80 rounded-lg border border-pink-200/50">
                        <p className="text-sm text-rose-800 line-clamp-3">{entry}</p>
                        <p className="text-xs text-rose-600 mt-2">Entry #{savedEntries.length - index}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Inspiration */}
        <Card className="mt-8 bg-gradient-to-r from-rose-100 to-pink-100 border-rose-300/50 max-w-2xl mx-auto">
          <CardContent className="text-center py-6">
            <BookOpen className="w-10 h-10 text-rose-600 mx-auto mb-3" />
            <p className="text-rose-800 italic mb-1">
              "Writing is the painting of the voice."
            </p>
            <p className="text-rose-600 text-sm">— Voltaire</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}