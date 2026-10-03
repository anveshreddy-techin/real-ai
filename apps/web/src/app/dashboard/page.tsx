'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  Box, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ChevronRight, 
  Download, 
  RefreshCw, 
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  Layers
} from 'lucide-react';
import { TRAINING_CENTRES_28, TrainingCentreRecord } from '@/data/trainingCentres28';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function CommandDashboardPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Compliant' | 'Needs Review' | 'Critical'>('ALL');
  const [stateFilter, setStateFilter] = useState<string>('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Derive unique states
  const uniqueStates = useMemo(() => {
    const states = Array.from(new Set(TRAINING_CENTRES_28.map(c => c.state)));
    return ['ALL', ...states];
  }, []);

  // Filtered centres
  const filteredCentres = useMemo(() => {
    return TRAINING_CENTRES_28.filter(centre => {
      const matchesSearch = 
        centre.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        centre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        centre.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'ALL' || centre.status === statusFilter;
      const matchesState = stateFilter === 'ALL' || centre.state === stateFilter;

      return matchesSearch && matchesStatus && matchesState;
    });
  }, [searchTerm, statusFilter, stateFilter]);

  // Compute metrics
  const totalCount = TRAINING_CENTRES_28.length;
  const compliantCount = TRAINING_CENTRES_28.filter(c => c.status === 'Compliant').length;
  const needsReviewCount = TRAINING_CENTRES_28.filter(c => c.status === 'Needs Review').length;
  const criticalCount = TRAINING_CENTRES_28.filter(c => c.status === 'Critical').length;
  
  // Needs review queue items
  const needsReviewCentres = TRAINING_CENTRES_28.filter(c => c.status !== 'Compliant').slice(0, 5);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>NATIONAL COMMAND DASHBOARD • SIH 26245</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Centre Monitoring Command Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time compliance telemetry across 28 empaneled vocational skill institutes
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync Feeds'}</span>
          </button>

          <Link
            href="/evidence"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Review Evidence (48)</span>
          </Link>

          <Link
            href="/review-queue"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-sm transition-all"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Action Queue (12)</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Cards matching Image 2 Panel 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Training Centres */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Training Centres</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{totalCount}</span>
            <span className="text-xs font-medium text-slate-500">empaneled</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-semibold">{compliantCount} Compliant</span>
            <span className="text-amber-700 font-semibold">{needsReviewCount} Review</span>
            <span className="text-rose-700 font-semibold">{criticalCount} Critical</span>
          </div>
        </div>

        {/* Card 2: Attendance Records */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attendance Status</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">24</span>
            <span className="text-xs font-medium text-emerald-700 font-semibold">85.7% Valid</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>AEBAS Biometric sync</span>
            <span className="text-emerald-700 font-semibold">4 Flagged</span>
          </div>
        </div>

        {/* Card 3: Infrastructure Records */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Infrastructure BOM</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Box className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">19</span>
            <span className="text-xs font-medium text-amber-700 font-semibold">67.9% Complete</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Vision inspection verified</span>
            <span className="text-amber-700 font-semibold">9 Incomplete</span>
          </div>
        </div>

        {/* Card 4: Needs Review */}
        <div className="bg-white rounded-2xl border border-rose-200 p-5 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white to-rose-50/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider">Needs Immediate Action</span>
            <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-rose-700">{needsReviewCount + criticalCount}</span>
            <span className="text-xs font-medium text-rose-600">high priority</span>
          </div>
          <div className="mt-3 pt-3 border-t border-rose-100 flex items-center justify-between text-xs text-rose-700 font-semibold">
            <span>Corrective tickets open</span>
            <Link href="/review-queue" className="underline hover:text-rose-800">
              Resolve now →
            </Link>
          </div>
        </div>
      </div>

      {/* Middle Row: Compliance Trend & Needs Review Quick Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Compliance Trend Line Graphic (7-Day) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>Compliance & Verification Trend (Last 7 Days)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Aggregate compliance trajectory across attendance logs and physical BOM checks
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                <span className="text-slate-600 font-medium">Overall (82%)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-slate-600 font-medium">Attendance (86%)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="text-slate-600 font-medium">Infrastructure (68%)</span>
              </div>
            </div>
          </div>

          {/* SVG Trend Graph */}
          <div className="pt-4">
            <div className="h-48 w-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 160" preserveAspectRatio="none">
                {/* Horizontal grid lines */}
                <line x1="0" y1="20" x2="600" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="60" x2="600" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="100" x2="600" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="140" x2="600" y2="140" stroke="#f1f5f9" strokeWidth="1" />

                {/* Overall Compliance Line (Blue) */}
                <path
                  d="M 20 80 Q 100 70, 180 65 T 320 50 T 450 45 T 580 35"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                
                {/* Attendance Line (Emerald) */}
                <path
                  d="M 20 60 Q 100 55, 180 50 T 320 40 T 450 35 T 580 30"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />

                {/* Infrastructure Line (Amber) */}
                <path
                  d="M 20 110 Q 100 100, 180 95 T 320 85 T 450 78 T 580 70"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Data Points on Overall Line */}
                {[
                  { x: 20, y: 80, label: '04 Jun' },
                  { x: 110, y: 72, label: '05 Jun' },
                  { x: 200, y: 62, label: '06 Jun' },
                  { x: 300, y: 52, label: '07 Jun' },
                  { x: 400, y: 47, label: '08 Jun' },
                  { x: 500, y: 40, label: '09 Jun' },
                  { x: 580, y: 35, label: '10 Jun' },
                ].map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.x} cy={pt.y} r="4.5" fill="#2563EB" stroke="#ffffff" strokeWidth="2" />
                    <text x={pt.x} y="158" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600">
                      {pt.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Overall compliance rate improved by <strong className="text-emerald-600 font-bold">+6.4%</strong> since last telemetry cycle</span>
            <span className="font-mono text-[11px]">Audit Model: v2.4-EdgeNet</span>
          </div>
        </div>

        {/* Needs Review Queue Sidebar Panel */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Needs Review Queue</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                {needsReviewCentres.length} Centres
              </span>
            </div>

            <div className="space-y-3">
              {needsReviewCentres.map((centre) => (
                <Link
                  key={centre.id}
                  href={`/centres/${centre.id}`}
                  className="block p-3 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-slate-50/80 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-blue-600">
                      {centre.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      centre.status === 'Critical' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {centre.compliance}%
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-1 group-hover:text-blue-700">
                    {centre.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {centre.complianceSummary[0] || 'Verification required'}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <Link
              href="/review-queue"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>Open All 12 Corrective Tickets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Centre Status Table Section matching Reference Design */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        {/* Table Controls */}
        <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Centre Status Registry</h2>
            <p className="text-xs text-slate-500 mt-0.5">Showing {filteredCentres.length} of {totalCount} monitored institutions</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Box */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, ID or city..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
              />
            </div>

            {/* State Filter */}
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="ALL">All States</option>
              {uniqueStates.filter(s => s !== 'ALL').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Status Filter Buttons */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  statusFilter === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('Compliant')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  statusFilter === 'Compliant' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Compliant ({compliantCount})
              </button>
              <button
                onClick={() => setStatusFilter('Needs Review')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  statusFilter === 'Needs Review' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Review ({needsReviewCount})
              </button>
              <button
                onClick={() => setStatusFilter('Critical')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  statusFilter === 'Critical' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Critical ({criticalCount})
              </button>
            </div>
          </div>
        </div>

        {/* The Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px] tracking-wider">
                <th className="py-3 px-4">Centre ID</th>
                <th className="py-3 px-4">Institution Name</th>
                <th className="py-3 px-4">State / District</th>
                <th className="py-3 px-4 text-center">Compliance</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Infra Completeness</th>
                <th className="py-3 px-4">Reviewer</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCentres.map((centre) => {
                const isCritical = centre.status === 'Critical';
                const isReview = centre.status === 'Needs Review';
                const isCompliant = centre.status === 'Compliant';

                return (
                  <tr 
                    key={centre.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                      {centre.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{centre.name}</div>
                      <div className="text-[11px] text-slate-400">{centre.type}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{centre.location}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block font-extrabold text-xs px-2 py-0.5 rounded-full ${
                        isCompliant ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        isReview ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {centre.compliance}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        isCompliant ? 'bg-emerald-100 text-emerald-800' :
                        isReview ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isCompliant ? 'bg-emerald-600' : isReview ? 'bg-amber-600' : 'bg-rose-600'
                        }`}></span>
                        <span>{centre.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">
                        {centre.attendance.present} / {centre.attendance.registered}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {centre.attendance.rate}% Present
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="w-28 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            centre.completeness.overall >= 80 ? 'bg-emerald-500' :
                            centre.completeness.overall >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${centre.completeness.overall}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                        {centre.completeness.overall}% overall
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-800 font-medium">{centre.reviewer.name}</div>
                      <div className="text-[10px] text-slate-400">{centre.reviewer.updated}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/centres/${centre.id}`}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-xs transition-colors shadow-sm"
                      >
                        <span>View</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer pagination info */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing 1 to {filteredCentres.length} of {totalCount} records
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">SIH 26245 Prototype Telemetry Stream</span>
          </div>
        </div>
      </div>
    </div>
  );
}
