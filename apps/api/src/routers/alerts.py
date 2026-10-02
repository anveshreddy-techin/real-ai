"""
Alerts & Discrepancies Router — Real-time Incident & Discrepancy Stream
"""
from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter()

ACTIVE_ALERTS: List[Dict[str, Any]] = [
    {
        "alert_id": "ALT-2026-UP-0042-01",
        "centre_id": "PMKVY-UP-GKP-0042",
        "centre_name": "Pratham Kaushal Vikas Kendra, Gorakhpur",
        "severity": "CRITICAL",
        "category": "GHOST_ATTENDANCE",
        "title": "Severe Attendance Inflation Detected (-43.8%)",
        "description": "Centre reported 32 active trainees in Batch FITS-02; AI optical counting detected only 18 physical occupants across all 4 camera zones.",
        "delta": -14,
        "timestamp": "2026-10-02T11:32:00Z",
        "status": "OPEN",
        "recommended_action": "Dispatched physical audit notification; suspend subsidy release for current bi-weekly cycle."
    },
    {
        "alert_id": "ALT-2026-HP-0019-02",
        "centre_id": "PMKVY-HP-SMR-0019",
        "centre_name": "Himalayan Institute of Vocational Skills, Shimla",
        "severity": "CRITICAL",
        "category": "TEMPORARY_PROP_FRAUD",
        "title": "Rapid Batch Depletion After Attendance Logging",
        "description": "24 trainees detected at 09:00 AM logging period; attendance plummeted to 8 by 10:00 AM (Temporal consistency: 32%).",
        "delta": -17,
        "timestamp": "2026-10-02T10:18:00Z",
        "status": "OPEN",
        "recommended_action": "Request CCTV playback and issue show-cause notice for ghost logging."
    },
    {
        "alert_id": "ALT-2026-UP-0042-03",
        "centre_id": "PMKVY-UP-GKP-0042",
        "centre_name": "Pratham Kaushal Vikas Kendra, Gorakhpur",
        "severity": "ELEVATED",
        "category": "INFRASTRUCTURE_DEFICIT",
        "title": "Missing Sanctioned Overhead Digital Projector",
        "description": "Room 2 camera confirms projector mount ceiling bracket is empty; item absent during active technical batch.",
        "delta": -1,
        "timestamp": "2026-10-02T09:15:00Z",
        "status": "UNDER_INVESTIGATION",
        "recommended_action": "Verify asset barcode or maintenance register with centre superintendent."
    },
    {
        "alert_id": "ALT-2026-RJ-0015-04",
        "centre_id": "PMKVY-RJ-JDH-0015",
        "centre_name": "Marwar Skill Academy, Jodhpur",
        "severity": "WARNING",
        "category": "INFRASTRUCTURE_DEFICIT",
        "title": "Solar Training Kits Deficit (4 of 8 Present)",
        "description": "Sanctioned electrical lab inventory requires 8 dual-axis solar test benches; only 4 detected in workbench visual scan.",
        "delta": -4,
        "timestamp": "2026-10-02T08:50:00Z",
        "status": "ACKNOWLEDGED",
        "recommended_action": "Audit scheduled for next regional circuit."
    }
]


@router.get("/")
async def get_alerts(severity: str | None = None) -> List[Dict[str, Any]]:
    if severity:
        return [a for a in ACTIVE_ALERTS if a["severity"].lower() == severity.lower()]
    return ACTIVE_ALERTS
