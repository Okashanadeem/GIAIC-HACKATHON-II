"""Task model for the Todo application."""

from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING, Optional, Sequence
from uuid import UUID, uuid4

from sqlalchemy import CheckConstraint, Column, DateTime, Index, String, Text, func
from sqlmodel import Field, SQLModel, select

if TYPE_CHECKING:
    from sqlalchemy.ext.asyncio import AsyncSession


class TaskStatus(str, Enum):
    """Valid task statuses."""
    PENDING = "pending"
    COMPLETED = "completed"


class Task(SQLModel, table=True):
    """Represents a single to-do item owned by a user."""

    __tablename__ = "task"
    __table_args__ = (
        CheckConstraint(
            "status IN ('pending', 'completed')", name="chk_task_status"
        ),
        CheckConstraint(
            "length(trim(title)) > 0", name="chk_task_title_not_empty"
        ),
        Index("ix_task_user_status", "user_id", "status"),
    )

    id: UUID = Field(
        default_factory=uuid4,
        primary_key=True,
        nullable=False,
    )

    user_id: str = Field(
        ...,
        max_length=36,
        nullable=False,
        index=True,
    )

    title: str = Field(
        ...,
        max_length=255,
        nullable=False,
    )

    description: Optional[str] = Field(
        default=None,
        sa_column=Column(Text, nullable=True),
    )

    status: TaskStatus = Field(
        default=TaskStatus.PENDING,
        sa_column=Column(
            String(20),
            nullable=False,
            default="pending",
        ),
    )

    created_at: datetime = Field(
        sa_column=Column(
            DateTime(timezone=True),
            server_default=func.now(),
            nullable=False,
        ),
    )

    updated_at: datetime = Field(
        sa_column=Column(
            DateTime(timezone=True),
            server_default=func.now(),
            onupdate=func.now(),
            nullable=False,
        ),
    )

    @classmethod
    async def get_by_user(
        cls, session: "AsyncSession", user_id: str
    ) -> Sequence["Task"]:
        """Get all tasks for a specific user."""
        statement = select(cls).where(cls.user_id == user_id)
        result = await session.execute(statement)
        return result.scalars().all()

    @classmethod
    async def get_by_user_and_status(
        cls, session: "AsyncSession", user_id: str, status: TaskStatus
    ) -> Sequence["Task"]:
        """Get tasks for a specific user filtered by status."""
        statement = select(cls).where(
            cls.user_id == user_id,
            cls.status == status,
        )
        result = await session.execute(statement)
        return result.scalars().all()

    @classmethod
    async def update_task(
        cls,
        session: "AsyncSession",
        task_id: UUID,
        user_id: str,
        updates: dict,
    ) -> Optional["Task"]:
        """Update a task owned by a specific user."""
        statement = select(cls).where(cls.id == task_id, cls.user_id == user_id)
        result = await session.execute(statement)
        task = result.scalar_one_or_none()

        if task is None:
            return None

        allowed_fields = {"title", "description", "status"}
        for field, value in updates.items():
            if field in allowed_fields:
                setattr(task, field, value)

        await session.flush()
        await session.refresh(task)

        return task

    @classmethod
    async def delete_task(
        cls,
        session: "AsyncSession",
        task_id: UUID,
        user_id: str,
    ) -> bool:
        """Delete a task owned by a specific user."""
        statement = select(cls).where(cls.id == task_id, cls.user_id == user_id)
        result = await session.execute(statement)
        task = result.scalar_one_or_none()

        if task is None:
            return False

        await session.delete(task)
        await session.flush()

        return True
