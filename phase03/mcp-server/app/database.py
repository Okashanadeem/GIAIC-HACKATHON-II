"""Database connection and session management for Neon Postgres."""

from typing import Any

from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel

from app.config import get_settings

# Module-level engine reference (lazy initialization)
_engine: AsyncEngine | None = None
_async_session: Any = None


def get_engine() -> AsyncEngine:
    """Get or create the async database engine.

    Uses lazy initialization to avoid event loop binding issues in tests.

    Returns:
        AsyncEngine instance
    """
    global _engine, _async_session

    if _engine is None:
        settings = get_settings()
        _engine = create_async_engine(
            settings.database_url,
            echo=settings.is_development,
            pool_size=5,
            max_overflow=10,
        )
        _async_session = sessionmaker(
            _engine,
            class_=AsyncSession,
            expire_on_commit=False,
        )

    return _engine


def get_session_factory() -> Any:
    """Get the session factory, initializing engine if needed."""
    global _async_session
    if _async_session is None:
        get_engine()
    return _async_session


def reset_engine() -> None:
    """Reset the engine for testing purposes."""
    global _engine, _async_session
    _engine = None
    _async_session = None
