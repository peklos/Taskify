import api from "./axios";
import type { Task } from "@/types/task";

export const getTasks = async (userId?: string): Promise<Task[]> => {
  const response = await api.get("/tasks", {
    params: {
      userId,
    },
  });
  return response.data;
};

export const getTask = async (id: number): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const response = await api.post("/tasks", task);
  return response.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await api.put(`/tasks/${task.id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
