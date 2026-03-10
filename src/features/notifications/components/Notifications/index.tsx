import React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import Loading from '../../../../components/common/Loading';
import useNotifications from './useNotifications';
import styles from './styles';

export default function Notifications() {
  const {
    notifications,
    isLoading,
    unreadCount,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleRefresh,
  } = useNotifications();

  if (isLoading && notifications.length === 0) {
    return <Loading message="Carregando notificacoes..." />;
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {unreadCount > 0 && (
        <View style={styles.headerRow}>
          <Text variant="bodySmall">{unreadCount} nao lida(s)</Text>
          <Button compact onPress={handleMarkAllAsRead}>
            Marcar todas como lidas
          </Button>
        </View>
      )}

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          notifications.length === 0 ? { flex: 1 } : styles.list
        }
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        renderItem={({ item }) => (
          <Card
            style={[styles.card, !item.read && styles.unreadCard]}
            onPress={() => !item.read && handleMarkAsRead(item.id)}
          >
            <Card.Content>
              <Text variant="titleSmall" style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>{formatDate(item.createdAt)}</Text>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="titleMedium" style={styles.emptyText}>
              Sem notificacoes
            </Text>
          </View>
        }
      />
    </View>
  );
}
