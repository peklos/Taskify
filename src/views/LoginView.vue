<template>
  <div class="min-h-[93vh] flex items-center justify-center py-12"
    :class="themeStore.isDarkMode ? 'bg-gray-900' : 'bg-gray-50'">
    <div class="w-full max-w-md rounded-lg shadow-md p-8" :class="themeStore.isDarkMode ? 'bg-gray-800' : 'bg-white'"
      v-if="activetab == 1">
      <h2 class="text-2xl font-bold text-center mb-6"
        :class="themeStore.isDarkMode ? 'text-gray-100' : 'text-gray-800'">
        Вход в Taskify
      </h2>

      <form @submit.prevent class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium mb-1"
            :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">Email</label>
          <input type="email" id="email"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :class="themeStore.isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'"
            placeholder="Введите ваш email" v-model="email" />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium mb-1"
            :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">Пароль</label>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" id="password"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="themeStore.isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'"
              placeholder="Введите ваш пароль" v-model="password" />
            <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center"
              @click="showPassword = !showPassword">
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer"
                :class="themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-500'" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer"
                :class="themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-500'" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center cursor-pointer"
            :class="themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-600'">
            <input type="checkbox" v-model="rememberMe" class="h-4 w-4 rounded focus:ring-blue-500 border-gray-300"
              :class="themeStore.isDarkMode ? 'text-blue-500 bg-gray-700 border-gray-600' : 'text-blue-600'" />
            <span class="ml-2">Запомнить меня</span>
          </label>
          <a href="#" class="hover:underline"
            :class="themeStore.isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'">Забыли
            пароль?</a>
        </div>

        <div class="text-center" v-if="error">
          <span class="block px-3 py-2 rounded-lg whitespace-normal break-words"
            :class="themeStore.isDarkMode ? 'bg-red-600 text-white' : 'bg-red-400 text-white'">{{ error }}</span>
        </div>

        <button type="submit"
          class="w-full cursor-pointer font-medium py-2 px-4 rounded-md transition-colors"
          :class="themeStore.isDarkMode
            ? 'bg-blue-700 hover:bg-blue-600 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'" @click="handleLogin">
          Войти
        </button>
      </form>

      <div class="mt-6 text-center text-sm" :class="themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-600'">
        Нет аккаунта?
        <span class="hover:underline cursor-pointer"
          :class="themeStore.isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'"
          @click="activetab += 1; error = '';">
          Зарегистрироваться
        </span>
      </div>
    </div>

    <RegisterBlock v-if="activetab == 2" @setTab="activetab -= 1" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { useThemeStore } from "@/stores/themeStore";
import RegisterBlock from "@/components/RegisterBlock.vue";

const activetab = ref(1);
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const error = ref("");
const showPassword = ref(false);

const router = useRouter();
const authStore = useAuthStore();
const themeStore = useThemeStore();

async function handleLogin() {
  const success = await authStore.login(email.value, password.value);

  if (success) {
    router.push("/dashboard");
  } else {
    error.value = "Неверный email или пароль";
  }
}
</script>