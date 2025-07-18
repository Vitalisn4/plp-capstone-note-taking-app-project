import { Routes, Route, Navigate } from "react-router"; // CORRECTED: Import from 'react-router-dom'
import useAuthStore from "./store/authStore";

// Page & Component Imports
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";

/**
 * A helper component to manage public routes.
 * If the user is already authenticated, it redirects them from public pages
 * (like Login or Landing) to their main application dashboard.
 */
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/app" replace /> : children;
};

const App = () => {
  return (
    // This main div wrapper remains to keep your app's background style.
    <div className="relative h-full min-h-screen w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

      {/* 
        REMOVED: <BrowserRouter> and <Toaster> have been moved to main.jsx 
        to act as top-level providers for the entire application.
        This fixes the nested router error and follows best practices.
      */}

      <Routes>
        {/* --- Public Routes --- */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* --- Protected Routes --- */}
        <Route path="/app" element={<ProtectedRoute />}>
          <Route index element={<DashboardPage />} />
          {/* Future app routes will be nested here */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
