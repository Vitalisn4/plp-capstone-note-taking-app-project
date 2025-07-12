import express from 'express';
import { createNotes, deleteNotes, getAllNotes, updateNotes } from "../controllers/notesController.js";


const router = express.Router();

router.get("/", getAllNotes);

router.post("/", createNotes);

router.put("/:id", updateNotes);

router.delete("/:id", deleteNotes);

export default router;

// app.get("/api/notes", (req, res) => {
//     res.status(200).send("you got 5 notes");
// });

// app.post("/api/notes", (req, res) => {
//     res.status(201).json({ message: "Note created successfully!" })
// });

// app.put("/api/notes/:id", (req, res) => {
//     res.status(200).json({ message: "Note updated successfully!" })
// });

// app.delete("/api/notes/:id", (req, res) => {
//     res.status(200).json({ message: "Note deleted successfully!" })
// });
