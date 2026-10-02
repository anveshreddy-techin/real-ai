"""
Attendance Analytics Router — Submitted vs. AI-Detected Cross-Checking
"""
from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from ..providers.mock_data import CANONICAL_CENTRES

router = APIRouter()


@router.get("/{centre_id}")
async def get_centre_attendance(centre_id: str) -> Dict[str, Any]:
    centre = CANONICAL_CENTRES.get(centre_id)
    if not centre:
        raise HTTPException(status_code=404, detail="Centre not found")

    att = centre["attendance"]
    return {
        "centre_id": centre_id,
        "name": centre["name"],
        "submitted_attendance": att["submitted_attendance"],
        "ai_detected_headcount": att["ai_detected_headcount"],
        "discrepancy_delta": att["discrepancy_delta"],
        "discrepancy_percentage": att["discrepancy_percentage"],
        "fraud_risk_score": att["fraud_risk_score"],
        "confidence_interval_90": (max(0, att["ai_detected_headcount"] - 2), att["ai_detected_headcount"] + 2),
        "temporal_consistency": att["temporal_consistency"],
        "hourly_timeline": att["hourly_timeline"],
        "privacy_guarantee": "AGGREGATE_HEADCOUNT_CENTROID_ONLY — NO_FACE_EMBEDDING_SAVED"
    }


@router.post("/{centre_id}/verify-frame")
async def verify_snapshot_frame(centre_id: str, simulated_person_count: int | None = None) -> Dict[str, Any]:
    centre = CANONICAL_CENTRES.get(centre_id)
    if not centre:
        raise HTTPException(status_code=404, detail="Centre not found")

    submitted = centre["attendance"]["submitted_attendance"]
    detected = simulated_person_count if simulated_person_count is not None else centre["attendance"]["ai_detected_headcount"]
    delta = detected - submitted
    discrepancy_pct = (abs(delta) / max(submitted, 1)) * 100.0 if delta < 0 else 0.0

    return {
        "status": "PROCESSED",
        "centre_id": centre_id,
        "timestamp": "2026-10-02T12:00:00Z",
        "headcount_detected": detected,
        "submitted_count": submitted,
        "delta": delta,
        "flagged": discrepancy_pct > 20.0,
        "alert_level": "CRITICAL" if discrepancy_pct > 40.0 else ("WARNING" if discrepancy_pct > 20.0 else "NOMINAL"),
        "privacy_verified": True
    }
