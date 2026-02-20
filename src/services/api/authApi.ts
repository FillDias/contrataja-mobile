import apiClient from './apiClient';
import { AuthResponse, RegisterData, LoginData } from '../../types';

export interface RegisterWithSMSData {
  email: string;
  password: string;
  type: string;
  fullName: string;
  gender: string;
  phone: string;
  birthDate?: string;
}

export interface RegisterWithSMSResponse {
  userId: string;
  phone: string;
  message: string;
}

export const authApi = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async registerWithSMS(data: RegisterWithSMSData): Promise<RegisterWithSMSResponse> {
    const response = await apiClient.post<RegisterWithSMSResponse>('/auth/register', data);
    return response.data;
  },

  async verifySMS(userId: string, code: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/verify-sms', { userId, code });
    return response.data;
  },

  async resendSMS(userId: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/resend-sms', { userId });
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
