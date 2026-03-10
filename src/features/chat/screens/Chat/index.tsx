import React, { useState } from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, IconButton, Text } from 'react-native-paper';
import Loading from '../../../../components/common/Loading';
import useChat from './useChat';
import styles from './styles';

export default function Chat({ route }: any) {
  const { roomId } = route.params;
  const { messages, isLoading, currentUserId, flatListRef, handleSend, scrollToBottom } =
    useChat(roomId);
  const [text, setText] = useState('');

  const onSend = () => {
    if (!text.trim()) return;
    handleSend(text);
    setText('');
  };

  if (isLoading && messages.length === 0) {
    return <Loading message="Carregando mensagens..." />;
  }

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        onContentSizeChange={scrollToBottom}
        renderItem={({ item }) => {
          const isMine = item.senderId === currentUserId;
          return (
            <View
              style={[
                styles.bubbleRow,
                isMine ? styles.myBubbleRow : styles.otherBubbleRow,
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  isMine ? styles.myBubble : styles.otherBubble,
                ]}
              >
                <Text style={isMine ? styles.myText : styles.otherText}>
                  {item.content}
                </Text>
                <Text
                  style={[
                    styles.time,
                    isMine ? styles.myTime : styles.otherTime,
                  ]}
                >
                  {formatTime(item.createdAt)}
                </Text>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma mensagem ainda</Text>
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Digite sua mensagem..."
          mode="outlined"
          style={styles.input}
          dense
          onSubmitEditing={onSend}
          returnKeyType="send"
        />
        <IconButton icon="send" mode="contained" onPress={onSend} />
      </View>
    </KeyboardAvoidingView>
  );
}
