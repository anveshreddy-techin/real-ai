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
  MapPin
} from 'lucide-react';

export default function NationalCommandPage() {
  const [selectedCentre, setSelectedCentre] = useState<Centre>(CANONICAL_CENTRES[0]);

  const totalCentres = CANONICAL_CENTRES.length;
  const criticalCentres = CANONICAL_CENTRES.filter(c => c.compliance_status === 'CRITICAL').length;
  const elevatedCentres = CANONICAL_CENTRES.filter(c => c.compliance_status === 'ELEVATED_RISK').length;
  const compliantCentres = CANONICAL_CENTRES.filter(c => c.compliance_status === 'COMPLIANT').length;
  const avgCompliance = (CANONICAL_CENTRES.reduce((acc, c) => acc + c.compliance_score, 0) / totalCentres).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0A2540] via-[#1E3A8A] to-[#0A2540] rounded-xl p-6 text-white shadow-lg border border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-semibold text-amber-300 mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>SIH26245 — Real-Time Compliance Surveillance Active</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">National Skilling Centre Compliance Command Center</h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Automated video analytics cross-referencing physical attendance headcounts and approved infrastructure items across empaneled MSDE training centres.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/privacy"
              className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-600 rounded-lg text-xs font-medium text-slate-200 transition-colors"
            >
              Privacy Architecture Note
            </Link>
            <Link
              href="/pipeline"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-xs transition-colors shadow-sm"
            >
              Accuracy Assessment
            </Link>
          </div>
        </div>
      </div>

      {/* Role-Adaptive Persona Banner */}
      <PersonaRoleBanner />

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Monitored Centres</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{totalCentres}</p>
          <p className="text-[11px] text-slate-500 mt-1">Empaneled in active schemes</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/20 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-rose-700">Critical Flags</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-bold text-rose-600 mt-2">{criticalCentres}</p>
          <p className="text-[11px] text-rose-700 mt-1">Severe ghost/inventory gaps</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/20 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-amber-700">Elevated Risk</span>
            <ShieldAlert className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-600 mt-2">{elevatedCentres}</p>
          <p className="text-[11px] text-amber-700 mt-1">Priority audit recommended</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-700">Fully Compliant</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-600 mt-2">{compliantCentres}</p>
          <p className="text-[11px] text-emerald-700 mt-1">Attendance & BOM verified</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Avg Compliance</span>
            <Layers className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-indigo-600 mt-2">{avgCompliance}%</p>
          <p className="text-[11px] text-slate-500 mt-1">Weighted nationwide index</p>
        </div>
      </div>

      {/* Main Command Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Centres Directory & GIS Map */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-semibold text-slate-900 text-sm">Empaneled Training Centres</h2>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">5 Active Feeds</span>
            </div>

            <div className="space-y-2">
              {CANONICAL_CENTRES.map((centre) => {
                const isSelected = centre.centre_id === selectedCentre.centre_id;
                const isCritical = centre.compliance_status === 'CRITICAL';
                const isElevated = centre.compliance_status === 'ELEVATED_RISK';
                const isCompliant = centre.compliance_status === 'COMPLIANT';

                return (
                  <button
                    key={centre.centre_id}
                    onClick={() => setSelectedCentre(centre)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-mono font-semibold text-slate-500">{centre.centre_id}</span>
                        <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{centre.name}</h3>
                        <p className="text-[11px] text-slate-500 mt-0.5">{centre.district}, {centre.state}</p>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        isCritical ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                        isElevated ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                        isCompliant ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {centre.compliance_status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-100">
                      <div className="flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>Att: {centre.attendance.ai_detected_headcount} / {centre.attendance.submitted_attendance}</span>
                      </div>
                      <div className="font-semibold text-slate-900">
                        Score: {centre.compliance_score}%
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* India GIS Spatial Overview */}
          <IndiaMapOverview
            selectedCentreId={selectedCentre.centre_id}
            onSelectCentre={(centre) => setSelectedCentre(centre)}
          />
        </div>

        {/* Right Column: Live Centre Telemetry Inspection */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 text-slate-700 font-bold rounded">
                    {selectedCentre.centre_id}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 font-semibold rounded">
                    {selectedCentre.scheme}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 font-semibold rounded flex items-center gap-1">
                    <Wifi className="w-3 h-3" />
                    Mode: {selectedCentre.bandwidth_mode === 'LOW' ? '1 Frame/60s (Edge Low-BW)' : '5 FPS Stream'}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-1">{selectedCentre.name}</h2>
                <p className="text-xs text-slate-500">{selectedCentre.address}</p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500">Compliance Score</span>
                <p className={`text-3xl font-extrabold ${
                  selectedCentre.compliance_status === 'CRITICAL' ? 'text-rose-600' :
                  selectedCentre.compliance_status === 'ELEVATED_RISK' ? 'text-amber-600' :
                  'text-emerald-600'
                }`}>
                  {selectedCentre.compliance_score}%
                </p>
              </div>
            </div>

            {/* Canonical Scenario Alert Callout if Critical */}
            {selectedCentre.compliance_status === 'CRITICAL' && (
              <div className="bg-rose-50 border border-rose-300 rounded-lg p-4 text-xs text-rose-900">
                <div className="flex items-center space-x-2 font-bold text-rose-700 mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span>SEVERE DISCREPANCY DETECTED: GHOST ATTENDANCE & INVENTORY GAP</span>
                </div>
                <p>
                  Submitted register claims <strong>{selectedCentre.attendance.submitted_attendance} trainees</strong> present. 
                  AI optical headcount detected <strong>only {selectedCentre.attendance.ai_detected_headcount} trainees</strong> across all camera feeds ({selectedCentre.attendance.discrepancy_percentage}% inflation).
                </p>
              </div>
            )}

            {/* Visual Camera Feeds Mock Grid */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-slate-500" />
                  Live Camera Feeds ({selectedCentre.cameras_online}/{selectedCentre.total_cameras} Online)
                </h3>
                <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Privacy Enforced: Aggregate Headcount Only
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((camIndex) => {
                  const isOnline = camIndex <= selectedCentre.cameras_online;
                  return (
                    <div key={camIndex} className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 relative aspect-video flex flex-col justify-between p-3">
                      <div className="flex items-center justify-between z-10">
                        <span className="text-[10px] font-mono text-white/80 bg-black/50 px-1.5 py-0.5 rounded">
                          CAM-0{camIndex}: Room {camIndex}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                          isOnline ? 'bg-emerald-500 text-black' : 'bg-rose-500 text-white'
                        }`}>
                          {isOnline ? 'LIVE FEED' : 'OFFLINE'}
                        </span>
                      </div>

                      {isOnline ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-900/60 to-slate-950/90 text-center p-4">
                          <div className="space-y-1">
                            <Users className="w-8 h-8 text-amber-400 mx-auto opacity-70" />
                            <p className="text-xs text-slate-300 font-medium">Headcount in Zone: ~{Math.round(selectedCentre.attendance.ai_detected_headcount / selectedCentre.cameras_online)} persons</p>
                            <p className="text-[10px] text-slate-500 font-mono">Edge Anonymization: Centroids Extracted</p>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-slate-600 text-xs">
                          Camera Connection Lost
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[10px] text-slate-400 z-10">
                        <span>Rate: {selectedCentre.bandwidth_mode === 'LOW' ? '1 frame/min' : '5 fps'}</span>
                        <span>Snapshot 11:30:00 UTC</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Discrepancy Breakdown Table */}
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Sanctioned Equipment Compliance</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs text-left">
                  <thead className="text-[11px] font-semibold text-slate-500 uppercase border-b border-slate-200">
                    <tr>
                      <th className="py-2">Item ID</th>
                      <th className="py-2">Equipment Category</th>
                      <th className="py-2">Sanctioned BOM</th>
                      <th className="py-2">Detected Count</th>
                      <th className="py-2">Audit Status</th>
                      <th className="py-2">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedCentre.infrastructure.map((item) => (
                      <tr key={item.item_id}>
                        <td className="py-2 font-mono font-medium text-slate-700">{item.item_id}</td>
                        <td className="py-2 font-semibold text-slate-900">{item.name}</td>
                        <td className="py-2 text-slate-600">{item.sanctioned_count} units</td>
                        <td className="py-2 font-semibold text-slate-900">{item.detected_count} units</td>
                        <td className="py-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            item.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700' :
                            item.status === 'DEFICIT' ? 'bg-amber-100 text-amber-700' :
                            'bg-rose-100 text-rose-700'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-2 font-mono text-slate-500">{(item.confidence * 100).toFixed(0)}%</td>
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
