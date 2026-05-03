import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function RequireInstructor() {
  const { role } = useAuth();
  if (role !== "instructor") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
