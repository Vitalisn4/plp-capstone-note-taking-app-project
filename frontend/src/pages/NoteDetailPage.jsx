import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useDropzone } from "react-dropzone";
import useAuthStore from "../store/authStore";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteForm from "../components/NoteForm";
import NoteView from "../components/NoteView";
import { Loader2, Share2, UploadCloud, Paperclip } from "lucide-react";
import ShareModal from "../components/ui/ShareModal";

const NoteDetailPage = () => {
  // Get the user from the global store to check their subscription status
  const { user } = useAuthStore();
  const isPremium = user?.subscription?.tier === "premium";

  // State for note data and UI control
  const [noteData, setNoteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareableLink, setShareableLink] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  // --- Data Fetching Logic ---
  const fetchNote = useCallback(async () => {
    // No need to set isFetching to true here, it's handled on initial load
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

  // --- Dropzone Hook and Handler for File Uploads ---
  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!isPremium) {
        toast.error("Upgrade to Premium to add attachments.");
        return;
      }
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("attachment", file);

      const uploadToast = toast.loading("Uploading file...");
      try {
        await api.post(`/notes/${id}/attachments`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("File uploaded successfully!", { id: uploadToast });
        fetchNote(); // Re-fetch the note to show the new attachment
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("File upload failed.", { id: uploadToast });
      }
    },
    [id, isPremium, fetchNote]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  // --- Form Submission Logic ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/notes/${id}`, noteData);
      toast.success("Note updated successfully!");
      setIsEditing(false); // Return to view mode after saving
      fetchNote(); // Re-fetch to show latest saved data
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note.");
    } finally {
      setLoading(false);
    }
  };

  // --- Cancel Edit Handler ---
  const handleCancelEdit = () => {
    setIsEditing(false);
    fetchNote(); // Re-fetch to discard any unsaved changes
  };

  // --- Share Note Handler ---
  const handleShare = async () => {
    if (!isPremium) return;
    try {
      const { data } = await api.post(`/notes/${id}/share`);
      setShareableLink(data.shareableLink);
      setIsShareModalOpen(true);
    } catch (error) {
      console.error("Error generating share link:", error);
      toast.error("Could not generate share link.");
    }
  };

  // --- Render Logic ---
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareableLink={shareableLink}
      />

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
            />
          ) : (
            <>
              {/* --- SHARE BUTTON (conditionally rendered) --- */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleShare}
                  disabled={!isPremium}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
                  title={
                    isPremium
                      ? "Share this note"
                      : "Available for Premium users"
                  }
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>

              <NoteView
                note={noteData}
                onEditClick={() => setIsEditing(true)}
              />

              {/* --- FILE ATTACHMENTS SECTION (conditionally rendered) --- */}
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                  <Paperclip />
                  Attachments
                </h3>

                {/* Display existing attachments */}
                {noteData.attachments && noteData.attachments.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {noteData.attachments.map((att) => (
                      <a
                        href={att.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={att.public_id}
                        className="block bg-gray-800 p-3 rounded-lg text-blue-300 hover:bg-gray-700 transition-colors"
                      >
                        {att.filename}
                      </a>
                    ))}
                  </div>
                )}

                {/* Display the upload zone */}
                {isPremium ? (
                  <div
                    {...getRootProps()}
                    className={`p-8 border-2 border-dashed rounded-lg text-center text-gray-400 cursor-pointer transition-colors ${
                      isDragActive
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-gray-600 hover:border-gray-500"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <UploadCloud className="mx-auto mb-2" size={32} />
                    {isDragActive ? (
                      <p>Drop the file here to upload...</p>
                    ) : (
                      <p>Drag 'n' drop a file here, or click to select</p>
                    )}
                  </div>
                ) : (
                  <div className="p-8 border-2 border-dashed border-gray-700 rounded-lg text-center text-gray-500">
                    <p>
                      <Link
                        to="/app/pricing"
                        className="font-bold text-blue-400 hover:underline"
                      >
                        Upgrade to Premium
                      </Link>{" "}
                      to add attachments.
                    </p>
                  </div>
                )}
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default NoteDetailPage;
