import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://portfolio-website-zeta-flax-98.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ⭐ FIX: Connect to MongoDB properly
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Backend root route
app.get("/", (req, res) => {
  res.json({ status: "Backend Active ✓" });
});

// Chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const reply = `Hi! Yashwanth here 👋 — You said: "${message}".`;

    return res.json({ reply });
  } catch (error) {
    console.error("Error in /api/chat:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
