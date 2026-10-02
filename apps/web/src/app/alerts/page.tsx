'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft, ShieldAlert } from 'lucide-react';

const ALERTS_DATA = [
  {
    alert_id: "ALT-2026-UP-0042-01",
    centre_id: "PMKVY-UP-GKP-0042",
    centre_name: "Pratham Kaushal Vikas Kendra, Gorakhpur",
    severity: "CRITICAL",
    category: "GHOST_ATTENDANCE",
    title: "Severe Attendance Inflation Detected (-43.8%)",
    description: "Centre reported 32 active trainees in Batch FITS-02; AI optical counting detected only 18 physical occupants across all 4 camera zones.",
    delta: -14,
    timestamp: "2026-10-02T11:32:00Z",
    status: "OPEN",
    recommended_action: "Dispatched physical audit notification; suspend subsidy release for current bi-weekly cycle."
  },
  {
    alert_id: "ALT-2026-HP-0019-02",
    centre_id: "PMKVY-HP-SMR-0019",
    centre_name: "Himalayan Institute of Vocational Skills, Shimla",
    severity: "CRITICAL",
    category: "TEMPORARY_PROP_FRAUD",
    title: "Rapid Batch Depletion After Attendance Logging",
    description: "24 trainees detected at 09:00 AM logging period; attendance plummeted to 8 by 10:00 AM (Temporal consistency: 32%).",
    delta: -17,
    timestamp: "2026-10-02T10:18:00Z",
    status: "OPEN",
    recommended_action: "Request CCTV playback and issue show-cause notice for ghost logging."
  },
  {
    alert_id: "ALT-2026-UP-0042-03",
    centre_id: "PMKVY-UP-GKP-0042",
    centre_name: "Pratham Kaushal Vikas Kendra, Gorakhpur",
    severity: "ELEVATED",
    category: "INFRASTRUCTURE_DEFICIT",
    title: "Missing Sanctioned Overhead Digital Projector",
    description: "Room 2 camera confirms projector mount ceiling bracket is empty; item absent during active technical batch.",
    delta: -1,
    timestamp: "2026-10-02T09:15:00Z",
    status: "UNDER_INVESTIGATION",
    recommended_action: "Verify asset barcode or maintenance register with centre superintendent."
  }
];

export default function AlertsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
      <div>
        <Link href="/" className="inline-flex items-center text-xs font-semibold text-blue-700 hover:text-blue-800 mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Command Center
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Real-Time Discrepancy & Non-Compliance Alerts</h1>
        <p className="text-xs text-slate-500">Autonomous edge notifications generated when attendance inflation or infrastructure deficits breach scheme thresholds</p>
      </div>

      <div className="space-y-4">
        {ALERTS_DATA.map((alert) => (
          <div key={alert.alert_id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    alert.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-semibold">{alert.alert_id}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mt-1">{alert.title}</h3>
                <p className="text-xs text-slate-500">{alert.centre_name} ({alert.centre_id})</p>
              </div>
              <span className="text-xs text-slate-400 font-mono">{alert.timestamp}</span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
              {alert.description}
            </p>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500">Action: <strong className="text-slate-700">{alert.recommended_action}</strong></span>
              <button className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-xs transition-colors">
                Initiate Formal Notice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
