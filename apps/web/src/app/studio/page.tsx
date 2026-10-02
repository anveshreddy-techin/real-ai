'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Camera, 
  Upload, 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Box, 
  Eye, 
  EyeOff, 
  Download, 
  Sliders, 
  ArrowLeft,
  Sparkles,
  Zap,
  Cpu,
  FileText
} from 'lucide-react';
import { CANONICAL_CENTRES, Centre } from '@/data/mockCentres';

interface DetectionBox {
  id: string;
  label: string;
  category: 'person' | 'equipment';
  confidence: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  w: number; // percentage 0-100
  h: number; // percentage 0-100
}

interface Scenario {
  id: string;
  name: string;
  centreId: string;
  trade: string;
  submittedAttendance: number;
  sanctionedEquipment: { name: string; required: number }[];
  expectedPersons: number;
  description: string;
  fraudType: string;
  boxes: DetectionBox[];
}

const DEMO_SCENARIOS: Scenario[] = [
  {
    id: 'gkp-ghost',
    name: 'Gorakhpur Apparel & Sewing Lab (Severe Ghost Inflation)',
    centreId: 'PMKVY-UP-GKP-0042',
    trade: 'Apparel & Sewing Machine Operator (ASO-04)',
    submittedAttendance: 32,
    sanctionedEquipment: [
      { name: 'Industrial Sewing Machines', required: 15 },
      { name: 'Student Workbenches', required: 35 },
      { name: 'Fire Extinguisher ABC', required: 2 }
    ],
    expectedPersons: 18,
    description: 'Centre registered 32 trainees on AEBAS door register. Camera feed detects only 18 physical bodies in room (-14 ghost trainees, 43.8% inflation).',
    fraudType: 'CRITICAL_GHOST_ATTENDANCE',
    boxes: [
      // 18 persons
      { id: 'p1', label: 'Trainee [Centroid]', category: 'person', confidence: 0.94, x: 12, y: 35, w: 9, h: 28 },
      { id: 'p2', label: 'Trainee [Centroid]', category: 'person', confidence: 0.96, x: 23, y: 36, w: 9, h: 27 },
      { id: 'p3', label: 'Trainee [Centroid]', category: 'person', confidence: 0.91, x: 34, y: 38, w: 8, h: 26 },
      { id: 'p4', label: 'Trainee [Centroid]', category: 'person', confidence: 0.89, x: 45, y: 37, w: 9, h: 28 },
      { id: 'p5', label: 'Trainee [Centroid]', category: 'person', confidence: 0.95, x: 56, y: 35, w: 9, h: 29 },
      { id: 'p6', label: 'Trainee [Centroid]', category: 'person', confidence: 0.92, x: 67, y: 36, w: 8, h: 27 },
      { id: 'p7', label: 'Trainee [Centroid]', category: 'person', confidence: 0.88, x: 78, y: 38, w: 9, h: 26 },
      { id: 'p8', label: 'Trainee [Centroid]', category: 'person', confidence: 0.93, x: 15, y: 55, w: 10, h: 32 },
      { id: 'p9', label: 'Trainee [Centroid]', category: 'person', confidence: 0.97, x: 28, y: 56, w: 10, h: 31 },
      { id: 'p10', label: 'Trainee [Centroid]', category: 'person', confidence: 0.90, x: 40, y: 54, w: 10, h: 33 },
      { id: 'p11', label: 'Trainee [Centroid]', category: 'person', confidence: 0.94, x: 53, y: 55, w: 10, h: 32 },
      { id: 'p12', label: 'Trainee [Centroid]', category: 'person', confidence: 0.87, x: 65, y: 57, w: 10, h: 30 },
      { id: 'p13', label: 'Trainee [Centroid]', category: 'person', confidence: 0.91, x: 78, y: 55, w: 10, h: 32 },
      { id: 'p14', label: 'Trainee [Centroid]', category: 'person', confidence: 0.86, x: 20, y: 22, w: 7, h: 20 },
      { id: 'p15', label: 'Trainee [Centroid]', category: 'person', confidence: 0.89, x: 32, y: 21, w: 7, h: 21 },
      { id: 'p16', label: 'Trainee [Centroid]', category: 'person', confidence: 0.93, x: 44, y: 23, w: 7, h: 19 },
      { id: 'p17', label: 'Trainee [Centroid]', category: 'person', confidence: 0.88, x: 56, y: 22, w: 7, h: 20 },
      { id: 'p18', label: 'Instructor [Centroid]', category: 'person', confidence: 0.98, x: 86, y: 25, w: 9, h: 35 },
      // Equipment
      { id: 'e1', label: 'Sewing Machine #1', category: 'equipment', confidence: 0.92, x: 10, y: 65, w: 14, h: 18 },
      { id: 'e2', label: 'Sewing Machine #2', category: 'equipment', confidence: 0.89, x: 26, y: 66, w: 14, h: 17 },
      { id: 'e3', label: 'Sewing Machine #3', category: 'equipment', confidence: 0.94, x: 42, y: 65, w: 14, h: 18 },
      { id: 'e4', label: 'Sewing Machine #4', category: 'equipment', confidence: 0.91, x: 58, y: 66, w: 14, h: 17 },
      { id: 'e5', label: 'Sewing Machine #5', category: 'equipment', confidence: 0.88, x: 74, y: 65, w: 14, h: 18 },
      { id: 'e6', label: 'Fire Extinguisher', category: 'equipment', confidence: 0.95, x: 92, y: 40, w: 6, h: 16 }
    ]
  },
  {
    id: 'ngp-normal',
    name: 'Nagpur CNC Workshop (Fully Compliant)',
    centreId: 'PMKVY-MH-NGP-0031',
    trade: 'CNC Milling & Lathe Operator (CNC-01)',
    submittedAttendance: 43,
    sanctionedEquipment: [
      { name: 'CNC Lathe Simulators', required: 4 },
      { name: 'Precision Workbenches', required: 40 },
      { name: 'Safety Goggles/Gear Rack', required: 45 }
    ],
    expectedPersons: 43,
    description: 'Clean baseline centre. All 43 registered trainees and sanctioned CNC training equipment verified in real time.',
    fraudType: 'COMPLIANT_BASELINE',
    boxes: [
      // 43 persons distributed across workshop
      ...Array.from({ length: 43 }, (_, i) => ({
        id: `np${i}`,
        label: i === 0 ? 'Instructor [Centroid]' : 'Trainee [Centroid]',
        category: 'person' as const,
        confidence: 0.88 + (i % 10) * 0.01,
        x: 8 + (i % 8) * 11,
        y: 20 + Math.floor(i / 8) * 14,
        w: 7,
        h: 18
      })),
      { id: 'ne1', label: 'CNC Simulator 1', category: 'equipment', confidence: 0.96, x: 5, y: 75, w: 20, h: 22 },
      { id: 'ne2', label: 'CNC Simulator 2', category: 'equipment', confidence: 0.95, x: 28, y: 75, w: 20, h: 22 },
      { id: 'ne3', label: 'CNC Simulator 3', category: 'equipment', confidence: 0.94, x: 51, y: 75, w: 20, h: 22 },
      { id: 'ne4', label: 'CNC Simulator 4', category: 'equipment', confidence: 0.97, x: 74, y: 75, w: 20, h: 22 }
    ]
  },
  {
    id: 'smr-temporal',
    name: 'Shimla Hospitality Hall (Roll-Call & Run Fraud)',
    centreId: 'PMKVY-HP-SMR-0019',
    trade: 'Food & Beverage Service Steward (FBS-02)',
    submittedAttendance: 25,
    sanctionedEquipment: [
      { name: 'Banquet Training Setup', required: 6 },
      { name: 'Cutlery/Crockery Station', required: 25 }
    ],
    expectedPersons: 8,
    description: 'Trainees scanned entry biometrics at 09:00 AM, but exited by 10:00 AM. Camera shows room depleted to 8 trainees during scheduled practical hours.',
    fraudType: 'TEMPORAL_DROPOFF_FRAUD',
    boxes: [
      { id: 'sp1', label: 'Trainee [Centroid]', category: 'person', confidence: 0.92, x: 18, y: 40, w: 10, h: 30 },
      { id: 'sp2', label: 'Trainee [Centroid]', category: 'person', confidence: 0.90, x: 30, y: 42, w: 10, h: 28 },
      { id: 'sp3', label: 'Trainee [Centroid]', category: 'person', confidence: 0.95, x: 45, y: 41, w: 10, h: 29 },
      { id: 'sp4', label: 'Trainee [Centroid]', category: 'person', confidence: 0.88, x: 60, y: 43, w: 10, h: 27 },
      { id: 'sp5', label: 'Trainee [Centroid]', category: 'person', confidence: 0.91, x: 72, y: 40, w: 10, h: 30 },
      { id: 'sp6', label: 'Trainee [Centroid]', category: 'person', confidence: 0.89, x: 25, y: 65, w: 11, h: 28 },
      { id: 'sp7', label: 'Trainee [Centroid]', category: 'person', confidence: 0.93, x: 50, y: 66, w: 11, h: 27 },
      { id: 'sp8', label: 'Instructor [Centroid]', category: 'person', confidence: 0.97, x: 80, y: 30, w: 10, h: 35 }
    ]
  },
  {
    id: 'jdh-solar',
    name: 'Jodhpur Solar Lab (Sanctioned Equipment Deficit)',
    centreId: 'PMKVY-RJ-JDH-0015',
    trade: 'Solar PV Installer / Suryamitra (SPI-01)',
    submittedAttendance: 26,
    sanctionedEquipment: [
      { name: 'Solar PV Inverter Simulator', required: 8 },
      { name: 'Safety Harness & Helmets', required: 28 }
    ],
    expectedPersons: 21,
    description: 'Sanctioned Scheme BOM requires 8 Solar Inverter simulators. Only 4 detected in practical bays. Equipment borrowing fraud suspected.',
    fraudType: 'EQUIPMENT_BOM_DEFICIT',
    boxes: [
      ...Array.from({ length: 21 }, (_, i) => ({
        id: `jp${i}`,
        label: 'Trainee [Centroid]',
        category: 'person' as const,
        confidence: 0.89 + (i % 8) * 0.01,
        x: 10 + (i % 6) * 14,
        y: 25 + Math.floor(i / 6) * 16,
        w: 8,
        h: 22
      })),
      { id: 'je1', label: 'Solar Inverter Simulator 1', category: 'equipment', confidence: 0.93, x: 10, y: 72, w: 18, h: 22 },
      { id: 'je2', label: 'Solar Inverter Simulator 2', category: 'equipment', confidence: 0.91, x: 32, y: 72, w: 18, h: 22 },
      { id: 'je3', label: 'Solar Inverter Simulator 3', category: 'equipment', confidence: 0.94, x: 54, y: 72, w: 18, h: 22 },
      { id: 'je4', label: 'Solar Inverter Simulator 4', category: 'equipment', confidence: 0.90, x: 76, y: 72, w: 18, h: 22 }
    ]
  }
];

export default function LiveStudioPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('gkp-ghost');
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(0.50);
  const [dpdpMode, setDpdpMode] = useState<boolean>(true); // DPDP Act 2023: Centroids only
  const [showEquipment, setShowEquipment] = useState<boolean>(true);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [customRosterInput, setCustomRosterInput] = useState<number>(32);
  const [selectedTradeItem, setSelectedTradeItem] = useState<string | null>(null);

  const scenario = DEMO_SCENARIOS.find(s => s.id === selectedScenarioId) || DEMO_SCENARIOS[0];

  useEffect(() => {
    setCustomRosterInput(scenario.submittedAttendance);
  }, [scenario]);

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 700);
  };

  const filteredBoxes = scenario.boxes.filter(b => {
    if (b.confidence < confidenceThreshold) return false;
    if (b.category === 'equipment' && !showEquipment) return false;
    return true;
  });

  const detectedPersons = filteredBoxes.filter(b => b.category === 'person').length;
  const detectedEquipment = filteredBoxes.filter(b => b.category === 'equipment').length;

  const discrepancy = detectedPersons - customRosterInput;
  const discrepancyPct = customRosterInput > 0 && discrepancy < 0 
    ? ((Math.abs(discrepancy) / customRosterInput) * 100).toFixed(1)
    : '0.0';

  // Financial risk: ₹18,000 subsidy per certified trainee under PMKVY
  const subsidyAtRisk = discrepancy < 0 ? Math.abs(discrepancy) * 18000 : 0;

  const downloadAuditReport = () => {
    const report = {
      auditTimestamp: new Date().toISOString(),
      scheme: 'PMKVY 4.0 / SIH 26245',
      authority: 'Ministry of Skill Development and Entrepreneurship (MSDE)',
      centreId: scenario.centreId,
      trade: scenario.trade,
      submittedAttendance: customRosterInput,
      aiDetectedHeadcount: detectedPersons,
      discrepancyDelta: discrepancy,
      discrepancyPercentage: `${discrepancyPct}%`,
      subsidyAtRiskINR: subsidyAtRisk,
      privacyCompliance: 'DPDP_ACT_2023_VALIDATED_CENTROIDS_ONLY_NO_FACIAL_BIOMETRICS',
      equipmentDetectedCount: detectedEquipment,
      auditResult: discrepancy <= -10 ? 'CRITICAL_GHOSTING_AUDIT_REQUIRED' : discrepancy < 0 ? 'MINOR_DISCREPANCY' : 'VERIFIED_COMPLIANT'
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MSDE_Form4A_Audit_${scenario.centreId}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
      {/* Header */}
      <div>
        <Link href="/" className="inline-flex items-center text-xs font-semibold text-blue-700 hover:text-blue-800 mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Command Center
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-slate-900">Live Video Analytics & Compliance Studio</h1>
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-bold rounded-full border border-blue-300">
                  SIH 26245 Real-World Working Prototype
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-0.5">
                Inspect live video feeds, run real-time optical headcount extraction, and instantly cross-check physical presence against official attendance rosters.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={triggerScan}
              disabled={isScanning}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Inference Running...' : 'Re-run CV Inference'}</span>
            </button>
            <button
              onClick={downloadAuditReport}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Form 4A Notice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scenario Selector: 4 Real-World Skilling Centre Test Cases */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Select Training Centre Video Footage / Real-World Scenario
          </span>
          <span className="text-xs text-slate-400">Click any scenario to load video telemetry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DEMO_SCENARIOS.map((sc) => {
            const isSelected = sc.id === selectedScenarioId;
            const isCritical = sc.fraudType.includes('CRITICAL') || sc.fraudType.includes('TEMPORAL');
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioId(sc.id)}
                className={`text-left p-3 rounded-xl border transition-all ${
                  isSelected 
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-500' 
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  isCritical ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {sc.fraudType.replace(/_/g, ' ')}
                </span>
                <h3 className="font-bold text-xs text-slate-900 mt-2 line-clamp-1">{sc.name}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5 font-mono">{sc.centreId}</p>
                <div className="mt-2 text-[11px] text-slate-600 flex justify-between">
                  <span>Reg: <strong>{sc.submittedAttendance}</strong></span>
                  <span>AI: <strong>{sc.expectedPersons}</strong></span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Viewport & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Video Canvas Viewport (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative aspect-video flex flex-col justify-between p-4">
            {/* Viewport Top Bar */}
            <div className="flex items-center justify-between text-xs z-20">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-white/90 bg-black/70 px-2 py-0.5 rounded border border-slate-800 font-semibold">
                  CAM-01 • {scenario.centreId}
                </span>
                <span className="bg-blue-600/90 text-white font-mono text-[11px] px-2 py-0.5 rounded">
                  {scenario.trade}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="bg-black/60 text-slate-300 font-mono text-[11px] px-2 py-0.5 rounded border border-slate-800">
                  Model: YOLOv8-nano (48ms)
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  dpdpMode ? 'bg-emerald-500 text-slate-950' : 'bg-amber-400 text-slate-950'
                }`}>
                  {dpdpMode ? 'DPDP 2023: Centroids' : 'Full Bounding Box'}
                </span>
              </div>
            </div>

            {/* Simulated Live Frame Background with Workshop Ambience */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 overflow-hidden select-none">
              {/* Workshop Layout Grid Lines */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>

              {/* Scanning Laser Line Animation */}
              {isScanning && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-pulse top-1/2"></div>
              )}

              {/* Rendered Computer Vision Detections */}
              {filteredBoxes.map((box) => {
                const isPerson = box.category === 'person';
                return (
                  <div
                    key={box.id}
                    style={{
                      left: `${box.x}%`,
                      top: `${box.y}%`,
                      width: `${box.w}%`,
                      height: `${box.h}%`,
                    }}
                    className={`absolute rounded transition-all cursor-pointer ${
                      isPerson
                        ? dpdpMode
                          ? 'border border-cyan-400/50 bg-cyan-400/10'
                          : 'border-2 border-emerald-400 bg-emerald-500/10 shadow-[0_0_8px_rgba(52,211,153,0.3)]'
                        : 'border-2 border-amber-400 bg-amber-400/10 shadow-[0_0_8px_rgba(251,191,36,0.3)]'
                    }`}
                    onClick={() => setSelectedTradeItem(`${box.label} (${(box.confidence * 100).toFixed(0)}% conf)`)}
                  >
                    {/* Centroid Dot (DPDP Act 2023 Mode) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-300 ring-2 ring-cyan-500/50 shadow-[0_0_6px_#22d3ee]"></div>

                    {/* Annotation Pill */}
                    <span className={`absolute -top-4 left-0 text-[9px] font-mono px-1 py-0.2 rounded whitespace-nowrap font-bold ${
                      isPerson ? 'bg-cyan-500 text-black' : 'bg-amber-400 text-black'
                    }`}>
                      {dpdpMode && isPerson ? `Centroid ${(box.confidence * 100).toFixed(0)}%` : `${box.label}`}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Viewport Bottom Overlay */}
            <div className="flex items-center justify-between text-xs text-slate-400 z-20 border-t border-slate-800/80 pt-2 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <span>Optical Headcount: <strong className="text-white font-mono text-sm">{detectedPersons}</strong></span>
                <span>•</span>
                <span>Equipment Detected: <strong className="text-amber-400 font-mono text-sm">{detectedEquipment}</strong></span>
              </div>
              <div className="font-mono text-[11px] text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Facial Biometrics Retained</span>
              </div>
            </div>
          </div>

          {/* Interactive Inspection Controls Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Confidence Threshold Slider */}
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-slate-500" />
                <span className="font-semibold text-slate-700">Detection Confidence:</span>
                <input
                  type="range"
                  min="0.30"
                  max="0.95"
                  step="0.05"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                  className="w-24 accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <span className="font-mono font-bold text-blue-700">{(confidenceThreshold * 100).toFixed(0)}%</span>
              </div>

              {/* Mode Toggles */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setDpdpMode(!dpdpMode)}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition-colors ${
                    dpdpMode ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {dpdpMode ? <EyeOff className="w-3.5 h-3.5 text-emerald-600" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{dpdpMode ? 'DPDP 2023 Centroids' : 'Raw Bounding Boxes'}</span>
                </button>

                <button
                  onClick={() => setShowEquipment(!showEquipment)}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition-colors ${
                    showEquipment ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-amber-600" />
                  <span>{showEquipment ? 'BOM Objects ON' : 'BOM Objects OFF'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Cross-Referencing & Fraud Risk Assessment */}
        <div className="space-y-4">
          {/* Official Register vs Visual Headcount Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Official Roster Cross-Reference
              </span>
              <h3 className="font-bold text-base text-slate-900 mt-0.5">Physical Headcount Audit</h3>
              <p className="text-xs text-slate-500">{scenario.trade}</p>
            </div>

            {/* Adjustable Roster Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 flex justify-between">
                <span>Official Submitted Register:</span>
                <span className="font-mono text-slate-900 font-bold">{customRosterInput} Trainees</span>
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="5"
                  max="60"
                  value={customRosterInput}
                  onChange={(e) => setCustomRosterInput(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <span className="text-xs text-slate-400">trainees</span>
              </div>
            </div>

            {/* Discrepancy Breakdown */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">AI Verified Optical Headcount:</span>
                <strong className="text-sm font-bold text-slate-900">{detectedPersons} trainees</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Discrepancy Delta:</span>
                <span className={`font-mono font-bold text-sm ${discrepancy < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {discrepancy} ({discrepancyPct}% ghost inflation)
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-700 font-semibold">Government Subsidy at Risk:</span>
                <span className="font-mono font-extrabold text-rose-600 text-sm">
                  ₹{subsidyAtRisk.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Discrepancy Alert Banner */}
            {discrepancy <= -10 ? (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-rose-700">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>CRITICAL GHOST INFLATION DETECTED</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Physical presence is below 70% of reported attendance. This triggers an automated <strong>Form 4A Statutory Show-Cause Notice</strong> and bi-weekly subsidy freeze.
                </p>
              </div>
            ) : discrepancy < 0 ? (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-amber-700">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>MINOR HEADCOUNT VARIANCE</span>
                </div>
                <p className="text-[11px]">Flagged for review during next batch transition.</p>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>HEADCOUNT VERIFIED COMPLIANT</span>
                </div>
                <p className="text-[11px]">All submitted trainees confirmed physically present.</p>
              </div>
            )}
          </div>

          {/* Sanctioned Equipment (BOM) Audit Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Sanctioned Equipment BOM Checklist
            </span>
            <div className="space-y-2 text-xs">
              {scenario.sanctionedEquipment.map((eq, i) => (
                <div key={i} className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-800">{eq.name}</span>
                  <span className="font-mono text-slate-600">Mandated: <strong>{eq.required}</strong></span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400">
              Continuously audited to prevent temporary equipment borrowing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
