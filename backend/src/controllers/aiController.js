import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Generative AI model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// @desc    Generate a summary for a note's content
// @route   POST /api/ai/summarize
// @access  Private/Premium
export const summarizeNote = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Note content is required." });
  }

  try {
    const prompt = `Summarize the following note content into a few concise bullet points. Focus on the key takeaways and action items:\n\n---\n${content}`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    res.json({ summary });
  } catch (error) {
    console.error("Error with Gemini API:", error);
    res.status(500).json({ message: "Failed to generate summary." });
  }
};

// @desc    Suggest a title for a note's content
// @route   POST /api/ai/suggest-title
// @access  Private/Premium
export const suggestTitle = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Note content is required." });
  }

  try {
    const prompt = `Based on the following note content, suggest a short, descriptive, and compelling title. The title should be no more than 8 words. Return only the title text itself, without any quotes or labels:\n\n---\n${content}`;

    const result = await model.generateContent(prompt);
    let title = result.response.text();

    // Clean up the response to ensure only the title is sent
    title = title.replace(/['"]+/g, "").trim();

    res.json({ title });
  } catch (error) {
    console.error("Error with Gemini API:", error);
    res.status(500).json({ message: "Failed to suggest a title." });
  }
};
