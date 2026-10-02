"""
SkillGuard AI — Privacy-Preserving Headcount Counter
Aggregates bounding boxes into centroid headcounts and discards raw frame data.
Zero face recognition, zero biometric retention.
"""
from typing import Dict, Any, List
import numpy as np


class PrivacyPreservingHeadcountCounter:
    def __init__(self, confidence_threshold: float = 0.45):
        self.conf_threshold = confidence_threshold

    def process_detections(self, detections: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Accepts raw bounding boxes from YOLOv8-nano and produces anonymous aggregate headcounts.
        """
        valid_persons = [d for d in detections if d.get("class_name") == "person" and d.get("confidence", 0.0) >= self.conf_threshold]
        headcount = len(valid_persons)

        # Centroids calculation for spatial grid density (no face data)
        centroids = []
        for p in valid_persons:
            bbox = p.get("bbox", [0, 0, 0, 0])
            cx = (bbox[0] + bbox[2]) / 2.0
            cy = (bbox[1] + bbox[3]) / 2.0
            centroids.append((round(cx, 1), round(cy, 1)))

        return {
            "aggregate_headcount": headcount,
            "anonymized_centroids_count": len(centroids),
            "privacy_compliance": "PASS_AGGREGATE_ONLY",
            "biometrics_extracted": False
        }
