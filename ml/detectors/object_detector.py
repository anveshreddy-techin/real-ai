"""
SkillGuard AI — Sanctioned Equipment & Infrastructure Verifier
Evaluates detected items against sanctioned centre BOM
"""
from typing import Dict, Any, List


class InfrastructureComplianceAuditor:
    def __init__(self):
        pass

    def audit_inventory(self, sanctioned_items: List[Dict[str, Any]], detected_items: List[Dict[str, Any]]) -> Dict[str, Any]:
        audit_results = []
        total_sanctioned = 0
        total_detected = 0

        detected_map = {d["name"].lower(): d["count"] for d in detected_items}

        for item in sanctioned_items:
            name = item["name"]
            sanctioned_qty = item["sanctioned_count"]
            total_sanctioned += sanctioned_qty

            actual_qty = detected_map.get(name.lower(), item.get("detected_count", 0))
            total_detected += actual_qty

            if actual_qty >= sanctioned_qty:
                status = "AVAILABLE"
            elif actual_qty > 0:
                status = "DEFICIT"
            else:
                status = "MISSING"

            audit_results.append({
                "item_id": item.get("item_id", "EQ-00"),
                "name": name,
                "category": item.get("category", "General"),
                "sanctioned_count": sanctioned_qty,
                "detected_count": actual_qty,
                "status": status,
                "confidence": item.get("confidence", 0.90)
            })

        gap_pct = ((total_sanctioned - total_detected) / max(total_sanctioned, 1)) * 100.0 if total_sanctioned > total_detected else 0.0

        return {
            "total_sanctioned": total_sanctioned,
            "total_detected": total_detected,
            "gap_percentage": round(gap_pct, 1),
            "items": audit_results,
            "overall_status": "COMPLIANT" if gap_pct <= 10.0 else ("DEFICIT" if gap_pct <= 30.0 else "CRITICAL_DEFICIT")
        }
