import { create } from 'zustand';
import { Message, ChatRoom } from '../../../types';
import apiClient from '../../../services/api/apiClient';

interface ChatState {
  rooms: ChatRoom[];
  messages: Message[];
  isLoading: boolean;

  fetchRooms: () => Promise<void>;
  fetchMessages: (roomId: string) => Promise<void>;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  rooms: [],
  messages: [],
  isLoading: false,

  fetchRooms: async () => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get('/chat/rooms');
      set({ rooms: response.data, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  fetchMessages: async (roomId) => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get(`/chat/rooms/${roomId}/messages`);
      set({ messages: response.data, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  addMessage: (message) => {
    const current = get().messages;
    // Evitar duplicata
    if (!current.find((m) => m.id === message.id)) {
      set({ messages: [...current, message] });
    }
  },

  clearMessages: () => set({ messages: [] }),
}));
