// frontend/src/components/ChatWidget.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import "../App.css";

const API_URL = import.meta.env.VITE_API_URL;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message to backend
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

      // Simple reply append
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error connecting to AI server.", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  const handleSend = () => sendMessage(input);

  const handleQuestionClick = (q) => sendMessage(q);

  const starterQuestions = [
    "Introduce yourself in 2–3 lines.",
    "What are your core skills and interests?",
    "What kind of projects are you working on right now?",
  ];

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
              <FaTimes
                onClick={() => setIsOpen(false)}
                className="close-icon"
                title="Close"
              />
            </div>
          </div>

          <div className="chat-body">
            {/* Starter Questions */}
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

          {/* Input Bar */}
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
