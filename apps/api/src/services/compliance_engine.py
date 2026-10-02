"""
SkillGuard AI — Core Compliance & Discrepancy Evaluation Engine
Implements the multi-factor weighted audit score:
Compliance Score = 0.50 * Attendance Accuracy + 0.35 * Infrastructure Score + 0.15 * Temporal Consistency
"""
from typing import Dict, Any
from ..schemas.centre import ComplianceStatus


class ComplianceEngine:
    @staticmethod
    def calculate_centre_compliance(submitted_att: int, detected_att: int, sanctioned_infra: int, detected_infra: int, temporal_consistency: float) -> Dict[str, Any]:
        # Attendance Accuracy (Penalize over-reporting / ghost attendance)
        if submitted_att <= 0:
            attendance_accuracy = 1.0 if detected_att == 0 else 0.0
        else:
            # Over-reporting ratio
            attendance_accuracy = min(detected_att, submitted_att) / max(submitted_att, 1)

        # Infrastructure Score
        infra_ratio = detected_infra / max(sanctioned_infra, 1)
        infra_score = min(max(infra_ratio, 0.0), 1.0)

        # Temporal Consistency (Fraction of time trainees remained through batch schedule)
        temporal_score = min(max(temporal_consistency, 0.0), 1.0)

        # Weighted final score (0-100)
        overall_score = (
            (0.50 * attendance_accuracy) +
            (0.35 * infra_score) +
            (0.15 * temporal_score)
        ) * 100.0

        if overall_score >= 90.0:
            status = ComplianceStatus.COMPLIANT
        elif overall_score >= 70.0:
            status = ComplianceStatus.WATCH
        elif overall_score >= 50.0:
            status = ComplianceStatus.ELEVATED_RISK
        else:
            status = ComplianceStatus.CRITICAL

        # Calculate fraud probability score
        discrepancy_delta = detected_att - submitted_att
        discrepancy_pct = (abs(discrepancy_delta) / max(submitted_att, 1)) * 100.0 if discrepancy_delta < 0 else 0.0
        fraud_risk = min(discrepancy_pct * 1.5 + (1.0 - temporal_score) * 40.0, 100.0)

        return {
            "compliance_score": round(overall_score, 1),
            "compliance_status": status,
            "attendance_accuracy": round(attendance_accuracy * 100, 1),
            "infrastructure_score": round(infra_score * 100, 1),
            "temporal_consistency": round(temporal_score * 100, 1),
            "fraud_risk_score": round(fraud_risk, 1),
            "discrepancy_delta": discrepancy_delta,
            "discrepancy_percentage": round(discrepancy_pct, 1)
        }
