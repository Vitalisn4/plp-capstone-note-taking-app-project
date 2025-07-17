import express from "express";
import {
  getAllNotesForUser,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
  searchNotes, // New
  getAllUserTags, // New
  getTrashedNotes, // New
  trashNote, // New
  restoreNote, // New
} from "../controllers/notesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply the 'protect' middleware to all routes defined in this file.
router.use(protect);

// --- Main Note Listing & Creation ---
router.route("/").get(getAllNotesForUser).post(createNote);

// --- New Feature-Specific GET Routes ---
router.get("/search", searchNotes);
router.get("/tags", getAllUserTags);
router.get("/trash", getTrashedNotes);

// --- Routes for a Single Note by ID ---
router.route("/:id").get(getNoteById).put(updateNote).delete(deleteNote); // Note: This is now for PERMANENT deletion

// --- New Routes for Specific Actions on a Single Note ---
router.put("/:id/trash", trashNote);
router.put("/:id/restore", restoreNote);

export default router;
