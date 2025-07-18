import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteForm from "../components/NoteForm"; // We import our new reusable form

const CreatePage = () => {
  // A single state object to hold all note data, matching the NoteForm's needs
  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
    tags: [],
    isPinned: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // The submit handler, passed as a prop to the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/notes", noteData); // Send the entire state object
      toast.success("Note created successfully!");
      navigate("/app"); // Navigate back to the main dashboard
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error(error.response?.data?.message || "Failed to create note.");
    } finally {
      setLoading(false);
    }
  };

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
      <h1 className="text-3xl font-bold mb-6 text-white">Create New Note</h1>
      <NoteForm
        noteData={noteData}
        setNoteData={setNoteData}
        handleSubmit={handleSubmit}
        loading={loading}
        // isUpdate prop is false by default
      />
    </div>
  );
};

export default CreatePage;
