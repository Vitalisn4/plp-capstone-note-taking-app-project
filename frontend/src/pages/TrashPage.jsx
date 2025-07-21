// import { useState, useEffect, useCallback } from "react";
// import api from "../lib/axios";
// import toast from "react-hot-toast";
// import { Loader2, Trash2 } from "lucide-react";
// import TrashedNoteCard from "../components/TrashedNoteCard";

// const TrashPage = () => {
//   const [notes, setNotes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTrashedNotes = useCallback(async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.get("/notes/trash");
//       setNotes(data);
//     } catch (error) {
//       // --- FIX: Log the actual error ---
//       console.error("Error fetching trashed notes:", error);
//       toast.error("Failed to fetch trashed notes.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTrashedNotes();
//   }, [fetchTrashedNotes]);

//   const handleRestore = async (id) => {
//     setNotes(notes.filter((n) => n._id !== id));
//     try {
//       await api.put(`/notes/${id}/restore`);
//       toast.success("Note restored successfully!");
//     } catch (error) {
//       // --- FIX: Log the actual error ---
//       console.error("Error restoring note:", error);
//       toast.error("Could not restore note.");
//       fetchTrashedNotes();
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure? This action cannot be undone.")) {
//       setNotes(notes.filter((n) => n._id !== id));
//       try {
//         await api.delete(`/notes/${id}`);
//         toast.success("Note permanently deleted.");
//       } catch (error) {
//         // Here we are already using 'error' for the toast, but adding a console.error is good practice.
//         console.error("Error deleting note:", error);
//         toast.error(error.response?.data?.message || "Could not delete note.");
//         fetchTrashedNotes();
//       }
//     }
//   };

//   const handleEmptyTrash = async () => {
//     if (notes.length === 0) return;
//     if (
//       window.confirm(
//         "Are you sure you want to empty the entire trash? This action cannot be undone."
//       )
//     ) {
//       const originalNotes = [...notes];
//       setNotes([]);
//       try {
//         await api.delete("/notes/trash/empty");
//         toast.success("Trash emptied successfully!");
//       } catch (error) {
//         // --- FIX: Log the actual error ---
//         console.error("Error emptying trash:", error);
//         toast.error("Failed to empty trash.");
//         setNotes(originalNotes);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-full">
//         <Loader2 className="animate-spin text-blue-500" size={48} />
//       </div>
//     );
//   }

//   return (
//     <div className="animate-fade-in">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-4">
//           <Trash2 size={32} />
//           <h1 className="text-3xl font-bold">Trash</h1>
//         </div>
//         {notes.length > 0 && (
//           <button
//             onClick={handleEmptyTrash}
//             className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//           >
//             Empty Trash
//           </button>
//         )}
//       </div>

//       {notes.length === 0 ? (
//         <div className="text-center py-20">
//           <p className="text-gray-400 text-lg">Your trash bin is empty.</p>
//         </div>
//       ) : (
//         <>
//           <p className="mb-6 text-gray-400">
//             Notes in the trash will be permanently deleted after 7 days.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {notes.map((note) => (
//               <TrashedNoteCard
//                 key={note._id}
//                 note={note}
//                 onRestore={handleRestore}
//                 onDelete={handleDelete}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default TrashPage;

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
