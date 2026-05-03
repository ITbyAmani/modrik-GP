import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function RequireStudent() {
  const { role } = useAuth();
  if (role !== "student") {
    return <Navigate to="/student/login" replace />;
  }
  return <Outlet />;
}
