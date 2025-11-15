import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(theme === "dark");

  const colors = theme === "light" ? {
    background: "#F1F7FF",
    card: "#FFFFFF",
    text: "#2E4A70",
    secondaryText: "#6C7A92",
    switchThumb: "#67A9FF",
    switchTrack: "#B0D4FF"
  } : {
    background: "#1B2A38",
    card: "#2A3A4E",
    text: "#E0E0E0",
    secondaryText: "#B0C4D8",
    switchThumb: "#67A9FF",
    switchTrack: "#4B5C72"
  };

  const initials = "L"; // Puedes calcular dinámicamente según el nombre si quieres

  const handleToggle = () => {
    setDarkMode(!darkMode);
    toggleTheme();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Avatar con iniciales */}
      <View style={[styles.avatar, { backgroundColor: colors.switchThumb }]}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      <Text style={[styles.name, { color: colors.text }]}>Liliana</Text>
      <Text style={[styles.email, { color: colors.secondaryText }]}>Liliana@Anchundia.com</Text>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Configuración</Text>

        <View style={styles.row}>
          <Text style={[styles.rowText, { color: colors.text }]}>Modo oscuro</Text>
          <Switch
            value={darkMode}
            onValueChange={handleToggle}
            thumbColor={colors.switchThumb}
            trackColor={{ false: "#B0D4FF", true: colors.switchTrack }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FF", alignItems: "center", paddingTop: 40 },
  avatar: { width: 110, height: 110, borderRadius: 55, justifyContent: "center", alignItems: "center", marginBottom: 10 },
  avatarText: { color: "#FFF", fontSize: 40, fontWeight: "700" },
  name: { fontSize: 24, fontWeight: "700" },
  email: { marginBottom: 30 },
  card: { width: "90%", padding: 20, borderRadius: 18, elevation: 4 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12 },
  rowText: { fontSize: 16 }
});
