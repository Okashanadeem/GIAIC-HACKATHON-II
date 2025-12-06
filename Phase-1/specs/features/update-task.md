# Feature: Update Task

## User Story
As a user, I want to update an existing task in my to-do list so that I can change its details.

## Acceptance Criteria

### Scenario: Updating an existing task
- **Given** I have a task in my to-do list.
- **When** I choose the "Update Task" option.
- **And** I enter the ID of the task I want to update.
- **And** I provide a new title and/or a new description.
- **Then** the task's details are updated.
- **And** I see a confirmation message that the task was updated successfully.

### Scenario: Updating a non-existent task
- **Given** I do not have a task with a specific ID in my to-do list.
- **When** I choose the "Update Task" option.
- **And** I enter the non-existent task ID.
- **Then** I see an error message indicating that the task was not found.

## Technical Details
- The `update_task` function should take the task ID, a new title, and a new description as arguments.
- The function should first find the task with the given ID. If the task is not found, it should report an error.
- If the task is found, its title and/or description should be updated.
