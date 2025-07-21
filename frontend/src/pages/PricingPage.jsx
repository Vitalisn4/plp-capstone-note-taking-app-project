import { Link } from "react-router";
import { Check, X, Star, ArrowLeft } from "lucide-react";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

// Reusable component for feature list items
const Feature = ({ children, included = true }) => (
  <li className="flex items-center space-x-3">
    {included ? (
      <Check className="flex-shrink-0 w-5 h-5 text-green-500" />
    ) : (
      <X className="flex-shrink-0 w-5 h-5 text-red-500" />
    )}
    <span className={included ? "text-gray-200" : "text-gray-500 line-through"}>
      {children}
    </span>
  </li>
);

const PricingPage = () => {
  const { user } = useAuthStore();
  const isPremium = user?.subscription?.tier === "premium";

  // Placeholder function for handling the upgrade process
  const handleUpgradeClick = () => {
    toast.success(
      "Payment integration is coming soon! Thank you for your interest."
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fade-in">
      {/* --- NEW: BACK BUTTON --- */}
      <div className="mb-8">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to All Notes</span>
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-center text-white mb-4">
        Unlock Your Full Potential
      </h1>
      <p className="text-lg text-center text-gray-400 mb-12">
        Choose the plan that's right for you and supercharge your productivity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Free Plan Card */}
        <div className="flex flex-col p-8 bg-gray-800 rounded-2xl border border-gray-700">
          <h3 className="text-2xl font-semibold text-white">Free</h3>
          <p className="mt-2 text-gray-400">For casual note-takers</p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-white">$0</span>
            <span className="text-lg font-medium text-gray-400">/month</span>
          </div>
          <ul className="mt-8 space-y-4 flex-grow">
            <Feature>Basic note functions (CRUD)</Feature>
            <Feature>Full-text search & tagging</Feature>
            <Feature>Standard device sync</Feature>
            <Feature included={false}>File Attachments</Feature>
            <Feature included={false}>Secure Note Sharing</Feature>
            <Feature included={false}>Priority Support</Feature>
          </ul>
          <button
            disabled
            className="w-full mt-8 py-3 px-6 text-center font-semibold rounded-lg bg-gray-700 text-gray-400 cursor-not-allowed"
          >
            Your Current Plan
          </button>
        </div>

        {/* Premium Plan Card */}
        <div className="relative flex flex-col p-8 bg-blue-600 rounded-2xl border-2 border-blue-400 shadow-2xl shadow-blue-500/20">
          <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center px-4 py-1 text-sm font-semibold tracking-wider text-white bg-blue-500 rounded-full">
              <Star className="w-4 h-4 mr-2" />
              MOST POPULAR
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-white">NexusNotes Pro</h3>
          <p className="mt-2 text-blue-200">For power users & professionals</p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-white">$4.99</span>
            <span className="text-lg font-medium text-blue-200">/month</span>
          </div>
          <ul className="mt-8 space-y-4 flex-grow">
            <Feature>Everything in Free, plus:</Feature>
            <Feature>Unlimited notes & storage</Feature>
            <Feature>File Attachments (Images, PDFs, etc.)</Feature>
            <Feature>Secure Note Sharing</Feature>
            <Feature>Advanced search & organization</Feature>
            <Feature>Priority support</Feature>
          </ul>
          {isPremium ? (
            <button
              disabled
              className="w-full mt-8 py-3 px-6 text-center font-semibold rounded-lg bg-white text-blue-600 cursor-not-allowed"
            >
              You are a Pro Member!
            </button>
          ) : (
            <button
              onClick={handleUpgradeClick}
              className="w-full mt-8 py-3 px-6 text-center font-semibold rounded-lg bg-white text-blue-600 hover:bg-blue-100 transition-transform transform hover:scale-105"
            >
              Upgrade Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
