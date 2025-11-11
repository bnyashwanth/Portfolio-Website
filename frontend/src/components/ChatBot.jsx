import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";

export default function ChatBot() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (question.trim() === "") return;
    setResponse("🤖 This is a placeholder AI response for your question.");
    setQuestion("");
  };

  return (
    <section id="ai-chat" className="chatbot-section-wrapper">
    <div className="glass-card chatbot-section">
      <div className="chatbot-header">
        <FaRobot className="chatbot-icon" />
        <h2>Chat with Yashwanth’s AI</h2>
      </div>
      <p className="chatbot-subtext">
        Ask me anything about my experience, projects, or AI journey.
      </p>

      <form className="chat-form" onSubmit={handleSend}>
        <label htmlFor="question">Type your question here</label>
        <input
          id="question"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button type="submit">Send</button>
      </form>

      {response && <div className="chat-response">{response}</div>}
    </div>
    </section>
  );
}
