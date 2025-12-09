const API_URL = "http://localhost:8000/api";

type Task = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
};

export const getTasks = async (token: string): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
};

export const addTask = async (token: string, title: string, description: string): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description }),
  });
  if (!response.ok) {
    throw new Error("Failed to add task");
  }
  return response.json();
};

export const updateTask = async (token: string, id: number, task: Partial<Task>): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  return response.json();
};

export const deleteTask = async (token: string, id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
};

export const loginUser = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username,
            password,
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to login");
    }
    const data = await response.json();
    return data.access_token;
};

export const signupUser = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to signup");
    }
    return response.json();
};

