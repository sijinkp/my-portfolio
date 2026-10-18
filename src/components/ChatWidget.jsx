import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useAssistant } from '../lib/AssistantContext.jsx';
import { profile } from '../data/profile.js';
import ChatPanel from './ChatPanel.jsx';

/** Floating launcher + compact chat window, opened from the hero avatar or the launcher. */
export default function ChatWidget() {
  const { open, setOpen, thinking } = useAssistant();
  const launcherRef = useRef(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) launcherRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className={`launcher ${open ? 'is-hidden' : ''}`}
        onClick={() => setOpen(true)}
        aria-label={`Chat with ${profile.firstName}'s digital representative`}
        aria-expanded={open}
        aria-controls="chat-window"
      >
        <span className="launcher__eyes" aria-hidden="true">
          <i /> <i />
        </span>
        <span className="launcher__label">Ask me anything</span>
      </button>

      <section
        id="chat-window"
        className={`chat-window ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-label="Chat with digital representative"
        aria-hidden={!open}
        inert={open ? undefined : ''}
      >
        <header className="chat-window__head">
          <span className={`mini-orb ${thinking ? 'is-thinking' : ''}`} aria-hidden="true">
            <i /> <i />
          </span>
          <div>
            <strong>{profile.firstName}.ai</strong>
            <span>Digital representative</span>
          </div>
          <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Close chat">
            <X size={18} />
          </button>
        </header>
        {open && <ChatPanel autoFocus />}
      </section>
    </>
  );
}
