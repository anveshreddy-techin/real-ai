import pytest
import os
import joblib
import numpy as np
from apps.api.src.services.compliance_engine import ComplianceEngine
from ml.detectors.person_counter import PrivacyPreservingHeadcountCounter
from ml.detectors.object_detector import InfrastructureComplianceAuditor
from ml.evaluation.accuracy_benchmarks import BenchmarkAssessor

def test_compliance_scoring_compliant():
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

def test_trained_fraud_classifier_inference():
    model_path = "/home/anvesh/Documents/sih26245/ml/artifacts/anomaly_detector.joblib"
    assert os.path.exists(model_path)
    model = joblib.load(model_path)

    # Normal compliant centre
    X_normal = np.array([[1.0, 0.95, 0.05, 0.10]])
    prob_normal = model.predict_proba(X_normal)[0][1]
    assert prob_normal < 0.20, f"Normal centre fraud probability should be low, got {prob_normal}"

    # Ghost attendance fraud centre (Gorakhpur)
    X_fraud = np.array([[18 / 32, 0.54, 0.43, 0.40]])
    prob_fraud = model.predict_proba(X_fraud)[0][1]
    assert prob_fraud > 0.80, f"Ghost attendance centre fraud probability should be high, got {prob_fraud}"

def test_real_world_frame_processor():
    from ml.pipeline.frame_processor import RealWorldFrameProcessor
    processor = RealWorldFrameProcessor()

    img_path = "/home/anvesh/Documents/sih26245/data/synthetic_frames/gorakhpur_ghost_fraud.jpg"
    assert os.path.exists(img_path)

    res = processor.analyze_image_file(img_path, submitted_roster=32, sanctioned_equipment=35)
    assert res["submitted_attendance"] == 32
    assert res["ai_detected_headcount"] == 18
    assert res["discrepancy_delta"] == -14
    assert res["fraud_anomaly_detected"] is True
    assert res["fraud_risk_score"] > 70.0
    assert res["privacy_compliance"] == "PASS_NO_FACIAL_BIOMETRICS_STORED"
