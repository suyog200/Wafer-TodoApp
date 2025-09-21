import Select from "react-select";

interface AddTaskbtnProps {
  onFilterChange: (value: string) => void;
}

const AddTaskbtn = ({ onFilterChange }: AddTaskbtnProps) => {
  const options = [
    { value: "All", label: "All" },
    { value: "Completed", label: "Completed" },
    { value: "Incomplete", label: "Incomplete" },
  ];

  return (
    <div className="add-task-container">
      <div className="filter-section">
        <div>
          <p className="filter-font">Filter By</p>
        </div>
        <Select
          options={options}
          defaultValue={options[0]}
          onChange={(selected) => onFilterChange(selected?.value || "All")}
          styles={{
            container: (base) => ({ ...base, minWidth: 150 }),
          }}
        />
      </div>

      <div className="add-task">
        <a href="/add-task" className="add-task-btn">
          + Add New Task
        </a>
      </div>
    </div>
  );
};

export default AddTaskbtn;
