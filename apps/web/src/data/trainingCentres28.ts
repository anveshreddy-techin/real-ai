// 28 Empaneled Training Centres Registry matching SIH 26245 Prototype Specs
// Total: 28 | Compliant: 19 (67.9%) | Needs Review: 5 (17.9%) | Critical: 4 (14.3%)

export interface TrainingCentreRecord {
  id: string;
  name: string;
  location: string;
  state: string;
  type: string;
  batches: number;
  contact: string;
  compliance: number;
  status: 'Compliant' | 'Needs Review' | 'Critical';
  attendance: {
    registered: number;
    present: number;
    rate: number;
  };
  completeness: {
    overall: number;
    attendance: number;
    infra: number;
    media: number;
    other: number;
  };
  reviewer: {
    name: string;
    role: string;
    updated: string;
  };
  infrastructureStatus: {
    classrooms: string;
    labs: string;
    equipment: string;
    sanitation: string;
  };
  complianceSummary: string[];
}

export const TRAINING_CENTRES_28: TrainingCentreRecord[] = [
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
    "attendance": {
      "registered": 200,
      "present": 200,
      "rate": 100
    },
    "completeness": {
      "overall": 98,
      "attendance": 100,
      "infra": 95,
      "media": 100,
      "other": 95
    },
    "reviewer": {
      "name": "R. Singh",
      "role": "Field Inspector",
      "updated": "10 Jun 2025, 09:30 AM"
    },
    "infrastructureStatus": {
      "classrooms": "5/5",
      "labs": "3/3",
      "equipment": "4/4",
      "sanitation": "5/5"
    },
    "complianceSummary": [
      "All parameters verified",
      "Zero attendance discrepancy",
      "BOM equipment 100% present"
    ]
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
    "attendance": {
      "registered": 240,
      "present": 180,
      "rate": 75
    },
    "completeness": {
      "overall": 68,
      "attendance": 80,
      "infra": 60,
      "media": 70,
      "other": 50
    },
    "reviewer": {
      "name": "Priya Sharma",
      "role": "Field Officer",
      "updated": "10 Jun 2025, 11:45 AM"
    },
    "infrastructureStatus": {
      "classrooms": "4/5",
      "labs": "2/3",
      "equipment": "3/4",
      "sanitation": "5/5"
    },
    "complianceSummary": [
      "Lab equipment verification pending",
      "Missing attendance log for Batch 3",
      "Reviewer assigned"
    ]
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
    "attendance": {
      "registered": 250,
      "present": 155,
      "rate": 62
    },
    "completeness": {
      "overall": 58,
      "attendance": 62,
      "infra": 55,
      "media": 60,
      "other": 45
    },
    "reviewer": {
      "name": "A. Gupta",
      "role": "Senior Auditor",
      "updated": "09 Jun 2025, 02:15 PM"
    },
    "infrastructureStatus": {
      "classrooms": "3/5",
      "labs": "1/3",
      "equipment": "2/4",
      "sanitation": "5/5"
    },
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
    "attendance": {
      "registered": 150,
      "present": 135,
      "rate": 90
    },
    "completeness": {
      "overall": 92,
      "attendance": 90,
      "infra": 95,
      "media": 90,
      "other": 90
    },
    "reviewer": {
      "name": "S. Rawat",
      "role": "Nodal Officer",
      "updated": "09 Jun 2025, 04:00 PM"
    },
    "infrastructureStatus": {
      "classrooms": "5/5",
      "labs": "3/3",
      "equipment": "4/4",
      "sanitation": "4/5"
    },
    "complianceSummary": [
      "High student retention",
      "Full equipment compliance",
      "Regular AEBAS punches"
    ]
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
    "attendance": {
      "registered": 160,
      "present": 109,
      "rate": 68
    },
    "completeness": {
      "overall": 65,
      "attendance": 70,
      "infra": 60,
      "media": 65,
      "other": 60
    },
    "reviewer": {
      "name": "Priya Sharma",
      "role": "Field Officer",
      "updated": "08 Jun 2025, 10:20 AM"
    },
    "infrastructureStatus": {
      "classrooms": "3/5",
      "labs": "2/3",
      "equipment": "2/4",
      "sanitation": "4/5"
    },
    "complianceSummary": [
      "Temporary equipment borrowing suspected",
      "Attendance variance flagged",
      "Follow-up audit scheduled"
    ]
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
    "attendance": {
      "registered": 180,
      "present": 180,
      "rate": 100
    },
    "completeness": {
      "overall": 100,
      "attendance": 100,
      "infra": 100,
      "media": 100,
      "other": 100
    },
    "reviewer": {
      "name": "R. Singh",
      "role": "Field Inspector",
      "updated": "08 Jun 2025, 03:30 PM"
    },
    "infrastructureStatus": {
      "classrooms": "5/5",
      "labs": "3/3",
      "equipment": "4/4",
      "sanitation": "5/5"
    },
    "complianceSummary": [
      "100% biometric attendance verification",
      "Solar power lab fully functional",
      "All trainee records valid"
    ]
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
    "attendance": {
      "registered": 220,
      "present": 99,
      "rate": 45
    },
    "completeness": {
      "overall": 48,
      "attendance": 45,
      "infra": 50,
      "media": 50,
      "other": 40
    },
    "reviewer": {
      "name": "S. Khan",
      "role": "Audit Officer",
      "updated": "07 Jun 2025, 11:15 AM"
    },
    "infrastructureStatus": {
      "classrooms": "2/5",
      "labs": "1/3",
      "equipment": "1/4",
      "sanitation": "3/5"
    },
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
    "attendance": {
      "registered": 140,
      "present": 126,
      "rate": 90
    },
    "completeness": {
      "overall": 90,
      "attendance": 90,
      "infra": 90,
      "media": 90,
      "other": 90
    },
    "reviewer": {
      "name": "R. Singh",
      "role": "Field Inspector",
      "updated": "07 Jun 2025, 02:45 PM"
    },
    "infrastructureStatus": {
      "classrooms": "4/5",
      "labs": "3/3",
      "equipment": "4/4",
      "sanitation": "5/5"
    },
    "complianceSummary": [
      "Electrical workstation compliant",
      "Consistent camera headcount",
      "Trainer attendance logged"
    ]
  },
  {
    "id": "TC009",
    "name": "PMKVY Kendra, Gorakhpur",
    "location": "Gorakhpur, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "type": "Government / Empaneled",
    "batches": 3,
    "contact": "+91 98200 00900",
    "compliance": 95,
    "status": "Compliant",
    "attendance": {
      "registered": 200,
      "present": 190,
      "rate": 95
    },
    "completeness": {
      "overall": 95,
      "attendance": 95,
      "infra": 90,
      "media": 95,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "5/5",
      "labs": "3/3",
      "equipment": "4/4",
      "sanitation": "5/5"
    },
    "complianceSummary": [
      "Standard inspection compliant"
    ]
  },
  {
    "id": "TC010",
    "name": "Kaushal Vikas Kendra, Jaipur",
    "location": "Jaipur, Rajasthan",
    "state": "Rajasthan",
    "type": "Government / Empaneled",
    "batches": 3,
    "contact": "+91 98200 01000",
    "compliance": 92,
    "status": "Compliant",
    "attendance": {
      "registered": 200,
      "present": 184,
      "rate": 92
    },
    "completeness": {
      "overall": 92,
      "attendance": 92,
      "infra": 87,
      "media": 92,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "4/5",
      "labs": "3/3",
      "equipment": "4/4",
      "sanitation": "5/5"
    },
    "complianceSummary": [
      "Standard inspection compliant"
    ]
  },
  {
    "id": "TC011",
    "name": "Govt. ITI, Haldwani",
    "location": "Nainital, Uttarakhand",
    "state": "Uttarakhand",
    "type": "Government / Empaneled",
    "batches": 3,
    "contact": "+91 98200 01100",
    "compliance": 88,
    "status": "Compliant",
    "attendance": {
      "registered": 200,
      "present": 176,
      "rate": 88
    },
    "completeness": {
      "overall": 88,
      "attendance": 88,
      "infra": 83,
      "media": 88,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "4/5",
      "labs": "3/3",
      "equipment": "3/4",
      "sanitation": "4/5"
    },
    "complianceSummary": [
      "Standard inspection compliant"
    ]
  },
  {
    "id": "TC012",
    "name": "Skill Hub, Almora",
    "location": "Almora, Uttarakhand",
    "state": "Uttarakhand",
    "type": "Government / Empaneled",
    "batches": 3,
    "contact": "+91 98200 01200",
    "compliance": 72,
    "status": "Needs Review",
    "attendance": {
      "registered": 200,
      "present": 144,
      "rate": 72
    },
    "completeness": {
      "overall": 72,
      "attendance": 72,
      "infra": 67,
      "media": 72,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "3/5",
      "labs": "2/3",
      "equipment": "3/4",
      "sanitation": "4/5"
    },
    "complianceSummary": [
      "Variance detected; pending review"
    ]
  },
  {
    "id": "TC013",
    "name": "Vocational Centre, Jodhpur",
    "location": "Jodhpur, Rajasthan",
    "state": "Rajasthan",
    "type": "Government / Empaneled",
    "batches": 3,
    "contact": "+91 98200 01300",
    "compliance": 90,
    "status": "Compliant",
    "attendance": {
      "registered": 200,
      "present": 180,
      "rate": 90
    },
    "completeness": {
      "overall": 90,
      "attendance": 90,
      "infra": 85,
      "media": 90,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "4/5",
      "labs": "3/3",
      "equipment": "4/4",
      "sanitation": "5/5"
    },
    "complianceSummary": [
      "Standard inspection compliant"
    ]
  },
  {
    "id": "TC014",
    "name": "Pratham Kendra, Lucknow",
    "location": "Lucknow, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "type": "Government / Empaneled",
    "batches": 4,
    "contact": "+91 98200 01400",
    "compliance": 52,
    "status": "Critical",
    "attendance": {
      "registered": 200,
      "present": 104,
      "rate": 52
    },
    "completeness": {
      "overall": 52,
      "attendance": 52,
      "infra": 50,
      "media": 52,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "2/5",
      "labs": "1/3",
      "equipment": "2/4",
      "sanitation": "3/5"
    },
    "complianceSummary": [
      "Variance detected; pending review"
    ]
  },
  {
    "id": "TC015",
    "name": "RSETI, Bageshwar",
    "location": "Bageshwar, Uttarakhand",
    "state": "Uttarakhand",
    "type": "Government / Empaneled",
    "batches": 4,
    "contact": "+91 98200 01500",
    "compliance": 70,
    "status": "Needs Review",
    "attendance": {
      "registered": 200,
      "present": 140,
      "rate": 70
    },
    "completeness": {
      "overall": 70,
      "attendance": 70,
      "infra": 65,
      "media": 70,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "3/5",
      "labs": "2/3",
      "equipment": "3/4",
      "sanitation": "4/5"
    },
    "complianceSummary": [
      "Variance detected; pending review"
    ]
  },
  {
    "id": "TC016",
    "name": "Govt. Polytechnic, Roorkee",
    "location": "Haridwar, Uttarakhand",
    "state": "Uttarakhand",
    "type": "Government / Empaneled",
    "batches": 3,
    "contact": "+91 98200 01600",
    "compliance": 94,
    "status": "Compliant",
    "attendance": {
      "registered": 200,
      "present": 188,
      "rate": 94
    },
    "completeness": {
      "overall": 94,
      "attendance": 94,
      "infra": 89,
      "media": 94,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "5/5",
      "labs": "3/3",
      "equipment": "4/4",
      "sanitation": "5/5"
    },
    "complianceSummary": [
      "Standard inspection compliant"
    ]
  },
  {
    "id": "TC017",
    "name": "Skill Centre, Malda",
    "location": "Malda, West Bengal",
    "state": "West Bengal",
    "type": "Government / Empaneled",
    "batches": 3,
    "contact": "+91 98200 01700",
    "compliance": 88,
    "status": "Compliant",
    "attendance": {
      "registered": 200,
      "present": 176,
      "rate": 88
    },
    "completeness": {
      "overall": 88,
      "attendance": 88,
      "infra": 83,
      "media": 88,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "4/5",
      "labs": "3/3",
      "equipment": "3/4",
      "sanitation": "5/5"
    },
    "complianceSummary": [
      "Standard inspection compliant"
    ]
  },
  {
    "id": "TC018",
    "name": "Rural ITI, Uttarkashi",
    "location": "Uttarkashi, Uttarakhand",
    "state": "Uttarakhand",
    "type": "Government / Empaneled",
    "batches": 3,
    "contact": "+91 98200 01800",
    "compliance": 86,
    "status": "Compliant",
    "attendance": {
      "registered": 200,
      "present": 172,
      "rate": 86
    },
    "completeness": {
      "overall": 86,
      "attendance": 86,
      "infra": 81,
      "media": 86,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "4/5",
      "labs": "2/3",
      "equipment": "4/4",
      "sanitation": "4/5"
    },
    "complianceSummary": [
      "Standard inspection compliant"
    ]
  },
  {
    "id": "TC019",
    "name": "Technical Institute, Nagpur",
    "location": "Nagpur, Maharashtra",
    "state": "Maharashtra",
    "type": "Government / Empaneled",
    "batches": 3,
    "contact": "+91 98200 01900",
    "compliance": 91,
    "status": "Compliant",
    "attendance": {
      "registered": 200,
      "present": 182,
      "rate": 91
    },
    "completeness": {
      "overall": 91,
      "attendance": 91,
      "infra": 86,
      "media": 91,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "5/5",
      "labs": "3/3",
      "equipment": "4/4",
      "sanitation": "5/5"
    },
    "complianceSummary": [
      "Standard inspection compliant"
    ]
  },
  {
    "id": "TC020",
    "name": "Kaushal Bhavan, Shimla",
    "location": "Shimla, Himachal Pradesh",
    "state": "Himachal Pradesh",
    "type": "Government / Empaneled",
    "batches": 3,
    "contact": "+91 98200 02000",
    "compliance": 96,
    "status": "Compliant",
    "attendance": {
      "registered": 200,
      "present": 192,
      "rate": 96
    },
    "completeness": {
      "overall": 96,
      "attendance": 96,
      "infra": 91,
      "media": 96,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "5/5",
      "labs": "3/3",
      "equipment": "4/4",
      "sanitation": "5/5"
    },
    "complianceSummary": [
      "Standard inspection compliant"
    ]
  },
  {
    "id": "TC021",
    "name": "Apex Skill Academy, Rishikesh",
    "location": "Dehradun, Uttarakhand",
    "state": "Uttarakhand",
    "type": "Government / Empaneled",
    "batches": 3,
    "contact": "+91 98200 02100",
    "compliance": 74,
    "status": "Needs Review",
    "attendance": {
      "registered": 200,
      "present": 148,
      "rate": 74
    },
    "completeness": {
      "overall": 74,
      "attendance": 74,
      "infra": 69,
      "media": 74,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "4/5",
      "labs": "2/3",
      "equipment": "3/4",
      "sanitation": "4/5"
    },
    "complianceSummary": [
      "Variance detected; pending review"
    ]
  },
  {
    "id": "TC022",
    "name": "Govt. ITI, Kotdwar",
    "location": "Pauri Garhwal, Uttarakhand",
    "state": "Uttarakhand",
    "type": "Government / Empaneled",
    "batches": 3,
    "contact": "+91 98200 02200",
    "compliance": 89,
    "status": "Compliant",
    "attendance": {
      "registered": 200,
      "present": 178,
      "rate": 89
    },
    "completeness": {
      "overall": 89,
      "attendance": 89,
      "infra": 84,
      "media": 89,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "4/5",
      "labs": "3/3",
      "equipment": "4/4",
      "sanitation": "5/5"
    },
    "complianceSummary": [
      "Standard inspection compliant"
    ]
  },
  {
    "id": "TC023",
    "name": "National Skill Training Inst, Dehradun",
    "location": "Dehradun, Uttarakhand",
    "state": "Uttarakhand",
    "type": "Government / Empaneled",
    "batches": 3,
    "contact": "+91 98200 02300",
    "compliance": 98,
    "status": "Compliant",
    "attendance": {
      "registered": 200,
      "present": 196,
      "rate": 98
    },
    "completeness": {
      "overall": 98,
      "attendance": 98,
      "infra": 93,
      "media": 98,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "5/5",
      "labs": "3/3",
      "equipment": "4/4",
      "sanitation": "5/5"
    },
    "complianceSummary": [
      "Standard inspection compliant"
    ]
  },
  {
    "id": "TC024",
    "name": "Surya Kaushal Kendra, Kota",
    "location": "Kota, Rajasthan",
    "state": "Rajasthan",
    "type": "Government / Empaneled",
    "batches": 4,
    "contact": "+91 98200 02400",
    "compliance": 48,
    "status": "Critical",
    "attendance": {
      "registered": 200,
      "present": 96,
      "rate": 48
    },
    "completeness": {
      "overall": 48,
      "attendance": 48,
      "infra": 50,
      "media": 48,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "2/5",
      "labs": "1/3",
      "equipment": "1/4",
      "sanitation": "3/5"
    },
    "complianceSummary": [
      "Variance detected; pending review"
    ]
  },
  {
    "id": "TC025",
    "name": "Himalayan Skill Centre, Solan",
    "location": "Solan, Himachal Pradesh",
    "state": "Himachal Pradesh",
    "type": "Government / Empaneled",
    "batches": 3,
    "contact": "+91 98200 02500",
    "compliance": 93,
    "status": "Compliant",
    "attendance": {
      "registered": 200,
      "present": 186,
      "rate": 93
    },
    "completeness": {
      "overall": 93,
      "attendance": 93,
      "infra": 88,
      "media": 93,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "5/5",
      "labs": "3/3",
      "equipment": "4/4",
      "sanitation": "5/5"
    },
    "complianceSummary": [
      "Standard inspection compliant"
    ]
  },
  {
    "id": "TC026",
    "name": "Model ITI, Varanasi",
    "location": "Varanasi, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "type": "Government / Empaneled",
    "batches": 3,
    "contact": "+91 98200 02600",
    "compliance": 95,
    "status": "Compliant",
    "attendance": {
      "registered": 200,
      "present": 190,
      "rate": 95
    },
    "completeness": {
      "overall": 95,
      "attendance": 95,
      "infra": 90,
      "media": 95,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "5/5",
      "labs": "3/3",
      "equipment": "4/4",
      "sanitation": "5/5"
    },
    "complianceSummary": [
      "Standard inspection compliant"
    ]
  },
  {
    "id": "TC027",
    "name": "PMKK Centre, Siliguri",
    "location": "Darjeeling, West Bengal",
    "state": "West Bengal",
    "type": "Government / Empaneled",
    "batches": 3,
    "contact": "+91 98200 02700",
    "compliance": 91,
    "status": "Compliant",
    "attendance": {
      "registered": 200,
      "present": 182,
      "rate": 91
    },
    "completeness": {
      "overall": 91,
      "attendance": 91,
      "infra": 86,
      "media": 91,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "4/5",
      "labs": "3/3",
      "equipment": "4/4",
      "sanitation": "5/5"
    },
    "complianceSummary": [
      "Standard inspection compliant"
    ]
  },
  {
    "id": "TC028",
    "name": "DDU-GKY Training Hub, Pune",
    "location": "Pune, Maharashtra",
    "state": "Maharashtra",
    "type": "Government / Empaneled",
    "batches": 3,
    "contact": "+91 98200 02800",
    "compliance": 97,
    "status": "Compliant",
    "attendance": {
      "registered": 200,
      "present": 194,
      "rate": 97
    },
    "completeness": {
      "overall": 97,
      "attendance": 97,
      "infra": 92,
      "media": 97,
      "other": 80
    },
    "reviewer": {
      "name": "Field Officer",
      "role": "Auditor",
      "updated": "06 Jun 2025"
    },
    "infrastructureStatus": {
      "classrooms": "5/5",
      "labs": "3/3",
      "equipment": "4/4",
      "sanitation": "5/5"
    },
    "complianceSummary": [
      "Standard inspection compliant"
    ]
  }
];
