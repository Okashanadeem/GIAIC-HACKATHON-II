# Phase 2: Full-Stack Todo Application

This phase of the project builds a full-stack Todo application with a Next.js frontend and a FastAPI backend.

## Frontend

The frontend is a Next.js application built with React, TypeScript, and Tailwind CSS. It provides a user interface for managing tasks.

### Features

-   User authentication (signup, login, logout).
-   Protected routes for authenticated users.
-   CRUD operations for tasks.
-   Responsive design with dark mode support.

### Getting Started

To start the frontend development server, navigate to the `Phase-2/frontend` directory and run the following command:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## Backend

The backend is a FastAPI application that provides a RESTful API for the frontend.

### Features

-   User authentication with JWT.
-   Database integration with SQLModel and Neon DB.
-   API endpoints for user and task management.
-   CORS middleware to allow requests from the frontend.

### Getting Started

To start the backend server, navigate to the `Phase-2/backend` directory and run the following command:

```bash
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`.
