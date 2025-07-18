import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, BrainCircuit } from "lucide-react";
import useAuthStore from "../store/authStore";
import api from "../lib/axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  // State for form data, loading, and password visibility
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/users/login", formData);
      login(data);
      toast.success("Welcome back!");
      navigate("/app");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // We removed bg-gray-100 to inherit the global background from App.jsx
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        {/* --- NEW: Logo and link back to landing page --- */}
        <Link
          to="/"
          className="flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <BrainCircuit className="h-8 w-8" />
          <span className="text-2xl font-bold">NexusNotes</span>
        </Link>

        <h2 className="text-2xl font-bold text-center text-gray-900">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* --- NEW: Password input with visibility toggle --- */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
