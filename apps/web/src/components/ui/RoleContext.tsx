'use client';

import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'CENTRAL_MONITOR' | 'STATE_INSPECTOR' | 'CENTRE_ADMIN' | 'AUDITOR';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  roleTitle: string;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('CENTRAL_MONITOR');

  const roleTitles: Record<UserRole, string> = {
    CENTRAL_MONITOR: 'National Scheme Director (MSDE HQ)',
    STATE_INSPECTOR: 'State Mission Director (SSDM)',
    CENTRE_ADMIN: 'Training Centre Superintendent',
    AUDITOR: 'Independent Technical Auditor'
  };

  return (
    <RoleContext.Provider value={{ role, setRole, roleTitle: roleTitles[role] }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
