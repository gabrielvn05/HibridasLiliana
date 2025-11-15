import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar tarea</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Título"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          placeholder="Descripción"
          style={[styles.input, { height: 80 }]}
          value={desc}
          onChangeText={setDesc}
          multiline
        />

        <TextInput
          placeholder="Fecha (DD/MM/AAAA)"
          style={styles.input}
          value={date}
          onChangeText={setDate}
        />

        <TextInput
          placeholder="Hora (HH:MM)"
          style={styles.input}
          value={hour}
          onChangeText={setHour}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Inicio')}
      >
        <Text style={styles.buttonText}>Guardar tarea</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  card: {
    width: '88%',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
    elevation: 4,
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#F1F3FF',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#5A6BF0',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
  },
});
