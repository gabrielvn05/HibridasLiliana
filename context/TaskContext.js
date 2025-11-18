import React, { createContext, useContext, useState } from "react";
import * as Notifications from "expo-notifications";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // ⚡ Programar notificación si la tarea tiene fecha y hora
  const scheduleTaskNotification = async (task) => {
    try {
      if (!task.date || !task.hour) return;

      const [day, month, year] = task.date.split("/");
      const [hour, minute] = task.hour.split(":");

      const triggerDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute)
      );

      // Ignorar si la fecha es inválida
      if (triggerDate <= new Date()) return;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Recordatorio 📌",
          body: `Tarea: ${task.title}`,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: triggerDate,
      });
    } catch (err) {
      console.log("Error al programar notificación:", err);
    }
  };

  // ➕ Agregar una tarea
  const addTask = async (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
    };

    setTasks((prev) => [...prev, newTask]);

    // Programar notificación
    await scheduleTaskNotification(newTask);
  };

  // ✔️ Cambiar el estado de una tarea
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // 🗑️ Eliminar tareas completadas
  const deleteCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.done));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTask, deleteCompleted }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
