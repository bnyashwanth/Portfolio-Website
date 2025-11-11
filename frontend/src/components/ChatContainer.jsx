import { useState, useEffect } from "react";
import ChatWidget from "./ChatWidget";

export default function ChatContainer() {
  const [chatPosition, setChatPosition] = useState({ top: 0 });
  const [isChatOpen, setIsChatOpen] = useState(false);

  // ✅ Calculate position just below About section
  useEffect(() => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const aboutBottom =
        aboutSection.getBoundingClientRect().bottom + window.scrollY;
      setChatPosition({ top: aboutBottom + 50 }); // place chat 50px below About
    }
  }, []);

  // ✅ Smooth scroll + open chat
  const handleOpenChat = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "end" });
      setTimeout(() => setIsChatOpen(true), 600);
    } else {
      setIsChatOpen(true);
    }
  };

  return (
    <>
      {/* 💬 Floating Chat Button */}
      {!isChatOpen && (
        <button
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-10 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300 z-50"
        >
          💬 Chat with AI
        </button>
      )}

      {/* 🧠 Chat Widget Container */}
      {isChatOpen && (
        <div
          style={{
            position: "absolute",
            top: `${chatPosition.top}px`,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}
          className="w-[90%] sm:w-[400px] md:w-[420px] bg-[#1a1a1a]/90 backdrop-blur-lg rounded-2xl shadow-2xl p-4 border border-gray-700 transition-all duration-300"
        >
          <ChatWidget onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </>
  );
}
