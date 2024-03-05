import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Auth/Auth";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/belepes" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
