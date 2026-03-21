import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Card, Menu, IconButton, Dialog, Button, Text } from 'react-native-paper';
import { JobCall } from '../../../types/index';
import { STATUS_META, VALID_TRANSITIONS } from '../types/jobCall';
import StatusBadge from './StatusBadge';
import styles from '../screens/HomeCompany/styles';

interface Props {
  item: JobCall;
  isLoading: boolean;
  onPress: () => void;
  onStatusChange: (jobCallId: string, status: string) => Promise<void>;
  onDelete: (jobCallId: string) => Promise<void>;
}

export default function JobCardPJ({ item, isLoading, onPress, onStatusChange, onDelete }: Props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [hiredDialogVisible, setHiredDialogVisible] = useState(false);

  const accepted = item.matches?.filter((m) => m.status === 'ACCEPTED') ?? [];
  const transitions = VALID_TRANSITIONS[item.status] ?? [];

  const handleSelectStatus = (status: string) => {
    setMenuVisible(false);
    if (status === 'HIRED') {
      setHiredDialogVisible(true);
      return;
    }
    onStatusChange(item.id, status);
  };

  const handleArchive = () => {
    setHiredDialogVisible(false);
    onStatusChange(item.id, 'HIRED');
  };

  const handleDelete = () => {
    setHiredDialogVisible(false);
    Alert.alert(
      'Deletar vaga',
      'Esta ação é irreversível. Deseja realmente deletar a vaga?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Deletar', style: 'destructive', onPress: () => onDelete(item.id) },
      ],
    );
  };

  return (
    <>
      <Card
        style={[styles.jobCard, isLoading && { opacity: 0.5 }]}
        onPress={isLoading ? undefined : onPress}
      >
        <Card.Title
          title={item.title}
          right={() => (
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  size={20}
                  disabled={isLoading}
                  onPress={() => setMenuVisible(true)}
                />
              }
            >
              {transitions.map((status) => (
                <Menu.Item
                  key={status}
                  title={STATUS_META[status]?.label ?? status}
                  leadingIcon={STATUS_META[status]?.icon}
                  onPress={() => handleSelectStatus(status)}
                />
              ))}
            </Menu>
          )}
        />
        <Card.Content>
          <Text variant="bodySmall" numberOfLines={2}>
            {item.description}
          </Text>
          <StatusBadge status={item.status} />
          {accepted.length > 0 && (
            <Text style={styles.acceptedCount}>
              {accepted.length} candidato(s) aceitaram
            </Text>
          )}
        </Card.Content>
      </Card>

      <Dialog visible={hiredDialogVisible} onDismiss={() => setHiredDialogVisible(false)}>
        <Dialog.Title>Marcar como Contratado</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            O que deseja fazer com essa vaga?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setHiredDialogVisible(false)}>Cancelar</Button>
          <Button onPress={handleArchive}>Arquivar</Button>
          <Button textColor="#f44336" onPress={handleDelete}>Deletar vaga</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}
