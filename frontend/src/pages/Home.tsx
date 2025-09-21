import { useState, useEffect, useContext } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AddTaskbtn from "../components/AddTaskbtn";
import Card from "../components/Card";
import type { Task } from "../types/types";
import { AuthContext } from "../context/authContext";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

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

  const completedTasks = tasks.filter((task) => task.status === "completed");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.status === "completed";
    if (filter === "Incomplete") return task.status === "incomplete";
    return true; 
  });

  const searchAndFilterTasks = filteredTasks.filter((task) => {
    return task.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="logout-button">
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
        {/* Header */}
        <Header />

        {/* Add new task button */}
        <AddTaskbtn onFilterChange={setFilter} onSearchChange={setSearchTerm} />

        {/* Tasks Section */}
        <Card
          tasks={searchAndFilterTasks}
          loading={loading}
          completedTasks={completedTasks}
          navigate={navigate}
        />
      </div>
    </div>
  );
};

export default Home;
