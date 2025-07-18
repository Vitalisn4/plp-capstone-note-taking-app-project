import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteForm from "../components/NoteForm"; // We import our new reusable form
import { ArrowLeft, Loader2 } from "lucide-react";

const NoteDetailPage = () => {
  const [noteData, setNoteData] = useState(null);
  const [loading, setLoading] = useState(false); // For the save button
  const [isFetching, setIsFetching] = useState(true); // For the initial page load
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the specific note's data when the component mounts
  const fetchNote = useCallback(async () => {
    try {
      const { data } = await api.get(`/notes/${id}`);
      setNoteData(data);
    } catch (error) {
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

  // The submit handler for updating the note
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/notes/${id}`, noteData);
      toast.success("Note updated successfully!");
      navigate("/app");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note.");
    } finally {
      setLoading(false);
    }
  };

  // Show a loading spinner while the note data is being fetched
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center mb-8">
        <Link
          to="/app"
          className="flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft />
          Back to Notes
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-white">Edit Note</h1>
      {noteData && (
        <NoteForm
          noteData={noteData}
          setNoteData={setNoteData}
          handleSubmit={handleSubmit}
          loading={loading}
          isUpdate={true} // This tells the form to show "Save Changes"
        />
      )}
    </div>
  );
};

export default NoteDetailPage;
