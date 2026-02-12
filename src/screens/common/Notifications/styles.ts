import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  list: {
    padding: 12,
  },
  card: {
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  unreadCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#6200ee',
  },
  title: {
    fontWeight: 'bold',
  },
  message: {
    color: '#555',
    marginTop: 2,
  },
  time: {
    color: '#999',
    fontSize: 11,
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
  },
});
