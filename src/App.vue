<script setup la
  components: { AppNavigation },ng="ts">
import AppNavigation from "./components/AppNavigation.vue";
</script>

<template>
  <AppNavigation />
  <router-view></router-view>
</template>

<style>
#app {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
}

*:focus {
  outline: none;
}
</style>
