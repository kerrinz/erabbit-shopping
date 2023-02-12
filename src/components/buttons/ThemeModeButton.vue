<template>
  <el-button
    class="action"
    @click="handleSwitchThemeMode"
    :icon="isDark ? Moon : Sunny"
    circle
  />
</template>
<script setup lang="ts">
import { Moon } from "@element-plus/icons-vue";
import { Sunny } from "@element-plus/icons-vue";
import {
  switchToLightMode,
  switchToDarkMode,
  isDarkModeInWeb,
} from "@/utils/theme-utils";
import { ref } from "vue";

const isDark = ref(isDarkModeInWeb());

const handleSwitchThemeMode = () => {
  const isWebDark = isDarkModeInWeb();
  isWebDark ? switchToLightMode() : switchToDarkMode();
  isDark.value = !isWebDark;
};
</script>
