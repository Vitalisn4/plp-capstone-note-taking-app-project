import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import api from "../lib/axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      return toast.error("Password must be at least 8 characters long.");
    }
    setLoading(true);
    try {
      const { data } = await api.post("/users/register", formData);
      login(data);
      toast.success("Registration successful!");
      navigate("/app"); // Redirect to the main app dashboard
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Create your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password (min. 8 characters)"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
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
