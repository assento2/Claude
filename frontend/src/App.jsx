import React, { useState, useEffect } from 'react';
import ProjectDashboard from './components/ProjectDashboard';
import ChatInterface from './components/ChatInterface';
import Settings from './components/Settings';
import { Settings as SettingsIcon } from 'lucide-react';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [config, setConfig] = useState({
    provider: 'openrouter',
    apiKey: '',
    model: 'google/gemma-2-9b-it:free'
  });

  // Load config from localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('claude_manager_config');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const saveConfig = (newConfig) => {
    setConfig(newConfig);
    localStorage.setItem('claude_manager_config', JSON.stringify(newConfig));
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Header for Mobile Accessibility */}
      <nav className="bg-white border-b px-6 py-3 flex justify-between items-center">
        <span className="font-bold text-blue-600 text-lg">Claude Project Manager</span>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition"
        >
          <SettingsIcon size={20} />
        </button>
      </nav>

      <main>
        {showSettings ? (
          <Settings
            config={config}
            onSave={saveConfig}
            onBack={() => setShowSettings(false)}
          />
        ) : !selectedProject ? (
          <ProjectDashboard onSelectProject={setSelectedProject} />
        ) : (
          <ChatInterface
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
