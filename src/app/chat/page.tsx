'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, Landmark } from 'lucide-react';

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: 'Namaste! I am your Indian Election Assistant. You can ask me about how to register to vote, EVMs, the Model Code of Conduct, or the general election process.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: userText
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userText })
      });

      const data = await res.json();

      const botResponse: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.text || data.error || 'Sorry, I could not process that request.'
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      const errorResponse: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'An error occurred while connecting to the assistant.'
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="container py-24 max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <header className="text-center mb-12 animate-fade-in flex-shrink-0">
        <h1 className="text-5xl font-bold mb-4">Election Assistant</h1>
        <p className="text-[var(--muted-foreground)]">Ask me anything about the Indian democratic process.</p>
      </header>

      <div className="flex-grow card glass flex flex-col overflow-hidden animate-fade-in delay-100 mb-8">
        <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[var(--border)]" role="log" aria-live="polite">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'bot' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--secondary)] text-[var(--muted-foreground)]'}`}>
                {msg.sender === 'bot' ? <Landmark size={20} /> : <User size={20} />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl ${msg.sender === 'bot' ? 'bg-[var(--secondary)] text-[var(--foreground)] rounded-tl-none' : 'bg-[var(--primary)] text-white rounded-tr-none'}`}>
                <p className="whitespace-pre-wrap text-sm lg:text-base leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-[var(--primary)] text-white">
                <Landmark size={20} />
              </div>
              <div className="bg-[var(--secondary)] p-4 rounded-2xl rounded-tl-none">
                <div className="flex gap-1.5 items-center h-6">
                  <div className="w-2 h-2 bg-[var(--muted-foreground)] rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-[var(--muted-foreground)] rounded-full animate-bounce [animation-delay:200ms]" />
                  <div className="w-2 h-2 bg-[var(--muted-foreground)] rounded-full animate-bounce [animation-delay:400ms]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="p-4 border-t border-[var(--border)] bg-[var(--card)]/50 flex gap-3" onSubmit={handleSend}>
          <input 
            type="text" 
            className="flex-grow bg-[var(--secondary)] border border-[var(--border)] rounded-xl px-6 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 bg-transparent transition-all" 
            placeholder="Ask about EVMs, voter registration..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            aria-label="Message text input"
          />
          <button 
            type="submit" 
            className="btn btn-primary w-12 h-12 p-0 flex items-center justify-center rounded-xl flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed group" 
            disabled={!input.trim() || isTyping} 
            aria-label="Send message"
          >
            <Send size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}
