'use client';

import React from 'react';
import { useRole, UserRole } from './RoleContext';
import { UserCheck } from 'lucide-react';

export const RoleSwitcher = () => {
  const { role, setRole } = useRole();

  const roles: { id: UserRole; label: string }[] = [
    { id: 'CENTRAL_MONITOR', label: 'Central MSDE' },
    { id: 'STATE_INSPECTOR', label: 'State SSDM' },
    { id: 'CENTRE_ADMIN', label: 'Centre Admin' },
    { id: 'AUDITOR', label: 'Tech Auditor' },
  ];

  return (
    <div className="flex items-center space-x-1.5 bg-[#0B1E36] px-2.5 py-1.5 rounded-lg border border-slate-700/80 shadow-inner">
      <UserCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
      <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">Role:</span>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as UserRole)}
        className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer text-xs pr-1"
      >
        {roles.map((r) => (
          <option key={r.id} value={r.id} className="bg-[#0B1E36] text-white">
            {r.label}
          </option>
        ))}
      </select>
    </div>
  );
};
