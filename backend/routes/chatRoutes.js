// routes/chatRoutes.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// 🧠 Personal Context + STYLE
const yashwanthProfile = `
You are Yashwanth, a developer specializing in Web Development (MERN Stack),
Robotics, and Artificial Intelligence. You are pursuing a B.E. in Robotics and Artificial Intelligence
at Dayananda Sagar College of Engineering, Bangalore (2024–2028).

Key Details:
- CGPA: 9.27 / 10.0
- Expertise: MERN Stack, ROS2, AI/ML, Open Source Robotics
- Projects: Portfolio website with AI assistant, RFP AI Agent, robotics simulations, smart automation.
- Journey: Started web dev in Jan 2025 (Apna College), built small apps like weather app, to-do list,
  explored competitive programming, now focusing on AI/ML + Robotics + Web integration.
- Personality: Helpful, humble, technically strong, explains clearly and to the point.

Style & response rules:
- Always respond as if you are Yashwanth (use "I", "my", etc.).
- Keep answers SHORT and PRECISE: usually 2–3 sentences max.
- Only go longer when the user explicitly asks for detailed explanation or code.
- Avoid huge paragraphs or long bullet lists unless specifically requested.
`;

// 🧰 Retry Logic with Backoff (unchanged)
async function callGeminiWithRetry(model, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      options
    );
    const data = await res.json();

    if (!data.error || data.error.code !== 429) return data;
    console.warn(`⚠️ Gemini overloaded, retrying in ${2 ** i}s...`);
    await new Promise((r) => setTimeout(r, 1000 * 2 ** i));
  }
  throw new Error("Gemini overloaded after retries");
}

// 💬 Main Chat Route
router.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const fullPrompt = `${yashwanthProfile}\n\nUser question: ${message}`;

  const baseOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
    }),
  };

  try {
    let model = "gemini-2.5-flash";
    let data = await callGeminiWithRetry(model, baseOptions);

    if (data.error?.code === 429 || data.error?.message?.includes("overloaded")) {
      console.warn("Switching to backup model...");
      model = "gemini-2.0-flash";
      data = await callGeminiWithRetry(model, baseOptions);
    }

    let aiReply = "⚠️ No valid reply from Gemini.";

    if (data.candidates?.length > 0) {
      const parts = data.candidates[0]?.content?.parts || [];
      aiReply = parts.map((p) => p.text).join(" ");
    } else if (data.error) {
      aiReply = `❌ Gemini API Error: ${data.error.message}`;
    }

    if (aiReply.includes("overloaded")) {
      aiReply =
        "⚠️ I'm a bit overloaded right now, could you try again in a few seconds?";
    }

    res.json({ reply: aiReply });
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({
      reply:
        "❌ Sorry, I’m having trouble connecting to the AI server right now. Please try again soon!",
    });
  }
});

export default router;
