import type { Task } from "../types/types";
import { formatDate } from "../utils/utils";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onView?: (id: string) => void;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TaskCardActions = ({ task, onEdit, onView, onToggle, onDelete }: TaskCardProps) => {
  return (
    <div
      className={`task-card ${task.status === "completed" ? "completed" : ""}`}
    >
      <div className="task-header">
        <h3 className="task-title">{task.name}</h3>
        <span className={`task-status ${task.status}`}>{task.status}</span>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-meta">
        <span>Created: {formatDate(task.createdAt)}</span>
        {task.updatedAt !== task.createdAt && (
          <span>Updated: {formatDate(task.updatedAt)}</span>
        )}
      </div>

      <div className="task-actions">
        {onEdit && (
          <button onClick={() => onEdit(task)} className="btn btn-primary">
            Edit
          </button>
        )}
        {onView && (
          <button onClick={() => onView(task._id)} className="btn btn-primary">
            View
          </button>
        )}
        {onToggle && (
          <button
            onClick={() => onToggle(task._id)}
            className={`btn btn-small ${
              task.status === "completed" ? "btn-secondary" : "btn-success"
            }`}
          >
            {task.status === "completed" ? "Mark Incomplete" : "Mark Complete"}
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(task._id)}
            className="btn btn-small btn-danger"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCardActions;
