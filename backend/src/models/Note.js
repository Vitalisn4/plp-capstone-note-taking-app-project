import mongoose from "mongoose";

// The Note schema has been updated to support all new features.
const noteSchema = new mongoose.Schema(
  {
    // --- Phase 1: User Ownership (CRITICAL) ---
    // This field links every note to a specific user, which is the foundation
    // for all security and data privacy in the app.
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
    // Allows for a "soft delete" by moving notes to a trash folder
    // instead of permanently deleting them immediately.
    isTrashed: {
      type: Boolean,
      default: false,
    },

    // --- Phase 3: Premium Subscription Features ---
    // Stores data for files uploaded and attached to a note.
    attachments: [
      {
        public_id: { type: String, required: true }, // ID from Cloudinary/S3
        url: { type: String, required: true }, // Public URL of the file
      },
    ],
    // Stores a unique token and expiry date for creating shareable links.
    shareableLink: {
      token: String,
      expires: Date,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// --- Phase 2: Full-Text Search Index ---
// This enables efficient text searching on the title and content fields.
// After adding this, you must create the index in your MongoDB Atlas UI
// or via the Mongo shell for the search functionality to work.
noteSchema.index({ title: "text", content: "text" });

const Note = mongoose.model("Note", noteSchema);

export default Note;
