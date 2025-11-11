import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const app = express();
app.use(express.json());

// ✅ FIXED: Enable CORS properly for both local + production frontend
app.use(
  cors({
    origin: [
      "https://portfolio-website-zeta-flax-98.vercel.app", // ✅ your Vercel frontend
      "http://localhost:5173", // ✅ for local dev
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// --- Root route to test Render deployment ---
app.get("/", (req, res) => {
  res.json({ status: "✅ Backend active and CORS enabled" });
});

// --- Chat API route ---
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // --- Example Gemini-style AI response ---
    const reply = `Hi! Yashwanth here 👋 — You said: "${message}".`;
    return res.json({ reply });
  } catch (error) {
    console.error("Error in /api/chat:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
