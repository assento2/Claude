import React, { useState } from 'react';
import { Save, Shield } from 'lucide-react';

const Settings = ({ config, onSave, onBack }) => {
  const [localConfig, setLocalConfig] = useState(config || {
    provider: 'openrouter',
    apiKey: '',
    model: 'google/gemma-2-9b-it:free'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(localConfig);
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
          Back
        </button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LLM Provider</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2"
            value={localConfig.provider}
            onChange={(e) => setLocalConfig({...localConfig, provider: e.target.value})}
          >
            <option value="openrouter">OpenRouter (Free Models Available)</option>
            <option value="anthropic">Anthropic (Claude)</option>
            <option value="ollama">Ollama (Local - requires server)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your API key"
              className="w-full border border-gray-300 rounded-lg p-2 pr-10"
              value={localConfig.apiKey}
              onChange={(e) => setLocalConfig({...localConfig, apiKey: e.target.value})}
            />
            <Shield className="absolute right-3 top-2.5 text-gray-400" size={18} />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            OpenRouter is recommended for free models like Gemma, Qwen, or Llama.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Model Name</label>
          <input
            type="text"
            placeholder="e.g., google/gemma-2-9b-it:free"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={localConfig.model}
            onChange={(e) => setLocalConfig({...localConfig, model: e.target.value})}
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          <Save size={20} /> Save Configuration
        </button>
      </form>
    </div>
  );
};

export default Settings;
