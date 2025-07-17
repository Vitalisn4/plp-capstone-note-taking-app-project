import express from "express";
import { getSharedNote } from "../controllers/publicController.js";

const router = express.Router();

router.get("/notes/:token", getSharedNote);

export default router;
