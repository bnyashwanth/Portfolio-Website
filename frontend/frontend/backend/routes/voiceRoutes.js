// backend/routes/voiceRoutes.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const ELEVEN_API_KEY = process.env.ELEVENLABS_API_KEY;

// 🔊 Map your UI voice options to ElevenLabs voice IDs
// 👉 Replace VOICE_ID_* with real IDs from your ElevenLabs dashboard
const ELEVEN_VOICES = {
  female_en: "VOICE_ID_FEMALE_ENGLISH",   // e.g. "21m00Tcm4TlvDq8ikWAM"
  male_en: "VOICE_ID_MALE_ENGLISH",       // e.g. "pFZP5JQG7iQyL5z8qzkv"
  indian_en: "VOICE_ID_INDIAN_ENGLISH",   // pick an Indian-accent style voice
};

router.post("/tts", async (req, res) => {
  try {
    const { text, voiceKey } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Text is required" });
    }

    if (!ELEVEN_API_KEY) {
      return res
        .status(500)
        .json({ error: "ELEVENLABS_API_KEY is missing in .env" });
    }

    const selectedVoiceId =
      ELEVEN_VOICES[voiceKey] || ELEVEN_VOICES.female_en;

    const elevenRes = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVEN_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_turbo_v2", // or any model you want
          voice_settings: {
            stability: 0.4,
            similarity_boost: 0.8,
            style: 0.5,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!elevenRes.ok) {
      const errText = await elevenRes.text();
      console.error("ElevenLabs error:", errText);
      return res.status(500).json({ error: "TTS request failed" });
    }

    // Get audio as base64
    const audioBuffer = await elevenRes.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString("base64");

    res.json({ audio: base64Audio });
  } catch (err) {
    console.error("TTS route error:", err);
    res.status(500).json({ error: "Server error in TTS route" });
  }
});

export default router;
