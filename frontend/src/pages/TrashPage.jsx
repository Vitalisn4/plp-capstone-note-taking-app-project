import { useState, useEffect, useCallback } from "react"; // Import useCallback
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Loader2, Trash2 } from "lucide-react";
import TrashedNoteCard from "../components/TrashedNoteCard";

const TrashPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Fetching Logic ---
  // We wrap fetchTrashedNotes in useCallback to stabilize the function reference.
  const fetchTrashedNotes = useCallback(async () => {
    // We can remove the `if (!loading)` check here as it's handled by the initial state
    setLoading(true);
    try {
      const { data } = await api.get("/notes/trash");
      setNotes(data);
    } catch (error) {
      console.error("Error fetching trashed notes:", error);
      toast.error("Failed to fetch trashed notes.");
    } finally {
      setLoading(false);
    }
  }, []); // The function itself has no dependencies, so the array is empty.

  // Now we can safely add fetchTrashedNotes to the dependency array.
  useEffect(() => {
    fetchTrashedNotes();
  }, [fetchTrashedNotes]);

  // --- Handler for Restoring a Note ---
  const handleRestore = async (id) => {
    setNotes(notes.filter((n) => n._id !== id));
    try {
      await api.put(`/notes/${id}/restore`);
      toast.success("Note restored successfully!");
    } catch (error) {
      console.error("Error restoring note:", error);
      toast.error("Could not restore note.");
      fetchTrashedNotes(); // Re-fetch on error to sync state
    }
  };

  // --- Handler for Permanently Deleting a Note ---
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this note permanently? This action cannot be undone."
      )
    ) {
      setNotes(notes.filter((n) => n._id !== id));
      try {
        await api.delete(`/notes/${id}`);
        toast.success("Note permanently deleted.");
      } catch (error) {
        console.error("Error deleting note:", error);
        toast.error(error.response?.data?.message || "Could not delete note.");
        fetchTrashedNotes(); // Re-fetch on error to sync state
      }
    }
  };

  // --- Render Logic ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Trash2 size={32} />
        <h1 className="text-3xl font-bold">Trash</h1>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">Your trash bin is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {notes.map((note) => (
            <TrashedNoteCard
              key={note._id}
              note={note}
              onRestore={handleRestore}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrashPage;
