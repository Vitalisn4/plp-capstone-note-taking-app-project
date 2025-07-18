import { Pin, PinOff } from "lucide-react";
import { useNavigate } from "react-router"; // Import useNavigate
import TagInput from "./ui/TagInput";

const NoteForm = ({
  noteData,
  setNoteData,
  handleSubmit,
  loading,
  isUpdate = false,
}) => {
  const navigate = useNavigate(); // Initialize the hook

  const handleChange = (e) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (newTags) => {
    setNoteData({ ...noteData, tags: newTags });
  };

  const togglePin = () => {
    setNoteData({ ...noteData, isPinned: !noteData.isPinned });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        name="title"
        placeholder="Note Title"
        required
        value={noteData.title}
        onChange={handleChange}
        className="w-full text-3xl font-bold bg-transparent border-b-2 border-gray-700 focus:border-blue-500 focus:outline-none py-2 text-white"
      />
      <textarea
        name="content"
        placeholder="Start writing..."
        required
        value={noteData.content}
        onChange={handleChange}
        className="w-full h-96 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-400">
          Tags
        </label>
        <TagInput tags={noteData.tags} setTags={handleTagsChange} />
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={togglePin}
          className="flex items-center gap-2 px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {noteData.isPinned ? <PinOff size={18} /> : <Pin size={18} />}
          <span>{noteData.isPinned ? "Unpin Note" : "Pin Note"}</span>
        </button>

        {/* --- THE FIX IS HERE --- */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/app")} // Navigate back to the main dashboard
            className="px-6 py-3 font-bold text-gray-300 bg-transparent rounded-lg hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading
              ? isUpdate
                ? "Saving..."
                : "Creating..."
              : isUpdate
              ? "Save Changes"
              : "Create Note"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default NoteForm;
