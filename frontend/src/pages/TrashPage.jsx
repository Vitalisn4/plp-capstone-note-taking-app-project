import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Loader2, Trash2 as TrashIcon } from "lucide-react";
import TrashedNoteCard from "../components/TrashedNoteCard";
import ConfirmationModal from "../components/ui/ConfirmationModal";

const TrashPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const fetchTrashedNotes = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/notes/trash");
      setNotes(data);
    } catch (error) {
      toast.error("Failed to fetch trashed notes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrashedNotes();
  }, [fetchTrashedNotes]);

  const handleRestore = async (id) => {
    setNotes(notes.filter((n) => n._id !== id));
    try {
      await api.put(`/notes/${id}/restore`);
      toast.success("Note restored successfully!");
    } catch (error) {
      toast.error("Could not restore note.");
      fetchTrashedNotes();
    }
  };

  const openDeleteModal = (id) => {
    setNoteToDelete(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setNoteToDelete(null);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!noteToDelete) return;

    const id = noteToDelete;
    closeDeleteModal();
    setNotes(notes.filter((n) => n._id !== id));

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note permanently deleted.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete note.");
      fetchTrashedNotes();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Note Permanently?"
      >
        Are you sure you want to delete this note? This action cannot be undone.
      </ConfirmationModal>

      <div className="animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <TrashIcon size={32} />
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
                onDelete={openDeleteModal}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TrashPage;
