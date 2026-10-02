"""
SkillGuard AI — FastAPI Application
SIH26245: AI-Based Real-Time Monitoring of Training Centres for Attendance and Infrastructure Compliance
Ministry of Skill Development and Entrepreneurship (MSDE)
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uuid

from .core.config import settings
from .core.errors import SkillGuardError, skillguard_exception_handler
from .core.logging import configure_logging, get_logger

from .routers import centres, attendance, infrastructure, alerts, pipeline, detection

configure_logging(log_level="INFO")
logger = get_logger(__name__)

app = FastAPI(
    title="SkillGuard AI API",
    description="Real-Time Video Analytics & Compliance Platform for Empaneled Training Centres (SIH26245)",
    version=settings.APP_VERSION,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Trace-ID"]
)


@app.middleware("http")
async def add_trace_id(request: Request, call_next):
    trace_id = request.headers.get("X-Trace-ID", str(uuid.uuid4()))
    response = await call_next(request)
    response.headers["X-Trace-ID"] = trace_id
    return response


app.add_exception_handler(SkillGuardError, skillguard_exception_handler)

# Routers
app.include_router(centres.router, prefix="/api/v1/centres", tags=["Centres & Geography"])
app.include_router(attendance.router, prefix="/api/v1/attendance", tags=["Attendance Analytics"])
app.include_router(infrastructure.router, prefix="/api/v1/infrastructure", tags=["Infrastructure Compliance"])
app.include_router(alerts.router, prefix="/api/v1/alerts", tags=["Discrepancy Alerts"])
app.include_router(pipeline.router, prefix="/api/v1/pipeline", tags=["Pipeline & Benchmarks"])
app.include_router(detection.router, prefix="/api/v1/detection", tags=["Real CV Inference Engine"])


@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "OPERATIONAL",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "ministry": "Ministry of Skill Development and Entrepreneurship (MSDE)",
        "sih_problem_statement": "SIH26245",
        "bandwidth_mode": settings.DEFAULT_BANDWIDTH_MODE.value,
        "privacy_preservation": "STRICT_AGGREGATE_ONLY",
        "yolo_model": "YOLOv8-nano (active)",
        "anomaly_detector": "RandomForest-100 (trained & active)"
    }
