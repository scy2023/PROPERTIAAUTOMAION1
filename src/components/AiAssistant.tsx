"use client";

import { FormEvent, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const AiAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! Ask me anything about property automation and workflows."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: ChatMessage = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!res.ok) throw new Error("AI request failed");

      const data: { reply: ChatMessage } = await res.json();
      setMessages((prev) => [...prev, data.reply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "AI service is unavailable right now. Please try again later."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="ai"
      className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-4"
    >
      <h2 className="text-lg font-semibold">AI Assistant (demo)</h2>

      <div className="h-64 overflow-y-auto space-y-2 text-xs p-3 bg-slate-950 border border-slate-800 rounded-md">
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "text-right" : "text-left"}
          >
            <span
              className={`px-2 py-1 rounded-md inline-block ${
                m.role === "user"
                  ? "bg-brand text-slate-950"
                  : "bg-slate-800 text-slate-50"
              }`}
            >
              {m.content}
            </span>
          </div>
        ))}
        {loading && <p className="text-slate-400">Thinking…</p>}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 input"
          placeholder="Ask about automation, AI, workflows..."
        />
        <button className="btn" disabled={loading}>
          Send
        </button>
      </form>
    </section>
  );
};

export default AiAssistant;
