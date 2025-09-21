import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { validateForm } from "../utils/validate";

const AddTask = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data
    if (!validateForm(formData)) return;

    try {
      const res = await api.post("/tasks", formData);
      setFormData({ name: "", description: "" });
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Failed to add task.");
    }
  };

  const handleClear = () => {
    setFormData({ name: "", description: "" });
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div>
          <Link to="/" className="back-link">
            &larr; Back to Home
          </Link>
          <h2 className="app-title">Add New Task</h2>
        </div>
        <form className="task-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="taskName" className="form-label">
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="form-input"
              placeholder="Enter task name..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="taskDescription" className="form-label">
              Description
            </label>
            <textarea
              id="taskDescription"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter task description..."
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
