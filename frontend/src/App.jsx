import { Routes, Route, Navigate } from "react-router-"; // Note: BrowserRouter is removed from this import
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

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/app" replace /> : children;
};

const App = () => {
  return (
    // The main container div for styling
    <div className="relative h-full min-h-screen w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

      {/* The Toaster for notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* 
        The <Routes> component can now exist on its own because the 
        <BrowserRouter> is provided by main.jsx.
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

        {/* --- Protected Application Routes --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="trash" element={<TrashPage />} />
            <Route path="create" element={<CreatePage />} />
            <Route path="note/:id" element={<NoteDetailPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
