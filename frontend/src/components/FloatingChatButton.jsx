import React from "react";
import { FaRobot } from "react-icons/fa";
import "../App.css"; // make sure styles load

const FloatingChatButton = () => {
  const handleClick = () => {
    // scroll smoothly to the AI chatbot section
    const chatSection = document.getElementById("ai-chat");
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("Chat section not found! Please add an element with id='ai-chat'");
    }
  };

  return (
    <div className="chat-float-btn" onClick={handleClick}>
      <FaRobot className="chat-icon" />
      <span className="chat-text">Chat with Yash's AI</span>
    </div>
  );
};

export default FloatingChatButton;
