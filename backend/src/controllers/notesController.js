import mongoose from "mongoose"; // <-- ADDED: Required for ObjectId validation
import Note from "../models/Note.js";

// @desc    Get all notes for a logged-in user
// @route   GET /api/notes
// @access  Private
export const getAllNotesForUser = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      updatedAt: -1,
    });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotesForUser controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
export const createNote = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Please provide title and content" });
  }

  try {
    const note = new Note({
      title,
      content,
      user: req.user._id, // Associate note with the logged-in user
    });

    const createdNote = await note.save();
    res.status(201).json(createdNote);
  } catch (error) {
    console.error("Error in createNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Get a single note by ID
// @route   GET /api/notes/:id
// @access  Private
export const getNoteById = async (req, res) => {
  
  // Validate if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Note not found" });
  }
  

  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      // This now correctly handles cases where the ID format is valid but not found
      return res.status(404).json({ message: "Note not found" });
    }

    // IMPORTANT: Check if the note belongs to the logged-in user
    if (note.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this note" });
    }

    res.json(note);
  } catch (error) {
    console.error("Error in getNoteById controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
export const updateNote = async (req, res) => {
  const { title, content } = req.body;

  // --- MODIFICATION START ---
  // Validate if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Note not found" });
  }
  // --- MODIFICATION END ---

  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // IMPORTANT: Check for ownership before updating
    if (note.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this note" });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
export const deleteNote = async (req, res) => {
  // --- MODIFICATION START ---
  // Validate if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Note not found" });
  }
  // --- MODIFICATION END ---

  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // IMPORTANT: Check for ownership before deleting
    if (note.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this note" });
    }

    await note.deleteOne(); // Use deleteOne() on the document instance
    res.status(200).json({ message: "Note removed successfully" });
  } catch (error) {
    console.error("Error in deleteNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
