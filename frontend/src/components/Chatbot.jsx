import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import axios from 'axios';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hi! I'm your AI assistant. How can I help you book a train today?", sender: "bot" }]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await axios.post('http://localhost:5000/api/chat', { message: input });
      setMessages([...newMessages, { text: res.data.reply, sender: "bot" }]);
    } catch (error) {
      setMessages([...newMessages, { text: "Error connecting to AI service.", sender: "bot" }]);
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <MessageSquare size={24} />
        </button>
      )}
      
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>AI Assistant</h4>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div className="chatbot-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about trains..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}><Send size={20} /></button>
          </div>
        </div>
      )}
    </div>
  );
}
