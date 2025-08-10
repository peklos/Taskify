<template>
  <nav class="shadow-sm" :class="themeStore.isDarkMode ? 'bg-black' : 'bg-white'">
    <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div class="flex justify-between h-12 sm:h-16">
        <div class="flex items-center">
          <router-link 
            to="/dashboard"
            class="text-lg sm:text-xl font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-md transition"
            :class="themeStore.isDarkMode ? 'text-blue-400 hover:bg-gray-800' : 'text-blue-600 hover:bg-blue-50'"
          >
            Taskify
          </router-link>
        </div>
        <div class="flex items-center space-x-2 sm:space-x-4">
          <button 
            @click="themeStore.changeTheme"
            class="p-1 sm:p-2 rounded-full transition-colors cursor-pointer"
            :class="themeStore.isDarkMode ? 'hover:bg-gray-700 text-yellow-300' : 'hover:bg-gray-200 text-gray-600'"
          >
            <svg v-if="!themeStore.isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <svg v-if="themeStore.isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
          </button>

          <router-link 
            to="/dashboard"
            class="px-3 py-1 sm:px-7 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition"
            :class="themeStore.isDarkMode ? 'text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200'"
          >
            Таски
          </router-link>

          <router-link 
            v-if="!authStore.isAuthenticated" 
            to="/"
            class="px-2 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors"
            :class="themeStore.isDarkMode ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'"
          >
            Вход
          </router-link>

          <router-link 
            v-if="authStore.isAuthenticated" 
            to="/profile"
            class="px-2 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors"
            :class="themeStore.isDarkMode ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-400 hover:bg-blue-500 text-white'"
          >
            Профиль
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { useThemeStore } from "@/stores/themeStore";

const authStore = useAuthStore();
const themeStore = useThemeStore();
</script>