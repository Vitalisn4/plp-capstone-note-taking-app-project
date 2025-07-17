import mongoose from "mongoose";

// The Note schema has been updated to support all new features.
const noteSchema = new mongoose.Schema(
  {
    // --- Phase 1: User Ownership (CRITICAL) ---
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Establishes a relationship with the User model
    },

    // --- Original Fields ---
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    // --- Phase 2: Standout Free Tier Features ---
    // Replaces a single 'category' with a more flexible array of tags.
    tags: {
      type: [String],
      default: [],
    },
    // Allows notes to be "pinned" to the top of the list.
    isPinned: {
      type: Boolean,
      default: false,
    },
    // Allows for a "soft delete" by moving notes to a trash folder.
    isTrashed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// --- Phase 2: Full-Text Search Index ---
// This enables efficient text searching on the title and content fields.
noteSchema.index({ title: "text", content: "text" });

const Note = mongoose.model("Note", noteSchema);

export default Note;
