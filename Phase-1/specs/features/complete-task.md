# Feature: Mark Task as Complete

## User Story
As a user, I want to mark a task as complete so that I can track my progress.

## Acceptance Criteria

### Scenario: Marking a task as complete
- **Given** I have an incomplete task in my to-do list.
- **When** I choose the "Mark Task as Complete" option.
- **And** I enter the ID of the task I want to mark as complete.
- **Then** the task's status is changed to "completed".
- **And** I see a confirmation message that the task was marked as complete.

### Scenario: Marking a non-existent task as complete
- **Given** I do not have a task with a specific ID in my to-do list.
- **When** I choose the "Mark Task as Complete" option.
- **And** I enter the non-existent task ID.
- **Then** I see an error message indicating that the task was not found.

## Technical Details
- The `mark_task_complete` function should take the task ID as an argument.
- The function should find the task with the given ID and set its `completed` status to `True`.
- If the task is not found, the function should report an error.
