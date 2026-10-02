'use client';

import React from 'react';
import Link from 'next/link';
import { CANONICAL_CENTRES } from '@/data/mockCentres';
import { Box, ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

export default function InfrastructurePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
      {/* Header */}
      <div>
        <Link href="/" className="inline-flex items-center text-xs font-semibold text-blue-700 hover:text-blue-800 mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Command Center
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Sanctioned Equipment & Infrastructure Compliance</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Continuous computer vision verification of workbenches, machinery, IT hardware, and safety gear against scheme BOM.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-xl text-xs text-amber-900 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Stops "Borrow-for-Inspection" Equipment Fraud</span>
          </div>
        </div>
      </div>

      {/* Grid of Centres & BOM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CANONICAL_CENTRES.map((centre) => {
          const isCritical = centre.compliance_status === 'CRITICAL';
          const isElevated = centre.compliance_status === 'ELEVATED_RISK';
          const totalItems = centre.infrastructure.length;
          const availableItems = centre.infrastructure.filter(i => i.status === 'AVAILABLE').length;

          return (
            <div 
              key={centre.centre_id} 
              className={`bg-white rounded-2xl border shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow ${
                isCritical ? 'border-rose-200' : isElevated ? 'border-amber-200' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-500">{centre.centre_id}</span>
                  <h2 className="font-bold text-base text-slate-900 mt-0.5">{centre.name}</h2>
                  <p className="text-xs text-slate-500">{centre.district}, {centre.state} • {centre.scheme}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                    isCritical ? 'bg-rose-100 text-rose-700' :
                    isElevated ? 'bg-amber-100 text-amber-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {availableItems}/{totalItems} Items Verified
                  </span>
                </div>
              </div>

              {/* Equipment Items List */}
              <div className="space-y-3">
                {centre.infrastructure.map((item) => {
                  const pct = Math.min(100, Math.round((item.detected_count / item.sanctioned_count) * 100));
                  const isAvail = item.status === 'AVAILABLE';

                  return (
                    <div key={item.item_id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                          <span className="text-xs text-slate-400 font-mono">Category: {item.category} • Confidence: {(item.confidence * 100).toFixed(0)}%</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-sm text-slate-900">{item.detected_count} / {item.sanctioned_count} units</span>
                          <span className={`block text-[10px] font-bold uppercase ${
                            isAvail ? 'text-emerald-700' : 'text-rose-600'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${isAvail ? 'bg-emerald-500' : 'bg-rose-500'}`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="text-slate-500">Autonomous Edge Detection Active</span>
                <Link 
                  href="/"
                  className="inline-flex items-center space-x-1 text-xs font-bold text-blue-700 hover:text-blue-800 hover:underline"
                >
                  <span>Inspect Live Feed</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
