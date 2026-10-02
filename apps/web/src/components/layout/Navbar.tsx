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
  Sparkles,
  Camera,
  Database
} from 'lucide-react';
import { RoleSwitcher } from '../ui/RoleSwitcher';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { useLanguage } from '../ui/LanguageContext';

export const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const primaryNav = [
    { key: 'command_center', defaultName: 'Command Center', href: '/', icon: LayoutDashboard },
    { key: 'live_studio', defaultName: 'Live Video Studio', href: '/studio', icon: Camera },
    { key: 'centres', defaultName: 'Centres', href: '/centres', icon: Building2 },
    { key: 'attendance_audit', defaultName: 'Attendance Audit', href: '/attendance', icon: Users },
    { key: 'infra_bom', defaultName: 'Infrastructure (BOM)', href: '/infrastructure', icon: Box },
    { key: 'alerts', defaultName: 'Discrepancy Alerts', href: '/alerts', icon: AlertTriangle },
  ];

  const technicalNav = [
    { key: 'why_skillguard', defaultName: 'Why SkillGuard (Uniqueness)', href: '/uniqueness', icon: Sparkles, highlight: true },
    { key: 'datasets_hub', defaultName: 'Real Datasets Hub', href: '/datasets', icon: Database },
    { key: 'pipeline_benchmarks', defaultName: 'AI Pipeline & Benchmarks', href: '/pipeline', icon: Cpu },
    { key: 'privacy_note', defaultName: 'Privacy Note', href: '/privacy', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#07172A] text-white border-b border-slate-800 shadow-lg">
      {/* Top Ministry Flag Ribbon */}
      <div className="bg-[#040D18] border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-1">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-300">Government of India</span>
            <span>•</span>
            <span className="hidden sm:inline">Ministry of Skill Development and Entrepreneurship (MSDE)</span>
            <span className="sm:hidden">MSDE</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {t('live_telemetry')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Logo & Scheme ID */}
          <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 group flex-shrink-0">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-lg shadow-sm group-hover:opacity-95 transition-opacity">
              <Activity className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  SkillGuard <span className="text-amber-400">AI</span>
                </span>
                <span className="text-[9px] uppercase font-bold bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/40">
                  SIH26245
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-400 -mt-0.5 tracking-wide line-clamp-1">
                {t('app_subtitle')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const name = t(item.key) || item.defaultName;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600/30 text-amber-300 border border-blue-500/50 shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{name}</span>
                </Link>
              );
            })}

            <span className="h-4 w-px bg-slate-800 mx-1" />

            {technicalNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const isHighlight = item.highlight;
              const name = t(item.key) || item.defaultName;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600/30 text-amber-300 border border-blue-500/50 shadow-sm'
                      : isHighlight
                      ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400/20 hover:text-amber-200'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isHighlight ? 'text-amber-400' : ''}`} />
                  <span>{name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Language Switcher, Role Switcher, Mobile Button */}
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <div className="hidden md:block">
              <RoleSwitcher />
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A192F] border-b border-slate-800 px-4 pt-3 pb-5 space-y-3">
          {/* Mobile Role Switcher */}
          <div className="md:hidden pb-2 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-medium">Active Inspector Role:</span>
            <RoleSwitcher />
          </div>

          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-slate-500 px-3 py-1">Operational Views</p>
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const name = t(item.key) || item.defaultName;
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
                  <span>{name}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-800">
            <p className="text-[10px] uppercase font-bold text-slate-500 px-3 py-1">Governance & Accuracy</p>
            {technicalNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const name = t(item.key) || item.defaultName;
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
                  <span>{name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
