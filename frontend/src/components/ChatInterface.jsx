import React, { useState } from 'react';
import { Send, Bot, User, ArrowLeft } from 'lucide-react';
import { projectApi } from '../services/api';

const ChatInterface = ({ project, onBack }) => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: `Hello! I'm ready to help you with ${project.name}. What should we work on first?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    // Get config from localStorage
    const savedConfig = localStorage.getItem('claude_manager_config');
    const config = savedConfig ? JSON.parse(savedConfig) : null;

    try {
      const response = await projectApi.chatWithClaude(project.id, currentInput, config);
      const assistantMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.data.response
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Failed to chat with Claude", error);
      const assistantMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "Hata oluştu. Lütfen API anahtarınızı ve internet bağlantınızı kontrol edin."
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition">
          <ArrowLeft size={20} />
        </button>
        <div className="overflow-hidden">
          <h2 className="text-lg font-bold text-gray-800 truncate">{project.name}</h2>
          <p className="text-xs text-gray-500 uppercase font-medium">{project.status}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-800'
              }`}>
                {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
              </div>
              <div className={`p-3 rounded-2xl text-sm ${
                msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-100 text-gray-800 shadow-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-2 animate-pulse">
              <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <div className="p-3 rounded-2xl bg-gray-200 w-24 h-10"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            placeholder="Mesaj yazın..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 disabled:bg-blue-300 transition"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
