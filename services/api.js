import axios from 'axios';
import { getToken } from '../utils/storage';

const API_BASE_URL = 'https://kami-backend-5rs0.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add token
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const login = async (phone, password) => {
  const response = await api.post('/auth', { phone, password });
  return response.data;
};

// Services API
export const getServices = async () => {
  const response = await api.get('/services');
  return response.data;
};

export const getService = async (id) => {
  const response = await api.get(`/services/${id}`);
  return response.data;
};

export const createService = async (name, price) => {
  const response = await api.post('/services', { name, price });
  return response.data;
};

export const updateService = async (id, name, price) => {
  const response = await api.put(`/services/${id}`, { name, price });
  return response.data;
};

export const deleteService = async (id) => {
  const response = await api.delete(`/services/${id}`);
  return response.data;
};
