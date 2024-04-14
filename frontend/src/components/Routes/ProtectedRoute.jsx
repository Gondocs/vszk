import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Auth/Auth";
import InsufficentPermissions from "../PageNotFound/InsufficentPermissions";
import { Navbar } from "../Navbar/Navbar";

export const ProtectedRoute = ({ rolesAllowed, ...props }) => {
  const { token, role } = useAuth();

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/belepes" />;
  }

  // Check if the user's role allows access to the route
  if (!rolesAllowed.includes(role)) {
    // If role not allowed, redirect to a page indicating insufficient permissions
    return <> <Navbar/> <InsufficentPermissions/> </>;
  }

  // If authenticated and role allowed, render the child routes
  return <Outlet {...props} />;
};
