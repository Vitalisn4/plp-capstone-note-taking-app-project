import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Route Imports
import notesRoutes from "./routes/notesRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // <- MODIFICATION: Import user routes

// Config and Middleware Imports
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Global Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", // For development communication with frontend
    })
  );
}
app.use(express.json()); // This middleware will parse JSON bodies: req.body
app.use(rateLimiter); // Apply rate limiting to all requests

// API Routes
app.use("/api/notes", notesRoutes);
app.use("/api/users", userRoutes); // <- MODIFICATION: Mount user routes

// Production Build Configuration
if (process.env.NODE_ENV === "production") {
  // Serve static files from the frontend's 'dist' directory
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // For any route that is not an API route, send the frontend's index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Connect to Database and Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server started in ${process.env.NODE_ENV} mode on PORT: ${PORT}`
    );
  });
});
