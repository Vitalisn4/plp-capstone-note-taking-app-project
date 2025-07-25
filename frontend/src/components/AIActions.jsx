import { useState } from "react";
import { Sparkles, FileText, Wand2 } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const AIActions = ({ noteContent, onSummary, onTitle, isPremium }) => {
  const [loading, setLoading] = useState({ summary: false, title: false });

  const handleSummarize = async () => {
    if (!isPremium) {
      toast("Upgrade to Premium for AI summaries.", { icon: "⭐" });
      return;
    }
    if (!noteContent || noteContent.trim().length < 50) {
      return toast.error("Please add more content to generate a summary.");
    }

    setLoading((prev) => ({ ...prev, summary: true }));
    try {
      const { data } = await api.post("/ai/summarize", {
        content: noteContent,
      });
      onSummary(data.summary);
    } catch (error) {
      // --- FIX 1: USE THE ERROR VARIABLE ---
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary.");
    } finally {
      // Use a functional update to ensure we have the latest state
      setLoading((prev) => ({ ...prev, summary: false }));
    }
  };

  const handleSuggestTitle = async () => {
    if (!isPremium) {
      toast("Upgrade to Premium for AI titles.", { icon: "⭐" });
      return;
    }
    if (!noteContent || noteContent.trim().length < 20) {
      return toast.error("Please add more content to suggest a title.");
    }

    setLoading((prev) => ({ ...prev, title: true }));
    try {
      const { data } = await api.post("/ai/suggest-title", {
        content: noteContent,
      });
      onTitle(data.title);
    } catch (error) {
      // --- FIX 2: USE THE ERROR VARIABLE ---
      console.error("Error suggesting title:", error);
      toast.error("Failed to suggest a title.");
    } finally {
      // Use a functional update here as well
      setLoading((prev) => ({ ...prev, title: false }));
    }
  };

  const buttonClass =
    "flex items-center gap-2 px-3 py-2 text-sm text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

  return (
    <div className="p-3 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-2 text-blue-400">
        <Sparkles size={18} />
        <span className="font-semibold text-sm">AI Assistant</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleSummarize}
          disabled={!isPremium || loading.summary}
          className={buttonClass}
          title={isPremium ? "Generate summary" : "Available for Premium users"}
        >
          <FileText size={16} />{" "}
          {loading.summary ? "Summarizing..." : "Summarize"}
        </button>
        <button
          onClick={handleSuggestTitle}
          disabled={!isPremium || loading.title}
          className={buttonClass}
          title={isPremium ? "Suggest title" : "Available for Premium users"}
        >
          <Wand2 size={16} /> {loading.title ? "Thinking..." : "Suggest Title"}
        </button>
      </div>
    </div>
  );
};

export default AIActions;
