"""
Infrastructure Compliance Router — Equipment Detection & Sanctioned BOM Auditing
"""
from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
from ..providers.mock_data import CANONICAL_CENTRES

router = APIRouter()


@router.get("/{centre_id}")
async def get_infrastructure_audit(centre_id: str) -> Dict[str, Any]:
    centre = CANONICAL_CENTRES.get(centre_id)
    if not centre:
        raise HTTPException(status_code=404, detail="Centre not found")

    items = centre["infrastructure"]
    sanctioned_total = sum(i["sanctioned_count"] for i in items)
    detected_total = sum(i["detected_count"] for i in items)
    gap_pct = ((sanctioned_total - detected_total) / max(sanctioned_total, 1)) * 100.0 if sanctioned_total > detected_total else 0.0

    return {
        "centre_id": centre_id,
        "name": centre["name"],
        "total_sanctioned_equipment": sanctioned_total,
        "total_detected_equipment": detected_total,
        "infrastructure_gap_percentage": round(gap_pct, 1),
        "items": items,
        "compliance_flag": "DEFICIT" if gap_pct > 25.0 else ("PARTIAL" if gap_pct > 10.0 else "COMPLIANT"),
        "apparent_operability_score": 0.82
    }
