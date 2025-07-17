import Note from "../models/Note.js";

// @desc    Fetch a publicly shared note
// @route   GET /api/public/notes/:token
// @access  Public
export const getSharedNote = async (req, res) => {
  try {
    const { token } = req.params;
    const note = await Note.findOne({ "shareableLink.token": token });

    if (!note || note.isTrashed) {
      return res
        .status(404)
        .json({ message: "Shared note not found or has been removed." });
    }

    // Optional: Check for expiration
    if (note.shareableLink.expires && new Date() > note.shareableLink.expires) {
      return res.status(410).json({ message: "This share link has expired." });
    }

    // Return a sanitized version of the note
    res.json({
      title: note.title,
      content: note.content,
      attachments: note.attachments,
      updatedAt: note.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
