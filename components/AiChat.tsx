"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleToggle = () => {
    setIsOpen((p) => !p);
    if (!greeted) {
      setGreeted(true);
      setTimeout(() => {
        setMessages([
          {
            role: "bot",
            text: "👋 Hi! I'm Bharat's AI assistant. Ask me about his skills, projects, experience, or anything else!",
          },
        ]);
      }, 300);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setInput("");
    setShowQuick(false);
    setLoading(true);

    const newMessages: Message[] = [...messages, { role: "user", text }];
    setMessages(newMessages);

    const history = newMessages.map((m) => ({
      role: m.role === "bot" ? "assistant" : "user",
      content: m.text,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      setMessages((p) => [
        ...p,
        { role: "bot", text: data.reply || "Sorry, no response." },
      ]);
    } catch {
      setMessages((p) => [
        ...p,
        { role: "bot", text: "⚠️ Something went wrong. Please try again!" },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const quickQuestions = [
    { label: "🔧 Tech Stack", q: "What tech stack does Bharat use?" },
    { label: "🚀 Projects", q: "Tell me about Bharat's projects" },
    { label: "💼 Hire", q: "Is Bharat available for hire?" },
    { label: "⚡ Experience", q: "What is Bharat's experience?" },
  ];

  return (
    <>
      <button
        className="ai-toggle"
        onClick={handleToggle}
        title="Chat with AI about Bharat"
      >
        🤖
        <span className="ai-badge" />
      </button>

      <div className={`ai-panel${isOpen ? " open" : ""}`}>
        <div className="ai-header">
          <div className="ai-avatar-icon">🤖</div>
          <div className="ai-info">
            <h4>Bharat&apos;s AI Assistant</h4>
            <p>
              <span className="dot" style={{ width: 7, height: 7 }} />
              Online — Ask me anything
            </p>
          </div>
          <button className="ai-close" onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>

        <div className="ai-messages">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`msg ${m.role}`}
              style={{
                whiteSpace: "pre-line",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}
            >
              {m.text}
            </div>
          ))}
          {loading && (
            <div className="msg bot">
              <span className="typing-dots">
                <span />
                <span />
                <span />
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {showQuick && (
          <div className="quick-btns">
            {quickQuestions.map((q) => (
              <button
                key={q.q}
                className="quick-btn"
                onClick={() => sendMessage(q.q)}
              >
                {q.label}
              </button>
            ))}
          </div>
        )}

        <div className="ai-footer">
          <textarea
            ref={inputRef}
            className="ai-input"
            placeholder="Ask about Bharat..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            className="ai-send"
            onClick={() => sendMessage(input)}
            disabled={loading}
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
}
