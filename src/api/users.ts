import axios from "./axios";
import type { User, NewUser } from "@/types/user";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get("/users");
  return response.data;
};

export const fetchUserById = async (id: string): Promise<User> => {
  const response = await axios.get(`/users/${id}`);
  return response.data;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  if (!email || !password) {
    return null;
  }

  const response = await axios.get(
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(
      password
    )}`
  );

  return response.data.length > 0 ? response.data[0] : null;
};

export const registerUser = async (user: NewUser): Promise<User> => {
  const response = await axios.post("/users", user);
  return response.data;
};

export const updateUserProfile = async (
  id: string,
  data: Partial<Pick<User, "name" | "email">>
): Promise<User> => {
  const filteredData: Partial<Pick<User, "name" | "email">> = {};

  if (data.name !== undefined && data.name !== "") {
    filteredData.name = data.name;
  }

  if (data.email !== undefined && data.email !== "") {
    filteredData.email = data.email;
  }

  const response = await axios.patch(`/users/${id}`, filteredData);
  return response.data;
};

export const updateUserPassword = async (
  id: string,
  password: string
): Promise<User> => {
  if (!password) {
    throw new Error("Пароль не может быть пустым");
  }

  const response = await axios.patch(`/users/${id}`, { password });
  return response.data;
};

export const fetchUserByEmail = async (email: string): Promise<User | null> => {
  const response = await axios.get(
    `/users?email=${encodeURIComponent(email)}`
  );
  return response.data.length > 0 ? response.data[0] : null;
};
