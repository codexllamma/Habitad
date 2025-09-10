'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Target, CheckSquare, Brain, BookOpen, Info } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Planner', href: '/planner', icon: Target },
  { name: 'Habits', href: '/habits', icon: CheckSquare },
  { name: 'Meditation', href: '/meditation', icon: Brain },
  { name: 'Journaling', href: '/journaling', icon: BookOpen },
  { name: 'About', href: '/about', icon: Info },
];

const getThemeClasses = (pathname: string) => {
  switch (pathname) {
    case '/':
      return 'bg-blue-900/95 border-blue-700/50';
    case '/dashboard':
      return 'bg-amber-50/95 border-amber-200/50';
    case '/planner':
      return 'bg-purple-100/95 border-purple-200/50';
    case '/habits':
      return 'bg-green-100/95 border-green-200/50';
    case '/meditation':
      return 'bg-teal-100/95 border-teal-200/50';
    case '/journaling':
      return 'bg-rose-50/95 border-rose-200/50';
    default:
      return 'bg-slate-100/95 border-slate-200/50';
  }
};

const getTextClasses = (pathname: string) => {
  switch (pathname) {
    case '/':
      return 'text-white';
    case '/dashboard':
      return 'text-amber-800';
    case '/planner':
      return 'text-purple-800';
    case '/habits':
      return 'text-green-800';
    case '/meditation':
      return 'text-teal-800';
    case '/journaling':
      return 'text-rose-800';
    default:
      return 'text-slate-800';
  }
};

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md border-b",
        getThemeClasses(pathname),
        isHovered ? "py-4" : "py-2"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className={cn(
              "font-bold text-xl transition-all duration-300",
              getTextClasses(pathname),
              isHovered ? "text-2xl" : "text-xl"
            )}
          >
            Habitad
          </Link>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300",
                    getTextClasses(pathname),
                    isActive && "bg-white/20",
                    !isActive && "hover:bg-white/10 hover:scale-105"
                  )}
                >
                  <Icon size={isHovered ? 20 : 16} className="transition-all duration-300" />
                  <span 
                    className={cn(
                      "transition-all duration-500",
                      isHovered ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
                    )}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}