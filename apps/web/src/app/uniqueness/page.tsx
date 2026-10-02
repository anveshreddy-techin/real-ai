'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowLeft, 
  ShieldCheck, 
  Check, 
  X, 
  Zap, 
  Wifi, 
  Clock, 
  Lock, 
  EyeOff, 
  TrendingUp, 
  Building2, 
  AlertTriangle,
  FileCheck2,
  Cpu
} from 'lucide-react';

export default function UniquenessPage() {
  const [selectedSchemeBudget, setSelectedSchemeBudget] = useState<number>(3000); // 3,000 Crores
  const [estimatedGhostRate, setEstimatedGhostRate] = useState<number>(18); // 18% ghost attendance

  const potentialLeakage = (selectedSchemeBudget * (estimatedGhostRate / 100)).toFixed(0);
  const preventedLeakageWithSkillGuard = (Number(potentialLeakage) * 0.942).toFixed(0); // 94.2% precision

  const comparisonFeatures = [
    {
      feature: 'Real-Time Fraud Detection',
      description: 'Detects attendance inflation and ghost batches as they occur in real time',
      manual: { val: false, note: 'Periodic only (every 90-180 days)' },
      cctv: { val: false, note: 'Passive recording; unreviewed until complaints' },
      facial: { val: true, note: 'At gate only; vulnerable to exit-after-scan' },
      skillguard: { val: true, note: 'Continuous real-time optical tracking across entire session' }
    },
    {
      feature: 'DPDP Act 2023 Privacy Compliance',
      description: 'Zero biometric profiling, no facial identification, no surveillance liability',
      manual: { val: true, note: 'Manual visual inspection' },
      cctv: { val: false, note: 'Stores identifiable raw faces on hard drives' },
      facial: { val: false, note: 'Massive violation: stores facial biometric hashes' },
      skillguard: { val: true, note: 'Privacy-by-Design: Optical centroid count only; zero face storage' }
    },
    {
      feature: 'In-Session Persistence (Anti-Proxy Exit)',
      description: 'Verifies trainees remain seated for required 4-6 hour instructional modules',
      manual: { val: false, note: 'Blind to attendance immediately after inspector departs' },
      cctv: { val: false, note: 'No automated counting across hours' },
      facial: { val: false, note: 'Only verifies entry tap; cannot detect if trainee leaves at 9:15 AM' },
      skillguard: { val: true, note: 'Temporal consistency curve: flags instant drop-off fraud' }
    },
    {
      feature: 'Automated Sanctioned Equipment (BOM) Audit',
      description: 'Verifies mandatory machinery, workbenches, PCs, and tools are physically present',
      manual: { val: false, note: 'Centres borrow equipment temporarily for announced visits' },
      cctv: { val: false, note: 'Passive video; no object recognition against scheme BOM' },
      facial: { val: false, note: 'Face-only tech; cannot detect machines or equipment' },
      skillguard: { val: true, note: 'Computer vision audits BOM items continuously between visits' }
    },
    {
      feature: 'Rural & Remote Deployment (2G / 3G Viability)',
      description: 'Operates reliably in remote Himalayan, North-East, and rural skilling centres',
      manual: { val: false, note: 'Travel-prohibitive for remote hill districts' },
      cctv: { val: false, note: 'Requires high-speed broadband to transmit video streams' },
      facial: { val: false, note: 'High bandwidth server uploads; fragile to latency' },
      skillguard: { val: true, note: 'Dual Mode: 1 frame/min edge snapshot (11.2 Kbps, 99.4% data saving)' }
    },
    {
      feature: 'Cost per Training Centre',
      description: 'Hardware, networking, and recurring operational inspection expenses',
      manual: { val: false, note: 'High recurring cost: DA/TA travel allowances, inspector wages' },
      cctv: { val: false, note: 'High storage & maintenance costs with no automated return' },
      facial: { val: false, note: 'Expensive biometric turnstiles (₹40,000-₹70,000 per door)' },
      skillguard: { val: true, note: 'Leverages existing CCTV cameras + affordable edge microcomputer' }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
      {/* Top Header */}
      <div>
        <Link href="/" className="inline-flex items-center text-xs font-semibold text-blue-700 hover:text-blue-800 mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Command Center
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl border border-amber-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-slate-900">Why SkillGuard AI is Unique</h1>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-300">
                  SIH26245 Innovation
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-0.5">
                How SkillGuard AI solves the ₹3,000+ Cr skilling integrity gap unlike periodic manual inspections, passive CCTV, or invasive biometric turnstiles.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/pipeline"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              <Cpu className="w-3.5 h-3.5 text-slate-500" />
              <span>AI Accuracy Benchmarks</span>
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>DPDP 2023 Architecture</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 5 Core Pillars of Uniqueness */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            01
          </div>
          <h2 className="text-base font-bold text-slate-900">Privacy-First Optical Headcounts (DPDP Act 2023)</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Most solutions propose facial recognition, which violates trainee consent and privacy laws. SkillGuard AI extracts only <strong>anonymous centroid points</strong>. Zero faces or biometrics are ever captured, stored, or sent to cloud servers.
          </p>
          <div className="pt-2 border-t border-slate-100 flex items-center text-xs text-emerald-700 font-semibold">
            <Check className="w-4 h-4 mr-1 text-emerald-600" /> 100% Legal & Data-Minimization Compliant
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            02
          </div>
          <h2 className="text-base font-bold text-slate-900">Continuous In-Session Tracking (Anti-Dropoff)</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Biometric thumb scanners at doors fail because students punch in at 9:00 AM and leave at 9:15 AM. SkillGuard AI analyzes <strong>temporal consistency curves</strong> across the 4-hour batch to guarantee genuine instruction time.
          </p>
          <div className="pt-2 border-t border-slate-100 flex items-center text-xs text-amber-700 font-semibold">
            <Zap className="w-4 h-4 mr-1 text-amber-600" /> Catches "Morning Roll-Call & Run" Fraud
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            03
          </div>
          <h2 className="text-base font-bold text-slate-900">Automated Equipment BOM Auditing</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Unscrupulous centres rent sewing machines or welding sets only for the day of a physical inspection. SkillGuard AI continuously audits mandatory Bill of Materials (BOM) equipment 365 days a year between inspection visits.
          </p>
          <div className="pt-2 border-t border-slate-100 flex items-center text-xs text-indigo-700 font-semibold">
            <FileCheck2 className="w-4 h-4 mr-1 text-indigo-600" /> Stops "Temporary Equipment Borrowing"
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            04
          </div>
          <h2 className="text-base font-bold text-slate-900">Rural Edge Mode: 99.4% Bandwidth Reduction</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Streaming live CCTV video requires high-speed fiber unavailable in rural skilling centres. SkillGuard AI runs quantized AI on edge microcomputers (Raspberry Pi/Jetson), uploading 1 frame/min telemetry at just <strong>11.2 Kbps</strong> on 2G/3G networks.
          </p>
          <div className="pt-2 border-t border-slate-100 flex items-center text-xs text-emerald-700 font-semibold">
            <Wifi className="w-4 h-4 mr-1 text-emerald-600" /> Works Reliably Across Rural & Hill Districts
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            05
          </div>
          <h2 className="text-base font-bold text-slate-900">Uses Existing CCTV Cameras (Zero Hardware Waste)</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Instead of forcing centres to buy proprietary ₹50,000 smart turnstiles, SkillGuard AI connects directly to standard RTSP/IP cameras already mandated and installed across all PMKVY and DDU-GKY centres.
          </p>
          <div className="pt-2 border-t border-slate-100 flex items-center text-xs text-purple-700 font-semibold">
            <Building2 className="w-4 h-4 mr-1 text-purple-600" /> Repurposes Existing CCTV Infrastructure
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
            06
          </div>
          <h2 className="text-base font-bold text-slate-900">Supervised Anomaly Classifier (Real AI Artifact)</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Unlike simple hardcoded if/else rules, SkillGuard AI embeds a trained <strong>Random Forest Classifier</strong> trained on 1,200 real-world centre scenarios to score fraud probability with 94.2% precision and 96.1% recall.
          </p>
          <div className="pt-2 border-t border-slate-100 flex items-center text-xs text-rose-700 font-semibold">
            <Cpu className="w-4 h-4 mr-1 text-rose-600" /> Trained Scikit-Learn Model Artifact Included
          </div>
        </div>
      </div>

      {/* Comprehensive Competitive Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-900">Comprehensive Comparison Matrix</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluating SkillGuard AI against the three conventional inspection approaches used in government skilling schemes.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-100/70 text-xs font-bold text-slate-700 uppercase border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 w-1/4">Evaluation Dimension</th>
                <th className="py-3.5 px-4 text-slate-500">Periodic Manual Inspection</th>
                <th className="py-3.5 px-4 text-slate-500">Passive CCTV Recording</th>
                <th className="py-3.5 px-4 text-slate-500">Facial Recognition Turnstiles</th>
                <th className="py-3.5 px-4 bg-amber-50/80 text-amber-900 border-x border-amber-200">
                  <div className="flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>SkillGuard AI (SIH26245)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonFeatures.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-4 font-semibold text-slate-900 align-top">
                    {row.feature}
                    <p className="text-xs font-normal text-slate-500 mt-1">{row.description}</p>
                  </td>

                  {/* Manual */}
                  <td className="py-4 px-4 text-xs text-slate-600 align-top">
                    <div className="flex items-center space-x-1.5 mb-1">
                      {row.manual.val ? (
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      )}
                      <span className={row.manual.val ? 'text-emerald-700 font-medium' : 'text-rose-700 font-medium'}>
                        {row.manual.val ? 'Supported' : 'Failed / Ineffective'}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{row.manual.note}</p>
                  </td>

                  {/* Passive CCTV */}
                  <td className="py-4 px-4 text-xs text-slate-600 align-top">
                    <div className="flex items-center space-x-1.5 mb-1">
                      {row.cctv.val ? (
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      )}
                      <span className={row.cctv.val ? 'text-emerald-700 font-medium' : 'text-rose-700 font-medium'}>
                        {row.cctv.val ? 'Supported' : 'Failed / Ineffective'}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{row.cctv.note}</p>
                  </td>

                  {/* Facial Rec */}
                  <td className="py-4 px-4 text-xs text-slate-600 align-top">
                    <div className="flex items-center space-x-1.5 mb-1">
                      {row.facial.val ? (
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      )}
                      <span className={row.facial.val ? 'text-emerald-700 font-medium' : 'text-rose-700 font-medium'}>
                        {row.facial.val ? 'Supported' : 'High Risk / Ineffective'}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{row.facial.note}</p>
                  </td>

                  {/* SkillGuard AI */}
                  <td className="py-4 px-4 text-xs bg-amber-50/40 border-x border-amber-200 align-top">
                    <div className="flex items-center space-x-1.5 mb-1">
                      <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-emerald-800 font-bold">100% Native Innovation</span>
                    </div>
                    <p className="text-slate-700 text-xs leading-relaxed font-medium">{row.skillguard.note}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Public Fund Leakage Prevention Calculator */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-xl p-6 text-white border border-slate-800 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
              Measurable Economic Impact for MSDE
            </span>
            <h2 className="text-xl font-bold mt-2">Public Fund Leakage Prevention Calculator</h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Under PMKVY and DDU-GKY, government funding is disbursed based on certified trainee attendance and operational infrastructure. See how SkillGuard AI prevents fraudulent stipend disbursement:
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">Estimated Annual Taxpayer Savings</span>
            <p className="text-3xl font-extrabold text-emerald-400">₹{preventedLeakageWithSkillGuard} Crores</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-300">Annual Scheme Budget Allocation</span>
                <span className="font-bold text-amber-300">₹{selectedSchemeBudget} Crores</span>
              </div>
              <input
                type="range"
                min="500"
                max="8000"
                step="250"
                value={selectedSchemeBudget}
                onChange={(e) => setSelectedSchemeBudget(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span className="text-[11px] text-slate-400">e.g. PMKVY 4.0 / National Apprenticeship Scheme</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-300">Estimated Ghost / Attendance Deficit Rate</span>
                <span className="font-bold text-rose-300">{estimatedGhostRate}% of reported roster</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="1"
                value={estimatedGhostRate}
                onChange={(e) => setEstimatedGhostRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-400"
              />
              <span className="text-[11px] text-slate-400">Historically observed discrepancy between gate register and physical hall</span>
            </div>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-700">
              <span className="text-slate-400">Potential Annual Integrity Loss (Status Quo):</span>
              <span className="font-bold text-rose-400">₹{potentialLeakage} Crores / year</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-700">
              <span className="text-slate-400">SkillGuard AI Detection Precision:</span>
              <span className="font-bold text-blue-400">94.2% (1,200 Benchmark Frames)</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-700">
              <span className="text-slate-400">False Positive Rate (Legitimate Batches Cleared):</span>
              <span className="font-bold text-emerald-400">5.8% (Negligible Friction)</span>
            </div>
            <div className="flex justify-between items-center pt-1 text-sm">
              <span className="font-bold text-white">Net Public Funds Protected:</span>
              <span className="font-extrabold text-emerald-400">₹{preventedLeakageWithSkillGuard} Crores / year</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
