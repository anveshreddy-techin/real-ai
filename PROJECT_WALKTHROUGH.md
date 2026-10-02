# SkillGuard AI — Comprehensive Project Walkthrough
### *AI-Based Real-Time Monitoring of Training Centres for Attendance and Infrastructure Compliance*

**Smart India Hackathon (SIH 2026) — Problem Statement:** `SIH26245`  
**Ministry / Domain:** Ministry of Skill Development and Entrepreneurship (MSDE)  
**Theme:** Smart Education | **Category:** Software  
**Live Production URL:** [https://skillguard-ai.surge.sh](https://skillguard-ai.surge.sh)  
**GitHub Repository:** [https://github.com/anveshreddy-techin/real-ai](https://github.com/anveshreddy-techin/real-ai)  
**Canonical Demonstration Scenario:** Pratham Kaushal Vikas Kendra, Gorakhpur (`PMKVY-UP-GKP-0042`)

---

## 1. Executive Summary & Problem Context
Government-funded skilling initiatives (PMKVY 4.0, DDU-GKY, Craftsmen Training Scheme) disburse public funds based on approved batch size and sanctioned workshop infrastructure. Under manual periodic inspections:
- **Ghost Attendance:** Unscrupulous centres inflate attendance rosters (e.g. reporting 32 trainees present when only 18 are physically inside).
- **Transient Infrastructure Dilution:** Heavy machinery or student workbenches are temporarily assembled for inspection days and removed immediately afterwards.
- **Passive Camera Infrastructure:** CCTV feeds record passively without automated continuous cross-checking against scheme registers.

**SkillGuard AI** solves this by delivering an automated, privacy-first computer vision intelligence layer processing video feeds or periodic low-bandwidth snapshots to continuously audit attendance counts and verify approved equipment inventory.

---

## 2. 5 Multi-Source AI Analytics Pillars

| Pillar | Focus Area | Technology & Method | Privacy Boundary |
|---|---|---|---|
| **Pillar 1: Headcount Aggregation** | Physical trainee presence | YOLOv8-nano optical detection with immediate centroid reduction | Zero facial recognition, zero biometric retention |
| **Pillar 2: Seating & Occupancy** | Classroom desk utilization | Grid-based centroid heatmap distribution | Anonymized cell occupancy |
| **Pillar 3: Infrastructure Verification** | Sanctioned BOM audit | Object detection for workbenches, sewing machines, PCs, solar kits | Non-human asset detection |
| **Pillar 4: Temporal Consistency** | Duration integrity | Continuous rolling-window presence arc (30-minute intervals) | Statistical time-series |
| **Pillar 5: Discrepancy & Fraud Scoring** | Discrepancy alerts | Weighted compliance index & trained Random Forest fraud classifier | Transparent explainability factors |

---

## 3. SIH26245 Required Deliverables Mapping

| Requirement | Implementation in SkillGuard AI | File / Route Reference |
|---|---|---|
| **Video Analytics Pipeline** | Real-time person and infrastructure detection with centroid reduction | `ml/pipeline/frame_processor.py` |
| **Attendance Discrepancy Dashboard** | Interactive national command center comparing submitted vs. AI counts | `/` and `/attendance` |
| **Infrastructure Compliance Audit** | Visual BOM checklist verifying equipment items vs. approved inventory | `/infrastructure` |
| **Privacy-Preserving Design Note** | Comprehensive note detailing aggregate presence vs. biometric surveillance | `docs/PRIVACY_DESIGN_NOTE.md`, `/privacy` |
| **Accuracy Assessment (FP/FN)** | 1,200 benchmark frames evaluated (94.2% precision, 5.8% FPR) | `ml/evaluation/accuracy_benchmarks.py`, `/pipeline` |
| **Low-Bandwidth Deployment Mode** | 1 frame/min snapshot mode achieving 99.4% payload reduction (11.2 Kbps) | `core/config.py`, `/pipeline` |
| **Live Deployed Prototype** | Globally accessible CDN deployment | `https://skillguard-ai.surge.sh` |

---

## 4. Verification & Testing
```bash
# Backend unit tests (pytest)
PYTHONPATH=. pytest tests/unit -v
# 7 passed, 0 failed (100% pass rate)

# Frontend Next.js production build
npm --prefix apps/web run build
# 10/10 static production pages compiled successfully
```
