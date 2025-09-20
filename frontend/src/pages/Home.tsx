import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AddTaskbtn from "../components/AddTaskbtn";
import Card from "../components/Card";
import type { Task } from "../types/types";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  return (
    <div className="app-container">
      <div className="main-content">
        {/* Header */}
        <Header />

        {/* Add new task button */}
        <AddTaskbtn />

        {/* Tasks Section */}
        <Card
          tasks={tasks}
          loading={loading}
          completedTasks={completedTasks}
          navigate={navigate}
        />
      </div>
    </div>
  );
};

export default Home;
