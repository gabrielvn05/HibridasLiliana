import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useTasks } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";

export default function AddTaskScreen({ navigation }) {
  const { addTask } = useTasks();
  const { theme } = useTheme();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");

  const colors = theme === "light"
    ? {
        background: "#F1F7FF",
        card: "#FFFFFF",
        input: "#E4EFFF",
        text: "#2E4A70",
        button: "#67A9FF",
        placeholder: "#9AB2D6",
      }
    : {
        background: "#15222F",
        card: "#1F2E3D",
        input: "#2D3D4F",
        text: "#E8EFFF",
        button: "#4DA3FF",
        placeholder: "#9FB6D1",
      };

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Campo requerido", "Debes ingresar un título para la tarea.");
      return;
    }

    addTask({ title, desc, date, hour, done: false });
    navigation.navigate("Inicio");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          
          <Text style={[styles.title, { color: colors.text }]}>
            Agregar tarea
          </Text>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <TextInput
              placeholder="Título"
              placeholderTextColor={colors.placeholder}
              style={[
                styles.input,
                { backgroundColor: colors.input, color: colors.text },
              ]}
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              placeholder="Descripción"
              placeholderTextColor={colors.placeholder}
              style={[
                styles.input,
                {
                  height: 90,
                  backgroundColor: colors.input,
                  color: colors.text,
                },
              ]}
              value={desc}
              onChangeText={setDesc}
              multiline
            />

            <TextInput
              placeholder="Fecha (DD/MM/AAAA)"
              placeholderTextColor={colors.placeholder}
              style={[
                styles.input,
                { backgroundColor: colors.input, color: colors.text },
              ]}
              value={date}
              onChangeText={setDate}
            />

            <TextInput
              placeholder="Hora (HH:MM)"
              placeholderTextColor={colors.placeholder}
              style={[
                styles.input,
                { backgroundColor: colors.input, color: colors.text },
              ]}
              value={hour}
              onChangeText={setHour}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.button }]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Guardar tarea</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    paddingBottom: 40,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },

  card: {
    width: "88%",
    padding: 18,
    borderRadius: 20,
    elevation: 4,
    marginBottom: 30,
  },

  input: {
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    fontSize: 16,
  },

  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "600",
  },
});
