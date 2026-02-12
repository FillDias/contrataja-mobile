import { io, Socket } from 'socket.io-client';
import { storageService } from '../storage/storageService';

const SOCKET_URL = 'http://192.168.137.1:3000';

class SocketService {
  private chatSocket: Socket | null = null;
  private jobCallsSocket: Socket | null = null;
  private serviceCallsSocket: Socket | null = null;

  // ==================== CHAT ====================

  connectChat() {
    if (this.chatSocket?.connected) return;
    this.chatSocket = io(`${SOCKET_URL}/chat`, {
      transports: ['websocket'],
    });
  }

  joinChatRoom(roomId: string) {
    this.chatSocket?.emit('joinRoom', { roomId });
  }

  leaveChatRoom(roomId: string) {
    this.chatSocket?.emit('leaveRoom', { roomId });
  }

  sendMessage(senderId: string, receiverId: string, roomId: string, content: string, type = 'TEXT') {
    this.chatSocket?.emit('sendMessage', { senderId, receiverId, roomId, content, type });
  }

  onNewMessage(callback: (message: any) => void) {
    this.chatSocket?.on('newMessage', callback);
  }

  emitTyping(roomId: string, userId: string) {
    this.chatSocket?.emit('typing', { roomId, userId });
  }

  emitStopTyping(roomId: string, userId: string) {
    this.chatSocket?.emit('stopTyping', { roomId, userId });
  }

  onUserTyping(callback: (data: { userId: string }) => void) {
    this.chatSocket?.on('userTyping', callback);
  }

  onUserStopTyping(callback: (data: { userId: string }) => void) {
    this.chatSocket?.on('userStopTyping', callback);
  }

  disconnectChat() {
    this.chatSocket?.disconnect();
    this.chatSocket = null;
  }

  // ==================== JOB CALLS ====================

  connectJobCalls(userId: string) {
    if (this.jobCallsSocket?.connected) return;
    this.jobCallsSocket = io(`${SOCKET_URL}/job-calls`, {
      transports: ['websocket'],
    });
    this.jobCallsSocket.emit('joinJobRoom', { userId });
  }

  onNewJobMatch(callback: (data: any) => void) {
    this.jobCallsSocket?.on('newJobMatch', callback);
  }

  onJobAccepted(callback: (data: any) => void) {
    this.jobCallsSocket?.on('jobAccepted', callback);
  }

  disconnectJobCalls() {
    this.jobCallsSocket?.disconnect();
    this.jobCallsSocket = null;
  }

  // ==================== SERVICE CALLS ====================

  connectServiceCalls(userId: string) {
    if (this.serviceCallsSocket?.connected) return;
    this.serviceCallsSocket = io(`${SOCKET_URL}/service-calls`, {
      transports: ['websocket'],
    });
    this.serviceCallsSocket.emit('joinServiceRoom', { userId });
  }

  onNewServiceRequest(callback: (data: any) => void) {
    this.serviceCallsSocket?.on('newServiceRequest', callback);
  }

  onServiceUpdated(callback: (data: any) => void) {
    this.serviceCallsSocket?.on('serviceUpdated', callback);
  }

  disconnectServiceCalls() {
    this.serviceCallsSocket?.disconnect();
    this.serviceCallsSocket = null;
  }

  // ==================== DISCONNECT ALL ====================

  disconnectAll() {
    this.disconnectChat();
    this.disconnectJobCalls();
    this.disconnectServiceCalls();
  }
}

export const socketService = new SocketService();
