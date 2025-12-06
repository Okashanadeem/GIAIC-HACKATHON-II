# Feature: View Tasks

## User Story
As a user, I want to view all the tasks in my to-do list so that I can see what I need to do.

## Acceptance Criteria

### Scenario: Viewing the task list
- **Given** I have added tasks to my to-do list.
- **When** I choose the "View Tasks" option.
- **Then** I see a list of all the tasks.
- **And** each task in the list displays its ID, title, description, and completion status.

### Scenario: Viewing an empty task list
- **Given** I have not added any tasks to my to-do list.
- **When** I choose the "View Tasks" option.
- **Then** I see a message indicating that there are no tasks in the list.

## Technical Details
- The `view_tasks` function should iterate through the list of tasks and print each one in a readable format.
- The completion status should be clearly indicated, for example, with a `[X]` for completed tasks and `[ ]` for incomplete tasks.
