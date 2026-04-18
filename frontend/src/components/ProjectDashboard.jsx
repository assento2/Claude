import React, { useState, useEffect } from 'react';
import { Plus, Rocket, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { projectApi } from '../services/api';

const ProjectDashboard = ({ onSelectProject }) => {
  const [projects, setProjects] = useState([]);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await projectApi.getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await projectApi.createProject(newProject);
      setProjects([...projects, response.data]);
      setShowNewProjectModal(false);
      setNewProject({ name: '', description: '' });
    } catch (error) {
      console.error("Failed to create project", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        <div className="flex gap-4">
          <button
            onClick={fetchProjects}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            title="Refresh"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => setShowNewProjectModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} /> New Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-gray-600 line-clamp-2">{project.description}</p>
          </div>
        ))}
        {projects.length === 0 && !loading && (
          <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl border-2 border-dashed">
            No projects found. Start by creating a new one!
          </div>
        )}
      </div>

      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Start New Project</h2>
            <form onSubmit={handleCreateProject}>
              <div className="mb-4">
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  id="projectName"
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="projectDesc" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="projectDesc"
                  required
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                ></textarea>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    planning: "bg-yellow-100 text-yellow-700",
    developing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${styles[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
};

export default ProjectDashboard;
