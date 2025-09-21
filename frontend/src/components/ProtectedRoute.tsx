import { useContext, useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // ensures context has been initialized
  }, []);

  if (loading) return <div>Loading...</div>;
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

