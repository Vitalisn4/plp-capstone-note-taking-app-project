import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* The Outlet will render the specific page component (e.g., HomePage, TrashPage) */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
