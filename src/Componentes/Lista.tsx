import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const EventDetailScreen = ({ route }) => {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <Text style={styles.date}>{event.date}</Text>
      {event.photo && <Image source={{ uri: event.photo }} style={styles.photo} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#003B5C',  // Dark blue police color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',  // Gold color for police theme
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
    color: '#FFFFFF',
  },
  date: {
    fontSize: 14,
    color: '#A9A9A9',  // Light grey
  },
  photo: {
    width: '100%',
    height: 200,
    marginTop: 16,
    borderRadius: 10,
  },
});

export default EventDetailScreen;
