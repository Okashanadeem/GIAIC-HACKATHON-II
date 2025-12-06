import sys

# In-memory data store
tasks = []
next_id = 1

def add_task(title, description):
    """Adds a new task to the list."""
    global next_id
    task = {
        "id": next_id,
        "title": title,
        "description": description,
        "completed": False
    }
    tasks.append(task)
    next_id += 1
    print(f"Task '{title}' added successfully.")

def view_tasks():
    """Views all tasks in the list."""
    if not tasks:
        print("No tasks in the list.")
        return

    for task in tasks:
        status = "X" if task["completed"] else " "
        print(f"[{status}] #{task['id']}: {task['title']} - {task['description']}")

def update_task(task_id, new_title, new_description):
    """Updates an existing task."""
    for task in tasks:
        if task["id"] == task_id:
            task["title"] = new_title
            task["description"] = new_description
            print(f"Task #{task_id} updated successfully.")
            return
    print(f"Error: Task with ID {task_id} not found.")

def delete_task(task_id):
    """Deletes a task from the list."""
    global tasks
    task_to_delete = None
    for task in tasks:
        if task["id"] == task_id:
            task_to_delete = task
            break
    
    if task_to_delete:
        tasks.remove(task_to_delete)
        print(f"Task #{task_id} deleted successfully.")
    else:
        print(f"Error: Task with ID {task_id} not found.")

def mark_task_complete(task_id):
    """Marks a task as complete."""
    for task in tasks:
        if task["id"] == task_id:
            task["completed"] = True
            print(f"Task #{task_id} marked as complete.")
            return
    print(f"Error: Task with ID {task_id} not found.")

def print_menu():
    """Prints the main menu."""
    print("\n--- To-Do List Menu ---")
    print("1. Add Task")
    print("2. View Tasks")
    print("3. Update Task")
    print("4. Delete Task")
    print("5. Mark Task as Complete")
    print("6. Exit")
    print("-----------------------")

def main():
    """Main function to run the application."""
    while True:
        print_menu()
        choice = input("Enter your choice: ")

        if choice == '1':
            title = input("Enter task title: ")
            description = input("Enter task description: ")
            add_task(title, description)
        elif choice == '2':
            view_tasks()
        elif choice == '3':
            try:
                task_id = int(input("Enter task ID to update: "))
                new_title = input("Enter new title: ")
                new_description = input("Enter new description: ")
                update_task(task_id, new_title, new_description)
            except ValueError:
                print("Invalid input. Please enter a number for the task ID.")
        elif choice == '4':
            try:
                task_id = int(input("Enter task ID to delete: "))
                delete_task(task_id)
            except ValueError:
                print("Invalid input. Please enter a number for the task ID.")
        elif choice == '5':
            try:
                task_id = int(input("Enter task ID to mark as complete: "))
                mark_task_complete(task_id)
            except ValueError:
                print("Invalid input. Please enter a number for the task ID.")
        elif choice == '6':
            print("Exiting...")
            sys.exit()
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
