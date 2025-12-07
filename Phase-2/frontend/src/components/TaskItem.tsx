"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateTask, deleteTask } from "@/lib/api";

// Define a type for the task for type-safety
type Task = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
};

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }: { task: Task, onTaskUpdated: (task: Task) => void, onTaskDeleted: (id: number) => void }) => {
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleUpdate = async () => {
    if (token) {
      const updatedTask = await updateTask(token, task.id, { title, description });
      onTaskUpdated(updatedTask);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (token) {
      await deleteTask(token, task.id);
      onTaskDeleted(task.id);
    }
  };

  const handleComplete = async () => {
    if (token) {
      const updatedTask = await updateTask(token, task.id, { completed: true });
      onTaskUpdated(updatedTask);
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg transition-colors ${task.completed ? 'bg-emerald-100 dark:bg-emerald-900' : 'bg-white dark:bg-gray-800'}`}>
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          <textarea
            value={description || ''}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          <div className="flex justify-end space-x-2">
            <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <h3 className={`text-lg font-bold text-gray-800 dark:text-white ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
            <p className={`text-gray-600 dark:text-gray-400 ${task.completed ? 'line-through' : ''}`}>{task.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => setIsEditing(true)} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
            </button>
            <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
              </svg>
            </button>
            {!task.completed && (
              <button onClick={handleComplete} className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
