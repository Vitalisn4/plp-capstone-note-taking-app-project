import express from "express";
import { summarizeNote, suggestTitle } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requirePremium } from "../middleware/premiumMiddleware.js";

const router = express.Router();

// Apply authentication and premium subscription checks to all AI routes
router.use(protect);
router.use(requirePremium);

router.post("/summarize", summarizeNote);
router.post("/suggest-title", suggestTitle);

export default router;
