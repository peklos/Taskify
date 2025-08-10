import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User, NewUser } from "@/types/user";
import * as usersApi from "@/api/users";

export const useAuthStore = defineStore("auth", () => {
  const currentUser = ref<User | null>(null);

  const isAuthenticated = computed(() => !!currentUser.value);

  async function login(email: string, password: string) {
    const user = await usersApi.loginUser(email, password);

    if (user) {
      currentUser.value = user;
      localStorage.setItem("userId", user.id.toString());
      return true;
    }

    return false;
  }

  async function tryAutoLogin() {
    const userId = localStorage.getItem("userId");

    if (userId) {
      try {
        const user = await usersApi.fetchUserById(userId);
        if (user) {
          currentUser.value = user;
        } else {
          throw new Error("Пользователь не найден");
        }
      } catch (e) {
        console.error("Ошибка авто-логина:", e);
        localStorage.removeItem("userId");
      }
    }
  }

  async function addUser(user: NewUser) {
    const userWithDate: NewUser = {
      ...user,
      createdAt: new Date().toISOString(),
    };

    try {
      const createdUser = await usersApi.registerUser(userWithDate);

      currentUser.value = createdUser;
      localStorage.setItem("userId", createdUser.id.toString());
      return true;
    } catch (e) {
      console.error("Ошибка регистрации: ", e);
      return false;
    }
  }

  function logout() {
    currentUser.value = null;
    localStorage.removeItem("userId");
  }

  return {
    currentUser,
    isAuthenticated,
    login,
    tryAutoLogin,
    logout,
    addUser,
  };
});
