import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, BrainCircuit } from "lucide-react";
import useAuthStore from "../store/authStore";
import api from "../lib/axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  // State for form data, loading, and new UI features
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // --- NEW VALIDATION LOGIC ---
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    if (formData.password.length < 8) {
      return toast.error("Password must be at least 8 characters long.");
    }
    if (!agreedToTerms) {
      return toast.error("You must agree to the terms and conditions.");
    }

    setLoading(true);
    try {
      // We don't send confirmPassword to the backend
      const { name, email, password } = formData;
      const { data } = await api.post("/users/register", {
        name,
        email,
        password,
      });

      login(data);
      toast.success("Registration successful!");
      navigate("/app");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
          Create your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
              placeholder="Password (min. 8 characters)"
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

          {/* --- NEW: Confirm Password input --- */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* --- NEW: Terms and Conditions Checkbox --- */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="font-medium text-blue-600 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !agreedToTerms}
            className="w-full px-4 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
