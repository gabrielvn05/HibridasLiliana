// App.js
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import ProfileScreen from './screens/ProfileScreen';

import { TaskProvider } from './context/TaskContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const Tab = createBottomTabNavigator();

/* Manejar cómo se muestran las notificaciones cuando llegan (local) */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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
  useEffect(() => {
    // Pedir permisos para notificaciones (locales)
    async function prepareNotifications() {
      try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        // Si el permiso fue concedido, en Android crea un canal
        if (finalStatus === 'granted' && Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'Default',
            importance: Notifications.AndroidImportance.DEFAULT,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      } catch (error) {
        // silenciar errores no críticos aquí, pero puedes loguearlos si quieres
        console.warn('Error setting up notifications:', error);
      }
    }

    prepareNotifications();
  }, []);

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
