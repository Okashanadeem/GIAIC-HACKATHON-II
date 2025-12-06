# Feature: Delete Task

## User Story
As a user, I want to delete a task from my to-do list so that I can remove completed or unnecessary tasks.

## Acceptance Criteria

### Scenario: Deleting an existing task
- **Given** I have a task in my to-do list.
- **When** I choose the "Delete Task" option.
- **And** I enter the ID of the task I want to delete.
- **Then** the task is removed from my to-do list.
- **And** I see a confirmation message that the task was deleted successfully.

### Scenario: Deleting a non-existent task
- **Given** I do not have a task with a specific ID in my to-do list.
- **When** I choose the "Delete Task" option.
- **And** I enter the non-existent task ID.
- **Then** I see an error message indicating that the task was not found.

## Technical Details
- The `delete_task` function should take the task ID as an argument.
- The function should find the task with the given ID and remove it from the list of tasks.
- If the task is not found, the function should report an error.
