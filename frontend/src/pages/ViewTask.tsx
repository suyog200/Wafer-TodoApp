import { useState, useEffect } from "react";
import { useParams } from "react-router";
import api from "../services/api";
import toast from "react-hot-toast";
import Header from "../components/Header";
import TaskCardActions from "../components/TaskCardActions";

interface Task {
  _id: string;
  name: string;
  description: string;
  status: "completed" | "incomplete";
  createdAt: string;
  updatedAt: string;
}

const ViewTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get(`/tasks/${id}`); // GET /api/tasks/:id
        setTasks([res.data.data]);
      } catch (error) {
        console.error("Error fetching tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const toggleTaskStatus = async (taskId: string) => {
  try {
    const task = tasks.find((t) => t._id === taskId);
    if (!task) return;

    const newStatus = task.status === "completed" ? "incomplete" : "completed";
    const response = await api.patch(`/tasks/${taskId}`, {
      status: newStatus,
    });

    // updting the ui after response
    setTasks((prev) =>
      prev.map((t) =>
        t._id === taskId
          ? { ...t, status: newStatus, updatedAt: new Date().toISOString() }
          : t
      )
    );

    toast.success(response.data.message || `Task marked ${newStatus}`);
  } catch (error) {
    console.error("Error toggling task status:", error);
    toast.error("Failed to update task status");
  }
};

  const deleteTask = async (taskId: string) => {
    try {
        const response = await api.delete(`/tasks/${taskId}`);
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
        toast.success(response.data.message);
    } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task.");
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        {/* Header */}
        <Header />
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
            <div>
              {tasks.map((task) => (
                <TaskCardActions
                  key={task._id}
                  task={task}
                  onToggle={toggleTaskStatus}
                  onDelete={deleteTask}
                />
              ))}
            </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default ViewTask;

