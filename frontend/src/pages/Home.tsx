import { useState, useEffect } from "react";
import { Link } from "react-router";
import api from "../services/api";

// Types
interface Task {
  _id: string;
  name: string;
  description: string;
  status: "completed" | "incomplete";
  createdAt: string;
  updatedAt: string;
}

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks"); // GET /api/tasks
        setTasks(res.data.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "incomplete" : "completed",
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <div className="app-container">
      <div className="main-content">
        {/* Header */}
        <header className="app-header">
          <h1 className="app-title">Wafer Todo</h1>
          <p className="app-subtitle">
            Organize your tasks efficiently and boost your productivity
          </p>
        </header>

        {/* Add new task button */}
        <div className="add-task mb-6">
          <Link to="/add-task" className="add-task-btn">
            + Add New Task
          </Link>
        </div>

        {/* Tasks Section */}
        <section className="tasks-section">
          {loading ? (
            <div className="text-center">
              <div className="loading-spinner"></div>
              <p style={{ color: "white", marginTop: "1rem" }}>
                Loading tasks...
              </p>
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
                  <div
                    key={task._id}
                    className={`task-card ${
                      task.status === "completed" ? "completed" : ""
                    }`}
                  >
                    <div className="task-header">
                      <h3 className="task-title">{task.name}</h3>
                      <span className={`task-status ${task.status}`}>
                        {task.status}
                      </span>
                    </div>

                    <p className="task-description">{task.description}</p>

                    <div className="task-meta">
                      <span>Created: {formatDate(task.createdAt)}</span>
                      {task.updatedAt !== task.createdAt && (
                        <span>Updated: {formatDate(task.updatedAt)}</span>
                      )}
                    </div>

                    <div className="task-actions">
                      <button
                        onClick={() => toggleTaskStatus(task._id)}
                        className={`btn btn-small ${
                          task.status === "completed"
                            ? "btn-secondary"
                            : "btn-success"
                        }`}
                      >
                        {task.status === "completed"
                          ? "Mark Incomplete"
                          : "Mark Complete"}
                      </button>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="btn btn-small btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
