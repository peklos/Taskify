import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import { useAuthStore } from "./stores/authStore";
import { useThemeStore } from "./stores/themeStore";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
const authStore = useAuthStore();
const themeStore = useThemeStore();
themeStore.checkTheme();

authStore.tryAutoLogin().finally(() => {
  app.use(router).mount("#app");
});
