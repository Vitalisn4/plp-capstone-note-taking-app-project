import { Link } from "react-router";
import { motion } from "framer-motion";
import { Pin, Trash2, Edit, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const Tag = ({ children }) => (
  <span className="px-2 py-1 text-xs font-semibold bg-gray-700 text-gray-300 rounded-full">
    {children}
  </span>
);

const NoteCard = ({ note, onTrash, onShare, isPremium }) => {
  const handleTrashClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onTrash(note._id);
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onShare(note._id);
  };

  const MotionDiv = motion.div;

  return (
    <MotionDiv
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="h-full"
    >
      <Link
        to={`/app/note/${note._id}`}
        // --- FIX: REMOVED the redundant 'block' class ---
        className="relative h-full bg-gray-800 rounded-lg p-5 flex flex-col justify-between group border border-gray-700 hover:border-blue-500 transition-colors duration-300"
      >
        {note.isPinned && (
          <Pin className="absolute top-3 right-3 text-blue-400" size={18} />
        )}
        <div>
          <h3 className="font-bold text-lg mb-2 pr-8 truncate text-white">
            {note.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 h-20 overflow-hidden break-words">
            {note.content}
          </p>
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {note.tags.slice(0, 3).map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
          </p>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleShareClick}
              disabled={!isPremium}
              className="p-2 rounded-full text-white hover:bg-gray-700 disabled:text-gray-600 disabled:cursor-not-allowed"
              title={
                isPremium ? "Share note" : "Upgrade to Premium to share notes"
              }
            >
              <Share2 size={16} />
            </button>
            <div
              className="p-2 rounded-full hover:bg-gray-700 text-white"
              title="Edit note"
            >
              <Edit size={16} />
            </div>
            <button
              onClick={handleTrashClick}
              className="p-2 rounded-full hover:bg-red-500/20 text-red-400 hover:text-red-300"
              title="Move to trash"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </Link>
    </MotionDiv>
  );
};

export default NoteCard;
