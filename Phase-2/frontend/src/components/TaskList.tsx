import TaskItem from "./TaskItem";

// Define a type for the task for type-safety
type Task = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
};

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }: { tasks: Task[], onTaskUpdated: (task: Task) => void, onTaskDeleted: (id: number) => void }) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onTaskUpdated={onTaskUpdated} onTaskDeleted={onTaskDeleted} />
      ))}
    </div>
  );
};

export default TaskList;
