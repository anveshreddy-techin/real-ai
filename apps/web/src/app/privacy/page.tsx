'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  CheckCircle, 
  ArrowLeft, 
  FileText, 
  Cpu, 
  HardDrive, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

export default function PrivacyArchitecturePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
      {/* Top Header */}
      <div>
        <Link href="/" className="inline-flex items-center text-xs font-semibold text-blue-700 hover:text-blue-800 mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Command Center
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-700 rounded-xl border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-slate-900">Privacy-Preserving Design Architecture</h1>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-300">
                  DPDP Act 2023 Compliant
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-0.5">
                SIH26245 Deliverable 3: Explicit specification of what is and isn't identified, legal compliance, and zero biometric profiling.
              </p>
            </div>
          </div>

          <Link
            href="/uniqueness"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>Why SkillGuard AI is Unique →</span>
          </Link>
        </div>
      </div>

      {/* Governing Principle Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl p-6 text-white shadow-md space-y-2">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
          Core Philosophical Principle
        </span>
        <h2 className="text-xl font-bold">Proportionality in Compliance Monitoring</h2>
        <p className="text-sm text-slate-200 leading-relaxed max-w-4xl">
          Verifying training centre integrity requires confirming <em>how many trainees and equipment units are physically present in the workshop</em>. It does <strong>never require identifying who each trainee is</strong> or cataloging their facial features. SkillGuard AI treats classrooms like an anonymous optical turnstile, preserving dignity and constitutional privacy.
        </p>
      </div>

      {/* Side-by-Side: What IS vs What IS NOT Identified */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Permitted & Extracted */}
        <div className="bg-white rounded-xl border border-emerald-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-emerald-800 font-bold text-base border-b border-emerald-100 pb-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>What SkillGuard AI Extracts & Retains</span>
          </div>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
              <div>
                <strong className="text-slate-900">Anonymous Integer Headcounts:</strong>
                <p className="text-xs text-slate-500 mt-0.5">e.g. 18 physical human bodies detected in Room 1 at 11:30 AM.</p>
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
              <div>
                <strong className="text-slate-900">Centroid Heatmap Coordinates:</strong>
                <p className="text-xs text-slate-500 mt-0.5">X, Y center points of bounding boxes to verify seat occupancy spread across workbenches.</p>
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
              <div>
                <strong className="text-slate-900">Equipment Bill of Materials (BOM) Detection:</strong>
                <p className="text-xs text-slate-500 mt-0.5">Counts of machines, safety kits, laptops, and solar test kits against approved scheme sanction.</p>
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
              <div>
                <strong className="text-slate-900">Temporal Session Consistency Curve:</strong>
                <p className="text-xs text-slate-500 mt-0.5">Aggregation curve showing room occupancy over consecutive hourly snapshots to prevent drop-off fraud.</p>
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
              <div>
                <strong className="text-slate-900">Cryptographically Signed Telemetry:</strong>
                <p className="text-xs text-slate-500 mt-0.5">Lightweight SHA-256 JSON hashes (~400 bytes) sent upstream to state and central servers.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Strictly Forbidden & Scrubbed */}
        <div className="bg-white rounded-xl border border-rose-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-rose-800 font-bold text-base border-b border-rose-100 pb-3">
            <EyeOff className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <span>What is Strictly Prohibited & Scrubbed</span>
          </div>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0"></span>
              <div>
                <strong className="text-slate-900">NO Facial Recognition:</strong>
                <p className="text-xs text-slate-500 mt-0.5">No facial embeddings, no face mesh coordinates, and no face recognition models loaded.</p>
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0"></span>
              <div>
                <strong className="text-slate-900">NO Trainee Biometrics or Aadhaar Linking:</strong>
                <p className="text-xs text-slate-500 mt-0.5">Camera telemetry has zero linkage to student names, Aadhaar numbers, phone numbers, or addresses.</p>
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0"></span>
              <div>
                <strong className="text-slate-900">NO Cloud Video Archival:</strong>
                <p className="text-xs text-slate-500 mt-0.5">Raw video feeds are never saved or uploaded to central servers; analyzed purely in volatile RAM at the edge.</p>
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0"></span>
              <div>
                <strong className="text-slate-900">NO Cross-Session Trainee Tracking:</strong>
                <p className="text-xs text-slate-500 mt-0.5">No re-identification algorithms or tracking of individual movements across different rooms or dates.</p>
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0"></span>
              <div>
                <strong className="text-slate-900">NO Demographic Profiling:</strong>
                <p className="text-xs text-slate-500 mt-0.5">No classification of age, gender, caste, religion, clothing, or emotional state.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Visual Data Ingestion Lifecycle Diagram */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div>
          <h2 className="text-base font-bold text-slate-900">End-to-End Data Lifecycle & Volatile RAM Buffer</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            How video frames move through SkillGuard AI with sub-second pixel erasure at the local edge node.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[11px] font-bold rounded">Step 1: Capture</span>
            <p className="text-sm font-bold text-slate-900">RTSP Video Feed</p>
            <p className="text-xs text-slate-500">Camera captures classroom feed directly to local edge device RAM buffer.</p>
          </div>

          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-2">
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[11px] font-bold rounded">Step 2: Infer</span>
            <p className="text-sm font-bold text-indigo-950">YOLOv8 Optical Counter</p>
            <p className="text-xs text-indigo-900">Centroids and equipment bounding boxes calculated on-device in 48ms.</p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[11px] font-bold rounded">Step 3: Purge</span>
            <p className="text-sm font-bold text-amber-950">Sub-Second Pixel Wipe</p>
            <p className="text-xs text-amber-900">Raw image buffer in RAM is flushed immediately. Zero disk storage of pixels.</p>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded">Step 4: Transmit</span>
            <p className="text-sm font-bold text-emerald-950">Signed JSON Telemetry</p>
            <p className="text-xs text-emerald-900">Only 400-byte encrypted telemetry packet sent upstream to MSDE dashboard.</p>
          </div>
        </div>
      </div>

      {/* Statutory Alignment with DPDP Act 2023 */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Statutory Alignment with Digital Personal Data Protection (DPDP) Act 2023</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900">Section 6: Purpose Limitation</span>
            <p className="text-slate-600 leading-relaxed">
              Video data is utilized solely for counting physical presence and equipment availability for scheme audits. No secondary or surveillance use is technically possible.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900">Section 8: Data Minimization</span>
            <p className="text-slate-600 leading-relaxed">
              Zero personally identifiable information (PII) is captured. The system reduces high-resolution video streams down to simple numerical headcount integers.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900">Section 9: Child & Youth Protection</span>
            <p className="text-slate-600 leading-relaxed">
              Many skilling beneficiaries are young adults (18-23 years old). By avoiding facial capture, trainees are protected from biometric profiling and cyber vulnerabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
