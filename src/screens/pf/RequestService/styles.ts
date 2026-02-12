import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  providerCard: {
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  rating: {
    color: '#ff9800',
    fontWeight: 'bold',
  },
  distance: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
  },
});
