<template>
  <!-- 顶栏 -->
  <TheHeader></TheHeader>
  <!-- 次顶栏 -->
  <TheSecondaryHeader />
  <!-- 内容 -->
  <RouterView />
  <!-- 页脚 -->
  <TheFooter>Footer</TheFooter>
</template>

<script setup lang="ts">
import TheFooter from "./TheFooter.vue";
import TheSecondaryHeader from "./TheSecondaryHeader.vue";
import TheHeader from "./TheTopNavHeader.vue";
</script>

<style scoped lang="less"></style>
