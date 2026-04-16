import axios from 'axios';
import { storageService } from '../storage/storageService';

const API_URL = 'https://contrataja-backend.onrender.com';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await storageService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storageService.clear();
    }
    return Promise.reject(error);
  },
);

export default apiClient;
