import React from 'react';
import Link from 'next/link';
import { CANONICAL_CENTRES } from '@/data/mockCentres';
import { ArrowLeft, Building2, Users, Camera, Wifi } from 'lucide-react';

export default function CentresListPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
      <div>
        <Link href="/" className="inline-flex items-center text-xs font-semibold text-blue-700 hover:text-blue-800 mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Command Center
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Empaneled Vocational Training Centres</h1>
        <p className="text-xs text-slate-500">Directory of participating skilling institutions monitored under SIH26245</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CANONICAL_CENTRES.map((centre) => (
          <div key={centre.centre_id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-slate-500">{centre.centre_id}</span>
                <h3 className="font-bold text-sm text-slate-900 mt-0.5">{centre.name}</h3>
                <p className="text-xs text-slate-500">{centre.district}, {centre.state}</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                centre.compliance_status === 'CRITICAL' ? 'bg-rose-100 text-rose-700' :
                centre.compliance_status === 'ELEVATED_RISK' ? 'bg-amber-100 text-amber-700' :
                'bg-emerald-100 text-emerald-700'
              }`}>
                {centre.compliance_status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px]">Scheme</span>
                <span className="font-semibold text-slate-800">{centre.scheme}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Bandwidth</span>
                <span className="font-semibold text-slate-800">{centre.bandwidth_mode}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Headcount</span>
                <span className="font-semibold text-slate-800">{centre.attendance.ai_detected_headcount} / {centre.attendance.submitted_attendance}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Cameras</span>
                <span className="font-semibold text-slate-800">{centre.cameras_online} / {centre.total_cameras} Online</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="font-bold text-slate-900">Score: {centre.compliance_score}%</span>
              <Link href="/" className="text-blue-700 font-semibold hover:underline">
                View Telemetry →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
