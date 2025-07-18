import { Link } from "react-router";
import {
  BrainCircuit,
  Search,
  Tag,
  Share2,
  UploadCloud,
  Lock,
} from "lucide-react";

// A reusable component for feature cards
const FeatureCard = ({ icon, title, children }) => (
  <div className="flex flex-col items-center p-6 text-center bg-gray-800 rounded-lg">
    <div className="flex items-center justify-center w-16 h-16 mb-4 text-blue-400 bg-gray-700 rounded-full">
      {icon}
    </div>
    <h3 className="mb-2 text-xl font-bold">{title}</h3>
    <p className="text-gray-400">{children}</p>
  </div>
);

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="py-4 px-6 md:px-12">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">NexusNotes</span>
          </div>
          <div>
            <Link
              to="/login"
              className="px-4 py-2 text-base font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700"
            >
              Log In
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Hero Section */}
      <main className="flex-grow flex items-center">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Your Second Brain, Reimagined.
          </h1>
          <p className="mt-4 max-w-lg mx-auto text-lg text-gray-300 sm:text-xl md:mt-5 md:max-w-3xl">
            Effortlessly capture, intelligently organize, and instantly
            rediscover your thoughts with NexusNotes.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">
            A Note-Taking Experience Like No Other
          </h2>
          <p className="mt-4 text-center text-gray-400 max-w-2xl mx-auto">
            NexusNotes is built with powerful features that help you think
            better.
          </p>
          <div className="grid gap-8 mt-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={<Search size={28} />} title="Intelligent Search">
              Find any note, in any folder, instantly. Our powerful full-text
              search understands what you're looking for.
            </FeatureCard>
            <FeatureCard icon={<Tag size={28} />} title="Flexible Tagging">
              Break free from rigid folders. Organize your notes with multiple
              tags to create a connected web of knowledge.
            </FeatureCard>
            <FeatureCard icon={<Share2 size={28} />} title="Seamless Sharing">
              Share your insights with the world. Generate secure, public links
              for individual notes with a single click.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Premium Teaser Section */}
      <section id="premium" className="py-20 bg-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-center">
            Go Beyond with Premium
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            <div className="flex items-center space-x-3 text-lg">
              <UploadCloud className="text-blue-400" />
              <span>File Attachments</span>
            </div>
            <div className="flex items-center space-x-3 text-lg">
              <Lock className="text-blue-400" />
              <span>End-to-End Encryption (Coming Soon)</span>
            </div>
          </div>
          <p className="mt-8 text-gray-400">
            Upgrade to unlock powerful features designed for professionals and
            power users.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
