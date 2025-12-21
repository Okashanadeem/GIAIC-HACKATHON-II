"""Custom exceptions and RFC 7807 exception handlers for FastAPI."""

import os
from typing import Any

from fastapi import FastAPI, Request
from fastapi.exceptions import HTTPException, RequestValidationError
from fastapi.responses import JSONResponse

from app.schemas.error import ProblemDetail, ValidationErrorDetail, ValidationErrorItem


def _get_cors_headers(request: Request | None = None) -> dict[str, str]:
    """Get CORS headers to include in error responses.

    This ensures CORS headers are present even in error responses,
    preventing browsers from blocking error details.

    Args:
        request: Optional request object to get Origin header from.

    Returns:
        Dictionary of CORS headers.
    """
    # Get allowed origins from environment or use defaults
    cors_origins_env = os.environ.get("CORS_ORIGINS", "")
    if cors_origins_env:
        allowed_origins = [origin.strip() for origin in cors_origins_env.split(",")]
    else:
        allowed_origins = [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "https://giaic-q4-h2-p2.vercel.app",
        ]

    # Try to match the request origin with allowed origins
    origin_to_use = allowed_origins[0] if allowed_origins else "*"
    if request:
        request_origin = request.headers.get("origin")
        if request_origin and request_origin in allowed_origins:
            origin_to_use = request_origin

    return {
        "Access-Control-Allow-Origin": origin_to_use,
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
    }


class AuthenticationError(Exception):
    """Raised when JWT authentication fails."""

    def __init__(self, detail: str = "Authentication failed"):
        self.detail = detail
        super().__init__(detail)


class TaskNotFoundError(Exception):
    """Raised when a task is not found or not owned by the user."""

    def __init__(self, task_id: str | None = None):
        self.task_id = task_id
        detail = f"Task {task_id} not found" if task_id else "Task not found"
        super().__init__(detail)


async def authentication_error_handler(
    request: Request, exc: AuthenticationError
) -> JSONResponse:
    """Handle AuthenticationError with RFC 7807 response.

    Returns 401 Unauthorized with ProblemDetail body.
    """
    problem = ProblemDetail(
        type="about:blank",
        title="Unauthorized",
        status=401,
        detail=exc.detail,
        instance=str(request.url.path),
    )
    return JSONResponse(
        status_code=401,
        content=problem.model_dump(exclude_none=True),
        headers=_get_cors_headers(request),
    )


async def task_not_found_handler(
    request: Request, exc: TaskNotFoundError
) -> JSONResponse:
    """Handle TaskNotFoundError with RFC 7807 response.

    Returns 404 Not Found with ProblemDetail body.
    Note: We use 404 (not 403) even for other users' tasks to prevent enumeration.
    """
    problem = ProblemDetail(
        type="about:blank",
        title="Not Found",
        status=404,
        detail=str(exc),
        instance=str(request.url.path),
    )
    return JSONResponse(
        status_code=404,
        content=problem.model_dump(exclude_none=True),
        headers=_get_cors_headers(request),
    )


async def validation_error_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    """Handle Pydantic validation errors with RFC 7807 response.

    Returns 422 Unprocessable Entity with ValidationErrorDetail body.
    """
    errors = [
        ValidationErrorItem(
            loc=list(err.get("loc", [])),
            msg=err.get("msg", "Validation error"),
            type=err.get("type", "value_error"),
        )
        for err in exc.errors()
    ]

    problem = ValidationErrorDetail(
        type="about:blank",
        title="Validation Error",
        status=422,
        detail="Request validation failed",
        instance=str(request.url.path),
        errors=errors,
    )
    return JSONResponse(
        status_code=422,
        content=problem.model_dump(exclude_none=True),
        headers=_get_cors_headers(request),
    )


async def http_exception_handler(
    request: Request, exc: HTTPException
) -> JSONResponse:
    """Handle FastAPI HTTPException with RFC 7807 response and CORS headers.

    This is critical for CORS - HTTPException without CORS headers will be blocked.

    Returns HTTPException status code with ProblemDetail body.
    """
    problem = ProblemDetail(
        type="about:blank",
        title=exc.__class__.__name__,
        status=exc.status_code,
        detail=exc.detail,
        instance=str(request.url.path),
    )
    return JSONResponse(
        status_code=exc.status_code,
        content=problem.model_dump(exclude_none=True),
        headers=_get_cors_headers(request),
    )


async def generic_exception_handler(
    request: Request, exc: Exception
) -> JSONResponse:
    """Handle unexpected exceptions with RFC 7807 response.

    Returns 500 Internal Server Error with minimal detail.
    """
    problem = ProblemDetail(
        type="about:blank",
        title="Internal Server Error",
        status=500,
        detail="An unexpected error occurred",
        instance=str(request.url.path),
    )
    return JSONResponse(
        status_code=500,
        content=problem.model_dump(exclude_none=True),
        headers=_get_cors_headers(request),
    )


def register_exception_handlers(app: FastAPI) -> None:
    """Register all exception handlers with the FastAPI app.

    IMPORTANT: HTTPException handler is registered to ensure CORS headers
    are included in error responses, preventing CORS blocking in browser.

    Args:
        app: FastAPI application instance
    """
    # Register HTTPException handler FIRST - this is critical for CORS
    app.add_exception_handler(HTTPException, http_exception_handler)

    # Register custom exception handlers
    app.add_exception_handler(AuthenticationError, authentication_error_handler)
    app.add_exception_handler(TaskNotFoundError, task_not_found_handler)
    app.add_exception_handler(RequestValidationError, validation_error_handler)

    # Optionally add generic handler for production
    # app.add_exception_handler(Exception, generic_exception_handler)
