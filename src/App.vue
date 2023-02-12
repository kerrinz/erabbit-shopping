<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import {
  darkModeQuery,
  isDarkModeInSystem,
  switchToLightMode,
  switchToDarkMode,
} from "@/utils/theme-utils";
// 系统切换主题模式的触发器
function darkModeHandler() {
  isDarkModeInSystem() ? switchToDarkMode() : switchToLightMode();
}
darkModeHandler();
darkModeQuery.addEventListener("change", darkModeHandler);
</script>

<style>
#app {
  height: 100%;
}
</style>
