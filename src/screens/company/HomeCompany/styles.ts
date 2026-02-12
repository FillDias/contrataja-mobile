import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 12,
    backgroundColor: '#6200ee',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#e0d4f5',
    marginTop: 4,
  },
  list: {
    padding: 16,
  },
  jobCard: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  statusChip: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  acceptedCount: {
    color: '#4caf50',
    fontWeight: 'bold',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 8,
  },
});
