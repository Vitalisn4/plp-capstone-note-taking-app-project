import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Search,
  Tag,
  Share2,
  Zap,
  Layers,
  ShieldCheck,
} from "lucide-react";

// A reusable, now animated component for feature cards
const FeatureCard = ({ icon, title, children }) => {
  // --- FIX: Create a capitalized alias for the motion component ---
  const MotionDiv = motion.div;

  return (
    <MotionDiv
      className="flex flex-col items-center p-8 text-center bg-gray-800 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center w-16 h-16 mb-6 text-blue-400 bg-gray-700 rounded-full">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-400">{children}</p>
    </MotionDiv>
  );
};

const LandingPage = () => {
  // --- FIX: Create capitalized aliases for all used motion components ---
  const MotionH1 = motion.h1;
  const MotionP = motion.p;
  const MotionDiv = motion.div;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Header */}
      <header className="py-4 px-6 md:px-12 absolute w-full z-10">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BrainCircuit className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">NexusNotes</span>
          </Link>
        </nav>
      </header>

      {/* Main Hero Section */}
      <main className="flex-grow flex items-center bg-grid-gray-700/[0.2]">
        <div className="container mx-auto px-6 py-32 text-center">
          <MotionH1
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Second Brain, Reimagined.
          </MotionH1>
          <MotionP
            className="mt-4 max-w-lg mx-auto text-lg text-gray-300 sm:text-xl md:mt-5 md:max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Effortlessly capture, intelligently organize, and instantly
            rediscover your thoughts with a note-taking app that values
            simplicity and speed.
          </MotionP>
          <MotionDiv
            className="mt-12 max-w-md mx-auto sm:flex sm:justify-center sm:space-x-4 space-y-4 sm:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
            >
              Get Started for Free
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 border border-gray-600 text-lg font-medium rounded-md text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            >
              Log In
            </Link>
          </MotionDiv>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">
            A Note-Taking Experience Like No Other
          </h2>
          <div className="grid gap-8 mt-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={<Search size={28} />} title="Intelligent Search">
              Find any note, instantly. Our powerful full-text search
              understands what you're looking for.
            </FeatureCard>
            <FeatureCard icon={<Tag size={28} />} title="Flexible Tagging">
              Break free from rigid folders. Organize notes with multiple tags
              to create a connected web of knowledge.
            </FeatureCard>
            <FeatureCard icon={<Share2 size={28} />} title="Seamless Sharing">
              Share your insights with the world. Generate secure, public links
              for individual notes with a single click.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section id="why" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose NexusNotes?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <MotionDiv
              className="bg-gray-800 p-8 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-red-400">
                The Problem: Note-Taking Chaos
              </h3>
              <p className="mt-4 text-gray-400">
                Today's note-taking apps are a source of frustration. They're
                bloated with features, inconsistent across devices, and raise
                security concerns. Users are overwhelmed and seek simplicity.
              </p>
            </MotionDiv>
            <MotionDiv
              className="bg-blue-600/20 border border-blue-500 p-8 rounded-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-blue-300">
                The Solution: Elegant Simplicity
              </h3>
              <p className="mt-4 text-gray-300">
                NexusNotes is the answer. We provide a streamlined, intuitive,
                and secure platform. Our responsive UI ensures a flawless
                experience, cutting through the noise so you can focus on what
                matters: your ideas.
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Competitive Edge Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-12 items-center">
          <FeatureCard icon={<Zap size={28} />} title="Simplicity & Focus">
            We do one thing perfectly. No bloat, no distractions. Just a clean,
            fast, and reliable platform for your thoughts.
          </FeatureCard>
          <FeatureCard
            icon={<Layers size={28} />}
            title="Modern & Scalable Tech"
          >
            Our MERN stack and REST API allow for rapid development and infinite
            scalability, leaving legacy competitors behind.
          </FeatureCard>
          <FeatureCard
            icon={<ShieldCheck size={28} />}
            title="Engineered for Reliability"
          >
            With features like Rate Limiting and secure authentication, we
            ensure a stable, safe experience for all users.
          </FeatureCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} NexusNotes. All rights reserved.</p>
          <p className="mt-2">Let's Build the Future of Note-Taking.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
