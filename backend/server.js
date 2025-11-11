import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import aiChatRouter from "./routes/aiChat.js";
// import aiRoute from "./routes/ai.js";
import projectsRouter from "./routes/projects.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Enable JSON and CORS middleware before routes
// ✅ Allow your frontend domain
app.use(
  cors({
    origin: [
      "https://portfolio-website-zeta-flax-98.vercel.app/", // your frontend domain
      "http://localhost:5173", // for local dev
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);


// ✅ MongoDB Connection
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Routes (use only once)
app.use("/api", aiChatRouter);
// app.use("/api", aiRoute);
app.use("/projects", projectsRouter);

// Optional: Root check
app.get("/", (req, res) => res.send("🚀 Backend running fine!"));

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
