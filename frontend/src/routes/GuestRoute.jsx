import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return !user ? children : <Navigate to="/dashboard" />;
};

export default GuestRoute;