import { Navigate, Outlet } from "react-router";
import useAuthStore from "../store/authStore";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  // If the user is authenticated, render the nested routes (the app).
  // Otherwise, redirect them to the landing page.
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
