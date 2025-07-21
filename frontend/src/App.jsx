import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/authStore";

// --- Page & Component Imports ---
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import TrashPage from "./pages/TrashPage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import PublicNotePage from "./pages/PublicNotePage";
import PricingPage from "./pages/PricingPage"; 

/**
 * A helper component that prevents authenticated users from accessing
 * public-only pages like the landing and login pages.
 */
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/app" replace /> : children;
};

const App = () => {
  return (
    // This wrapper div provides the global background styling.
    <div className="relative h-full min-h-screen w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

      {/* Toaster for global notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* 
        The <Routes> component works here because <BrowserRouter> is its ancestor,
        correctly provided in main.jsx.
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
        <Route path="/share/:token" element={<PublicNotePage />} />

        {/* --- Protected Application Routes --- */}
        {/* The ProtectedRoute checks if a user is logged in. */}
        <Route path="/app" element={<ProtectedRoute />}>
          {/* If logged in, the MainLayout (with sidebar) is rendered. */}
          <Route element={<MainLayout />}>
            {/* The index route is the default page for "/app" */}
            <Route index element={<HomePage />} />
            <Route path="trash" element={<TrashPage />} />
            <Route path="create" element={<CreatePage />} />
            <Route path="note/:id" element={<NoteDetailPage />} />
            {/* --- ADDED THE NEW ROUTE FOR THE PRICING PAGE --- */}
            <Route path="pricing" element={<PricingPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
