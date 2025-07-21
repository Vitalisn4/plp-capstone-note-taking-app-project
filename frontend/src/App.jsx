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

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/app" replace /> : children;
};

const App = () => {
  return (
    // This wrapper div provides the global background styling.
    <div className="relative h-full min-h-screen w-full">
      {/* --- NEW, MORE ACCURATE BACKGROUND --- */}
      {/* This creates the solid, very dark navy background */}
      <div className="fixed inset-0 bg-[#111827] -z-20" />
      {/* This creates the subtle green glow from the bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-emerald-900/30 to-transparent -z-10" />

      {/* Assuming main.jsx has BrowserRouter. */}
      <>
        <Toaster position="top-center" reverseOrder={false} />

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
          <Route path="/app" element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="trash" element={<TrashPage />} />
              <Route path="create" element={<CreatePage />} />
              <Route path="note/:id" element={<NoteDetailPage />} />
              <Route path="pricing" element={<PricingPage />} />
            </Route>
          </Route>
        </Routes>
      </>
    </div>
  );
};

export default App;
