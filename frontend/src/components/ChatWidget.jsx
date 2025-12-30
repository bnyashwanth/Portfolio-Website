import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import "../App.css";

// ✅ Point to your Render URL.
// We do NOT add /chat here yet, we add it in the fetch call.
const BASE_URL = "https://python-ai-service-for-portfolio.onrender.com"; 

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

  // Send Message Logic
  const sendMessage = async (messageText) => {
    const trimmed = messageText.trim();
    if (!trimmed || loading) return;

    // Add user message to UI
    const newHistory = [...messages, { text: trimmed, sender: "user" }];
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      // 1. Prepare History (Convert to simple list of pairs if needed, or just send raw)
      // Our Python endpoint expects: [[user, bot], [user, bot]]
      const historyPayload = [];
      for (let i = 0; i < messages.length; i += 2) {
        if (messages[i] && messages[i+1]) {
           historyPayload.push([messages[i].text, messages[i+1].text]);
        }
      }

      // 2. Standard Fetch Request
      const response = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history: historyPayload
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      // 3. Get the clean text response
      const botReply = data.response;

      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Could not connect to AI. Please try again.", sender: "bot" },
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
      <div className="chat-float-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaRobot className="chat-icon" />
        <span className="chat-text">
          {isOpen ? "Close Assistant" : "Chat with AI"}
        </span>
      </div>

      {isOpen && (
        <div className="chat-box glass-card">
          <div className="chat-header">
            <h4>Yashwanth’s AI Assistant</h4>
            <div className="chat-header-controls">
              <FaTimes onClick={() => setIsOpen(false)} className="close-icon" title="Close" />
            </div>
          </div>

          <div className="chat-body">
            {messages.length === 0 && !loading && (
              <div className="starter-questions">
                <p className="starter-text">
                  You can talk to me like you’d talk to Yashwanth 👇
                </p>
                {starterQuestions.map((q, i) => (
                  <button key={i} className="starter-btn" onClick={() => handleQuestionClick(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="chat-msg bot typing">
                <span>.</span><span>.</span><span>.</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
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