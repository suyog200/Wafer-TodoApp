// src/pages/Login.tsx
import { useState, useContext } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { toast } from "react-hot-toast/headless";
import { validateLoginForm } from "../utils/validate";
import "../styles/formstyles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLoginForm({ email, password })) {
      return;
    }
    try {
      setIsLoading(true);
      const res = await api.post("/auth/login", { email, password });
      toast.success("Login successful!");
      login(res.data.token); 
      navigate("/");

    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="auth-container">
      <h1>Wafer Todo</h1>
      <p>Login</p>
      <form onSubmit={handleLogin}>
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
        <button type="submit">{isLoading ? "Logging in..." : "Login"}</button>
        <Link to="/register">Don't have an account? Register</Link>
      </form>
    </div>
  );
};

export default Login;
