import type { Task } from "../types/types";
import TaskCardActions from "./TaskCardActions";

interface CardProps {
  tasks: Task[];
  loading: boolean;
  completedTasks: Task[];
  navigate: (path: string) => void;
}

const Card = ({ tasks, loading, completedTasks, navigate }: CardProps) => {
  return (
    <section className="tasks-section">
      {loading ? (
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p style={{ color: "white", marginTop: "1rem" }}>Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3 className="empty-state-title">No tasks yet</h3>
          <p className="empty-state-description">
            Create your first task to get started with your productivity
            journey!
          </p>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h2 className="section-title">
              Your Tasks ({tasks.length} total, {completedTasks.length}{" "}
              completed)
            </h2>
          </div>
          <div className="tasks-grid">
            {tasks.map((task) => (
              <TaskCardActions key={task._id} task={task} onView={() => navigate(`/view-tasks/${task._id}`)} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Card;
