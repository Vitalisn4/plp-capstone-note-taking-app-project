import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteForm from "../components/NoteForm";
import NoteView from "../components/NoteView";
import { Loader2 } from "lucide-react";

const NoteDetailPage = () => {
  const [noteData, setNoteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchNote = useCallback(async () => {
    try {
      const { data } = await api.get(`/notes/${id}`);
      setNoteData(data);
    } catch (error) {
      // --- FIX: USE THE ERROR VARIABLE ---
      console.error("Error fetching note details:", error);
      toast.error("Could not fetch note details.");
      navigate("/app");
    } finally {
      setIsFetching(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/notes/${id}`, noteData);
      toast.success("Note updated successfully!");
      setIsEditing(false);
      fetchNote();
    } catch (error) {
      // --- FIX: USE THE ERROR VARIABLE ---
      console.error("Error updating note:", error);
      toast.error("Failed to update note.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    fetchNote();
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {noteData &&
        (isEditing ? (
          <NoteForm
            noteData={noteData}
            setNoteData={setNoteData}
            handleSubmit={handleSubmit}
            loading={loading}
            isUpdate={true}
            onCancel={handleCancelEdit}
            onNoteUpdate={fetchNote}
          />
        ) : (
          <NoteView note={noteData} onEditClick={() => setIsEditing(true)} />
        ))}
    </div>
  );
};

export default NoteDetailPage;


