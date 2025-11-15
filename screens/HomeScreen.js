import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Sacar la basura', done: false },
    { id: '2', title: 'Comprar comida', done: true },
    { id: '3', title: 'Hacer ejercicio', done: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  const deleteCompleted = () => {
    setTasks(tasks.filter(t => !t.done));
  };

  return (
    <View style={styles.container}>

      {/* Logo */}
      <Image source={require('../assets/logoTF.png')} style={styles.logo} />

      <Text style={styles.title}>Mis Tareas</Text>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        style={{ width: '100%' }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, item.done && styles.cardDone]}
            onPress={() => toggleTask(item.id)}
          >
            <Ionicons
              name={item.done ? 'checkmark-circle' : 'ellipse-outline'}
              size={28}
              color={item.done ? '#4CAF50' : '#5A6BF0'}
            />

            <Text style={[styles.cardText, item.done && styles.cardTextDone]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Botón eliminar */}
      <TouchableOpacity style={styles.deleteButton} onPress={deleteCompleted}>
        <Ionicons name="trash-outline" size={22} color="#fff" />
        <Text style={styles.deleteText}>Eliminar tareas completadas</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    alignItems: 'center',
    paddingTop: 40,
  },
  logo: {
    width: 85,
    height: 85,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 14,
    elevation: 3,
  },
  cardDone: {
    backgroundColor: '#DFF7DF',
  },
  cardText: {
    marginLeft: 15,
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  cardTextDone: {
    textDecorationLine: 'line-through',
    color: '#6F6F6F',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4E4E',
    padding: 12,
    borderRadius: 10,
    marginVertical: 15,
  },
  deleteText: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 8,
  },
});
