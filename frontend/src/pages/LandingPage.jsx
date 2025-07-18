import { Link } from "react-router";
import { BrainCircuit } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center px-4">
          <BrainCircuit className="mx-auto h-24 w-24 text-blue-400" />
          <h1 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            NexusNotes
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-300 sm:text-xl md:mt-5 md:max-w-3xl">
            Your Second Brain, Reimagined. Effortlessly capture, organize, and
            rediscover your thoughts.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              Sign Up for Free
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-transform transform hover:scale-105"
            >
              Log In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
