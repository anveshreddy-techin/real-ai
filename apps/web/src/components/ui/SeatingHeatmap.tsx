'use client';

import React from 'react';

interface SeatingHeatmapProps {
  centreId: string;
  sanctionedCapacity: number;
  detectedCount: number;
}

export const SeatingHeatmap: React.FC<SeatingHeatmapProps> = ({
  sanctionedCapacity,
  detectedCount
}) => {
  // Generate a mock 5x7 seating grid layout
  const totalSeats = sanctionedCapacity || 35;
  const seats = Array.from({ length: totalSeats }, (_, i) => {
    // Occupy the first detectedCount seats roughly with random realistic distribution
    const isOccupied = i < detectedCount;
    return { id: i + 1, occupied: isOccupied };
  });

  const occupancyPct = Math.round((detectedCount / Math.max(sanctionedCapacity, 1)) * 100);

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Classroom Physical Seating Layout</h3>
          <p className="text-xs text-slate-500">Optical Centroid Mapping (Anonymous Grid Position)</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-700">{occupancyPct}% Bench Occupancy</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
        </div>
      </div>

      {/* Grid Floorplan */}
      <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
        <div className="text-center pb-2 mb-3 border-b border-slate-800 text-xs uppercase font-mono text-slate-400 tracking-wider">
          INSTRUCTOR PODIUM & DIGITAL INSTRUCTION BOARD
        </div>
        <div className="grid grid-cols-7 gap-2">
          {seats.map((seat) => (
            <div
              key={seat.id}
              className={`p-2.5 rounded-lg text-center transition-all ${
                seat.occupied
                  ? 'bg-blue-600/90 border border-blue-400 text-white shadow-sm'
                  : 'bg-slate-800/80 border border-slate-700/60 text-slate-500'
              }`}
            >
              <div className="text-xs font-mono font-bold">Seat {seat.id}</div>
              <div className="text-[10px] uppercase font-semibold mt-0.5">
                {seat.occupied ? 'Occupied' : 'Vacant'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded bg-blue-600"></span>
            <span>Trainee Detected ({detectedCount})</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded bg-slate-800 border border-slate-700"></span>
            <span>Empty Desk ({sanctionedCapacity - detectedCount})</span>
          </div>
        </div>
        <span className="font-mono text-[10px] text-emerald-600 font-semibold">Zero Facial Recognition</span>
      </div>
    </div>
  );
};
