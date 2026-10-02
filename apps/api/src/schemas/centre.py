"""
Pydantic Schemas for Training Centres and Compliance Audits
"""
from typing import Optional, List, Dict
from enum import Enum
from pydantic import BaseModel, Field


class SchemeType(str, Enum):
    PMKVY = "PMKVY 4.0"
    DDU_GKY = "DDU-GKY"
    CTS = "Craftsmen Training Scheme"
    STATE_SKILL = "State Skill Mission"


class ComplianceStatus(str, Enum):
    COMPLIANT = "COMPLIANT"       # 90-100%
    WATCH = "WATCH"               # 70-89%
    ELEVATED_RISK = "ELEVATED_RISK" # 50-69%
    CRITICAL = "CRITICAL"         # 0-49%


class EquipmentItem(BaseModel):
    item_id: str
    name: str
    category: str
    sanctioned_count: int
    detected_count: int
    status: str  # "AVAILABLE", "DEFICIT", "MISSING", "NON_FUNCTIONAL"
    confidence: float


class CentreProfile(BaseModel):
    centre_id: str
    name: str
    state: str
    district: str
    address: str
    scheme: SchemeType
    sanctioned_capacity: int
    active_batch_size: int
    latitude: float
    longitude: float
    bandwidth_mode: str
    compliance_score: float
    compliance_status: ComplianceStatus
    cameras_online: int
    total_cameras: int
    last_audit_timestamp: str


class AttendanceCheckResult(BaseModel):
    centre_id: str
    timestamp: str
    sanctioned_strength: int
    submitted_attendance: int
    ai_detected_headcount: int
    discrepancy_delta: int
    discrepancy_percentage: float
    confidence_interval_90: tuple[int, int]
    seat_occupancy_ratio: float
    fraud_risk_score: float
    compliance_status: ComplianceStatus
    privacy_mode: str = "AGGREGATE_ONLY_NO_BIOMETRICS"


class InfrastructureAuditResult(BaseModel):
    centre_id: str
    timestamp: str
    total_sanctioned_items: int
    total_detected_items: int
    infrastructure_gap_percentage: float
    items: List[EquipmentItem]
    compliance_status: ComplianceStatus
    apparent_operability_index: float
