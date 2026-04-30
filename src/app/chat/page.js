'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Landmark } from 'lucide-react';
import './chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Namaste! I am your Indian Election Assistant. You can ask me about how to register to vote, EVMs, the Model Code of Conduct, or the general election process.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateResponse = (userMsg) => {
    const lowerMsg = userMsg.toLowerCase();
    
    if (lowerMsg.includes('register') || lowerMsg.includes('enroll')) {
      return 'To register to vote, you must be an Indian citizen of 18 years or older. You can apply online via the Voter Portal (voters.eci.gov.in) using Form 6, or offline by submitting it to your Electoral Registration Officer.';
    } else if (lowerMsg.includes('evm') || lowerMsg.includes('machine')) {
      return 'EVM stands for Electronic Voting Machine. They are highly secure, standalone machines used for voting. They are coupled with VVPAT (Voter Verifiable Paper Audit Trail) so you can verify your vote on a paper slip before it drops into a sealed box.';
    } else if (lowerMsg.includes('code of conduct') || lowerMsg.includes('mcc')) {
      return 'The Model Code of Conduct (MCC) is a set of guidelines issued by the Election Commission to regulate political parties and candidates prior to elections. It ensures free and fair elections and comes into force the moment election dates are announced.';
    } else if (lowerMsg.includes('process') || lowerMsg.includes('steps')) {
      return 'The election process generally follows these steps: Delimitation -> Voter Registration -> Notification of Election Schedule -> Nomination of Candidates -> Scrutiny -> Campaigning -> Polling Day -> Counting of Votes and Declaration of Results.';
    } else if (lowerMsg.includes('age') || lowerMsg.includes('old')) {
      return 'You must be at least 18 years old on the qualifying date (usually 1st January of the year) to be eligible to vote in India.';
    } else {
      return 'That is a great question! While I am currently a simulated assistant, in a fully connected app I would provide a detailed AI response. For now, try asking me about EVMs, Voter Registration, the Model Code of Conduct, or the overall Election Process.';
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: input.trim()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate network delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        text: generateResponse(userMessage.text)
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="chat-page container">
      <div className="chat-header text-center animate-fade-in">
        <h1 className="h1">Election Assistant</h1>
        <p className="p">Ask me anything about the Indian democratic process.</p>
      </div>

      <div className="chat-container card glass animate-fade-in delay-100">
        <div className="messages-area">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
              <div className="avatar">
                {msg.sender === 'bot' ? <Landmark size={20} /> : <User size={20} />}
              </div>
              <div className="message-bubble">
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message-wrapper bot">
              <div className="avatar">
                <Landmark size={20} />
              </div>
              <div className="message-bubble typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            className="chat-input" 
            placeholder="Ask about EVMs, voter registration..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary send-btn" disabled={!input.trim() || isTyping}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
