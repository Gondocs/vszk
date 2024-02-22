import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Auth";

export const ProtectedRoute = () => {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to="/bejelentkezes" />;
    }

    return <Outlet />;
};