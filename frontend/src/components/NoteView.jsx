import { Edit } from "lucide-react";
import { format } from "date-fns";

const Tag = ({ children }) => (
  <span className="px-3 py-1 text-sm font-semibold bg-gray-700 text-gray-200 rounded-full">
    {children}
  </span>
);

const NoteView = ({ note, onEditClick }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in text-white">
      {/* Header with Title and Edit Button */}
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-4xl font-bold break-words">{note.title}</h1>
        <button
          onClick={onEditClick}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors shrink-0"
        >
          <Edit size={18} />
          <span>Edit</span>
        </button>
      </div>

      {/* Tags Section */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {note.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}

      {/* Main Note Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        {/* Using 'whitespace-pre-wrap' preserves line breaks and spacing from the user's input */}
        <p className="whitespace-pre-wrap">{note.content}</p>
      </div>

      {/* Footer with Metadata */}
      <div className="mt-12 pt-6 border-t border-gray-700">
        <p className="text-sm text-gray-400">
          Last updated:{" "}
          {format(new Date(note.updatedAt), "MMMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </div>
  );
};

export default NoteView;
