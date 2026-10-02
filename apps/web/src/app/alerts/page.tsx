'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  AlertTriangle, 
  ArrowLeft, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  FileWarning, 
  ExternalLink,
  Users,
  Award,
  Phone,
  FileCheck2,
  HelpCircle,
  Camera
} from 'lucide-react';

interface DiscrepancyAlert {
  alert_id: string;
  centre_id: string;
  centre_name: string;
  severity: 'CRITICAL' | 'ELEVATED' | 'WATCH';
  category: 'GHOST_ATTENDANCE' | 'TEMPORARY_PROP_FRAUD' | 'INFRASTRUCTURE_DEFICIT';
  title: string;
  hindi_title: string;
  description: string;
  hindi_description: string;
  delta: number;
  timestamp: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
  recommended_action: string;
  trainer: {
    name: string;
    avatar: string;
    gender: 'Female' | 'Male';
    id: string;
    trade: string;
    phone: string;
  };
  assigned_officer: {
    name: string;
    avatar: string;
    designation: string;
    division: string;
    phone: string;
  };
}

const INITIAL_ALERTS: DiscrepancyAlert[] = [
  {
    alert_id: "ALT-2026-UP-0042-01",
    centre_id: "PMKVY-UP-GKP-0042",
    centre_name: "Pratham Kaushal Vikas Kendra, Gorakhpur",
    severity: "CRITICAL",
    category: "GHOST_ATTENDANCE",
    title: "Severe Attendance Inflation Detected (-43.8%)",
    hindi_title: "गंभीर फ़र्ज़ी हाज़िरी (14 छात्र गायब)",
    description: "Centre reported 32 active trainees in Batch ASO-04; AI optical counting detected only 18 physical occupants in workshop (-14 ghost students).",
    hindi_description: "बायोमेट्रिक मशीन पर 32 छात्रों की हाज़िरी दर्ज़ हुई, लेकिन कमरे के सीसीटीवी में सिर्फ़ 18 छात्र मौजूद पाए गए। 14 छात्र गायब हैं।",
    delta: -14,
    timestamp: "2026-10-02 11:32:00 IST",
    status: "OPEN",
    recommended_action: "Dispatch physical audit team; suspend bi-weekly subsidy release (₹2,52,000 frozen).",
    trainer: {
      name: "Sunita Devi",
      avatar: "👩‍🏫",
      gender: "Female",
      id: "TR-2024-UP-4209",
      trade: "Apparel & Sewing Machine Operator",
      phone: "+91 98390 14209"
    },
    assigned_officer: {
      name: "Dr. Arvind Shrivastava (IAS)",
      avatar: "👨‍💼",
      designation: "District Skill Nodal Officer",
      division: "Gorakhpur Division, Uttar Pradesh",
      phone: "+91 551 220 4401"
    }
  },
  {
    alert_id: "ALT-2026-HP-0019-02",
    centre_id: "PMKVY-HP-SMR-0019",
    centre_name: "Himalayan Institute of Vocational Skills, Shimla",
    severity: "CRITICAL",
    category: "TEMPORARY_PROP_FRAUD",
    title: "Rapid Batch Depletion After Attendance Logging (Roll-Call & Run)",
    hindi_title: "हाज़िरी लगाकर भागने की गड़बड़ी (16 छात्र गायब)",
    description: "24 trainees detected at 09:00 AM logging period; attendance plummeted to 8 trainees by 10:00 AM (Temporal consistency score: 32%).",
    hindi_description: "सुबह 9 बजे 24 छात्रों ने फिंगरप्रिंट लगाया, लेकिन 10 बजे तक 16 छात्र क्लास से चले गए। केवल 8 छात्र सीख रहे हैं।",
    delta: -16,
    timestamp: "2026-10-02 10:18:00 IST",
    status: "OPEN",
    recommended_action: "Issue Form 4A statutory show-cause notice under PMKVY 4.0 guidelines.",
    trainer: {
      name: "Pooja Negi",
      avatar: "👩‍💼",
      gender: "Female",
      id: "TR-2025-HP-1904",
      trade: "Food & Beverage Service Steward",
      phone: "+91 94180 55019"
    },
    assigned_officer: {
      name: "Smt. Rohini Sharma (HPAS)",
      avatar: "👩‍💼",
      designation: "State Inspection Coordinator",
      division: "Shimla District, Himachal Pradesh",
      phone: "+91 177 262 1109"
    }
  },
  {
    alert_id: "ALT-2026-RJ-0015-04",
    centre_id: "PMKVY-RJ-JDH-0015",
    centre_name: "Marwar Technical Training Institute, Jodhpur",
    severity: "ELEVATED",
    category: "INFRASTRUCTURE_DEFICIT",
    title: "Solar Simulator Lab Testing Benches Deficit (Equipment Borrowing Suspected)",
    hindi_title: "अनिवार्य सोलर उपकरण की कमी (2 मशीनें गायब)",
    description: "Sanctioned Scheme BOM mandates 4 operational solar inverter testing workbenches; only 2 units detected in active practical zone.",
    hindi_description: "मंजूर योजना के अनुसार 4 सोलर टेस्टिंग बेंच होनी चाहिए, लेकिन लैब में केवल 2 बेंच उपलब्ध हैं।",
    delta: -2,
    timestamp: "2026-10-02 08:45:00 IST",
    status: "OPEN",
    recommended_action: "Request physical geo-tagged equipment photo verification via Skill India Portal.",
    trainer: {
      name: "Rajesh Sharma",
      avatar: "👨‍🏫",
      gender: "Male",
      id: "TR-2023-RJ-1502",
      trade: "Solar PV Installer / Suryamitra",
      phone: "+91 94140 88215"
    },
    assigned_officer: {
      name: "Shri Mahendra Gehlot",
      avatar: "👨‍💼",
      designation: "Assistant Director of Training",
      division: "Jodhpur Circle, Rajasthan",
      phone: "+91 291 243 0081"
    }
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
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Real-Time Discrepancy & Non-Compliance Alerts
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              स्वायत्त अलर्ट और ऑडिट प्रणाली — Autonomous edge notifications triggered when attendance inflation or infrastructure deficits breach scheme thresholds.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              All Alerts ({alerts.length})
            </button>
            <button
              onClick={() => setFilter('CRITICAL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700'
              }`}
            >
              Critical Only (2)
            </button>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-5">
        {filteredAlerts.map((alert) => {
          const isCritical = alert.severity === 'CRITICAL';
          const isDone = actionDone[alert.alert_id];

          return (
            <div 
              key={alert.alert_id} 
              className={`bg-white rounded-2xl border p-4 sm:p-6 shadow-sm space-y-4 transition-all ${
                isCritical ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-200'
              }`}
            >
              {/* Alert Top Metadata */}
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
                  <p className="text-xs font-semibold text-rose-700">{alert.hindi_title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{alert.centre_name} ({alert.centre_id})</p>
                </div>
                <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{alert.timestamp}</span>
                </div>
              </div>

              {/* Bilingual Description Card for Non-Educated Students & Auditors */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                <p className="text-slate-800 font-medium leading-relaxed">{alert.description}</p>
                <div className="p-2 bg-amber-50/70 border border-amber-200/60 rounded-lg text-amber-950 font-medium">
                  <span className="font-bold">सरल हिंदी में: </span>{alert.hindi_description}
                </div>
              </div>

              {/* Responsible Human Profiles (Trainer & Assigned Inspection Officer) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {/* Centre Trainer Profile */}
                <div className="p-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/30 rounded-xl border border-blue-100 flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-blue-600/10 border border-blue-300 flex items-center justify-center text-2xl flex-shrink-0">
                    {alert.trainer.avatar}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-blue-700 font-bold uppercase tracking-wider block">
                      Centre Trainer (प्रशिक्षक)
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs truncate">{alert.trainer.name}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{alert.trainer.trade}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{alert.trainer.id} • {alert.trainer.phone}</p>
                  </div>
                </div>

                {/* Assigned District Inspection Officer */}
                <div className="p-3 bg-gradient-to-r from-slate-50 to-emerald-50/40 rounded-xl border border-slate-200 flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600/10 border border-emerald-300 flex items-center justify-center text-2xl flex-shrink-0">
                    {alert.assigned_officer.avatar}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">
                      Assigned Auditor (नोडल अधिकारी)
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs truncate">{alert.assigned_officer.name}</h4>
                    <p className="text-[11px] text-slate-600 truncate">{alert.assigned_officer.designation}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{alert.assigned_officer.division}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-2 border-t border-slate-100 gap-3">
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
                        onClick={() => handleAction(alert.alert_id, 'Formal Show-Cause Notice Dispatched to Centre')}
                        className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                      >
                        Issue Formal Notice (कारण बताओ नोटिस)
                      </button>
                      <button 
                        onClick={() => handleAction(alert.alert_id, `Physical Inspection Team Dispatched under ${alert.assigned_officer.name}`)}
                        className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-colors"
                      >
                        Dispatch Audit Team (जाँच टीम भेजें)
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
