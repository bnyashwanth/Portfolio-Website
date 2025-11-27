import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/tts", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required for TTS" });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing ELEVENLABS_API_KEY" });
    }

    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/pMsXgVXv3BLzUgS8j5qR", // Example voice ID
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          voice_settings: {
            stability: 0.4,
            similarity_boost: 0.7,
          },
        }),
      }
    );

    const audioBuffer = await response.arrayBuffer();
    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": audioBuffer.byteLength,
    });

    res.send(Buffer.from(audioBuffer));
  } catch (err) {
    console.error("TTS Error:", err);
    res.status(500).json({ error: "TTS generation failed" });
  }
});

export default router;
