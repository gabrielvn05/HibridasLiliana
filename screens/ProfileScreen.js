import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../context/ThemeContext";

export default function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(theme === "dark");
  const [profileImage, setProfileImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const email = "Liliana@Anchundia.com";

  // Inicial del correo
  const initial = email.charAt(0).toUpperCase();

  // Cargar imagen guardada
  useEffect(() => {
    const loadImage = async () => {
      const saved = await AsyncStorage.getItem("profileImage");
      if (saved) setProfileImage(saved);
    };
    loadImage();
  }, []);

  const saveImage = async (uri) => {
    setProfileImage(uri);
    await AsyncStorage.setItem("profileImage", uri);
  };

  // -- ABRIR CÁMARA --
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permiso de cámara denegado");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) saveImage(result.assets[0].uri);

    setModalVisible(false);
  };

  // -- ABRIR GALERÍA --
  const openGallery = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permiso de galería denegado");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) saveImage(result.assets[0].uri);

    setModalVisible(false);
  };

  // Temas
  const colors =
    theme === "light"
      ? {
          background: "#F1F7FF",
          card: "#FFFFFF",
          text: "#2E4A70",
          secondaryText: "#6C7A92",
          switchThumb: "#67A9FF",
          switchTrack: "#B0D4FF",
        }
      : {
          background: "#1B2A38",
          card: "#2A3A4E",
          text: "#E0E0E0",
          secondaryText: "#B0C4D8",
          switchThumb: "#67A9FF",
          switchTrack: "#4B5C72",
        };

  const handleToggle = () => {
    setDarkMode(!darkMode);
    toggleTheme();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* AVATAR */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.avatar, { backgroundColor: colors.switchThumb }]}
      >
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.avatarImg} />
        ) : (
          <Text style={styles.avatarText}>{initial}</Text>
        )}
      </TouchableOpacity>

      <Text style={[styles.name, { color: colors.text }]}>Liliana</Text>
      <Text style={[styles.email, { color: colors.secondaryText }]}>
        {email}
      </Text>

      {/* CARD */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Configuración
        </Text>

        <View style={styles.row}>
          <Text style={[styles.rowText, { color: colors.text }]}>
            Modo oscuro
          </Text>
          <Switch
            value={darkMode}
            onValueChange={handleToggle}
            thumbColor={colors.switchThumb}
            trackColor={{ false: "#B0D4FF", true: colors.switchTrack }}
          />
        </View>
      </View>

      {/* MODAL */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Actualizar foto de perfil</Text>

            <Pressable style={styles.modalBtn} onPress={openCamera}>
              <Text style={styles.modalBtnText}>📸 Tomar foto</Text>
            </Pressable>

            <Pressable style={styles.modalBtn} onPress={openGallery}>
              <Text style={styles.modalBtnText}>🖼 Elegir de galería</Text>
            </Pressable>

            <Pressable
              style={[styles.modalBtn, { backgroundColor: "#ddd" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.modalBtnText, { color: "#333" }]}>
                Cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 40 },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    overflow: "hidden",
  },
  avatarImg: { width: "100%", height: "100%" },
  avatarText: { color: "#FFF", fontSize: 40, fontWeight: "700" },

  name: { fontSize: 24, fontWeight: "700" },
  email: { marginBottom: 30, fontSize: 14 },

  card: { width: "90%", padding: 20, borderRadius: 18, elevation: 4 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  rowText: { fontSize: 16 },

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },
  modalBtn: {
    backgroundColor: "#67A9FF",
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
  },
  modalBtnText: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});
