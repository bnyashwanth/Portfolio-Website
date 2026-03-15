import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaCircle } from "react-icons/fa";
import { getPortfolioReply, shouldUseLocalFirst } from "../utils/portfolioChatEngine";


// ✅ Automatically use localhost in development, Render URL in production
const BASE_URL = import.meta.env.DEV
  ? "http://localhost:7860"  // Local development
  : "https://python-ai-service-for-portfolio.onrender.com";  // Production 

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

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
      // First try a local response grounded in portfolio data.
      const localResult = getPortfolioReply(trimmed);
      if (shouldUseLocalFirst(localResult)) {
        setMessages((prev) => [
          ...prev,
          { text: localResult.response, sender: "bot", source: localResult.source },
        ]);
        setErrorCount(0);
        setLoading(false);
        return;
      }

      // 1. Prepare History
      const historyPayload = [];
      for (let i = 0; i < messages.length; i += 2) {
        if (messages[i] && messages[i + 1]) {
          historyPayload.push([messages[i].text, messages[i + 1].text]);
        }
      }

      // 2. Timeout Promise to prevent hanging state
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 15000)
      );

      // 3. Fetch Request
      const fetchPromise = fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: historyPayload
        }),
      });

      const response = await Promise.race([fetchPromise, timeoutPromise]);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.response;

      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
      setErrorCount(0); // Reset error count on success

    } catch (error) {
      console.error("Chat Error:", error);

      const fallbackResult = getPortfolioReply(trimmed);
      if (fallbackResult?.response) {
        setMessages((prev) => [
          ...prev,
          {
            text: `${fallbackResult.response}\n\n(Answered from local portfolio data.)`,
            sender: "bot",
            source: fallbackResult.source,
          },
        ]);
        setLoading(false);
        return;
      }

      // Smart Fallback
      let errorMessage = "I'm currently offline due to high traffic. Please try again later.";
      if (errorCount > 1) {
        errorMessage = "I seem to be having trouble connecting. Feel free to contact me directly via LinkedIn or Email.";
      }

      setMessages((prev) => [
        ...prev,
        {
          text: errorMessage,
          sender: "bot",
          isError: true
        },
      ]);
      setErrorCount(prev => prev + 1);

      // Restore input if it was a connection error immediately? 
      // Nah, it's better to leave it clear but allow retry.
    }

    setLoading(false);
  };

  const handleSend = () => sendMessage(input);
  const handleQuestionClick = (q) => sendMessage(q);

  const starterQuestions = [
    "Tell me about your experience.",
    "What are your technical skills?",
    "How can I contact you?",
  ];

  return (
    <>
      <div
        className="fixed bottom-5 right-5 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 rounded-full cursor-pointer shadow-lg hover:scale-105 transition-transform duration-200 z-50 text-white border border-white/15"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-label="Toggle Chat Assistant"
      >
        <FaRobot className="chat-icon text-white" />
        <span className="chat-text font-medium hidden md:inline-block">
          {isOpen ? "Close" : "Chat with AI"}
        </span>
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[360px] max-w-[calc(100vw-32px)] h-[500px] max-h-[70vh] flex flex-col bg-background border border-gray-200/70 dark:border-gray-800/80 shadow-2xl rounded-2xl overflow-hidden z-50 animate-fade-in-up">
          <div className="chat-header bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 p-4 flex justify-between items-center text-white border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center backdrop-blur-sm">
                <FaRobot className="text-lg" />
              </div>
              <div>
                <h4 className="font-semibold text-lg m-0 leading-tight">AI Assistant</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <FaCircle className="text-[8px] text-emerald-300 animate-pulse" />
                  <p className="text-xs opacity-95 m-0 tracking-wide">Online and ready</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
              title="Close"
              aria-label="Close chat"
            >
              <FaTimes className="text-base" />
            </button>
          </div>

          <div className="chat-window p-4 flex-1 overflow-y-auto bg-background scroll-smooth">
            {messages.length === 0 && !loading && (
              <div className="flex flex-col gap-3 mt-4">
                <p className="text-text-muted text-sm text-center mb-2">
                  Hi! I answer in Yashwanth's voice using live portfolio data.
                </p>
                {starterQuestions.map((q, i) => (
                  <button
                    key={i}
                    className="text-left text-sm p-3 rounded-xl bg-surface hover:bg-purple-500/10 border border-gray-200/70 dark:border-gray-700/70 hover:border-purple-500/40 text-text-primary transition-all duration-200"
                    onClick={() => handleQuestionClick(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white self-end rounded-br-none'
                    : 'bg-surface border border-gray-200/70 dark:border-gray-700/70 text-text-primary self-start rounded-bl-none shadow-sm'
                    } ${msg.isError ? 'border-red-500/50 text-red-400' : ''}`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="bg-surface border border-gray-200/70 dark:border-gray-700/70 p-3 rounded-2xl rounded-bl-none self-start shadow-sm w-16 flex items-center justify-center gap-1">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce delay-0"></div>
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce delay-150"></div>
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce delay-300"></div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-surface border-t border-gray-200/70 dark:border-gray-800/80 flex gap-2 items-center">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-background text-text-primary placeholder:text-text-muted placeholder:opacity-90 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-colors"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className={`p-3 rounded-xl transition-all duration-200 ${loading || !input.trim()
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/20'
                }`}
            >
              <FaPaperPlane className="text-sm" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;