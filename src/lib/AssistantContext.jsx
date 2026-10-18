import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { askAssistant } from './assistant.js';
import { profile } from '../data/profile.js';

const AssistantContext = createContext(null);

const greeting = {
  role: 'assistant',
  content: `Hi, I'm ${profile.firstName}'s digital representative. I can tell you about experience, skills, projects, or how to get in touch. What would you like to know?`,
};

export function AssistantProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([greeting]);
  const [thinking, setThinking] = useState(false);
  const busy = useRef(false);
  // Keep a ref to the latest messages so `send` stays stable.
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const send = useCallback(async (text) => {
    const content = text.trim();
    if (!content || busy.current) return;
    busy.current = true;
    const next = [...messagesRef.current, { role: 'user', content }];
    setMessages(next);
    setThinking(true);
    try {
      const reply = await askAssistant(next);
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    } finally {
      setThinking(false);
      busy.current = false;
    }
  }, []);

  const reset = useCallback(() => setMessages([greeting]), []);

  const value = useMemo(
    () => ({ open, setOpen, messages, thinking, send, reset }),
    [open, messages, thinking, send, reset]
  );
  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}

export const useAssistant = () => useContext(AssistantContext);
