import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isTrashed: {
      type: Boolean,
      default: false,
    },
    // This field will store the timestamp when a note is moved to trash.
    trashedAt: {
      type: Date,
    },
    attachments: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
        filename: { type: String, required: true },
      },
    ],
    shareableLink: {
      token: { type: String, index: true, sparse: true },
      expires: { type: Date },
    },
  },
  {
    timestamps: true,
  }
);

// --- Indexes ---
noteSchema.index({ title: "text", content: "text" });

// --- THE UPDATE IS HERE: TTL Index for Auto-Deletion ---
// This tells MongoDB to automatically delete a document 604800 seconds (7 days)
// after the date specified in the 'trashedAt' field.
// This will only apply to documents where 'trashedAt' exists.
noteSchema.index({ trashedAt: 1 }, { expireAfterSeconds: 604800 });

const Note = mongoose.model("Note", noteSchema);

export default Note;
