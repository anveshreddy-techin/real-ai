'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CANONICAL_CENTRES } from '@/data/mockCentres';
import { Users, AlertTriangle, ArrowLeft, ArrowUpRight, Search, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function AttendanceAuditPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const totalRegistered = CANONICAL_CENTRES.reduce((acc, c) => acc + c.attendance.submitted_attendance, 0);
  const totalDetected = CANONICAL_CENTRES.reduce((acc, c) => acc + c.attendance.ai_detected_headcount, 0);
  const totalInflation = totalRegistered - totalDetected;
  const overallDiscrepancyPct = ((totalInflation / totalRegistered) * 100).toFixed(1);

  const filteredCentres = CANONICAL_CENTRES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.centre_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
      {/* Header */}
      <div>
        <Link href="/" className="inline-flex items-center text-xs font-semibold text-blue-700 hover:text-blue-800 mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Command Center
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">National Attendance Integrity Audit</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Cross-referencing reported biometric register submissions vs. AI optical presence detection across batch sessions.
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search centre, state, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs w-64 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Aggregate KPI Summary Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Official Roster Trainees</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalRegistered} trainees</p>
          <p className="text-xs text-slate-400 mt-0.5">Submitted via gate register</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-blue-200 bg-blue-50/20 shadow-sm">
          <span className="text-xs font-medium text-blue-800">Physical Optical Count</span>
          <p className="text-2xl font-bold text-blue-700 mt-1">{totalDetected} trainees</p>
          <p className="text-xs text-blue-700 mt-0.5">Verified inside workshop</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/20 shadow-sm">
          <span className="text-xs font-semibold text-rose-700">Total Ghost Deficit</span>
          <p className="text-2xl font-bold text-rose-600 mt-1">-{totalInflation} trainees</p>
          <p className="text-xs text-rose-700 mt-0.5">Physical absence delta</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/20 shadow-sm">
          <span className="text-xs font-semibold text-amber-700">National Inflation Rate</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">{overallDiscrepancyPct}%</p>
          <p className="text-xs text-amber-700 mt-0.5">Average ghost inflation</p>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Centre-by-Centre Attendance Discrepancy Registry</h2>
          <span className="text-xs text-slate-500">Showing {filteredCentres.length} Centres</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-xs text-left">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Centre ID & Institution</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Submitted Reg.</th>
                <th className="py-3.5 px-4">AI Optical Count</th>
                <th className="py-3.5 px-4">Discrepancy Delta</th>
                <th className="py-3.5 px-4">Fraud Risk Score</th>
                <th className="py-3.5 px-4">Audit Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCentres.map((centre) => {
                const delta = centre.attendance.discrepancy_delta;
                const isCritical = delta <= -10;
                const isWarning = delta < 0 && delta > -10;

                return (
                  <tr key={centre.centre_id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-slate-500 font-semibold text-xs">{centre.centre_id}</span>
                      <p className="font-bold text-slate-900 text-sm">{centre.name}</p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-xs">
                      {centre.district}, {centre.state}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700 text-xs">
                      {centre.attendance.submitted_attendance} trainees
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 text-xs">
                      {centre.attendance.ai_detected_headcount} trainees
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`font-mono font-bold text-xs ${isCritical ? 'text-rose-600' : isWarning ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {delta} ({centre.attendance.discrepancy_percentage}%)
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800 text-xs">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        centre.attendance.fraud_risk_score > 60 ? 'bg-rose-100 text-rose-800' :
                        centre.attendance.fraud_risk_score > 30 ? 'bg-amber-100 text-amber-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {centre.attendance.fraud_risk_score}/100
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isCritical ? 'bg-rose-100 text-rose-700' : isWarning ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {isCritical ? 'CRITICAL GHOSTING' : isWarning ? 'MINOR DEFICIT' : 'VERIFIED MATCH'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
