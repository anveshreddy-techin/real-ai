'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Video, Users, Box, AlertTriangle, Cpu, Lock } from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'National Command', href: '/', icon: ShieldCheck },
    { name: 'Training Centres', href: '/centres', icon: Video },
    { name: 'Attendance Audit', href: '/attendance', icon: Users },
    { name: 'Infrastructure', href: '/infrastructure', icon: Box },
    { name: 'Discrepancy Alerts', href: '/alerts', icon: AlertTriangle },
    { name: 'AI Pipeline & Edge', href: '/pipeline', icon: Cpu },
    { name: 'Privacy Architecture', href: '/privacy', icon: Lock },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A2540] text-white border-b border-slate-700/60 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-500/20 border border-amber-400 p-2 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight">SkillGuard AI</span>
                <span className="text-[10px] uppercase font-semibold bg-blue-900/80 text-blue-200 px-2 py-0.5 rounded border border-blue-700">SIH26245</span>
              </div>
              <p className="text-xs text-slate-300">Ministry of Skill Development & Entrepreneurship</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-800/80 text-amber-300 border border-blue-600'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-950 text-emerald-300 border border-emerald-700">
              <span className="w-2 h-2 mr-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live MSDE Telemetry
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
