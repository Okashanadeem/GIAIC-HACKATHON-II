# Phase 1: In-Memory Python Console App

This directory contains the first phase of the "Evolution of Todo" hackathon project. It is a simple, in-memory, command-line Todo application written in Python.

## Setup

This project uses `uv` for package management. To set up the environment, follow these steps:

1.  **Install `uv`:**
    If you don't have `uv` installed, you can install it with:
    ```bash
    pip install uv
    ```

2.  **Create and sync the virtual environment:**
    Navigate to this directory (`/Phase-1`) in your terminal and run:
    ```bash
    uv sync
    ```
    This will create a virtual environment and install any dependencies listed in `pyproject.toml`.

## Usage

To run the application, execute the `main.py` script from within the `src` directory:

```bash
python src/main.py
```

You will be presented with a menu of options to manage your to-do list:

```
--- To-Do List Menu ---
1. Add Task
2. View Tasks
3. Update Task
4. Delete Task
5. Mark Task as Complete
6. Exit
-----------------------
```

Follow the on-screen prompts to interact with the application. Since the application is in-memory, all tasks will be lost when you exit the program.
