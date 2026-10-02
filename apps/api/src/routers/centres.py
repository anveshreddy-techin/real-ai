"""
Centres API Router — Provides Centre Profiles, Map Locations, and Compliance Audits
"""
from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from ..providers.mock_data import CANONICAL_CENTRES
from ..services.compliance_engine import ComplianceEngine

router = APIRouter()


@router.get("/", response_model=List[Dict[str, Any]])
async def list_training_centres(state: str | None = None, status: str | None = None):
    centres = list(CANONICAL_CENTRES.values())
    if state:
        centres = [c for c in centres if c["state"].lower() == state.lower()]
    if status:
        centres = [c for c in centres if c["compliance_status"].lower() == status.lower()]
    return centres


@router.get("/summary")
async def get_national_summary():
    centres = list(CANONICAL_CENTRES.values())
    total = len(centres)
    critical = sum(1 for c in centres if c["compliance_status"] == "CRITICAL")
    elevated = sum(1 for c in centres if c["compliance_status"] == "ELEVATED_RISK")
    compliant = sum(1 for c in centres if c["compliance_status"] == "COMPLIANT")
    watch = sum(1 for c in centres if c["compliance_status"] == "WATCH")
    
    avg_score = sum(c["compliance_score"] for c in centres) / total if total else 0
    total_cameras = sum(c["total_cameras"] for c in centres)
    online_cameras = sum(c["cameras_online"] for c in centres)

    return {
        "total_empaneled_centres": total,
        "critical_discrepancy_centres": critical,
        "elevated_risk_centres": elevated,
        "compliant_centres": compliant,
        "watch_centres": watch,
        "national_average_compliance": round(avg_score, 1),
        "total_surveillance_cameras": total_cameras,
        "online_cameras": online_cameras,
        "camera_uptime_percentage": round((online_cameras / max(total_cameras, 1)) * 100, 1),
        "active_monitoring_mode": "EDGE_SNAPSHOT_AND_RTSP_HYBRID"
    }


@router.get("/{centre_id}")
async def get_centre_details(centre_id: str):
    centre = CANONICAL_CENTRES.get(centre_id)
    if not centre:
        raise HTTPException(status_code=404, detail=f"Centre '{centre_id}' not found")
    return centre
