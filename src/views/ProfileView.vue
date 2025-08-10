<template>
  <div class="min-h-screen" :class="themeStore.isDarkMode ? 'bg-gray-900' : 'bg-gray-50'" v-if="authStore.currentUser">
    <div class="max-w-4xl mx-auto p-4 md:p-8">
      <!-- Заголовок и кнопка выхода -->
      <header class="flex justify-between items-center mb-8">
        <h1 class="text-2xl md:text-3xl font-bold" :class="themeStore.isDarkMode ? 'text-gray-100' : 'text-gray-800'">
          Мой профиль
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

      <!-- Основной блок профиля -->
      <div class="rounded-xl shadow-sm overflow-hidden" :class="themeStore.isDarkMode ? 'bg-gray-800' : 'bg-white'">
        <!-- Шапка профиля -->
        <div class="bg-blue-600 h-32 md:h-40 relative">
          <div class="absolute -bottom-16 left-6">
            <div class="h-32 w-32 rounded-full border-4 border-white flex items-center justify-center overflow-hidden"
              :class="themeStore.isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20"
                :class="themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-500'" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Информация профиля -->
        <div class="pt-20 px-6 pb-6">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h2 class="text-2xl font-bold" :class="themeStore.isDarkMode ? 'text-gray-100' : 'text-gray-800'">
                {{ authStore.currentUser.name }}
              </h2>
              <p :class="themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-500'">Пользователь Taskify</p>
            </div>
            <button class="px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
              :class="themeStore.isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'"
              @click="formChangeProfile = !formChangeProfile">
              {{ !formChangeProfile ? 'Редактировать' : 'Отменить' }}
            </button>
          </div>

          <!-- Форма редактирования профиля -->
          <div v-if="formChangeProfile" class="mb-8 p-6 rounded-lg"
            :class="themeStore.isDarkMode ? 'bg-gray-700' : 'bg-gray-50'">
            <h3 class="text-lg font-semibold mb-4" :class="themeStore.isDarkMode ? 'text-gray-100' : 'text-gray-800'">
              Редактировать профиль</h3>

            <div class="space-y-4 mb-6">
              <div>
                <label for="name" class="block text-sm font-medium mb-1"
                  :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">Имя</label>
                <input type="text" id="name" v-model="editNameForm"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-1" :class="themeStore.isDarkMode
                    ? 'bg-gray-600 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'">
              </div>

              <div>
                <label for="email" class="block text-sm font-medium mb-1"
                  :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">Email</label>
                <input type="email" id="email" v-model="editEmailForm"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-1" :class="themeStore.isDarkMode
                    ? 'bg-gray-600 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'">
              </div>

              <div v-if="errorMessage">
                <span class="p-1 rounded-lg"
                  :class="themeStore.isDarkMode ? 'bg-red-600 text-white' : 'bg-red-400 text-white'">{{ errorMessage
                  }}</span>
              </div>

              <button @click="updateProfile"
                class="px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                :class="themeStore.isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'">
                Применить изменения
              </button>
            </div>

            <div class="pt-4 border-t" :class="themeStore.isDarkMode ? 'border-gray-600' : 'border-gray-200'">
              <h3 class="text-lg font-semibold mb-4" :class="themeStore.isDarkMode ? 'text-gray-100' : 'text-gray-800'">
                Сменить пароль</h3>

              <div class="space-y-4">
                <div>
                  <label for="newPassword" class="block text-sm font-medium mb-1"
                    :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">Новый пароль</label>
                  <input type="text" id="newPassword" v-model="newPasswordForm"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-1" :class="themeStore.isDarkMode
                      ? 'bg-gray-600 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'">
                </div>

                <div>
                  <label for="confirmPassword" class="block text-sm font-medium mb-1"
                    :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">Подтвердите пароль</label>
                  <input type="text" id="confirmPassword" v-model="confirmNewPasswordForm"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-1" :class="themeStore.isDarkMode
                      ? 'bg-gray-600 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'">
                </div>

                <div v-if="errorMessagePasswords">
                  <span class="p-1 rounded-lg"
                    :class="themeStore.isDarkMode ? 'bg-red-600 text-white' : 'bg-red-400 text-white'">{{
                    errorMessagePasswords }}</span>
                </div>

                <div v-if="successMessagePasswords">
                  <span class="p-1 rounded-lg"
                    :class="themeStore.isDarkMode ? 'bg-green-600 text-white' : 'bg-green-400 text-white'">{{
                    successMessagePasswords }}</span>
                </div>

                <button @click="updatePassword"
                  class="px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                  :class="themeStore.isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'">
                  Сменить пароль
                </button>
              </div>
            </div>
          </div>

          <!-- Детали профиля -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="p-4 rounded-lg" :class="themeStore.isDarkMode ? 'bg-gray-700' : 'bg-gray-50'">
              <h3 class="text-sm font-medium mb-2" :class="themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-500'">
                Дата регистрации
              </h3>
              <p class="text-lg font-medium" :class="themeStore.isDarkMode ? 'text-gray-100' : 'text-gray-800'">
                {{ new Date(authStore.currentUser.createdAt).toLocaleString() }}
              </p>
            </div>
            <div class="p-4 rounded-lg" :class="themeStore.isDarkMode ? 'bg-gray-700' : 'bg-gray-50'">
              <h3 class="text-sm font-medium mb-2" :class="themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-500'">
                Email</h3>
              <p class="text-lg font-medium" :class="themeStore.isDarkMode ? 'text-gray-100' : 'text-gray-800'">{{
                authStore.currentUser.email }}</p>
            </div>
          </div>

          <!-- Статистика задач -->
          <h3 class="text-xl font-semibold mb-4" :class="themeStore.isDarkMode ? 'text-gray-100' : 'text-gray-800'">
            Статистика задач
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div class="p-4 rounded-lg border-l-4 border-green-500"
              :class="themeStore.isDarkMode ? 'bg-gray-700' : 'bg-green-50'">
              <h3 class="text-sm font-medium mb-1" :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">
                Выполнено</h3>
              <p class="text-4xl font-bold text-green-500">
                {{ completedTasks.length }}
              </p>
            </div>
            <div class="p-4 rounded-lg border-l-4 border-blue-500"
              :class="themeStore.isDarkMode ? 'bg-gray-700' : 'bg-blue-50'">
              <h3 class="text-sm font-medium mb-1" :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">В
                процессе</h3>
              <p class="text-4xl font-bold text-blue-500">
                {{ activeTasks.length }}
              </p>
            </div>
            <div class="p-4 rounded-lg border-l-4 border-orange-500"
              :class="themeStore.isDarkMode ? 'bg-gray-700' : 'bg-orange-50'">
              <h3 class="text-sm font-medium mb-1" :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">
                Всего</h3>
              <p class="text-4xl font-bold text-orange-500">
                {{ regularTasks.length }}
              </p>
            </div>
          </div>

          <!-- Прогресс -->
          <h3 class="text-xl font-semibold mb-4" :class="themeStore.isDarkMode ? 'text-gray-100' : 'text-gray-800'">
            Продуктивность
          </h3>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-sm mb-2"
                :class="themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-600'">
                <span>Выполнение задач</span>
                <span>{{
                  isNaN(percentageOfTasksCompleted)
                    ? 0
                    : percentageOfTasksCompleted
                }}%</span>
              </div>
              <div class="w-full rounded-full h-5" :class="themeStore.isDarkMode ? 'bg-gray-600' : 'bg-gray-200'">
                <div class="bg-blue-500 h-5 rounded-full" :style="percentageOfTasksCompleted > 0
                  ? 'width:' + percentageOfTasksCompleted + '%'
                  : 'width: 0%'
                  "></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useTaskStore } from "@/stores/taskStore";
import { useThemeStore } from "@/stores/themeStore";
import { computed, onBeforeMount, ref, watch } from "vue";
import * as userApi from '@/api/users'

const router = useRouter();
const authStore = useAuthStore();
const taskStore = useTaskStore();
const themeStore = useThemeStore();
const formChangeProfile = ref(false)
const editNameForm = ref(authStore.currentUser?.name || '');
const editEmailForm = ref(authStore.currentUser?.email || '')
const newPasswordForm = ref('')
const confirmNewPasswordForm = ref('')
const errorMessage = ref('')
const errorMessagePasswords = ref('')
const successMessagePasswords = ref("")

const regularTasks = computed(() => [...taskStore.tasks].reverse());

const completedTasks = computed(() =>
  regularTasks.value.filter((task) => task.completed)
);

const activeTasks = computed(() =>
  regularTasks.value.filter((task) => !task.completed)
);

const percentageOfTasksCompleted = computed(() =>
  Math.floor((completedTasks.value.length * 100) / (regularTasks.value.length || 1))
);

function logout() {
  authStore.logout();
  router.push("/");
}

onBeforeMount(() => {
  taskStore.fetchTasks();
});

const updatePassword = async () => {
  errorMessagePasswords.value = '';
  successMessagePasswords.value = '';

  if (!authStore.currentUser) return;

  if (!newPasswordForm.value) {
    errorMessagePasswords.value = "Введите новый пароль"
    return;
  }
  if (newPasswordForm.value !== confirmNewPasswordForm.value) {
    errorMessagePasswords.value = "Пароли не совпадают"
    return;
  }

  try {
    await userApi.updateUserPassword(authStore.currentUser.id, newPasswordForm.value)

    newPasswordForm.value = "";
    confirmNewPasswordForm.value = "";

    successMessagePasswords.value = "Пароль успешно изменен"
  } catch (e) {
    console.error("Ошибка при смене пароля: ", e)
  }
}

const updateProfile = async () => {
  errorMessage.value = '';

  if (!authStore.currentUser) return;

  if (!editEmailForm.value || !editNameForm.value) {
    errorMessage.value = "Заполните все поля"
    return;
  }

  try {
    const existingUser = await userApi.fetchUserByEmail(editEmailForm.value)

    if (existingUser && existingUser.id !== authStore.currentUser.id) {
      errorMessage.value = "Пользователь с таким email уже существует"
      return
    }

    await userApi.updateUserProfile(authStore.currentUser.id, {
      name: editNameForm.value,
      email: editEmailForm.value
    })

    const updatedUser = await userApi.fetchUserById(authStore.currentUser.id)
    authStore.currentUser = updatedUser;

    formChangeProfile.value = false;
  } catch (e) {
    console.error(e)
  }
}

watch(formChangeProfile, () => {
  errorMessage.value = '';
  errorMessagePasswords.value = '';
  successMessagePasswords.value = '';
})
</script>