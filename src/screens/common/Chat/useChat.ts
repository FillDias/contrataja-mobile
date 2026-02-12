import { useEffect, useCallback, useRef } from 'react';
import { FlatList } from 'react-native';
import { useChatStore } from '../../../store/chatStore';
import { useAuthStore } from '../../../store/authStore';
import { socketService } from '../../../services/socket/socketService';

export default function useChat(roomId: string) {
  const { user } = useAuthStore();
  const { messages, isLoading, fetchMessages, addMessage, clearMessages } = useChatStore();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    fetchMessages(roomId);
    socketService.connectChat();
    socketService.joinChatRoom(roomId);

    socketService.onNewMessage((message) => {
      addMessage(message);
    });

    return () => {
      socketService.leaveChatRoom(roomId);
      clearMessages();
    };
  }, [roomId]);

  const handleSend = useCallback(
    (content: string) => {
      if (!content.trim() || !user) return;
      socketService.sendMessage(
        user.id,
        '', // receiverId sera preenchido pelo roomId
        roomId,
        content.trim(),
      );
    },
    [user, roomId],
  );

  const scrollToBottom = useCallback(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages.length]);

  return {
    messages,
    isLoading,
    currentUserId: user?.id ?? '',
    flatListRef,
    handleSend,
    scrollToBottom,
  };
}
