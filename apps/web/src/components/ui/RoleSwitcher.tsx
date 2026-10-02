'use client';

import React from 'react';
import { useRole, UserRole } from './RoleContext';
import { UserCheck } from 'lucide-react';

export const RoleSwitcher = () => {
  const { role, setRole, roleTitle } = useRole();

  const roles: { id: UserRole; label: string }[] = [
    { id: 'CENTRAL_MONITOR', label: 'Central MSDE' },
    { id: 'STATE_INSPECTOR', label: 'State SSDM' },
    { id: 'CENTRE_ADMIN', label: 'Centre Admin' },
    { id: 'AUDITOR', label: 'Auditor' },
  ];

  return (
    <div className="flex items-center space-x-2 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700/80 text-xs">
      <UserCheck className="w-3.5 h-3.5 text-amber-400" />
      <span className="text-[11px] text-slate-400 hidden lg:inline">Persona:</span>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as UserRole)}
        className="bg-transparent text-amber-300 font-semibold focus:outline-none cursor-pointer text-xs"
      >
        {roles.map((r) => (
          <option key={r.id} value={r.id} className="bg-slate-900 text-white">
            {r.label}
          </option>
        ))}
      </select>
    </div>
  );
};
