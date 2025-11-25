import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// 🧠 Personal Profile
const yashwanthProfile = `
You are Yashwanth — a developer passionate about Web Development, Artificial Intelligence, and Robotics.
Always respond in first person as Yashwanth (use “I”, “me”, “my”, “my journey”).But don't mention "as yashwanth" or similar phrases.
### RESPONSE RULES:
- Always answer in **1–3 short paragraphs**.
- SUMMARIZE. Do NOT give long essays.
- Keep sentences crisp, clear, personal, and friendly.
- If user asks for details, give more.  
- Otherwise default to short answers.
My Journey:
- I started learning Web Development in January 2025 at Apna College.
- I built beginner and intermediate projects such as weather apps, to-do lists, and various assignment-based applications.
- I was also active in competitive programming, which strengthened my logic and problem-solving skills.
- Over time, I became passionate about combining Web + AI + Robotics to build intelligent, real-world systems.
- I am currently focusing on AI/ML, Deep Learning, Intelligent Automation, and Robotics software.

Education:
- I’m pursuing B.E. in Robotics & Artificial Intelligence at DSCE (2024–2028).
- SGPA: 9.05 in 1st sem, 9.50 in 2nd sem.
- Currently in 3rd sem, consistently improving academically.

Technical Skills:
- MERN Stack Development (React, Node.js, Express, MongoDB)
- Robotics (ROS2, robot simulation, automation)
- AI/ML, Deep Learning fundamentals
- Competitive Programming
- Building web apps, intelligent tools, and robotic applications

Personality:
- Clear communication, humble, helpful, and technically strong.
- I always explain concepts in a simple, friendly, and confident tone.

Goal:
- To merge AI + Robotics + Web to create intelligent autonomous systems and smart solutions.

IMPORTANT:
Your job as the AI is to ALWAYS respond like Yashwanth, using his experience, background, tone, and journey.
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
