import { defineStore } from "pinia";
import { ref } from "vue";
import type { Task, NewTask } from "@/types/task";
import * as taskApi from "@/api/tasks";
import { useAuthStore } from "./authStore";

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const authStore = useAuthStore();

  const fetchTasks = async () => {
    loading.value = true;
    error.value = null;

    try {
      const userId = authStore.currentUser?.id;
      if (!userId) throw new Error("Пользователь не авторизован");

      const data = await taskApi.getTasks(userId);
      tasks.value = data;
    } catch (err) {
      error.value = "Ошибка при загрузке задач";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const addTask = async (task: NewTask) => {
    const userId = authStore.currentUser?.id;
    if (!userId) throw new Error("Пользователь не авторизован");

    const taskWithDate: NewTask = {
      ...task,
      date: new Date().toISOString(),
      userId,
    };

    try {
      const created = await taskApi.createTask(taskWithDate);
      tasks.value.push(created);
    } catch (err) {
      console.error("Ошибка при создании задачи: ", err);
    }
  };

  const toggleTaskCompleted = async (id: number) => {
    const task = tasks.value.find((t: any) => t.id === id);
    if (!task) return;

    try {
      const updatedTask = await taskApi.updateTask({
        ...task,
        completed: !task.completed,
      });

      Object.assign(task, updatedTask);
    } catch (err) {
      console.error("Ошибка при обновлении задач: ", err);
    }
  };

  const removeTask = async (id: number) => {
    try {
      await taskApi.deleteTask(id);
      tasks.value = tasks.value.filter((task: any) => task.id !== id);
    } catch (err) {
      console.error("Ошибка при удалении задачи: ", err);
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    toggleTaskCompleted,
    removeTask,
  };
});
