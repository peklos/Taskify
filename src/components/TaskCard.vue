<template>
  <div
    class="p-4 rounded-lg shadow-sm border-l-4 transition-colors"
    :class="[
      themeStore.isDarkMode ? 'bg-gray-800' : '',
      task.completed 
        ? themeStore.isDarkMode 
          ? 'border-green-600 bg-gray-700' 
          : 'border-green-500 bg-green-50'
        : themeStore.isDarkMode 
          ? 'border-blue-600 bg-gray-700' 
          : 'border-blue-500 bg-blue-50'
    ]"
  >
    <div class="flex justify-between items-start overflow-hidden">
      <div class="flex-1 min-w-0">
        <h3 
          class="font-bold text-lg break-words"
          :class="themeStore.isDarkMode ? 'text-gray-100' : 'text-gray-800'"
        >
          {{ task.title }}
        </h3>
        <p 
          class="mt-1 break-words"
          :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'"
        >
          {{ task.description }}
        </p>
      </div>
      <div class="flex space-x-2">
        <button
          class="p-2 rounded-full cursor-pointer transition-colors"
          :class="[
            themeStore.isDarkMode ? 'hover:bg-gray-600' : '',
            task.completed
              ? themeStore.isDarkMode
                ? 'text-green-400 bg-gray-600'
                : 'text-green-500 bg-green-100 hover:bg-green-50'
              : themeStore.isDarkMode
                ? 'text-gray-400 bg-gray-600'
                : 'text-gray-400 bg-blue-100 hover:bg-blue-50'
          ]"
          type="button"
          @click="taskStore.toggleTaskCompleted(task.id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          class="p-2 rounded-full cursor-pointer transition-colors"
          :class="themeStore.isDarkMode 
            ? 'text-red-400 hover:bg-gray-600' 
            : 'text-red-400 hover:bg-red-50'"
          type="button"
          @click="taskStore.removeTask(task.id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
    <div 
      class="mt-3 text-sm"
      :class="themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-500'"
    >
      {{ new Date(task.date).toLocaleString() }}
      <span
        class="ml-2 px-2 py-1 text-xs rounded-full"
        :class="themeStore.isDarkMode
          ? 'bg-green-900 text-green-300'
          : 'bg-green-100 text-green-800'"
        v-if="task.completed"
      >
        Выполнено
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/taskStore";
import { useThemeStore } from "@/stores/themeStore";
import { defineProps } from "vue";
import type { Task } from "@/types/task";

const taskStore = useTaskStore();
const themeStore = useThemeStore();

defineProps<{
  task: Task;
}>();
</script>