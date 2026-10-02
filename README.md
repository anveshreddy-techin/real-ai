# SkillGuard AI
### AI-Based Real-Time Monitoring of Training Centres for Attendance and Infrastructure Compliance
**Smart India Hackathon 2026 — Problem Statement SIH26245**  
*Ministry of Skill Development and Entrepreneurship (MSDE)*

---

> ### Core Operational & Scientific Premise
> **“SkillGuard AI dynamically processes video streams and low-bandwidth periodic snapshot feeds from vocational training centres to compute privacy-preserving aggregate attendance headcounts and verify sanctioned equipment inventory in near real time, actively preventing scheme leakage without invasive facial surveillance.”**

---

## 1. Executive Summary & Problem Context
Government-funded skilling schemes (PMKVY, DDU-GKY, Craftsmen Training Scheme) support thousands of empaneled vocational training centres nationwide. Historically, monitoring relies on infrequent periodic physical inspections, leading to two severe vulnerabilities:
1. **Ghost Attendance & Enrolment Leakage:** Training providers claim operational disbursements based on falsified attendance sheets while physical classrooms are empty or under-enrolled.
2. **Infrastructure Disappearance & Dilution:** Equipment, workbenches, sewing machinery, and computers are temporarily rented for physical audit day and removed immediately after.
3. **Passive Surveillance Blindspots:** Existing CCTV cameras installed at centres act as passive recording devices without automated anomaly alarms or audit linkage.

**SkillGuard AI** delivers an end-to-end, edge-ready, privacy-first computer vision intelligence platform addressing all requirements of SIH Problem Statement 26245.

---

## 2. Five Core Intelligence Pillars
| Pillar | Target Metric | Method / Pipeline | Privacy Guarantee |
|---|---|---|---|
| **Pillar 1: Privacy-Preserving Headcount** | Aggregate physical classroom attendance | YOLOv8-nano edge detection; immediate centroid aggregation | Zero facial recognition, zero biometric retention |
| **Pillar 2: Seating & Spatial Occupancy** | Desk & bench occupancy matrix | Spatial polygon grid mapping & heat distribution | Anonymous pixel density only |
| **Pillar 3: Sanctioned Inventory Compliance** | Equipment presence (benches, machinery, PCs) | Fine-tuned multi-class object detection vs. Sanctioned BOM | No human identifiable features |
| **Pillar 4: Temporal Consistency Engine** | Duration integrity (preventing 10-min prop-ins) | Continuous rolling-window presence tracking (30m windows) | Macro statistical time-series |
| **Pillar 5: Fraud & Anomaly Scoring** | Discrepancy flagging & ghost attendance alerts | Isolation Forest + Bayesian discrepancy likelihood | Transparent explainability factors |

---

## 3. High / Low Bandwidth Adaptive Architecture
- **Broadband / Fibre Mode (Urban Centres):** Real-time RTSP stream analysis (5 FPS per classroom feed).
- **Edge / Low-Bandwidth Mode (Rural & Remote Centres):** Snapshot batch compression transmitting 1 frame per 60 seconds (~8 KB/frame), processing locally on edge nodes (Raspberry Pi 4 / Jetson Nano) with signed JSON telemetry uplinks.

---

## 4. Privacy-by-Design Compliance (MSDE / DPDP Act 2023)
SkillGuard strictly rejects invasive facial recognition surveillance:
- **No Face Embeddings Stored:** Video frames are processed in-memory at the edge; facial pixels are scrubbed or centroid-reduced.
- **Aggregate Verification:** Individual attendance registers from biometric/Aadhaar systems are compared strictly against total physical headcount totals.
- **Auditable Cryptographic Proof:** Telemetry logs contain time-stamped headcount certificates without personal identifiers.

---

## 5. Technology Stack
- **Frontend Command Center:** Next.js 14 (App Router, Server/Client components), Tailwind CSS, Lucide Icons, Recharts, Leaflet GIS.
- **Backend API Engine:** Python FastAPI, Pydantic v2, SQLite / PostgreSQL, WebSockets.
- **AI / Computer Vision:** Ultralytics YOLOv8-nano, OpenCV, Scikit-learn Anomaly Detection, NumPy, Pandas.
- **Edge Deployment:** Docker, low-memory footprints (<250MB RAM).

---

## 6. Repository Structure
```
sih26245/
├── apps/
│   ├── api/                 # FastAPI Backend & WebSocket Stream Server
│   └── web/                 # Next.js 14 MSDE National Monitoring Portal
├── ml/
│   ├── detectors/           # YOLOv8 Person & Equipment Detectors
│   ├── pipeline/            # Frame Processor & Low-Bandwidth Engine
│   └── evaluation/          # FP/FN Accuracy Benchmark Suite
├── data/
│   ├── demo_centres/        # 5 Canonical Indian Training Centre Profiles
│   └── synthetic_frames/    # Sample Classroom Footage & Test Matrices
├── docs/                    # Architectural Notes & Privacy Design
└── tests/                   # Pytest Verification Suites
```
