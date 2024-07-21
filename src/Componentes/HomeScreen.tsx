import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useEventContext } from '../Constext.tsx/EventContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {
  const { events, loadEvents, deleteEvent, updateEvent } = useEventContext();

  useEffect(() => {
    loadEvents();
  }, []);

  const handleEdit = (item) => {
    // Navegar a la pantalla de edición con los detalles del evento
    navigation.navigate('Registro', { event: item, isEdit: true });
  };

  const handleDelete = (id) => {
    deleteEvent(id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Listado', { event: item })}>
              <Text style={[styles.buttonText]}>Ver Detalles</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonEdit]} onPress={() => handleEdit(item)}>
              <Text style={[styles.buttonText]}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonDelete]} onPress={() => handleDelete(item.id)}>
              <Text style={[styles.buttonText]}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={[styles.buttonRegistrar]} onPress={() => navigation.navigate('Registro')}>
        <Text style={[styles.buttonTextRegister]}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0056A0', // Color azul oscuro de policía
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  buttonEdit: {
    backgroundColor: '#007BFF', // Color azul brillante para edición
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  buttonDelete: {
    backgroundColor: '#DC3545', // Color rojo para eliminar
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextRegister: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#063971', // Color de fondo más claro
  },
  eventItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#063971', // Color de fondo del ítem
    borderRadius: 8,
    borderColor: '#CED4DA', // Borde gris claro
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffff', // Color del texto
  },
  buttonRegistrar: {
    backgroundColor: '#0056A0', // Color azul oscuro para el botón de registro
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
});

export default HomeScreen;
