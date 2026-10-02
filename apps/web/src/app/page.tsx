'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CANONICAL_CENTRES, Centre } from '@/data/mockCentres';
import { AttendanceTimelineChart } from '@/components/charts/AttendanceTimelineChart';
import { SeatingHeatmap } from '@/components/ui/SeatingHeatmap';
import { IndiaMapOverview } from '@/components/ui/IndiaMapOverview';
import { PersonaRoleBanner } from '@/components/ui/PersonaRoleBanner';
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
  Sliders
} from 'lucide-react';

export default function NationalCommandPage() {
  const [selectedCentre, setSelectedCentre] = useState<Centre>(CANONICAL_CENTRES[0]);
  const [activeCamIndex, setActiveCamIndex] = useState<number>(1);
  const [showDetections, setShowDetections] = useState<boolean>(true);

  const totalCentres = CANONICAL_CENTRES.length;
  const criticalCentres = CANONICAL_CENTRES.filter(c => c.compliance_status === 'CRITICAL').length;
  const elevatedCentres = CANONICAL_CENTRES.filter(c => c.compliance_status === 'ELEVATED_RISK').length;
  const compliantCentres = CANONICAL_CENTRES.filter(c => c.compliance_status === 'COMPLIANT').length;
  const avgCompliance = (CANONICAL_CENTRES.reduce((acc, c) => acc + c.compliance_score, 0) / totalCentres).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 space-y-6">
      {/* Streamlined Executive Scheme Header */}
      <div className="bg-gradient-to-r from-[#07172A] via-[#0F294D] to-[#07172A] rounded-2xl p-6 text-white shadow-lg border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>SIH 26245 — AI-Based Real-Time Monitoring of Training Centres</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              National Training Centre Compliance Command Center
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Autonomous video analytics platform for the Ministry of Skill Development and Entrepreneurship (MSDE). Combines optical headcount verification, equipment BOM auditing, and low-bandwidth edge telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/uniqueness"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Why SkillGuard AI is Unique</span>
            </Link>
            <Link
              href="/pipeline"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white font-semibold rounded-xl text-xs transition-colors"
            >
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>Model & Benchmarks</span>
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white font-semibold rounded-xl text-xs transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Privacy Note</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Role-Adaptive Persona Banner */}
      <PersonaRoleBanner />

      {/* Primary KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Empaneled Centres</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{totalCentres}</p>
          <p className="text-xs text-slate-500 mt-1">Active monitored feeds</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-700">Critical Flags</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-bold text-rose-600 mt-2">{criticalCentres}</p>
          <p className="text-xs text-rose-700 mt-1">Severe ghost attendance</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-700">Elevated Risk</span>
            <ShieldAlert className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-600 mt-2">{elevatedCentres}</p>
          <p className="text-xs text-amber-700 mt-1">Equipment deficit queue</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700">Fully Compliant</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-600 mt-2">{compliantCentres}</p>
          <p className="text-xs text-emerald-700 mt-1">Roster & BOM verified</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm col-span-2 sm:col-span-1 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">National Index</span>
            <Layers className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-indigo-600 mt-2">{avgCompliance}%</p>
          <p className="text-xs text-slate-500 mt-1">Weighted compliance</p>
        </div>
      </div>

      {/* Prominent "Why SkillGuard AI is Unique" Showcase Card */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50/40 rounded-2xl border border-amber-200/80 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-amber-500 text-slate-950">
              <Sparkles className="w-5 h-5 font-bold" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                What Makes SkillGuard AI Unique for SIH 26245?
              </h2>
              <p className="text-xs text-slate-600">
                Solving the real-world integrity gap in skilling schemes without manual inspection delay or privacy violations.
              </p>
            </div>
          </div>
          <Link
            href="/uniqueness"
            className="inline-flex items-center text-xs font-bold text-amber-900 hover:text-amber-950 underline decoration-amber-400 decoration-2 underline-offset-4"
          >
            Read Complete Competitive Matrix & ROI Analysis →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-white/80 p-3.5 rounded-xl border border-amber-200/60 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>1. Zero-Face Privacy</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              Optical centroid counts only. 100% compliant with the DPDP Act 2023; no trainee biometric or facial tracking.
            </p>
          </div>

          <div className="bg-white/80 p-3.5 rounded-xl border border-amber-200/60 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-blue-800">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>2. Anti-Dropoff Tracking</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              Tracks persistence across the entire 4-hour class session, flagging "morning roll call & immediate exit" fraud.
            </p>
          </div>

          <div className="bg-white/80 p-3.5 rounded-xl border border-amber-200/60 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-purple-800">
              <Camera className="w-4 h-4 text-purple-600" />
              <span>3. Sanctioned BOM Auditor</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              Continuously verifies mandatory workbenches, machines, and tools, stopping temporary equipment borrowing.
            </p>
          </div>

          <div className="bg-white/80 p-3.5 rounded-xl border border-amber-200/60 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-amber-800">
              <Wifi className="w-4 h-4 text-amber-600" />
              <span>4. Rural Edge 2G/3G Mode</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              1 frame/min edge snapshot (11.2 Kbps) saves 99.4% data, allowing seamless deployment in remote rural centres.
            </p>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Centres Directory & GIS Spatial Overview */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-bold text-slate-900 text-sm">Empaneled Training Centres</h2>
                <p className="text-xs text-slate-500">Select centre to inspect telemetry</p>
              </div>
              <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-semibold">
                5 Active Feeds
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
                        <span>Present: <strong className="text-slate-800">{centre.attendance.ai_detected_headcount}</strong> / {centre.attendance.submitted_attendance}</span>
                      </div>
                      <div className="font-bold text-slate-900 text-xs">
                        Score: <span className={isCritical ? 'text-rose-600' : isElevated ? 'text-amber-600' : 'text-emerald-600'}>{centre.compliance_score}%</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* India GIS Spatial Distribution */}
          <IndiaMapOverview
            selectedCentreId={selectedCentre.centre_id}
            onSelectCentre={(centre) => setSelectedCentre(centre)}
          />
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
                <span className="text-xs text-slate-500 font-medium">Formula: 50% Att + 35% BOM + 15% Temp</span>
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

            {/* Live Camera Grid with Interactive Camera Selector */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-slate-600" />
                  <h3 className="text-sm font-bold text-slate-800">
                    Active Video Analytics Feeds ({selectedCentre.cameras_online}/{selectedCentre.total_cameras} Online)
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowDetections(!showDetections)}
                    className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                      showDetections ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{showDetections ? 'AI Annotations ON' : 'Raw Feed'}</span>
                  </button>
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    DPDP 2023: Centroids Only
                  </span>
                </div>
              </div>

              {/* Camera Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((camIndex) => {
                  const isOnline = camIndex <= selectedCentre.cameras_online;
                  const roomNames = ['Instruction Classroom', 'Machinery Workshop', 'IT Software Lab', 'Solar/Electrical Station'];
                  const roomName = roomNames[camIndex - 1];

                  return (
                    <div 
                      key={camIndex} 
                      className={`bg-slate-950 rounded-xl overflow-hidden border relative aspect-video flex flex-col justify-between p-3.5 shadow-sm transition-all ${
                        activeCamIndex === camIndex ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-800'
                      }`}
                      onClick={() => setActiveCamIndex(camIndex)}
                    >
                      <div className="flex items-center justify-between z-10">
                        <span className="text-xs font-mono text-white/90 bg-black/70 px-2 py-0.5 rounded font-semibold">
                          CAM-0{camIndex}: {roomName}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          isOnline ? 'bg-emerald-500 text-black' : 'bg-rose-500 text-white'
                        }`}>
                          {isOnline ? 'ACTIVE' : 'OFFLINE'}
                        </span>
                      </div>

                      {isOnline ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-900/50 via-slate-950/80 to-slate-950 text-center p-4">
                          <div className="space-y-1.5">
                            <Users className="w-8 h-8 text-amber-400 mx-auto opacity-80" />
                            <p className="text-sm text-slate-200 font-bold">
                              Occupancy: ~{Math.round(selectedCentre.attendance.ai_detected_headcount / selectedCentre.cameras_online)} trainees
                            </p>
                            {showDetections && (
                              <div className="inline-flex items-center space-x-1 px-2 py-0.5 bg-black/60 rounded border border-amber-400/40 text-[11px] text-amber-300 font-mono">
                                <span>Centroid X,Y Extracted • 0 Faces</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-slate-500 text-xs">
                          Camera Signal Interrupted
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-slate-400 z-10 border-t border-slate-800/80 pt-1.5">
                        <span>Mode: {selectedCentre.bandwidth_mode === 'LOW' ? '1 frame/min' : '5 fps stream'}</span>
                        <span className="font-mono">Latency: 48ms</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Approved Equipment & Infrastructure BOM Table */}
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/60 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Sanctioned Equipment Inventory Compliance (BOM)</h4>
                  <p className="text-xs text-slate-500">Autonomous verification against scheme-mandated minimum facilities</p>
                </div>
                <span className="text-xs font-semibold text-slate-600">35% Compliance Weight</span>
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
