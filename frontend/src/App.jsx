import { Routes, Route, Navigate } from "react-router";
import useAuthStore from "./store/authStore";

// --- Page & Component Imports ---
// We import the new pages and layouts for our full application.
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout"; // The new main layout for the app
import HomePage from "./pages/HomePage"; // Our main notes dashboard
import TrashPage from "./pages/TrashPage"; // The new page for trashed notes
// We will create these pages in the next steps
// import CreatePage from './pages/CreatePage';
// import NoteDetailPage from './pages/NoteDetailPage';

/**
 * A helper component to manage public routes.
 * If the user is already authenticated, it redirects them from public pages
 * to their main application dashboard at "/app".
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
        Assuming <BrowserRouter> and <Toaster> are now in main.jsx
        as per your previous file's comments.
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
        {/* The ProtectedRoute component wraps the entire authenticated experience. */}
        <Route element={<ProtectedRoute />}>
          {/* All routes nested under '/app' will share the MainLayout. */}
          <Route path="/app" element={<MainLayout />}>
            {/* The 'index' route renders HomePage at the '/app' path. */}
            <Route index element={<HomePage />} />

            {/* The 'trash' route renders TrashPage at '/app/trash'. */}
            <Route path="trash" element={<TrashPage />} />

            {/* Future app routes will be nested here similarly. */}
            {/* <Route path="create" element={<CreatePage />} /> */}
            {/* <Route path="note/:id" element={<NoteDetailPage />} /> */}
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
