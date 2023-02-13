<template>
  <el-button
    class="btn-theme-mode"
    @click="handleSwitchThemeMode"
    :icon="isDark ? Moon : Sunny"
    size="small"
    round
    bg
    :color="isDark ? '#303030' : '#777'"
  >
    {{ isDark ? "暗黑" : "明亮" }}
  </el-button>
</template>
<script setup lang="ts">
import { Moon } from "@element-plus/icons-vue";
import { Sunny } from "@element-plus/icons-vue";
import useThemeStore from "@/stores/theme";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();
const isDark = storeToRefs(themeStore).isDark;

const handleSwitchThemeMode = () => {
  themeStore.setIsDarkMode(!isDark.value);
};
</script>
<style scoped lang="less">
.btn-theme-mode {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: transparent;
  &:hover {
    border-color: #777;
  }
}
</style>
