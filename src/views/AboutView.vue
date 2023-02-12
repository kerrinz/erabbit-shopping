<template>
  <main>
    <div>About</div>
    <el-button @click="handleHome">Home</el-button>
  </main>
</template>

<script setup lang="ts">
import router from "@/router";

const handleHome = () => {
  router.push("/home");
};
</script>
