import cloudinary from "../config/cloudinary.js";
import crypto from "crypto";
import mongoose from "mongoose";
import Note from "../models/Note.js";

// @desc    Get all non-trashed notes for a user (pinned first)
// @route   GET /api/notes
// @access  Private
export const getAllNotesForUser = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user._id,
      isTrashed: false, // Only fetch notes that are NOT in the trash
    }).sort({ isPinned: -1, updatedAt: -1 }); // Pinned notes first, then newest
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
  const { title, content, tags } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Please provide title and content" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [], // Handle the new 'tags' field
      user: req.user._id,
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
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Note not found" });
  }

  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

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

// @desc    Update a note (including pinning and tags)
// @route   PUT /api/notes/:id
// @access  Private
export const updateNote = async (req, res) => {
  const { title, content, tags, isPinned } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Note not found" });
  }

  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this note" });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    if (tags !== undefined) note.tags = tags;
    if (isPinned !== undefined) note.isPinned = isPinned;

    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Permanently delete a note (only if it's already in the trash)
// @route   DELETE /api/notes/:id
// @access  Private
export const deleteNote = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Note not found" });
  }

  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this note" });
    }

    // IMPORTANT: Only allow deletion if the note is already in the trash
    if (!note.isTrashed) {
      return res
        .status(400)
        .json({ message: "Note must be in the trash to be deleted" });
    }

    await note.deleteOne();
    res.status(200).json({ message: "Note permanently deleted" });
  } catch (error) {
    console.error("Error in deleteNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ===============================================
// NEW CONTROLLER FUNCTIONS FOR PHASE 2 FEATURES
// ===============================================

// @desc    Search notes by keyword
// @route   GET /api/notes/search
// @access  Private
export const searchNotes = async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ message: "Search query 'q' is required" });
  }
  try {
    const notes = await Note.find({
      user: req.user._id,
      isTrashed: false,
      $text: { $search: q },
    });
    res.json(notes);
  } catch (error) {
    console.error("Error in searchNotes controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Get all unique tags for a user
// @route   GET /api/notes/tags
// @access  Private
export const getAllUserTags = async (req, res) => {
  try {
    const tags = await Note.distinct("tags", {
      user: req.user._id,
      isTrashed: false,
    });
    res.json(tags);
  } catch (error) {
    console.error("Error in getAllUserTags controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Get all trashed notes for a user
// @route   GET /api/notes/trash
// @access  Private
export const getTrashedNotes = async (req, res) => {
  try {
    const trashedNotes = await Note.find({
      user: req.user._id,
      isTrashed: true,
    }).sort({ updatedAt: -1 });
    res.json(trashedNotes);
  } catch (error) {
    console.error("Error in getTrashedNotes controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Move a note to the trash (soft delete)
// @route   PUT /api/notes/:id/trash
// @access  Private
export const trashNote = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Note not found" });
  }
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Action not authorized" });
    }
    note.isTrashed = true;
    note.isPinned = false; // A trashed note cannot be pinned
    await note.save();
    res.json({ message: "Note moved to trash" });
  } catch (error) {
    console.error("Error in trashNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Restore a note from the trash
// @route   PUT /api/notes/:id/restore
// @access  Private
export const restoreNote = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Note not found" });
  }
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Action not authorized" });
    }
    note.isTrashed = false;
    await note.save();
    res.json({ message: "Note restored" });
  } catch (error) {
    console.error("Error in restoreNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// --- ADD THESE NEW FUNCTIONS TO THE END OF THE FILE ---

// @desc    Add an attachment to a note
// @route   POST /api/notes/:id/attachments
// @access  Private/Premium
export const addAttachment = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Action not authorized' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
      folder: `nexusnotes/${req.user._id}`, // Store in a user-specific folder
    });

    const attachment = {
      public_id: result.public_id,
      url: result.secure_url,
      filename: req.file.originalname,
    };
    note.attachments.push(attachment);
    await note.save();
    res.status(201).json(note.attachments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading file' });
  }
};

// @desc    Generate or retrieve a shareable link for a note
// @route   POST /api/notes/:id/share
// @access  Private/Premium
export const generateShareableLink = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Action not authorized' });
    }

    // If a valid link already exists, return it
    if (note.shareableLink && note.shareableLink.token) {
        // Optional: you could check for expiration here too
        const link = `${req.protocol}://${req.get('host')}/api/public/notes/${note.shareableLink.token}`;
        return res.json({ shareableLink: link });
    }

    // Otherwise, create a new link
    const token = crypto.randomBytes(24).toString('hex');
    note.shareableLink = { token, expires: null }; // Set expiration as needed
    await note.save();
    
    const link = `${req.protocol}://${req.get('host')}/api/public/notes/${token}`;
    res.status(201).json({ shareableLink: link });
  } catch (error) {
      res.status(500).json({ message: 'Error generating shareable link' });
  }
};
