import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTasks } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";

export default function HomeScreen() {
  const { tasks, toggleTask, deleteCompleted } = useTasks();
  const { theme } = useTheme();

  const colors = theme === "light" ? {
    background: "#F1F7FF",
    card: "#FFFFFF",
    cardDone: "#DDF7DD",
    text: "#2E4A70",
    activeIcon: "#67A9FF"
  } : {
    background: "#1B2A38",
    card: "#2A3A4E",
    cardDone: "#3B4A5E",
    text: "#E0E0E0",
    activeIcon: "#67A9FF"
  };

  const confirmDelete = () => {
    Alert.alert(
      "Eliminar tareas",
      "¿Estás seguro que quieres eliminar las tareas completadas?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: deleteCompleted }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={require('../assets/logoTF.png')} style={styles.logo} />
      <Text style={[styles.title, { color: colors.text }]}>Mis Tareas</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        style={{ width: '100%' }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: item.done ? colors.cardDone : colors.card }]}
            onPress={() => toggleTask(item.id)}
          >
            <Ionicons
              name={item.done ? "checkmark-circle" : "ellipse-outline"}
              size={28}
              color={item.done ? "#4CAF50" : colors.activeIcon}
            />
            <Text style={[styles.cardText, { color: colors.text }, item.done && styles.cardTextDone]}>
              {item.title}
            </Text>
            {item.desc ? <Text style={{ color: colors.text, fontSize: 14 }}>{item.desc}</Text> : null}
            {item.date ? <Text style={{ color: colors.text, fontSize: 12 }}>{item.date} {item.hour}</Text> : null}
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={[styles.deleteButton, { backgroundColor: "#FF4E4E" }]} onPress={confirmDelete}>
        <Ionicons name="trash-outline" size={22} color="#fff" />
        <Text style={styles.deleteText}>Eliminar tareas completadas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, alignItems: "center" },
  logo: { width: 180, height: 85, marginBottom: 10, resizeMode: "contain" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  card: { flexDirection: "column", alignItems: "flex-start", padding: 15, marginVertical: 8, marginHorizontal: 20, borderRadius: 14, elevation: 3 },
  cardText: { fontSize: 18, fontWeight: "500", marginTop: 4 },
  cardTextDone: { textDecorationLine: "line-through", color: "#6F6F6F" },
  deleteButton: { flexDirection: "row", alignItems: "center", padding: 12, borderRadius: 10, marginVertical: 15 },
  deleteText: { color: "#fff", fontSize: 15, marginLeft: 8 }
});
