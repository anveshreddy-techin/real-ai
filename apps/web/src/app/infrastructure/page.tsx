'use client';

import React from 'react';
import Link from 'next/link';
import { CANONICAL_CENTRES } from '@/data/mockCentres';
import { Box, ArrowLeft } from 'lucide-react';

export default function InfrastructurePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
      <div>
        <Link href="/" className="inline-flex items-center text-xs font-semibold text-blue-700 hover:text-blue-800 mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Command Center
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Sanctioned Equipment & Infrastructure Compliance</h1>
        <p className="text-xs text-slate-500">Autonomous visual verification of workbenches, machinery, IT hardware, and safety gear against sanctioned Scheme BOM</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CANONICAL_CENTRES.map((centre) => (
          <div key={centre.centre_id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-slate-500">{centre.centre_id}</span>
                <h3 className="font-bold text-sm text-slate-900">{centre.name}</h3>
                <p className="text-xs text-slate-500">{centre.district}, {centre.state}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                centre.compliance_status === 'CRITICAL' ? 'bg-rose-100 text-rose-700' :
                centre.compliance_status === 'ELEVATED_RISK' ? 'bg-amber-100 text-amber-700' :
                'bg-emerald-100 text-emerald-700'
              }`}>
                {centre.compliance_status}
              </span>
            </div>

            <div className="space-y-2">
              {centre.infrastructure.map((item) => (
                <div key={item.item_id} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
                  <div>
                    <p className="font-medium text-slate-800">{item.name}</p>
                    <span className="text-[10px] text-slate-400">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-slate-900">{item.detected_count} / {item.sanctioned_count}</span>
                    <span className={`ml-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                      item.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700' :
                      item.status === 'DEFICIT' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
