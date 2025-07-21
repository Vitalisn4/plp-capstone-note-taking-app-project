import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Loader2 } from "lucide-react";
import useAuthStore from "../store/authStore";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useDebounce } from "../hooks/useDebounce";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import ShareModal from "../components/ui/ShareModal";

const HomePage = () => {
  const { user } = useAuthStore();
  const isPremium = user?.subscription?.tier === "premium";
  const navigate = useNavigate();

  const MotionDiv = motion.div;

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareableLink, setShareableLink] = useState("");

  const fetchNotes = useCallback(async (search = "") => {
    setLoading(true);
    try {
      const endpoint = search ? `/notes/search?q=${search}` : "/notes";
      const { data } = await api.get(endpoint);
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error(error.response?.data?.message || "Failed to fetch notes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchNotes]);

  const handleTrashNote = async (id) => {
    const originalNotes = [...notes];
    setNotes(originalNotes.filter((n) => n._id !== id));
    try {
      await api.put(`/notes/${id}/trash`);
      toast.success("Note moved to trash.");
    } catch (error) {
      console.error("Error moving note to trash:", error);
      toast.error("Failed to move note to trash.");
      setNotes(originalNotes);
    }
  };

  const handleShareNote = async (id) => {
    if (!isPremium) {
      navigate("/app/pricing");
      toast("Upgrade to Premium to share notes.", { icon: "⭐" });
      return;
    }
    try {
      const { data } = await api.post(`/notes/${id}/share`);
      setShareableLink(data.shareableLink);
      setIsShareModalOpen(true);
    } catch (error) {
      console.error("Error generating share link:", error);
      toast.error("Could not generate share link.");
    }
  };

  return (
    <>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareableLink={shareableLink}
      />

      <div>
        <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">All Notes</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <Link
              to="/app/create"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shrink-0"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Create Note</span>
            </Link>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {loading ? (
            <MotionDiv
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center items-center h-64"
            >
              <Loader2 className="animate-spin text-blue-500" size={48} />
            </MotionDiv>
          ) : (
            <MotionDiv
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {notes.length === 0 ? (
                <NotesNotFound />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {notes.map((note) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      onTrash={handleTrashNote}
                      onShare={handleShareNote}
                      isPremium={isPremium}
                    />
                  ))}
                </div>
              )}
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default HomePage;
