export interface TraineeRecord {
  candidate_id: string;
  name: string;
  gender: string;
  aebas_punch_in: string;
  aebas_punch_out: string;
  status_in_camera: 'PRESENT' | 'GHOST_ABSENT' | 'LEFT_EARLY';
  confidence: number;
}

export interface Centre {
  centre_id: string;
  name: string;
  state: string;
  district: string;
  address: string;
  scheme: string;
  sanctioned_capacity: number;
  active_batch_size: number;
  latitude: number;
  longitude: number;
  bandwidth_mode: 'LOW' | 'HIGH';
  compliance_score: number;
  compliance_status: 'COMPLIANT' | 'WATCH' | 'ELEVATED_RISK' | 'CRITICAL';
  cameras_online: number;
  total_cameras: number;
  last_audit_timestamp: string;
  attendance: {
    submitted_attendance: number;
    ai_detected_headcount: number;
    discrepancy_delta: number;
    discrepancy_percentage: number;
    fraud_risk_score: number;
    temporal_consistency: number;
    hourly_timeline: { time: string; submitted: number; detected: number }[];
  };
  infrastructure: {
    item_id: string;
    name: string;
    category: string;
    sanctioned_count: number;
    detected_count: number;
    status: 'AVAILABLE' | 'DEFICIT' | 'MISSING';
    confidence: number;
  }[];
  trainees: TraineeRecord[];
}

export const CANONICAL_CENTRES: Centre[] = [
  {
    centre_id: "PMKVY-UP-GKP-0042",
    name: "Pratham Kaushal Vikas Kendra, Gorakhpur",
    state: "Uttar Pradesh",
    district: "Gorakhpur",
    address: "NH-28 Bypass, Medical College Road, Gorakhpur, UP - 273013",
    scheme: "PMKVY 4.0",
    sanctioned_capacity: 40,
    active_batch_size: 35,
    latitude: 26.7606,
    longitude: 83.3732,
    bandwidth_mode: "LOW",
    compliance_score: 48.5,
    compliance_status: "CRITICAL",
    cameras_online: 3,
    total_cameras: 4,
    last_audit_timestamp: "2026-10-02T11:30:00Z",
    attendance: {
      submitted_attendance: 32,
      ai_detected_headcount: 18,
      discrepancy_delta: -14,
      discrepancy_percentage: 43.75,
      fraud_risk_score: 88.0,
      temporal_consistency: 0.54,
      hourly_timeline: [
        { time: "09:00", submitted: 32, detected: 28 },
        { time: "10:00", submitted: 32, detected: 22 },
        { time: "11:00", submitted: 32, detected: 18 },
        { time: "12:00", submitted: 32, detected: 17 },
        { time: "14:00", submitted: 32, detected: 15 },
        { time: "15:00", submitted: 32, detected: 14 }
      ]
    },
    infrastructure: [
      { item_id: "EQ-DESK-01", name: "Student Workbenches", category: "Furniture", sanctioned_count: 35, detected_count: 20, status: "DEFICIT", confidence: 0.94 },
      { item_id: "EQ-SEW-02", name: "Industrial Sewing Machines", category: "Machinery", sanctioned_count: 15, detected_count: 8, status: "DEFICIT", confidence: 0.91 },
      { item_id: "EQ-PROJ-03", name: "Digital Overhead Projector", category: "Electronics", sanctioned_count: 1, detected_count: 0, status: "MISSING", confidence: 0.96 },
      { item_id: "EQ-FIRE-04", name: "Fire Extinguisher ABC Type", category: "Safety", sanctioned_count: 2, detected_count: 2, status: "AVAILABLE", confidence: 0.89 }
    ],
    trainees: [
      // 18 present
      { candidate_id: "CAN-1842-01", name: "Aarav Sharma", gender: "M", aebas_punch_in: "08:52", aebas_punch_out: "13:05", status_in_camera: "PRESENT", confidence: 0.96 },
      { candidate_id: "CAN-1842-02", name: "Pooja Verma", gender: "F", aebas_punch_in: "08:54", aebas_punch_out: "13:02", status_in_camera: "PRESENT", confidence: 0.94 },
      { candidate_id: "CAN-1842-03", name: "Rohan Gupta", gender: "M", aebas_punch_in: "08:55", aebas_punch_out: "13:08", status_in_camera: "PRESENT", confidence: 0.97 },
      { candidate_id: "CAN-1842-04", name: "Sunil Patel", gender: "M", aebas_punch_in: "08:56", aebas_punch_out: "13:01", status_in_camera: "PRESENT", confidence: 0.91 },
      { candidate_id: "CAN-1842-05", name: "Deepa Mishra", gender: "F", aebas_punch_in: "08:57", aebas_punch_out: "13:00", status_in_camera: "PRESENT", confidence: 0.95 },
      { candidate_id: "CAN-1842-06", name: "Kavita Singh", gender: "F", aebas_punch_in: "08:58", aebas_punch_out: "13:04", status_in_camera: "PRESENT", confidence: 0.93 },
      { candidate_id: "CAN-1842-07", name: "Amit Kumar", gender: "M", aebas_punch_in: "08:58", aebas_punch_out: "13:10", status_in_camera: "PRESENT", confidence: 0.92 },
      { candidate_id: "CAN-1842-08", name: "Neha Joshi", gender: "F", aebas_punch_in: "08:59", aebas_punch_out: "13:03", status_in_camera: "PRESENT", confidence: 0.95 },
      { candidate_id: "CAN-1842-09", name: "Sanjay Yadav", gender: "M", aebas_punch_in: "08:59", aebas_punch_out: "13:06", status_in_camera: "PRESENT", confidence: 0.90 },
      { candidate_id: "CAN-1842-10", name: "Rahul Das", gender: "M", aebas_punch_in: "09:00", aebas_punch_out: "13:07", status_in_camera: "PRESENT", confidence: 0.94 },
      { candidate_id: "CAN-1842-11", name: "Priya Roy", gender: "F", aebas_punch_in: "09:00", aebas_punch_out: "13:01", status_in_camera: "PRESENT", confidence: 0.96 },
      { candidate_id: "CAN-1842-12", name: "Manoj Devi", gender: "M", aebas_punch_in: "09:01", aebas_punch_out: "13:05", status_in_camera: "PRESENT", confidence: 0.89 },
      { candidate_id: "CAN-1842-13", name: "Kiran Sharma", gender: "F", aebas_punch_in: "09:01", aebas_punch_out: "13:02", status_in_camera: "PRESENT", confidence: 0.93 },
      { candidate_id: "CAN-1842-14", name: "Meera Patel", gender: "F", aebas_punch_in: "09:02", aebas_punch_out: "13:09", status_in_camera: "PRESENT", confidence: 0.91 },
      { candidate_id: "CAN-1842-15", name: "Anand Verma", gender: "M", aebas_punch_in: "09:02", aebas_punch_out: "13:04", status_in_camera: "PRESENT", confidence: 0.95 },
      { candidate_id: "CAN-1842-16", name: "Rekha Singh", gender: "F", aebas_punch_in: "09:03", aebas_punch_out: "13:00", status_in_camera: "PRESENT", confidence: 0.92 },
      { candidate_id: "CAN-1842-17", name: "Rajesh Gupta", gender: "M", aebas_punch_in: "09:03", aebas_punch_out: "13:08", status_in_camera: "PRESENT", confidence: 0.88 },
      { candidate_id: "CAN-1842-18", name: "Swati Mishra", gender: "F", aebas_punch_in: "09:04", aebas_punch_out: "13:02", status_in_camera: "PRESENT", confidence: 0.94 },
      // 14 ghost students
      { candidate_id: "CAN-1842-19", name: "Vikram R.", gender: "M", aebas_punch_in: "08:58", aebas_punch_out: "13:10", status_in_camera: "GHOST_ABSENT", confidence: 0.0 },
      { candidate_id: "CAN-1842-20", name: "Anjali M.", gender: "F", aebas_punch_in: "08:59", aebas_punch_out: "13:04", status_in_camera: "GHOST_ABSENT", confidence: 0.0 },
      { candidate_id: "CAN-1842-21", name: "Santosh K.", gender: "M", aebas_punch_in: "08:59", aebas_punch_out: "13:05", status_in_camera: "GHOST_ABSENT", confidence: 0.0 },
      { candidate_id: "CAN-1842-22", name: "Geeta S.", gender: "F", aebas_punch_in: "09:00", aebas_punch_out: "13:02", status_in_camera: "GHOST_ABSENT", confidence: 0.0 },
      { candidate_id: "CAN-1842-23", name: "Dinesh P.", gender: "M", aebas_punch_in: "09:00", aebas_punch_out: "13:03", status_in_camera: "GHOST_ABSENT", confidence: 0.0 },
      { candidate_id: "CAN-1842-24", name: "Renu Y.", gender: "F", aebas_punch_in: "09:01", aebas_punch_out: "13:07", status_in_camera: "GHOST_ABSENT", confidence: 0.0 },
      { candidate_id: "CAN-1842-25", name: "Ashok D.", gender: "M", aebas_punch_in: "09:01", aebas_punch_out: "13:01", status_in_camera: "GHOST_ABSENT", confidence: 0.0 },
      { candidate_id: "CAN-1842-26", name: "Sarita V.", gender: "F", aebas_punch_in: "09:02", aebas_punch_out: "13:06", status_in_camera: "GHOST_ABSENT", confidence: 0.0 },
      { candidate_id: "CAN-1842-27", name: "Vinod B.", gender: "M", aebas_punch_in: "09:02", aebas_punch_out: "13:04", status_in_camera: "GHOST_ABSENT", confidence: 0.0 },
      { candidate_id: "CAN-1842-28", name: "Poonam T.", gender: "F", aebas_punch_in: "09:03", aebas_punch_out: "13:08", status_in_camera: "GHOST_ABSENT", confidence: 0.0 },
      { candidate_id: "CAN-1842-29", name: "Kamlesh G.", gender: "M", aebas_punch_in: "09:03", aebas_punch_out: "13:02", status_in_camera: "GHOST_ABSENT", confidence: 0.0 },
      { candidate_id: "CAN-1842-30", name: "Mamta N.", gender: "F", aebas_punch_in: "09:04", aebas_punch_out: "13:05", status_in_camera: "GHOST_ABSENT", confidence: 0.0 },
      { candidate_id: "CAN-1842-31", name: "Pradeep H.", gender: "M", aebas_punch_in: "09:04", aebas_punch_out: "13:03", status_in_camera: "GHOST_ABSENT", confidence: 0.0 },
      { candidate_id: "CAN-1842-32", name: "Anita J.", gender: "F", aebas_punch_in: "09:05", aebas_punch_out: "13:01", status_in_camera: "GHOST_ABSENT", confidence: 0.0 }
    ]
  },
  {
    centre_id: "PMKVY-RJ-JDH-0015",
    name: "Marwar Skill Academy, Jodhpur",
    state: "Rajasthan",
    district: "Jodhpur",
    address: "Plot 14, Mandore Industrial Area, Jodhpur, RJ - 342007",
    scheme: "PMKVY 4.0",
    sanctioned_capacity: 30,
    active_batch_size: 28,
    latitude: 26.2389,
    longitude: 73.0243,
    bandwidth_mode: "LOW",
    compliance_score: 62.0,
    compliance_status: "ELEVATED_RISK",
    cameras_online: 2,
    total_cameras: 3,
    last_audit_timestamp: "2026-10-02T11:45:00Z",
    attendance: {
      submitted_attendance: 26,
      ai_detected_headcount: 21,
      discrepancy_delta: -5,
      discrepancy_percentage: 19.2,
      fraud_risk_score: 52.0,
      temporal_consistency: 0.78,
      hourly_timeline: [
        { time: "09:00", submitted: 26, detected: 24 },
        { time: "10:00", submitted: 26, detected: 22 },
        { time: "11:00", submitted: 26, detected: 21 },
        { time: "12:00", submitted: 26, detected: 20 },
        { time: "14:00", submitted: 26, detected: 19 },
        { time: "15:00", submitted: 26, detected: 18 }
      ]
    },
    infrastructure: [
      { item_id: "EQ-SOLAR-01", name: "Solar Panel Training Kits", category: "Machinery", sanctioned_count: 8, detected_count: 4, status: "DEFICIT", confidence: 0.92 },
      { item_id: "EQ-DESK-01", name: "Student Desks", category: "Furniture", sanctioned_count: 28, detected_count: 24, status: "AVAILABLE", confidence: 0.88 },
      { item_id: "EQ-SAFETY-02", name: "Safety Helmets & Gloves Rack", category: "Safety", sanctioned_count: 28, detected_count: 12, status: "DEFICIT", confidence: 0.85 }
    ],
    trainees: Array.from({ length: 26 }, (_, i) => ({
      candidate_id: `CAN-1948-${i + 1 < 10 ? '0' : ''}${i + 1}`,
      name: `Trainee Candidate #${i + 1}`,
      gender: i % 2 === 0 ? "M" : "F",
      aebas_punch_in: "08:56",
      aebas_punch_out: "13:00",
      status_in_camera: i < 21 ? "PRESENT" : "GHOST_ABSENT",
      confidence: i < 21 ? 0.92 : 0.0
    }))
  },
  {
    centre_id: "DDU-WB-MLD-0008",
    name: "Malda Rural Technical Training Centre",
    state: "West Bengal",
    district: "Malda",
    address: "English Bazar Block, Malda, WB - 732101",
    scheme: "DDU-GKY",
    sanctioned_capacity: 35,
    active_batch_size: 30,
    latitude: 25.0108,
    longitude: 88.1411,
    bandwidth_mode: "LOW",
    compliance_score: 54.0,
    compliance_status: "ELEVATED_RISK",
    cameras_online: 2,
    total_cameras: 2,
    last_audit_timestamp: "2026-10-02T11:00:00Z",
    attendance: {
      submitted_attendance: 29,
      ai_detected_headcount: 19,
      discrepancy_delta: -10,
      discrepancy_percentage: 34.48,
      fraud_risk_score: 71.0,
      temporal_consistency: 0.61,
      hourly_timeline: [
        { time: "09:00", submitted: 29, detected: 26 },
        { time: "10:00", submitted: 29, detected: 20 },
        { time: "11:00", submitted: 29, detected: 19 },
        { time: "12:00", submitted: 29, detected: 18 },
        { time: "14:00", submitted: 29, detected: 16 },
        { time: "15:00", submitted: 29, detected: 15 }
      ]
    },
    infrastructure: [
      { item_id: "EQ-COMP-01", name: "Desktop Terminals", category: "IT Hardware", sanctioned_count: 20, detected_count: 11, status: "DEFICIT", confidence: 0.95 },
      { item_id: "EQ-UPS-02", name: "Online UPS 5KVA", category: "Power", sanctioned_count: 1, detected_count: 1, status: "AVAILABLE", confidence: 0.93 }
    ],
    trainees: Array.from({ length: 29 }, (_, i) => ({
      candidate_id: `CAN-1140-${i + 1 < 10 ? '0' : ''}${i + 1}`,
      name: `IT Trainee Candidate #${i + 1}`,
      gender: i % 2 === 0 ? "F" : "M",
      aebas_punch_in: "10:55",
      aebas_punch_out: "15:00",
      status_in_camera: i < 19 ? "PRESENT" : "GHOST_ABSENT",
      confidence: i < 19 ? 0.94 : 0.0
    }))
  },
  {
    centre_id: "PMKVY-MH-NGP-0031",
    name: "Vidarbha Skill Innovation Centre, Nagpur",
    state: "Maharashtra",
    district: "Nagpur",
    address: "MIDC Butibori Industrial Zone, Nagpur, MH - 441108",
    scheme: "PMKVY 4.0",
    sanctioned_capacity: 45,
    active_batch_size: 45,
    latitude: 21.1458,
    longitude: 79.0882,
    bandwidth_mode: "HIGH",
    compliance_score: 94.2,
    compliance_status: "COMPLIANT",
    cameras_online: 4,
    total_cameras: 4,
    last_audit_timestamp: "2026-10-02T11:15:00Z",
    attendance: {
      submitted_attendance: 43,
      ai_detected_headcount: 43,
      discrepancy_delta: 0,
      discrepancy_percentage: 0.0,
      fraud_risk_score: 4.0,
      temporal_consistency: 0.97,
      hourly_timeline: [
        { time: "08:30", submitted: 43, detected: 43 },
        { time: "09:30", submitted: 43, detected: 43 },
        { time: "10:30", submitted: 43, detected: 42 },
        { time: "11:30", submitted: 43, detected: 43 },
        { time: "12:00", submitted: 43, detected: 43 }
      ]
    },
    infrastructure: [
      { item_id: "EQ-CNC-01", name: "CNC Milling Workstations", category: "Machinery", sanctioned_count: 4, detected_count: 4, status: "AVAILABLE", confidence: 0.96 },
      { item_id: "EQ-DESK-02", name: "Fitting Workbenches", category: "Furniture", sanctioned_count: 10, detected_count: 10, status: "AVAILABLE", confidence: 0.94 },
      { item_id: "EQ-SAFETY-03", name: "Industrial Eye Safety Goggles", category: "Safety", sanctioned_count: 45, detected_count: 44, status: "AVAILABLE", confidence: 0.91 }
    ],
    trainees: Array.from({ length: 43 }, (_, i) => ({
      candidate_id: `CAN-0391-${i + 1 < 10 ? '0' : ''}${i + 1}`,
      name: `CNC Trainee #${i + 1}`,
      gender: i % 3 === 0 ? "F" : "M",
      aebas_punch_in: "08:28",
      aebas_punch_out: "12:35",
      status_in_camera: "PRESENT",
      confidence: 0.95
    }))
  },
  {
    centre_id: "PMKVY-HP-SMR-0019",
    name: "Himalayan Institute of Vocational Skills, Shimla",
    state: "Himachal Pradesh",
    district: "Shimla",
    address: "Circular Road, Near High Court, Shimla, HP - 171001",
    scheme: "PMKVY 4.0",
    sanctioned_capacity: 30,
    active_batch_size: 26,
    latitude: 31.1048,
    longitude: 77.1734,
    bandwidth_mode: "LOW",
    compliance_score: 38.0,
    compliance_status: "CRITICAL",
    cameras_online: 2,
    total_cameras: 3,
    last_audit_timestamp: "2026-10-02T10:30:00Z",
    attendance: {
      submitted_attendance: 25,
      ai_detected_headcount: 8,
      discrepancy_delta: -17,
      discrepancy_percentage: 68.0,
      fraud_risk_score: 94.0,
      temporal_consistency: 0.32,
      hourly_timeline: [
        { time: "09:00", submitted: 25, detected: 24 },
        { time: "09:30", submitted: 25, detected: 14 },
        { time: "10:00", submitted: 25, detected: 8 },
        { time: "11:00", submitted: 25, detected: 8 },
        { time: "12:00", submitted: 25, detected: 7 }
      ]
    },
    infrastructure: [
      { item_id: "EQ-HOSP-01", name: "Banquet Serving Station Setup", category: "Hospitality", sanctioned_count: 6, detected_count: 5, status: "AVAILABLE", confidence: 0.90 },
      { item_id: "EQ-HOSP-02", name: "Commercial Crockery Practice Sets", category: "Hospitality", sanctioned_count: 25, detected_count: 12, status: "DEFICIT", confidence: 0.88 }
    ],
    trainees: Array.from({ length: 25 }, (_, i) => ({
      candidate_id: `CAN-2481-${i + 1 < 10 ? '0' : ''}${i + 1}`,
      name: `Hospitality Trainee #${i + 1}`,
      gender: i % 2 === 0 ? "F" : "M",
      aebas_punch_in: "08:52",
      aebas_punch_out: "13:00",
      status_in_camera: i < 8 ? "PRESENT" : "LEFT_EARLY",
      confidence: i < 8 ? 0.93 : 0.0
    }))
  }
];
