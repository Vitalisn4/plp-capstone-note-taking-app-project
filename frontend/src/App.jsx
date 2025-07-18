import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/authStore";

// --- Page & Component Imports ---
// We import the new pages for our authentication flow.
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
// We import a placeholder for the main application dashboard.
import DashboardPage from "./pages/DashboardPage";

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
    // We are keeping your original div wrapper to maintain the app's background style.
    <div className="relative h-full min-h-screen w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

      <BrowserRouter>
        {/* Toaster provides beautiful, non-blocking notifications throughout the app */}
        <Toaster position="top-center" reverseOrder={false} />

        <Routes>
          {/* --- Public Routes --- */}
          {/* These routes are accessible to everyone. If a logged-in user tries to access them, they are redirected to '/app'. */}
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
          {/* The <ProtectedRoute> component will check for authentication. */}
          {/* If the user is logged in, it will render the nested routes. */}
          {/* If not, it will redirect them to the landing page. */}
          <Route path="/app" element={<ProtectedRoute />}>
            {/* The 'index' route is the default component shown for '/app' */}
            <Route index element={<DashboardPage />} />

            {/* We will add more nested routes for our app here in the future */}
            {/* e.g., <Route path="create" element={<CreatePage />} /> */}
            {/* e.g., <Route path="note/:id" element={<NoteDetailPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
