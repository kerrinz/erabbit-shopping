<template>
  <main>
    <div>Home</div>
    <el-button @click="handleAbout">About</el-button>
    <el-button @click="handleLogin">Login</el-button>
  </main>
</template>

<script setup lang="ts">
import router from "@/router";

const handleAbout = () => {
  router.push("/about");
};
const handleLogin = () => {
  router.push("/login");
};
</script>
