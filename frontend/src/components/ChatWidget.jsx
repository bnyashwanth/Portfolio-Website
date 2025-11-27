// frontend/src/components/ChatWidget.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaMicrophone, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import "../App.css";

const API_URL = import.meta.env.VITE_API_URL;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);

  const messagesEndRef = useRef(null);
  const jarvisVoiceRef = useRef(null);

  // ----------------------------
  // 1) AUTO-SCROLL TO BOTTOM
  // ----------------------------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  // ----------------------------
  // 2) LOAD "JARVIS" VOICE
  // ----------------------------
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      const storedName = window.localStorage.getItem("jarvisVoiceName");

      let selected =
        (storedName && voices.find((v) => v.name === storedName)) ||
        // Try UK/US deep voices first
        voices.find(
          (v) =>
            /en-GB|en-US|en-IN/i.test(v.lang) &&
            /male|guy|george|david|english|india|uk/i.test(v.name.toLowerCase())
        ) ||
        voices[0];

      jarvisVoiceRef.current = selected;
      try {
        window.localStorage.setItem("jarvisVoiceName", selected.name);
      } catch (e) {
        // ignore storage errors
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // ----------------------------
  // 3) SPEAK TEXT (JARVIS STYLE)
  // ----------------------------
  const speakText = (text) => {
    if (!ttsEnabled || !text || typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);

    if (jarvisVoiceRef.current) {
      utterance.voice = jarvisVoiceRef.current;
    }

    // Hybrid JARVIS-ish tuning
    utterance.pitch = 0.75; // deeper
    utterance.rate = 0.96;  // slightly slower, calm
    utterance.volume = 1;

    window.speechSynthesis.cancel(); // stop any previous
    window.speechSynthesis.speak(utterance);
  };

  // ----------------------------
  // 4) VOICE INPUT (MIC)
  // ----------------------------
  const startListening = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Try Chrome on desktop/mobile.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN"; // Indian accent friendly
    recognition.interimResults = false;
    recognition.continuous = false;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setIsListening(false);
      sendMessage(speechText);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  // ----------------------------
  // 5) SEND MESSAGE TO BACKEND
  // ----------------------------
  const sendMessage = async (messageText) => {
    const trimmed = messageText.trim();
    if (!trimmed || loading) return;

    const userMsg = { text: trimmed, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();
      const botReply = data.reply || "⚠️ No response from AI server.";

      // ✅ Start speaking as soon as we have full reply text
      speakText(botReply);

      // If reply is long, skip typewriter and just show full text
      if (botReply.length > 600) {
        setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
      } else {
        // Typewriter effect for short replies
        setMessages((prev) => [...prev, { text: "", sender: "bot" }]);

        let currentText = "";
        for (let i = 0; i < botReply.length; i++) {
          currentText += botReply[i];

          // small delay, but not too slow
          // you can tweak this (5–15ms)
          // lower = faster
          // higher = more "typing" feel
          // here: 10ms
          // eslint-disable-next-line no-await-in-loop
          await new Promise((resolve) => setTimeout(resolve, 10));

          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (!last || last.sender !== "bot") return updated;
            updated[updated.length - 1] = { ...last, text: currentText };
            return updated;
          });
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error connecting to AI server.", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  const handleSend = () => {
    sendMessage(input);
  };

  const handleQuestionClick = (q) => {
    sendMessage(q);
  };

  const starterQuestions = [
    "Introduce yourself in 2–3 lines.",
    "What are your core skills and interests?",
    "What kind of projects are you working on right now?",
  ];

  // ----------------------------
  // 6) RENDER
  // ----------------------------
  return (
    <>
      {/* Floating Chat Button */}
      <div className="chat-float-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaRobot className="chat-icon" />
        <span className="chat-text">
          {isOpen ? "Close Assistant" : "Chat with AI"}
        </span>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-box glass-card">
          <div className="chat-header">
            <h4>Yashwanth’s AI Assistant</h4>
            <div className="chat-header-controls">
              {/* TTS toggle */}
              <button
                className={`icon-btn ${ttsEnabled ? "active" : ""}`}
                onClick={() => {
                  setTtsEnabled((prev) => !prev);
                  if (typeof window !== "undefined" && "speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                  }
                }}
                title={ttsEnabled ? "Mute voice" : "Enable voice"}
              >
                {ttsEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
              </button>

              {/* Mic button */}
              <button
                className={`icon-btn mic-btn ${isListening ? "listening" : ""}`}
                onClick={startListening}
                title="Ask with your voice"
              >
                <FaMicrophone />
                {isListening && (
                  <span className="mic-wave">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                )}
              </button>

              <FaTimes
                onClick={() => setIsOpen(false)}
                className="close-icon"
                title="Close"
              />
            </div>
          </div>

          <div className="chat-body">
            {/* Starter questions (only when empty) */}
            {messages.length === 0 && !loading && (
              <div className="starter-questions">
                <p className="starter-text">
                  You can talk to me like you’d talk to Yashwanth 👇
                </p>
                {starterQuestions.map((q, i) => (
                  <button
                    key={i}
                    className="starter-btn"
                    onClick={() => handleQuestionClick(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="chat-msg bot typing">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} disabled={loading}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
