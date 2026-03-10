import React from 'react';
import { View, FlatList, RefreshControl, Alert, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Card, Chip, FAB, IconButton } from 'react-native-paper';
import { useAuthStore } from '../../../auth/store/authStore';
import Loading from '../../../../components/common/Loading';
import useHomeCompany from './useHomeCompany';
import styles from './styles';

const statusLabels: Record<string, string> = {
  OPEN: 'Aberta',
  MATCHING: 'Buscando',
  CLOSED: 'Fechada',
  CANCELLED: 'Cancelada',
};

const statusColors: Record<string, string> = {
  OPEN: '#4caf50',
  MATCHING: '#ff9800',
  CLOSED: '#9e9e9e',
  CANCELLED: '#f44336',
};

export default function HomeCompany({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { companyJobCalls, isLoading, handleRefresh } = useHomeCompany();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  };

  if (isLoading && companyJobCalls.length === 0) {
    return <Loading message="Carregando vagas..." />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Minhas Vagas</Text>
            <Text style={styles.headerSubtitle}>
              {companyJobCalls.length} vaga(s) publicada(s)
            </Text>
          </View>
          <IconButton icon="logout" size={22} onPress={handleLogout} />
        </View>
      </View>

      <FlatList
        data={companyJobCalls}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          companyJobCalls.length === 0 ? { flex: 1 } : styles.list
        }
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        renderItem={({ item }) => {
          const accepted = item.matches?.filter((m) => m.status === 'ACCEPTED') ?? [];
          return (
            <Card
              style={styles.jobCard}
              onPress={() => navigation.navigate('JobCallStatus', { jobCallId: item.id })}
            >
              <Card.Title title={item.title} />
              <Card.Content>
                <Text variant="bodySmall" numberOfLines={2}>
                  {item.description}
                </Text>
                <Chip
                  style={[
                    styles.statusChip,
                    { backgroundColor: (statusColors[item.status] ?? '#9e9e9e') + '20' },
                  ]}
                  textStyle={{ color: statusColors[item.status] ?? '#9e9e9e' }}
                >
                  {statusLabels[item.status]}
                </Chip>
                {accepted.length > 0 && (
                  <Text style={styles.acceptedCount}>
                    {accepted.length} candidato(s) aceitaram
                  </Text>
                )}
              </Card.Content>
            </Card>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="titleMedium" style={styles.emptyText}>
              Nenhuma vaga criada
            </Text>
            <Text variant="bodySmall" style={styles.emptyText}>
              Toque no + para criar sua primeira vaga
            </Text>
          </View>
        }
      />

      <FAB
        icon="plus"
        style={{ position: 'absolute', right: 16, bottom: 16 }}
        onPress={() => navigation.navigate('CreateJobCall')}
      />
    </View>
  );
}
