'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Users, 
  Box, 
  AlertTriangle, 
  ArrowRight, 
  Lock, 
  Mail, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Activity,
  Sparkles,
  Building2
} from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'INSPECTOR' | 'NODAL' | 'CENTRE' | 'AUDITOR'>('INSPECTOR');
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const demoAccounts = [
    { role: 'INSPECTOR', label: 'Field Inspector', email: 'inspector@skillguard.gov.in', centre: 'All Centres (Uttarakhand/UP)' },
    { role: 'NODAL', label: 'MSDE Nodal Officer', email: 'nodal.officer@msde.gov.in', centre: 'National Command' },
    { role: 'CENTRE', label: 'Centre Manager', email: 'manager@chamoli-iti.ac.in', centre: 'TC001 Chamoli' },
    { role: 'AUDITOR', label: 'Third-Party Auditor', email: 'auditor@qcin.org', centre: 'Independent Audit' },
  ];

  const handleQuickLogin = (role: 'INSPECTOR' | 'NODAL' | 'CENTRE' | 'AUDITOR', accEmail: string) => {
    setSelectedRole(role);
    setEmail(accEmail);
    setPassword('••••••••••••');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 800);
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-950 via-[#07172A] to-slate-900 text-white flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Top bar with quick language switch */}
      <div className="max-w-6xl w-full mx-auto flex justify-between items-center pb-6">
        <Link href="/" className="inline-flex items-center space-x-2 text-slate-300 hover:text-amber-300 transition-colors">
          <Activity className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-sm tracking-wide">SkillGuard <span className="text-amber-400">AI</span></span>
        </Link>
        <div className="flex items-center space-x-3">
          <LanguageSwitcher compact />
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Branding & Features from Image 1 Panel 1 */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIH 26245 • National Monitoring Portal</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Safer Centres. <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                Better Skills.
              </span> <br />
              Brighter Future.
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg">
              Empowering MSDE and NSDC with AI-driven, tamper-proof monitoring of 28+ vocational centres, authenticating attendance and physical infrastructure in real time.
            </p>
          </div>

          {/* 4 Feature Highlights from Reference Design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Verify Attendance</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Geofenced biometrics & tamper-proof cross checks</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 mt-0.5">
                <Box className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Check Infrastructure</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Vision-based lab & safety BOM verification</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Detect Anomalies</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Automated detection of stale or duplicate evidence</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Corrective Actions</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">4-step auditable resolution queue for nodal officers</p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center space-x-6 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>28 Centres Live</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>DPDP Act 2023 Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Edge AI Enabled</span>
            </div>
          </div>
        </div>

        {/* Right Side: Sign-in Card */}
        <div className="lg:col-span-6 max-w-md w-full mx-auto">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Top decorative gradient glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-blue-500 to-emerald-500"></div>

            <div className="space-y-2 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Welcome Back</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Sign in to your SkillGuard AI Command Portal
              </p>
            </div>

            {/* Quick Demo Role Selector Pills */}
            <div className="mb-6 space-y-2">
              <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
                Quick Demo Role Selector
              </label>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleQuickLogin(acc.role as any, acc.email)}
                    className={`p-2 rounded-xl text-left text-xs transition-all border ${
                      selectedRole === acc.role
                        ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="block truncate">{acc.label}</span>
                    <span className="block text-[10px] text-slate-400 font-normal truncate">{acc.centre}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1.5">
                  Email Address / Center ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="officer@skillguard.gov.in"
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-amber-500/30"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="text-amber-400 hover:text-amber-300 font-medium">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading || loginSuccess}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                ) : loginSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                    <span>Authenticated! Redirecting...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Command Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-400">
                New to SkillGuard AI?{' '}
                <Link href="/centres" className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2">
                  Browse Empaneled Centres
                </Link>
                {' '}or contact MSDE Helpdesk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
