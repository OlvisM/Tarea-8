import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useEventContext } from '../Constext.tsx/EventContext';

const RegisterEventScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const { addEvent, updateEvent, deleteEvent } = useEventContext();

  const isEdit = route.params?.isEdit || false;
  const event = route.params?.event || null;

  useEffect(() => {
    if (isEdit && event) {
      setTitle(event.title);
      setDescription(event.description);
      setDate(event.date);
      setPhoto(event.photo);
    }
  }, [isEdit, event]);

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setPhoto(asset.uri);
    }
  };

  const handleTakePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setPhoto(asset.uri);
    }
  };

  const handleSave = () => {
    if (!title || !description || !date) {
      Alert.alert('Campos requeridos', 'Por favor completa todos los campos.');
      return;
    }

    const newEvent = {
      id: isEdit && event ? event.id : Date.now().toString(),
      title,
      description,
      date,
      photo,
    };

    if (isEdit) {
      updateEvent(newEvent);
    } else {
      addEvent(newEvent);
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    if (isEdit && event) {
      Alert.alert(
        "Eliminar Evento",
        "¿Estás seguro de que quieres eliminar este evento?",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Eliminar",
            onPress: () => {
              deleteEvent(event.id);
              navigation.goBack();
            },
            style: "destructive"
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholder="Fecha"
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity style={[styles.button]} onPress={handlePickImage}>
        <Text style={[styles.buttonText]}>Seleccionar Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button]} onPress={handleTakePhoto}>
        <Text style={[styles.buttonText]}>Abrir cámara</Text>
      </TouchableOpacity>
      {photo && <Image source={{ uri: photo }} style={styles.photo} />}
      <TouchableOpacity style={[styles.button]} onPress={handleSave}>
        <Text style={[styles.buttonText]}>{isEdit ? 'Guardar Cambios' : 'Guardar'}</Text>
      </TouchableOpacity>
      {isEdit && (
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Text style={[styles.buttonText]}>Eliminar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#003B5C',  // Dark blue police color
  },
  input: {
    height: 40,
    borderColor: '#FFD700',  // Gold color for police theme
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 5,
    color: '#FFFFFF',
    
  },
  photo: {
    width: '100%',
    height: 200,
    marginTop: 16,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#003B5C',  // Dark blue police color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#FFD700',  // Gold color for police theme
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
  },
});

export default RegisterEventScreen;
