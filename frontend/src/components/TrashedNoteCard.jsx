// import { RotateCcw, Trash2, AlertTriangle } from "lucide-react";

// const TrashedNoteCard = ({ note, onRestore, onDelete }) => {
//   // Note: We don't need formatDistanceToNow here as the info is less relevant for trashed items.
//   return (
//     <div className="bg-gray-800 rounded-lg p-5 flex flex-col justify-between border border-gray-700 opacity-70 hover:opacity-100 transition-opacity">
//       <div>
//         <h3 className="font-bold text-lg mb-2 truncate text-gray-400">
//           {note.title}
//         </h3>
//         <p className="text-gray-500 text-sm mb-4 h-20 overflow-hidden">
//           {note.content}
//         </p>
//       </div>
//       <div className="flex justify-between items-end">
//         {/* --- THE UPDATE IS HERE --- */}
//         <div
//           className="flex items-center gap-2 text-xs text-yellow-500/80"
//           title="Notes in trash are deleted after 7 days"
//         >
//           <AlertTriangle size={14} />
//           <span>Auto-deletes soon</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => onRestore(note._id)}
//             title="Restore"
//             className="p-2 rounded-full hover:bg-green-500/20 text-green-400"
//           >
//             <RotateCcw size={16} />
//           </button>
//           <button
//             onClick={() => onDelete(note._id)}
//             title="Delete Permanently"
//             className="p-2 rounded-full hover:bg-red-500/20 text-red-400"
//           >
//             <Trash2 size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrashedNoteCard;

import { RotateCcw, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const TrashedNoteCard = ({ note, onRestore, onDelete }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5 flex flex-col justify-between group">
      <div>
        <h3 className="font-bold text-lg mb-2 truncate text-gray-400">{note.title}</h3>
        <p className="text-gray-500 text-sm mb-4 h-20 overflow-hidden break-words">
          {note.content}
        </p>
      </div>
      <div className="flex justify-between items-center mt-auto">
        <p className="text-xs text-gray-500">
          Trashed {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
        </p>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={() => onRestore(note._id)} className="p-2 rounded-full hover:bg-gray-700 text-green-400" title="Restore">
            <RotateCcw size={16} />
          </button>
          <button onClick={() => onDelete(note._id)} className="p-2 rounded-full hover:bg-gray-700 text-red-400" title="Delete Permanently">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrashedNoteCard;
