'use client';

import React from 'react';
import Link from 'next/link';
import { Centre } from '@/data/mockCentres';
import { Users, Clock, Award, ShieldAlert, CheckCircle2, ArrowRight, Camera, Wrench } from 'lucide-react';

interface TradeBatchRosterProps {
  centre: Centre;
}

const TRADE_METADATA: { [key: string]: { tradeName: string; trainer: string; shift: string; sector: string } } = {
  'PMKVY-UP-GKP-0042': {
    tradeName: 'Apparel & Sewing Machine Operator (ASO-04)',
    trainer: 'Sunita Devi (NSDC Certified Level 4)',
    shift: 'Morning Shift: 09:00 - 13:00',
    sector: 'Apparel, Made-Ups & Home Furnishing'
  },
  'PMKVY-RJ-JDH-0015': {
    tradeName: 'Solar PV Installer / Suryamitra (SPI-01)',
    trainer: 'Rajesh Sharma (Skill Council Green Jobs)',
    shift: 'Morning Shift: 09:00 - 13:00',
    sector: 'Green Jobs & Renewable Energy'
  },
  'DDU-WB-MLD-0008': {
    tradeName: 'Domestic Data Entry Operator (DDEO-02)',
    trainer: 'Anup Roy (NASSCOM IT-ITeS SSC)',
    shift: 'Afternoon Shift: 11:00 - 15:00',
    sector: 'IT-ITeS & Digital Services'
  },
  'PMKVY-MH-NGP-0031': {
    tradeName: 'CNC Milling & Lathe Operator (CNC-01)',
    trainer: 'Vikram Patil (Capital Goods SSC)',
    shift: 'Morning Shift: 08:30 - 12:30',
    sector: 'Capital Goods & Automotive'
  },
  'PMKVY-HP-SMR-0019': {
    tradeName: 'Food & Beverage Service Steward (FBS-02)',
    trainer: 'Pooja Negi (Tourism & Hospitality SSC)',
    shift: 'Day Shift: 10:00 - 14:00',
    sector: 'Tourism & Hospitality'
  }
};

export const TradeBatchRoster: React.FC<TradeBatchRosterProps> = ({ centre }) => {
  const meta = TRADE_METADATA[centre.centre_id] || {
    tradeName: 'Vocational Skilling Batch',
    trainer: 'NSDC Certified Master Trainer',
    shift: 'Batch Shift: 09:00 - 13:00',
    sector: 'National Skills Qualification Framework (NSQF)'
  };

  const isCritical = centre.compliance_status === 'CRITICAL';
  const delta = centre.attendance.discrepancy_delta;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <Wrench className="w-4 h-4 text-blue-700" />
          <h3 className="font-bold text-sm text-slate-900">Active Trade & Batch Schedule</h3>
        </div>
        <span className="text-[11px] px-2 py-0.5 bg-blue-50 text-blue-700 font-semibold rounded border border-blue-200">
          NSQF Level 4
        </span>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <span className="text-[11px] text-slate-400 block font-medium">Trade & Sector</span>
          <p className="font-bold text-slate-900 text-sm mt-0.5">{meta.tradeName}</p>
          <p className="text-[11px] text-slate-500">{meta.sector}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Batch Schedule</span>
            <p className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {meta.shift}
            </p>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Certified Instructor</span>
            <p className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              {meta.trainer.split('(')[0]}
            </p>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-500">Official AEBAS Roster:</span>
            <span className="font-bold text-slate-900 font-mono">{centre.attendance.submitted_attendance} Registered</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-500">AI Visual Headcount:</span>
            <span className="font-bold text-blue-700 font-mono">{centre.attendance.ai_detected_headcount} Present</span>
          </div>
          <div className="flex justify-between items-center text-[11px] pt-1.5 border-t border-slate-200">
            <span className="text-slate-600 font-semibold">Integrity Status:</span>
            <span className={`font-bold font-mono ${isCritical ? 'text-rose-600' : 'text-emerald-700'}`}>
              {delta < 0 ? `${delta} (${centre.attendance.discrepancy_percentage}% ghost)` : 'Verified Match'}
            </span>
          </div>
        </div>

        <Link
          href="/studio"
          className="w-full inline-flex items-center justify-center space-x-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-colors shadow-sm"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Launch Live Video Studio for this Batch</span>
          <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </div>
    </div>
  );
};
