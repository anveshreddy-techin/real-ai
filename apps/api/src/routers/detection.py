"""
Detection API Router — Accepts images or camera snapshot uploads,
runs YOLOv8 optical person counting + trained Random Forest fraud detection,
and returns privacy-preserving compliance audit certificates.
"""
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Dict, Any
import os
import shutil
import tempfile
from ml.pipeline.frame_processor import RealWorldFrameProcessor

router = APIRouter()
processor = RealWorldFrameProcessor()

@router.post("/process-frame")
async def process_live_frame(
    file: UploadFile = File(...),
    centre_id: str = Form("PMKVY-UP-GKP-0042"),
    submitted_attendance: int = Form(32),
    sanctioned_equipment: int = Form(35)
) -> Dict[str, Any]:
    # Write uploaded frame to temporary path
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    try:
        results = processor.analyze_image_file(
            tmp_path,
            submitted_roster=submitted_attendance,
            sanctioned_equipment=sanctioned_equipment
        )
        results["centre_id"] = centre_id
        return results
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)


@router.get("/demo-benchmark/{centre_id}")
async def run_demo_benchmark(centre_id: str) -> Dict[str, Any]:
    frame_map = {
        "PMKVY-UP-GKP-0042": ("/home/anvesh/Documents/sih26245/data/synthetic_frames/gorakhpur_ghost_fraud.jpg", 32),
        "PMKVY-MH-NGP-0031": ("/home/anvesh/Documents/sih26245/data/synthetic_frames/gorakhpur_normal.jpg", 43),
        "PMKVY-HP-SMR-0019": ("/home/anvesh/Documents/sih26245/data/synthetic_frames/shimla_depleted.jpg", 25),
    }

    item = frame_map.get(centre_id, frame_map["PMKVY-UP-GKP-0042"])
    results = processor.analyze_image_file(
        item[0],
        submitted_roster=item[1],
        sanctioned_equipment=35
    )
    results["centre_id"] = centre_id
    return results
