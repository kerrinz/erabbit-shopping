<template>
  <TheHeader></TheHeader>
  <div class="container">
    <TheSecondaryHeader />
    <el-container direction="vertical">
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
  <TheFooter>Footer</TheFooter>
</template>

<script setup lang="ts">
import TheFooter from "./TheFooter.vue";
import TheSecondaryHeader from "./TheSecondaryHeader.vue";
import TheHeader from "./TheTopNavHeader.vue";
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
}
</style>
