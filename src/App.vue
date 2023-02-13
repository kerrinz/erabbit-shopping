<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { darkModeQuery, isDarkModeInSystem, switchToLightMode, switchToDarkMode } from "@/utils/theme-utils";
import useThemeStore from "./stores/theme";
import { storeToRefs } from "pinia";
import { watchPostEffect } from "vue";

const themeStore = useThemeStore();
const isDark = storeToRefs(themeStore).isDark;

if (isDark.value == undefined) {
  // 真·首次加载页面，使用系统的配色值
  themeStore.setIsDarkMode(isDarkModeInSystem());
}

// 监听是否处于深色模式，并切换网页效果
watchPostEffect(() => {
  isDark.value ? switchToDarkMode() : switchToLightMode();
});

// 系统切换主题模式的触发器
darkModeQuery.addEventListener("change", () => {
  // 已经改变后
  themeStore.setIsDarkMode(isDarkModeInSystem());
});
</script>

<style>
#app {
  height: 100%;
}
</style>
