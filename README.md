# AI-Powered Todo Application

> A full-stack, AI-enhanced task management system with natural language processing capabilities

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=next.js)](https://nextjs.org)
[![Python](https://img.shields.io/badge/Python-3.13+-3776AB?style=flat&logo=python)](https://python.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat&logo=postgresql)](https://neon.tech)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Configuration](#environment-configuration)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)
- [Security](#-security)
- [Resources](#-resources)

---

## 🎯 Overview

This project is a multi-phase evolution of a todo application, demonstrating progressive enhancement from a simple console app to a sophisticated AI-powered web platform.

**Built for:** GIAIC Q4 Hackathon II
**Status:** Phase III Complete ✅

---

## ✨ Features

### Phase I: Console Application
- ✅ Basic CLI todo manager
- ✅ Local file storage
- ✅ CRUD operations

### Phase II: Full-Stack Web Application
- ✅ **Authentication**: JWT-based user authentication
- ✅ **Task Management**: Complete CRUD operations
- ✅ **Filtering**: View All, Pending, or Completed tasks
- ✅ **Responsive UI**: Modern, mobile-friendly interface
- ✅ **Real-time Updates**: Instant UI feedback

### Phase III: AI Integration
- ✅ **Natural Language Processing**: Manage tasks using conversational language
- ✅ **MCP Server**: Model Context Protocol integration
- ✅ **Smart Commands**:
  - "Add a task to buy groceries tomorrow"
  - "Show all my pending tasks"
  - "Mark task 5 as complete"
  - "Delete all completed tasks"

---

## 🛠 Tech Stack

### Backend
- **Framework**: FastAPI 0.115+
- **ORM**: SQLModel 0.0.22+
- **Database**: Neon PostgreSQL (Serverless)
- **Auth**: python-jose (JWT)
- **AI**: OpenAI Agents SDK
- **Server**: Uvicorn (ASGI)

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Auth**: Better Auth
- **Styling**: TailwindCSS
- **AI Chat**: OpenAI ChatKit
- **Language**: TypeScript

### DevOps & Tools
- **Package Manager**: UV (Python), npm (Node.js)
- **Database Migrations**: Alembic
- **API Transport**: HTTP/REST, MCP

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Python** 3.13 or higher
- **Node.js** 18 or higher
- **UV** (recommended) or pip
- **Git**

External services required:
- [Neon PostgreSQL](https://neon.tech) account (free tier available)
- [OpenAI API](https://platform.openai.com) key

---

### Environment Configuration

#### Step 1: Create Backend Environment File

Create `phase2/backend/.env`:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@host.region.aws.neon.tech/dbname?sslmode=require

# Authentication
JWT_SECRET=your-randomly-generated-secret-min-32-chars
JWT_ALGORITHM=HS256

# AI Configuration
OPENAI_API_KEY=sk-proj-your-openai-api-key-here
MCP_SERVER_URL=http://localhost:8000/mcp/mcp

# Environment
ENVIRONMENT=development
```

#### Step 2: Create Frontend Environment File

Create `phase2/frontend/.env`:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Authentication (must match backend JWT_SECRET)
BETTER_AUTH_SECRET=your-randomly-generated-secret-min-32-chars
BETTER_AUTH_URL=http://localhost:3000
```

#### Step 3: Generate Secure Secret

**IMPORTANT**: `BETTER_AUTH_SECRET` and `JWT_SECRET` must be **identical**.

```bash
# Option 1: OpenSSL (recommended)
openssl rand -base64 32

# Option 2: Python
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Option 3: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the generated secret to **both** environment files.

---

### Installation

#### Backend Setup

```bash
cd phase2/backend

# Install dependencies
uv sync

# Run database migrations
uv run alembic upgrade head
```

#### Frontend Setup

```bash
cd phase2/frontend

# Install dependencies
npm install
```

---

### Running the Application

#### Start Backend (Terminal 1)

```bash
cd phase2/backend
uv run uvicorn app.main:app --reload --port 8000
```

#### Start Frontend (Terminal 2)

```bash
cd phase2/frontend
npm run dev
```

#### Access Points

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Web application |
| **Backend API** | http://localhost:8000 | REST API |
| **API Docs** | http://localhost:8000/docs | Interactive Swagger UI |
| **ReDoc** | http://localhost:8000/redoc | Alternative API docs |

---

## 📂 Project Structure

```
GIAIC-HACKATHON-II/
├── phase1/                          # Phase I: Console application
│   ├── main.py                      # Entry point
│   └── tasks.json                   # Data storage
│
├── phase2/                          # Phase II & III: Web application
│   ├── backend/                     # FastAPI backend
│   │   ├── app/
│   │   │   ├── api/v1/             # API routes
│   │   │   │   ├── auth.py         # Authentication endpoints
│   │   │   │   ├── tasks.py        # Task CRUD endpoints
│   │   │   │   └── chat.py         # AI chat endpoints
│   │   │   ├── models/             # SQLModel schemas
│   │   │   │   ├── user.py         # User model
│   │   │   │   ├── task.py         # Task model
│   │   │   │   └── conversation.py # Chat models
│   │   │   ├── config.py           # Configuration
│   │   │   ├── database.py         # Database setup
│   │   │   └── main.py             # App entry point
│   │   ├── alembic/                # Database migrations
│   │   ├── pyproject.toml          # Python dependencies
│   │   └── .env                    # Backend environment
│   │
│   └── frontend/                    # Next.js frontend
│       ├── app/                     # App router pages
│       │   ├── (auth)/             # Auth pages (login/register)
│       │   ├── dashboard/          # Protected dashboard
│       │   └── layout.tsx          # Root layout
│       ├── components/             # React components
│       │   ├── ui/                 # Base UI components
│       │   ├── TaskList.tsx        # Task list component
│       │   └── ChatWidget.tsx      # AI chat interface
│       ├── lib/                    # Utilities
│       │   ├── api/                # API client
│       │   └── auth.ts             # Auth helpers
│       ├── middleware.ts           # Auth middleware
│       ├── package.json            # Node dependencies
│       └── .env                    # Frontend environment
│
├── specs/                           # Feature specifications
│   └── [feature-name]/
│       ├── spec.md                 # Requirements
│       ├── plan.md                 # Architecture
│       └── tasks.md                # Implementation tasks
│
├── history/                         # Development history
│   ├── prompts/                    # Prompt history records
│   └── adr/                        # Architecture decisions
│
├── .specify/                        # Spec-Kit configuration
├── .claude/                         # Claude Code skills
├── CLAUDE.md                        # Project instructions
└── README.md                        # This file
```

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/register` | Create new user account | ❌ |
| POST | `/api/v1/token` | Login and get JWT token | ❌ |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/tasks` | List all user tasks | ✅ |
| POST | `/api/v1/tasks` | Create new task | ✅ |
| PATCH | `/api/v1/tasks/{id}` | Update existing task | ✅ |
| DELETE | `/api/v1/tasks/{id}` | Delete task | ✅ |

### AI Chat Endpoint

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/{user_id}/chat` | Send message to AI agent | ✅ |

**Full interactive documentation**: http://localhost:8000/docs

---

## 💻 Development

### Backend Commands

```bash
cd phase2/backend

# Start development server
uv run uvicorn app.main:app --reload

# Run database migrations
uv run alembic upgrade head

# Check current migration
uv run alembic current

# Create new migration
uv run alembic revision --autogenerate -m "description"

# Run tests
uv run pytest

# Format code
uv run black app/
uv run isort app/
```

### Frontend Commands

```bash
cd phase2/frontend

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Format code
npm run format
```

### Database Management

```bash
# Connect to Neon database (optional)
psql "postgresql://user:pass@host.neon.tech/dbname?sslmode=require"

# Reset migrations (use with caution)
cd phase2/backend
uv run alembic downgrade base
uv run alembic upgrade head
```

---

## 🔧 Troubleshooting

### Backend Issues

#### Problem: Backend won't start

**Symptoms:**
- Database connection errors
- Import errors
- Port already in use

**Solutions:**
1. Verify `DATABASE_URL` in `.env`:
   ```bash
   cd phase2/backend
   python -c "from app.config import get_settings; print(get_settings().database_url)"
   ```
2. Test Neon connection in dashboard
3. Ensure JWT_SECRET is at least 32 characters
4. Check port 8000 is available:
   ```bash
   lsof -i :8000  # Mac/Linux
   netstat -ano | findstr :8000  # Windows
   ```
5. Reinstall dependencies:
   ```bash
   uv sync --reinstall
   ```

#### Problem: OpenAI API errors

**Solutions:**
1. Verify API key format (starts with `sk-`)
2. Check account credits: https://platform.openai.com/usage
3. Confirm API key is active
4. Test key directly:
   ```bash
   curl https://api.openai.com/v1/models \
     -H "Authorization: Bearer $OPENAI_API_KEY"
   ```

---

### Frontend Issues

#### Problem: Frontend won't start

**Symptoms:**
- Module not found errors
- Cannot connect to backend
- Authentication failures

**Solutions:**
1. Clear cache and reinstall:
   ```bash
   cd phase2/frontend
   rm -rf node_modules package-lock.json .next
   npm install
   ```
2. Verify backend is running on port 8000
3. Check `NEXT_PUBLIC_API_URL` in `.env`
4. Confirm `BETTER_AUTH_SECRET` matches backend `JWT_SECRET`
5. Check browser console for CORS errors

#### Problem: Authentication not working

**Solutions:**
1. Ensure secrets match exactly:
   ```bash
   # Backend
   grep JWT_SECRET phase2/backend/.env

   # Frontend
   grep BETTER_AUTH_SECRET phase2/frontend/.env
   ```
2. Clear browser cookies and localStorage
3. Verify JWT token expiration settings
4. Check backend logs for auth errors

---

### Database Issues

#### Problem: Migration errors

**Solutions:**
1. Check current migration status:
   ```bash
   uv run alembic current
   ```
2. If "can't locate revision":
   ```bash
   uv run alembic stamp head
   ```
3. If database is out of sync:
   ```bash
   uv run alembic downgrade -1
   uv run alembic upgrade head
   ```

#### Problem: Connection failures

**Solutions:**
1. Test connection from Neon dashboard
2. Verify `sslmode=require` is in connection string
3. Check Neon project is active (not suspended)
4. Ensure your IP is not blocked
5. Try regenerating connection string in Neon

---

### AI Chat Issues

#### Problem: Chatbot not responding

**Solutions:**
1. Verify OpenAI API key is valid
2. Check MCP server is running:
   ```bash
   curl http://localhost:8000/mcp/mcp
   # Should return: 405 Method Not Allowed (expected)
   ```
3. Review backend logs for errors
4. Test with simple command: "Hello"
5. Ensure user_id is correct in request

---

## 🔐 Security

### Best Practices

- ✅ Never commit `.env` files to version control
- ✅ Use different secrets for development and production
- ✅ Rotate secrets immediately if exposed
- ✅ Keep `JWT_SECRET` and `BETTER_AUTH_SECRET` synchronized
- ✅ Use strong, randomly generated secrets (32+ characters)
- ✅ Never share API keys publicly or in screenshots
- ✅ Enable rate limiting in production
- ✅ Use HTTPS in production environments
- ✅ Implement CORS properly for production domains
- ✅ Regularly update dependencies for security patches

### Environment Variables Checklist

- [ ] `DATABASE_URL` contains valid Neon connection string
- [ ] `JWT_SECRET` is at least 32 characters long
- [ ] `BETTER_AUTH_SECRET` matches `JWT_SECRET` exactly
- [ ] `OPENAI_API_KEY` starts with `sk-` and is valid
- [ ] `.env` files are in `.gitignore`
- [ ] Production secrets differ from development
- [ ] All secrets are randomly generated (not default values)

---

## 📚 Resources

### Documentation

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [SQLModel Documentation](https://sqlmodel.tiangolo.com)
- [Better Auth Documentation](https://better-auth.com/docs)
- [Neon PostgreSQL Docs](https://neon.tech/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)

### Tools & Services

- [Neon Database](https://neon.tech) - Serverless PostgreSQL
- [OpenAI Platform](https://platform.openai.com) - AI API
- [UV Package Manager](https://github.com/astral-sh/uv) - Fast Python package manager
- [Alembic](https://alembic.sqlalchemy.org) - Database migrations

### Project Documentation

- `Documentation-Hackathon-II.md` - Hackathon requirements
- `CLAUDE.md` - Project architecture and guidelines
- `specs/` - Feature specifications and design docs
- `history/` - Development history and decisions

---

## 🤝 Contributing

This is a hackathon project, but if you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is created for educational purposes as part of GIAIC Q4 Hackathon II.

---

## 🏆 Acknowledgments

- **GIAIC** for organizing the hackathon
- **Anthropic** for Claude Code
- **OpenAI** for GPT and Agent SDK
- **Neon** for serverless PostgreSQL
- **Vercel** for Next.js framework

---

<div align="center">

**Built with ❤️ By Okasha Nadeem for GIAIC Q4 Hackathon II**

[Frontend](http://localhost:3000) • [API Docs](http://localhost:8000/docs) • [Neon Dashboard](https://neon.tech)

</div>
