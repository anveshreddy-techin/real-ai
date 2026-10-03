'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CANONICAL_CENTRES, Centre, TraineeRecord } from '@/data/mockCentres';
import { AttendanceTimelineChart } from '@/components/charts/AttendanceTimelineChart';
import { SeatingHeatmap } from '@/components/ui/SeatingHeatmap';
import { TradeBatchRoster } from '@/components/ui/TradeBatchRoster';
import { useLanguage } from '@/components/ui/LanguageContext';
import { 
  Building2, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Camera, 
  Wifi, 
  Layers, 
  ShieldAlert, 
  Zap,
  Cpu,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Eye,
  Sliders,
  Database,
  Download,
  FileCheck2,
  HelpCircle,
  Box,
  Activity
} from 'lucide-react';

export default function NationalCommandPage() {
  const { t } = useLanguage();
  const [selectedCentre, setSelectedCentre] = useState<Centre>(CANONICAL_CENTRES[0]);
  const [activeCamIndex, setActiveCamIndex] = useState<number>(1);
  const [showDetections, setShowDetections] = useState<boolean>(true);
  const [centreViewTab, setCentreViewTab] = useState<'CAMERAS' | 'ROSTER' | 'BOM'>('CAMERAS');
  const [activeStep, setActiveStep] = useState<number>(1);

  const totalCentres = CANONICAL_CENTRES.length;
  const criticalCentres = CANONICAL_CENTRES.filter(c => c.compliance_status === 'CRITICAL').length;
  const elevatedCentres = CANONICAL_CENTRES.filter(c => c.compliance_status === 'ELEVATED_RISK').length;
  const compliantCentres = CANONICAL_CENTRES.filter(c => c.compliance_status === 'COMPLIANT').length;
  const avgCompliance = (CANONICAL_CENTRES.reduce((acc, c) => acc + c.compliance_score, 0) / totalCentres).toFixed(1);

  const INSPECTION_STEPS = [
    {
      step: 1,
      title: "1. AEBAS Door Biometric Check",
      desc: "Centre logs 32 trainees on portal",
      detail: "In the morning, candidates scan their fingerprints on the biometric terminal at the centre entrance. Official portal logs 32 trainees marked present."
    },
    {
      step: 2,
      title: "2. YOLOv8 Optical Headcount",
      desc: "In-room cameras detect only 18 bodies",
      detail: "SkillGuard AI processes CCTV snapshots in volatile RAM, extracting anonymous person centroids. Only 18 trainees are physically present in the workshop."
    },
    {
      step: 3,
      title: "3. Discrepancy & Fraud Scoring",
      desc: "-14 ghost trainees (-43.8% inflation)",
      detail: "The system cross-references the counts. 14 ghost students identified. Trained Random Forest model computes an 88% fraud risk score."
    },
    {
      step: 4,
      title: "4. Sanctioned BOM Equipment Audit",
      desc: "7 sewing machines missing from bay",
      detail: "Computer vision checks physical machines against approved BOM. Only 8 of 15 sanctioned sewing machines detected; equipment borrowing fraud detected."
    },
    {
      step: 5,
      title: "5. Automated Regulatory Enforcement",
      desc: "Show-Cause Notice & Subsidy Frozen",
      detail: "Statutory Form 4A Notice auto-generated; bi-weekly training subsidy (₹2,52,000) suspended until physical verification."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 space-y-6">
      {/* 1. Unified Executive Command Header */}
      <div className="bg-gradient-to-r from-[#07172A] via-[#0F294D] to-[#07172A] rounded-2xl p-5 sm:p-6 text-white shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1.5 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-300">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{t("sih_header_tag")}</span>
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{t("active_continuous_audit")}</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {t("cmd_title")}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {t("cmd_desc")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-amber-500/20"
            >
              <Activity className="w-4 h-4" />
              <span>National Dashboard (28)</span>
            </Link>
            <Link
              href="/studio"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-blue-900/40"
            >
              <Camera className="w-4 h-4" />
              <span>{t("cmd_launch_studio")}</span>
            </Link>
            <Link
              href="/datasets"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white font-semibold rounded-xl text-xs transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t("cmd_datasets_hub")}</span>
            </Link>
            <Link
              href="/uniqueness"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t("cmd_why_unique")}</span>
            </Link>
          </div>
        </div>

        {/* Integrated Jurisdiction & Privacy Bar */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-300 gap-2">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="font-semibold text-slate-400">{t("jurisdiction_scope")}:</span>
            <span className="text-white font-medium">{t("jurisdiction_val")}</span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">
            {t("dpdp_compliance_banner")}
          </span>
        </div>
      </div>

      {/* 2. Primary KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">{t("kpi_empaneled_centres")}</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{totalCentres}</p>
          <p className="text-xs text-slate-500 mt-1">{t("kpi_empaneled_sub")}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-700">{t("kpi_critical_flags")}</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-bold text-rose-600 mt-2">{criticalCentres}</p>
          <p className="text-xs text-rose-700 mt-1">{t("kpi_critical_sub")}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-700">{t("kpi_elevated_risk")}</span>
            <ShieldAlert className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-600 mt-2">{elevatedCentres}</p>
          <p className="text-xs text-amber-700 mt-1">{t("kpi_elevated_sub")}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700">{t("kpi_fully_compliant")}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-600 mt-2">{compliantCentres}</p>
          <p className="text-xs text-emerald-700 mt-1">{t("kpi_fully_sub")}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm col-span-2 sm:col-span-1 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">{t("kpi_national_index")}</span>
            <Layers className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-indigo-600 mt-2">{avgCompliance}%</p>
          <p className="text-xs text-slate-500 mt-1">{t("kpi_national_sub")}</p>
        </div>
      </div>

      {/* 3. Interactive 5-Step Real-World Inspection Workflow */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              {t("workflow_title")}
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              {t("workflow_subtitle")}
            </h2>
          </div>
          <span className="text-xs text-slate-500">{t("workflow_hint")}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {INSPECTION_STEPS.map((s) => {
            const isActive = s.step === activeStep;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  isActive 
                    ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-500 shadow-sm' 
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                    {s.step}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>}
                </div>
                <h3 className="font-bold text-xs text-slate-900 mt-2">{s.title}</h3>
                <p className="text-[11px] text-slate-500 mt-1">{s.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Step Explanation Card */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start space-x-3">
          <div className="p-2 bg-blue-100 text-blue-800 rounded-lg flex-shrink-0 mt-0.5">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">{INSPECTION_STEPS[activeStep - 1].title}</h4>
            <p className="leading-relaxed text-slate-600">{INSPECTION_STEPS[activeStep - 1].detail}</p>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Centres Directory & Trade Batch Roster */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-bold text-slate-900 text-sm">{t("centres_list_title")}</h2>
                <p className="text-xs text-slate-500">{t("centres_list_sub")}</p>
              </div>
              <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-semibold">
                {t("active_feeds")}
              </span>
            </div>

            <div className="space-y-2.5">
              {CANONICAL_CENTRES.map((centre) => {
                const isSelected = centre.centre_id === selectedCentre.centre_id;
                const isCritical = centre.compliance_status === 'CRITICAL';
                const isElevated = centre.compliance_status === 'ELEVATED_RISK';
                const isCompliant = centre.compliance_status === 'COMPLIANT';

                return (
                  <button
                    key={centre.centre_id}
                    onClick={() => setSelectedCentre(centre)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-500/50'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono font-bold text-slate-500">{centre.centre_id}</span>
                        <h3 className="text-sm font-bold text-slate-900 line-clamp-1 mt-0.5">{centre.name}</h3>
                        <p className="text-xs text-slate-500">{centre.district}, {centre.state}</p>
                      </div>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex-shrink-0 ${
                        isCritical ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                        isElevated ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                        isCompliant ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {centre.compliance_status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div className="flex items-center space-x-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t("present")}: <strong className="text-slate-800">{centre.attendance.ai_detected_headcount}</strong> / {centre.attendance.submitted_attendance}</span>
                      </div>
                      <div className="font-bold text-slate-900 text-xs">
                        {t("score")}: <span className={isCritical ? 'text-rose-600' : isElevated ? 'text-amber-600' : 'text-emerald-600'}>{centre.compliance_score}%</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sector & Batch Schedule Inspector */}
          <TradeBatchRoster centre={selectedCentre} />
        </div>

        {/* Right Column: Live Telemetry Inspection, Feeds, and Analytics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-mono px-2.5 py-0.5 bg-slate-100 text-slate-700 font-bold rounded-md">
                    {selectedCentre.centre_id}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 bg-blue-100 text-blue-700 font-semibold rounded-md">
                    {selectedCentre.scheme}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 bg-purple-100 text-purple-700 font-semibold rounded-md flex items-center gap-1">
                    <Wifi className="w-3 h-3" />
                    {selectedCentre.bandwidth_mode === 'LOW' ? 'Edge Low-BW (1 Frame/60s)' : 'Continuous 5 FPS'}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900">{selectedCentre.name}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{selectedCentre.address}</p>
              </div>

              <div className="text-left sm:text-right bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl">
                <span className="text-xs text-slate-500 font-medium">Compliance Index</span>
                <p className={`text-3xl font-extrabold ${
                  selectedCentre.compliance_status === 'CRITICAL' ? 'text-rose-600' :
                  selectedCentre.compliance_status === 'ELEVATED_RISK' ? 'text-amber-600' :
                  'text-emerald-600'
                }`}>
                  {selectedCentre.compliance_score}%
                </p>
                <span className="text-xs text-slate-500 font-medium">{t("compliance_formula")}</span>
              </div>
            </div>

            {/* Critical Alert Notice (If flagged) */}
            {selectedCentre.compliance_status === 'CRITICAL' && (
              <div className="bg-rose-50 border border-rose-300 rounded-xl p-4 text-xs text-rose-900 space-y-1.5">
                <div className="flex items-center space-x-2 font-bold text-rose-700 text-sm">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>CRITICAL DISCREPANCY: ATTENDANCE INFLATION & INVENTORY GAP DETECTED</span>
                </div>
                <p className="leading-relaxed text-xs">
                  Submitted register reported <strong>{selectedCentre.attendance.submitted_attendance} trainees</strong>. 
                  AI optical headcount detected <strong>only {selectedCentre.attendance.ai_detected_headcount} trainees</strong> physically present ({selectedCentre.attendance.discrepancy_percentage}% ghost inflation). Immediate physical inspection notice generated.
                </p>
              </div>
            )}

            {/* Interactive Tab Switcher: Cameras vs Real Roster vs Equipment BOM */}
            <div className="flex border-b border-slate-200 gap-2">
              <button
                onClick={() => setCentreViewTab('CAMERAS')}
                className={`pb-2.5 px-3 text-xs font-bold flex items-center space-x-1.5 transition-colors border-b-2 ${
                  centreViewTab === 'CAMERAS'
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>{t("tab_cameras")} ({selectedCentre.cameras_online}/{selectedCentre.total_cameras})</span>
              </button>

              <button
                onClick={() => setCentreViewTab('ROSTER')}
                className={`pb-2.5 px-3 text-xs font-bold flex items-center space-x-1.5 transition-colors border-b-2 ${
                  centreViewTab === 'ROSTER'
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>{t("tab_roster")} ({selectedCentre.trainees.length})</span>
              </button>

              <button
                onClick={() => setCentreViewTab('BOM')}
                className={`pb-2.5 px-3 text-xs font-bold flex items-center space-x-1.5 transition-colors border-b-2 ${
                  centreViewTab === 'BOM'
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Box className="w-4 h-4" />
                <span>{t("tab_bom")} ({selectedCentre.infrastructure.length})</span>
              </button>
            </div>

            {/* View 1: Live Cameras Grid */}
            {centreViewTab === 'CAMERAS' && (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-600">
                    Continuous Optical Verification (Centroids Only • DPDP 2023 Compliant)
                  </span>
                  <button
                    onClick={() => setShowDetections(!showDetections)}
                    className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                      showDetections ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{showDetections ? 'AI Annotations ON' : 'Raw Feed'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((camIndex) => {
                    const isOnline = camIndex <= selectedCentre.cameras_online;
                    const roomNames = ['Instruction Classroom', 'Machinery Workshop', 'IT Software Lab', 'Solar/Electrical Station'];
                    const roomName = roomNames[camIndex - 1];
                    // Real CCTV-style room footage — looks like actual live camera feed
                    const roomImages = [
                      '/images/feeds/room_cnc_cctv.jpg',     // Cam 1: workshop/classroom overhead
                      '/images/feeds/room_sewing_cctv.jpg',  // Cam 2: sewing machinery workshop
                      '/images/feeds/room_it_cctv.jpg',      // Cam 3: IT computer lab
                      '/images/feeds/room_solar_cctv.jpg',   // Cam 4: solar/electrical lab
                    ];
                    const roomImg = roomImages[camIndex - 1];

                    return (
                      <div 
                        key={camIndex} 
                        className={`bg-slate-950 rounded-2xl overflow-hidden border relative aspect-video flex flex-col justify-between p-3.5 shadow-md transition-all cursor-pointer group ${
                          activeCamIndex === camIndex ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-slate-800 hover:border-slate-700'
                        }`}
                        onClick={() => setActiveCamIndex(camIndex)}
                      >
                        {/* Real Camera Image Feed */}
                        {isOnline && (
                          <>
                            {/* Real CCTV room footage — slightly dimmed so overlays are readable */}
                            <img
                              src={roomImg}
                              alt={roomName}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              style={{ filter: 'brightness(0.5) saturate(0.8) contrast(1.05)' }}
                            />
                            {/* CCTV scan-line texture for authenticity */}
                            <div className="absolute inset-0 pointer-events-none opacity-15"
                              style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px)' }}
                            />
                            {/* Top bar gradient for label readability */}
                            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/80 to-transparent pointer-events-none"></div>
                            {/* Bottom gradient for stats readability */}
                            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/90 to-transparent pointer-events-none"></div>
                          </>
                        )}

                        <div className="flex items-center justify-between z-10">
                          <span className="text-xs font-mono text-white/90 bg-black/80 backdrop-blur-sm px-2.5 py-0.5 rounded-md font-semibold border border-slate-700">
                            CAM-0{camIndex}: {roomName}
                          </span>
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase shadow-sm ${
                            isOnline ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                          }`}>
                            {isOnline ? '● LIVE' : 'OFFLINE'}
                          </span>
                        </div>

                        {isOnline ? (
                          <div className="relative z-10 my-auto text-center py-1">
                            <div className="inline-block px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-cyan-400/40 shadow-lg">
                              <p className="text-xs text-cyan-300 font-extrabold font-mono flex items-center justify-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                                <span>AI Detecting: ~{Math.round(selectedCentre.attendance.ai_detected_headcount / selectedCentre.cameras_online)} persons</span>
                              </p>
                              <p className="text-[10px] text-emerald-400 font-mono mt-0.5">
                                Centroid mode • 0 faces stored (DPDP 2023)
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-slate-500 text-xs">
                            Camera Signal Interrupted
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-white/70 z-10 border-t border-white/10 pt-1.5">
                          <span className="bg-black/60 px-1.5 py-0.5 rounded text-[10px]">Mode: {selectedCentre.bandwidth_mode === 'LOW' ? '1 frame/min' : '5 fps stream'}</span>
                          <span className="font-mono bg-black/60 px-1.5 py-0.5 rounded text-[10px]">Latency: 48ms</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}



            {centreViewTab === 'ROSTER' && (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                  <div>
                    <span className="font-bold text-slate-800 text-sm block">
                      👆 उपस्थिति जाँच — Attendance Verification
                    </span>
                    <span className="text-slate-500 text-xs">
                      AEBAS बायोमेट्रिक पंच vs कैमरा से गिनती (Biometric log vs Camera headcount)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="flex items-center gap-1"><span className="text-base">👨</span> Male</span>
                    <span className="flex items-center gap-1"><span className="text-base">👩</span> Female</span>
                    <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">✅ Present</span>
                    <span className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">⚠️ Ghost</span>
                  </div>
                </div>

                {/* Summary bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center">
                    <p className="text-lg font-extrabold text-slate-900">{selectedCentre.trainees.length}</p>
                    <p className="text-slate-500 text-[11px]">कुल पंजीकृत<br/>(Total Registered)</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-center">
                    <p className="text-lg font-extrabold text-emerald-700">{selectedCentre.trainees.filter(t => t.status_in_camera === 'PRESENT').length}</p>
                    <p className="text-emerald-700 text-[11px]">कैमरे में दिखे<br/>(Camera Confirmed)</p>
                  </div>
                  <div className="bg-rose-50 border border-rose-200 rounded-lg p-2.5 text-center">
                    <p className="text-lg font-extrabold text-rose-600">{selectedCentre.trainees.filter(t => t.status_in_camera !== 'PRESENT').length}</p>
                    <p className="text-rose-600 text-[11px]">गायब / भूत<br/>(Ghost / Missing)</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-2.5 text-center">
                    <p className="text-lg font-extrabold text-purple-700">{selectedCentre.trainees.filter(t => t.gender === 'F').length}</p>
                    <p className="text-purple-700 text-[11px]">महिला प्रशिक्षु<br/>(Female Trainees)</p>
                  </div>
                </div>

                <div className="overflow-x-auto max-h-72 border border-slate-200 rounded-xl bg-slate-50/50">
                  <table className="min-w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200 sticky top-0">
                      <tr>
                        <th className="py-2.5 px-3">Candidate ID</th>
                        <th className="py-2.5 px-3">👤 Trainee Name<br/><span className="text-[10px] font-normal text-slate-400">(प्रशिक्षु का नाम)</span></th>
                        <th className="py-2.5 px-3">⏰ AEBAS Punch In</th>
                        <th className="py-2.5 px-3">📷 Camera Check<br/><span className="text-[10px] font-normal text-slate-400">(कैमरे से जाँच)</span></th>
                        <th className="py-2.5 px-3">🔍 Audit Finding</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {selectedCentre.trainees.map((t) => (
                        <tr key={t.candidate_id} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-mono font-bold text-slate-700 text-[11px]">{t.candidate_id}</td>
                          <td className="py-2 px-3 font-medium text-slate-900">
                            <div className="flex items-center gap-1.5">
                              <span className="text-base" title={t.gender === 'F' ? 'Female / महिला' : 'Male / पुरुष'}>
                                {t.gender === 'F' ? '👩' : '👨'}
                              </span>
                              <div>
                                <span className="font-bold text-slate-900">{t.name}</span>
                                <span className="block text-[10px] text-slate-400">{t.gender === 'F' ? 'Female (महिला)' : 'Male (पुरुष)'}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-3 font-mono text-emerald-700 font-semibold">{t.aebas_punch_in} AM</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 w-fit ${
                              t.status_in_camera === 'PRESENT' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {t.status_in_camera === 'PRESENT' ? '✅ ROOM में मौजूद' : '❌ ROOM में नहीं'}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              t.status_in_camera === 'PRESENT' ? 'text-emerald-700' : 'text-rose-700 font-extrabold'
                            }`}>
                              {t.status_in_camera === 'PRESENT' ? '✔ Genuine Present' : '⚠️ Ghost Fraud Detected'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* View 3: Sanctioned BOM Table */}
            {centreViewTab === 'BOM' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">
                    Mandatory Scheme Bill of Materials (BOM) Equipment Checklist
                  </span>
                  <span className="text-slate-500">35% Compliance Factor</span>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg border border-slate-200">
                  <table className="min-w-full text-xs text-left">
                    <thead className="text-xs font-semibold text-slate-600 uppercase border-b border-slate-200 bg-slate-50">
                      <tr>
                        <th className="py-2.5 px-3">Item ID</th>
                        <th className="py-2.5 px-3">Equipment Category</th>
                        <th className="py-2.5 px-3">Sanctioned BOM</th>
                        <th className="py-2.5 px-3">Detected Count</th>
                        <th className="py-2.5 px-3">Audit Status</th>
                        <th className="py-2.5 px-3">Confidence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedCentre.infrastructure.map((item) => (
                        <tr key={item.item_id} className="hover:bg-slate-50/60">
                          <td className="py-2.5 px-3 font-mono font-medium text-slate-700">{item.item_id}</td>
                          <td className="py-2.5 px-3 font-semibold text-slate-900">{item.name}</td>
                          <td className="py-2.5 px-3 text-slate-600">{item.sanctioned_count} units</td>
                          <td className="py-2.5 px-3 font-bold text-slate-900">{item.detected_count} units</td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              item.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700' :
                              item.status === 'DEFICIT' ? 'bg-amber-100 text-amber-700' :
                              'bg-rose-100 text-rose-700'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-500">{(item.confidence * 100).toFixed(0)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Temporal Attendance Arc Chart */}
          <AttendanceTimelineChart
            data={selectedCentre.attendance.hourly_timeline}
            centreName={selectedCentre.name}
          />

          {/* Seating Occupancy Grid Heatmap */}
          <SeatingHeatmap
            centreId={selectedCentre.centre_id}
            sanctionedCapacity={selectedCentre.sanctioned_capacity}
            detectedCount={selectedCentre.attendance.ai_detected_headcount}
          />
        </div>
      </div>
    </div>
  );
}
