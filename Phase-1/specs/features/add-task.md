# Feature: Add Task

## User Story
As a user, I want to add a new task to my to-do list so that I can keep track of what I need to do.

## Acceptance Criteria

### Scenario: Adding a new task
- **Given** I have the to-do list application open.
- **When** I choose the "Add Task" option.
- **And** I enter a title and a description for the new task.
- **Then** the task is added to my to-do list.
- **And** I see a confirmation message that the task was added successfully.

## Technical Details
- The task should be assigned a unique ID.
- The task should have a `completed` status, which is `False` by default.
- The `add_task` function should take a title and description as arguments.
