import express from "express";
import {
  // Make sure ALL your functions are listed here
  getAllNotesForUser,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
  searchNotes,
  getAllUserTags,
  getTrashedNotes,
  trashNote,
  restoreNote,
  emptyTrash, // --- THE FIX IS HERE ---
  addAttachment,
  generateShareableLink,
} from "../controllers/notesController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requirePremium } from "../middleware/premiumMiddleware.js";
import multerUpload from "../config/multer.js";

const router = express.Router();

// Apply the 'protect' middleware to all routes defined in this file.
router.use(protect);

// --- Main Note Listing & Creation ---
router.route("/").get(getAllNotesForUser).post(createNote);

// --- New Feature-Specific GET Routes ---
router.get("/search", searchNotes);
router.get("/tags", getAllUserTags);

// --- Trash Specific Routes ---
router.get("/trash", getTrashedNotes);
router.delete("/trash/empty", emptyTrash); // This line will now work correctly.

// --- Routes for a Single Note by ID ---
router.route("/:id").get(getNoteById).put(updateNote).delete(deleteNote);

// --- New Routes for Specific Actions on a Single Note ---
router.put("/:id/trash", trashNote);
router.put("/:id/restore", restoreNote);

// --- PREMIUM FEATURE ROUTES ---
router.post(
  "/:id/attachments",
  requirePremium,
  multerUpload.single("attachment"),
  addAttachment
);

router.post("/:id/share", requirePremium, generateShareableLink);

export default router;
