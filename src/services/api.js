import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const addTask = async (text) => {
  const response = await api.post('/tasks', {
    text,
    status: 'pending',
    priority: 'medium',
  });
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  console.log(response.data)
  return response.data;
};

export const updateStatus = async (id, currentStatus) => {
  const newStatus = currentStatus === 'pending' ? 'complete' : 'pending';
  const response = await api.patch(`/tasks/${id}/status`, { status: newStatus });
  return response.data;
};

export const updatePriority = async (id, newPriority) => {
  const response = await api.patch(`/tasks/${id}/priority`, { priority: newPriority });
  return response.data;
};


export default api;
