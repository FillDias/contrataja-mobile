import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Chip, Button } from 'react-native-paper';
import { JobMatch } from '../../types';

interface JobCallCardProps {
  match: JobMatch;
  onAccept: () => void;
  onReject: () => void;
  onPress: () => void;
}

export default function JobCallCard({ match, onAccept, onReject, onPress }: JobCallCardProps) {
  const jobCall = match.jobCall;
  if (!jobCall) return null;

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Title
        title={jobCall.title}
        subtitle={jobCall.company?.companyName}
      />
      <Card.Content>
        <Text variant="bodyMedium" numberOfLines={2}>
          {jobCall.description}
        </Text>
        {match.isYoungTalent && (
          <Chip style={styles.chip} textStyle={styles.chipText}>
            Jovem Talento
          </Chip>
        )}
      </Card.Content>
      <Card.Actions>
        <Button onPress={onReject} textColor="#f44336">
          Recusar
        </Button>
        <Button mode="contained" onPress={onAccept}>
          Aceitar
        </Button>
      </Card.Actions>
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
    backgroundColor: '#e3f2fd',
  },
  chipText: {
    fontSize: 12,
  },
});
