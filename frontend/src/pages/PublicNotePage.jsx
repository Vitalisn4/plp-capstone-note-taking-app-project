import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router";
import api from "../lib/axios";
import { Loader2, Paperclip, BrainCircuit } from "lucide-react";
import { format } from "date-fns";

const PublicNotePage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useParams();

  const fetchSharedNote = useCallback(async () => {
    try {
      const { data } = await api.get(`/public/notes/${token}`);
      setNote(data);
    } catch (err) {
      setError(err.response?.data?.message || "This note could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchSharedNote();
  }, [fetchSharedNote]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold break-words mb-6">{note.title}</h1>
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="whitespace-pre-wrap">{note.content}</p>
        </div>

        {note.attachments && note.attachments.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Paperclip />
              Attachments
            </h3>
            <div className="space-y-2">
              {note.attachments.map((att) => (
                <a
                  href={att.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={att.public_id}
                  className="block bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {att.filename}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            Last updated: {format(new Date(note.updatedAt), "MMMM d, yyyy")}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-4 text-lg font-semibold text-blue-400 hover:text-blue-300"
          >
            <BrainCircuit size={20} />
            Published with NexusNotes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicNotePage;
