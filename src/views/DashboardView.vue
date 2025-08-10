<template>
  <div class="min-h-screen" :class="themeStore.isDarkMode ? 'bg-gray-900' : 'bg-gray-50'">
    <div class="max-w-4xl mx-auto p-4 md:p-8">
      <!-- Заголовок и кнопка выхода -->
      <header class="flex justify-between items-center mb-8">
        <h1 class="text-2xl md:text-3xl font-bold" :class="themeStore.isDarkMode ? 'text-gray-100' : 'text-gray-800'">
          Мои задачи
        </h1>
        <button class="transition-colors flex items-center cursor-pointer"
          :class="themeStore.isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'"
          type="button" @click="logout()">
          <span class="hidden md:inline mr-1">Выйти</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </header>

      <!-- Кнопка добавления задачи -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <button
          class="w-full md:w-auto flex items-center justify-center px-4 py-2 text-white rounded-lg transition-colors shadow-sm cursor-pointer"
          :class="showAddTaskForm
            ? (themeStore.isDarkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-500')
            : (themeStore.isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600')
            " type="button" @click="showAddTaskForm = !showAddTaskForm">
          <svg v-if="!showAddTaskForm" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd" />
          </svg>
          <svg v-if="showAddTaskForm" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
          Добавить задачу
        </button>

        <div class="flex items-center space-x-2 p-2 rounded-lg shadow-sm"
          :class="themeStore.isDarkMode ? 'bg-gray-800' : 'bg-white'">
          <span class="text-sm" :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'">Фильтр:</span>
          <select v-model="filterType" class="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1"
            :class="themeStore.isDarkMode
              ? 'border-gray-700 bg-gray-800 text-gray-200 focus:ring-blue-600'
              : 'border-gray-300 bg-white text-gray-800 focus:ring-blue-500'" id="taskfilter">
            <option value="bystatus">Вып. / Невып.</option>
            <option value="all">Все задачи</option>
          </select>
        </div>
      </div>

      <!-- Форма добавления задачи -->
      <form v-if="showAddTaskForm" @submit.prevent="validateAndAddTaskForm" class="mb-6 space-y-4 p-4 rounded-lg shadow"
        :class="themeStore.isDarkMode ? 'bg-gray-800' : 'bg-white'">
        <div>
          <label class="block text-sm font-medium mb-1" :class="themeStore.isDarkMode ? 'text-white' : 'text-gray-700'"
            for="title">Заголовок</label>
          <input v-model="addTaskTitle" id="title" type="text" placeholder="Введите название задачи"
            class="w-full rounded-lg px-3 py-2 focus:outline-none border" :class="[
              themeStore.isDarkMode
                ? (errors.title
                  ? 'border-red-500 bg-gray-700 text-white placeholder-gray-400'
                  : 'border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-600')
                : (errors.title
                  ? 'border-red-400 text-black placeholder-gray-500'
                  : 'border-gray-300 text-black placeholder-gray-500 focus:border-blue-300')
            ]" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1" :class="themeStore.isDarkMode ? 'text-white' : 'text-gray-700'"
            for="description">Описание</label>
          <textarea v-model="addTaskDescription" id="description" rows="3" placeholder="Описание задачи"
            class="w-full rounded-lg px-3 py-2 focus:outline-none border" :class="[
              themeStore.isDarkMode
                ? (errors.description
                  ? 'border-red-500 bg-gray-700 text-white placeholder-gray-400'
                  : 'border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-600')
                : (errors.description
                  ? 'border-red-400 text-black placeholder-gray-500'
                  : 'border-gray-300 text-black placeholder-gray-500 focus:border-blue-300')
            ]"></textarea>
        </div>

        <button type="button" class="text-white px-4 py-2 rounded-lg shadow transition-colors cursor-pointer"
          :class="themeStore.isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'"
          @click="validateAndAddTaskForm">
          Добавить задачу
        </button>
      </form>


      <div v-if="filterType === 'all'" class="mb-6">
        <div class="relative max-w-md">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5" :class="themeStore.isDarkMode ? 'text-gray-500' : 'text-gray-400'" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input id="searchtasks" v-model="searchQuery" type="text" placeholder="Поиск задач..."
            class="block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1" :class="themeStore.isDarkMode
              ? 'bg-gray-800 border-gray-700 text-gray-200 focus:ring-blue-600 focus:border-blue-600'
              : 'bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500'" />
        </div>
      </div>

      <!-- Пример состояния загрузки -->
      <div class="animate-pulse space-y-4" v-if="taskStore.loading">
        <div class="rounded-lg shadow-sm h-24" :class="themeStore.isDarkMode ? 'bg-gray-800' : 'bg-white'"></div>
        <div class="rounded-lg shadow-sm h-24" :class="themeStore.isDarkMode ? 'bg-gray-800' : 'bg-white'"></div>
        <div class="rounded-lg shadow-sm h-24" :class="themeStore.isDarkMode ? 'bg-gray-800' : 'bg-white'"></div>
      </div>

      <div v-else-if="taskStore.error" :class="themeStore.isDarkMode ? 'text-red-400' : 'text-red-500'">
        {{ taskStore.error }}
      </div>

      <!-- Список задач (пример) -->
      <div class="space-y-4 mt-8">
        <!-- Группировки по статусу фильтра -->
        <template v-if="filterType === 'all'">
          <TaskCard v-for="task in filteredTasks" :key="task.id" :task="task" />
        </template>

        <template v-if="filterType === 'bystatus'">
          <div class="space-y-4">
            <h2 class="text-lg font-semibold flex items-center"
              :class="themeStore.isDarkMode ? 'text-gray-200' : 'text-gray-700'">
              <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Невыполненные
              <span class="ml-2 text-sm rounded-full px-2 py-1"
                :class="themeStore.isDarkMode ? 'text-gray-300 bg-blue-900' : 'text-gray-500 bg-blue-100'">
                {{ activeTasks.length }}
              </span>
            </h2>
            <div class="space-y-4">
              <TaskCard v-for="task in activeTasks" :key="task.id" :task="task" />
            </div>
          </div>

          <div class="space-y-4">
            <h2 class="text-lg font-semibold flex items-center"
              :class="themeStore.isDarkMode ? 'text-gray-200' : 'text-gray-700'">
              <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Выполненные
              <span class="ml-2 text-sm rounded-full px-2 py-1"
                :class="themeStore.isDarkMode ? 'text-gray-300 bg-green-900' : 'text-gray-500 bg-green-100'">
                {{ completedTasks.length }}
              </span>
            </h2>
            <div class="space-y-4">
              <TaskCard v-for="task in completedTasks" :key="task.id" :task="task" />
            </div>
          </div>
        </template>
      </div>

      <!-- Когда нет задач -->
      <div class="text-center py-12" v-if="userTasks.length === 0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto"
          :class="themeStore.isDarkMode ? 'text-gray-600' : 'text-gray-400'" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 class="mt-2 text-lg font-medium" :class="themeStore.isDarkMode ? 'text-gray-200' : 'text-gray-700'">Нет
          задач</h3>
        <p class="mt-1" :class="themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-500'">Добавьте свою первую задачу
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useTaskStore } from "@/stores/taskStore";
import { onMounted, reactive, computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useThemeStore } from "@/stores/themeStore";
import TaskCard from "@/components/TaskCard.vue";
import type { Task } from '@/types/task'

const router = useRouter();
const authStore = useAuthStore();
const taskStore = useTaskStore();
const themeStore = useThemeStore();
const showAddTaskForm = ref(false);
const addTaskTitle = ref("");
const addTaskDescription = ref("");
const filterType = ref("bystatus");
const searchQuery = ref("");
const errors = ref<{
  title?: boolean;
  description?: boolean;
}>({});

onMounted(() => {
  taskStore.fetchTasks();
});

const userTasks = computed<Task[]>(() => {
  return taskStore.tasks.filter(task => task.userId === authStore.currentUser?.id)
})

const regularTasks = computed(() => [...taskStore.tasks].reverse());

const filteredTasks = computed(() => {
  return regularTasks.value.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const completedTasks = computed(() =>
  regularTasks.value.filter((task) => task.completed)
);
const activeTasks = computed(() =>
  regularTasks.value.filter((task) => !task.completed)
);

function logout() {
  authStore.logout();
  router.push("/");
}

const validateAndAddTaskForm = () => {
  errors.value = {};
  let isValid = true;

  if (!addTaskTitle.value.trim()) {
    errors.value.title = true;
    isValid = false;
  }

  if (!addTaskDescription.value.trim()) {
    errors.value.description = true;
    isValid = false;
  }

  if (isValid) {
    taskStore.addTask({
      title: addTaskTitle.value,
      description: addTaskDescription.value,
      completed: false,
    });

    addTaskTitle.value = "";
    addTaskDescription.value = "";

    showAddTaskForm.value = false;
  }
};

watch([filterType, regularTasks], () => {
  searchQuery.value = "";
});
</script>