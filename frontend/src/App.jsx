import React, { useState } from 'react';
import ProjectDashboard from './components/ProjectDashboard';
import ChatInterface from './components/ChatInterface';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {!selectedProject ? (
        <ProjectDashboard onSelectProject={setSelectedProject} />
      ) : (
        <ChatInterface
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

export default App;
