"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { addTask } from "@/lib/api";
import { Task } from "../app/types/Task";

interface AddTaskFormProps {
  onTaskAdded: (task: Task) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onTaskAdded }) => {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const newTask: Task = await addTask(token, title, description);
    onTaskAdded(newTask);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Add a new task
        </h2>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
