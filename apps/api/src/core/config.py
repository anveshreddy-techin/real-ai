"""
SkillGuard AI — Core Application Configuration
SIH26245: AI-Based Real-Time Monitoring of Training Centres
"""
from enum import Enum
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Environment(str, Enum):
    DEVELOPMENT = "development"
    TESTING = "testing"
    PRODUCTION = "production"


class BandwidthMode(str, Enum):
    HIGH = "HIGH"       # 5 FPS RTSP Stream (Urban / Fibre)
    LOW = "LOW"         # 1 Frame / 60s Snapshot (Rural / Edge 2G/3G)
    HYBRID = "HYBRID"   # Adaptive based on packet loss


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    APP_NAME: str = "SkillGuard AI"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: Environment = Environment.DEVELOPMENT
    DEBUG: bool = False

    HOST: str = "0.0.0.0"
    PORT: int = 8000

    JWT_SECRET: str = "dev_secret_key_skillguard_sih26245_msde_inspection"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://skillguard.vercel.app",
        "*"
    ]

    # Video & Analytics Processing
    DEFAULT_BANDWIDTH_MODE: BandwidthMode = BandwidthMode.LOW
    LOW_BANDWIDTH_INTERVAL_SECONDS: int = 60
    HEADCOUNT_DISCREPANCY_THRESHOLD: float = 0.20  # Flag if >20% mismatch
    CRITICAL_DISCREPANCY_THRESHOLD: float = 0.40   # Urgent alert if >40% mismatch
    PRIVACY_ENFORCE_ANONYMIZATION: bool = True     # Never stream raw faces

    DEMO_MODE: bool = True
    CANONICAL_CENTRE_ID: str = "PMKVY-UP-GKP-0042"


settings = Settings()
