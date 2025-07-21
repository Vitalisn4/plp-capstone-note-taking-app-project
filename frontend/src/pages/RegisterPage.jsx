import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Eye, EyeOff, BrainCircuit } from "lucide-react";
import useAuthStore from "../store/authStore";
import api from "../lib/axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const MotionDiv = motion.div;
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
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-2xl"
      >
        {/* --- THIS IS THE LINK BACK TO THE LANDING PAGE --- */}
        <Link
          to="/"
          className="flex flex-col items-center space-y-2 text-gray-800"
          title="Back to Home"
        >
          <BrainCircuit className="h-8 w-8 text-indigo-600" />
          <span className="text-2xl font-bold">NexusNotes</span>
        </Link>

        <h2 className="text-xl font-bold text-center text-gray-800">
          Create your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-100 text-slate-900 border-2 border-transparent rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-100 text-slate-900 border-2 border-transparent rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password (min. 8 characters)"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-100 text-slate-900 border-2 border-transparent rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-100 text-slate-900 border-2 border-transparent rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="h-4 w-4 text-indigo-500 rounded border-gray-300 focus:ring-indigo-400"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:underline"
              >
                Terms & Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !agreedToTerms}
            className="w-full px-4 py-3 font-bold text-white bg-indigo-400 rounded-lg hover:bg-indigo-500 disabled:opacity-50 transition-colors transform hover:scale-[1.02]"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:underline"
          >
            Log In
          </Link>
        </p>
      </MotionDiv>
    </div>
  );
};

export default RegisterPage;
