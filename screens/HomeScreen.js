import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTasks } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";

export default function HomeScreen() {
  const { tasks, toggleTask, deleteCompleted } = useTasks();
  const { theme } = useTheme();

  const colors = theme === "light"
    ? {
        background: "#F1F7FF",
        card: "#FFFFFF",
        cardDone: "#DDF7DD",
        text: "#2E4A70",
        activeIcon: "#67A9FF",
      }
    : {
        background: "#1B2A38",
        card: "#2A3A4E",
        cardDone: "#3B4A5E",
        text: "#E0E0E0",
        activeIcon: "#67A9FF",
      };

  const confirmDelete = () => {
    Alert.alert(
      "Eliminar tareas",
      "¿Deseas eliminar todas las tareas completadas?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: deleteCompleted },
      ]
    );
  };

  const confirmToggle = (task) => {
    Alert.alert(
      "Completar tarea",
      `¿Marcar "${task.title}" como ${task.done ? "pendiente" : "completada"}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Aceptar", onPress: () => toggleTask(task.id) },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={require("../assets/logoTF.png")} style={styles.logo} />

      <Text style={[styles.title, { color: colors.text }]}>Mis Tareas</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        style={{ width: "100%" }}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              { backgroundColor: item.done ? colors.cardDone : colors.card },
            ]}
            onLongPress={() => confirmToggle(item)}
            delayLongPress={200}
          >
            <View style={styles.cardHeader}>
              <Ionicons
                name={item.done ? "checkmark-circle" : "ellipse-outline"}
                size={30}
                color={item.done ? "#4CAF50" : colors.activeIcon}
              />

              <Text
                style={[
                  styles.cardText,
                  { color: colors.text },
                  item.done && styles.cardTextDone,
                ]}
              >
                {item.title}
              </Text>
            </View>

            {item.desc ? (
              <Text style={[styles.desc, { color: colors.text }]}>
                {item.desc}
              </Text>
            ) : null}

            {(item.date || item.hour) && (
              <Text style={[styles.dateText, { color: colors.text }]}>
                {item.date} {item.hour}
              </Text>
            )}
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={[styles.deleteButton, { backgroundColor: "#FF4E4E" }]}
        onPress={confirmDelete}
      >
        <Ionicons name="trash-outline" size={22} color="#fff" />
        <Text style={styles.deleteText}>Eliminar tareas completadas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, alignItems: "center" },

  logo: {
    width: 180,
    height: 85,
    marginBottom: 10,
    resizeMode: "contain",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
  },

  card: {
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  cardText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },

  cardTextDone: {
    textDecorationLine: "line-through",
    color: "#7F7F7F",
  },

  desc: {
    marginTop: 6,
    fontSize: 15,
  },

  dateText: {
    marginTop: 4,
    fontSize: 13,
    opacity: 0.8,
  },

  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    position: "absolute",
    bottom: 20,
  },

  deleteText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
});
