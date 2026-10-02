'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Camera, 
  Users, 
  AlertTriangle, 
  Cpu,
  Database
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Command', hindi: 'कमांड', href: '/', icon: LayoutDashboard },
    { name: 'Studio', hindi: 'कैमरा', href: '/studio', icon: Camera },
    { name: 'Attendance', hindi: 'हाज़िरी', href: '/attendance', icon: Users },
    { name: 'Alerts', hindi: 'नोटिस', href: '/alerts', icon: AlertTriangle },
    { name: 'AI Pipeline', hindi: 'मॉडल', href: '/pipeline', icon: Cpu },
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation" 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#07172A]/95 backdrop-blur-md border-t border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] px-1 py-1.5"
    >
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
                isActive
                  ? 'bg-blue-600/30 text-amber-300 border border-blue-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                {item.href === '/alerts' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                )}
              </div>
              <span className="text-[10px] font-bold tracking-tight mt-0.5 leading-tight">{item.name}</span>
              <span className="text-[8px] text-slate-500 leading-none">{item.hindi}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
