import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotesForUser, // Renamed from getAllNotes
  getNoteById,
  updateNote,
} from "../controllers/notesController.js";
import { protect } from "../middleware/authMiddleware.js"; // Import the middleware

const router = express.Router();

// Apply the 'protect' middleware to all routes defined in this file.
// Any request to /api/notes/* will now require a valid JWT.
router.use(protect);

router
  .route("/")
  .get(getAllNotesForUser) // Use the new controller function
  .post(createNote);

router.route("/:id").get(getNoteById).put(updateNote).delete(deleteNote);

export default router;
