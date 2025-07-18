import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { Plus, Search, Loader2 } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useDebounce } from "../hooks/useDebounce"; // This import will now work
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

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

  return (
    <div className="animate-fade-in">
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

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-blue-500" size={48} />
        </div>
      ) : notes.length === 0 ? (
        <NotesNotFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} onTrash={handleTrashNote} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
