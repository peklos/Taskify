import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDarkMode = ref(false);

  const changeTheme = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  watch(isDarkMode, (newValue) => {
    localStorage.setItem("isDarkMode", String(newValue));
  });

  const checkTheme = () => {
    const status = localStorage.getItem("isDarkMode");

    if (status !== null) {
      isDarkMode.value = status === "true";
    } else {
      localStorage.setItem("isDarkMode", String(isDarkMode.value));
    }
  };

  return {
    isDarkMode,
    changeTheme,
    checkTheme,
  };
});
