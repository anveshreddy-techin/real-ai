// Corrective Actions Queue Data for SIH 26245 (Total 12 | High 4 | Medium 5 | Low 3)
export interface CorrectiveAction {
  id: string;
  centreId: string;
  centreName: string;
  issue: string;
  priority: 'High' | 'Medium' | 'Low';
  owner: string;
  deadline: string;
  status: 'In Progress' | 'Assigned' | 'Pending' | 'Open' | 'Resolved';
  category: 'Attendance' | 'Infrastructure' | 'Evidence Quality' | 'Others';
}

export const CORRECTIVE_ACTIONS: CorrectiveAction[] = [
  {
    "id": "ACT001",
    "centreId": "TC002",
    "centreName": "Skill Centre, Dehradun",
    "issue": "Missing attendance evidence",
    "priority": "High",
    "owner": "R. Singh",
    "deadline": "12 Jun 2025",
    "status": "In Progress",
    "category": "Attendance"
  },
  {
    "id": "ACT002",
    "centreId": "TC003",
    "centreName": "ITI, Haridwar",
    "issue": "Infrastructure incomplete",
    "priority": "High",
    "owner": "A. Gupta",
    "deadline": "13 Jun 2025",
    "status": "Assigned",
    "category": "Infrastructure"
  },
  {
    "id": "ACT003",
    "centreId": "TC007",
    "centreName": "Polytech, Tehri",
    "issue": "Duplicate records",
    "priority": "Medium",
    "owner": "S. Khan",
    "deadline": "14 Jun 2025",
    "status": "Pending",
    "category": "Evidence Quality"
  },
  {
    "id": "ACT004",
    "centreId": "TC012",
    "centreName": "Skill Hub, Almora",
    "issue": "Stale evidence",
    "priority": "Medium",
    "owner": "P. Sharma",
    "deadline": "16 Jun 2025",
    "status": "In Progress",
    "category": "Evidence Quality"
  },
  {
    "id": "ACT005",
    "centreId": "TC019",
    "centreName": "Technical Institute, Nagpur",
    "issue": "Equipment not verified",
    "priority": "Low",
    "owner": "V. Joshi",
    "deadline": "18 Jun 2025",
    "status": "Open",
    "category": "Infrastructure"
  },
  {
    "id": "ACT006",
    "centreId": "TC021",
    "centreName": "Apex Skill Academy, Rishikesh",
    "issue": "Missing consent",
    "priority": "Medium",
    "owner": "A. Gupta",
    "deadline": "20 Jun 2025",
    "status": "Open",
    "category": "Evidence Quality"
  },
  {
    "id": "ACT007",
    "centreId": "TC014",
    "centreName": "Pratham Kendra, Lucknow",
    "issue": "Ghost attendance discrepancy (-48%)",
    "priority": "High",
    "owner": "S. Khan",
    "deadline": "10 Jun 2025",
    "status": "In Progress",
    "category": "Attendance"
  },
  {
    "id": "ACT008",
    "centreId": "TC024",
    "centreName": "Surya Kaushal Kendra, Kota",
    "issue": "CCTV optical feed offline > 48h",
    "priority": "High",
    "owner": "R. Singh",
    "deadline": "11 Jun 2025",
    "status": "Assigned",
    "category": "Infrastructure"
  },
  {
    "id": "ACT009",
    "centreId": "TC005",
    "centreName": "Skill Centre, Pithoragarh",
    "issue": "Temporary equipment borrow suspected",
    "priority": "Medium",
    "owner": "P. Sharma",
    "deadline": "15 Jun 2025",
    "status": "Pending",
    "category": "Infrastructure"
  },
  {
    "id": "ACT010",
    "centreId": "TC015",
    "centreName": "RSETI, Bageshwar",
    "issue": "Uncertified trainer substitution",
    "priority": "Medium",
    "owner": "V. Joshi",
    "deadline": "17 Jun 2025",
    "status": "Open",
    "category": "Attendance"
  },
  {
    "id": "ACT011",
    "centreId": "TC008",
    "centreName": "ITI, Rudraprayag",
    "issue": "Gate register log signature mismatch",
    "priority": "Low",
    "owner": "R. Singh",
    "deadline": "22 Jun 2025",
    "status": "Open",
    "category": "Others"
  },
  {
    "id": "ACT012",
    "centreId": "TC011",
    "centreName": "Govt. ITI, Haldwani",
    "issue": "Minor biometric punch timestamp drift",
    "priority": "Low",
    "owner": "P. Sharma",
    "deadline": "24 Jun 2025",
    "status": "Open",
    "category": "Others"
  }
];

export const ACTION_METRICS = {
  total: 12,
  high: 4,
  medium: 5,
  low: 3
};

export const OPEN_ISSUES_BY_TYPE = [
  { name: 'Attendance', count: 4, color: '#3B82F6' },
  { name: 'Infrastructure', count: 4, color: '#F59E0B' },
  { name: 'Evidence Quality', count: 3, color: '#10B981' },
  { name: 'Others', count: 1, color: '#8B5CF6' }
];

export const ACTION_WORKFLOW_STEPS = [
  { step: 1, title: 'Assign', desc: 'To responsible owner' },
  { step: 2, title: 'Review', desc: 'Check evidence & notes' },
  { step: 3, title: 'Resolve', desc: 'Update status' },
  { step: 4, title: 'Audit', desc: 'Keep trail for records' }
];
