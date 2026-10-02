"""
SkillGuard AI — Centralized Error Handling & Exceptions
"""
import uuid
from enum import Enum
from typing import Any
from fastapi import Request, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel


class ErrorCode(str, Enum):
    UNAUTHORIZED = "UNAUTHORIZED"
    FORBIDDEN = "FORBIDDEN"
    NOT_FOUND = "NOT_FOUND"
    VALIDATION_ERROR = "VALIDATION_ERROR"
    STREAM_UNAVAILABLE = "STREAM_UNAVAILABLE"
    INSUFFICIENT_BANDWIDTH = "INSUFFICIENT_BANDWIDTH"
    CENTRE_NOT_EMPANELED = "CENTRE_NOT_EMPANELED"
    INTERNAL_ERROR = "INTERNAL_ERROR"


class ErrorDetail(BaseModel):
    field: str | None = None
    message: str
    code: str | None = None


class SkillGuardError(Exception):
    def __init__(self, code: ErrorCode, message: str, status_code: int = 400, details: list[ErrorDetail] | None = None):
        self.code = code
        self.message = message
        self.status_code = status_code
        self.details = details or []
        super().__init__(message)


async def skillguard_exception_handler(request: Request, exc: SkillGuardError) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": exc.code.value,
                "message": exc.message,
                "details": [d.model_dump() for d in exc.details],
                "trace_id": str(uuid.uuid4())
            }
        }
    )
