'use client';

import React from 'react';
import Link from 'next/link';
import { Centre } from '@/data/mockCentres';
import { 
  Users, 
  Clock, 
  Award, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Camera, 
  Wrench,
  Check,
  UserCheck,
  Phone,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

interface TradeBatchRosterProps {
  centre: Centre;
}

interface TrainerProfile {
  name: string;
  gender: 'Female' | 'Male';
  qualification: string;
  trainerId: string;
  experience: string;
  punchTime: string;
  status: 'VERIFIED_IN_ROOM' | 'ABSENT';
  phone: string;
  sector: string;
  tradeName: string;
  shift: string;
  photoEmoji: string;
}

const TRAINER_PROFILES: { [key: string]: TrainerProfile } = {
  'PMKVY-UP-GKP-0042': {
    name: 'Sunita Devi',
    gender: 'Female',
    qualification: 'NSDC Master Certified (Level 4 ASO)',
    trainerId: 'TR-2024-UP-4209',
    experience: '6 Years Industry Experience',
    punchTime: '08:45 AM (Aadhaar Verified)',
    status: 'VERIFIED_IN_ROOM',
    phone: '+91 98390 14209',
    sector: 'Apparel, Made-Ups & Home Furnishing',
    tradeName: 'Apparel & Sewing Machine Operator (ASO-04)',
    shift: 'Morning Shift: 09:00 - 13:00',
    photoEmoji: '👩‍🏫'
  },
  'PMKVY-RJ-JDH-0015': {
    name: 'Rajesh Sharma',
    gender: 'Male',
    qualification: 'SCGJ Certified Solar Master Trainer',
    trainerId: 'TR-2023-RJ-1502',
    experience: '8 Years Solar Grid Installation',
    punchTime: '08:30 AM (Aadhaar Verified)',
    status: 'VERIFIED_IN_ROOM',
    phone: '+91 94140 88215',
    sector: 'Green Jobs & Renewable Energy',
    tradeName: 'Solar PV Installer / Suryamitra (SPI-01)',
    shift: 'Morning Shift: 09:00 - 13:00',
    photoEmoji: '👨‍🏫'
  },
  'DDU-WB-MLD-0008': {
    name: 'Anup Roy',
    gender: 'Male',
    qualification: 'NASSCOM IT-ITeS SSC Certified Lead',
    trainerId: 'TR-2024-WB-0891',
    experience: '5 Years Corporate IT Systems',
    punchTime: '10:45 AM (Aadhaar Verified)',
    status: 'VERIFIED_IN_ROOM',
    phone: '+91 98301 77008',
    sector: 'IT-ITeS & Digital Services',
    tradeName: 'Domestic Data Entry Operator (DDEO-02)',
    shift: 'Afternoon Shift: 11:00 - 15:00',
    photoEmoji: '👨‍💻'
  },
  'PMKVY-MH-NGP-0031': {
    name: 'Vikram Patil',
    gender: 'Male',
    qualification: 'Capital Goods SSC Certified CNC Master',
    trainerId: 'TR-2022-MH-3199',
    experience: '11 Years Precision Machining',
    punchTime: '08:15 AM (Aadhaar Verified)',
    status: 'VERIFIED_IN_ROOM',
    phone: '+91 97654 33031',
    sector: 'Capital Goods & Automotive',
    tradeName: 'CNC Milling & Lathe Operator (CNC-01)',
    shift: 'Morning Shift: 08:30 - 12:30',
    photoEmoji: '👨‍🔧'
  },
  'PMKVY-HP-SMR-0019': {
    name: 'Pooja Negi',
    gender: 'Female',
    qualification: 'Tourism & Hospitality SSC Level 4',
    trainerId: 'TR-2025-HP-1904',
    experience: '4 Years 5-Star Hotel Hospitality',
    punchTime: '09:40 AM (Aadhaar Verified)',
    status: 'VERIFIED_IN_ROOM',
    phone: '+91 94180 55019',
    sector: 'Tourism & Hospitality',
    tradeName: 'Food & Beverage Service Steward (FBS-02)',
    shift: 'Day Shift: 10:00 - 14:00',
    photoEmoji: '👩‍💼'
  }
};

export const TradeBatchRoster: React.FC<TradeBatchRosterProps> = ({ centre }) => {
  const { t } = useLanguage();

  const trainer = TRAINER_PROFILES[centre.centre_id] || {
    name: 'Certified Master Trainer',
    gender: 'Male',
    qualification: 'NSDC Certified Master Trainer',
    trainerId: 'TR-2024-GEN-001',
    experience: '5 Years Vocational Experience',
    punchTime: '09:00 AM (Aadhaar Verified)',
    status: 'VERIFIED_IN_ROOM',
    phone: '+91 98000 00000',
    sector: 'National Skills Qualification Framework (NSQF)',
    tradeName: 'Vocational Skilling Batch',
    shift: 'Batch Shift: 09:00 - 13:00',
    photoEmoji: '👨‍🏫'
  };

  const isCritical = centre.compliance_status === 'CRITICAL';
  const delta = centre.attendance.discrepancy_delta;

  // Gender Breakdown from actual trainees
  const maleCount = centre.trainees?.filter(t => t.gender === 'M').length || Math.round(centre.sanctioned_capacity * 0.6);
  const femaleCount = centre.trainees?.filter(t => t.gender === 'F').length || Math.round(centre.sanctioned_capacity * 0.4);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <Wrench className="w-4 h-4 text-blue-700" />
          <h3 className="font-bold text-sm text-slate-900">Trade & Instructor Roster</h3>
        </div>
        <span className="text-[11px] px-2 py-0.5 bg-blue-50 text-blue-700 font-bold rounded border border-blue-200">
          NSQF Level 4
        </span>
      </div>

      {/* Trade & Sector info */}
      <div className="space-y-1">
        <span className="text-[11px] text-slate-500 font-medium">Trade & Sector (कौशल पाठ्यक्रम)</span>
        <p className="font-bold text-slate-900 text-sm">{trainer.tradeName}</p>
        <p className="text-xs text-slate-500">{trainer.sector}</p>
      </div>

      {/* Certified Trainer Profile Card with Human Avatar */}
      <div className="p-3.5 bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-xl border border-blue-100/80 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-blue-100/60 pb-2">
          <div className="flex items-center gap-1.5 text-blue-900">
            <Award className="w-4 h-4 text-amber-500" />
            <span>{t('trainer')}: Approved Instructor</span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
            <UserCheck className="w-3 h-3 text-emerald-600" />
            {t('present')}
          </span>
        </div>

        <div className="flex items-center space-x-3.5">
          {/* Trainer Avatar Photo */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-700 via-indigo-600 to-amber-400 flex items-center justify-center text-2xl shadow-md border-2 border-white">
              {trainer.photoEmoji}
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-900 text-sm leading-tight truncate">{trainer.name}</h4>
              <span className="text-xs">{trainer.gender === 'Female' ? `👩 (${t('female')})` : `👨 (${t('male')})`}</span>
            </div>
            <p className="text-[11px] text-blue-700 font-semibold">{trainer.qualification}</p>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">ID: {trainer.trainerId} • {trainer.experience}</p>
          </div>
        </div>

        {/* Shift Timing & Punch Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-200/60">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{trainer.shift}</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="truncate">In: {trainer.punchTime}</span>
          </div>
        </div>
      </div>

      {/* Trainees Human Demographics (Male / Female split) */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>{t('attendance_audit')}: Student Headcount</span>
          </span>
          <span className="font-mono text-xs font-semibold text-slate-500">
            Total: {centre.attendance.submitted_attendance}
          </span>
        </div>

        {/* Visual Male / Female Counter Pills */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-lg">👨</span>
              <div>
                <span className="font-bold text-slate-800 block text-xs">{t('male')}</span>
                <span className="text-[10px] text-slate-400">Trainees</span>
              </div>
            </div>
            <span className="text-sm font-extrabold text-blue-700">{maleCount}</span>
          </div>

          <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-lg">👩</span>
              <div>
                <span className="font-bold text-slate-800 block text-xs">{t('female')}</span>
                <span className="text-[10px] text-slate-400">Trainees</span>
              </div>
            </div>
            <span className="text-sm font-extrabold text-purple-700">{femaleCount}</span>
          </div>
        </div>

        {/* Headcount Match vs Ghost comparison */}
        <div className="space-y-1.5 pt-1 text-xs">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-600">{t('biometric_submitted')}:</span>
            <span className="font-bold text-slate-900 font-mono">{centre.attendance.submitted_attendance} Students</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-600">{t('camera_detected')}:</span>
            <span className="font-bold text-blue-700 font-mono">{centre.attendance.ai_detected_headcount} {t('present')}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-200 font-semibold">
            <span className="text-slate-700">Audit Status:</span>
            <span className={`font-mono font-bold ${isCritical ? 'text-rose-600' : 'text-emerald-700'}`}>
              {delta < 0 ? `⚠️ ${Math.abs(delta)} ${t('absent_ghost')} (${centre.attendance.discrepancy_percentage}%)` : `✅ ${t('verified_match')}`}
            </span>
          </div>
        </div>
      </div>

      {/* Non-Educated Easy Multilingual Understanding Card */}
      <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
        <div className="flex items-center space-x-1.5 font-bold text-amber-900 text-[11px]">
          <HelpCircle className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
          <span>{t('easy_guide_title')}</span>
        </div>
        <p className="text-[11px] leading-relaxed text-amber-900/90">
          {t('easy_guide_desc')}
        </p>
      </div>

      {/* Action Button */}
      <Link
        href="/studio"
        className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
      >
        <Camera className="w-4 h-4" />
        <span>{t('launch_studio')}</span>
        <ArrowRight className="w-3.5 h-3.5 ml-1" />
      </Link>
    </div>
  );
};
