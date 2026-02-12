import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Chip, Button } from 'react-native-paper';
import { ServiceCall } from '../../types';

interface ServiceCallCardProps {
  serviceCall: ServiceCall;
  isProvider?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  onPress?: () => void;
}

const statusLabels: Record<string, string> = {
  OPEN: 'Aberto',
  MATCHED: 'Aguardando',
  IN_PROGRESS: 'Em andamento',
  COMPLETED: 'Concluido',
  CANCELLED: 'Cancelado',
};

const statusColors: Record<string, string> = {
  OPEN: '#4caf50',
  MATCHED: '#ff9800',
  IN_PROGRESS: '#2196f3',
  COMPLETED: '#9e9e9e',
  CANCELLED: '#f44336',
};

export default function ServiceCallCard({
  serviceCall,
  isProvider,
  onAccept,
  onReject,
  onPress,
}: ServiceCallCardProps) {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Title
        title={serviceCall.serviceType}
        subtitle={serviceCall.address}
      />
      <Card.Content>
        <Text variant="bodyMedium" numberOfLines={2}>
          {serviceCall.description}
        </Text>
        <Chip
          style={[styles.chip, { backgroundColor: statusColors[serviceCall.status] + '20' }]}
          textStyle={{ color: statusColors[serviceCall.status] }}
        >
          {statusLabels[serviceCall.status]}
        </Chip>
      </Card.Content>
      {isProvider && serviceCall.status === 'MATCHED' && (
        <Card.Actions>
          <Button onPress={onReject} textColor="#f44336">
            Recusar
          </Button>
          <Button mode="contained" onPress={onAccept}>
            Aceitar
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    marginHorizontal: 2,
    backgroundColor: '#fff',
    elevation: 2,
  },
  chip: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
});
