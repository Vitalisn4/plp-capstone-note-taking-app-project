import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import AnimatedPage from "../components/ui/AnimatedPage"; // Import our new component

const MainLayout = () => {
  const location = useLocation(); // Get the current location for the key

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* AnimatePresence allows components to animate out when they are removed from the tree */}
        {/* The key is crucial: it tells AnimatePresence that the page has changed */}
        <AnimatePresence mode="wait">
          <AnimatedPage key={location.pathname}>
            <Outlet />
          </AnimatedPage>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default MainLayout;
