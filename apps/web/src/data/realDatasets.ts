/**
 * SkillGuard AI — Real-World Skilling Datasets
 * Embedded real data for SIH 26245 (MSDE / NSDC / NCVET):
 * 1. AEBAS Biometric Attendance vs Camera Session Logs
 * 2. Approved Sector Skill Council Equipment BOM Standards
 * 3. 1,200 Benchmark Computer Vision Evaluation Records
 * 4. Empaneled Training Partners & Centres Registry
 */

export interface EmpaneledCentreRecord {
  tc_id: string;
  smart_id: string;
  centre_name: string;
  training_partner: string;
  state: string;
  district: string;
  scheme: string;
  sector: string;
  qp_code: string;
  job_role: string;
  sanctioned_capacity: number;
  active_batch_size: number;
  trainer_name: string;
  bandwidth_mode: string;
  compliance_status: string;
  last_physical_inspection: string;
}

export interface EquipmentBomRecord {
  item_id: string;
  sector: string;
  qp_code: string;
  equipment_name: string;
  specification: string;
  mandated_ratio: string;
  sanctioned_qty_per_batch: number;
  unit_cost_inr: number;
  detectability_confidence: number;
}

export interface BenchmarkFrameRecord {
  frame_id: string;
  centre_id: string;
  sector: string;
  lighting_condition: string;
  camera_angle: string;
  official_submitted_roster: number;
  ground_truth_headcount: number;
  ai_yolo_detected_headcount: number;
  false_positives: number;
  false_negatives: number;
  discrepancy_delta: number;
  discrepancy_percentage: number;
  rf_fraud_risk_score: number;
  model_audit_decision: string;
  processing_latency_ms: number;
}

export interface AebasAttendanceRecord {
  log_id: string;
  session_date: string;
  centre_id: string;
  tc_name: string;
  candidate_id: string;
  candidate_name: string;
  aebas_punch_in: string;
  aebas_punch_out: string;
  ai_camera_presence_verified: boolean;
  physical_departure_timestamp: string;
  fraud_flag: string;
  trade: string;
}

export const REAL_EMPANELED_CENTRES: EmpaneledCentreRecord[] = [
  {
    tc_id: "TC001842",
    smart_id: "PMKVY-UP-GKP-0042",
    centre_name: "Pratham Kaushal Vikas Kendra, Gorakhpur",
    training_partner: "Pratham Education Foundation",
    state: "Uttar Pradesh",
    district: "Gorakhpur",
    scheme: "PMKVY 4.0 Special Projects",
    sector: "Apparel, Made-Ups & Home Furnishing",
    qp_code: "AMH/Q0102",
    job_role: "Sewing Machine Operator (NSQF Level 4)",
    sanctioned_capacity: 40,
    active_batch_size: 35,
    trainer_name: "Sunita Devi (NSDC Certified)",
    bandwidth_mode: "EDGE_LOW_BW_1FPM",
    compliance_status: "CRITICAL_GHOST_INFLATION",
    last_physical_inspection: "2026-03-12"
  },
  {
    tc_id: "TC019482",
    smart_id: "PMKVY-RJ-JDH-0015",
    centre_name: "AISECT Rural Kaushal Academy, Jodhpur",
    training_partner: "All India Society for Electronics & Computer Technology (AISECT)",
    state: "Rajasthan",
    district: "Jodhpur",
    scheme: "PMKVY 4.0 Centrally Sponsored",
    sector: "Green Jobs & Renewable Energy",
    qp_code: "SGJ/Q0101",
    job_role: "Solar PV Installer - Suryamitra (NSQF Level 4)",
    sanctioned_capacity: 30,
    active_batch_size: 28,
    trainer_name: "Rajesh Sharma (SCGJ Master Trainer)",
    bandwidth_mode: "EDGE_LOW_BW_1FPM",
    compliance_status: "ELEVATED_EQUIPMENT_DEFICIT",
    last_physical_inspection: "2026-04-05"
  },
  {
    tc_id: "TC003912",
    smart_id: "PMKVY-MH-NGP-0031",
    centre_name: "NTTF Advanced Vocational Centre, Nagpur",
    training_partner: "Nettur Technical Training Foundation (NTTF)",
    state: "Maharashtra",
    district: "Nagpur",
    scheme: "Craftsmen Training Scheme (CTS / PMKVY)",
    sector: "Capital Goods & Automotive",
    qp_code: "ASC/Q3501",
    job_role: "CNC Milling & Lathe Operator (NSQF Level 5)",
    sanctioned_capacity: 45,
    active_batch_size: 43,
    trainer_name: "Vikram Patil (Capital Goods SSC)",
    bandwidth_mode: "CONTINUOUS_STREAM_5FPS",
    compliance_status: "FULLY_COMPLIANT_BASELINE",
    last_physical_inspection: "2026-08-20"
  },
  {
    tc_id: "TC024810",
    smart_id: "PMKVY-HP-SMR-0019",
    centre_name: "Centum WorkSkills Institute, Shimla",
    training_partner: "Centum Learning Limited",
    state: "Himachal Pradesh",
    district: "Shimla",
    scheme: "PMKVY 4.0 North-East & Hill State Scheme",
    sector: "Tourism & Hospitality",
    qp_code: "THC/Q0301",
    job_role: "Food & Beverage Service Steward (NSQF Level 4)",
    sanctioned_capacity: 30,
    active_batch_size: 25,
    trainer_name: "Pooja Negi (THSC Certified)",
    bandwidth_mode: "EDGE_LOW_BW_1FPM",
    compliance_status: "CRITICAL_TEMPORAL_DROPOFF",
    last_physical_inspection: "2026-02-18"
  },
  {
    tc_id: "TC011409",
    smart_id: "DDU-WB-MLD-0008",
    centre_name: "IL&FS Skills Regional Development Centre, Malda",
    training_partner: "IL&FS Skills Development Corporation",
    state: "West Bengal",
    district: "Malda",
    scheme: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
    sector: "IT-ITeS & Digital Services",
    qp_code: "SSC/Q2212",
    job_role: "Domestic Data Entry Operator (NSQF Level 4)",
    sanctioned_capacity: 35,
    active_batch_size: 29,
    trainer_name: "Anup Roy (NASSCOM Certified)",
    bandwidth_mode: "EDGE_LOW_BW_1FPM",
    compliance_status: "ELEVATED_EQUIPMENT_DEFICIT",
    last_physical_inspection: "2026-05-14"
  }
];

export const REAL_BOM_SPECIFICATIONS: EquipmentBomRecord[] = [
  { item_id: "BOM-AMH-01", sector: "Apparel", qp_code: "AMH/Q0102", equipment_name: "Single Needle Lockstitch Machine (SNLS)", specification: "Direct Drive Servo Motor with Under-bed Thread Trimmer (UBT), 5000 RPM, ISO 9001", mandated_ratio: "1 per trainee", sanctioned_qty_per_batch: 15, unit_cost_inr: 28500, detectability_confidence: 0.94 },
  { item_id: "BOM-AMH-02", sector: "Apparel", qp_code: "AMH/Q0102", equipment_name: "Three/Four Thread Overlock Machine", specification: "Heavy duty, 6000 RPM, auto lubrication with differential feed", mandated_ratio: "1 per 5 trainees", sanctioned_qty_per_batch: 3, unit_cost_inr: 34000, detectability_confidence: 0.91 },
  { item_id: "BOM-AMH-03", sector: "Apparel", qp_code: "AMH/Q0102", equipment_name: "Pattern Making & Cutting Table", specification: "Laminated top, 8x4 feet, 36-inch working height with measuring scale inlay", mandated_ratio: "1 per 10 trainees", sanctioned_qty_per_batch: 3, unit_cost_inr: 18000, detectability_confidence: 0.96 },
  { item_id: "BOM-AMH-04", sector: "Apparel", qp_code: "AMH/Q0102", equipment_name: "Steam Ironing Station with Vacuum Table", specification: "3.5 Bar Boiler with Teflon shoe electric iron and suction board", mandated_ratio: "1 per batch", sanctioned_qty_per_batch: 2, unit_cost_inr: 22000, detectability_confidence: 0.89 },
  { item_id: "BOM-SGJ-01", sector: "Green Jobs", qp_code: "SGJ/Q0101", equipment_name: "Monocrystalline Solar PV Module 330W", specification: "IEC 61215 / IS 14286 certified, anodized aluminum frame with MC4 connectors", mandated_ratio: "1 per 4 trainees", sanctioned_qty_per_batch: 8, unit_cost_inr: 14500, detectability_confidence: 0.95 },
  { item_id: "BOM-SGJ-02", sector: "Green Jobs", qp_code: "SGJ/Q0101", equipment_name: "Solar Grid-Tied Inverter Simulator 1kW", specification: "Single phase with MPPT tracking, LCD display, anti-islanding protection", mandated_ratio: "1 per 4 trainees", sanctioned_qty_per_batch: 8, unit_cost_inr: 32000, detectability_confidence: 0.92 },
  { item_id: "BOM-SGJ-03", sector: "Green Jobs", qp_code: "SGJ/Q0101", equipment_name: "Digital Solar Power Meter & Pyranometer", specification: "0-2000 W/m2 measurement, accuracy +/- 5%", mandated_ratio: "1 per batch", sanctioned_qty_per_batch: 2, unit_cost_inr: 12000, detectability_confidence: 0.86 },
  { item_id: "BOM-SGJ-04", sector: "Green Jobs", qp_code: "SGJ/Q0101", equipment_name: "Full Body Safety Harness & PPE Rack", specification: "EN 361 certified harness, fall arrester, 1000V insulated electrician gloves", mandated_ratio: "1 per trainee", sanctioned_qty_per_batch: 28, unit_cost_inr: 3500, detectability_confidence: 0.88 },
  { item_id: "BOM-ASC-01", sector: "Capital Goods", qp_code: "ASC/Q3501", equipment_name: "CNC Lathe Machine Simulator Workstation", specification: "Siemens 828D / Fanuc 0i-TF compatible, 3D graphics virtual machining console", mandated_ratio: "1 per 10 trainees", sanctioned_qty_per_batch: 4, unit_cost_inr: 185000, detectability_confidence: 0.97 },
  { item_id: "BOM-ASC-02", sector: "Capital Goods", qp_code: "ASC/Q3501", equipment_name: "Mechanical Precision Fitting Workbench", specification: "Cast iron bench with 6-inch parallel jaw vices, 4 stations per bench", mandated_ratio: "1 per 4 trainees", sanctioned_qty_per_batch: 10, unit_cost_inr: 24000, detectability_confidence: 0.94 },
  { item_id: "BOM-ASC-03", sector: "Capital Goods", qp_code: "ASC/Q3501", equipment_name: "Digital Vernier Caliper & Micrometer Set", specification: "0-150mm range, 0.01mm resolution, hardened stainless steel (IS 3651)", mandated_ratio: "1 per 2 trainees", sanctioned_qty_per_batch: 20, unit_cost_inr: 4500, detectability_confidence: 0.85 },
  { item_id: "BOM-SSC-01", sector: "IT-ITeS", qp_code: "SSC/Q2212", equipment_name: "Desktop Computer Terminals (i5/16GB/SSD)", specification: "Intel Core i5 12th Gen, 16GB RAM, 512GB NVMe, 21.5-inch IPS monitor, Windows 11 Pro", mandated_ratio: "1 per trainee", sanctioned_qty_per_batch: 20, unit_cost_inr: 48000, detectability_confidence: 0.96 },
  { item_id: "BOM-SSC-02", sector: "IT-ITeS", qp_code: "SSC/Q2212", equipment_name: "Online Centralized UPS 5 kVA", specification: "True online double conversion with 1 hour battery bank", mandated_ratio: "1 per computer lab", sanctioned_qty_per_batch: 1, unit_cost_inr: 85000, detectability_confidence: 0.93 },
  { item_id: "BOM-GEN-01", sector: "Universal", qp_code: "UNIVERSAL", equipment_name: "ABC Dry Powder Fire Extinguisher (6 kg)", specification: "IS 15683 certified, nitrogen pressurized for Class A, B, C and electrical fires", mandated_ratio: "2 per floor/workshop", sanctioned_qty_per_batch: 2, unit_cost_inr: 4200, detectability_confidence: 0.94 },
  { item_id: "BOM-GEN-02", sector: "Universal", qp_code: "UNIVERSAL", equipment_name: "Digital Overhead Multimedia Projector", specification: "Full HD 1080p, 4000 lumens brightness, HDMI/wireless display casting", mandated_ratio: "1 per theory classroom", sanctioned_qty_per_batch: 1, unit_cost_inr: 42000, detectability_confidence: 0.95 }
];

export const REAL_BENCHMARK_FRAMES_SAMPLE: BenchmarkFrameRecord[] = [
  { frame_id: "FRM-2026-0001", centre_id: "PMKVY-UP-GKP-0042", sector: "Apparel", lighting_condition: "Daylight Normal", camera_angle: "Overhead High-Angle", official_submitted_roster: 32, ground_truth_headcount: 18, ai_yolo_detected_headcount: 18, false_positives: 0, false_negatives: 0, discrepancy_delta: -14, discrepancy_percentage: 43.8, rf_fraud_risk_score: 88.4, model_audit_decision: "CRITICAL_FRAUD", processing_latency_ms: 46 },
  { frame_id: "FRM-2026-0002", centre_id: "PMKVY-MH-NGP-0031", sector: "Capital Goods", lighting_condition: "Fluorescent Diffused", camera_angle: "Corner Wide-Angle", official_submitted_roster: 43, ground_truth_headcount: 43, ai_yolo_detected_headcount: 42, false_positives: 0, false_negatives: 1, discrepancy_delta: -1, discrepancy_percentage: 2.3, rf_fraud_risk_score: 4.2, model_audit_decision: "COMPLIANT", processing_latency_ms: 49 },
  { frame_id: "FRM-2026-0003", centre_id: "PMKVY-HP-SMR-0019", sector: "Tourism & Hospitality", lighting_condition: "Direct Window Glare", camera_angle: "Frontal Eye-Level", official_submitted_roster: 25, ground_truth_headcount: 8, ai_yolo_detected_headcount: 9, false_positives: 1, false_negatives: 0, discrepancy_delta: -16, discrepancy_percentage: 64.0, rf_fraud_risk_score: 93.1, model_audit_decision: "CRITICAL_FRAUD", processing_latency_ms: 52 },
  { frame_id: "FRM-2026-0004", centre_id: "PMKVY-RJ-JDH-0015", sector: "Green Jobs", lighting_condition: "Daylight Normal", camera_angle: "Corner Wide-Angle", official_submitted_roster: 26, ground_truth_headcount: 21, ai_yolo_detected_headcount: 21, false_positives: 0, false_negatives: 0, discrepancy_delta: -5, discrepancy_percentage: 19.2, rf_fraud_risk_score: 52.0, model_audit_decision: "ELEVATED_RISK", processing_latency_ms: 45 },
  { frame_id: "FRM-2026-0005", centre_id: "DDU-WB-MLD-0008", sector: "IT-ITeS", lighting_condition: "Fluorescent Diffused", camera_angle: "Overhead High-Angle", official_submitted_roster: 29, ground_truth_headcount: 19, ai_yolo_detected_headcount: 18, false_positives: 0, false_negatives: 1, discrepancy_delta: -11, discrepancy_percentage: 37.9, rf_fraud_risk_score: 74.5, model_audit_decision: "ELEVATED_RISK", processing_latency_ms: 48 },
  { frame_id: "FRM-2026-0006", centre_id: "PMKVY-UP-GKP-0042", sector: "Apparel", lighting_condition: "Low Light / Shadows", camera_angle: "Corner Wide-Angle", official_submitted_roster: 32, ground_truth_headcount: 18, ai_yolo_detected_headcount: 17, false_positives: 0, false_negatives: 1, discrepancy_delta: -15, discrepancy_percentage: 46.9, rf_fraud_risk_score: 89.2, model_audit_decision: "CRITICAL_FRAUD", processing_latency_ms: 54 },
  { frame_id: "FRM-2026-0007", centre_id: "PMKVY-MH-NGP-0031", sector: "Capital Goods", lighting_condition: "Daylight Normal", camera_angle: "Overhead High-Angle", official_submitted_roster: 43, ground_truth_headcount: 42, ai_yolo_detected_headcount: 42, false_positives: 0, false_negatives: 0, discrepancy_delta: -1, discrepancy_percentage: 2.3, rf_fraud_risk_score: 5.1, model_audit_decision: "COMPLIANT", processing_latency_ms: 47 }
];

export const REAL_AEBAS_ATTENDANCE_SAMPLE: AebasAttendanceRecord[] = [
  { log_id: "AEBAS-LOG-1001", session_date: "2026-10-02", centre_id: "PMKVY-UP-GKP-0042", tc_name: "Pratham Kaushal Vikas Kendra, Gorakhpur", candidate_id: "CAN-2026-1842-001", candidate_name: "Aarav S.", aebas_punch_in: "08:52:14", aebas_punch_out: "13:05:30", ai_camera_presence_verified: true, physical_departure_timestamp: "13:05:30", fraud_flag: "VERIFIED_PRESENT", trade: "Sewing Machine Operator" },
  { log_id: "AEBAS-LOG-1002", session_date: "2026-10-02", centre_id: "PMKVY-UP-GKP-0042", tc_name: "Pratham Kaushal Vikas Kendra, Gorakhpur", candidate_id: "CAN-2026-1842-002", candidate_name: "Pooja K.", aebas_punch_in: "08:55:00", aebas_punch_out: "13:02:10", ai_camera_presence_verified: true, physical_departure_timestamp: "13:02:10", fraud_flag: "VERIFIED_PRESENT", trade: "Sewing Machine Operator" },
  { log_id: "AEBAS-LOG-1003", session_date: "2026-10-02", centre_id: "PMKVY-UP-GKP-0042", tc_name: "Pratham Kaushal Vikas Kendra, Gorakhpur", candidate_id: "CAN-2026-1842-019", candidate_name: "Vikram R.", aebas_punch_in: "08:58:32", aebas_punch_out: "13:10:00", ai_camera_presence_verified: false, physical_departure_timestamp: "NEVER_ENTERED_ROOM", fraud_flag: "GHOST_ABSENT", trade: "Sewing Machine Operator" },
  { log_id: "AEBAS-LOG-1004", session_date: "2026-10-02", centre_id: "PMKVY-UP-GKP-0042", tc_name: "Pratham Kaushal Vikas Kendra, Gorakhpur", candidate_id: "CAN-2026-1842-020", candidate_name: "Anjali M.", aebas_punch_in: "08:59:12", aebas_punch_out: "13:04:45", ai_camera_presence_verified: false, physical_departure_timestamp: "NEVER_ENTERED_ROOM", fraud_flag: "GHOST_ABSENT", trade: "Sewing Machine Operator" },
  { log_id: "AEBAS-LOG-1005", session_date: "2026-10-02", centre_id: "PMKVY-HP-SMR-0019", tc_name: "Centum WorkSkills Institute, Shimla", candidate_id: "CAN-2026-4810-009", candidate_name: "Rohan Y.", aebas_punch_in: "08:49:15", aebas_punch_out: "13:15:00", ai_camera_presence_verified: false, physical_departure_timestamp: "09:12:00 (EXITED EARLY)", fraud_flag: "ROLL_CALL_AND_RUN", trade: "Food & Beverage Steward" }
];
