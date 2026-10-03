'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  Database,
  ChevronDown,
  Layers,
  Shield,
  ArrowRight
} from 'lucide-react';
import { RoleSwitcher } from '../ui/RoleSwitcher';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { useLanguage } from '../ui/LanguageContext';

export const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Primary Operational Navigation (Core Workflows)
  const primaryNav = [
    { key: 'command_center', defaultName: 'Command Center', href: '/', icon: LayoutDashboard },
    { key: 'dashboard', defaultName: 'Dashboard', href: '/dashboard', icon: Activity },
    { key: 'live_studio', defaultName: 'Live Studio', href: '/studio', icon: Camera },
    { key: 'attendance_audit', defaultName: 'Attendance Audit', href: '/attendance', icon: Users },
    { key: 'infra_bom', defaultName: 'Infrastructure (BOM)', href: '/infrastructure', icon: Box },
    { key: 'alerts', defaultName: 'Alerts', href: '/alerts', icon: AlertTriangle, badge: '2' },
  ];

  // Secondary / Governance & Accuracy Hub
  const secondaryNav = [
    { key: 'evidence_review', defaultName: 'Evidence Review', desc: '48 items AI & human validation', href: '/evidence', icon: Layers },
    { key: 'corrective_queue', defaultName: 'Corrective Action Queue', desc: '12 remediation tickets', href: '/review-queue', icon: AlertTriangle },
    { key: 'centres', defaultName: 'Empaneled Centres (28)', desc: '28 Active institution feeds', href: '/centres', icon: Building2 },
    { key: 'datasets_hub', defaultName: 'Real Datasets Hub', desc: 'AEBAS logs & BOM specs', href: '/datasets', icon: Database },
    { key: 'pipeline_benchmarks', defaultName: 'AI Pipeline & Benchmarks', desc: '1,200 Benchmark frames', href: '/pipeline', icon: Cpu },
    { key: 'why_skillguard', defaultName: 'Why Unique?', desc: 'Fund leakage calculator', href: '/uniqueness', icon: Sparkles, highlight: true },
    { key: 'privacy_note', defaultName: 'Privacy Note (DPDP)', desc: 'Section 6/8/9 compliance', href: '/privacy', icon: ShieldCheck },
    { key: 'sign_in', defaultName: 'Portal Sign In', desc: 'Demo roles & credential login', href: '/login', icon: Users },
  ];

  const isSecondaryActive = secondaryNav.some(item => pathname === item.href);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#07172A] text-white border-b border-slate-800 shadow-xl">
      {/* 1. Top Ministry Utility Ribbon */}
      <div className="bg-[#040D18] border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="font-semibold text-slate-200">Government of India</span>
            <span>•</span>
            <span className="hidden sm:inline">Ministry of Skill Development & Entrepreneurship (MSDE)</span>
            <span className="sm:hidden">MSDE</span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-amber-300/90 font-mono text-[10px]">SIH 26245 AI Monitoring</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-1.5 text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{t('live_telemetry')}</span>
            </div>

            {/* Quick Switchers in Top Ribbon on Desktop */}
            <div className="flex items-center space-x-2">
              <LanguageSwitcher compact />
              <div className="hidden lg:block">
                <RoleSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Brand & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo & Scheme ID */}
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-xl shadow-md group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  SkillGuard <span className="text-amber-400">AI</span>
                </span>
                <span className="text-[9px] uppercase font-bold bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/40 font-mono">
                  SIH26245
                </span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-0.5 tracking-wide line-clamp-1">
                Real-Time Centre Monitoring System
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const name = t(item.key) || item.defaultName;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-blue-600/30 text-amber-300 border border-blue-500/50 shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{name}</span>
                  {item.badge && (
                    <span className="w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* "More Tools" Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSecondaryActive || moreDropdownOpen
                    ? 'bg-slate-800 text-amber-300 border border-slate-700'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
                aria-expanded={moreDropdownOpen}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>More Modules</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${moreDropdownOpen ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#0B1E36] border border-slate-700/80 rounded-2xl shadow-2xl p-2 z-50 space-y-1">
                  <div className="px-3 py-1.5 border-b border-slate-700/60 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Governance & Telemetry
                  </div>
                  {secondaryNav.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    const name = t(item.key) || item.defaultName;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreDropdownOpen(false)}
                        className={`flex items-start space-x-2.5 p-2 rounded-xl text-xs transition-colors ${
                          isActive
                            ? 'bg-blue-600/30 text-amber-300 border border-blue-500/40'
                            : item.highlight
                            ? 'hover:bg-amber-400/10 text-amber-300 hover:text-amber-200'
                            : 'text-slate-200 hover:bg-slate-800/80'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg mt-0.5 ${
                          isActive ? 'bg-blue-600/40 text-amber-300' :
                          item.highlight ? 'bg-amber-400/20 text-amber-400' :
                          'bg-slate-800 text-slate-300'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold block truncate">{name}</span>
                          <span className="text-[10px] text-slate-400 block truncate">{item.desc}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action: Launch Studio Quick CTA, Sign In & Mobile Hamburger */}
          <div className="flex items-center space-x-2.5">
            <Link
              href="/login"
              className="hidden md:inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/80 font-semibold rounded-xl text-xs transition-all"
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Sign In</span>
            </Link>

            <Link
              href="/studio"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-blue-900/30"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Launch Studio</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A192F] border-b border-slate-800 px-4 pt-3 pb-5 space-y-4">
          {/* Mobile Switchers Panel */}
          <div className="p-3 bg-[#0B1E36] rounded-xl border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Select Language:</span>
              <LanguageSwitcher />
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-700/50">
              <span className="text-slate-400 font-medium">Inspector Role:</span>
              <RoleSwitcher />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">Operational Workflows</p>
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const name = t(item.key) || item.defaultName;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{name}</span>
                  </div>
                  {item.badge && (
                    <span className="w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-800">
            <p className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">Governance & Telemetry</p>
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const name = t(item.key) || item.defaultName;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium ${
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
