import TaskItem from "./TaskItem";
import { Task } from "../app/types/Task";

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskUpdated,
  onTaskDeleted,
}) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onTaskUpdated={onTaskUpdated}
          onTaskDeleted={onTaskDeleted}
        />
      ))}
    </div>
  );
};

export default TaskList;
