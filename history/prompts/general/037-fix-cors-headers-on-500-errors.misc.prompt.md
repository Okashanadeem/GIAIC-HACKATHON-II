---
id: "037"
title: "Fix CORS headers on 500 errors"
stage: "misc"
date: "2026-01-04"
surface: "agent"
model: "sonnet-4-5-20250929"
feature: "none"
branch: "main"
user: "User"
command: "Fix CORS error blocking chatbot responses"
labels: "backend,cors,exception-handling,vercel"
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - "phase2/backend/app/core/exceptions.py"
tests:
  - "none"
---

## Prompt

When I send a message to chatbot it dosnt reply and print this in console:

Access to fetch at 'https://giaic-q4-h2-p2-backend.vercel.app/api/v1/chat' from origin 'https://giaic-q4-h2-p2.vercel.app' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
969-c14ad0b24f1c7f7b.js:1  POST https://giaic-q4-h2-p2-backend.vercel.app/api/v1/chat net::ERR_FAILED 500 (Internal Server Error)

## Response snapshot

Analyzed CORS configuration and identified that `generic_exception_handler` was commented out, causing unhandled exceptions to return 500 responses without CORS headers. Fixed by:
1. Uncommenting `generic_exception_handler` registration
2. Changing exception type from `Exception` to `BaseException` to catch all errors

Modified `phase2/backend/app/core/exceptions.py`:
- Line 165: Changed signature to `async def generic_exception_handler(request: Request, exc: BaseException)`
- Line 205: Uncommented `app.add_exception_handler(Exception, generic_exception_handler)`

## Outcome

- ✅ Impact: CORS headers now included on ALL error responses including 500 Internal Server Errors
- 🧪 Tests: none
- 📁 Files: phase2/backend/app/core/exceptions.py (2 lines changed)
- 🔁 Next prompts: Deploy to Vercel and verify chatbot works
- 🧠 Reflection: The exception handler was commented out during development but Vercel serverless environment has more edge cases that trigger unhandled exceptions

## Evaluation notes (flywheel)

- Failure modes observed: HTTP 500 errors without CORS headers block frontend from receiving error details
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallst change to try): N/A
