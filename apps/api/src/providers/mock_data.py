"""
Mock & Canonical Training Centres for Demonstration (SIH26245)
"""
from typing import Dict, List, Any

CANONICAL_CENTRES: Dict[str, Dict[str, Any]] = {
    "PMKVY-UP-GKP-0042": {
        "centre_id": "PMKVY-UP-GKP-0042",
        "name": "Pratham Kaushal Vikas Kendra, Gorakhpur",
        "state": "Uttar Pradesh",
        "district": "Gorakhpur",
        "address": "NH-28 Bypass, Medical College Road, Gorakhpur, UP - 273013",
        "scheme": "PMKVY 4.0",
        "sanctioned_capacity": 40,
        "active_batch_size": 35,
        "latitude": 26.7606,
        "longitude": 83.3732,
        "bandwidth_mode": "LOW",
        "compliance_score": 48.5,
        "compliance_status": "CRITICAL",
        "cameras_online": 3,
        "total_cameras": 4,
        "last_audit_timestamp": "2026-10-02T11:30:00Z",
        "attendance": {
            "submitted_attendance": 32,
            "ai_detected_headcount": 18,
            "discrepancy_delta": -14,
            "discrepancy_percentage": 43.75,
            "fraud_risk_score": 88.0,
            "temporal_consistency": 0.54,
            "hourly_timeline": [
                {"time": "09:00", "submitted": 32, "detected": 28},
                {"time": "10:00", "submitted": 32, "detected": 22},
                {"time": "11:00", "submitted": 32, "detected": 18},
                {"time": "12:00", "submitted": 32, "detected": 17},
                {"time": "14:00", "submitted": 32, "detected": 15},
                {"time": "15:00", "submitted": 32, "detected": 14}
            ]
        },
        "infrastructure": [
            {"item_id": "EQ-DESK-01", "name": "Student Workbenches", "category": "Furniture", "sanctioned_count": 35, "detected_count": 20, "status": "DEFICIT", "confidence": 0.94},
            {"item_id": "EQ-SEW-02", "name": "Industrial Sewing Machines", "category": "Machinery", "sanctioned_count": 15, "detected_count": 8, "status": "DEFICIT", "confidence": 0.91},
            {"item_id": "EQ-PROJ-03", "name": "Digital Overhead Projector", "category": "Electronics", "sanctioned_count": 1, "detected_count": 0, "status": "MISSING", "confidence": 0.96},
            {"item_id": "EQ-FIRE-04", "name": "Fire Extinguisher ABC Type", "category": "Safety", "sanctioned_count": 2, "detected_count": 2, "status": "AVAILABLE", "confidence": 0.89}
        ]
    },
    "PMKVY-RJ-JDH-0015": {
        "centre_id": "PMKVY-RJ-JDH-0015",
        "name": "Marwar Skill Academy, Jodhpur",
        "state": "Rajasthan",
        "district": "Jodhpur",
        "address": "Plot 14, Mandore Industrial Area, Jodhpur, RJ - 342007",
        "scheme": "PMKVY 4.0",
        "sanctioned_capacity": 30,
        "active_batch_size": 28,
        "latitude": 26.2389,
        "longitude": 73.0243,
        "bandwidth_mode": "LOW",
        "compliance_score": 62.0,
        "compliance_status": "ELEVATED_RISK",
        "cameras_online": 2,
        "total_cameras": 3,
        "last_audit_timestamp": "2026-10-02T11:45:00Z",
        "attendance": {
            "submitted_attendance": 26,
            "ai_detected_headcount": 21,
            "discrepancy_delta": -5,
            "discrepancy_percentage": 19.2,
            "fraud_risk_score": 52.0,
            "temporal_consistency": 0.78,
            "hourly_timeline": [
                {"time": "09:00", "submitted": 26, "detected": 24},
                {"time": "10:00", "submitted": 26, "detected": 22},
                {"time": "11:00", "submitted": 26, "detected": 21},
                {"time": "12:00", "submitted": 26, "detected": 20},
                {"time": "14:00", "submitted": 26, "detected": 19},
                {"time": "15:00", "submitted": 26, "detected": 18}
            ]
        },
        "infrastructure": [
            {"item_id": "EQ-SOLAR-01", "name": "Solar Panel Training Kits", "category": "Machinery", "sanctioned_count": 8, "detected_count": 4, "status": "DEFICIT", "confidence": 0.92},
            {"item_id": "EQ-DESK-01", "name": "Student Desks", "category": "Furniture", "sanctioned_count": 28, "detected_count": 24, "status": "AVAILABLE", "confidence": 0.88},
            {"item_id": "EQ-SAFETY-02", "name": "Safety Helmets & Gloves Rack", "category": "Safety", "sanctioned_count": 28, "detected_count": 12, "status": "DEFICIT", "confidence": 0.85}
        ]
    },
    "DDU-WB-MLD-0008": {
        "centre_id": "DDU-WB-MLD-0008",
        "name": "Malda Rural Technical Training Centre",
        "state": "West Bengal",
        "district": "Malda",
        "address": "English Bazar Block, Near Post Office, Malda, WB - 732101",
        "scheme": "DDU-GKY",
        "sanctioned_capacity": 35,
        "active_batch_size": 30,
        "latitude": 25.0108,
        "longitude": 88.1411,
        "bandwidth_mode": "LOW",
        "compliance_score": 54.0,
        "compliance_status": "ELEVATED_RISK",
        "cameras_online": 2,
        "total_cameras": 2,
        "last_audit_timestamp": "2026-10-02T11:00:00Z",
        "attendance": {
            "submitted_attendance": 29,
            "ai_detected_headcount": 19,
            "discrepancy_delta": -10,
            "discrepancy_percentage": 34.48,
            "fraud_risk_score": 71.0,
            "temporal_consistency": 0.61,
            "hourly_timeline": [
                {"time": "09:00", "submitted": 29, "detected": 26},
                {"time": "10:00", "submitted": 29, "detected": 20},
                {"time": "11:00", "submitted": 29, "detected": 19},
                {"time": "12:00", "submitted": 29, "detected": 18},
                {"time": "14:00", "submitted": 29, "detected": 16},
                {"time": "15:00", "submitted": 29, "detected": 15}
            ]
        },
        "infrastructure": [
            {"item_id": "EQ-COMP-01", "name": "Desktop Terminals", "category": "IT Hardware", "sanctioned_count": 20, "detected_count": 11, "status": "DEFICIT", "confidence": 0.95},
            {"item_id": "EQ-UPS-02", "name": "Online UPS 5KVA", "category": "Power", "sanctioned_count": 1, "detected_count": 1, "status": "AVAILABLE", "confidence": 0.93}
        ]
    },
    "PMKVY-MH-NGP-0031": {
        "centre_id": "PMKVY-MH-NGP-0031",
        "name": "Vidarbha Skill Innovation Centre, Nagpur",
        "state": "Maharashtra",
        "district": "Nagpur",
        "address": "MIDC Butibori, Nagpur, MH - 441122",
        "scheme": "PMKVY 4.0",
        "sanctioned_capacity": 50,
        "active_batch_size": 45,
        "latitude": 21.1458,
        "longitude": 79.0882,
        "bandwidth_mode": "HIGH",
        "compliance_score": 94.2,
        "compliance_status": "COMPLIANT",
        "cameras_online": 6,
        "total_cameras": 6,
        "last_audit_timestamp": "2026-10-02T12:00:00Z",
        "attendance": {
            "submitted_attendance": 43,
            "ai_detected_headcount": 42,
            "discrepancy_delta": -1,
            "discrepancy_percentage": 2.32,
            "fraud_risk_score": 8.0,
            "temporal_consistency": 0.96,
            "hourly_timeline": [
                {"time": "09:00", "submitted": 43, "detected": 41},
                {"time": "10:00", "submitted": 43, "detected": 42},
                {"time": "11:00", "submitted": 43, "detected": 42},
                {"time": "12:00", "submitted": 43, "detected": 43},
                {"time": "14:00", "submitted": 43, "detected": 41},
                {"time": "15:00", "submitted": 43, "detected": 40}
            ]
        },
        "infrastructure": [
            {"item_id": "EQ-CNC-01", "name": "CNC Training Milling Simulator", "category": "Machinery", "sanctioned_count": 4, "detected_count": 4, "status": "AVAILABLE", "confidence": 0.97},
            {"item_id": "EQ-DESK-01", "name": "Modular Classroom Desks", "category": "Furniture", "sanctioned_count": 45, "detected_count": 45, "status": "AVAILABLE", "confidence": 0.95},
            {"item_id": "EQ-CCTV-01", "name": "IP Dome Security Cameras", "category": "Surveillance", "sanctioned_count": 6, "detected_count": 6, "status": "AVAILABLE", "confidence": 0.99}
        ]
    },
    "PMKVY-HP-SMR-0019": {
        "centre_id": "PMKVY-HP-SMR-0019",
        "name": "Himalayan Institute of Vocational Skills, Shimla",
        "state": "Himachal Pradesh",
        "district": "Shimla",
        "address": "Cart Road, Near Bus Stand, Shimla, HP - 171001",
        "scheme": "PMKVY 4.0",
        "sanctioned_capacity": 25,
        "active_batch_size": 25,
        "latitude": 31.1048,
        "longitude": 77.1734,
        "bandwidth_mode": "LOW",
        "compliance_score": 38.0,
        "compliance_status": "CRITICAL",
        "cameras_online": 1,
        "total_cameras": 3,
        "last_audit_timestamp": "2026-10-02T10:15:00Z",
        "attendance": {
            "submitted_attendance": 25,
            "ai_detected_headcount": 8,
            "discrepancy_delta": -17,
            "discrepancy_percentage": 68.0,
            "fraud_risk_score": 93.0,
            "temporal_consistency": 0.32,
            "hourly_timeline": [
                {"time": "09:00", "submitted": 25, "detected": 24},
                {"time": "09:30", "submitted": 25, "detected": 14},
                {"time": "10:00", "submitted": 25, "detected": 8},
                {"time": "11:00", "submitted": 25, "detected": 7},
                {"time": "12:00", "submitted": 25, "detected": 6},
                {"time": "14:00", "submitted": 25, "detected": 5}
            ]
        },
        "infrastructure": [
            {"item_id": "EQ-HOSP-01", "name": "Hospitality Mock Bar & Dining Setup", "category": "Vocational Setup", "sanctioned_count": 2, "detected_count": 0, "status": "MISSING", "confidence": 0.96},
            {"item_id": "EQ-CHAIR-01", "name": "Classroom Ergonomic Chairs", "category": "Furniture", "sanctioned_count": 25, "detected_count": 10, "status": "DEFICIT", "confidence": 0.90}
        ]
    }
}
