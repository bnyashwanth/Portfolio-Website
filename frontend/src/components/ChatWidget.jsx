import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import { Client } from "@gradio/client"; // Import the client
import "../App.css";

// Ensure this is set in your .env file: VITE_API_URL=http://127.0.0.1:7860/
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:7860/";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Store the connected client instance
  const [app, setApp] = useState(null);

  const messagesEndRef = useRef(null);

  // 1. Connect to AI Backend on Mount
  useEffect(() => {
    const connectAI = async () => {
      try {
        const client = await Client.connect(API_URL);
        setApp(client);
        console.log("AI Connected successfully");
      } catch (error) {
        console.error("AI Connection Failed:", error);
      }
    };
    connectAI();
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 2. Send Message Logic
  const sendMessage = async (messageText) => {
    const trimmed = messageText.trim();
    if (!trimmed || loading) return;
    
    // Guard: Check if app is connected
    if (!app) {
        setMessages((prev) => [...prev, { text: trimmed, sender: "user" }]);
        setTimeout(() => {
            setMessages((prev) => [...prev, { text: "⚠️ Server not connected yet. Please wait...", sender: "bot" }]);
        }, 500);
        return;
    }

    // Add user message to UI immediately
    const newHistory = [...messages, { text: trimmed, sender: "user" }];
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      // 3. Format History for Gradio
      // Gradio expects: [[user_msg, bot_msg], [user_msg, bot_msg]]
      // We process our flat 'messages' state into this pair format
      const gradioHistory = [];
      for (let i = 0; i < messages.length; i += 2) {
        if (messages[i] && messages[i+1]) {
           gradioHistory.push([messages[i].text, messages[i+1].text]);
        }
      }

      // 4. Send Request (Message + History)
      // ChatInterface usually sits at fn_index 0 if it's the only thing in app.py
      const result = await app.predict(0, [trimmed, gradioHistory]);
      
      const botReply = result.data[0];

      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Prediction Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error getting response.", sender: "bot" },
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
                <span>.</span><span>.</span><span>.</span>
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
              disabled={loading} // Disable input while loading
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