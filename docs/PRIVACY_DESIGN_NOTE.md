# SkillGuard AI — Privacy-Preserving Architecture & Design Note
### SIH26245: AI-Based Real-Time Monitoring of Training Centres
**Governing Standard:** Digital Personal Data Protection (DPDP) Act 2023 & MSDE Regulatory Guidelines

---

## 1. Executive Summary
In compliance with the mandatory requirements of SIH Problem Statement 26245, **SkillGuard AI operates strictly on aggregate presence-detection and physical count telemetry**. The system deliberately excludes individual facial identification, facial recognition biometric templates, or individual tracking algorithms.

---

## 2. Privacy Boundary: What IS and What IS NOT Extracted

| Observation Dimension | What IS Extracted & Processed | What is STRICTLY FORBIDDEN & NOT Extracted |
|---|---|---|
| **Classroom Occupancy** | Total integer headcount (e.g., $N=18$ trainees) | Individual facial features, facial recognition embeddings, biometrics |
| **Spatial Distribution** | Anonymized 2D centroid grid heatmaps (Occupancy %) | Personal tracking IDs, trainee identity trajectories |
| **Sanctioned Equipment** | Physical bounding boxes for machinery, desks, benches | Human clothes, personal belongings, smartphone screens |
| **Telemetry Uplink** | Cryptographically signed count digests (JSON, ~400 bytes) | Raw video streams, uncompressed high-resolution face crops |
| **Edge Storage** | Temporary ring buffer of compressed snapshots (overwritten in 24h) | Long-term biometric databases or facial surveillance logs |

---

## 3. Low-Bandwidth Edge Aggregation Workflow
```
[CCTV Video Feed / 1-FPS Snapshot]
              │
              ▼
    [Local Edge Node] (Raspberry Pi 4 / Local Mini-PC)
              │
              ├──► YOLOv8-nano Headcount Inference
              │    (Extracts class='person' centroids)
              │
              ├──► Centroid Discard & Count Extraction
              │    (Raw pixel buffers immediately wiped from RAM)
              │
              ▼
    [JSON Telemetry Record]
    {
       "centre_id": "PMKVY-UP-GKP-0042",
       "timestamp": "2026-10-02T11:30:00Z",
       "aggregate_count": 18,
       "bandwidth_mode": "LOW"
    }
              │
              ▼
    [Uplink to Central MSDE Cloud Dashboard]
```

---

## 4. Legal Compliance & Justification
- **Proportionality Principle:** Validating whether 35 sanctioned trainees are present does not require knowing the biometric identities of all 35 individuals; counting total bodies is sufficient to detect ghost attendance.
- **Biometric Decoupling:** Biometric Aadhaar-authenticated sign-ins at the gate remain entirely decoupled; SkillGuard simply cross-references the aggregate number logged at the gate against the optical headcount in the workshop.
- **No Mass Surveillance:** System classifies room activity states rather than profiling individuals.
