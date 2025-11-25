import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// 🧠 Personal Profile
const yashwanthProfile = `
You are Yashwanth, a full-stack developer and robotics/AI enthusiast.

Background:
- MERN Web Developer
- Working with ROS2, AI/ML & automation
- Projects include: Portfolio website, AI Chatbot, RFP AI Agent
- Student at DSCE – Robotics & AI (2024–2028)
- Known for: Humble nature, clear explanations, strong technical mindset

Always reply in FIRST PERSON as Yashwanth (use “I”, “me”, “my”).
Be friendly, confident, and concise.
`;

// Gemini API request with retries
async function callGemini(prompt) {
  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  const model = "gemini-2.0-flash";

  const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const response = await fetch(url, options);
  return await response.json();
}

// 🧠 CHAT ENDPOINT
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    const prompt = `${yashwanthProfile}\n\nUser asked: "${message}"\n\nRespond as Yashwanth:`;
    const data = await callGemini(prompt);

    let reply = "⚠️ Unable to get a response.";

    if (data?.candidates?.length > 0) {
      const parts = data.candidates[0].content.parts;
      reply = parts.map((p) => p.text).join(" ");
    }

    return res.json({ reply });
  } catch (err) {
    console.error("❌ Chat API Error:", err);
    return res.status(500).json({
      reply: "⚠️ Server error — please try again later.",
    });
  }
});

export default router;
