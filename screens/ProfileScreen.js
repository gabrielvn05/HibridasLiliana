import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Switch, Image
} from 'react-native';

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      
      <Image source={require('../assets/logoTF.png')} style={styles.avatar} />

      <Text style={styles.name}>Gabriel</Text>
      <Text style={styles.email}>gabriel@example.com</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Configuración</Text>

        <View style={styles.row}>
          <Text style={styles.rowText}>Modo oscuro</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>

      </View>

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
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  email: {
    color: '#666',
    marginBottom: 30,
  },
  card: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 18,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rowText: {
    fontSize: 16,
  },
});
