import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router";
import useAuthStore from "../store/authStore";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Pin, PinOff, UploadCloud, Paperclip, FileText } from "lucide-react";
import TagInput from "../components/ui/TagInput";

const CreatePage = () => {
  const { user } = useAuthStore();
  const isPremium = user?.subscription?.tier === "premium";

  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
    tags: [],
    isPinned: false,
    attachments: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const noteIdRef = useRef(null);

  const saveNoteAsDraft = useCallback(async () => {
    if (noteIdRef.current) {
      return noteIdRef.current;
    }

    if (!noteData.title && !noteData.content) {
      toast.error("Please add a title or content before attaching files.");
      return null;
    }

    setLoading(true);
    try {
      const { data: createdNote } = await api.post("/notes", {
        ...noteData,
        title: noteData.title || "Untitled Note",
      });
      noteIdRef.current = createdNote._id;
      setNoteData(createdNote);
      toast.success("Draft saved.");
      return createdNote._id;
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Failed to save draft.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [noteData]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!isPremium) {
        toast.error("Upgrade to Premium to add attachments.");
        return;
      }

      const currentNoteId = await saveNoteAsDraft();
      if (!currentNoteId) return;

      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("attachment", file);

      const uploadToast = toast.loading("Uploading file...");
      try {
        const { data: updatedAttachments } = await api.post(
          `/notes/${currentNoteId}/attachments`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("File uploaded successfully!", { id: uploadToast });
        setNoteData((prev) => ({ ...prev, attachments: updatedAttachments }));
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("File upload failed.", { id: uploadToast });
      }
    },
    [isPremium, saveNoteAsDraft]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    disabled: !isPremium,
  });

  const handleChange = (e) =>
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  const handleTagsChange = (newTags) =>
    setNoteData({ ...noteData, tags: newTags });
  const togglePin = () =>
    setNoteData({ ...noteData, isPinned: !noteData.isPinned });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!noteData.title && !noteData.content) {
      return toast.error("A note must have a title or content to be saved.");
    }
    setLoading(true);
    try {
      const endpoint = noteIdRef.current
        ? `/notes/${noteIdRef.current}`
        : "/notes";
      const method = noteIdRef.current ? "put" : "post";

      const { data: finalNote } = await api[method](endpoint, noteData);

      toast.success("Note saved successfully!");
      navigate(`/app/note/${finalNote._id}`);
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-white">Create New Note</h1>
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Note Title"
            value={noteData.title}
            onChange={handleChange}
            className="w-full text-3xl font-bold bg-transparent focus:outline-none py-2 text-white"
          />
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-1 focus-within:ring-2 focus-within:ring-blue-500">
            <textarea
              name="content"
              placeholder="Start writing..."
              value={noteData.content}
              onChange={handleChange}
              className="w-full min-h-[30vh] bg-transparent text-gray-300 text-lg p-2 focus:outline-none resize-none"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">
              Tags
            </label>
            <TagInput tags={noteData.tags} setTags={handleTagsChange} />
          </div>
        </form>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
            <Paperclip />
            Attachments
          </h3>
          {noteData.attachments && noteData.attachments.length > 0 && (
            <div className="space-y-2 mb-4">
              {noteData.attachments.map((att) => (
                <a
                  href={att.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={att.public_id}
                  className="flex items-center justify-between bg-gray-800 p-3 rounded-lg text-blue-300 hover:bg-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <span>{att.filename}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
          <div
            {...getRootProps()}
            className={`p-8 border-2 border-dashed rounded-lg text-center text-gray-400 transition-colors ${
              isDragActive
                ? "border-blue-500 bg-blue-500/10"
                : "border-gray-600"
            } ${
              isPremium
                ? "cursor-pointer hover:border-gray-500"
                : "cursor-not-allowed bg-gray-800/50"
            }`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="mx-auto mb-2" size={32} />
            {isPremium ? (
              isDragActive ? (
                <p>Drop the file here...</p>
              ) : (
                <p>Drag 'n' drop to upload, or click to select</p>
              )
            ) : (
              <p>
                <Link
                  to="/app/pricing"
                  className="font-bold text-blue-400 hover:underline"
                >
                  Upgrade to Premium
                </Link>{" "}
                to add attachments.
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-700">
          <button
            type="button"
            onClick={togglePin}
            className="flex items-center gap-2 px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700"
          >
            {noteData.isPinned ? <PinOff size={18} /> : <Pin size={18} />}
            <span>{noteData.isPinned ? "Unpin Note" : "Pin Note"}</span>
          </button>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/app")}
              className="px-6 py-3 font-bold text-gray-300 bg-transparent rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;