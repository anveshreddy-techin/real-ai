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
  ArrowLeft, 
  Download, 
  FileText, 
  Camera, 
  ShieldCheck, 
  UserCheck, 
  RefreshCw, 
  ExternalLink, 
  ChevronRight, 
  ShieldAlert, 
  Calendar, 
  Phone, 
  MapPin, 
  Check, 
  XCircle, 
  FileCheck 
} from 'lucide-react';
import { TRAINING_CENTRES_28, TrainingCentreRecord } from '@/data/trainingCentres28';
import { EVIDENCE_ITEMS, EvidenceRecord } from '@/data/evidenceData';
import { CORRECTIVE_ACTIONS, CorrectiveAction } from '@/data/correctiveActions';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function CentreDetailClient({ id }: { id: string }) {
  const { t } = useLanguage();
  const centreId = id || 'TC003';

  // Find centre or fallback to TC003
  const centre = useMemo(() => {
    return (
      TRAINING_CENTRES_28.find(c => c.id.toUpperCase() === centreId.toUpperCase()) ||
      TRAINING_CENTRES_28.find(c => c.id === 'TC003') ||
      TRAINING_CENTRES_28[0]
    );
  }, [centreId]);

  // Tab state
  const [activeTab, setActiveTab] = useState<'infra' | 'attendance' | 'evidence' | 'actions'>('infra');
  const [reportGenerated, setReportGenerated] = useState(false);
  const [isRescanning, setIsRescanning] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedReviewer, setSelectedReviewer] = useState(centre.reviewer.name);
  const [actionList, setActionList] = useState<CorrectiveAction[]>(() => {
    const list = CORRECTIVE_ACTIONS.filter(a => a.centreId.toUpperCase() === centre.id.toUpperCase());
    if (list.length === 0) {
      return [
        {
          id: `ACT-${centre.id}-01`,
          centreId: centre.id,
          centreName: centre.name,
          issue: 'Verify biometric punch logs with AI camera headcount',
          priority: centre.status === 'Critical' ? 'High' : 'Medium',
          owner: centre.reviewer.name,
          deadline: '18 Jun 2025',
          status: 'In Progress',
          category: 'Attendance'
        },
        {
          id: `ACT-${centre.id}-02`,
          centreId: centre.id,
          centreName: centre.name,
          issue: 'Upload clear geotagged photo for computer lab switchboard',
          priority: 'Low',
          owner: centre.reviewer.name,
          deadline: '20 Jun 2025',
          status: 'Open',
          category: 'Infrastructure'
        }
      ];
    }
    return list;
  });

  // Filter evidence items for this centre
  const centreEvidence = useMemo(() => {
    const items = EVIDENCE_ITEMS.filter(e => e.centreId.toUpperCase() === centre.id.toUpperCase());
    if (items.length > 0) return items;
    return EVIDENCE_ITEMS.slice(0, 4).map(e => ({
      ...e,
      centreId: centre.id,
      centreName: centre.name
    }));
  }, [centre]);

  // Handle Mark Resolved
  const toggleActionStatus = (actionId: string) => {
    setActionList(prev => prev.map(a => {
      if (a.id === actionId) {
        const nextStatus = a.status === 'Resolved' ? 'In Progress' : 'Resolved';
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  const handleGenerateReport = () => {
    setReportGenerated(true);
    setTimeout(() => {
      setReportGenerated(false);
    }, 3500);
  };

  const handleTriggerRescan = () => {
    setIsRescanning(true);
    setTimeout(() => {
      setIsRescanning(false);
    }, 1500);
  };

  // Infrastructure checklist data
  const infraItems = [
    { name: 'Computer Lab Workstations', spec: 'Min 25 PCs + UPS', observed: '26 PCs (23 functional)', status: 'PASS', score: '96%' },
    { name: 'Theory Classroom & Smart Board', spec: 'Min 30 seats + Projector', observed: '32 seats + Interactive Screen', status: 'PASS', score: '98%' },
    { name: 'AEBAS Biometric Punch Device', spec: 'RD-Service Geofenced', observed: 'Iris + Fingerprint active', status: 'PASS', score: '100%' },
    { name: 'Domain Lab Equipment', spec: 'NSDC Model Curriculum Kit', observed: centre.status === 'Critical' ? 'Shortage: 2 Multimeters missing' : 'All calibrated kits present', status: centre.status === 'Critical' ? 'ATTENTION' : 'PASS', score: centre.status === 'Critical' ? '65%' : '94%' },
    { name: 'Fire Safety Extinguisher & First Aid', spec: 'ABC Type certified valid till 2026', observed: centre.status === 'Critical' ? 'Extinguisher pressure low' : 'Inspection tag verified', status: centre.status === 'Critical' ? 'WARNING' : 'PASS', score: centre.status === 'Critical' ? '50%' : '100%' },
    { name: 'Separate Male / Female Sanitation', spec: 'Clean running water + hygiene audit', observed: '2 M / 2 F functional toilets', status: 'PASS', score: '92%' },
    { name: 'Power Backup & Generator', spec: 'Min 5kVA Inverter / DG Set', observed: '7.5kVA Online UPS installed', status: 'PASS', score: '95%' },
    { name: 'CCTV Feeds with Edge Compression', spec: 'Classroom & Entrance dual feed', observed: '2 / 2 Feeds operational (5 FPS)', status: 'PASS', score: '90%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Command Dashboard</span>
        </Link>

        <div className="text-xs text-slate-500 font-mono">
          Last Synced: Today, 09:42 AM IST
        </div>
      </div>

      {/* Header Banner matching Reference Design (Image 2 Panel 2) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">
                {centre.id}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                centre.status === 'Compliant' ? 'bg-emerald-100 text-emerald-800' :
                centre.status === 'Needs Review' ? 'bg-amber-100 text-amber-800' :
                'bg-rose-100 text-rose-800'
              }`}>
                ● {centre.status}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {centre.type}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {centre.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{centre.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{centre.contact}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>{centre.batches} Active Batches ({centre.attendance.registered} Enrolled)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleTriggerRescan}
              disabled={isRescanning}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRescanning ? 'animate-spin text-blue-600' : ''}`} />
              <span>{isRescanning ? 'Scanning Edge Feeds...' : 'Trigger Re-Scan'}</span>
            </button>

            <button
              onClick={() => setShowAssignModal(true)}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Assign Reviewer</span>
            </button>

            <button
              onClick={handleGenerateReport}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{reportGenerated ? 'Report Downloaded!' : 'Generate Report (PDF)'}</span>
            </button>
          </div>
        </div>

        {reportGenerated && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center space-x-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Compliance Audit Report Generated:</strong> Official PDF audit package for {centre.name} ({centre.id}) has been created with SHA-256 cryptographic verification seal.
            </span>
          </div>
        )}

        {/* Donut & Quick Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-slate-100 items-center">
          {/* Completeness Donut Chart matching Image 2 Panel 2 */}
          <div className="md:col-span-4 flex items-center space-x-5 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  strokeWidth="3.8"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={
                    centre.completeness.overall >= 80 ? 'text-emerald-500' :
                    centre.completeness.overall >= 60 ? 'text-amber-500' : 'text-rose-500'
                  }
                  strokeDasharray={`${centre.completeness.overall}, 100`}
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-extrabold text-slate-900">{centre.completeness.overall}%</span>
                <span className="text-[9px] uppercase font-bold text-slate-400">Complete</span>
              </div>
            </div>

            <div className="space-y-1.5 flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900">Completeness Index</h4>
              <p className="text-[11px] text-slate-500">
                Composite metric across physical verification, biometric AEBAS, and edge feeds.
              </p>
              <div className="pt-1">
                <span className="text-[11px] font-semibold text-slate-700">
                  Target Threshold: 80% (MSDE Std)
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown progress bars */}
          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 font-medium">Attendance</span>
                <span className="font-bold text-slate-900">{centre.completeness.attendance}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${centre.completeness.attendance}%` }}></div>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 font-medium">Infrastructure</span>
                <span className="font-bold text-slate-900">{centre.completeness.infra}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${centre.completeness.infra}%` }}></div>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 font-medium">Media & CCTV</span>
                <span className="font-bold text-slate-900">{centre.completeness.media}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: `${centre.completeness.media}%` }}></div>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 font-medium">Regulatory Audit</span>
                <span className="font-bold text-slate-900">{centre.completeness.other}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${centre.completeness.other}%` }}></div>
              </div>
            </div>
          </div>

          {/* Assigned Reviewer Card */}
          <div className="md:col-span-3 bg-blue-50/60 border border-blue-200/80 p-4 rounded-2xl flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">Assigned Auditor</span>
              <h4 className="text-sm font-bold text-slate-900">{selectedReviewer}</h4>
              <p className="text-xs text-slate-500">{centre.reviewer.role}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-blue-200/60 flex items-center justify-between text-[11px] text-slate-500">
              <span>Updated: {centre.reviewer.updated}</span>
              <span className="text-emerald-700 font-bold">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('infra')}
          className={`py-3 px-5 border-b-2 transition-all flex items-center space-x-2 ${
            activeTab === 'infra'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>Infrastructure Checklist</span>
        </button>

        <button
          onClick={() => setActiveTab('attendance')}
          className={`py-3 px-5 border-b-2 transition-all flex items-center space-x-2 ${
            activeTab === 'attendance'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Attendance Audit ({centre.attendance.rate}%)</span>
        </button>

        <button
          onClick={() => setActiveTab('evidence')}
          className={`py-3 px-5 border-b-2 transition-all flex items-center space-x-2 ${
            activeTab === 'evidence'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Supporting Documents ({centreEvidence.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('actions')}
          className={`py-3 px-5 border-b-2 transition-all flex items-center space-x-2 ${
            activeTab === 'actions'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Corrective Action Log ({actionList.length})</span>
        </button>
      </div>

      {/* Tab 1: Infrastructure Checklist */}
      {activeTab === 'infra' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Facility & Equipment Bill-of-Materials (BOM)</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Automated computer vision comparison against NSDC prescribed space and tooling benchmarks
              </p>
            </div>
            <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Automated Verification Active
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4">Facility / Equipment</th>
                  <th className="py-3 px-4">Prescribed Requirement</th>
                  <th className="py-3 px-4">Observed Condition</th>
                  <th className="py-3 px-4 text-center">AI Confidence</th>
                  <th className="py-3 px-4 text-right">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {infraItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      <span>{item.name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{item.spec}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{item.observed}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-600 font-bold">{item.score}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        item.status === 'PASS' ? 'bg-emerald-100 text-emerald-800' :
                        item.status === 'WARNING' ? 'bg-rose-100 text-rose-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status === 'PASS' && <Check className="w-3 h-3" />}
                        {item.status !== 'PASS' && <AlertTriangle className="w-3 h-3" />}
                        <span>{item.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Attendance Audit */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered Enrolment</span>
              <div className="mt-2 text-2xl font-extrabold text-slate-900">{centre.attendance.registered} Students</div>
              <p className="text-[11px] text-slate-400 mt-1">Across {centre.batches} authorized skill batches</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Present Today (AEBAS)</span>
              <div className="mt-2 text-2xl font-extrabold text-emerald-600">{centre.attendance.present} Students</div>
              <p className="text-[11px] text-slate-400 mt-1">{centre.attendance.rate}% biometric turn-out</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Inflation Risk</span>
              <div className={`mt-2 text-2xl font-extrabold ${centre.status === 'Critical' ? 'text-rose-600' : 'text-slate-900'}`}>
                {centre.status === 'Critical' ? '18.4% Discrepancy' : '0.0% Clean Match'}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">AI video headcount vs registered punches</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Trainer & Biometric Log Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-slate-500 font-medium">Trainer Verification</span>
                <div className="text-sm font-bold text-slate-900">Master Trainer: Ramesh Chandra (TOT Certified)</div>
                <div className="text-emerald-700 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Geofence GPS Authenticated (Lat 30.387, Long 79.324)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-slate-500 font-medium">Biometric Device ID</span>
                <div className="text-sm font-bold text-slate-900">Mantra MFS100 • SN: 981240182</div>
                <div className="text-slate-600">Sync Frequency: 15-minute batched JSON hash to MSDE portal</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Supporting Documents */}
      {activeTab === 'evidence' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Supporting Evidence Documents ({centreEvidence.length})</h3>
              <p className="text-xs text-slate-500 mt-0.5">Geotagged logs, lab photographs, and CCTV video feeds</p>
            </div>
            <Link
              href="/evidence"
              className="text-xs font-bold text-blue-700 hover:text-blue-800 hover:underline"
            >
              Open Global Evidence Review →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4">Evidence ID</th>
                  <th className="py-3 px-4">Document Type</th>
                  <th className="py-3 px-4">File Name</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4">Freshness</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {centreEvidence.map((ev) => (
                  <tr key={ev.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">{ev.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{ev.type}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{ev.fileName}</td>
                    <td className="py-3 px-4 text-slate-500">{ev.timestamp}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{ev.source}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ev.freshness === 'Fresh' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {ev.freshness}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        ev.status === 'Valid' ? 'bg-emerald-100 text-emerald-800' :
                        ev.status === 'Issue' ? 'bg-rose-100 text-rose-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {ev.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Corrective Action Log */}
      {activeTab === 'actions' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Corrective Action Log</h3>
              <p className="text-xs text-slate-500 mt-0.5">Remediation tickets assigned for {centre.name}</p>
            </div>
            <Link
              href="/review-queue"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline"
            >
              Open Global Corrective Action Queue →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4">Action ID</th>
                  <th className="py-3 px-4">Issue Description</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Owner</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {actionList.map((action) => (
                  <tr key={action.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">{action.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{action.issue}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        action.priority === 'High' ? 'bg-rose-100 text-rose-800' :
                        action.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {action.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{action.owner}</td>
                    <td className="py-3 px-4 text-slate-500">{action.deadline}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        action.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                        action.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {action.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => toggleActionStatus(action.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          action.status === 'Resolved'
                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {action.status === 'Resolved' ? 'Reopen' : 'Mark Resolved'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Assign Reviewer Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">Reassign Auditor / Reviewer</h3>
            <p className="text-xs text-slate-500">
              Assign responsible field inspector or MSDE nodal officer for {centre.name} ({centre.id}).
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Select Reviewer</label>
              <select
                value={selectedReviewer}
                onChange={(e) => setSelectedReviewer(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Priya Sharma (Field Officer)">Priya Sharma (Field Officer)</option>
                <option value="R. Singh (Field Inspector)">R. Singh (Field Inspector)</option>
                <option value="A. Gupta (Senior Auditor)">A. Gupta (Senior Auditor)</option>
                <option value="S. Khan (Nodal Officer)">S. Khan (Nodal Officer)</option>
              </select>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3">
              <button
                type="button"
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
