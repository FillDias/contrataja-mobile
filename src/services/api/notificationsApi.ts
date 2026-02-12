import apiClient from './apiClient';
import { Notification } from '../../types';

export const notificationsApi = {
  async findAll(): Promise<Notification[]> {
    const response = await apiClient.get('/notifications');
    return response.data;
  },

  async getUnreadCount(): Promise<number> {
    const response = await apiClient.get('/notifications/unread-count');
    return response.data;
  },

  async markAsRead(id: string) {
    const response = await apiClient.post(`/notifications/${id}/read`);
    return response.data;
  },

  async markAllAsRead() {
    const response = await apiClient.post('/notifications/read-all');
    return response.data;
  },
};
