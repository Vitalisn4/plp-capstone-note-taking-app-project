import { RotateCw, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const TrashedNoteCard = ({ note, onRestore, onDelete }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-5 flex flex-col justify-between border border-gray-700 opacity-60">
      <div>
        <h3 className="font-bold text-lg mb-2 truncate text-gray-400">{note.title}</h3>
        <p className="text-gray-500 text-sm mb-4 h-20 overflow-hidden">
          {note.content}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500">
          Trashed {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
        </p>
        <div className="flex items-center gap-2">
          {/* Restore Button */}
          <button 
            onClick={() => onRestore(note._id)} 
            className="p-2 rounded-full text-green-400 hover:bg-gray-700" 
            title="Restore"
          >
            <RotateCw size={16} />
          </button>
          {/* Delete Permanently Button */}
          <button 
            onClick={() => onDelete(note._id)} 
            className="p-2 rounded-full text-red-500 hover:bg-gray-700" 
            title="Delete Permanently"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrashedNoteCard;