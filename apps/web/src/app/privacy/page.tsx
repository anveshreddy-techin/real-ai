import React from 'react';
import Link from 'next/link';
import { Lock, ShieldCheck, EyeOff, FileText, CheckCircle, ArrowLeft } from 'lucide-react';

export default function PrivacyArchitecturePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      <div>
        <Link href="/" className="inline-flex items-center text-xs font-semibold text-blue-700 hover:text-blue-800 mb-3">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Command Center
        </Link>
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-100 text-blue-800 rounded-lg">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Privacy-Preserving Design & Architecture Note</h1>
            <p className="text-sm text-slate-500">SIH Problem Statement 26245 Mandatory Requirement: Aggregate Presence vs. Facial Surveillance</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="border-l-4 border-amber-500 pl-4 py-1">
          <h2 className="text-base font-bold text-slate-900">Governing Principle: Proportionality in Compliance Monitoring</h2>
          <p className="text-xs text-slate-600 mt-1">
            Detecting ghost attendance or missing training infrastructure requires verifying <em>how many trainees and equipment units are present</em>. 
            It does <strong>not</strong> require biometric profiling or facial identification of individual young trainees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-emerald-200 bg-emerald-50/40 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>What SkillGuard AI Extracts & Retains</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
              <li><strong>Integer headcounts</strong> (e.g. 18 physical bodies detected)</li>
              <li><strong>Anonymized centroid density</strong> (Grid heat distribution)</li>
              <li><strong>Equipment bounding boxes</strong> (Workbenches, sewing machines, PCs)</li>
              <li><strong>Temporal consistency metrics</strong> (Presence across class hours)</li>
              <li><strong>Signed cryptographic audit digests</strong> (~400 bytes JSON)</li>
            </ul>
          </div>

          <div className="border border-rose-200 bg-rose-50/40 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2 text-rose-800 font-bold text-sm">
              <EyeOff className="w-4 h-4 text-rose-600" />
              <span>What Is Strictly Prohibited & Scrubbed</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
              <li><strong>NO Facial Recognition</strong> or facial embedding generation</li>
              <li><strong>NO Trainee Biometrics</strong> or Aadhaar facial mapping</li>
              <li><strong>NO Raw Video Archival</strong> on cloud servers</li>
              <li><strong>NO Personal Tracking</strong> across sessions or classes</li>
              <li><strong>NO Demographic Profiling</strong> (Age, gender, religion, clothing)</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Regulatory Compliance Standards</h3>
          <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
            <p>
              1. <strong>Digital Personal Data Protection (DPDP) Act 2023:</strong> Full adherence to data minimization. Video feeds processed in volatile RAM buffers at the edge; raw pixels scrubbed in sub-second cycles.
            </p>
            <p>
              2. <strong>Decoupled Attendance Verification:</strong> The official Aadhaar-based biometric attendance system logs individual trainee identities at the entry gate. SkillGuard AI serves as an independent cross-checking validator by comparing total registered count with total physical presence inside the workshop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
