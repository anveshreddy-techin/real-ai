import json

# Generator for 28 Training Centres matching Image 1 (section 3, 4) & Image 2 (section 1, 2)
centres = [
  {
    "id": "TC001",
    "name": "Govt. ITI, Chamoli",
    "location": "Chamoli, Uttarakhand",
    "state": "Uttarakhand",
    "type": "Government Funded",
    "batches": 4,
    "contact": "+91 94120 11001",
    "compliance": 100,
    "status": "Compliant",
    "attendance": {"registered": 200, "present": 200, "rate": 100},
    "completeness": {"overall": 98, "attendance": 100, "infra": 95, "media": 100, "other": 95},
    "reviewer": {"name": "R. Singh", "role": "Field Inspector", "updated": "10 Jun 2025, 09:30 AM"},
    "infrastructureStatus": {"classrooms": "5/5", "labs": "3/3", "equipment": "4/4", "sanitation": "5/5"},
    "complianceSummary": ["All parameters verified", "Zero attendance discrepancy", "BOM equipment 100% present"]
  },
  {
    "id": "TC002",
    "name": "Skill Centre, Dehradun",
    "location": "Dehradun, Uttarakhand",
    "state": "Uttarakhand",
    "type": "Government Funded",
    "batches": 4,
    "contact": "+91 98765 43210",
    "compliance": 75,
    "status": "Needs Review",
    "attendance": {"registered": 240, "present": 180, "rate": 75},
    "completeness": {"overall": 68, "attendance": 80, "infra": 60, "media": 70, "other": 50},
    "reviewer": {"name": "Priya Sharma", "role": "Field Officer", "updated": "10 Jun 2025, 11:45 AM"},
    "infrastructureStatus": {"classrooms": "4/5", "labs": "2/3", "equipment": "3/4", "sanitation": "5/5"},
    "complianceSummary": ["Lab equipment verification pending", "Missing attendance log for Batch 3", "Reviewer assigned"]
  },
  {
    "id": "TC003",
    "name": "ITI, Haridwar",
    "location": "Haridwar, Uttarakhand",
    "state": "Uttarakhand",
    "type": "Government Funded",
    "batches": 5,
    "contact": "+91 98390 14209",
    "compliance": 60,
    "status": "Critical",
    "attendance": {"registered": 250, "present": 155, "rate": 62},
    "completeness": {"overall": 58, "attendance": 62, "infra": 55, "media": 60, "other": 45},
    "reviewer": {"name": "A. Gupta", "role": "Senior Auditor", "updated": "09 Jun 2025, 02:15 PM"},
    "infrastructureStatus": {"classrooms": "3/5", "labs": "1/3", "equipment": "2/4", "sanitation": "5/5"},
    "complianceSummary": [
      "Low attendance rate (62%)",
      "Lab equipment missing",
      "Old infrastructure photos",
      "Action required"
    ]
  },
  {
    "id": "TC004",
    "name": "RSETI, Nainital",
    "location": "Nainital, Uttarakhand",
    "state": "Uttarakhand",
    "type": "RSETI Trust",
    "batches": 3,
    "contact": "+91 94111 88304",
    "compliance": 90,
    "status": "Compliant",
    "attendance": {"registered": 150, "present": 135, "rate": 90},
    "completeness": {"overall": 92, "attendance": 90, "infra": 95, "media": 90, "other": 90},
    "reviewer": {"name": "S. Rawat", "role": "Nodal Officer", "updated": "09 Jun 2025, 04:00 PM"},
    "infrastructureStatus": {"classrooms": "5/5", "labs": "3/3", "equipment": "4/4", "sanitation": "4/5"},
    "complianceSummary": ["High student retention", "Full equipment compliance", "Regular AEBAS punches"]
  },
  {
    "id": "TC005",
    "name": "Skill Centre, Pithoragarh",
    "location": "Pithoragarh, Uttarakhand",
    "state": "Uttarakhand",
    "type": "Private Empaneled",
    "batches": 3,
    "contact": "+91 97190 22305",
    "compliance": 68,
    "status": "Needs Review",
    "attendance": {"registered": 160, "present": 109, "rate": 68},
    "completeness": {"overall": 65, "attendance": 70, "infra": 60, "media": 65, "other": 60},
    "reviewer": {"name": "Priya Sharma", "role": "Field Officer", "updated": "08 Jun 2025, 10:20 AM"},
    "infrastructureStatus": {"classrooms": "3/5", "labs": "2/3", "equipment": "2/4", "sanitation": "4/5"},
    "complianceSummary": ["Temporary equipment borrowing suspected", "Attendance variance flagged", "Follow-up audit scheduled"]
  },
  {
    "id": "TC006",
    "name": "Govt. ITI, Almora",
    "location": "Almora, Uttarakhand",
    "state": "Uttarakhand",
    "type": "Government Funded",
    "batches": 4,
    "contact": "+91 94125 33406",
    "compliance": 100,
    "status": "Compliant",
    "attendance": {"registered": 180, "present": 180, "rate": 100},
    "completeness": {"overall": 100, "attendance": 100, "infra": 100, "media": 100, "other": 100},
    "reviewer": {"name": "R. Singh", "role": "Field Inspector", "updated": "08 Jun 2025, 03:30 PM"},
    "infrastructureStatus": {"classrooms": "5/5", "labs": "3/3", "equipment": "4/4", "sanitation": "5/5"},
    "complianceSummary": ["100% biometric attendance verification", "Solar power lab fully functional", "All trainee records valid"]
  },
  {
    "id": "TC007",
    "name": "Polytech, Tehri",
    "location": "Tehri Garhwal, Uttarakhand",
    "state": "Uttarakhand",
    "type": "State Polytechnic",
    "batches": 4,
    "contact": "+91 98970 44507",
    "compliance": 45,
    "status": "Critical",
    "attendance": {"registered": 220, "present": 99, "rate": 45},
    "completeness": {"overall": 48, "attendance": 45, "infra": 50, "media": 50, "other": 40},
    "reviewer": {"name": "S. Khan", "role": "Audit Officer", "updated": "07 Jun 2025, 11:15 AM"},
    "infrastructureStatus": {"classrooms": "2/5", "labs": "1/3", "equipment": "1/4", "sanitation": "3/5"},
    "complianceSummary": [
      "Severe ghost attendance (-55%)",
      "Duplicate biometric entries detected",
      "Notice Form 4A issued; subsidy on hold"
    ]
  },
  {
    "id": "TC008",
    "name": "ITI, Rudraprayag",
    "location": "Rudraprayag, Uttarakhand",
    "state": "Uttarakhand",
    "type": "Government Funded",
    "batches": 3,
    "contact": "+91 94113 55608",
    "compliance": 90,
    "status": "Compliant",
    "attendance": {"registered": 140, "present": 126, "rate": 90},
    "completeness": {"overall": 90, "attendance": 90, "infra": 90, "media": 90, "other": 90},
    "reviewer": {"name": "R. Singh", "role": "Field Inspector", "updated": "07 Jun 2025, 02:45 PM"},
    "infrastructureStatus": {"classrooms": "4/5", "labs": "3/3", "equipment": "4/4", "sanitation": "5/5"},
    "complianceSummary": ["Electrical workstation compliant", "Consistent camera headcount", "Trainer attendance logged"]
  }
]

# Additional 20 centres to reach 28 total (19 Compliant, 5 Needs Review, 4 Critical)
extra = [
  ("TC009", "PMKVY Kendra, Gorakhpur", "Gorakhpur, Uttar Pradesh", "Uttar Pradesh", "Compliant", 95, "5/5", "3/3", "4/4", "5/5"),
  ("TC010", "Kaushal Vikas Kendra, Jaipur", "Jaipur, Rajasthan", "Rajasthan", "Compliant", 92, "4/5", "3/3", "4/4", "5/5"),
  ("TC011", "Govt. ITI, Haldwani", "Nainital, Uttarakhand", "Uttarakhand", "Compliant", 88, "4/5", "3/3", "3/4", "4/5"),
  ("TC012", "Skill Hub, Almora", "Almora, Uttarakhand", "Uttarakhand", "Needs Review", 72, "3/5", "2/3", "3/4", "4/5"),
  ("TC013", "Vocational Centre, Jodhpur", "Jodhpur, Rajasthan", "Rajasthan", "Compliant", 90, "4/5", "3/3", "4/4", "5/5"),
  ("TC014", "Pratham Kendra, Lucknow", "Lucknow, Uttar Pradesh", "Uttar Pradesh", "Critical", 52, "2/5", "1/3", "2/4", "3/5"),
  ("TC015", "RSETI, Bageshwar", "Bageshwar, Uttarakhand", "Uttarakhand", "Needs Review", 70, "3/5", "2/3", "3/4", "4/5"),
  ("TC016", "Govt. Polytechnic, Roorkee", "Haridwar, Uttarakhand", "Uttarakhand", "Compliant", 94, "5/5", "3/3", "4/4", "5/5"),
  ("TC017", "Skill Centre, Malda", "Malda, West Bengal", "West Bengal", "Compliant", 88, "4/5", "3/3", "3/4", "5/5"),
  ("TC018", "Rural ITI, Uttarkashi", "Uttarkashi, Uttarakhand", "Uttarakhand", "Compliant", 86, "4/5", "2/3", "4/4", "4/5"),
  ("TC019", "Technical Institute, Nagpur", "Nagpur, Maharashtra", "Maharashtra", "Compliant", 91, "5/5", "3/3", "4/4", "5/5"),
  ("TC020", "Kaushal Bhavan, Shimla", "Shimla, Himachal Pradesh", "Himachal Pradesh", "Compliant", 96, "5/5", "3/3", "4/4", "5/5"),
  ("TC021", "Apex Skill Academy, Rishikesh", "Dehradun, Uttarakhand", "Uttarakhand", "Needs Review", 74, "4/5", "2/3", "3/4", "4/5"),
  ("TC022", "Govt. ITI, Kotdwar", "Pauri Garhwal, Uttarakhand", "Uttarakhand", "Compliant", 89, "4/5", "3/3", "4/4", "5/5"),
  ("TC023", "National Skill Training Inst, Dehradun", "Dehradun, Uttarakhand", "Uttarakhand", "Compliant", 98, "5/5", "3/3", "4/4", "5/5"),
  ("TC024", "Surya Kaushal Kendra, Kota", "Kota, Rajasthan", "Rajasthan", "Critical", 48, "2/5", "1/3", "1/4", "3/5"),
  ("TC025", "Himalayan Skill Centre, Solan", "Solan, Himachal Pradesh", "Himachal Pradesh", "Compliant", 93, "5/5", "3/3", "4/4", "5/5"),
  ("TC026", "Model ITI, Varanasi", "Varanasi, Uttar Pradesh", "Uttar Pradesh", "Compliant", 95, "5/5", "3/3", "4/4", "5/5"),
  ("TC027", "PMKK Centre, Siliguri", "Darjeeling, West Bengal", "West Bengal", "Compliant", 91, "4/5", "3/3", "4/4", "5/5"),
  ("TC028", "DDU-GKY Training Hub, Pune", "Pune, Maharashtra", "Maharashtra", "Compliant", 97, "5/5", "3/3", "4/4", "5/5"),
]

for cid, name, loc, st, stat, comp, cr, lb, eq, sn in extra:
    centres.append({
        "id": cid,
        "name": name,
        "location": loc,
        "state": st,
        "type": "Government / Empaneled",
        "batches": 3 if comp > 70 else 4,
        "contact": f"+91 98200 {cid[-3:]}00",
        "compliance": comp,
        "status": stat,
        "attendance": {"registered": 200, "present": int(200 * comp / 100), "rate": comp},
        "completeness": {"overall": comp, "attendance": comp, "infra": max(50, comp - 5), "media": comp, "other": 80},
        "reviewer": {"name": "Field Officer", "role": "Auditor", "updated": "06 Jun 2025"},
        "infrastructureStatus": {"classrooms": cr, "labs": lb, "equipment": eq, "sanitation": sn},
        "complianceSummary": ["Standard inspection compliant" if stat == "Compliant" else "Variance detected; pending review"]
    })

# Save trainingCentres28.ts
ts28 = f"""// 28 Empaneled Training Centres Registry matching SIH 26245 Prototype Specs
// Total: 28 | Compliant: 19 (67.9%) | Needs Review: 5 (17.9%) | Critical: 4 (14.3%)

export interface TrainingCentreRecord {{
  id: string;
  name: string;
  location: string;
  state: string;
  type: string;
  batches: number;
  contact: string;
  compliance: number;
  status: 'Compliant' | 'Needs Review' | 'Critical';
  attendance: {{
    registered: number;
    present: number;
    rate: number;
  }};
  completeness: {{
    overall: number;
    attendance: number;
    infra: number;
    media: number;
    other: number;
  }};
  reviewer: {{
    name: string;
    role: string;
    updated: string;
  }};
  infrastructureStatus: {{
    classrooms: string;
    labs: string;
    equipment: string;
    sanitation: string;
  }};
  complianceSummary: string[];
}}

export const TRAINING_CENTRES_28: TrainingCentreRecord[] = {json.dumps(centres, indent=2, ensure_ascii=False)};
"""

with open('/home/anvesh/Documents/sih26245/apps/web/src/data/trainingCentres28.ts', 'w', encoding='utf-8') as f:
    f.write(ts28)

print("Generated trainingCentres28.ts successfully!")

# Generator for Evidence Data
evidence_items = [
  {"id": "EV001", "type": "Attendance Log", "centreId": "TC002", "centreName": "Skill Centre, Dehradun", "fileName": "attendance_tc002.xlsx", "timestamp": "10 Jun 2025, 09:12 AM", "source": "Portal Upload", "consent": True, "duplicate": False, "freshness": "Fresh", "status": "Issue"},
  {"id": "EV002", "type": "Lab Photo", "centreId": "TC003", "centreName": "ITI, Haridwar", "fileName": "lab_photo_haridwar.jpg", "timestamp": "09 Jun 2025, 02:32 PM", "source": "App Upload", "consent": True, "duplicate": False, "freshness": "Fresh", "status": "Valid"},
  {"id": "EV003", "type": "Equipment Video", "centreId": "TC001", "centreName": "Govt. ITI, Chamoli", "fileName": "equipment_video.mp4", "timestamp": "08 Jun 2025, 04:20 PM", "source": "Video Studio", "consent": True, "duplicate": False, "freshness": "Stale", "status": "Issue"},
  {"id": "EV004", "type": "Attendance Log", "centreId": "TC007", "centreName": "Polytech, Tehri", "fileName": "attendance_tehri.xlsx", "timestamp": "07 Jun 2025, 10:05 AM", "source": "Portal Upload", "consent": True, "duplicate": True, "freshness": "Fresh", "status": "Duplicate"},
  {"id": "EV005", "type": "Infrastructure Pic", "centreId": "TC012", "centreName": "Skill Hub, Almora", "fileName": "infra_almora.jpg", "timestamp": "06 Jun 2025, 11:20 AM", "source": "App Upload", "consent": False, "duplicate": False, "freshness": "Fresh", "status": "Valid"},
  {"id": "EV006", "type": "Classroom Photo", "centreId": "TC003", "centreName": "ITI, Haridwar", "fileName": "classroom_1.jpg", "timestamp": "18 May 2025, 10:30 AM", "source": "App Upload", "consent": True, "duplicate": False, "freshness": "Fresh", "status": "Valid"},
  {"id": "EV007", "type": "Attendance Sheet", "centreId": "TC003", "centreName": "ITI, Haridwar", "fileName": "attendance_sheet.pdf", "timestamp": "18 May 2025, 10:24 AM", "source": "Portal Upload", "consent": True, "duplicate": False, "freshness": "Fresh", "status": "Valid"},
  {"id": "EV008", "type": "Lab Equipment", "centreId": "TC003", "centreName": "ITI, Haridwar", "fileName": "lab_equipment.jpg", "timestamp": "16 May 2025, 11:03 AM", "source": "App Upload", "consent": True, "duplicate": False, "freshness": "Fresh", "status": "Issue"}
]

# Expand to 48 evidence items
for i in range(9, 49):
    cid = f"TC{str((i % 28) + 1).zfill(3)}"
    cname = next((c["name"] for c in centres if c["id"] == cid), "Training Centre")
    types = ["Attendance Log", "Lab Photo", "Equipment Video", "Infrastructure Pic"]
    sources = ["Portal Upload", "App Upload", "Video Studio"]
    etype = types[i % 4]
    source = sources[i % 3]
    is_dup = (i in [4, 18])
    is_stale = (i in [3, 11, 25, 33])
    is_issue = is_dup or is_stale or (i % 7 == 0)
    evidence_items.append({
        "id": f"EV{str(i).zfill(3)}",
        "type": etype,
        "centreId": cid,
        "centreName": cname,
        "fileName": f"{etype.lower().replace(' ', '_')}_{cid.lower()}.jpg" if "Photo" in etype or "Pic" in etype else f"{etype.lower().replace(' ', '_')}_{cid.lower()}.pdf",
        "timestamp": f"{max(1, (10 - i // 5))} Jun 2025, 10:30 AM",
        "source": source,
        "consent": i % 6 != 0,
        "duplicate": is_dup,
        "freshness": "Stale" if is_stale else "Fresh",
        "status": "Duplicate" if is_dup else ("Issue" if is_issue else "Valid")
    })

evidence_stats = {
    "total": len(evidence_items),
    "valid": sum(1 for e in evidence_items if e["status"] == "Valid"),
    "issuesFound": sum(1 for e in evidence_items if e["status"] == "Issue"),
    "duplicates": sum(1 for e in evidence_items if e["status"] == "Duplicate")
}

ts_ev = f"""// Evidence Data for SIH 26245 (Total 48 | Valid 32 | Issues Found 11 | Duplicates 2)
export interface EvidenceRecord {{
  id: string;
  type: string;
  centreId: string;
  centreName: string;
  fileName: string;
  timestamp: string;
  source: 'Portal Upload' | 'App Upload' | 'Video Studio';
  consent: boolean;
  duplicate: boolean;
  freshness: 'Fresh' | 'Stale';
  status: 'Valid' | 'Issue' | 'Duplicate';
}}

export const EVIDENCE_ITEMS: EvidenceRecord[] = {json.dumps(evidence_items, indent=2, ensure_ascii=False)};

export const EVIDENCE_STATS = {json.dumps(evidence_stats, indent=2)};

export const DETECTED_AI_ISSUES = [
  {{ title: 'Missing evidence', detail: 'Lab photo for TC002 (09 Jun)' }},
  {{ title: 'Stale evidence', detail: 'Equipment video for TC001 (08 Jun)' }},
  {{ title: 'Inconsistent record', detail: 'Attendance count mismatch for TC007' }}
];

export const HUMAN_REVIEWERS = [
  'Priya Sharma (Field Officer)',
  'R. Singh (Field Inspector)',
  'A. Gupta (Senior Auditor)',
  'S. Khan (Nodal Officer)'
];
"""

with open('/home/anvesh/Documents/sih26245/apps/web/src/data/evidenceData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_ev)

print("Generated evidenceData.ts successfully!")

# Generator for Corrective Actions Queue (12 items: 4 High, 5 Medium, 3 Low)
actions = [
  {"id": "ACT001", "centreId": "TC002", "centreName": "Skill Centre, Dehradun", "issue": "Missing attendance evidence", "priority": "High", "owner": "R. Singh", "deadline": "12 Jun 2025", "status": "In Progress", "category": "Attendance"},
  {"id": "ACT002", "centreId": "TC003", "centreName": "ITI, Haridwar", "issue": "Infrastructure incomplete", "priority": "High", "owner": "A. Gupta", "deadline": "13 Jun 2025", "status": "Assigned", "category": "Infrastructure"},
  {"id": "ACT003", "centreId": "TC007", "centreName": "Polytech, Tehri", "issue": "Duplicate records", "priority": "Medium", "owner": "S. Khan", "deadline": "14 Jun 2025", "status": "Pending", "category": "Evidence Quality"},
  {"id": "ACT004", "centreId": "TC012", "centreName": "Skill Hub, Almora", "issue": "Stale evidence", "priority": "Medium", "owner": "P. Sharma", "deadline": "16 Jun 2025", "status": "In Progress", "category": "Evidence Quality"},
  {"id": "ACT005", "centreId": "TC019", "centreName": "Technical Institute, Nagpur", "issue": "Equipment not verified", "priority": "Low", "owner": "V. Joshi", "deadline": "18 Jun 2025", "status": "Open", "category": "Infrastructure"},
  {"id": "ACT006", "centreId": "TC021", "centreName": "Apex Skill Academy, Rishikesh", "issue": "Missing consent", "priority": "Medium", "owner": "A. Gupta", "deadline": "20 Jun 2025", "status": "Open", "category": "Evidence Quality"},
  {"id": "ACT007", "centreId": "TC014", "centreName": "Pratham Kendra, Lucknow", "issue": "Ghost attendance discrepancy (-48%)", "priority": "High", "owner": "S. Khan", "deadline": "10 Jun 2025", "status": "In Progress", "category": "Attendance"},
  {"id": "ACT008", "centreId": "TC024", "centreName": "Surya Kaushal Kendra, Kota", "issue": "CCTV optical feed offline > 48h", "priority": "High", "owner": "R. Singh", "deadline": "11 Jun 2025", "status": "Assigned", "category": "Infrastructure"},
  {"id": "ACT009", "centreId": "TC005", "centreName": "Skill Centre, Pithoragarh", "issue": "Temporary equipment borrow suspected", "priority": "Medium", "owner": "P. Sharma", "deadline": "15 Jun 2025", "status": "Pending", "category": "Infrastructure"},
  {"id": "ACT010", "centreId": "TC015", "centreName": "RSETI, Bageshwar", "issue": "Uncertified trainer substitution", "priority": "Medium", "owner": "V. Joshi", "deadline": "17 Jun 2025", "status": "Open", "category": "Attendance"},
  {"id": "ACT011", "centreId": "TC008", "centreName": "ITI, Rudraprayag", "issue": "Gate register log signature mismatch", "priority": "Low", "owner": "R. Singh", "deadline": "22 Jun 2025", "status": "Open", "category": "Others"},
  {"id": "ACT012", "centreId": "TC011", "centreName": "Govt. ITI, Haldwani", "issue": "Minor biometric punch timestamp drift", "priority": "Low", "owner": "P. Sharma", "deadline": "24 Jun 2025", "status": "Open", "category": "Others"}
]

ts_act = f"""// Corrective Actions Queue Data for SIH 26245 (Total 12 | High 4 | Medium 5 | Low 3)
export interface CorrectiveAction {{
  id: string;
  centreId: string;
  centreName: string;
  issue: string;
  priority: 'High' | 'Medium' | 'Low';
  owner: string;
  deadline: string;
  status: 'In Progress' | 'Assigned' | 'Pending' | 'Open' | 'Resolved';
  category: 'Attendance' | 'Infrastructure' | 'Evidence Quality' | 'Others';
}}

export const CORRECTIVE_ACTIONS: CorrectiveAction[] = {json.dumps(actions, indent=2, ensure_ascii=False)};

export const ACTION_METRICS = {{
  total: 12,
  high: 4,
  medium: 5,
  low: 3
}};

export const OPEN_ISSUES_BY_TYPE = [
  {{ name: 'Attendance', count: 4, color: '#3B82F6' }},
  {{ name: 'Infrastructure', count: 4, color: '#F59E0B' }},
  {{ name: 'Evidence Quality', count: 3, color: '#10B981' }},
  {{ name: 'Others', count: 1, color: '#8B5CF6' }}
];

export const ACTION_WORKFLOW_STEPS = [
  {{ step: 1, title: 'Assign', desc: 'To responsible owner' }},
  {{ step: 2, title: 'Review', desc: 'Check evidence & notes' }},
  {{ step: 3, title: 'Resolve', desc: 'Update status' }},
  {{ step: 4, title: 'Audit', desc: 'Keep trail for records' }}
];
"""

with open('/home/anvesh/Documents/sih26245/apps/web/src/data/correctiveActions.ts', 'w', encoding='utf-8') as f:
    f.write(ts_act)

print("Generated correctiveActions.ts successfully!")

