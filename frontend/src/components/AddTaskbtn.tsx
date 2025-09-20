import { Link } from "react-router-dom";

const AddTaskbtn = () => {
  return (
    <div className="add-task mb-6">
      <Link to="/add-task" className="add-task-btn">
        + Add New Task
      </Link>
    </div>
  );
};

export default AddTaskbtn;
