'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft, ShieldAlert, CheckCircle2, Clock, FileWarning, ExternalLink } from 'lucide-react';

interface DiscrepancyAlert {
  alert_id: string;
  centre_id: string;
  centre_name: string;
  severity: 'CRITICAL' | 'ELEVATED' | 'WATCH';
  category: 'GHOST_ATTENDANCE' | 'TEMPORARY_PROP_FRAUD' | 'INFRASTRUCTURE_DEFICIT';
  title: string;
  description: string;
  delta: number;
  timestamp: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
  recommended_action: string;
}

const INITIAL_ALERTS: DiscrepancyAlert[] = [
  {
    alert_id: "ALT-2026-UP-0042-01",
    centre_id: "PMKVY-UP-GKP-0042",
    centre_name: "Pratham Kaushal Vikas Kendra, Gorakhpur",
    severity: "CRITICAL",
    category: "GHOST_ATTENDANCE",
    title: "Severe Attendance Inflation Detected (-43.8%)",
    description: "Centre reported 32 active trainees in Batch FITS-02; AI optical counting detected only 18 physical occupants across all 4 camera zones.",
    delta: -14,
    timestamp: "2026-10-02 11:32:00 IST",
    status: "OPEN",
    recommended_action: "Dispatch physical audit team; suspend subsidy release for current bi-weekly billing cycle."
  },
  {
    alert_id: "ALT-2026-HP-0019-02",
    centre_id: "PMKVY-HP-SMR-0019",
    centre_name: "Himalayan Institute of Vocational Skills, Shimla",
    severity: "CRITICAL",
    category: "TEMPORARY_PROP_FRAUD",
    title: "Rapid Batch Depletion After Attendance Logging (Temporal Dropoff)",
    description: "24 trainees detected at 09:00 AM logging period; attendance plummeted to 8 trainees by 10:00 AM (Temporal consistency score: 32%).",
    delta: -16,
    timestamp: "2026-10-02 10:18:00 IST",
    status: "OPEN",
    recommended_action: "Issue show-cause notice under PMKVY Guidelines 2024 for ghost attendance roll-call manipulation."
  },
  {
    alert_id: "ALT-2026-UP-0042-03",
    centre_id: "PMKVY-UP-GKP-0042",
    centre_name: "Pratham Kaushal Vikas Kendra, Gorakhpur",
    severity: "ELEVATED",
    category: "INFRASTRUCTURE_DEFICIT",
    title: "Missing Sanctioned Overhead Digital Projector",
    description: "Room 2 camera confirms ceiling mount bracket is empty; digital multimedia instructional aid absent during active session.",
    delta: -1,
    timestamp: "2026-10-02 09:15:00 IST",
    status: "INVESTIGATING",
    recommended_action: "Verify equipment serial number or equipment maintenance log with centre superintendent."
  },
  {
    alert_id: "ALT-2026-RJ-0015-04",
    centre_id: "PMKVY-RJ-JDH-0015",
    centre_name: "Marwar Technical Training Institute, Jodhpur",
    severity: "ELEVATED",
    category: "INFRASTRUCTURE_DEFICIT",
    title: "Solar Simulator Lab Testing Benches Deficit",
    description: "Sanctioned Scheme BOM mandates 4 operational solar inverter testing workbenches; only 2 units detected in active practical zone.",
    delta: -2,
    timestamp: "2026-10-02 08:45:00 IST",
    status: "OPEN",
    recommended_action: "Request physical geo-tagged equipment photo verification via Skill India Portal."
  }
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<DiscrepancyAlert[]>(INITIAL_ALERTS);
  const [filter, setFilter] = useState<'ALL' | 'CRITICAL' | 'ELEVATED'>('ALL');
  const [actionDone, setActionDone] = useState<{ [key: string]: string }>({});

  const handleAction = (alertId: string, actionName: string) => {
    setActionDone(prev => ({ ...prev, [alertId]: actionName }));
  };

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'ALL') return true;
    return a.severity === filter;
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
            <h1 className="text-2xl font-bold text-slate-900">Real-Time Discrepancy & Non-Compliance Alerts</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Autonomous edge notifications triggered when attendance inflation or infrastructure deficits breach scheme thresholds.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                filter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              All Alerts ({alerts.length})
            </button>
            <button
              onClick={() => setFilter('CRITICAL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                filter === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700'
              }`}
            >
              Critical Only (2)
            </button>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const isCritical = alert.severity === 'CRITICAL';
          const isDone = actionDone[alert.alert_id];

          return (
            <div 
              key={alert.alert_id} 
              className={`bg-white rounded-2xl border p-5 shadow-sm space-y-3.5 transition-all ${
                isCritical ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      isCritical ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-amber-100 text-amber-700 border border-amber-200'
                    }`}>
                      {alert.severity} PRIORITY
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-semibold">{alert.alert_id}</span>
                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                      {alert.category.replace('_', ' ')}
                    </span>
                  </div>
                  <h2 className="font-bold text-base text-slate-900 mt-1">{alert.title}</h2>
                  <p className="text-xs text-slate-500">{alert.centre_name} ({alert.centre_id})</p>
                </div>
                <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{alert.timestamp}</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
                {alert.description}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-1 gap-3">
                <span className="text-slate-600">
                  Regulatory Action: <strong className="text-slate-900 font-semibold">{alert.recommended_action}</strong>
                </span>

                <div className="flex items-center space-x-2">
                  {isDone ? (
                    <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{isDone}</span>
                    </span>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleAction(alert.alert_id, 'Formal Show-Cause Issued')}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg text-xs transition-colors shadow-sm"
                      >
                        Issue Formal Notice
                      </button>
                      <button 
                        onClick={() => handleAction(alert.alert_id, 'Physical Inspection Scheduled')}
                        className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg text-xs transition-colors"
                      >
                        Dispatch Audit Team
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
