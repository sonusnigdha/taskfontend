import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
});

API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem('token');
    console.log("Token being attached:", token);
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
export const fetchTasks = (params) => API.get('/tasks', { params });
export const createTask = (data) => API.post('/tasks', data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
