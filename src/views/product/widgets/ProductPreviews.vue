<template>
  <XExhibitMagnifier :src="currentBannerUrl"></XExhibitMagnifier>
  <ul class="product_banners">
    <li v-for="(item, i) in props.banners" :key="item" :class="{ active: index == i }">
      <img @mousemove="index = i" :src="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  // 封面链接列表
  banners: string[];
}>();

// 当前预览的图片索引
const index = ref(0);

const currentBannerUrl = computed(() => {
  if (index.value < props.banners.length) {
    return props.banners[index.value];
  } else return undefined;
});
</script>
<style lang="less" scoped>
ul.product_banners {
  width: 400px;
  height: 75px;
  display: flex;
  li {
    flex: 1;
    margin: 4px;
    position: relative;
    border: 2px solid rgba(125, 125, 125, 0.2);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
      position: relative;
      //   box-sizing: border-box;
    }
    &.active {
      border-color: @primaryColor;
    }
    &.active::after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
