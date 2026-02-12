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
    marginBottom: 4,
  },
  company: {
    color: '#6200ee',
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    color: '#555',
    lineHeight: 22,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginBottom: 4,
  },
  divider: {
    marginVertical: 16,
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  rejectBtn: {
    flex: 1,
    borderColor: '#f44336',
  },
  acceptBtn: {
    flex: 1,
  },
});
