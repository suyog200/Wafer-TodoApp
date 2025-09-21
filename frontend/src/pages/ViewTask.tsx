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
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "incomplete",
  });
  const { id } = useParams();

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

      const newStatus =
        task.status === "completed" ? "incomplete" : "completed";
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

  const startEditTask = (task: Task) => {
    setEditingTask(task);
    setFormData({
      name: task.name,
      description: task.description,
      status: task.status,
    });
  };

  const saveTaskEdit = async () => {
    if (!editingTask) return;
    try {
      const response = await api.put(`/tasks/edit/${editingTask._id}`, {
        name: formData.name,
        description: formData.description,
        status: formData.status,
      });

      setTasks((prev) =>
        prev.map((t) =>
          t._id === editingTask._id ? { ...t, ...response.data.data } : t
        )
      );

      toast.success(response.data.message || "Task updated successfully");
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task.");
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <Header />
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
              {editingTask ? (
                <div className="edit-task-form">
                  <h2>Edit Task</h2>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="input"
                  />
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="textarea"
                  />
                  <div className="status-group">
                    <label>Status:</label>
                    <div className="radio-options">
                      <label>
                        <input
                          type="radio"
                          name="status"
                          value="completed"
                          checked={formData.status === "completed"}
                          onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value })
                          }
                        />
                        Completed
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="status"
                          value="incomplete"
                          checked={formData.status === "incomplete"}
                          onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value })
                          }
                        />
                        Incomplete
                      </label>
                    </div>
                  </div>

                  <button onClick={saveTaskEdit} className="btn btn-primary">
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                tasks.map((task) => (
                  <TaskCardActions
                    key={task._id}
                    task={task}
                    onEdit={startEditTask}
                    onToggle={toggleTaskStatus}
                    onDelete={deleteTask}
                  />
                ))
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default ViewTask;
