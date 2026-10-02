'use client';

import React from 'react';
import Link from 'next/link';
import { CANONICAL_CENTRES } from '@/data/mockCentres';
import { Users, AlertTriangle, ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function AttendanceAuditPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
      <div>
        <Link href="/" className="inline-flex items-center text-xs font-semibold text-blue-700 hover:text-blue-800 mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Command Center
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">National Attendance Integrity Audit</h1>
        <p className="text-xs text-slate-500">Cross-referencing reported biometric register submissions vs. AI optical presence detection</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="min-w-full text-xs text-left">
          <thead className="bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Centre ID & Name</th>
              <th className="py-3 px-4">State / District</th>
              <th className="py-3 px-4">Submitted Reg.</th>
              <th className="py-3 px-4">AI Optical Count</th>
              <th className="py-3 px-4">Discrepancy Delta</th>
              <th className="py-3 px-4">Fraud Risk Score</th>
              <th className="py-3 px-4">Audit Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {CANONICAL_CENTRES.map((centre) => {
              const delta = centre.attendance.discrepancy_delta;
              const isCritical = delta <= -10;
              const isWarning = delta < 0 && delta > -10;

              return (
                <tr key={centre.centre_id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4">
                    <span className="font-mono text-slate-500 font-semibold">{centre.centre_id}</span>
                    <p className="font-bold text-slate-900 text-xs">{centre.name}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {centre.district}, {centre.state}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    {centre.attendance.submitted_attendance} trainees
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {centre.attendance.ai_detected_headcount} trainees
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-mono font-bold ${isCritical ? 'text-rose-600' : isWarning ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {delta} ({centre.attendance.discrepancy_percentage}%)
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">
                    {centre.attendance.fraud_risk_score}/100
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      isCritical ? 'bg-rose-100 text-rose-700' : isWarning ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {isCritical ? 'CRITICAL GHOSTING' : isWarning ? 'MINOR DELTA' : 'VERIFIED MATCH'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
