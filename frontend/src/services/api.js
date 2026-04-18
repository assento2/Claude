import axios from 'axios';

// Use /api which is proxied by Vite in development
// In production, we might want to use an environment variable
const API_BASE_URL = import.meta.env.DEV ? '/api' : 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const projectApi = {
  getProjects: () => api.get('/projects'),
  getProject: (id) => api.get(`/projects/${id}`),
  createProject: (data) => api.post('/projects', data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  chatWithClaude: (id, message) => api.post(`/projects/${id}/chat`, { message }),
  getHealth: () => api.get('/health'),
};

export default api;
