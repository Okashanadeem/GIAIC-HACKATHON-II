"use client";

import { useEffect, useState } from "react";
import AddTaskForm from "@/components/AddTaskForm";
import TaskList from "@/components/TaskList";
import { getTasks } from "@/lib/api";
import withAuth from "@/hoc/withAuth";
import { useAuth } from "@/context/AuthContext";

function Home() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) return;
      const fetchedTasks = await getTasks(token);
      setTasks(fetchedTasks);
      setLoading(false);
    };
    fetchTasks();
  }, [token]);

  const handleTaskAdded = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleTaskDeleted = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 space-y-10 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-900 tracking-tight">
        Todo App
      </h1>

      <div className="bg-white shadow rounded-xl p-6">
        <AddTaskForm onTaskAdded={handleTaskAdded} />
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        {loading ? (
          <p className="text-gray-500 text-center">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks yet. Add your first one!</p>
        ) : (
          <TaskList
            tasks={tasks}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
          />
        )}
      </div>
    </div>
  );
}

export default withAuth(Home);
