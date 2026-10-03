'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CANONICAL_CENTRES, Centre } from '@/data/mockCentres';
import { useLanguage } from '@/components/ui/LanguageContext';
import { 
  Users, 
  AlertTriangle, 
  ArrowLeft, 
  Search, 
  ShieldAlert, 
  CheckCircle2, 
  Camera,
  Award,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export default function AttendanceAuditPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCentreId, setExpandedCentreId] = useState<string>('PMKVY-UP-GKP-0042');

  const totalRegistered = CANONICAL_CENTRES.reduce((acc, c) => acc + c.attendance.submitted_attendance, 0);
  const totalDetected = CANONICAL_CENTRES.reduce((acc, c) => acc + c.attendance.ai_detected_headcount, 0);
  const totalInflation = totalRegistered - totalDetected;
  const overallDiscrepancyPct = ((totalInflation / totalRegistered) * 100).toFixed(1);

  // Trainer metadata lookup
  const TRAINER_NAMES: { [key: string]: { name: string; avatar: string; shift: string } } = {
    'PMKVY-UP-GKP-0042': { name: 'Sunita Devi', avatar: '👩‍🏫', shift: '09:00 - 13:00' },
    'PMKVY-RJ-JDH-0015': { name: 'Rajesh Sharma', avatar: '👨‍🏫', shift: '09:00 - 13:00' },
    'DDU-WB-MLD-0008': { name: 'Anup Roy', avatar: '👨‍💻', shift: '11:00 - 15:00' },
    'PMKVY-MH-NGP-0031': { name: 'Vikram Patil', avatar: '👨‍🔧', shift: '08:30 - 12:30' },
    'PMKVY-HP-SMR-0019': { name: 'Pooja Negi', avatar: '👩‍💼', shift: '10:00 - 14:00' },
  };

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
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> {t("back_to_command")}
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {t("att_title")}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {t("att_desc")}
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder={t("search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Aggregate KPI Summary Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-medium text-slate-500">{t("att_registered")}</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalRegistered} trainees</p>
          <p className="text-xs text-slate-400 mt-0.5">Submitted via gate register</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-blue-200 bg-blue-50/20 shadow-sm">
          <span className="text-xs font-medium text-blue-800">{t("att_detected")}</span>
          <p className="text-2xl font-bold text-blue-700 mt-1">{totalDetected} trainees</p>
          <p className="text-xs text-blue-700 mt-0.5">Verified inside workshop</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/20 shadow-sm">
          <span className="text-xs font-semibold text-rose-700">{t("att_ghosts")}</span>
          <p className="text-2xl font-bold text-rose-600 mt-1">-{totalInflation} trainees</p>
          <p className="text-xs text-rose-700 mt-0.5">Physical absence delta</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/20 shadow-sm">
          <span className="text-xs font-semibold text-amber-700">{t("att_discrepancy_rate")}</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">{overallDiscrepancyPct}%</p>
          <p className="text-xs text-amber-700 mt-0.5">Average ghost inflation</p>
        </div>
      </div>

      {/* Non-Educated User Friendly Explanation Banner */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-100 rounded-xl text-amber-900 flex-shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              {t("easy_guide_title")}
            </h4>
            <p className="text-slate-600 text-xs mt-0.5">
              {t("easy_guide_desc")}
            </p>
          </div>
        </div>
        <Link
          href="/studio"
          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors flex-shrink-0 shadow-sm"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>{t("cmd_launch_studio")}</span>
        </Link>
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Centre-by-Centre Attendance Discrepancy Registry</h2>
          <span className="text-xs text-slate-500">Showing {filteredCentres.length} Centres</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-xs text-left">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">{t("col_centre")}</th>
                <th className="py-3.5 px-4">{t("col_trainer")}</th>
                <th className="py-3.5 px-4">Male / Female</th>
                <th className="py-3.5 px-4">{t("col_aebas")}</th>
                <th className="py-3.5 px-4">{t("col_camera")}</th>
                <th className="py-3.5 px-4">{t("col_mismatch")}</th>
                <th className="py-3.5 px-4">{t("col_status")}</th>
                <th className="py-3.5 px-4">{t("col_action")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCentres.map((centre) => {
                const delta = centre.attendance.discrepancy_delta;
                const isCritical = delta <= -10;
                const isWarning = delta < 0 && delta > -10;
                const isExpanded = expandedCentreId === centre.centre_id;
                const trainer = TRAINER_NAMES[centre.centre_id] || { name: 'Master Trainer', avatar: '👨‍🏫', shift: '09:00 - 13:00' };

                const maleCount = centre.trainees?.filter(t => t.gender === 'M').length || Math.round(centre.sanctioned_capacity * 0.6);
                const femaleCount = centre.trainees?.filter(t => t.gender === 'F').length || Math.round(centre.sanctioned_capacity * 0.4);

                return (
                  <React.Fragment key={centre.centre_id}>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-slate-500 font-semibold text-xs">{centre.centre_id}</span>
                        <p className="font-bold text-slate-900 text-sm line-clamp-1">{centre.name}</p>
                        <p className="text-xs text-slate-500">{centre.district}, {centre.state}</p>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{trainer.avatar}</span>
                          <div>
                            <span className="font-bold text-slate-900 block">{trainer.name}</span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {trainer.shift}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-2 text-xs">
                          <span className="flex items-center gap-0.5 text-blue-700 font-semibold">
                            <span>👨</span> {maleCount}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-0.5 text-fuchsia-700 font-semibold">
                            <span>👩</span> {femaleCount}
                          </span>
                        </div>
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

                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isCritical ? 'bg-rose-100 text-rose-700' : isWarning ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {isCritical ? 'CRITICAL GHOSTING' : isWarning ? 'MINOR DEFICIT' : 'VERIFIED MATCH'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => setExpandedCentreId(isExpanded ? '' : centre.centre_id)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold flex items-center space-x-1"
                        >
                          <span>{isExpanded ? 'Hide' : 'Inspect Roster'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    </tr>

                    {/* Expandable Trainee Roster Detail Row with Human Avatars */}
                    {isExpanded && (
                      <tr className="bg-slate-50/70">
                        <td colSpan={8} className="p-4 border-t border-slate-100">
                          <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                              <div>
                                <span className="font-bold text-slate-800 text-xs block">
                                  Candidate AEBAS Biometric Punches vs In-Room Camera Presence
                                </span>
                                <span className="text-slate-500 text-[11px]">
                                  {centre.name} • Certified Instructor: {trainer.name} ({trainer.avatar})
                                </span>
                              </div>
                              <Link
                                href="/studio"
                                className="inline-flex items-center space-x-1 text-xs text-blue-700 font-bold hover:underline"
                              >
                                <Camera className="w-3.5 h-3.5" />
                                <span>Inspect in Live Video Studio →</span>
                              </Link>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                              {centre.trainees?.slice(0, 18).map((t) => (
                                <div 
                                  key={t.candidate_id}
                                  className={`p-2 rounded-lg border text-xs ${
                                    t.status_in_camera === 'PRESENT' 
                                      ? 'bg-white border-emerald-200' 
                                      : 'bg-rose-50/50 border-rose-200'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-base">{t.gender === 'F' ? '👩' : '👨'}</span>
                                    <span className={`text-[9px] font-bold px-1 rounded ${
                                      t.status_in_camera === 'PRESENT' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                    }`}>
                                      {t.status_in_camera === 'PRESENT' ? 'Room' : 'Ghost'}
                                    </span>
                                  </div>
                                  <p className="font-bold text-slate-900 text-[11px] truncate mt-1">{t.name}</p>
                                  <p className="text-[10px] text-slate-400 font-mono">{t.aebas_punch_in} AM</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
