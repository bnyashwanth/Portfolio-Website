// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

// Parse JSON
app.use(express.json());

// CORS – allow your frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://portfolio-website-zeta-flax-98.vercel.app",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Health check route (for quick tests)
app.get("/", (req, res) => {
  res.json({ status: "✅ Backend running", time: new Date().toISOString() });
});

// Attach your AI chat routes
app.use("/api", chatRoutes); // <-- /api/chat is now live

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
