<template>
  <div class="w-full max-w-md rounded-lg shadow-md p-8" :class="themeStore.isDarkMode ? 'bg-gray-800' : 'bg-white'">
    <h2 class="text-2xl font-bold text-center mb-6" :class="themeStore.isDarkMode ? 'text-gray-100' : 'text-gray-800'">
      Регистрация в Taskify
    </h2>

    <form @submit.prevent class="space-y-4">
      <div>
        <label for="nameregister" class="block text-sm font-medium mb-1"
          :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">Ваше имя</label>
        <input type="name" id="nameregister"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          :class="themeStore.isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'"
          placeholder="Введите ваше имя" v-model="namereg" />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium mb-1"
          :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">Email</label>
        <input type="email" id="email"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          :class="themeStore.isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'"
          placeholder="Введите ваш email" v-model="emailreg" />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium mb-1"
          :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">Пароль</label>
        <input type="password" id="password"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          :class="themeStore.isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'"
          placeholder="Придумайте пароль" v-model="passwordreg" />
      </div>

      <div>
        <label for="confirmPassword" class="block text-sm font-medium mb-1"
          :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">Подтверждение пароля</label>
        <input type="password" id="confirmPassword"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          :class="themeStore.isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'"
          placeholder="Повторите пароль" v-model="confirmPasswordReg" />
      </div>

      <div class="text-center" v-if="errorReg">
        <span class="block px-3 py-2 rounded-lg whitespace-normal break-words"
          :class="themeStore.isDarkMode ? 'bg-red-600 text-white' : 'bg-red-400 text-white'">{{ errorReg }}</span>
      </div>

      <button type="submit"
        class="w-full cursor-pointer font-medium py-2 px-4 rounded-md focus:outline-none transition-colors" :class="themeStore.isDarkMode
          ? 'bg-blue-700 hover:bg-blue-600 text-white'
          : 'bg-blue-600 hover:bg-blue-700 text-white'" @click="handleRegister()">
        Зарегистрироваться
      </button>
    </form>

    <div class="mt-6 text-center text-sm" :class="themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-600'">
      Уже есть аккаунт?
      <span class="hover:underline cursor-pointer"
        :class="themeStore.isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'"
        @click="changeTab">
        Войти
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { useThemeStore } from "@/stores/themeStore";
import * as userApi from '@/api/users'

const router = useRouter();
const authStore = useAuthStore();
const themeStore = useThemeStore();
const namereg = ref("");
const emailreg = ref("");
const passwordreg = ref("");
const confirmPasswordReg = ref("");
const errorReg = ref("");
const emit = defineEmits(["setTab"]);

function changeTab() {
  emit("setTab");
}

async function handleRegister() {
  errorReg.value = ''
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !namereg.value.trim() ||
    !emailreg.value.trim() ||
    !passwordreg.value.trim() ||
    !confirmPasswordReg.value.trim()
  ) {
    errorReg.value = "Необходимо заполнить все поля";
    return
  }

  if (passwordreg.value.trim() !== confirmPasswordReg.value.trim()) {
    errorReg.value = "Пароли не совпадают";
    return
  }

  if (!emailPattern.test(emailreg.value.trim())) {
    errorReg.value = "Введите корректный email";
    return;
  }

  try {
    const existingUser = await userApi.fetchUserByEmail(emailreg.value.trim())

    if (existingUser) {
      errorReg.value = "Пользователь с такой почтой уже существует"
      return
    }

    const success = await authStore.addUser({
      name: namereg.value.trim(),
      email: emailreg.value.trim(),
      password: passwordreg.value.trim(),
    });

    if (success) {
      router.push('/profile');
    } else {
      errorReg.value = "Ошибка регистрации, попробуйте снова"
    }
  } catch (e) {
    console.error("Ошибка при регистрации: ", e)
    errorReg.value = "Ошибка сервера, попробуйте позже"
  }
}
</script>