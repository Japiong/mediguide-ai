'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Trash2, Activity } from 'lucide-react';
import { ChatBubble, TypingIndicator } from '../../components/ChatBubble';
import { DisclaimerBanner } from '../../components/WarningAlert';
import { api } from '../../lib/api';

const SUGGESTED = [
  'What are the common side effects of ibuprofen?',
  'How does metformin work for diabetes?',
  'What are the symptoms of vitamin D deficiency?',
  'Can I take paracetamol and ibuprofen together?',
  'What are the warning signs of a drug overdose?',
];

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      isUser: false,
      content: null,
      response: {
        overview: "Hello! I'm MediGuide AI, your medical information assistant. I can help you understand medications, symptoms, health conditions, and general wellness information.",
        generalAdvice: [
          "Ask me about specific medications, their uses, side effects, or dosage information.",
          "I can explain medical terms or health conditions in plain language.",
          "I can help you understand when to seek professional medical care.",
        ],
        warningSigns: [],
        possibleCauses: [],
        disclaimer: "I provide general educational information only. Always consult a qualified healthcare professional for medical advice, diagnosis, or treatment."
      }
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, loading]);

  const getHistory = () => {
    return messages
      .filter(m => m.id !== 'welcome')
      .flatMap(m => [
        m.isUser ? { role: 'user', content: m.content } : null,
        !m.isUser && m.response ? { role: 'assistant', content: JSON.stringify(m.response) } : null,
      ])
      .filter(Boolean)
      .slice(-10);
  };

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;

    setInput('');
    const userMsg = { id: Date.now(), isUser: true, content: msg };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const data = await api.chat(msg, getHistory());
      const aiMsg = {
        id: Date.now() + 1,
        isUser: false,
        content: null,
        response: data.response,
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      const errMsg = {
        id: Date.now() + 1,
        isUser: false,
        content: null,
        response: {
          overview: `Sorry, I encountered an error: ${e.message}. Please try again.`,
          possibleCauses: [],
          generalAdvice: [],
          warningSigns: [],
          disclaimer: 'Always consult a qualified healthcare professional for medical advice.'
        }
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 'welcome',
      isUser: false,
      content: null,
      response: {
        overview: "Chat cleared. How can I help you today?",
        generalAdvice: [],
        warningSigns: [],
        possibleCauses: [],
        disclaimer: "I provide general educational information only. Always consult a qualified healthcare professional."
      }
    }]);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-5rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center">
            <Activity size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              MediGuide AI
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              General health information only
            </div>
          </div>
        </div>
        <button onClick={clearChat}
          className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
        >
          <Trash2 size={13} />
          Clear
        </button>
      </div>

      {/* Disclaimer */}
      <div className="mb-4">
        <DisclaimerBanner />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
        {messages.map(msg => (
          <ChatBubble key={msg.id} message={msg} isUser={msg.isUser} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts (show when only welcome message) */}
      {messages.length === 1 && !loading && (
        <div className="mb-3">
          <p className="text-xs text-[var(--text-muted)] mb-2 font-medium">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED.map((s) => (
              <button key={s} onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all bg-[var(--bg-secondary)]"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 items-end">
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Ask about a medication, symptom, or health question..."
          rows={1}
          className="input flex-1 resize-none py-3 min-h-[48px] max-h-32"
          style={{ overflowY: 'auto' }}
          disabled={loading}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          className="btn-primary h-12 w-12 justify-center p-0 flex-shrink-0"
        >
          {loading
            ? <Loader2 size={17} className="animate-spin" />
            : <Send size={17} />
          }
        </button>
      </div>
      <p className="text-xs text-center text-[var(--text-muted)] mt-2">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
