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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const starterQuestions = [
    "Tell me about Yashwanth’s experience in AI & Robotics.",
    "What projects has Yashwanth worked on?",
    "What skills does Yashwanth have?",
  ];

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || loading) return;

    const userMsg = { text: messageText, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await res.json();
      const botReply = data.reply || "⚠️ No response from AI server.";

      setMessages((prev) => [...prev, { text: "", sender: "bot" }]);

      let currentText = "";
      for (let i = 0; i < botReply.length; i++) {
        currentText += botReply[i];
        await new Promise((r) => setTimeout(r, 8));

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].text = currentText;
          return updated;
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error connecting to AI server.", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {isOpen && (
        <div className="chat-box glass-card">
          <div className="chat-header">
            <h4>Yashwanth’s AI Assistant</h4>
            <FaTimes onClick={() => setIsOpen(false)} className="close-icon" />
          </div>

          <div className="chat-body">
            {messages.length === 0 && !loading && (
              <div className="starter-questions">
                <p className="starter-text">Try asking one of these:</p>
                {starterQuestions.map((q, index) => (
                  <button
                    key={index}
                    className="starter-btn"
                    onClick={() => sendMessage(q)}
                  >
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
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <button onClick={() => sendMessage(input)} disabled={loading}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}

      <div className="chat-float-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaRobot className="chat-icon" />
        <span className="chat-text">
          {isOpen ? "Close Chat" : "Chat with AI"}
        </span>
      </div>
    </>
  );
};

export default ChatWidget;
