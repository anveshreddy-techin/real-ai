"""
SkillGuard AI — Structured Logging Engine
"""
import logging
import sys
from typing import Any


class SkillGuardLogger:
    def __init__(self, name: str):
        self._logger = logging.getLogger(name)

    def info(self, event: str, **kwargs: Any) -> None:
        self._logger.info(f"[EVENT={event}] {kwargs if kwargs else ''}")

    def warning(self, event: str, **kwargs: Any) -> None:
        self._logger.warning(f"[WARN={event}] {kwargs if kwargs else ''}")

    def error(self, event: str, **kwargs: Any) -> None:
        self._logger.error(f"[ERROR={event}] {kwargs if kwargs else ''}")

    def debug(self, event: str, **kwargs: Any) -> None:
        self._logger.debug(f"[DEBUG={event}] {kwargs if kwargs else ''}")


def configure_logging(log_level: str = "INFO") -> None:
    level = getattr(logging, log_level.upper(), logging.INFO)
    logging.basicConfig(
        format="%(asctime)s [%(levelname)s] [SkillGuard] %(name)s: %(message)s",
        stream=sys.stdout,
        level=level,
    )


def get_logger(name: str) -> SkillGuardLogger:
    return SkillGuardLogger(name)
