import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Chat.css";
import {
  ArrowLeft,
  Sun,
  Moon,
  LogOut,
  BookOpen,
  FileText,
  HelpCircle,
  Sparkles,
  Send,
} from "lucide-react";

/**
 * Props (جاهزة للـ backend)
 * - user: {email/name...}
 * - onToggleTheme: () => void
 * - dark: boolean (اختياري لو بتحبي تغيري الايقونة)
 * - onLogout: () => void
 * - api: object (اختياري) لو هتعملي injection للـ api later
 */
export default function Chat({ user, onToggleTheme, dark, onLogout }) {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const subjectId = params.get("subject") || ""; // مهم للربط

  const [activeTab, setActiveTab] = useState("explain"); // explain | summary | mcq | essay
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  // placeholders (جاهز للربط بالباك)
  const [subject, setSubject] = useState({
    id: subjectId,
    title: "Introduction to Machine Learning",
    parent: "Artificial Intelligence",
  });

  const [messages, setMessages] = useState([
    {
      id: "m1",
      role: "assistant",
      text:
        `Hello! I'm your AI assistant for the lecture "${subject.title}". ` +
        `I can help you understand concepts, summarize the content, or generate quiz questions.\n\n` +
        `How can I help you today?`,
      time: "14:16",
    },
  ]);

  // ✅ هنا هتربطي backend بعدين:
  // useEffect(() => { api.getSubject(subjectId) ... api.getMessages(subjectId) ... }, [subjectId])

  const tabLabel = useMemo(() => {
    if (activeTab === "explain") return "Explain";
    if (activeTab === "summary") return "Summary";
    if (activeTab === "mcq") return "MCQ Questions";
    return "Essay Questions";
  }, [activeTab]);

  const suggested = useMemo(() => {
    if (activeTab === "summary")
      return "Summarize this lecture into 10 bullet points + key timestamps.";
    if (activeTab === "mcq")
      return "Generate 10 hard MCQs from this lecture with answers and explanations.";
    if (activeTab === "essay")
      return "Generate 5 essay questions and a model answer outline for each.";
    return "Explain the main concepts from this lecture in simple terms.";
  }, [activeTab]);

  const addUserMessage = (text) => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", text, time: `${hh}:${mm}` },
    ]);
  };

  const addAssistantMessage = (text) => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    setMessages((prev) => [
      ...prev,
      { id: `a-${Date.now()}`, role: "assistant", text, time: `${hh}:${mm}` },
    ]);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;

    setInput("");
    addUserMessage(text);
    setSending(true);

    try {
      // ✅ Backend لاحقًا:
      // const res = await api.chat({subjectId, mode: activeTab, message: text})
      // addAssistantMessage(res.answer)

      // placeholder response (frontend فقط)
      setTimeout(() => {
        addAssistantMessage(
          `(${tabLabel} mode)\n\nGot it. When you connect the backend, I'll answer using your lecture content + RAG.`
        );
        setSending(false);
      }, 550);
    } catch (e) {
      addAssistantMessage("Something went wrong. Please try again.");
      setSending(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="chat-page">
      {/* TOP BAR */}
      <header className="chat-top">
        <div className="chat-top__inner">
          <button className="chat-iconBtn" onClick={() => nav("/subjects")} title="Back">
            <ArrowLeft size={18} />
          </button>

          <div className="chat-title">
            <div className="chat-title__main">{subject.title}</div>
            <div className="chat-title__sub">{subject.parent}</div>
          </div>

          <div className="chat-top__right">
            <button className="chat-iconBtn" onClick={onToggleTheme} title="Theme">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button className="chat-iconBtn" onClick={onLogout} title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="chat-tabs">
          <button
            className={`chat-tab ${activeTab === "explain" ? "is-active" : ""}`}
            onClick={() => setActiveTab("explain")}
          >
            <BookOpen size={16} />
            Explain
          </button>

          <button
            className={`chat-tab ${activeTab === "summary" ? "is-active" : ""}`}
            onClick={() => setActiveTab("summary")}
          >
            <FileText size={16} />
            Summary
          </button>

          <button
            className={`chat-tab ${activeTab === "mcq" ? "is-active" : ""}`}
            onClick={() => setActiveTab("mcq")}
          >
            <HelpCircle size={16} />
            MCQ Questions
          </button>

          <button
            className={`chat-tab ${activeTab === "essay" ? "is-active" : ""}`}
            onClick={() => setActiveTab("essay")}
          >
            <Sparkles size={16} />
            Essay Questions
          </button>
        </div>
      </header>

      {/* BODY */}
      <main className="chat-body">
        <div className="chat-stream">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`chat-msg ${m.role === "user" ? "is-user" : "is-ai"}`}
            >
              {m.role === "assistant" && <div className="chat-avatar">🧠</div>}

              <div className="chat-bubble">
                <div className="chat-text">{m.text}</div>
                <div className="chat-time">{m.time}</div>
              </div>

              {m.role === "user" && <div className="chat-userTag">You</div>}
            </div>
          ))}
        </div>

        {/* COMPOSER */}
        <div className="chat-compose">
          <button
            className="chat-suggest"
            onClick={() => setInput(suggested)}
            type="button"
          >
            Use suggestion
          </button>

          <div className="chat-inputWrap">
            <textarea
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={`Ask in ${tabLabel} mode...`}
              rows={2}
            />
            <button className="chat-send" onClick={send} disabled={sending}>
              <Send size={18} />
              {sending ? "Sending" : "Send"}
            </button>
          </div>

          <div className="chat-hint">
            Enter to send • Shift+Enter for new line
          </div>
        </div>
      </main>
    </div>
  );
}