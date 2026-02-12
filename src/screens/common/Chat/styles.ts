import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 12,
  },
  bubbleRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  myBubbleRow: {
    justifyContent: 'flex-end',
  },
  otherBubbleRow: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 16,
  },
  myBubble: {
    backgroundColor: '#6200ee',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    elevation: 1,
  },
  myText: {
    color: '#fff',
  },
  otherText: {
    color: '#333',
  },
  time: {
    fontSize: 10,
    marginTop: 4,
  },
  myTime: {
    color: '#d4bfff',
    textAlign: 'right',
  },
  otherTime: {
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#f5f5f5',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
  },
});
