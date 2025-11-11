import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import "../App.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const starterQuestions = [
    "Tell me about Yashwanth’s experience in AI & Robotics.",
    "What projects has Yashwanth worked on?",
    "What skills does Yashwanth have?",
  ];

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMsg = { text: messageText, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://portfolio-website-1-rvrq.onrender.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await res.json();

      // ✅ Typewriter effect for bot messages
      const botReply = data.reply || "⚠️ No response from Gemini.";
      let currentText = "";
      setLoading(false);
      setMessages((prev) => [...prev, { text: "", sender: "bot" }]);

      for (let i = 0; i < botReply.length; i++) {
        currentText += botReply[i];
        await new Promise((r) => setTimeout(r, 15)); // typing speed
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].text = currentText;
          return [...updated];
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error connecting to AI server.", sender: "bot" },
      ]);
      setLoading(false);
    }
  };

  const handleSend = () => {
    sendMessage(input);
  };

  const handleQuestionClick = (question) => {
    sendMessage(question);
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
            {/* Starter questions */}
            {messages.length === 0 && !loading && (
              <div className="starter-questions">
                <p className="starter-text">Try asking one of these:</p>
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

            {/* Chat messages */}
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

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}

      {/* Floating chat button */}
      <div className="chat-float-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaRobot className="chat-icon" />
        <span className="chat-text">{isOpen ? "Close Chat" : "Chat with AI"}</span>
      </div>



      <div>
        
      </div>




    </>
  );
};

export default ChatWidget;


