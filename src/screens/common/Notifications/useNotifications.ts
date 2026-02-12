import { useEffect, useCallback, useState } from 'react';
import { notificationsApi } from '../../../services/api/notificationsApi';
import { Notification } from '../../../types';

export default function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const data = await notificationsApi.findAll();
      setNotifications(data);
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = useCallback(async (id: string) => {
    try {
      await notificationsApi.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
    } catch {
      // silently fail
    }
  }, []);

  const handleMarkAllAsRead = useCallback(async () => {
    try {
      await notificationsApi.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch {
      // silently fail
    }
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    isLoading,
    unreadCount,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleRefresh: fetchNotifications,
  };
}
