import apiClient from './apiClient';
import { AuthResponse, RegisterData, LoginData } from '../../types';

export const authApi = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async getMe() {
    const response = await apiClient.get('/users/me');
    return response.data;
  },
};
