import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaCircle } from "react-icons/fa";
import { getPortfolioReply } from "../utils/portfolioChatEngine";


// Use local backend in development and same-origin path in production.
const BASE_URL = import.meta.env.VITE_CHAT_API_BASE_URL || (import.meta.env.DEV ? "http://localhost:5000" : "");

// Parse inline markdown: **bold**, *italic*, [label](url), plain https:// urls
const parseInline = (content) => {
  const parts = [];
  const inlineRegex = /(\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s]+))/g;
  let last = 0;
  let match;
  while ((match = inlineRegex.exec(content)) !== null) {
    if (match.index > last) parts.push(content.slice(last, match.index));
    if (match[2]) {
      parts.push(<strong key={match.index} className="font-semibold">{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={match.index}>{match[3]}</em>);
    } else if (match[4] && match[5]) {
      parts.push(
        <a key={match.index} href={match[5]} target="_blank" rel="noopener noreferrer"
          className="underline text-purple-400 hover:text-pink-400 transition-colors break-all">
          {match[4]}
        </a>
      );
    } else if (match[6]) {
      parts.push(
        <a key={match.index} href={match[6]} target="_blank" rel="noopener noreferrer"
          className="underline text-purple-400 hover:text-pink-400 transition-colors break-all">
          {match[6]}
        </a>
      );
    }
    last = match.index + match[0].length;
  }
  if (last < content.length) parts.push(content.slice(last));
  return parts;
};

// Render markdown text into JSX — handles bullets, paragraphs, bold, links.
const renderMarkdown = (text) => {
  if (!text) return null;
  const lines = text.split("\n");
  const elements = [];
  let bulletBuffer = [];

  const flushBullets = (key) => {
    if (bulletBuffer.length === 0) return;
    elements.push(
      <ul key={`ul-${key}`} className="list-disc ml-4 space-y-0.5 my-1">
        {bulletBuffer}
      </ul>
    );
    bulletBuffer = [];
  };

  lines.forEach((line, li) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushBullets(li);
      return;
    }
    const isBullet = /^[\*\-]\s/.test(trimmed);
    if (isBullet) {
      const content = trimmed.replace(/^[\*\-]\s/, "");
      bulletBuffer.push(<li key={li}>{parseInline(content)}</li>);
    } else {
      flushBullets(li);
      elements.push(<p key={li} className="mb-1 last:mb-0">{parseInline(trimmed)}</p>);
    }
  });
  flushBullets("end");
  return elements;
};

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
    const localResult = getPortfolioReply(trimmed);
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
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
      const fetchPromise = fetch(`${BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: historyPayload
        }),
      });

      const response = await Promise.race([fetchPromise, timeoutPromise]);

      // 429 rate-limit — fall back to local data silently, no error shown
      if (response.status === 429) {
        throw new Error("rate_limit");
      }

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.response || data.reply;

      if (!botReply) {
        throw new Error("No response returned from chat API");
      }

      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
      setErrorCount(0);

    } catch (error) {
      console.error("Chat Error:", error);

      const fallbackResult = getPortfolioReply(trimmed);
      if (fallbackResult?.response) {
        const isRateLimit = error?.message === "rate_limit";
        setMessages((prev) => [
          ...prev,
          {
            text: isRateLimit
              ? fallbackResult.response
              : `${fallbackResult.response}\n\n(Answered from local portfolio data.)`,
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
                  {msg.sender === 'bot' ? (
                    <div className="space-y-0.5">{renderMarkdown(msg.text)}</div>
                  ) : (
                    msg.text
                  )}
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