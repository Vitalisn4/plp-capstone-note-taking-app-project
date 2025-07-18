import { Link, NavLink, useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import {
  BrainCircuit,
  NotebookText,
  Trash2,
  LogOut,
  HelpCircle,
} from "lucide-react";

const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-4 py-3 space-x-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-blue-600 text-white font-semibold"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  // --- NEW: Conditional render to prevent crash ---
  // The Sidebar will now show a simple loading state for the user info
  // until the user object is fully loaded from the auth store.
  // This completely prevents the "user.name is undefined" error.
  const renderUserInfo = () => {
    if (!user) {
      // Return a placeholder or a skeleton loader while user is being hydrated
      return (
        <div className="flex items-center space-x-3 px-4 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-gray-700"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-700 rounded w-3/4"></div>
            <div className="h-2 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      );
    }

    // Once the user object is available, render the full info
    return (
      <div className="flex items-center space-x-3 px-4">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xl shrink-0">
          {/* We also add a check here just in case name is an empty string */}
          {user.name ? user.name.charAt(0).toUpperCase() : "?"}
        </div>
        <div className="overflow-hidden">
          <p className="font-semibold text-white truncate">{user.name}</p>
          <p className="text-xs text-gray-400 truncate">{user.email}</p>
        </div>
      </div>
    );
  };

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col bg-gray-800 text-white p-4">
      <Link
        to="/app"
        className="flex items-center space-x-2 mb-10 px-2 text-white"
      >
        <BrainCircuit className="h-8 w-8 text-blue-400" />
        <span className="text-2xl font-bold">NexusNotes</span>
      </Link>

      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <NavLink to="/app" end className={navLinkClasses}>
              <NotebookText />
              <span>All Notes</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/app/trash" className={navLinkClasses}>
              <Trash2 />
              <span>Trash</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="border-t border-gray-700 pt-4 space-y-4">
        <Link
          to="/app/help"
          className="flex items-center px-4 py-2 space-x-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <HelpCircle size={20} />
          <span>Help & Support</span>
        </Link>

        {renderUserInfo()}

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center mt-4 space-x-2 py-2 rounded-lg text-gray-300 bg-gray-700/50 hover:bg-red-500 hover:text-white transition-colors duration-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
