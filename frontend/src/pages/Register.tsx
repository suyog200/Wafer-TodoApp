// src/pages/Register.tsx
import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { validateRegisterForm } from "../utils/validate";
import "../styles/formstyles.css";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegisterForm({ name: username, email, password })) {
      return;
    }
    try {
      setIsLoading(true);
      await api.post("/auth/register", { username, email, password });
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1>Wafer Todo</h1>
      <p>Register</p>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLoading ? "Registering..." : "Register"}</button>
        <Link to="/login">Already have an account? Login</Link>
      </form>
    </div>
  );
};

export default Register;
