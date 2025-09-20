import { Link } from "react-router-dom";

const AddTask = () => {
  return (
    <div className="app-container">
      <div className="main-content">
        <div>
          <Link to="/" className="back-link">
            &larr; Back to Home
          </Link>
          <h2 className="app-title">Add New Task</h2>
        </div>
        <form className="task-form">
          <div className="form-group">
            <label htmlFor="taskName" className="form-label">
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              name="name"
              className="form-input"
              placeholder="Enter task name..."
              required
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
              placeholder="Enter task description..."
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary">
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
