'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard,
  Building2, 
  Users, 
  Box, 
  AlertTriangle, 
  Cpu, 
  ShieldCheck, 
  Menu, 
  X,
  Activity,
  Sparkles
} from 'lucide-react';
import { RoleSwitcher } from '../ui/RoleSwitcher';

export const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Grouped logically according to the core Problem Statement SIH26245 outcomes
  const primaryNav = [
    { name: 'Command Center', href: '/', icon: LayoutDashboard },
    { name: 'Centres', href: '/centres', icon: Building2 },
    { name: 'Attendance Audit', href: '/attendance', icon: Users },
    { name: 'Infrastructure (BOM)', href: '/infrastructure', icon: Box },
    { name: 'Discrepancy Alerts', href: '/alerts', icon: AlertTriangle },
  ];

  const technicalNav = [
    { name: 'Why SkillGuard (Uniqueness)', href: '/uniqueness', icon: Sparkles, highlight: true },
    { name: 'AI Pipeline & Benchmarks', href: '/pipeline', icon: Cpu },
    { name: 'Privacy Note', href: '/privacy', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#07172A] text-white border-b border-slate-800 shadow-lg">
      {/* Top Ministry Flag Ribbon */}
      <div className="bg-[#040D18] border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-1">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-300">Government of India</span>
            <span>•</span>
            <span>Ministry of Skill Development and Entrepreneurship (MSDE)</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live AI Edge Telemetry
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo & Scheme ID */}
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-lg shadow-sm group-hover:opacity-95 transition-opacity">
              <Activity className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  SkillGuard <span className="text-amber-400">AI</span>
                </span>
                <span className="text-[9px] uppercase font-bold bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/40">
                  SIH26245
                </span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-0.5 tracking-wide">
                Real-Time Centre Monitoring System
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600/30 text-amber-300 border border-blue-500/50 shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            <span className="h-4 w-px bg-slate-800 mx-1" />

            {technicalNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const isHighlight = item.highlight;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600/30 text-amber-300 border border-blue-500/50 shadow-sm'
                      : isHighlight
                      ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400/20 hover:text-amber-200'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isHighlight ? 'text-amber-400' : ''}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Role Persona Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <RoleSwitcher />

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A192F] border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          <p className="text-[10px] uppercase font-bold text-slate-500 px-3 py-1">Operational Views</p>
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <p className="text-[10px] uppercase font-bold text-slate-500 px-3 pt-3 py-1">Governance & Accuracy</p>
          {technicalNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
