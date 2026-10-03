'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Filter, 
  Search, 
  Download, 
  ShieldCheck, 
  RefreshCw, 
  ArrowLeft, 
  ExternalLink, 
  Check, 
  X, 
  ChevronRight,
  Eye,
  Camera,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  EVIDENCE_ITEMS, 
  EVIDENCE_STATS, 
  DETECTED_AI_ISSUES, 
  HUMAN_REVIEWERS, 
  EvidenceRecord 
} from '@/data/evidenceData';
import { TRAINING_CENTRES_28 } from '@/data/trainingCentres28';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function EvidenceReviewPage() {
  const { t } = useLanguage();
  const [evidenceList, setEvidenceList] = useState<EvidenceRecord[]>(EVIDENCE_ITEMS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [centreFilter, setCentreFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Valid' | 'Issue' | 'Duplicate'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Reviewer form state
  const [activeReviewer, setActiveReviewer] = useState(HUMAN_REVIEWERS[0]);
  const [reviewerNotes, setReviewerNotes] = useState('Reviewed geotag metadata, timestamps and visual landmarks against centre baseline.');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<EvidenceRecord | null>(evidenceList[0] || null);

  // Available unique types
  const evidenceTypes = useMemo(() => {
    const types = Array.from(new Set(EVIDENCE_ITEMS.map(e => e.type)));
    return ['ALL', ...types];
  }, []);

  // Filtered evidence items
  const filteredItems = useMemo(() => {
    return evidenceList.filter(item => {
      const matchesSearch = 
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.centreName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.centreId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCentre = centreFilter === 'ALL' || item.centreId === centreFilter;
      const matchesType = typeFilter === 'ALL' || item.type === typeFilter;
      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;

      return matchesSearch && matchesCentre && matchesType && matchesStatus;
    });
  }, [evidenceList, searchTerm, centreFilter, typeFilter, statusFilter]);

  // Dynamic counts
  const currentTotal = evidenceList.length;
  const currentValid = evidenceList.filter(e => e.status === 'Valid').length;
  const currentIssues = evidenceList.filter(e => e.status === 'Issue').length;
  const currentDuplicates = evidenceList.filter(e => e.status === 'Duplicate').length;

  // Toggle selection
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredItems.map(item => item.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Actions
  const handleMarkResolved = () => {
    if (selectedIds.length === 0) {
      setToastMessage('Please select one or more evidence items to resolve.');
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setEvidenceList(prev => prev.map(item => {
      if (selectedIds.includes(item.id)) {
        return { ...item, status: 'Valid', freshness: 'Fresh' };
      }
      return item;
    }));

    setToastMessage(`Successfully verified and marked ${selectedIds.length} evidence items as Valid.`);
    setSelectedIds([]);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRejectEvidence = () => {
    if (selectedIds.length === 0) {
      setToastMessage('Please select one or more evidence items to reject.');
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setEvidenceList(prev => prev.map(item => {
      if (selectedIds.includes(item.id)) {
        return { ...item, status: 'Issue' };
      }
      return item;
    }));

    setToastMessage(`Marked ${selectedIds.length} items with Issue flag for re-submission.`);
    setSelectedIds([]);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 mb-1">
            <Link href="/dashboard" className="hover:underline flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Command Dashboard</span>
            </Link>
            <span>/</span>
            <span>SIH 26245 Evidence Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Evidence Review & AI Verification Panel
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Inspect, validate, and authenticate supporting media, biometric punch hashes, and classroom CCTV feeds
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/review-queue"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm transition-all"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Corrective Queue (12)</span>
          </Link>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 font-semibold flex items-center space-x-2 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 4 Summary KPIs matching Image 2 Panel 3 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Evidence */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Evidence</span>
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">{currentTotal}</div>
          <p className="text-[11px] text-slate-400 mt-1">Submitted across 28 centres</p>
        </div>

        {/* Valid Evidence */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Valid Evidence</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-emerald-600">{currentValid}</div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">Verified & tamper-free</p>
        </div>

        {/* Issues Found */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Issues Found</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-rose-600">{currentIssues}</div>
          <p className="text-[11px] text-rose-700 font-semibold mt-1">Requires human review</p>
        </div>

        {/* Duplicates */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Duplicates</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Copy className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-amber-600">{currentDuplicates}</div>
          <p className="text-[11px] text-amber-700 font-semibold mt-1">Hash collision detected</p>
        </div>
      </div>

      {/* Main Review Section: Table + Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Filter Controls & Evidence Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search file name, centre ID..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              {/* Centre dropdown */}
              <select
                value={centreFilter}
                onChange={(e) => setCentreFilter(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="ALL">All Centres (28)</option>
                {TRAINING_CENTRES_28.map(c => (
                  <option key={c.id} value={c.id}>{c.id} - {c.name.substring(0, 20)}...</option>
                ))}
              </select>

              {/* Type dropdown */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                {evidenceTypes.map(t => (
                  <option key={t} value={t}>{t === 'ALL' ? 'All Document Types' : t}</option>
                ))}
              </select>

              {/* Status pills */}
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setStatusFilter('ALL')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    statusFilter === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('Valid')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    statusFilter === 'Valid' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Valid
                </button>
                <button
                  onClick={() => setStatusFilter('Issue')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    statusFilter === 'Issue' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Issue
                </button>
                <button
                  onClick={() => setStatusFilter('Duplicate')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    statusFilter === 'Duplicate' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dup
                </button>
              </div>
            </div>

            {/* Selection Bulk Bar */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 text-slate-600">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filteredItems.length && filteredItems.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded text-blue-600 focus:ring-blue-500/30"
                />
                <span className="font-semibold">
                  {selectedIds.length} of {filteredItems.length} selected
                </span>
              </div>

              {selectedIds.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleRejectEvidence}
                    className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs transition-colors"
                  >
                    Flag Issue ({selectedIds.length})
                  </button>
                  <button
                    onClick={handleMarkResolved}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs transition-colors"
                  >
                    Mark Valid ({selectedIds.length})
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Evidence Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto max-h-[580px]">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 z-10">
                  <tr className="text-slate-600 font-semibold uppercase text-[11px] tracking-wider">
                    <th className="py-3 px-3 w-8"></th>
                    <th className="py-3 px-3">ID</th>
                    <th className="py-3 px-3">Document Type</th>
                    <th className="py-3 px-3">Centre</th>
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3">Freshness</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Preview</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item) => {
                    const isSelected = selectedIds.includes(item.id);
                    const isCurrentPreview = previewItem?.id === item.id;

                    return (
                      <tr 
                        key={item.id}
                        className={`transition-colors ${
                          isCurrentPreview ? 'bg-blue-50/70' :
                          isSelected ? 'bg-slate-50' : 'hover:bg-slate-50/50'
                        }`}
                      >
                        <td className="py-3 px-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectOne(item.id)}
                            className="rounded text-blue-600 focus:ring-blue-500/30"
                          />
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-blue-700">
                          {item.id}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{item.type}</div>
                          <div className="text-[10px] font-mono text-slate-500 truncate max-w-[160px]">{item.fileName}</div>
                        </td>
                        <td className="py-3 px-3">
                          <Link 
                            href={`/centres/${item.centreId}`}
                            className="font-semibold text-slate-800 hover:text-blue-700 hover:underline block truncate max-w-[140px]"
                          >
                            {item.centreName}
                          </Link>
                          <span className="text-[10px] text-slate-400 font-mono">{item.centreId}</span>
                        </td>
                        <td className="py-3 px-3 text-slate-500 text-[11px]">
                          {item.timestamp}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            item.freshness === 'Fresh' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {item.freshness}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            item.status === 'Valid' ? 'bg-emerald-100 text-emerald-800' :
                            item.status === 'Issue' ? 'bg-rose-100 text-rose-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            <span>{item.status}</span>
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => setPreviewItem(item)}
                            className="p-1 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-slate-200 transition-colors"
                            title="Inspect in side panel"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3 border-t border-slate-200 text-xs text-slate-500 flex justify-between">
              <span>Showing {filteredItems.length} evidence records</span>
              <span>SHA-256 Ledger Authenticated</span>
            </div>
          </div>
        </div>

        {/* Right Column: AI / Rules Analysis & Human Review Panels (Image 2 Panel 3) */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI / Rules Analysis Panel matching Reference */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>AI / Rules Analysis</span>
              </h3>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                Automated
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/80 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-800">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Missing Evidence</span>
                </div>
                <p className="text-[11px] text-rose-700">
                  Lab photo for <strong>TC002 (Skill Centre, Dehradun)</strong> missing for scheduled practical batch (09 Jun).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-800">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Stale Evidence</span>
                </div>
                <p className="text-[11px] text-amber-700">
                  Equipment video for <strong>TC001 (Govt. ITI Chamoli)</strong> re-uploaded with older EXIF timestamp (08 Jun).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-orange-50 border border-orange-200/80 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-orange-800">
                  <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
                  <span>Inconsistent Record</span>
                </div>
                <p className="text-[11px] text-orange-700">
                  Attendance count mismatch for <strong>TC007 (Polytech, Tehri)</strong>: AI counted 18 trainees vs 40 claimed in manual register.
                </p>
              </div>
            </div>
          </div>

          {/* Human Review Section matching Reference */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Human Review & Sign-Off</span>
              </h3>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                Auditor
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Assigned Reviewer
                </label>
                <select
                  value={activeReviewer}
                  onChange={(e) => setActiveReviewer(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {HUMAN_REVIEWERS.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Audit Notes & Directives
                </label>
                <textarea
                  rows={3}
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                  placeholder="Enter observation notes..."
                ></textarea>
              </div>

              {/* Action Buttons matching Reference */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleRejectEvidence}
                  className="w-full py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs transition-colors flex items-center justify-center space-x-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>

                <button
                  type="button"
                  onClick={handleMarkResolved}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center space-x-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark as Resolved</span>
                </button>
              </div>
            </div>
          </div>

          {/* Selected Evidence Item Preview */}
          {previewItem && (
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-amber-400 font-bold">{previewItem.id}</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                  {previewItem.source}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white">{previewItem.type}</h4>
                <p className="text-[11px] font-mono text-slate-400 truncate">{previewItem.fileName}</p>
                <p className="text-[11px] text-slate-300 mt-1">{previewItem.centreName} ({previewItem.centreId})</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Timestamp:</span>
                  <span className="font-mono text-slate-200">{previewItem.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Student Consent:</span>
                  <span className="text-emerald-400 font-bold">{previewItem.consent ? 'Captured (DPDP §6)' : 'Missing'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SHA-256 Hash:</span>
                  <span className="font-mono text-slate-400 text-[10px]">e3b0c442...a5e2f</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
