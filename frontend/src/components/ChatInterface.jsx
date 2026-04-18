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

    try {
      const response = await projectApi.chatWithClaude(project.id, currentInput);
      const assistantMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.data.response
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Failed to chat with Claude", error);
      const errorMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "Sorry, I encountered an error. Make sure the backend is running and API keys are configured."
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{project.name}</h2>
          <p className="text-sm text-gray-500 uppercase font-medium">{project.status}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-800'
              }`}>
                {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
              </div>
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-100 text-gray-800 shadow-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className="p-4 rounded-2xl bg-gray-200 w-32 h-12"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 bg-white border-t">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-4">
          <input
            type="text"
            placeholder="Tell Claude what to do next..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:bg-blue-300 transition"
          >
            <Send size={24} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
