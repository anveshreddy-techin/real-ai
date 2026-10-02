'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CANONICAL_CENTRES } from '@/data/mockCentres';
import { ArrowLeft, Building2, Users, Camera, Wifi, CheckCircle2, AlertTriangle, ShieldAlert, ArrowRight } from 'lucide-react';

export default function CentresListPage() {
  const [filter, setFilter] = useState<'ALL' | 'CRITICAL' | 'ELEVATED_RISK' | 'COMPLIANT'>('ALL');

  const filteredCentres = CANONICAL_CENTRES.filter(c => {
    if (filter === 'ALL') return true;
    return c.compliance_status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
      {/* Header */}
      <div>
        <Link href="/" className="inline-flex items-center text-xs font-semibold text-blue-700 hover:text-blue-800 mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Command Center
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Empaneled Vocational Training Centres</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Comprehensive registry of skilling institutions actively monitored under Smart India Hackathon SIH 26245
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Centres ({CANONICAL_CENTRES.length})
            </button>
            <button
              onClick={() => setFilter('CRITICAL')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              Critical Flags ({CANONICAL_CENTRES.filter(c => c.compliance_status === 'CRITICAL').length})
            </button>
            <button
              onClick={() => setFilter('ELEVATED_RISK')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'ELEVATED_RISK' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              Elevated Risk ({CANONICAL_CENTRES.filter(c => c.compliance_status === 'ELEVATED_RISK').length})
            </button>
            <button
              onClick={() => setFilter('COMPLIANT')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'COMPLIANT' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              Compliant ({CANONICAL_CENTRES.filter(c => c.compliance_status === 'COMPLIANT').length})
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Centres */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCentres.map((centre) => {
          const isCritical = centre.compliance_status === 'CRITICAL';
          const isElevated = centre.compliance_status === 'ELEVATED_RISK';
          const isCompliant = centre.compliance_status === 'COMPLIANT';

          return (
            <div 
              key={centre.centre_id} 
              className={`bg-white rounded-2xl border shadow-sm p-5 space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between ${
                isCritical ? 'border-rose-200 bg-gradient-to-b from-rose-50/10 to-white' : 
                isElevated ? 'border-amber-200 bg-gradient-to-b from-amber-50/10 to-white' : 
                'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-500">{centre.centre_id}</span>
                    <h2 className="font-bold text-base text-slate-900 mt-0.5 leading-snug">{centre.name}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{centre.district}, {centre.state}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex-shrink-0 ${
                    isCritical ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                    isElevated ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                    'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  }`}>
                    {centre.compliance_status.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-slate-100 bg-slate-50/50 rounded-xl px-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Scheme</span>
                    <span className="font-bold text-slate-800">{centre.scheme}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Bandwidth</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <Wifi className="w-3 h-3 text-slate-500" />
                      {centre.bandwidth_mode === 'LOW' ? 'Edge Low-BW' : 'Continuous 5 FPS'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">AI Headcount</span>
                    <span className="font-bold text-slate-800">
                      {centre.attendance.ai_detected_headcount} / {centre.attendance.submitted_attendance}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">CCTV Feeds</span>
                    <span className="font-bold text-slate-800">{centre.cameras_online} / {centre.total_cameras} Online</span>
                  </div>
                </div>

                {isCritical && (
                  <div className="text-xs text-rose-700 bg-rose-50 p-2.5 rounded-lg border border-rose-200 font-medium">
                    ⚠️ {centre.attendance.discrepancy_percentage}% attendance inflation detected
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                <span className="text-sm font-bold text-slate-900">
                  Compliance Score: <strong className={isCritical ? 'text-rose-600' : isElevated ? 'text-amber-600' : 'text-emerald-600'}>{centre.compliance_score}%</strong>
                </span>
                <Link 
                  href="/"
                  className="inline-flex items-center space-x-1 text-xs font-bold text-blue-700 hover:text-blue-800 hover:underline"
                >
                  <span>Inspect Centre</span>
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
