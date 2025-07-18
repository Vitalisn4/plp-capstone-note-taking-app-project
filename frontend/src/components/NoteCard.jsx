import { Link } from "react-router-dom";
import { Pin, Trash2, Edit } from "lucide-react"; // Using modern icons
import { formatDistanceToNow } from "date-fns"; // For user-friendly dates

// A small, reusable component for displaying tags within the card
const Tag = ({ children }) => (
  <span className="px-2 py-1 text-xs font-semibold bg-gray-700 text-gray-300 rounded-full">
    {children}
  </span>
);

const NoteCard = ({ note, onTrash }) => {
  /**
   * This handler is crucial. It prevents the parent <Link> from navigating
   * when the trash button itself is clicked.
   * @param {React.MouseEvent} e - The mouse event.
   */
  const handleTrashClick = (e) => {
    e.preventDefault(); // Stop the default link behavior
    e.stopPropagation(); // Stop the event from bubbling up to the parent Link
    onTrash(note._id); // Call the function passed from HomePage
  };

  return (
    // The entire card is a link to the note's detail/edit page.
    <Link
      to={`/app/note/${note._id}`} // Corrected route for Phase 2
      className="relative block bg-gray-800 rounded-lg p-5 flex flex-col group border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-blue-500/10"
    >
      {/* Conditionally render the Pin icon if the note is pinned */}
      {note.isPinned && (
        <Pin
          className="absolute top-4 right-4 text-blue-400 animate-fade-in"
          size={18}
        />
      )}

      {/* Main content of the note card */}
      <div className="flex-grow">
        <h3 className="font-bold text-lg mb-2 pr-8 truncate text-white">
          {note.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 h-20 overflow-hidden break-words">
          {note.content}
        </p>

        {/* Display tags if they exist */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {note.tags.slice(0, 3).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </div>

      {/* Footer section with date and action buttons */}
      <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-700/50">
        <p className="text-xs text-gray-500">
          {/* Format the date to be more readable, e.g., "about 2 hours ago" */}
          {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
        </p>

        {/* Action buttons appear on hover for a cleaner look */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* The Edit icon is purely visual; clicking anywhere on the card edits */}
          <div
            className="p-2 rounded-full hover:bg-gray-700 text-white"
            title="Edit Note"
          >
            <Edit size={16} />
          </div>
          {/* The Trash button has its own specific click handler */}
          <button
            onClick={handleTrashClick}
            className="p-2 rounded-full hover:bg-red-500/20 text-red-400 hover:text-red-300"
            title="Move to Trash"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
