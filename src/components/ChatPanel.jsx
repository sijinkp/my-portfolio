import { useEffect, useRef, useState } from 'react';
import { ArrowUp, RotateCcw } from 'lucide-react';
import { useAssistant } from '../lib/AssistantContext.jsx';
import { suggestedPrompts, isLiveAssistant } from '../lib/assistant.js';

/** Conversation UI. Used inside the floating widget and inline in the AI Playground. */
export default function ChatPanel({ autoFocus = false, compact = false }) {
  const { messages, thinking, send, reset } = useAssistant();
  const [draft, setDraft] = useState('');
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, thinking]);

  const submit = (e) => {
    e.preventDefault();
    if (!draft.trim() || thinking) return;
    send(draft);
    setDraft('');
  };

  const showSuggestions = messages.length <= 2;

  return (
    <div className={`chat ${compact ? 'chat--compact' : ''}`}>
      <div className="chat__meta">
        <span className="chat__badge">{isLiveAssistant ? 'Live AI' : 'Local demo · predefined answers'}</span>
        <button type="button" className="icon-btn" onClick={reset} aria-label="Restart conversation" title="Restart conversation">
          <RotateCcw size={14} />
        </button>
      </div>

      <div className="chat__log" ref={listRef} role="log" aria-live="polite" aria-label="Conversation">
        {messages.map((m, i) => (
          <div key={i} className={`msg msg--${m.role}`}>
            <span className="visually-hidden">{m.role === 'user' ? 'You said:' : 'Assistant said:'}</span>
            {m.content}
          </div>
        ))}
        {thinking && (
          <div className="msg msg--assistant msg--typing" aria-label="Assistant is typing">
            <span /> <span /> <span />
          </div>
        )}
      </div>

      {showSuggestions && (
        <div className="chat__chips" aria-label="Suggested questions">
          {suggestedPrompts.map((p) => (
            <button key={p} type="button" className="chip" onClick={() => send(p)} disabled={thinking}>
              {p}
            </button>
          ))}
        </div>
      )}

      <form className="chat__form" onSubmit={submit}>
        <label htmlFor={compact ? 'chat-input-inline' : 'chat-input'} className="visually-hidden">
          Ask a question
        </label>
        <input
          id={compact ? 'chat-input-inline' : 'chat-input'}
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask about experience, skills, projects…"
          autoComplete="off"
          maxLength={300}
        />
        <button type="submit" className="chat__send" aria-label="Send" disabled={!draft.trim() || thinking}>
          <ArrowUp size={16} />
        </button>
      </form>
    </div>
  );
}
