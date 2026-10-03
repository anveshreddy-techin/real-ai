'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  Box, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { TRAINING_CENTRES_28, TrainingCentreRecord } from '@/data/trainingCentres28';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function CentresListPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'ALL' | 'Compliant' | 'Needs Review' | 'Critical'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');

  // Derive unique states
  const uniqueStates = useMemo(() => {
    const states = Array.from(new Set(TRAINING_CENTRES_28.map(c => c.state)));
    return ['ALL', ...states];
  }, []);

  // Filtered centres
  const filteredCentres = useMemo(() => {
    return TRAINING_CENTRES_28.filter(c => {
      const matchesSearch = 
        c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filter === 'ALL' || c.status === filter;
      const matchesState = stateFilter === 'ALL' || c.state === stateFilter;

      return matchesSearch && matchesFilter && matchesState;
    });
  }, [searchTerm, filter, stateFilter]);

  const totalCount = TRAINING_CENTRES_28.length;
  const compliantCount = TRAINING_CENTRES_28.filter(c => c.status === 'Compliant').length;
  const reviewCount = TRAINING_CENTRES_28.filter(c => c.status === 'Needs Review').length;
  const criticalCount = TRAINING_CENTRES_28.filter(c => c.status === 'Critical').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <Link 
          href="/dashboard" 
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Command Dashboard</span>
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>EMPANELLED TRAINING CENTRES REGISTRY (28)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Vocational Skilling Centres
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Comprehensive registry of 28 skilling institutions actively monitored under Smart India Hackathon SIH 26245
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              href="/evidence"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
            >
              Inspect Evidence (48)
            </Link>
            <Link
              href="/review-queue"
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm transition-all"
            >
              Action Queue (12)
            </Link>
          </div>
        </div>
      </div>

      {/* Filter Toolbar & Search matching Image 1 Panel 3 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search centres by name, ID or location..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>

          {/* State Filter */}
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            <option value="ALL">All States (National)</option>
            {uniqueStates.filter(s => s !== 'ALL').map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'ALL' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setFilter('Compliant')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'Compliant' ? 'bg-emerald-600 text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Compliant ({compliantCount})
            </button>
            <button
              onClick={() => setFilter('Needs Review')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'Needs Review' ? 'bg-amber-600 text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Needs Review ({reviewCount})
            </button>
            <button
              onClick={() => setFilter('Critical')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'Critical' ? 'bg-rose-600 text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Critical ({criticalCount})
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 28 Centres */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCentres.map((centre) => {
          const isCritical = centre.status === 'Critical';
          const isReview = centre.status === 'Needs Review';
          const isCompliant = centre.status === 'Compliant';

          return (
            <div 
              key={centre.id} 
              className={`bg-white rounded-3xl border shadow-sm p-5 space-y-4 hover:shadow-md transition-all flex flex-col justify-between ${
                isCritical ? 'border-rose-200 bg-gradient-to-b from-rose-50/20 to-white' : 
                isReview ? 'border-amber-200 bg-gradient-to-b from-amber-50/20 to-white' : 
                'border-slate-200 hover:border-blue-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {centre.id}
                    </span>
                    <h2 className="font-bold text-base text-slate-900 mt-2 leading-snug">{centre.name}</h2>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{centre.location}</span>
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex-shrink-0 ${
                    isCritical ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                    isReview ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {centre.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-slate-100 bg-slate-50/60 rounded-xl px-3">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Scheme Type</span>
                    <span className="font-bold text-slate-800 truncate block">{centre.type}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Active Batches</span>
                    <span className="font-bold text-slate-800">{centre.batches} Batches</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Attendance Turnout</span>
                    <span className="font-bold text-slate-800">
                      {centre.attendance.present} / {centre.attendance.registered} ({centre.attendance.rate}%)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">BOM Completeness</span>
                    <span className="font-bold text-slate-800">{centre.completeness.overall}% Verified</span>
                  </div>
                </div>

                {/* Highlighted Compliance Notice */}
                <div className={`text-xs p-2.5 rounded-xl border font-medium ${
                  isCritical ? 'bg-rose-50 border-rose-200 text-rose-800' :
                  isReview ? 'bg-amber-50 border-amber-200 text-amber-800' :
                  'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}>
                  <span className="font-bold">Summary: </span>
                  <span>{centre.complianceSummary[0] || 'Standard operations active'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                <span className="text-sm font-bold text-slate-900">
                  Compliance: <strong className={isCritical ? 'text-rose-600' : isReview ? 'text-amber-600' : 'text-emerald-600'}>{centre.compliance}%</strong>
                </span>
                <Link 
                  href={`/centres/${centre.id}`}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-xs transition-all shadow-sm"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
