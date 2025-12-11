# Phase 2: Full-Stack Todo Application

This phase of the project builds a full-stack Todo application with a Next.js frontend and an integrated FastAPI backend. The FastAPI backend is now part of the Next.js project, residing within the `app/api` directory, enabling seamless deployment on Vercel.

## Frontend & Integrated API

The application is a Next.js project built with React, TypeScript, and Tailwind CSS. It provides a user interface for managing tasks and also hosts the FastAPI backend as serverless API routes.

### Features

-   User authentication (signup, login, logout).
-   Protected routes for authenticated users.
-   CRUD operations for tasks.
-   Responsive design with dark mode support.
-   **Integrated FastAPI Backend:** Handles user authentication with JWT, database integration with SQLModel and Neon DB, and API endpoints for user and task management.

### Getting Started

To run the full-stack application locally:

1.  **Backend Setup (Python API):**
    *   Navigate to the API directory: `cd Phase-2/frontend/app/api`
    *   Activate your Python virtual environment.
    *   Install Python dependencies: `pip install -r requirements.txt`
    *   Start the FastAPI backend server: `python -m uvicorn api.route:app --reload`
    *   The backend will be available at `http://localhost:8000`. Keep this terminal running.

2.  **Frontend Setup (Next.js):**
    *   Open a **new terminal window**.
    *   Navigate to the frontend directory: `cd Phase-2/frontend`
    *   Install Node.js dependencies: `npm install` (or `yarn install`, `pnpm install`, `bun install`)
    *   Start the Next.js development server: `npm run dev`
    *   The frontend will be available at `http://localhost:3000`.

**Note:** Ensure you have configured environment variables for local development in `Phase-2/frontend/.env`. For production, these must be set in your Vercel project settings.