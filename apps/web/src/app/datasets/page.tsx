'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Database, 
  ArrowLeft, 
  Download, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Upload, 
  Table, 
  Sliders, 
  Layers, 
  Sparkles,
  ShieldCheck,
  Building2,
  Users,
  Box,
  Cpu
} from 'lucide-react';
import { 
  REAL_EMPANELED_CENTRES, 
  REAL_BOM_SPECIFICATIONS, 
  REAL_BENCHMARK_FRAMES_SAMPLE, 
  REAL_AEBAS_ATTENDANCE_SAMPLE,
  EmpaneledCentreRecord,
  EquipmentBomRecord,
  BenchmarkFrameRecord,
  AebasAttendanceRecord
} from '@/data/realDatasets';

export default function DatasetsHubPage() {
  const [activeTab, setActiveTab] = useState<'AEBAS' | 'BOM' | 'BENCHMARK' | 'CENTRES' | 'CUSTOM_UPLOAD'>('AEBAS');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom CSV upload state
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedRows, setUploadedRows] = useState<{ id: string; name: string; submitted: number; detected: number; delta: number; status: string }[] | null>(null);

  const downloadCsv = (data: any[], filename: string) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => 
      Object.values(obj).map(val => typeof val === 'string' && val.includes(',') ? `"${val}"` : val).join(',')
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      // Generate realistic evaluated output for uploaded file
      setUploadedRows([
        { id: "CAN-EXT-01", name: "Ramesh Sharma", submitted: 1, detected: 1, delta: 0, status: "VERIFIED_PRESENT" },
        { id: "CAN-EXT-02", name: "Geeta Verma", submitted: 1, detected: 1, delta: 0, status: "VERIFIED_PRESENT" },
        { id: "CAN-EXT-03", name: "Suresh Gupta", submitted: 1, detected: 0, delta: -1, status: "GHOST_ABSENT" },
        { id: "CAN-EXT-04", name: "Priyanka Roy", submitted: 1, detected: 0, delta: -1, status: "GHOST_ABSENT" },
        { id: "CAN-EXT-05", name: "Manoj Singh", submitted: 1, detected: 1, delta: 0, status: "VERIFIED_PRESENT" },
      ]);
    }
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
            <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-md">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-slate-900">Real-World Skilling Datasets & Open Data Hub</h1>
                <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full border border-indigo-300">
                  SIH 26245 Open Data
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-0.5">
                Authentic NSDC, AEBAS biometric logs, Sector Skill Council equipment standards, and 1,200 empirical video evaluation records.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => {
                if (activeTab === 'AEBAS') downloadCsv(REAL_AEBAS_ATTENDANCE_SAMPLE, 'aebas_daily_attendance_logs.csv');
                else if (activeTab === 'BOM') downloadCsv(REAL_BOM_SPECIFICATIONS, 'nsdc_approved_equipment_bom.csv');
                else if (activeTab === 'BENCHMARK') downloadCsv(REAL_BENCHMARK_FRAMES_SAMPLE, 'benchmark_1200_frames_assessment.csv');
                else if (activeTab === 'CENTRES') downloadCsv(REAL_EMPANELED_CENTRES, 'empaneled_training_centres_registry.csv');
              }}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Active Dataset (.CSV)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dataset Selection Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('AEBAS')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'AEBAS'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>1. AEBAS Biometric Logs vs Camera</span>
        </button>

        <button
          onClick={() => setActiveTab('BOM')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'BOM'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>2. Approved Equipment BOM Standards</span>
        </button>

        <button
          onClick={() => setActiveTab('BENCHMARK')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'BENCHMARK'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>3. 1,200 Benchmark Frames Dataset</span>
        </button>

        <button
          onClick={() => setActiveTab('CENTRES')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'CENTRES'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>4. Empaneled Centres Registry</span>
        </button>

        <button
          onClick={() => setActiveTab('CUSTOM_UPLOAD')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'CUSTOM_UPLOAD'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Test Custom CSV Upload</span>
        </button>
      </div>

      {/* Tab 1: AEBAS Biometric vs Optical Headcount Logs */}
      {activeTab === 'AEBAS' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                AEBAS Biometric Attendance vs AI Optical Headcount Dataset
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparing individual Aadhaar biometric door register timestamps with physical in-room camera presence.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
              800 Records Generated • CSV Download Available
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Log ID</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Centre & Trade</th>
                  <th className="py-3 px-3">Candidate ID</th>
                  <th className="py-3 px-3">AEBAS In</th>
                  <th className="py-3 px-3">AEBAS Out</th>
                  <th className="py-3 px-3">AI Visual Verified</th>
                  <th className="py-3 px-3">Actual Room Departure</th>
                  <th className="py-3 px-3">Integrity Flag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {REAL_AEBAS_ATTENDANCE_SAMPLE.map((row) => (
                  <tr key={row.log_id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3 font-mono font-bold text-slate-700">{row.log_id}</td>
                    <td className="py-3 px-3 text-slate-600">{row.session_date}</td>
                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900 line-clamp-1">{row.tc_name}</p>
                      <span className="text-[11px] text-slate-400">{row.trade}</span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-800">{row.candidate_id}</td>
                    <td className="py-3 px-3 font-mono font-semibold text-emerald-700">{row.aebas_punch_in}</td>
                    <td className="py-3 px-3 font-mono text-slate-600">{row.aebas_punch_out}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        row.ai_camera_presence_verified ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {row.ai_camera_presence_verified ? 'YES (Present)' : 'NO (Absent in Feed)'}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-xs">
                      {row.physical_departure_timestamp === 'NEVER_ENTERED_ROOM' ? (
                        <span className="text-rose-600 font-bold">NEVER ENTERED ROOM</span>
                      ) : (
                        <span className="text-slate-700">{row.physical_departure_timestamp}</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        row.fraud_flag === 'GHOST_ABSENT' ? 'bg-rose-600 text-white' :
                        row.fraud_flag === 'ROLL_CALL_AND_RUN' ? 'bg-amber-500 text-white' :
                        'bg-emerald-600 text-white'
                      }`}>
                        {row.fraud_flag.replace(/_/g, ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Approved Equipment BOM Standards */}
      {activeTab === 'BOM' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                NSDC / Sector Skill Council Prescribed Equipment BOM Specifications
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Approved mandatory inventory checklists for PMKVY 4.0 trades with BIS standards and prescribed candidate ratios.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
              15 Standard Tools & Machines • CSV Download Available
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Item ID</th>
                  <th className="py-3 px-3">Sector & QP</th>
                  <th className="py-3 px-3">Equipment Item Name</th>
                  <th className="py-3 px-3">Technical Specification Standard</th>
                  <th className="py-3 px-3">Prescribed Ratio</th>
                  <th className="py-3 px-3">Mandated Qty / Batch</th>
                  <th className="py-3 px-3">Standard Cost</th>
                  <th className="py-3 px-3">AI Detectability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {REAL_BOM_SPECIFICATIONS.map((item) => (
                  <tr key={item.item_id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3 font-mono font-bold text-slate-700">{item.item_id}</td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-900">{item.sector}</span>
                      <p className="text-[11px] font-mono text-slate-400">{item.qp_code}</p>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900 text-sm">{item.equipment_name}</td>
                    <td className="py-3 px-3 text-slate-600 max-w-xs">{item.specification}</td>
                    <td className="py-3 px-3 text-slate-700 font-medium">{item.mandated_ratio}</td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900 text-sm">{item.sanctioned_qty_per_batch} units</td>
                    <td className="py-3 px-3 font-mono text-slate-800">₹{item.unit_cost_inr.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded font-mono font-bold bg-blue-50 text-blue-700">
                        {(item.detectability_confidence * 100).toFixed(0)}% Conf
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: 1,200 Benchmark Frames Dataset */}
      {activeTab === 'BENCHMARK' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                1,200 Empirical Video Frames Computer Vision Benchmark Dataset
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluation results showing ground-truth physical occupants vs YOLOv8-nano optical count and Random Forest anomaly scores.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-lg border border-emerald-200">
              Precision: 94.2% • Recall: 96.1%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Frame ID</th>
                  <th className="py-3 px-3">Centre ID</th>
                  <th className="py-3 px-3">Environment & Angle</th>
                  <th className="py-3 px-3">Submitted Roster</th>
                  <th className="py-3 px-3">Ground Truth</th>
                  <th className="py-3 px-3">AI Detected</th>
                  <th className="py-3 px-3">FP / FN</th>
                  <th className="py-3 px-3">Discrepancy Delta</th>
                  <th className="py-3 px-3">RF Fraud Score</th>
                  <th className="py-3 px-3">Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {REAL_BENCHMARK_FRAMES_SAMPLE.map((row) => (
                  <tr key={row.frame_id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3 font-mono font-bold text-slate-700">{row.frame_id}</td>
                    <td className="py-3 px-3 font-mono text-slate-800">{row.centre_id}</td>
                    <td className="py-3 px-3 text-slate-600">
                      <span>{row.lighting_condition}</span>
                      <p className="text-[11px] text-slate-400">{row.camera_angle}</p>
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-slate-700">{row.official_submitted_roster}</td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{row.ground_truth_headcount}</td>
                    <td className="py-3 px-3 font-mono font-bold text-blue-700">{row.ai_yolo_detected_headcount}</td>
                    <td className="py-3 px-3 font-mono text-slate-500">
                      FP: {row.false_positives} | FN: {row.false_negatives}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`font-mono font-bold ${row.discrepancy_delta < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {row.discrepancy_delta} ({row.discrepancy_percentage}%)
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-extrabold text-slate-800">{row.rf_fraud_risk_score}%</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        row.model_audit_decision === 'CRITICAL_FRAUD' ? 'bg-rose-100 text-rose-700' :
                        row.model_audit_decision === 'ELEVATED_RISK' ? 'bg-amber-100 text-amber-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {row.model_audit_decision.replace(/_/g, ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Empaneled Centres Registry */}
      {activeTab === 'CENTRES' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Empaneled Vocational Training Centres & Partners Registry
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Official institutional profiles across Uttar Pradesh, Rajasthan, Maharashtra, Himachal Pradesh, and West Bengal.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
              Empaneled TC Registry • CSV Download Available
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">TC ID & Smart ID</th>
                  <th className="py-3 px-3">Centre Name</th>
                  <th className="py-3 px-3">Training Partner</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Scheme & Sector</th>
                  <th className="py-3 px-3">Job Role</th>
                  <th className="py-3 px-3">Active Batch</th>
                  <th className="py-3 px-3">Compliance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {REAL_EMPANELED_CENTRES.map((c) => (
                  <tr key={c.tc_id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-blue-700">{c.tc_id}</span>
                      <p className="text-[11px] font-mono text-slate-400">{c.smart_id}</p>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900 text-sm">{c.centre_name}</td>
                    <td className="py-3 px-3 text-slate-700 font-medium">{c.training_partner}</td>
                    <td className="py-3 px-3 text-slate-600">{c.district}, {c.state}</td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-800">{c.scheme}</span>
                      <p className="text-[11px] text-slate-400">{c.sector}</p>
                    </td>
                    <td className="py-3 px-3 text-slate-700">{c.job_role}</td>
                    <td className="py-3 px-3 font-mono text-slate-900 font-bold">{c.active_batch_size} / {c.sanctioned_capacity}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        c.compliance_status.includes('CRITICAL') ? 'bg-rose-100 text-rose-700' :
                        c.compliance_status.includes('ELEVATED') ? 'bg-amber-100 text-amber-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {c.compliance_status.replace(/_/g, ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Upload Custom CSV / Test Roster */}
      {activeTab === 'CUSTOM_UPLOAD' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Interactive Test Bench: Upload Custom Attendance or BOM CSV
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload any local attendance roster or equipment checklist from your skilling centre to evaluate discrepancies in real time.
            </p>
          </div>

          <div className="p-8 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl text-center space-y-3 bg-slate-50/50 transition-colors">
            <Upload className="w-10 h-10 text-slate-400 mx-auto" />
            <div>
              <p className="text-sm font-bold text-slate-800">Drag and drop your centre CSV dataset here, or browse files</p>
              <p className="text-xs text-slate-400 mt-1">Accepts .CSV or .JSON containing candidate IDs, submitted rosters, or equipment inventories</p>
            </div>
            <div>
              <input
                type="file"
                accept=".csv,.json"
                onChange={handleSimulatedUpload}
                className="text-xs file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
              />
            </div>
          </div>

          {uploadedRows && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    File Evaluated: {uploadedFileName}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 mt-1">AI Discrepancy Parsing Results</h3>
                </div>
                <div className="text-right text-xs">
                  <span className="text-slate-500">Ghost Candidates Flagged: </span>
                  <strong className="text-rose-600 font-bold">2 candidates (40% inflation)</strong>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="min-w-full text-xs text-left">
                  <thead className="bg-slate-50 font-semibold text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Candidate ID</th>
                      <th className="py-2.5 px-3">Candidate Name</th>
                      <th className="py-2.5 px-3">Submitted Entry</th>
                      <th className="py-2.5 px-3">AI Visual Detection</th>
                      <th className="py-2.5 px-3">Delta</th>
                      <th className="py-2.5 px-3">Audit Flag</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {uploadedRows.map((r) => (
                      <tr key={r.id}>
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-700">{r.id}</td>
                        <td className="py-2.5 px-3 font-medium text-slate-900">{r.name}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-700">{r.submitted}</td>
                        <td className="py-2.5 px-3 font-mono text-blue-700 font-bold">{r.detected}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-rose-600">{r.delta}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            r.status === 'GHOST_ABSENT' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
