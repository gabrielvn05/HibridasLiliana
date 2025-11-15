import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import ProfileScreen from './screens/ProfileScreen';

import { TaskProvider } from './context/TaskContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const Tab = createBottomTabNavigator();

function Tabs() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === 'Inicio') icon = 'home-outline';
          if (route.name === 'Agregar') icon = 'add-circle-outline';
          if (route.name === 'Perfil') icon = 'person-outline';

          return <Ionicons name={icon} color={color} size={size} />;
        },
        headerShown: false,

        tabBarStyle: {
          backgroundColor: theme === "light" ? '#E9F3FF' : '#1F1F1F',
          height: 60,
          borderTopWidth: 0,
          elevation: 6,
        },

        tabBarActiveTintColor: theme === "light" ? '#67A9FF' : '#4DA3FF',
        tabBarInactiveTintColor: theme === "light" ? '#8EA9C1' : '#777',
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Agregar" component={AddTaskScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </TaskProvider>
    </ThemeProvider>
  );
}
