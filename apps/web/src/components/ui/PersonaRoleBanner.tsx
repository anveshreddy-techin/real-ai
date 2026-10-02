'use client';

import React from 'react';
import { useRole } from './RoleContext';
import { Shield, Info } from 'lucide-react';

export const PersonaRoleBanner = () => {
  const { role, roleTitle } = useRole();

  const roleTips: Record<string, string> = {
    CENTRAL_MONITOR: 'National overview: Monitoring nationwide fund integrity, cross-state compliance discrepancies, and critical biometric mismatch alerts.',
    STATE_INSPECTOR: 'State-level purview: Direct audit notices dispatchable to district training centres with persistent ghost attendance.',
    CENTRE_ADMIN: 'Self-inspection view: Verify your centre’s optical headcount match and equipment maintenance checklists before automated audit flags.',
    AUDITOR: 'Independent forensic audit: Inspect 30-min temporal consistency curves, low-bandwidth snapshot integrity, and equipment inventory variance.'
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs flex items-center justify-between text-slate-300">
      <div className="flex items-center space-x-2">
        <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
        <div>
          <span className="font-bold text-white mr-2">{roleTitle}:</span>
          <span className="text-slate-400">{roleTips[role]}</span>
        </div>
      </div>
      <span className="hidden md:inline-flex text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-amber-300 rounded border border-slate-700">
        Active Persona
      </span>
    </div>
  );
};
