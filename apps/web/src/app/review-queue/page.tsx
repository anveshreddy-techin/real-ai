'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  Filter, 
  Search, 
  UserCheck, 
  Calendar, 
  ArrowRight, 
  ChevronRight, 
  ShieldAlert, 
  Sparkles, 
  FileCheck,
  Building2,
  RefreshCw,
  Plus
} from 'lucide-react';
import { 
  CORRECTIVE_ACTIONS, 
  ACTION_METRICS, 
  OPEN_ISSUES_BY_TYPE, 
  ACTION_WORKFLOW_STEPS, 
  CorrectiveAction 
} from '@/data/correctiveActions';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function ReviewQueuePage() {
  const { t } = useLanguage();
  const [actions, setActions] = useState<CorrectiveAction[]>(CORRECTIVE_ACTIONS);
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | 'High' | 'Medium' | 'Low'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Compute dynamic counts
  const totalCount = actions.length;
  const highCount = actions.filter(a => a.priority === 'High' && a.status !== 'Resolved').length;
  const mediumCount = actions.filter(a => a.priority === 'Medium' && a.status !== 'Resolved').length;
  const lowCount = actions.filter(a => a.priority === 'Low' && a.status !== 'Resolved').length;
  const resolvedCount = actions.filter(a => a.status === 'Resolved').length;

  // Filtered actions
  const filteredActions = useMemo(() => {
    return actions.filter(action => {
      const matchesSearch = 
        action.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        action.centreName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        action.centreId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        action.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        action.owner.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPriority = priorityFilter === 'ALL' || action.priority === priorityFilter;
      const matchesCategory = categoryFilter === 'ALL' || action.category === categoryFilter;
      const matchesStatus = 
        statusFilter === 'ALL' ? true :
        statusFilter === 'ACTIVE' ? action.status !== 'Resolved' :
        action.status === statusFilter;

      return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
    });
  }, [actions, searchTerm, priorityFilter, categoryFilter, statusFilter]);

  // Handle Quick Resolve or Advance Status
  const handleAdvanceStatus = (id: string) => {
    setActions(prev => prev.map(action => {
      if (action.id === id) {
        let nextStatus: CorrectiveAction['status'] = 'Resolved';
        if (action.status === 'Open' || action.status === 'Assigned') nextStatus = 'In Progress';
        else if (action.status === 'In Progress' || action.status === 'Pending') nextStatus = 'Resolved';
        else if (action.status === 'Resolved') nextStatus = 'In Progress';

        setToastMessage(`Action ${action.id} status updated to "${nextStatus}".`);
        setTimeout(() => setToastMessage(null), 3000);
        return { ...action, status: nextStatus };
      }
      return action;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 mb-1">
            <Link href="/dashboard" className="hover:underline flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Command Dashboard</span>
            </Link>
            <span>/</span>
            <span>Remediation Workflow</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Corrective Action Queue
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Centralized nodal officer remediation pipeline for non-compliant training centres and evidence anomalies
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/evidence"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
          >
            <span>Inspect Evidence (48)</span>
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-all"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>28 Monitored Centres</span>
          </Link>
        </div>
      </div>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center space-x-2 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Priority KPI Row matching Image 2 Panel 4 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Priority */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Actions</span>
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">{totalCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">{resolvedCount} resolved so far</p>
        </div>

        {/* High Priority */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-rose-200 shadow-sm bg-gradient-to-br from-white to-rose-50/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider">High Priority</span>
            <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-rose-700">{highCount}</div>
          <p className="text-[11px] text-rose-600 font-medium mt-1">SLA Deadline &lt; 48 hours</p>
        </div>

        {/* Medium Priority */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200 shadow-sm bg-gradient-to-br from-white to-amber-50/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Medium Priority</span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-amber-700">{mediumCount}</div>
          <p className="text-[11px] text-amber-600 font-medium mt-1">SLA Deadline &lt; 5 days</p>
        </div>

        {/* Low Priority */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-blue-200 shadow-sm bg-gradient-to-br from-white to-blue-50/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Low Priority</span>
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-blue-700">{lowCount}</div>
          <p className="text-[11px] text-blue-600 font-medium mt-1">Routine documentation</p>
        </div>
      </div>

      {/* Middle Row: 4-Step Action Workflow Banner + Open Issues by Type Donut/Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 4-Step Workflow Banner matching Image 2 Panel 4 */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Action Workflow Architecture</h3>
              <p className="text-xs text-slate-500 mt-0.5">Automated lifecycle of a remediation ticket</p>
            </div>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
              Standard Operating Procedure
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {ACTION_WORKFLOW_STEPS.map((step) => (
              <div 
                key={step.step}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-2 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                    {step.step}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100 flex items-center justify-between">
            <span>Every status change creates an immutable cryptographic log entry on MSDE audit servers.</span>
          </div>
        </div>

        {/* Open Issues by Type matching Image 2 Panel 4 */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Open Issues Distribution</h3>
            <span className="text-xs font-semibold text-slate-500">By Domain</span>
          </div>

          <div className="space-y-3 pt-1">
            {OPEN_ISSUES_BY_TYPE.map((cat) => {
              const totalOpen = OPEN_ISSUES_BY_TYPE.reduce((acc, c) => acc + c.count, 0);
              const percentage = Math.round((cat.count / totalOpen) * 100);

              return (
                <div key={cat.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700 flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                      <span>{cat.name}</span>
                    </span>
                    <span className="font-bold text-slate-900">{cat.count} issues ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ width: `${percentage}%`, backgroundColor: cat.color }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
            <span>Critical bottleneck: Attendance & Infrastructure</span>
          </div>
        </div>
      </div>

      {/* Main Table: Corrective Action Queue matching Image 2 Panel 4 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        {/* Filter Toolbar */}
        <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Remediation Action Items</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {filteredActions.length} of {totalCount} corrective tickets
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ticket, centre, owner..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            {/* Priority Filter */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setPriorityFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  priorityFilter === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setPriorityFilter('High')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  priorityFilter === 'High' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                High
              </button>
              <button
                onClick={() => setPriorityFilter('Medium')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  priorityFilter === 'Medium' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setPriorityFilter('Low')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  priorityFilter === 'Low' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Low
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px] tracking-wider">
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Centre Name & ID</th>
                <th className="py-3 px-4">Issue Description</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Owner</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredActions.map((action) => {
                const isHigh = action.priority === 'High';
                const isResolved = action.status === 'Resolved';

                return (
                  <tr 
                    key={action.id}
                    className={`transition-colors ${
                      isResolved ? 'bg-slate-50/50 opacity-70' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                      {action.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <Link 
                        href={`/centres/${action.centreId}`}
                        className="font-bold text-slate-900 hover:text-blue-700 hover:underline block truncate max-w-[200px]"
                      >
                        {action.centreName}
                      </Link>
                      <span className="text-[10px] text-slate-400 font-mono">{action.centreId}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{action.issue}</div>
                      <span className="text-[10px] text-slate-400">{action.category}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        action.priority === 'High' ? 'bg-rose-100 text-rose-800' :
                        action.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {action.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {action.owner}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {action.deadline}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        action.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                        action.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        action.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        <span>{action.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/centres/${action.centreId}`}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleAdvanceStatus(action.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-sm ${
                            isResolved
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                          }`}
                        >
                          {isResolved ? 'Reopen' : 'Advance'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>NSDC Compliance Escalation Protocol Active</span>
          <span>Automatic Nodal Officer Alert at 48h Deadline</span>
        </div>
      </div>
    </div>
  );
}
