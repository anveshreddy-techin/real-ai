import pytest
from apps.api.src.services.compliance_engine import ComplianceEngine
from ml.detectors.person_counter import PrivacyPreservingHeadcountCounter
from ml.detectors.object_detector import InfrastructureComplianceAuditor
from ml.evaluation.accuracy_benchmarks import BenchmarkAssessor

def test_compliance_scoring_compliant():
    # Submitted 40, Detected 40, All infra present, 100% temporal consistency
    res = ComplianceEngine.calculate_centre_compliance(
        submitted_att=40,
        detected_att=40,
        sanctioned_infra=10,
        detected_infra=10,
        temporal_consistency=1.0
    )
    assert res["compliance_score"] == 100.0
    assert res["compliance_status"] == "COMPLIANT"
    assert res["discrepancy_delta"] == 0

def test_compliance_scoring_ghost_attendance():
    # Canonical Gorakhpur scenario: 32 submitted, 18 detected
    res = ComplianceEngine.calculate_centre_compliance(
        submitted_att=32,
        detected_att=18,
        sanctioned_infra=53,
        detected_infra=30,
        temporal_consistency=0.54
    )
    assert res["compliance_score"] < 60.0
    assert res["discrepancy_delta"] == -14
    assert res["fraud_risk_score"] > 70.0

def test_privacy_preserving_headcount():
    counter = PrivacyPreservingHeadcountCounter()
    mock_detections = [
        {"class_name": "person", "confidence": 0.88, "bbox": [10, 20, 50, 100]},
        {"class_name": "person", "confidence": 0.92, "bbox": [60, 25, 95, 105]},
        {"class_name": "chair", "confidence": 0.70, "bbox": [100, 100, 150, 150]},
    ]
    res = counter.process_detections(mock_detections)
    assert res["aggregate_headcount"] == 2
    assert res["biometrics_extracted"] is False

def test_infrastructure_auditor():
    auditor = InfrastructureComplianceAuditor()
    sanctioned = [{"name": "Student Desks", "sanctioned_count": 20, "item_id": "EQ-01"}]
    detected = [{"name": "Student Desks", "count": 12}]
    res = auditor.audit_inventory(sanctioned, detected)
    assert res["gap_percentage"] == 40.0
    assert res["items"][0]["status"] == "DEFICIT"

def test_accuracy_benchmarks():
    report = BenchmarkAssessor.get_full_benchmark_report()
    assert report["headcount_accuracy"]["precision"] > 0.90
    assert report["headcount_accuracy"]["recall"] > 0.90
    assert report["sample_frames_audited"] == 1200
