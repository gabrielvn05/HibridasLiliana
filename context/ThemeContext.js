import React, { createContext, useState, useContext } from "react";
import { Appearance } from "react-native";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme || "light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colors = theme === "light" ? {
  background: "#F1F7FF", // celeste pastel claro
  card: "#FFFFFF",
  input: "#E4EFFF",
  text: "#2E4A70",
  button: "#67A9FF"
} : {
  background: "#1B2A38", // gris azulado oscuro pero suave
  card: "#2A3A4E",       // card azul gris claro
  input: "#3B4A5E",      // input azul gris más claro
  text: "#E0E0E0",       // texto claro
  button: "#67A9FF"      // mantenemos el celeste como color principal
};


  return (
    <ThemeContext.Provider value={{ theme, colors: colors[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
