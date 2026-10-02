'use client';

import React from 'react';
import { CANONICAL_CENTRES, Centre } from '@/data/mockCentres';
import { MapPin } from 'lucide-react';

interface IndiaMapOverviewProps {
  selectedCentreId: string;
  onSelectCentre: (centre: Centre) => void;
}

export const IndiaMapOverview: React.FC<IndiaMapOverviewProps> = ({
  selectedCentreId,
  onSelectCentre
}) => {
  // Approximate SVG coordinate projection bounding box for India (Lat: 8-36, Lon: 68-96)
  const project = (lat: number, lon: number) => {
    const x = ((lon - 68) / (96 - 68)) * 360 + 20;
    const y = 380 - ((lat - 8) / (36 - 8)) * 360;
    return { x, y };
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">National Geographic Distribution</h3>
          <p className="text-xs text-slate-500">Live Spatial Compliance Telemetry Across States</p>
        </div>
        <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
          5 Monitored Lat/Long Coordinates
        </span>
      </div>

      <div className="relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 h-80 flex items-center justify-center p-2">
        <svg viewBox="0 0 400 400" className="w-full h-full max-w-sm opacity-90">
          {/* Subtle stylized India boundary polygon outline */}
          <path
            d="M 150 40 L 180 50 L 220 80 L 260 110 L 290 120 L 330 115 L 340 140 L 310 160 L 290 170 L 260 200 L 230 240 L 210 290 L 190 350 L 170 320 L 160 260 L 130 220 L 110 170 L 90 140 L 110 90 Z"
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="4 2"
          />

          {/* Render Centre Nodes */}
          {CANONICAL_CENTRES.map((centre) => {
            const { x, y } = project(centre.latitude, centre.longitude);
            const isSelected = centre.centre_id === selectedCentreId;
            const isCritical = centre.compliance_status === 'CRITICAL';
            const isElevated = centre.compliance_status === 'ELEVATED_RISK';

            const fillColor = isCritical ? '#EF4444' : isElevated ? '#F59E0B' : '#10B981';

            return (
              <g
                key={centre.centre_id}
                className="cursor-pointer group"
                onClick={() => onSelectCentre(centre)}
              >
                {/* Pulsing ring for critical status */}
                {isCritical && (
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 14 : 9}
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="1.5"
                    className="animate-ping opacity-60"
                  />
                )}

                {/* Node pin */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 8 : 5}
                  fill={fillColor}
                  stroke="#FFFFFF"
                  strokeWidth={isSelected ? 2.5 : 1.5}
                />

                {/* Text tag */}
                <text
                  x={x + 10}
                  y={y + 3}
                  fill="#E2E8F0"
                  fontSize="9"
                  fontWeight="bold"
                  fontFamily="monospace"
                  className="pointer-events-none select-none drop-shadow"
                >
                  {centre.district} ({centre.compliance_score}%)
                </text>
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 p-2 rounded text-[10px] text-slate-300 space-y-1">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>Critical Discrepancy (Gorakhpur, Shimla)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Elevated Risk (Jodhpur, Malda)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Verified Compliant (Nagpur)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
