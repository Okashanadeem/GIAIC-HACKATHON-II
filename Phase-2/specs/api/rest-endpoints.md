# REST API Endpoints for Phase 2

## Base URL
- Development: http://localhost:8000
- Production: [To be determined]

## Authentication
All endpoints require JWT token in header:
Authorization: Bearer <token>

## Endpoints

### GET /api/{user_id}/tasks
List all tasks for authenticated user.

Query Parameters:
- status: "all" | "pending" | "completed"
- sort: "created" | "title" | "due_date"

Response: Array of Task objects (details below)

### POST /api/{user_id}/tasks
Create a new task.

Request Body:
- title: string (required, 1-200 characters)
- description: string (optional, max 1000 characters)

Response: Created Task object (details below)

### GET /api/{user_id}/tasks/{id}
Get task details.

Path Parameters:
- id: integer (task ID)

Response: Task object (details below)

### PUT /api/{user_id}/tasks/{id}
Update a task.

Path Parameters:
- id: integer (task ID)

Request Body:
- title: string (optional, 1-200 characters)
- description: string (optional, max 1000 characters)
- completed: boolean (optional)

Response: Updated Task object (details below)

### DELETE /api/{user_id}/tasks/{id}
Delete a task.

Path Parameters:
- id: integer (task ID)

Response: Success message or status

### PATCH /api/{user_id}/tasks/{id}/complete
Toggle completion status of a task.

Path Parameters:
- id: integer (task ID)

Request Body:
- completed: boolean (required)

Response: Updated Task object (details below)

## Task Object Structure (Example)
```json
{
  "id": 1,
  "user_id": "user123",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "created_at": "2025-12-07T10:00:00Z",
  "updated_at": "2025-12-07T10:00:00Z"
}
```
